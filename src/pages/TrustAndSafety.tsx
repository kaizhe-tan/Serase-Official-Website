import React from 'react';
import { Sparkles, UserCheck, ShieldAlert, Lock, ShieldCheck, HeartHandshake, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { useDocumentTitle } from '../hooks/usePageMeta';

export default function Safety() {
  useDocumentTitle("Trust & Safety | Serasé");

  const safetyFeatures = [
    {
      icon: UserCheck,
      title: "Strict 18+ Verification",
      description: "We enforce a zero-tolerance policy for fake accounts. Every member must undergo mandatory Dual Verification: a valid government ID (Passport/IC) coupled with live facial recognition.",
      highlightColor: "text-green-600",
      highlightBg: "bg-green-50"
    },
    {
      icon: ShieldAlert,
      title: "Emergency Contact Mechanism",
      description: "Privacy First. During registration, you may provide an Emergency Contact. This information is strictly confidential and never displayed on your profile. It is solely used for critical SOS situations.",
      highlightColor: "text-rose-600",
      highlightBg: "bg-rose-50"
    },
    {
      icon: Lock,
      title: "Community & Reporting",
      description: "Maintain control over your experience. Easily Block or Disconnect from any user. Our robust Report User workflow ensures that any violations of our community standards are handled swiftly.",
      highlightColor: "text-amber-600",
      highlightBg: "bg-amber-50"
    }
  ];

  return (
    <div className="min-h-screen bg-background selection:bg-accent/30 selection:text-primary pt-12 pb-32 relative overflow-x-hidden">
      
      {/* 确保你 CSS 里的 animate-pulse-slow 在这里已经生效 */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-br from-green-400/10 via-primary/10 to-amber-400/10 rounded-full blur-[140px] -z-10 pointer-events-none animate-pulse-slow"></div>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* 头部 Title (加入淡入浮现) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-5 mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200/60 px-4 py-1.5 rounded-full text-green-700 text-xs font-extrabold tracking-widest uppercase shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5" /> 100% Secure Environment
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight">
            Trust & Safety
          </h1>
          <p className="text-lg text-muted-foreground font-medium max-w-xl mx-auto">
            Your safety is the absolute foundation of Serasé. We blend advanced technology with strict policies to keep you protected.
          </p>
        </motion.div>

        {/* 🚀 卡片交错入场 (Staggered Entrance) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {safetyFeatures.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="group relative bg-white/90 backdrop-blur-md border border-gray-200/70 p-8 rounded-[2.5rem] shadow-xl shadow-gray-200/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/15 overflow-hidden flex flex-col h-full"
            >
              <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${feature.highlightBg}`}></div>
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 border border-gray-100 shadow-sm transition-all duration-500 group-hover:scale-110 ${feature.highlightBg} ${feature.highlightColor}`}>
                <feature.icon className="w-8 h-8 stroke-[2.5]" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-4 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 font-medium leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* 底部保障声明滚动滑入 */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mt-24 max-w-4xl mx-auto bg-gradient-to-br from-gray-900 to-gray-800 rounded-[3rem] p-10 md:p-12 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] pointer-events-none"></div>
          
          <div className="space-y-4 relative z-10 text-center md:text-left">
            <h3 className="text-2xl font-black">Zero Tolerance Policy</h3>
            <p className="text-sm text-gray-300 font-medium max-w-md leading-relaxed">
              Catfishing, scams, and harassment are strictly prohibited. Violators are permanently banned from the platform using device-level and ID-level blacklisting.
            </p>
          </div>

          <div className="flex gap-4 relative z-10 shrink-0">
            <motion.div whileHover={{ rotate: -15, scale: 1.1 }} className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center text-rose-400 cursor-pointer">
              <EyeOff className="w-6 h-6" />
            </motion.div>
            <motion.div whileHover={{ rotate: 15, scale: 1.1 }} className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center text-amber-300 cursor-pointer">
              <HeartHandshake className="w-6 h-6" />
            </motion.div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}