import { useCallback, useState } from "react";
import { ArrowRight, Check, Crown, Sparkles, ShieldCheck, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePageMeta } from "../hooks/usePageMeta";
import { useFocusTrap } from "../hooks/useFocusTrap";
import { getStaggerContainer, getFadeUpItem } from "../utils/animations";

type PlanTone = "core" | "select" | "elite" | "signature";
type BillingCycle = "weekly" | "monthly" | "3months";
type PlanPrice = { price: string; period: string };

type Plan = {
  name: string;
  prices: Record<BillingCycle, PlanPrice>;
  description: string;
  features: string[];
  featured: boolean;
  signature: boolean;
  tone: PlanTone;
};

const plans: Plan[] = [
  {
    name: "Serasé Core",
    prices: {
      weekly: { price: "Free", period: "" },
      monthly: { price: "Free", period: "" },
      "3months": { price: "Free", period: "" },
    },
    description: "Start dating with the essentials.",
    features: ["30 likes/day", "5 AI prompts", "Verified badge"],
    featured: false,
    signature: false,
    tone: "core",
  },
  {
    name: "Serasé Select",
    prices: {
      weekly: { price: "RM 6.99", period: "/week" },
      monthly: { price: "RM 14.99", period: "/month" },
      "3months": { price: "RM 26.99", period: "/3 months" },
    },
    description: "See more and get more control.",
    features: ["Signal", "See who liked you", "5 rewinds/day", "30 AI prompts", "Hide age"],
    featured: false,
    signature: false,
    tone: "select",
  },
  {
    name: "Serasé Elite",
    prices: {
      weekly: { price: "RM 18.99", period: "/week" },
      monthly: { price: "RM 39.99", period: "/month" },
      "3months": { price: "RM 59.99", period: "/3 months" },
    },
    description: "Get more visibility and chat features.",
    features: ["Includes Select features", "Read receipts", "75 AI prompts", "Weekly Boost", "Custom visibility"],
    featured: true,
    signature: false,
    tone: "elite",
  },
  {
    name: "Serasé Signature",
    prices: {
      weekly: { price: "RM 44.99", period: "/week" },
      monthly: { price: "RM 89.99", period: "/month" },
      "3months": { price: "RM 114.99", period: "/3 months" },
    },
    description: "Get our highest level of privacy and access.",
    features: ["Includes Elite features", "Incognito", "Visitor insights", "150 AI prompts", "Priority verification"],
    featured: false,
    signature: true,
    tone: "signature",
  },
];

const planStyles: Record<
  PlanTone,
  {
    card: string;
    title: string;
    description: string;
    divider: string;
    price: string;
    period: string;
    check: string;
    feature: string;
    status: string;
    learn: string;
    detailEyebrow: string;
  }
> = {
  core: {
    card: "border border-[#E8D8CC] bg-gradient-to-b from-[#FFFDFB] to-[#F5ECE5] text-[#3A302C] shadow-[0_22px_52px_rgba(82,52,43,0.10)]",
    title: "text-[#3B302C]",
    description: "text-[#756761]",
    divider: "border-[#E4D6CE]",
    price: "text-[#2E2623]",
    period: "text-[#776963]",
    check: "bg-[#F0DEDB] text-[#9D3037]",
    feature: "text-[#5F5551]",
    status: "bg-white/70 text-[#8A2128] ring-1 ring-[#E8D8CC]",
    learn: "bg-[#342A27] text-white hover:bg-[#251E1C]",
    detailEyebrow: "text-[#8A2128]",
  },
  select: {
    card: "border border-[#E5BFC0] bg-gradient-to-b from-[#F8DEDC] via-[#F7E6E1] to-[#F8EFEA] text-[#4B3031] shadow-[0_22px_52px_rgba(126,54,61,0.12)]",
    title: "text-[#7C2830]",
    description: "text-[#765A59]",
    divider: "border-[#DDBFC0]",
    price: "text-[#6E222A]",
    period: "text-[#8B6361]",
    check: "bg-white/60 text-[#A72D3B]",
    feature: "text-[#654C4B]",
    status: "bg-white/55 text-[#8A2128] ring-1 ring-[#DCB9BA]",
    learn: "bg-[#A83340] text-white hover:bg-[#8E2632]",
    detailEyebrow: "text-[#8E2632]",
  },
  elite: {
    card: "border border-[#9C3A45] bg-gradient-to-b from-[#AD3A47] via-[#952A36] to-[#7E202B] text-white shadow-[0_26px_60px_rgba(112,24,35,0.24)]",
    title: "text-white",
    description: "text-white/72",
    divider: "border-white/16",
    price: "text-white",
    period: "text-[#F4C9C8]",
    check: "bg-white/14 text-[#FFD9D6]",
    feature: "text-white/90",
    status: "bg-white/10 text-white ring-1 ring-white/16",
    learn: "bg-white text-[#8A2128] hover:bg-[#FFF2EF]",
    detailEyebrow: "text-[#FFD5D1]",
  },
  signature: {
    card: "border-2 border-[#D8A43E]/65 bg-gradient-to-b from-[#451620] via-[#641827] to-[#2C1118] text-white shadow-[0_28px_64px_rgba(48,12,20,0.28)]",
    title: "text-[#FFD24D]",
    description: "text-white/72",
    divider: "border-white/12",
    price: "text-white",
    period: "text-[#F2C75A]",
    check: "bg-[#D99B1E]/24 text-[#FFD34F]",
    feature: "text-white/92",
    status: "bg-white/8 text-white ring-1 ring-white/14",
    learn: "bg-[#FFD047] text-[#4B2B11] hover:bg-[#FFDA68]",
    detailEyebrow: "text-[#FFD34F]",
  },
};

export default function Pricing() {
  usePageMeta(
    "Subscriptions & Pricing | Serasé",
    "Compare Serasé Core, Select, Elite and Signature plans across weekly, monthly and 3-month billing options."
  );

  const shouldReduceMotion = useReducedMotion();
  const stagger = getStaggerContainer(shouldReduceMotion);
  const fadeUp = getFadeUpItem(shouldReduceMotion);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const handleClosePlan = useCallback(() => setSelectedPlan(null), []);
  const planDialogRef = useFocusTrap(!!selectedPlan, handleClosePlan);

  return (
    <main className="relative min-h-screen bg-background pb-32 pt-20 md:pt-24">
      <div className="pointer-events-none absolute left-1/2 top-20 -z-10 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-gradient-to-br from-rose-500/10 via-amber-500/10 to-primary/10 blur-[140px]" />

      <div className="serase-container-hero px-6">
        <motion.header
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="serase-eyebrow serase-eyebrow-pill">
            <Sparkles className="h-3.5 w-3.5" /> Plans & Pricing
          </div>
          <h1 className="serase-h1 mt-4">Choose your plan.</h1>
          <p className="serase-lead mx-auto mt-4 max-w-2xl">
            Start free. Upgrade anytime for more features and privacy.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-[12px] font-semibold leading-[1.6] text-muted-foreground">
            Choose weekly, monthly or 3-month billing.
          </p>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: shouldReduceMotion ? 0 : 0.08 }}
          className="mx-auto mt-8 flex w-full max-w-[430px] items-center rounded-full border border-[#E2D5CE] bg-white/70 p-1.5 shadow-[0_10px_28px_rgba(91,58,49,0.08)] backdrop-blur-md"
          role="tablist"
          aria-label="Billing cycle"
        >
          {([
            ["weekly", "Weekly"],
            ["monthly", "Monthly"],
            ["3months", "3 Months"],
          ] as const).map(([value, label]) => {
            const active = billingCycle === value;
            return (
              <button
                key={value}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setBillingCycle(value)}
                className={`relative flex-1 rounded-full px-4 py-2.5 text-[12px] font-black transition-colors ${
                  active ? "text-white" : "text-[#6D5E58] hover:text-[#8A2128]"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="pricing-billing-cycle"
                    className="absolute inset-0 -z-10 rounded-full bg-[#8A2128] shadow-[0_7px_16px_rgba(138,33,40,0.20)]"
                    transition={{ duration: shouldReduceMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
                <span className="relative z-10">{label}</span>
              </button>
            );
          })}
        </motion.div>

        <div id="pricing-plans" className="relative mt-10 min-h-[590px]">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className={`grid grid-cols-1 gap-6 transition-[filter,opacity] duration-300 sm:grid-cols-2 xl:grid-cols-4 ${
              selectedPlan ? "pointer-events-none opacity-20 blur-[2px]" : ""
            }`}
            aria-hidden={selectedPlan ? "true" : undefined}
          >
            {plans.map((plan) => {
              const styles = planStyles[plan.tone];
              const activePrice = plan.prices[billingCycle];

              return (
                <motion.article
                  key={plan.name}
                  variants={fadeUp}
                  className={`relative flex min-h-[520px] flex-col rounded-serase-section p-7 serase-interact-card ${styles.card}`}
                >
                  {plan.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#6C1722] px-4 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-white shadow-sm">
                      Most Popular
                    </div>
                  )}
                  {plan.signature && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-[#FFD047] px-4 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-[#4A2D13] shadow-sm">
                      <Crown className="h-3 w-3" /> Signature
                    </div>
                  )}

                  <div>
                    <h2 className={`text-xl font-black ${styles.title}`}>{plan.name}</h2>
                    <p className={`mt-2 min-h-[64px] text-[13px] font-medium leading-[1.65] ${styles.description}`}>
                      {plan.description}
                    </p>

                    <div className={`mt-6 border-b pb-6 ${styles.divider}`}>
                      <div className="flex items-baseline gap-1">
                        <AnimatePresence mode="wait" initial={false}>
                          <motion.span
                            key={`${plan.name}-${billingCycle}-price`}
                            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                            transition={{ duration: shouldReduceMotion ? 0 : 0.18 }}
                            className={`text-4xl font-black tracking-[-0.04em] ${styles.price}`}
                          >
                            {activePrice.price}
                          </motion.span>
                        </AnimatePresence>
                        <span className={`text-xs font-bold ${styles.period}`}>{activePrice.period}</span>
                      </div>
                    </div>

                    <ul className="mt-7 space-y-4">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-[13px] font-semibold leading-[1.6]">
                          <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${styles.check}`}>
                            <Check className="h-3 w-3 stroke-[3]" />
                          </div>
                          <span className={styles.feature}>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto space-y-3 pt-8">
                    <div className={`serase-btn-action flex min-h-11 items-center justify-center px-4 py-2.5 text-center text-[11px] font-black ${styles.status}`}>
                      Available at launch
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedPlan(plan)}
                      className={`serase-btn-action group flex min-h-12 w-full items-center justify-center gap-2 px-4 py-3 text-center text-xs font-black transition-colors ${styles.learn}`}
                      aria-label={`Learn more about ${plan.name}`}
                    >
                      Learn more
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </button>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>

          <AnimatePresence>
            {selectedPlan && (() => {
              const styles = planStyles[selectedPlan.tone];
              const activeSelectedPrice = selectedPlan.prices[billingCycle];

              return (
                <motion.div
                  key={selectedPlan.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                  className="absolute inset-0 z-30 flex items-start justify-center overflow-y-auto rounded-[2.75rem] bg-background/88 p-3 py-6 backdrop-blur-[12px] sm:items-center sm:p-6 sm:py-6 lg:p-8"
                  onClick={handleClosePlan}
                  role="presentation"
                >
                  <motion.div
                    ref={planDialogRef}
                    tabIndex={-1}
                    initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.985 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
                    onClick={(event) => event.stopPropagation()}
                    className={`relative my-auto flex w-full max-w-[1120px] flex-col overflow-hidden rounded-[2.75rem] p-7 outline-none sm:p-9 lg:min-h-[520px] lg:p-12 ${styles.card}`}
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${selectedPlan.name} plan details`}
                  >
                    <button
                      type="button"
                      onClick={handleClosePlan}
                      aria-label="Close plan details"
                      className={`absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full transition-colors sm:right-7 sm:top-7 ${
                        selectedPlan.tone === "elite" || selectedPlan.tone === "signature"
                          ? "bg-white/12 text-white hover:bg-white/20"
                          : "bg-white/70 text-[#493B37] hover:bg-white"
                      }`}
                    >
                      <X className="h-5 w-5" />
                    </button>

                    <div className="grid flex-1 items-start gap-8 pr-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-14 lg:pr-0">
                      <div>
                        <div className={`text-[10px] font-black uppercase tracking-[0.18em] ${styles.detailEyebrow}`}>
                          About this plan
                        </div>
                        <h2 className={`mt-3 text-[34px] font-black leading-[1] tracking-[-0.04em] sm:text-[42px] ${styles.title}`}>
                          {selectedPlan.name}
                        </h2>
                        <p className={`mt-4 max-w-md text-[15px] font-medium leading-[1.75] ${styles.description}`}>
                          {selectedPlan.description}
                        </p>

                        <div className={`mt-8 border-b pb-7 ${styles.divider}`}>
                          <div className="flex flex-wrap items-baseline gap-2">
                            <span className={`text-[50px] font-black leading-none tracking-[-0.055em] sm:text-[62px] ${styles.price}`}>
                              {activeSelectedPrice.price}
                            </span>
                            <span className={`text-sm font-bold ${styles.period}`}>{activeSelectedPrice.period}</span>
                          </div>
                        </div>

                        <div className="mt-7 flex flex-wrap items-center gap-2">
                          <div className={`inline-flex min-h-11 items-center justify-center rounded-full px-5 text-[11px] font-black ${styles.status}`}>
                            Available at launch
                          </div>
                          {selectedPlan.tone !== "core" && (
                            <div className={`inline-flex min-h-11 items-center justify-center rounded-full px-5 text-[11px] font-black ${styles.status}`}>
                              {billingCycle === "weekly" ? "Weekly" : billingCycle === "monthly" ? "Monthly" : "3 Months"}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className={`rounded-[2rem] p-6 sm:p-7 ${
                        selectedPlan.tone === "elite" || selectedPlan.tone === "signature"
                          ? "bg-white/8 ring-1 ring-white/12"
                          : "bg-white/58 ring-1 ring-black/5"
                      }`}>
                        <div className={`text-[11px] font-black uppercase tracking-[0.16em] ${styles.detailEyebrow}`}>
                          What&apos;s included
                        </div>

                        <div className="mt-5 grid gap-3 sm:grid-cols-2">
                          {selectedPlan.features.map((feature) => (
                            <div
                              key={feature}
                              className={`flex min-h-[76px] items-center gap-3 rounded-[1.35rem] px-4 py-3 ${
                                selectedPlan.tone === "elite" || selectedPlan.tone === "signature"
                                  ? "bg-white/7 ring-1 ring-white/10"
                                  : "bg-white/70 ring-1 ring-black/5"
                              }`}
                            >
                              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${styles.check}`}>
                                <Check className="h-4 w-4 stroke-[3]" />
                              </div>
                              <span className={`text-[13px] font-bold leading-[1.45] ${styles.feature}`}>{feature}</span>
                            </div>
                          ))}
                        </div>

                        <p className={`mt-6 text-[12px] font-medium leading-[1.7] ${styles.description}`}>
                          You can view plan details here. Subscriptions will be available when payments go live.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })()}
          </AnimatePresence>
        </div>

        <div className="mx-auto mt-14 flex max-w-3xl items-start gap-4 rounded-serase-sm border serase-card-border bg-white/75 p-6">
          <div className="serase-icon-sm shrink-0 rounded-xl bg-primary/8 text-primary">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-[15px] font-black text-serase-heading">Purchases are not available on the website yet.</h2>
            <p className="mt-1 text-[13px] font-medium leading-[1.65] text-muted-foreground">
              You’ll be able to subscribe when payment is available at launch.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
