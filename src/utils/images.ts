import { getImage } from 'astro:assets';
import type { ImageMetadata, UnresolvedImageTransform } from 'astro:assets';

/**
 * 集中管理 src/assets/images 下的图片：
 * 组件传入相对路径（如 'hero/bg-sensors.jpg'），构建时自动压缩、转 WebP、
 * 生成多尺寸，并注入宽高避免布局抖动（CLS）。
 */
const images = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/images/**/*.{jpeg,jpg,png,gif,webp}',
);

export async function resolveImage(src: string): Promise<ImageMetadata> {
  const path = `/src/assets/images/${src}`;
  const loader = images[path];
  if (!loader) throw new Error(`[images] 未找到图片文件: ${path}`);
  return (await loader()).default;
}

/** 生成优化后的图片地址（用于 CSS 背景、preload 等场景） */
export async function optimizedSrc(
  src: string,
  options?: Partial<UnresolvedImageTransform>,
): Promise<string> {
  const img = await getImage({
    src: await resolveImage(src),
    format: 'webp',
    ...options,
  });
  return img.src;
}
