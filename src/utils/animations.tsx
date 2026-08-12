import { Variants } from 'framer-motion';

// 统一过渡参数，方便全局调整
export const TRANSITIONS = {
  fast: { duration: 0.2, ease: "easeOut" },
  normal: { duration: 0.4, ease: "easeOut" },
  slow: { duration: 0.7, ease: "easeOut" },
  spring: { type: "spring", bounce: 0, duration: 0.5 },
  springBouncy: { type: "spring", stiffness: 260, damping: 20 }
} as const;

// 动态生成交错容器 (支持无障碍降级)
export const getStaggerContainer = (shouldReduceMotion: boolean | null): Variants => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: shouldReduceMotion ? 0 : 0.12,
      delayChildren: 0.1,
    }
  }
});

// 动态生成向上浮现元素 (支持无障碍降级)
export const getFadeUpItem = (shouldReduceMotion: boolean | null): Variants => ({
  hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: TRANSITIONS.normal
  }
});