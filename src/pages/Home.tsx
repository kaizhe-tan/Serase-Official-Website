import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Target, MessageCircle, Send, Star, Compass, Coffee, Palette, BadgeCheck, Mail, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion, useMotionValue, useTransform, useSpring } from 'framer-motion'; 
import DownloadModal from '../components/DownloadModal';
import { useDocumentTitle } from '../hooks/usePageMeta';
import { getStaggerContainer, getFadeUpItem } from '../utils/animations';

import cherryLogo from '../../.figma/attachments/image-0.png';
import newsletterBg from '../../.figma/attachments/image-1.png';

export default function Home() {
  useDocumentTitle("Serasé | Real People. Real Connections.");
  
  const shouldReduceMotion = useReducedMotion();
  const stagger = getStaggerContainer(shouldReduceMotion);
  const fadeUp = getFadeUpItem(shouldReduceMotion);

  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [downloadPlatform, setDownloadPlatform] = useState<'ios' | 'android'>('ios');
  
  const openDownloadModal = (platform: 'ios' | 'android') => {
    setDownloadPlatform(platform);
    setIsDownloadModalOpen(true);
  };

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });
  
  const rotateX = useTransform(mouseY, [-150, 150], [12, -12]);
  const rotateY = useTransform(mouseX, [-150, 150], [-12, 12]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    if (shouldReduceMotion) return;
    x.set(0);
    y.set(0);
  };

  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hi! I'm Omar, your AI Dating Coach. 🍒 Tell me about your match!" },
    { role: 'user', text: "Help me write an icebreaker for A.L, she loves modern art & coffee!" },
    { role: 'ai', text: "✨ Here's a charm line: 'If you could teleport to any gallery with a fresh pour-over right now, where are we heading?'" }
  ]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hasUserInteracted) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [messages, isTyping, hasUserInteracted]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setHasUserInteracted(true);
    const userText = chatInput.trim();
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setChatInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let reply = "Smooth! Try sending this: 'I see you're a coffee addict too! ☕ What's your go-to spot in the city? Let's grab a cup this weekend!'";
      const lowerInput = userText.toLowerCase();
      
      if (userText.length < 5) {
        reply = "A bit too short! Try asking an open-ended question about their photos. 📸";
      } else if (lowerInput.includes("joke")) {
        reply = "Here's one: 'Are you a magician? Because whenever I look at your profile, everyone else disappears.' 😉";
      } else if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
        reply = "A simple 'hi' is safe, but noticing a detail in their bio gets a 40% higher response rate! 💡";
      }

      setMessages(prev => [...prev, { role: 'ai', text: reply }]);
    }, 1500);
  };

  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribeStatus('loading');
    
    setTimeout(() => {
      setSubscribeStatus('success');
      setTimeout(() => setSubscribeStatus('idle'), 5000); 
    }, 1500);
  };

  const testimonials = [
    { name: "Sarah & Mike", location: "Kuala Lumpur", text: "The 'Timed Connections' feature is a game-changer. It forced us to stop endlessly texting and actually meet up for coffee. Best first date ever!" },
    { name: "David L.", location: "Singapore", text: "Omar the AI coach completely fixed my awkward texting. The icebreakers are actually natural and funny. 10/10 recommend." },
    { name: "Emily & Chen", location: "Penang", text: "I love that everyone here is verified with MyDigital ID. No more fake profiles or scammers. It feels like a safe, premium space." }
  ];

  return (
    <div className="min-h-screen bg-background selection:bg-accent/30 selection:text-primary overflow-x-hidden pt-8 pb-32 relative">
      <section className="max-w-5xl mx-auto px-6 pt-10 pb-20 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-rose-500/20 via-amber-500/15 to-primary/20 rounded-full blur-[140px] -z-10 pointer-events-none animate-pulse-slow"></div>
        <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-rose-400/15 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

        <motion.div variants={stagger} initial="hidden" animate="show" className="grid md:grid-cols-12 gap-8 items-center w-full">
          <div className="md:col-span-7 space-y-8 text-center md:text-left">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-primary/5 border border-primary/15 px-4 py-1.5 rounded-full text-primary text-xs font-bold tracking-wide uppercase shadow-sm backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5" /> The New Standard of Dating
            </motion.div>
            <motion.div variants={fadeUp}>
              <h1 className="text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-[1.1]">
                Real People. <br />
                <span className="bg-gradient-to-r from-primary via-rose-700 to-amber-600 bg-clip-text text-transparent">Real Connections.</span>
              </h1>
            </motion.div>
            <motion.p variants={fadeUp} className="text-base lg:text-lg text-muted-foreground font-medium leading-relaxed max-w-lg mx-auto md:mx-0">
              Experience dating without the noise. 100% verified profiles, AI-powered matchmaking, and timed connections that bring romance back to reality.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start pt-2">
              <button onClick={() => openDownloadModal('ios')} className="bg-gray-900 text-white hover:bg-gray-800 px-6 py-3.5 rounded-2xl font-bold flex items-center gap-3.5 shadow-xl shadow-gray-900/10 transition-all hover:scale-105 active:scale-95 w-full sm:w-auto justify-center">
                <div className="text-left"><div className="text-[10px] uppercase tracking-wider opacity-80 leading-tight">Download on the</div><div className="text-sm font-extrabold leading-tight">App Store</div></div>
              </button>
              <button onClick={() => openDownloadModal('android')} className="bg-gray-900 text-white hover:bg-gray-800 px-6 py-3.5 rounded-2xl font-bold flex items-center gap-3.5 shadow-xl shadow-gray-900/10 transition-all hover:scale-105 active:scale-95 w-full sm:w-auto justify-center">
                <div className="text-left"><div className="text-[10px] uppercase tracking-wider opacity-80 leading-tight">GET IT ON</div><div className="text-sm font-extrabold leading-tight">Google Play</div></div>
              </button>
            </motion.div>
          </div>

          <motion.div 
            variants={fadeUp} 
            className="md:col-span-5 relative flex justify-center md:justify-end items-center w-full [perspective:1000px]"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div animate={{ y: shouldReduceMotion ? 0 : [0, -12, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="absolute -right-4 lg:-right-8 top-10 z-30 bg-white/95 backdrop-blur-xl border border-rose-100 p-3.5 px-4 rounded-2xl shadow-2xl shadow-rose-900/20 flex items-center gap-3 pointer-events-none">
              <div className="w-9 h-9 bg-white border border-rose-100/50 rounded-full flex items-center justify-center shadow-md shadow-rose-500/20 shrink-0">
                <img src={cherryLogo} alt="Cherry Logo" className="w-5 h-5 object-contain" />
              </div>
              <div><p className="text-xs font-black text-gray-900">It's a Match!</p><p className="text-[10px] text-muted-foreground font-medium">You both liked each other.</p></div>
            </motion.div>

            <motion.div 
              style={{ rotateX: shouldReduceMotion ? 0 : rotateX, rotateY: shouldReduceMotion ? 0 : rotateY, transformStyle: "preserve-3d" }}
              className="w-72 h-[530px] bg-gray-900 rounded-[3rem] p-[8px] shadow-2xl shadow-gray-900/30 relative z-10 transition-transform duration-200 ease-out"
            >
              <div className="bg-slate-50 w-full h-full rounded-[2.5rem] overflow-hidden relative flex flex-col">
                <div className="absolute top-0 inset-x-0 h-5 flex justify-center z-30"><div className="w-24 h-5 bg-gray-900 rounded-b-[1rem]"></div></div>
                <div className="w-full h-16 pt-5 bg-white/90 backdrop-blur-md flex items-end justify-center pb-2 font-extrabold text-gray-800 text-xs border-b border-gray-100 tracking-wide">Discover</div>
                <div className="p-3 flex-1 flex flex-col">
                  <div className="w-full flex-1 rounded-2xl bg-gradient-to-br from-[#8B1E2D] via-[#6B1422] to-[#4A0B13] p-4 flex flex-col justify-end text-white relative overflow-hidden shadow-inner space-y-3">
                    <div className="relative z-10 flex flex-wrap gap-1.5 pt-12">
                      <span className="bg-black/20 backdrop-blur-md border border-white/20 text-[9px] font-bold text-amber-200 px-2 py-0.5 rounded-full flex items-center gap-1"><Coffee className="w-2.5 h-2.5 text-amber-300" /> Specialty Coffee</span>
                      <span className="bg-black/20 backdrop-blur-md border border-white/20 text-[9px] font-bold text-amber-200 px-2 py-0.5 rounded-full flex items-center gap-1"><Palette className="w-2.5 h-2.5 text-amber-300" /> Modern Art</span>
                    </div>
                    <div className="relative z-10 space-y-1">
                      <div className="flex items-center gap-1.5"><h3 className="text-2xl font-black">A.L, 26</h3><span className="text-amber-300 flex items-center"><BadgeCheck className="w-5 h-5 fill-amber-300/20 text-amber-300" /></span></div>
                      <p className="text-[11px] text-white/80 font-medium leading-tight">Coffee addict & gallery explorer. Seeking deep conversations.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center gap-4 py-3">
                    <div className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-400 text-sm">✕</div>
                    <div className="w-12 h-12 rounded-full bg-white shadow-lg shadow-rose-500/30 border border-rose-100 flex items-center justify-center animate-glow-pulse">
                      <img src={cherryLogo} alt="Cherry Logo" className="w-6 h-6 object-contain" />
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <section className="py-12 border-y border-gray-100 bg-gray-50/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-8">Backed by & Featured in</p>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            <div className="text-xl font-black text-gray-800 tracking-tighter">TechDaily</div>
            <div className="text-xl font-black text-gray-800 tracking-tighter">DatingInsider</div>
            <div className="text-xl font-black text-gray-800 tracking-tighter">StartupMY</div>
            <div className="text-xl font-black text-gray-800 tracking-tighter">TheLifestyle</div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-20 relative">
        <div className="bg-gradient-to-br from-primary via-primary/95 to-rose-950 rounded-[3rem] p-8 md:p-12 text-white shadow-2xl shadow-primary/25 relative overflow-hidden grid lg:grid-cols-2 gap-12 items-center border border-white/10">
          <div className="space-y-6 relative z-10 text-center lg:text-left">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-amber-300 border border-white/20 shadow-inner mx-auto lg:mx-0"><Sparkles className="w-6 h-6" /></div>
            <h2 className="text-4xl font-extrabold tracking-tight leading-tight">Meet Omar, <br />Your AI Wingman.</h2>
            <p className="text-white/80 text-sm leading-relaxed">Never stare at a blank chat screen again. Our built-in AI dating coach analyzes profiles and helps you craft the perfect icebreaker.</p>
          </div>

          <div className="w-full max-w-sm mx-auto relative z-10">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-4 shadow-2xl flex flex-col h-[500px]">
              <div className="px-3 py-2 border-b border-white/10 flex items-center justify-between pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-amber-400 text-primary font-black flex items-center justify-center text-sm">O</div>
                  <div><h4 className="font-extrabold text-white text-xs">Omar AI</h4><span className="text-[10px] text-green-400 font-bold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span> Active Coach</span></div>
                </div>
              </div>
              
              <div className="flex-1 p-3 overflow-y-auto scrollbar-hide flex flex-col gap-3 my-2">
                <AnimatePresence initial={false}>
                  {messages.map((msg, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12, scale: shouldReduceMotion ? 1 : 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs font-medium leading-relaxed ${msg.role === 'ai' ? 'bg-white/15 border border-white/10 text-white self-start backdrop-blur-md rounded-tl-none shadow-sm' : 'bg-amber-400 text-gray-900 font-semibold self-end rounded-tr-none shadow-md'}`}
                    >
                      {msg.text}
                    </motion.div>
                  ))}
                  {isTyping && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-[85%] bg-white/15 border border-white/10 text-amber-200 self-start rounded-2xl rounded-tl-none px-4 py-2.5 flex gap-1.5 items-center">
                      <span className="w-1.5 h-1.5 bg-amber-300 rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-amber-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                      <span className="w-1.5 h-1.5 bg-amber-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div ref={chatEndRef} />
              </div>

              <form onSubmit={handleSendMessage} className="pt-2 border-t border-white/10 relative flex items-center">
                <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Ask Omar anything..." className="w-full bg-black/25 border border-white/15 rounded-full pl-4 pr-11 py-2.5 text-xs text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-amber-300 transition-all" />
                <button type="submit" disabled={!chatInput.trim() || isTyping} className="absolute right-1.5 w-7 h-7 rounded-full bg-amber-400 text-primary flex items-center justify-center disabled:opacity-30"><Send className="w-3.5 h-3.5 fill-current" /></button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 🚀 爆改区域：Scrapbook / Rigged Letter 风格的信件区 ==================== */}
      <section className="max-w-6xl mx-auto px-6 py-24 relative overflow-hidden">
        
        {/* 剪贴簿风格标题：马克笔高光效果 */}
        <div className="text-center mb-20 space-y-4 flex flex-col items-center">
          <div className="inline-block relative">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight relative z-10 px-2">
              Success Stories
            </h2>
            {/* 模拟马克笔涂抹的高光 */}
            <div className="absolute bottom-1 left-0 w-full h-4 bg-amber-200/80 -rotate-2 -z-10 rounded-sm"></div>
          </div>
          <p className="text-muted-foreground text-lg font-medium italic">
            Don't just take our word for it. Read the notes from our community.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 md:gap-8 items-center px-4">
          {testimonials.map((testi, idx) => {
            // 给每张纸条设置不同的随机倾斜角度，营造真实的剪贴簿凌乱感
            const cardRotations = ['-rotate-2', 'rotate-2', '-rotate-1'];
            // 给胶带设置不同的位置和倾斜角
            const tapeRotations = ['rotate-3', '-rotate-2', 'rotate-1'];
            const tapePositions = ['left-[30%]', 'left-1/2', 'left-[70%]'];

            return (
              <div 
                key={idx} 
                className={`relative ${cardRotations[idx]} hover:rotate-0 hover:-translate-y-2 transition-all duration-300 ease-out group`}
              >
                
                {/* 🏷️ 模拟半透明的遮蔽胶带 (Masking Tape) */}
                <div 
                  className={`absolute -top-3 ${tapePositions[idx]} -translate-x-1/2 w-16 h-7 bg-white/60 backdrop-blur-sm border border-gray-200 shadow-sm ${tapeRotations[idx]} z-20`}
                  style={{ backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.2) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.2) 75%, transparent 75%, transparent)' }}
                ></div>

                {/* 📝 卡片本体：撕纸信件风格 (硬阴影 + 虚线) */}
                <div 
                  className="bg-[#FDFBF7] p-8 md:p-10 relative z-10 h-full flex flex-col justify-between"
                  style={{
                    border: '1px solid rgba(0,0,0,0.06)',
                    // 使用生硬的偏移阴影 (Offset Shadow) 营造纸张剪切感
                    boxShadow: '8px 8px 0px 0px rgba(138, 33, 40, 0.05)',
                    borderRadius: '2px' // 几乎直角，模仿剪下来的纸片
                  }}
                >
                  <div className="space-y-6 relative z-10">
                    <div className="flex gap-1.5 text-amber-400">
                      {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-4 h-4 fill-current" />)}
                    </div>
                    {/* 使用稍微衬线/手写感的排版 */}
                    <p className="text-[15px] leading-relaxed text-gray-700 font-medium italic">
                      "{testi.text}"
                    </p>
                  </div>

                  {/* 模拟参考图中的虚线分割 (Dashed Line) */}
                  <hr className="border-t-2 border-dashed border-gray-200/80 my-6" />

                  <div className="flex items-center gap-4 relative z-10">
                    <div className="w-12 h-12 bg-primary/10 text-primary font-black flex items-center justify-center text-lg transform -rotate-6 border border-primary/20 shadow-sm" style={{ borderRadius: '4px' }}>
                      {testi.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-base font-black text-gray-900 tracking-tight">{testi.name}</div>
                      <div className="text-[11px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">{testi.location}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-20 relative">
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="w-full rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden shadow-2xl group">
          <img src={newsletterBg} alt="Couple at sunset" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105" />
          <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-[2px]"></div>
          <motion.div variants={fadeUp} className="relative z-10 max-w-2xl mx-auto space-y-6">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto border border-white/10 mb-8"><Mail className="w-8 h-8 text-white" /></div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Stay in the loop.</h2>
            <p className="text-gray-300 font-medium pb-4">Subscribe to our newsletter for the latest dating tips, app updates, and exclusive VIP offers.</p>
            
            <div className="max-w-md mx-auto w-full h-14">
              <AnimatePresence mode="wait">
                {subscribeStatus === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="w-full h-full flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 rounded-2xl"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                    <span className="font-semibold text-sm">Successfully subscribed!</span>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubscribe}
                    className="flex flex-col sm:flex-row gap-3 w-full h-full"
                  >
                    <input 
                      type="email" 
                      placeholder="Enter your email address" 
                      required 
                      disabled={subscribeStatus === 'loading'}
                      className="flex-1 h-14 bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium px-6 rounded-2xl focus:outline-none placeholder:text-white/50 disabled:opacity-50 transition-all" 
                    />
                    <button 
                      type="submit" 
                      disabled={subscribeStatus === 'loading'}
                      className="h-14 px-8 bg-primary text-white font-bold rounded-2xl flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap transition-all"
                    >
                      {subscribeStatus === 'loading' ? (
                        <Loader2 className="w-5 h-5 animate-spin mx-4" />
                      ) : (
                        <>Subscribe <ArrowRight className="w-4 h-4" /></>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

          </motion.div>
        </motion.div>
      </section>

      <DownloadModal isOpen={isDownloadModalOpen} onClose={() => setIsDownloadModalOpen(false)} platform={downloadPlatform} />
    </div>
  );
}