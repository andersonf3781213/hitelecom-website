/* Hitelecom 首页（V18 设计）· 渐进增强层。
   无 JS 时全部内容与产品选择器（纯 CSS radio）完整可用。
   滚动渐入由 BaseLayout 全站 IntersectionObserver 统一处理（.reveal → .in）。 */
(() => {
  "use strict";
  /* ── 精准页内锚点跳转 ───────────────────────────────────────
     content-visibility:auto 的区块首访未渲染时以估计高度占位，
     原生平滑滚动按出发时的旧高度定终点 → 长距离首跳必然欠冲。
     这里在滚动落定后按目标真实位置校正（≤2px 收敛，用户滚动即取消）。 */
  const instantScrollTo = y => {
    const root = document.documentElement;
    const prev = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto"; /* 压过全局 scroll-behavior:smooth */
    window.scrollTo(0, y);
    root.style.scrollBehavior = prev;
  };

  const scrollToTargetPrecise = target => {
    if (!target) return;
    const pad = () => parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
    let cancelled = false;
    let done = false;
    const cleanup = () => {
      window.removeEventListener("wheel", cancel);
      window.removeEventListener("touchmove", cancel);
    };
    const cancel = () => { cancelled = true; cleanup(); };
    window.addEventListener("wheel", cancel, { passive: true });
    window.addEventListener("touchmove", cancel, { passive: true });

    target.scrollIntoView({ behavior: "smooth", block: "start" });

    let attempts = 0;
    const correct = () => {
      if (cancelled || done) return;
      const delta = target.getBoundingClientRect().top - pad();
      if (Math.abs(delta) <= 2 || attempts >= 6) { done = true; cleanup(); return; }
      attempts += 1;
      if (Math.abs(delta) > 120 && attempts === 1) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        setTimeout(correct, 900); /* 大偏差先再平滑一次，后续即时微调 */
      } else {
        instantScrollTo(window.scrollY + delta);
        setTimeout(correct, 260);
      }
    };
    let began = false;
    const begin = () => { if (!began) { began = true; setTimeout(correct, 60); } };
    if ("onscrollend" in window) {
      window.addEventListener("scrollend", begin, { once: true });
      setTimeout(begin, 2400); /* 兜底：动画被打断、scrollend 未触发时 */
    } else setTimeout(begin, 1300); /* Safari 无 scrollend */
  };

  /* ── Keynote hero carousel ────────────────────────────────── */
  const keynoteStage = document.getElementById("keynote-stage");
  const keynoteHero = document.querySelector(".keynote-hero");
  const keynoteSlides = [...document.querySelectorAll("[data-keynote-slide]")];
  const keynoteDots = [...document.querySelectorAll("[data-keynote-target]")];
  let keynoteIndex = 0;
  let keynoteTimer;
  let keynoteHeld = false; /* V13 fix: hover/focus pause survives a tab switch */
  let pointerStartX = null;
  let pointerStartY = null;
  let swiped = false; /* 刚完成滑动手势时吞掉随后的 click，避免误跳转 */

  const showKeynoteSlide = index => {
    keynoteIndex = (index + keynoteSlides.length) % keynoteSlides.length;
    keynoteSlides.forEach((slide, slideIndex) => {
      const active = slideIndex === keynoteIndex;
      slide.classList.toggle("is-active", active);
      slide.setAttribute("aria-hidden", String(!active));
    });
    keynoteDots.forEach((dot, dotIndex) => dot.setAttribute("aria-pressed", String(dotIndex === keynoteIndex)));
  };

  const gotoKeynoteTarget = slide => {
    const target = slide && document.querySelector(slide.dataset.goto || "");
    scrollToTargetPrecise(target);
  };

  const startKeynote = () => {
    window.clearInterval(keynoteTimer);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    keynoteTimer = window.setInterval(() => showKeynoteSlide(keynoteIndex + 1), 7000);
  };

  const pauseKeynote = () => {
    keynoteHeld = true;
    window.clearInterval(keynoteTimer);
    if (keynoteHero) keynoteHero.classList.add("is-paused");
  };

  const resumeKeynote = () => {
    keynoteHeld = false;
    if (keynoteHero) keynoteHero.classList.remove("is-paused");
    startKeynote();
  };

  if (keynoteStage && keynoteSlides.length) {
    keynoteDots.forEach(dot => dot.addEventListener("click", () => {
      showKeynoteSlide(Number(dot.dataset.keynoteTarget));
      if (!keynoteHeld) startKeynote(); /* V13.4 fix: manual nav while hover-paused no longer restarts the timer (kept carousel from freezing after a tab switch) */
    }));
    keynoteStage.addEventListener("pointerenter", pauseKeynote);
    keynoteStage.addEventListener("pointerleave", resumeKeynote);
    keynoteStage.addEventListener("focusin", pauseKeynote);
    keynoteStage.addEventListener("focusout", event => {
      if (!keynoteStage.contains(event.relatedTarget)) resumeKeynote();
    });
    keynoteStage.addEventListener("pointerdown", event => {
      pointerStartX = event.clientX; pointerStartY = event.clientY; swiped = false;
    }, { passive: true });
    keynoteStage.addEventListener("pointercancel", () => { pointerStartX = null; pointerStartY = null; }, { passive: true });
    keynoteStage.addEventListener("pointerup", event => {
      if (pointerStartX === null) return;
      const deltaX = event.clientX - pointerStartX;
      const deltaY = event.clientY - pointerStartY;
      pointerStartX = null; pointerStartY = null;
      /* 仅当明显横向意图（横向位移 >48px 且大于纵向位移）才切帧；
         竖向滚屏的斜擦不再误触切换 */
      if (Math.abs(deltaX) > 48 && Math.abs(deltaX) > Math.abs(deltaY)) {
        swiped = true;
        showKeynoteSlide(keynoteIndex + (deltaX < 0 ? 1 : -1));
        if (!keynoteHeld) startKeynote();
      }
    }, { passive: true });
    /* 杜绝桌面端拖起首屏大图触发浏览器原生图片拖拽（手势被吞、像切换失灵） */
    keynoteStage.addEventListener("dragstart", event => event.preventDefault());
    /* 整帧点击 / 键盘 Enter·Space 跳转对应区块（第 1 帧→产品区，第 2 帧→IoT Cloud 区） */
    keynoteSlides.forEach(slide => {
      slide.addEventListener("click", () => {
        if (swiped) { swiped = false; return; }
        gotoKeynoteTarget(slide);
      });
      slide.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          gotoKeynoteTarget(slide);
        }
      });
    });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) window.clearInterval(keynoteTimer);
      else if (!keynoteHeld) startKeynote();
    });
    showKeynoteSlide(0);
    startKeynote();
  }

  /* ── Product picker → contact form sync ───────────────────── */
  const productSelect = document.getElementById("product");
  if (productSelect) {
    document.querySelectorAll("[data-fam]").forEach(link => {
      link.addEventListener("click", () => { productSelect.value = link.dataset.fam; });
    });
  }

  /* ── 移动端标签条：选中项自动滚入视野（横向滚动容器内）───────── */
  const famGrid = document.querySelector("#products .fam-grid");
  if (famGrid) {
    document.querySelectorAll("#products .famr").forEach(radio => {
      radio.addEventListener("change", () => {
        if (!radio.checked) return;
        const card = famGrid.querySelector(`.fam-card[for="${radio.id}"]`);
        if (card) card.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      });
    });
  }

  /* ── Deployment architecture diagram modes ──────────────────
     上方三张部署卡与图例行（Private/Public/Integration）同为切换控件，
     任一点击都同步两组控件的 aria-pressed 并切换图形高亮模式。 */
  const networkFigure = document.getElementById("network-figure");
  const networkButtons = [...document.querySelectorAll("[data-network-mode]")];
  if (networkFigure && networkButtons.length) {
    networkButtons.forEach(button => {
      button.addEventListener("click", () => {
        const mode = button.dataset.networkMode;
        networkButtons.forEach(item => item.setAttribute("aria-pressed", String(item.dataset.networkMode === mode)));
        networkFigure.classList.remove("mode-private", "mode-public", "mode-integrate");
        networkFigure.classList.add(`mode-${mode}`);
      });
    });
  }

  /* ── 页内锚点链接统一走精准跳转（Start an inquiry / Explore devices 等） ── */
  document.addEventListener("click", event => {
    if (event.defaultPrevented || event.button !== 0 ||
        event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    const hash = link.getAttribute("href");
    if (!hash || hash.length < 2) return;
    let id;
    try { id = decodeURIComponent(hash.slice(1)); } catch { return; }
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    history.pushState(null, "", hash);
    scrollToTargetPrecise(target);
  });

  /* ── Quote form → Web3Forms 真实提交（未配置端点时回退 mailto） ── */
  const isEs = document.documentElement.lang === "es";
  const form = document.getElementById("quote-form");
  const formStatus = document.getElementById("form-status");
  if (form) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const name = data.get("name"), company = data.get("company"),
            email = data.get("email"), product = data.get("product"),
            message = data.get("message");
      const subject = `IoT project inquiry — ${company}`;
      const lines = [
        `Name: ${name}`, `Company: ${company}`, `Email: ${email}`,
        `Product interest: ${product}`, "", "Project brief:", message
      ].join("\n");
      /* 语言前缀：/zh、/es 页面跳对应语言的感谢页 */
      const pre = (location.pathname.match(/^\/(zh|es)(?=\/|$)/) || [""])[0];
      if (window.HITE_FORM_ENDPOINT && window.HITE_FORM_KEY) {
        const fd = new FormData();
        fd.append("access_key", window.HITE_FORM_KEY);
        fd.append("subject", subject);
        fd.append("from_name", String(name));
        fd.append("name", String(name));
        fd.append("email", String(email));
        fd.append("message", lines);
        if (formStatus) formStatus.textContent = isEs ? "Enviando su consulta…" : "Sending your inquiry…";
        fetch(window.HITE_FORM_ENDPOINT, { method: "POST", body: fd, headers: { Accept: "application/json" } })
          .then(r => { const t = `${pre}/about/thanks`; window.location.href = r.ok ? t : `${t}?sent=0`; })
          .catch(() => { if (formStatus) formStatus.textContent = isEs ? "Error al enviar. Inténtelo de nuevo o escriba a sales@hitelecom.cn directamente." : "Submission failed. Please retry or email sales@hitelecom.cn directly."; });
      } else {
        if (formStatus) formStatus.textContent = isEs ? "Abriendo su aplicación de correo con la descripción del proyecto…" : "Opening your email application with the project brief…";
        window.location.href = `mailto:sales@hitelecom.cn?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines)}`;
      }
    });
  }
})();
