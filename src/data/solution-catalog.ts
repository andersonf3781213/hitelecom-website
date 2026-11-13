// Kimi：每个解决方案独立维护JSON。共享组件控制版式，内容不会在浏览器端二次请求。
const modules = import.meta.glob('./solutions/*.json', { eager: true, import: 'default' });
export const solutions = Object.values(modules).sort((a:any,b:any)=>a.number.localeCompare(b.number)) as any[];
export const previewFilename = (s:any) => `Hitelecom-Solution-${s.number}-${s.slug}-Preview-EN-20261111.html`;

// 01 保留独立仓储组件；只加入审核目录，不生成重复动态路由。
export const reviewSolutions = [{number:"01",slug:"warehouse-monitoring",title:"Smart Warehousing",hero:{image:"warehouse-hero",alt:"Warehouse pallet racking and an inspection aisle",intro:"Rack tilt first. Add stock conditions, equipment measurements and defined EHS interfaces around the warehouse task."}},...solutions];
