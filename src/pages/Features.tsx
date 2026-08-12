import { ShieldCheck, Zap, MessageSquare, MapPin, Coffee, Camera, X, Heart, Wine, Map } from "lucide-react";
import { motion } from "framer-motion";
import { useDocumentTitle } from "../hooks/usePageMeta";

export default function Features() {
  useDocumentTitle("Features - Swipe & Match | Serasé");

  return (
    <div className="max-w-5xl mx-auto px-6 py-24 space-y-32">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-6 max-w-3xl mx-auto"
      >
        <h1 className="text-5xl font-extrabold text-primary tracking-tight">Product Features</h1>
        <p className="text-xl text-muted-foreground font-medium">Designed for intention. Built for connection.</p>
      </motion.div>

      {/* ==================== Feature 1: Swipe & Match ==================== */}
      <div className="grid md:grid-cols-2 gap-16 items-center overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative flex justify-center items-center group w-full"
        >
          <div className="absolute w-[120%] h-[120%] bg-gradient-to-br from-primary/20 to-accent/5 rounded-full blur-[80px] -z-10 transition-opacity duration-500 group-hover:opacity-80"></div>

          <div className="w-72 h-[550px] bg-gray-900 rounded-[3rem] p-[8px] shadow-2xl shadow-gray-900/30 relative group-hover:scale-[1.02] transition-transform duration-500 z-10">
            <div className="bg-slate-50 w-full h-full rounded-[2.5rem] overflow-hidden relative flex flex-col">
              <div className="absolute top-0 inset-x-0 h-5 flex justify-center z-30">
                <div className="w-24 h-5 bg-gray-900 rounded-b-[1rem]"></div>
              </div>

              <div className="h-14 bg-white/90 backdrop-blur-md flex items-end justify-center pb-2 font-bold text-foreground border-b border-border/50 z-20 text-sm">Discover</div>
              
              <div className="flex-1 p-3 flex flex-col gap-3 relative z-10 bg-muted/10">
                <div className="flex-1 bg-gradient-to-br from-primary to-accent/90 rounded-[2rem] relative overflow-hidden flex flex-col justify-end p-5 text-white shadow-md">
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                    <div className="w-48 h-48 rounded-full border border-white flex items-center justify-center">
                      <div className="w-32 h-32 rounded-full border border-white flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full border border-white"></div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] font-bold flex items-center gap-1.5 border border-white/20 z-10">
                    <Zap className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" /> 85% Synced
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-3xl font-extrabold flex items-center gap-2 mb-1">
                      J.D, 28 <ShieldCheck className="w-6 h-6 text-white" />
                    </h3>
                    <p className="opacity-95 text-[13px] font-medium drop-shadow-sm">Coffee addict & weekend hiker.</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <span className="bg-black/40 border border-white/20 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide text-white">Photography</span>
                      <span className="bg-black/40 border border-white/20 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide text-white">Travel</span>
                    </div>
                  </div>
                </div>
                
                <div className="h-[70px] flex justify-center items-center gap-5 pb-2">
                  <motion.div whileTap={{ scale: 0.9 }} className="w-14 h-14 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors cursor-pointer"><X className="w-6 h-6" /></motion.div>
                  <motion.div whileTap={{ scale: 0.9 }} className="w-14 h-14 rounded-full bg-primary shadow-xl shadow-red-500/30 flex items-center justify-center text-white hover:scale-105 transition-transform cursor-pointer"><Heart className="w-6 h-6 fill-current" /></motion.div>
                </div>
              </div>

              <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-20 h-1 bg-gray-900/20 rounded-full z-30"></div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="space-y-6"
        >
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-2">
            <Zap className="w-8 h-8" />
          </div>
          <h3 className="text-3xl font-extrabold text-foreground tracking-tight">Swipe & Match</h3>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Connect based on 10 curated interests. When you match, see your <span className="font-bold text-foreground">"Frequencies Synced"</span> compatibility score to know instantly if you vibe.
          </p>
        </motion.div>
      </div>

      {/* ==================== Feature 2: Chat & Media ==================== */}
      <div className="grid md:grid-cols-2 gap-16 items-center overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="space-y-6 order-2 md:order-1"
        >
          <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center text-accent mb-2">
            <MessageSquare className="w-8 h-8" />
          </div>
          <h3 className="text-3xl font-extrabold text-foreground tracking-tight">Chat & Media</h3>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Express yourself fully. Send text, photos, voice notes, and enjoy HD video calls for an immersive dating experience.
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative flex justify-center items-center order-1 md:order-2 group w-full"
        >
          <div className="absolute w-[120%] h-[120%] bg-gradient-to-bl from-accent/20 to-primary/5 rounded-full blur-[80px] -z-10 transition-opacity duration-500 group-hover:opacity-80"></div>
          <div className="w-72 h-[550px] bg-gray-900 rounded-[3rem] p-[8px] shadow-2xl shadow-gray-900/30 relative group-hover:scale-[1.02] transition-transform duration-500 z-10">
            <div className="bg-gray-50 w-full h-full rounded-[2.5rem] overflow-hidden relative flex flex-col">
              <div className="absolute top-0 inset-x-0 h-5 flex justify-center z-30">
                <div className="w-24 h-5 bg-gray-900 rounded-b-[1rem]"></div>
              </div>
              <div className="bg-white px-5 pt-8 pb-3 border-b border-gray-100 shadow-sm flex items-center gap-3 z-20 relative">
                 <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-accent text-white flex items-center justify-center font-bold shadow-sm">A</div>
                 <div>
                   <div className="font-bold text-gray-900 text-sm">Alex, 31</div>
                   <div className="text-[10px] text-green-500 font-bold flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>Online</div>
                 </div>
              </div>
              <div className="flex-1 p-4 flex flex-col overflow-y-auto bg-gray-50 gap-4">
                <div className="text-center text-[10px] text-gray-400 font-semibold my-1">Today 14:30</div>
                <div className="bg-white p-3 rounded-2xl rounded-tl-none self-start border border-gray-100 text-[13px] max-w-[85%] shadow-sm text-gray-800 font-medium">
                  That sounds amazing! Have you ever been to the Modern Art Gallery downtown? 🎨
                </div>
                <div className="bg-gradient-to-r from-primary to-rose-500 text-white p-3 rounded-2xl rounded-tr-none self-end text-[13px] max-w-[85%] shadow-md font-medium">
                  Yes! It's one of my favorite spots. Are we still on for tomorrow?
                </div>
              </div>
              <div className="p-3 bg-white border-t border-gray-100 flex items-center gap-2 pb-6">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500"><Camera className="w-4 h-4" /></div>
                <div className="flex-1 h-9 bg-gray-100 rounded-full px-4 flex items-center text-[13px] text-gray-500 border border-gray-200">Type a message...</div>
              </div>
              <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-20 h-1 bg-gray-900/20 rounded-full z-30"></div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ==================== Feature 3: AI Itinerary ==================== */}
      <div className="grid md:grid-cols-2 gap-16 items-center overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative flex justify-center items-center group w-full"
        >
          <div className="absolute w-[120%] h-[120%] bg-gradient-to-tr from-blue-400/15 to-indigo-500/5 rounded-full blur-[80px] -z-10 transition-opacity duration-500 group-hover:opacity-80"></div>
          <div className="w-72 h-[550px] bg-gray-900 rounded-[3rem] p-[8px] shadow-2xl shadow-gray-900/30 relative group-hover:scale-[1.02] transition-transform duration-500 z-10">
            <div className="bg-slate-50 w-full h-full rounded-[2.5rem] overflow-hidden relative flex flex-col">
              <div className="absolute top-0 inset-x-0 h-5 flex justify-center z-30">
                <div className="w-24 h-5 bg-gray-900 rounded-b-[1rem]"></div>
              </div>
               <div className="pt-12 px-4 flex-1 flex flex-col gap-4 bg-slate-50 overflow-y-auto pb-8">
                 <div className="bg-white rounded-[1.25rem] p-4 shadow-sm border border-gray-100 relative overflow-hidden shrink-0 mt-2">
                   <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent"></div>
                   <h4 className="font-extrabold text-gray-900 text-base">Saturday Date</h4>
                   <div className="flex items-center gap-1 text-[10px] text-primary font-bold mt-1.5 bg-primary/10 w-fit px-2 py-0.5 rounded-full uppercase tracking-wider">
                     <Zap className="w-3 h-3 fill-current" /> Planned by AI
                   </div>
                 </div>
                 <div className="flex gap-3 px-1 relative z-10">
                   <div className="w-0.5 bg-gray-200 rounded-full flex flex-col items-center relative mt-2 mb-2 ml-1">
                     <div className="w-3 h-3 bg-primary rounded-full absolute top-1 border-2 border-slate-50 z-10"></div>
                     <div className="w-3 h-3 bg-accent rounded-full absolute top-[72px] border-2 border-slate-50 z-10"></div>
                     <div className="w-3 h-3 bg-rose-400 rounded-full absolute top-[144px] border-2 border-slate-50 z-10"></div>
                   </div>
                   <div className="flex-1 space-y-3 pt-0">
                     <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
                       <p className="text-[9px] font-black text-primary uppercase tracking-wider mb-0.5 flex items-center gap-1"><Coffee className="w-3 h-3" /> 19:00</p>
                       <p className="text-[13px] font-bold text-gray-900">Artisan Coffee</p>
                       <p className="text-[10px] text-gray-500 mt-0.5">The Daily Grind</p>
                     </div>
                     <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
                       <p className="text-[9px] font-black text-accent uppercase tracking-wider mb-0.5 flex items-center gap-1"><MapPin className="w-3 h-3" /> 20:30</p>
                       <p className="text-[13px] font-bold text-gray-900">Modern Art Walk</p>
                       <p className="text-[10px] text-gray-500 mt-0.5">City Gallery</p>
                     </div>
                     <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
                       <p className="text-[9px] font-black text-rose-400 uppercase tracking-wider mb-0.5 flex items-center gap-1"><Wine className="w-3 h-3" /> 22:00</p>
                       <p className="text-[13px] font-bold text-gray-900">Late Drinks</p>
                       <p className="text-[10px] text-gray-500 mt-0.5">Skybar Lounge</p>
                     </div>
                   </div>
                 </div>
                 <div className="mt-auto pt-2 shrink-0 relative z-20">
                    <button className="w-full bg-gray-900 text-white font-semibold text-[13px] py-3 rounded-xl shadow-md flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors">
                      <Map className="w-3.5 h-3.5" /> View Map Route
                    </button>
                 </div>
               </div>
               <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-20 h-1 bg-gray-900/20 rounded-full z-30"></div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="space-y-6"
        >
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 mb-2">
            <MapPin className="w-8 h-8" />
          </div>
          <h3 className="text-3xl font-extrabold text-foreground tracking-tight">AI Itinerary Planning</h3>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Take the stress out of planning. Let our AI generate beautiful, timeline-based Date Itinerary Cards tailored to your mutual interests and location.
          </p>
        </motion.div>
      </div>

    </div>
  );
}