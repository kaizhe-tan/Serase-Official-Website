import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Logo from './Logo';
import { useFocusTrap } from '../hooks/useFocusTrap'; // 👈 引入焦点陷阱 Hook

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  platform?: 'ios' | 'android' | null;
}

export default function DownloadModal({ isOpen, onClose, platform = 'ios' }: DownloadModalProps) {
  const isIos = platform === 'ios';
  
  // 👈 获取减弱动画系统偏好
  const shouldReduceMotion = useReducedMotion();
  
  // 👈 启用弹窗的焦点陷阱与 Esc 支持
  const modalRef = useFocusTrap(isOpen, onClose); 

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          {/* 弹窗主体 */}
          <motion.div 
            ref={modalRef} // 👈 绑定容器
            tabIndex={-1}  // 👈 允许 div 获取焦点
            aria-modal="true"
            role="dialog"
            // 👈 动态剥离初始位移，支持减弱动画
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95, y: shouldReduceMotion ? 0 : 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95, y: shouldReduceMotion ? 0 : 15 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="bg-white rounded-[2.5rem] max-w-md w-full p-8 relative shadow-2xl border border-gray-100 flex flex-col items-center text-center outline-none"
          >
            
            {/* 右上角关闭按钮 */}
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-muted text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </motion.button>

            {/* 顶部：Serasé 官方 Logo 容器 */}
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6 shadow-sm">
              <Logo height={36} />
            </div>

            <h3 className="text-2xl font-black text-gray-900 tracking-tight">
              Get Serasé for {isIos ? 'iOS' : 'Android'}
            </h3>
            
            <p className="text-sm text-muted-foreground font-medium mt-2 max-w-xs leading-relaxed">
              Scan the QR code with your phone's camera, or download directly below.
            </p>

            {/* 二维码区域 (带激光扫描线) */}
            <div className="my-6 w-52 h-52 bg-amber-50/50 border-2 border-dashed border-amber-300/60 rounded-3xl flex flex-col items-center justify-center p-4 shadow-inner relative group overflow-hidden">
              <div className="w-40 h-40 bg-white rounded-2xl p-3 shadow-md flex items-center justify-center border border-gray-100 relative">
                {/* 动态激光扫描线 */}
                <motion.div
                  // 👈 扫描线的运动幅度较大，若开启减弱动画则直接隐藏
                  animate={shouldReduceMotion ? {} : { y: [0, 130, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                  className={`absolute top-2 left-2 right-2 h-0.5 bg-primary/40 shadow-[0_0_10px_2px_rgba(225,29,72,0.3)] z-50 rounded-full ${shouldReduceMotion ? 'hidden' : ''}`}
                />
                {/* 模拟二维码 */}
                <svg className="w-full h-full text-gray-800" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm11-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm13-2h2v2h-2v-2zm4 0h2v2h-2v-2zm-4 4h2v2h-2v-2zm4 0h2v2h-2v-2zm-4 4h2v2h-2v-2zm4 0h2v2h-2v-2zm-6-8h2v2h-2v-2zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2z"/>
                </svg>
              </div>
            </div>

            <div className="w-full h-px bg-gray-100 mb-6"></div>

            <div className="w-full space-y-3">
              <a
                href="https://apple.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`w-full py-3.5 px-6 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all ${
                  isIos 
                    ? 'bg-gray-900 text-white hover:bg-gray-800 shadow-lg shadow-gray-900/20 scale-[1.02]' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 opacity-70'
                }`}
              >
                <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 384 512">
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.1-12 69.5-34.3z"/>
                </svg>
                <span className="text-sm font-extrabold">App Store</span>
              </a>

              <a
                href="https://play.google.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`w-full py-3.5 px-6 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all ${
                  !isIos 
                    ? 'bg-gray-900 text-white hover:bg-gray-800 shadow-lg shadow-gray-900/20 scale-[1.02]' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 opacity-70'
                }`}
              >
                <svg className="w-4.5 h-4.5 fill-current shrink-0" viewBox="0 0 512 512">
                  <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l220.7-221.3 60.1 60.1L104.6 499z"/>
                </svg>
                <span className="text-sm font-extrabold">Google Play</span>
              </a>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}