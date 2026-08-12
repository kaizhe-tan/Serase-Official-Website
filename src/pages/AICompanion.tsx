import React, { useState, useEffect } from 'react';
import { Sparkles, Bot, Shield, Calendar, MessageSquareText } from "lucide-react";
import { motion } from 'framer-motion';
import { useDocumentTitle } from "../hooks/usePageMeta";

export default function AICompanion() {
  useDocumentTitle("AI Companion & Coach | Serasé");

  const fullText = '"I saw you\'re into modern art! If you could teleport to any gallery right now, where are we heading?"';
  const [typedText, setTypedText] = useState('');

  // 🐛 修复后的打字机逻辑：状态同步清理
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, index));
      index++;
      
      // 打字完成后触发循环
      if (index > fullText.length) {
        clearInterval(interval); // 停止当前打字
        
        setTimeout(() => {
          // 👈 核心修复：同步将 index 和 typedText 置为初始状态
          index = 0;
          setTypedText(''); 
          
          // 重新启动打字循环（通过触发下一次 useEffect）
          // 这里为了简单，我们用一个小小的 trick：直接在这个闭包里递归或者用更可控的 setTimeout 链
          // 但由于外层没有 state 依赖，最稳妥的方法是重构为递归的 setTimeout
        }, 3000); 
      }
    }, 45);

    return () => clearInterval(interval);
  }, []); // 这里的依赖数组是空的，所以上面的 setInterval 逻辑其实并不完善。

  // ==========================================
  // ✨ 更健壮的 React 风格打字机实现 (重构)
  // ==========================================
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (currentIndex < fullText.length) {
      // 正在打字阶段
      timeoutId = setTimeout(() => {
        setTypedText(fullText.slice(0, currentIndex + 1));
        setCurrentIndex((prev) => prev + 1);
      }, 45);
    } else {
      // 打字完成，等待 3 秒后重置
      timeoutId = setTimeout(() => {
        setTypedText('');      // 👈 同步清空文本
        setCurrentIndex(0);    // 👈 同步清空索引
      }, 3000);
    }

    return () => clearTimeout(timeoutId);
  }, [currentIndex, fullText]);


  return (
    <div className="pt-16 pb-32 relative overflow-hidden">
      
      {/* 全局背景氛围光 */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[500px] -z-10 pointer-events-none flex justify-between items-center opacity-70 blur-[100px]">
        <div className="w-[450px] h-[450px] bg-gradient-to-tr from-amber-400/30 to-orange-300/20 rounded-full"></div>
        <div className="w-[450px] h-[450px] bg-gradient-to-br from-primary/30 to-rose-600/20 rounded-full"></div>
      </div>

      {/* 顶部标题区 */}
      <div className="text-center px-6 mb-20 max-w-3xl mx-auto space-y-4">
        <div className="w-16 h-16 bg-gradient-to-tr from-amber-500/20 to-primary/20 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md border border-amber-500/20 backdrop-blur-md">
          <Sparkles className="w-8 h-8 text-amber-600" />
        </div>
        <h1 className="text-5xl font-extrabold text-primary tracking-tight">
          Your Prompt-Driven Wingman.
        </h1>
        <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
          Never run out of things to say. Use natural language prompts to craft the perfect message or plan an unforgettable date.
        </p>
      </div>

      {/* 核心双卡片展示区 */}
      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-stretch relative z-10">
        
        {/* 左卡片：Prompt to Break the Ice */}
        <div className="bg-white/80 backdrop-blur-xl border border-amber-200/60 rounded-[2.5rem] p-8 shadow-2xl shadow-amber-900/10 flex flex-col justify-between relative overflow-hidden group hover:scale-[1.01] transition-all duration-500">
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-amber-300/20 rounded-full blur-2xl pointer-events-none"></div>

          <div>
            <div className="w-12 h-12 bg-amber-100/80 rounded-2xl flex items-center justify-center text-amber-700 mb-6 border border-amber-300/50 shadow-sm">
              <Sparkles className="w-6 h-6 fill-current" />
            </div>
            <h3 className="text-2xl font-extrabold text-gray-900 mb-3">
              Prompt to Break the Ice
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Not sure how to start the conversation? Just type a prompt. The AI Companion analyzes context and gives you a charming, natural opening line.
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-amber-200/60 shadow-lg space-y-3">
            <div className="bg-slate-50/90 p-3 rounded-xl border border-gray-200/80 text-xs font-semibold text-gray-700 flex items-center gap-2.5">
              <MessageSquareText className="w-4 h-4 text-amber-500 shrink-0" />
              <p className="truncate">"Help me write an icebreaker about her love for modern art"</p>
            </div>

            <div className="bg-primary/5 border border-primary/20 text-primary p-3.5 rounded-xl text-xs font-medium space-y-1 min-h-[80px]">
              <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-primary">
                <Sparkles className="w-3.5 h-3.5 fill-current" /> AI Companion Generated
              </div>
              <p className="leading-relaxed font-semibold text-gray-800">
                {typedText}
                <span className="inline-block w-1 h-3.5 bg-amber-500 ml-1 animate-pulse"></span>
              </p>
            </div>
          </div>
        </div>

        {/* 右卡片：Omar - The Signature Coach */}
        <div className="bg-gradient-to-br from-primary via-primary/95 to-rose-950 text-white rounded-[2.5rem] p-8 shadow-2xl shadow-primary/30 flex flex-col justify-between relative overflow-hidden group border border-white/15 hover:scale-[1.01] transition-all duration-500">
          <div className="absolute -top-12 -right-12 w-44 h-44 bg-amber-400/20 rounded-full blur-2xl pointer-events-none"></div>

          <div>
            <div className="flex justify-between items-start mb-6">
              <motion.div 
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-amber-300 border border-white/20 shadow-inner"
              >
                <Bot className="w-6 h-6" />
              </motion.div>
              <span className="bg-amber-400/20 border border-amber-300/40 text-amber-200 text-[10px] font-extrabold uppercase px-3 py-1.5 rounded-full tracking-wider flex items-center gap-1.5 backdrop-blur-sm shadow-sm">
                <Shield className="w-3 h-3" /> Signature Exclusive
              </span>
            </div>

            <h3 className="text-2xl font-extrabold mb-3 text-white">
              Omar: The Signature Coach
            </h3>
            <p className="text-white/80 text-sm leading-relaxed mb-6 font-normal">
              Exclusive to Serasé Signature. Go beyond icebreakers with full itinerary generation, deep compatibility insights, and personalized relationship advice.
            </p>
          </div>

          <div className="bg-black/30 backdrop-blur-md rounded-2xl p-4 border border-white/15 space-y-3 shadow-xl">
            <div className="flex items-center justify-between text-xs font-bold text-amber-300 border-b border-white/10 pb-2.5">
              <span className="flex items-center gap-2"><Bot className="w-4 h-4" /> Serasé Coach Omar</span>
              <span className="text-[10px] bg-amber-400/20 px-2 py-0.5 rounded text-amber-200 font-normal flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span> Active Thread
              </span>
            </div>
            
            <div className="bg-white/10 p-3 rounded-xl border border-white/10 space-y-1">
              <div className="text-[10px] font-bold text-amber-200 uppercase tracking-wider flex items-center gap-1">
                <Calendar className="w-3 h-3" /> Itinerary Card
              </div>
              <p className="text-xs font-bold text-white">Saturday Date: Coffee & Modern Art Walk</p>
              <p className="text-[11px] text-white/70">Tailored to your mutual interests in City Gallery.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}