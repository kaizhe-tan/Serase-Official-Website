import React, { useState } from 'react';
import { Check, Zap, Sparkles, ShieldCheck, CreditCard, Lock, Smartphone, Crown } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import CarrierBillingModal from '../components/CarrierBillingModal';
import { useDocumentTitle } from '../hooks/usePageMeta';
import { getStaggerContainer, getFadeUpItem } from '../utils/animations';

type BillingCycle = 'weekly' | 'monthly' | 'quarterly';

export default function Pricing() {
  useDocumentTitle("Subscriptions & Pricing | Serasé");

  const shouldReduceMotion = useReducedMotion();
  const stagger = getStaggerContainer(shouldReduceMotion);
  const fadeUp = getFadeUpItem(shouldReduceMotion);

  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const [isBillingModalOpen, setIsBillingModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{ name: string; price: string; period: string } | null>(null);

  const handlePlanPay = (planName: string, price: string, period: string) => {
    setSelectedPlan({ name: planName, price, period });
    setIsBillingModalOpen(true);
  };

  const rawPlans = [
    {
      name: "Serase Core", description: "Basic entry for authentic dating.", badge: null, isFeatured: false, isSignature: false,
      pricing: { weekly: { price: "Free", period: "", subtext: "30 likes/day" }, monthly: { price: "Free", period: "", subtext: "30 likes/day" }, quarterly: { price: "Free", period: "", subtext: "30 likes/day" } },
      features: ["30 Daily Likes", "Basic Text Chat", "Community Verification"], buttonText: "Current Plan", buttonVariant: "outline"
    },
    {
      name: "Serase Select", description: "More flexibility & unlimited messaging.", badge: null, isFeatured: false, isSignature: false,
      pricing: { weekly: { price: "RM 6.99", period: "/week", subtext: "Billed weekly" }, monthly: { price: "RM 14.99", period: "/month", subtext: "RM 3.50/week (Save 50%)" }, quarterly: { price: "RM 26.99", period: "/3 months", subtext: "RM 2.10/week (Save 70%)" } },
      features: ["100 Daily Likes", "Unlimited Text Chat", "Photo Messaging", "5 Message Retracts/Month"], buttonText: "Pay with Mobile Bill", buttonVariant: "light"
    },
    {
      name: "Serase Elite", description: "Best balance for serious match seekers.", badge: "MOST POPULAR", isFeatured: true, isSignature: false,
      pricing: { weekly: { price: "RM 18.99", period: "/week", subtext: "Billed weekly" }, monthly: { price: "RM 39.99", period: "/month", subtext: "RM 9.34/week (Save 51%)" }, quarterly: { price: "RM 59.99", period: "/3 months", subtext: "RM 4.67/week (Save 75%)" } },
      features: ["250 Daily Likes", "Unlimited Text & Photo Chat", "Voice & Video Calls", "Custom Privacy Controls", "See Who Liked You"], buttonText: "Pay with Mobile Bill", buttonVariant: "primary"
    },
    {
      name: "Serase Signature", description: "The ultimate VIP dating experience.", badge: "ULTIMATE VIP", isFeatured: false, isSignature: true,
      pricing: { weekly: { price: "RM 44.99", period: "/week", subtext: "Billed weekly" }, monthly: { price: "RM 89.99", period: "/month", subtext: "RM 21.03/week (Save 53%)" }, quarterly: { price: "RM 114.99", period: "/3 months", subtext: "RM 8.95/week (Save 80%)" } },
      features: ["500 Daily Likes (Unlimited)", "Incognito Profile Mode", "Global Passport Location", "Omar AI Dating Coach", "Read Receipts & Priority Matching"], buttonText: "Go Signature (Mobile)", buttonVariant: "gold"
    }
  ];

  const cycles: { id: BillingCycle; label: string; tag?: { text: string; colorClass: string } }[] = [
    { id: 'weekly', label: 'Weekly' },
    { id: 'monthly', label: 'Monthly', tag: { text: 'Save 50%', colorClass: 'bg-amber-300 text-gray-900' } },
    { id: 'quarterly', label: '3 Months', tag: { text: 'Save 80%', colorClass: 'bg-rose-500 text-white' } }
  ];

  return (
    <div className="min-h-screen bg-background selection:bg-accent/30 selection:text-primary pt-12 pb-32 relative overflow-x-hidden">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-br from-rose-500/10 via-amber-500/10 to-primary/10 rounded-full blur-[140px] -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/5 border border-primary/15 px-4 py-1.5 rounded-full text-primary text-xs font-extrabold tracking-widest uppercase shadow-sm">
            <Sparkles className="w-3.5 h-3.5" /> Direct Carrier Billing
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight">Subscriptions</h1>
          <p className="text-lg text-muted-foreground font-medium">Seamlessly charged to your monthly phone bill or prepaid mobile balance.</p>
          <div className="inline-flex items-center gap-3 bg-amber-50/80 border border-amber-200/80 px-5 py-2.5 rounded-2xl text-xs font-bold text-amber-900 mt-2 shadow-sm">
            <Smartphone className="w-4 h-4 text-amber-600 shrink-0" /><span>Pay easily via Celcom, Digi, Maxis, U Mobile & global carriers</span>
          </div>
        </motion.div>

        <div className="flex justify-center mb-16">
          <div className="bg-gray-200/60 p-1.5 rounded-2xl flex items-center gap-1 border border-gray-300/50 shadow-inner relative">
            {cycles.map((cycle) => {
              const isActive = billingCycle === cycle.id;
              const activeTextColor = cycle.id === 'quarterly' ? 'text-white' : cycle.id === 'monthly' ? 'text-white' : 'text-gray-900';
              return (
                <button
                  key={cycle.id}
                  onClick={() => setBillingCycle(cycle.id)}
                  className={`relative px-5 py-2 rounded-xl text-xs font-black transition-colors duration-300 flex items-center gap-1.5 z-10 ${isActive ? activeTextColor : 'text-gray-600 hover:text-gray-900'}`}
                >
                  {isActive && !shouldReduceMotion && (
                    <motion.div layoutId="pricing-tab-indicator" className={`absolute inset-0 rounded-xl -z-10 shadow-md ${cycle.id === 'quarterly' ? 'bg-gray-900' : cycle.id === 'monthly' ? 'bg-primary' : 'bg-white'}`} transition={{ type: "spring", bounce: 0.2, duration: 0.5 }} />
                  )}
                  {isActive && shouldReduceMotion && (
                     <div className={`absolute inset-0 rounded-xl -z-10 shadow-md ${cycle.id === 'quarterly' ? 'bg-gray-900' : cycle.id === 'monthly' ? 'bg-primary' : 'bg-white'}`} />
                  )}
                  {cycle.label}
                  {cycle.tag && <span className={`${cycle.tag.colorClass} text-[9px] px-1.5 py-0.5 rounded-md font-extrabold`}>{cycle.tag.text}</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* 🚀 卡片网格的交错入场 */}
        <motion.div 
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch relative z-10"
        >
          {rawPlans.map((plan, idx) => {
            const currentPricing = plan.pricing[billingCycle];
            return (
              <motion.div
                key={idx}
                variants={fadeUp}
                whileHover={shouldReduceMotion ? {} : { y: -6, transition: { duration: 0.2 } }}
                className={`rounded-[2.5rem] p-7 transition-all duration-300 flex flex-col justify-between relative ${
                  plan.isSignature
                    ? 'bg-gradient-to-b from-rose-950 via-primary to-rose-950 text-white shadow-2xl shadow-rose-950/40 border-2 border-amber-400/40 lg:-translate-y-2'
                    : plan.isFeatured
                    ? 'bg-white border-2 border-primary/30 shadow-2xl shadow-primary/10 lg:-translate-y-1'
                    : 'bg-white/90 border border-gray-200/80 shadow-lg shadow-gray-200/50 hover:shadow-xl'
                }`}
              >
                {plan.isSignature && !shouldReduceMotion && (
                  <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden pointer-events-none z-0">
                    <motion.div animate={{ x: ['-200%', '300%'] }} transition={{ repeat: Infinity, duration: 4, ease: "linear", repeatDelay: 3 }} className="absolute top-0 bottom-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-[30deg]" />
                  </div>
                )}
                {plan.badge && (
                  <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase px-4 py-1 rounded-full tracking-widest shadow-md flex items-center gap-1 z-10 ${plan.isSignature ? 'bg-gradient-to-r from-amber-300 to-amber-500 text-gray-900' : 'bg-primary text-white'}`}>
                    {plan.isSignature ? <Crown className="w-3 h-3 fill-current" /> : <Zap className="w-3 h-3 fill-current" />}
                    {plan.badge}
                  </div>
                )}

                <div className="space-y-6 relative z-10">
                  <div>
                    <h3 className={`text-xl font-black ${plan.isSignature ? 'text-amber-300' : 'text-gray-900'}`}>{plan.name}</h3>
                    <p className={`text-xs mt-1 font-medium ${plan.isSignature ? 'text-white/70' : 'text-muted-foreground'}`}>{plan.description}</p>
                  </div>
                  <div className="pt-2 pb-4 border-b border-gray-100/10">
                    <div className="flex items-baseline gap-1">
                      <span className={`text-3xl lg:text-4xl font-black tracking-tight ${plan.isSignature ? 'text-white' : 'text-gray-900'}`}>{currentPricing.price}</span>
                      <span className={`text-xs font-extrabold ${plan.isSignature ? 'text-amber-300/80' : 'text-muted-foreground'}`}>{currentPricing.period}</span>
                    </div>
                    <p className={`text-[11px] font-bold mt-1.5 ${plan.isSignature ? 'text-amber-200' : 'text-primary'}`}>{currentPricing.subtext}</p>
                    {plan.pricing[billingCycle].price !== "Free" && (
                      <p className={`text-[10px] font-semibold mt-1 flex items-center gap-1 opacity-80 ${plan.isSignature ? 'text-white/80' : 'text-gray-500'}`}><Smartphone className="w-3 h-3" /> Direct Mobile Billing</p>
                    )}
                  </div>
                  <ul className="space-y-3.5 pt-2">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3 text-xs font-semibold leading-relaxed">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${plan.isSignature ? 'bg-amber-400/20 text-amber-300' : 'bg-primary/10 text-primary'}`}><Check className="w-3 h-3 stroke-[3]" /></div>
                        <span className={plan.isSignature ? 'text-white/90' : 'text-gray-700'}>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8 mt-auto relative z-10">
                  {plan.buttonVariant === 'outline' && <button disabled className="w-full py-3.5 px-4 rounded-2xl font-black text-xs border-2 border-primary/30 text-primary bg-primary/5 cursor-default opacity-80">{plan.buttonText}</button>}
                  {plan.buttonVariant === 'light' && <button onClick={() => handlePlanPay(plan.name, currentPricing.price, currentPricing.period || '/month')} className="w-full py-3.5 px-4 rounded-2xl font-black text-xs bg-amber-100/70 hover:bg-amber-100 text-amber-900 transition-all hover:scale-[1.02] active:scale-95 shadow-sm flex items-center justify-center gap-2"><Smartphone className="w-4 h-4" />{plan.buttonText}</button>}
                  {plan.buttonVariant === 'primary' && <button onClick={() => handlePlanPay(plan.name, currentPricing.price, currentPricing.period || '/month')} className="w-full py-3.5 px-4 rounded-2xl font-black text-xs bg-primary hover:bg-primary/90 text-white transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-primary/25 flex items-center justify-center gap-2"><Smartphone className="w-4 h-4" />{plan.buttonText}</button>}
                  {plan.buttonVariant === 'gold' && <button onClick={() => handlePlanPay(plan.name, currentPricing.price, currentPricing.period || '/month')} className="w-full py-3.5 px-4 rounded-2xl font-black text-xs bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:brightness-110 text-gray-900 transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2"><Crown className="w-3.5 h-3.5 fill-current" />{plan.buttonText}</button>}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="show" className="mt-16 bg-white/80 border border-gray-200/80 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold"><CreditCard className="w-6 h-6" /></div>
            <div>
              <h4 className="text-base font-black text-gray-900">Direct Carrier Billing Available</h4>
              <p className="text-xs text-muted-foreground font-medium">Pay directly via your CelcomDigi, Maxis, or U Mobile monthly phone bill.</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-extrabold text-green-600 bg-green-50 px-4 py-2 rounded-xl border border-green-100">
            <ShieldCheck className="w-4 h-4" /> 100% Safe & Instant Activation
          </div>
        </motion.div>
      </div>

      <CarrierBillingModal isOpen={isBillingModalOpen} onClose={() => setIsBillingModalOpen(false)} selectedPlan={selectedPlan} />
    </div>
  );
}