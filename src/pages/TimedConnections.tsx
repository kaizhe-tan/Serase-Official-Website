import { Clock, AlertCircle, Timer, Send } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useDocumentTitle } from "../hooks/usePageMeta";
import { getStaggerContainer, getFadeUpItem } from "../utils/animations";

export default function TimedConnections() {
  useDocumentTitle("Timed Connections | Serasé");

  const shouldReduceMotion = useReducedMotion();
  const stagger = getStaggerContainer(shouldReduceMotion);
  const fadeUp = getFadeUpItem(shouldReduceMotion);

  return (
    <div className="pt-16 pb-32 overflow-x-hidden">
      <motion.div 
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-5xl mx-auto px-6"
      >
        <motion.div variants={fadeUp} className="text-center mb-20 max-w-3xl mx-auto space-y-4">
          <motion.div 
            animate={{ scale: shouldReduceMotion ? 1 : [1, 1.06, 1] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="w-20 h-20 bg-red-50 text-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner"
          >
            <Clock className="w-10 h-10" />
          </motion.div>
          <h1 className="text-5xl font-extrabold text-primary tracking-tight">Timed Connections</h1>
          <p className="text-xl text-muted-foreground font-medium">
            The end of ghosting. If they don't reply, the connection expires.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          <motion.div variants={fadeUp} className="space-y-8">
            <div>
              <h3 className="text-3xl font-extrabold text-foreground tracking-tight mb-4">How it works</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Once you match, a 24-hour countdown begins. If the first message isn't sent, or if a reply isn't received within the window, the match disappears forever.
              </p>
            </div>

            <div className="bg-red-50/80 border border-red-100 p-6 rounded-2xl flex items-start gap-4 shadow-sm">
              <AlertCircle className="w-6 h-6 text-primary shrink-0 mt-0.5" />
              <p className="text-primary font-medium leading-relaxed text-sm">
                This encourages intentional, high-quality conversations instead of collecting matches for validation.
              </p>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="relative flex justify-center items-center group w-full">
            <div className="absolute w-[110%] h-[110%] bg-gradient-to-br from-red-500/15 to-orange-500/5 rounded-full blur-[80px] -z-10 transition-opacity duration-500 group-hover:opacity-80"></div>

            <div className="w-72 h-[550px] bg-gray-900 rounded-[3rem] p-[8px] shadow-2xl shadow-gray-900/30 relative group-hover:scale-[1.02] transition-transform duration-500 z-10">
              <div className="bg-slate-50 w-full h-full rounded-[2.5rem] overflow-hidden relative flex flex-col items-center">
                <div className="absolute top-0 inset-x-0 h-5 flex justify-center z-30">
                  <div className="w-24 h-5 bg-gray-900 rounded-b-[1rem]"></div>
                </div>

                <div className="w-full h-16 pt-5 pb-2 bg-white/90 backdrop-blur-md flex items-center justify-center font-bold text-foreground border-b border-border/50 z-20 text-sm shadow-sm shrink-0">
                  New Match
                </div>
                
                <div className="mt-8 relative">
                  {/* 🚀 替换为了原生的 framer-motion，并支持无障碍降级 */}
                  <motion.div 
                    animate={shouldReduceMotion ? { rotate: 0 } : { rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
                    className="w-32 h-32 rounded-full border-4 border-dashed border-red-400/40 p-1 flex items-center justify-center"
                  />
                  <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-primary to-rose-400 p-[3px] shadow-xl shadow-red-500/20 absolute inset-2">
                    <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-4xl font-black text-primary">
                      E
                    </div>
                  </div>
                </div>

                <div className="mt-3 text-center">
                  <h3 className="text-2xl font-extrabold text-primary">Elena, 28</h3>
                  <p className="text-[11px] text-green-500 font-bold mt-1 flex items-center justify-center gap-1 uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Online
                  </p>
                </div>

                <div className="mt-6 w-[88%] bg-white p-5 rounded-[1.5rem] shadow-md border border-red-100/80 flex flex-col items-center relative">
                  <div className="flex items-center gap-2 text-primary font-mono text-2xl font-black tracking-tight">
                    <Timer className="w-5 h-5 text-red-500 animate-pulse" />
                    <span>08:45:12</span>
                  </div>
                  <div className="text-[10px] text-red-400/80 font-bold tracking-[0.15em] uppercase mt-0.5 mb-4">
                    Connection Expires Soon
                  </div>

                  <button className="w-full bg-primary text-white font-bold py-3 rounded-xl shadow-md shadow-primary/20 flex items-center justify-center gap-2 hover:bg-primary/90 transition-transform active:scale-95 text-xs tracking-wide uppercase">
                    <Send className="w-3.5 h-3.5 fill-current" /> Send Icebreaker
                  </button>
                </div>

                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-20 h-1 bg-gray-900/20 rounded-full z-30"></div>
              </div>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}