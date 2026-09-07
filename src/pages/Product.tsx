import React, { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  Bookmark,
  CalendarHeart,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  Clock3,
  Heart,
  MapPin,
  MessageCircle,
  MoreVertical,
  Phone,
  RotateCcw,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  User,
  X,
  Zap,
  Shirt,
  Utensils,
  LockKeyhole,
  MessageSquareText,
} from "lucide-react";
import { AnimatePresence, animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useDocumentTitle } from "../hooks/usePageMeta";
import PhoneFrame from "../components/PhoneFrame";
import { FrequenciesSyncedAnimation } from "../utils/animations.tsx";
import seraseLogo from "../../.figma/attachments/image-0.png";


type ProductSectionId = "discover" | "timed" | "ai";
type DiscoverScreen = "discover" | "matched";

function ProductPhonePreview({
  activeSection,
  panelPage,
}: {
  activeSection: ProductSectionId;
  panelPage: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  const [discoverScreen, setDiscoverScreen] =
    useState<DiscoverScreen>("discover");
  const [swipeState, setSwipeState] = useState<
    "idle" | "swiping-right" | "swiping-left"
  >("idle");
  const [hasInteracted, setHasInteracted] = useState(false);

  const timeoutRefs = useRef<ReturnType<typeof setTimeout>[]>([]);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const discoverScrollRef = useRef<HTMLDivElement | null>(null);

  const cardX = useMotionValue(0);
  const cardY = useMotionValue(0);
  const cardRotate = useTransform(
    cardX,
    [-200, 200],
    shouldReduceMotion ? [0, 0] : [-15, 15],
  );
  const connectOpacity = useTransform(cardX, [20, 120], [0, 1]);
  const passOpacity = useTransform(cardX, [-20, -120], [0, 1]);

  const clearAllTimers = () => {
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];
  };

  const resetDiscoverCard = () => {
    cardX.set(0);
    cardY.set(0);
    setSwipeState("idle");
    setDiscoverScreen("discover");

  };

  const swipeDuration = shouldReduceMotion ? 0.12 : 0.38;

  const handleSwipeRight = (
    customY?: number,
    userInitiated = true,
  ) => {
    if (
      activeSection !== "discover" ||
      discoverScreen !== "discover" ||
      swipeState !== "idle"
    ) {
      return;
    }

    clearAllTimers();
    if (userInitiated) {
      setHasInteracted(true);
    }
    setSwipeState("swiping-right");

    animate(cardX, 560, {
      duration: swipeDuration,
      ease: "easeOut",
    });
    animate(
      cardY,
      shouldReduceMotion
        ? 0
        : typeof customY === "number"
          ? customY
          : 72,
      {
        duration: swipeDuration,
        ease: "easeOut",
      },
    );

    const matchTimer = setTimeout(() => {
      setDiscoverScreen("matched");
      setSwipeState("idle");
      cardX.set(0);
      cardY.set(0);
    }, swipeDuration * 1000);

    const resetTimer = setTimeout(
      () => {
        resetDiscoverCard();
      },
      shouldReduceMotion ? 1800 : 5200,
    );

    timeoutRefs.current.push(matchTimer, resetTimer);
  };

  const handleSwipeLeft = (
    customY?: number,
    userInitiated = true,
  ) => {
    if (
      activeSection !== "discover" ||
      discoverScreen !== "discover" ||
      swipeState !== "idle"
    ) {
      return;
    }

    clearAllTimers();
    if (userInitiated) {
      setHasInteracted(true);
    }
    setSwipeState("swiping-left");

    animate(cardX, -560, {
      duration: swipeDuration,
      ease: "easeOut",
    });
    animate(
      cardY,
      shouldReduceMotion
        ? 0
        : typeof customY === "number"
          ? customY
          : 54,
      {
        duration: swipeDuration,
        ease: "easeOut",
      },
    );

    const resetTimer = setTimeout(
      () => {
        cardX.set(0);
        cardY.set(0);
        setSwipeState("idle");
      },
      shouldReduceMotion ? 260 : 800,
    );

    timeoutRefs.current.push(resetTimer);
  };

  const handleDragEnd = (_event: unknown, info: any) => {
    setHasInteracted(true);
    const threshold = 70;

    if (info.offset.x > threshold || info.velocity.x > 450) {
      handleSwipeRight(
        info.offset.y + info.velocity.y * 0.15,
        true,
      );
      return;
    }

    if (info.offset.x < -threshold || info.velocity.x < -450) {
      handleSwipeLeft(
        info.offset.y + info.velocity.y * 0.15,
        true,
      );
      return;
    }

    animate(cardX, 0, {
      type: "spring",
      stiffness: 300,
      damping: 22,
    });
    animate(cardY, 0, {
      type: "spring",
      stiffness: 300,
      damping: 22,
    });
  };

  useEffect(() => {
    return () => {
      clearAllTimers();
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, []);

  useEffect(() => {
    clearAllTimers();

    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }

    cardX.set(0);
    cardY.set(0);
    setSwipeState("idle");
    setDiscoverScreen("discover");
    setHasInteracted(false);
    discoverScrollRef.current?.scrollTo({ top: 0, behavior: "auto" });

  }, [activeSection, panelPage, cardX, cardY]);

  useEffect(() => {
    if (
      activeSection !== "discover" ||
      panelPage !== 0 ||
      hasInteracted ||
      discoverScreen !== "discover"
    ) {
      return;
    }

    autoPlayRef.current = setInterval(() => {
      handleSwipeRight(undefined, false);
    }, 7000);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
    };
  }, [
    activeSection,
    panelPage,
    hasInteracted,
    discoverScreen,
    swipeState,
  ]);

  const sharedBottomNav = (
    <div className="absolute bottom-[12px] left-[14px] right-[14px] z-40 h-[50px] overflow-visible">
      <div className="relative grid h-[46px] w-full grid-cols-5 items-center rounded-full bg-[#A91F2D] px-[9px] text-white shadow-[0_10px_22px_rgba(169,31,45,0.24)]">
        <div className="flex h-full items-center justify-center">
          <MessageCircle className="h-[13px] w-[13px]" strokeWidth={1.9} />
        </div>

        <div className="flex h-full items-center justify-center">
          <Bookmark className="h-[13px] w-[13px]" strokeWidth={1.9} />
        </div>

        <div className="relative flex h-full items-center justify-center">
          <div className="absolute left-1/2 top-1/2 flex h-[45px] w-[45px] -translate-x-1/2 -translate-y-[73%] items-center justify-center rounded-full bg-[#F8ECDA] shadow-[0_8px_18px_rgba(117,77,31,0.22)]">
            <div className="flex h-[39px] w-[39px] items-center justify-center rounded-full border-[2px] border-white bg-[#DDB95F] ring-1 ring-[#C9983A]/35">
              <img
                src={seraseLogo}
                alt="Serasé logo"
                className="h-[21px] w-[21px] object-contain"
              />
            </div>
          </div>
        </div>

        <div className="flex h-full items-center justify-center">
          <Heart className="h-[13px] w-[13px]" strokeWidth={1.9} />
        </div>

        <div className="flex h-full items-center justify-center">
          <User className="h-[13px] w-[13px]" strokeWidth={1.9} />
        </div>
      </div>
    </div>
  );

  const discoverHeader = (
    <div className="absolute inset-x-0 top-[33px] z-40 h-[39px] px-3">
      <div className="relative flex h-full items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative flex h-7 w-7 items-center justify-center rounded-full border border-[#E5D9D0] bg-white/90 shadow-sm">
            <RotateCcw
              className="h-3 w-3 text-primary"
              strokeWidth={1.9}
            />
            <span className="absolute -right-1 -top-1 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-[#E1B85C] px-1 text-[6px] font-black text-[#82252B]">
              5
            </span>
          </div>

          <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[#E5D9D0] bg-white/90 shadow-sm">
            <Zap
              className="h-3 w-3 text-primary"
              strokeWidth={1.9}
            />
          </div>
        </div>

        <div
          className="absolute left-1/2 -translate-x-1/2 text-[16px] font-medium text-primary"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Serasé
        </div>

        <div className="relative flex h-7 w-7 items-center justify-center rounded-full border border-[#E5D9D0] bg-white/90 shadow-sm">
          <Bell
            className="h-3 w-3 text-primary"
            strokeWidth={1.9}
          />
          <span className="absolute right-[4px] top-[4px] h-2 w-2 rounded-full bg-[#EF5965] ring-2 ring-white" />
        </div>
      </div>
    </div>
  );

  return (
    <PhoneFrame screenClassName="bg-[#F8F1EA]">
      <div className="relative h-full overflow-hidden bg-[#F8F1EA]">
        {/* ==================== DISCOVER & CONNECT ==================== */}
        {activeSection === "discover" && (
          <>
            {/* Page 01 — Discover: the phone itself scrolls from the card into Yaya's full profile */}
            {panelPage === 0 && (
              <>
                {discoverScreen !== "matched" && discoverHeader}

                {discoverScreen === "discover" && (
                  <>
                    <div
                      ref={discoverScrollRef}
                      onScroll={() => setHasInteracted(true)}
                      className="absolute inset-x-0 bottom-[62px] top-[72px] z-20 overflow-y-auto overscroll-contain bg-[#F8F1EA] pb-8 [scrollbar-width:thin] [scrollbar-color:#9B9996_transparent] [&::-webkit-scrollbar]:w-[4px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#9B9996]"
                    >
                      {/* First viewport: Discover card */}
                      <div className="relative h-[392px]">
                        {/* Next profile stays behind Yaya only for swipe feedback */}
                        <motion.div
                          animate={{ scale: swipeState !== "idle" ? 1 : 0.97 }}
                          transition={{ duration: shouldReduceMotion ? 0.1 : 0.35 }}
                          className="absolute left-3 right-3 top-2 h-[278px] overflow-hidden rounded-[1.7rem] bg-[radial-gradient(circle_at_50%_28%,#D8C8C0_0%,#B89B91_45%,#785954_100%)] shadow-[0_15px_28px_rgba(73,51,48,0.14)]"
                        >
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                          <div className="absolute bottom-4 left-4 text-white">
                            <div className="text-[18px] font-semibold" style={{ fontFamily: "Georgia, serif" }}>
                              Alex, 29
                            </div>
                          </div>
                        </motion.div>

                        <AnimatePresence>
                          {(swipeState === "idle" || swipeState === "swiping-right" || swipeState === "swiping-left") && (
                            <motion.div
                              drag={swipeState === "idle" ? "x" : false}
                              dragElastic={0.16}
                              dragConstraints={{ left: 0, right: 0 }}
                              onDragStart={() => setHasInteracted(true)}
                              onDragEnd={handleDragEnd}
                              style={{ x: cardX, y: cardY, rotate: cardRotate }}
                              className="absolute left-3 right-3 top-2 h-[278px] origin-bottom cursor-grab touch-pan-y overflow-hidden rounded-[1.7rem] bg-[#CBB8AF] shadow-[0_15px_28px_rgba(73,51,48,0.20)] active:cursor-grabbing"
                            >
                              {/* Photo placeholder until the approved Yaya photo asset is available */}
                              <div
                                className="absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,#D8C8C0_0%,#B89B91_45%,#785954_100%)]"
                                aria-label="Yaya profile photo placeholder"
                                role="img"
                              >
                                <div className="absolute inset-x-0 top-[28px] h-px bg-white/15" />
                                <div className="absolute -left-8 top-10 h-40 w-28 rotate-[-8deg] rounded-[40%] bg-white/5 blur-xl" />
                                <div className="absolute -right-8 top-16 h-36 w-28 rotate-[8deg] rounded-[40%] bg-black/5 blur-xl" />
                              </div>

                              {/* Story progress */}
                              <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[28px] bg-[#B4A09A]/95 px-4 pt-2">
                                <div className="flex items-center gap-1.5">
                                  <div className="h-2.5 w-5 rounded-full bg-[#7C6F6B]" />
                                  <div className="h-[3px] w-10 rounded-full bg-white/75" />
                                  <div className="h-[3px] flex-1 rounded-full bg-white/35" />
                                  <div className="h-[3px] flex-1 rounded-full bg-white/35" />
                                  <div className="h-[3px] flex-1 rounded-full bg-white/35" />
                                  <div className="h-[3px] flex-1 rounded-full bg-white/35" />
                                </div>
                              </div>

                              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />

                              {/* Drag feedback */}
                              <motion.div
                                style={{ opacity: connectOpacity }}
                                className="pointer-events-none absolute left-4 top-10 z-30 -rotate-12 rounded-md border-2 border-[#8BBD3E] bg-black/30 px-2 py-1 text-[13px] font-black tracking-widest text-[#8BBD3E] backdrop-blur-sm"
                              >
                                CONNECT
                              </motion.div>

                              <motion.div
                                style={{ opacity: passOpacity }}
                                className="pointer-events-none absolute right-4 top-10 z-30 rotate-12 rounded-md border-2 border-rose-500 bg-black/30 px-2 py-1 text-[13px] font-black tracking-widest text-rose-500 backdrop-blur-sm"
                              >
                                PASS
                              </motion.div>

                              {/* Profile copy */}
                              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 px-4 pb-4 pr-5 text-white select-none">
                                <div className="mb-1.5 flex items-center gap-1.5">
                                  <h3
                                    className="shrink-0 whitespace-nowrap text-[20px] font-semibold leading-none"
                                    style={{ fontFamily: "Georgia, serif" }}
                                  >
                                    Yaya, 26
                                  </h3>
                                  <span className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full bg-[#E3BE69] px-1.5 py-0.5 text-[6px] font-black uppercase tracking-[0.06em] text-[#8A2B31]">
                                    <span className="h-1.5 w-1.5 rounded-full border border-[#8A2B31]" />
                                    Verified
                                  </span>
                                </div>

                                <div className="mb-1.5 flex items-center gap-1 whitespace-nowrap text-[6.2px] font-semibold text-white/82">
                                  <MapPin className="h-2.5 w-2.5 shrink-0" />
                                  <span>City centre · ~5 km away</span>
                                </div>

                                <p className="mb-2.5 whitespace-nowrap text-[6.2px] font-medium leading-none text-white/92">
                                  Everything runs on a playlist. Including me.
                                </p>

                                <div className="flex flex-nowrap items-center gap-1">
                                  {["Music first", "Straight talker", "Easy company"].map((tag) => (
                                    <span
                                      key={tag}
                                      className="whitespace-nowrap rounded-full border border-white/40 bg-black/15 px-2 py-1 text-[6.2px] font-bold leading-none"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Pass / Signal controls */}
                        <div className="absolute inset-x-0 top-[286px] z-30 flex items-center justify-center gap-6">
                          <motion.button
                            type="button"
                            aria-label="Pass"
                            whileTap={{ scale: shouldReduceMotion ? 1 : 0.9 }}
                            onClick={() => handleSwipeLeft()}
                            disabled={swipeState !== "idle"}
                            className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-white text-[#5B4D49] shadow-[0_8px_20px_rgba(50,42,40,0.10)] ring-1 ring-black/5 disabled:opacity-40"
                          >
                            <X className="h-[17px] w-[17px]" strokeWidth={2.1} />
                          </motion.button>

                          <motion.button
                            type="button"
                            aria-label="Send Signal"
                            whileTap={{ scale: shouldReduceMotion ? 1 : 0.9 }}
                            onClick={() => handleSwipeRight()}
                            disabled={swipeState !== "idle"}
                            className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-[#F3E8D7] text-[#B87582] shadow-[0_8px_20px_rgba(177,103,117,0.12)] ring-1 ring-[#EEDFD9] disabled:opacity-40"
                          >
                            <Star className="h-[18px] w-[18px]" strokeWidth={2} />
                          </motion.button>
                        </div>

                        {/* Scroll hint */}
                        <div className="pointer-events-none absolute inset-x-0 top-[344px] z-20 text-center select-none">
                          <div className="text-[6px] font-black uppercase tracking-[0.24em] text-[#C88792]">
                            Scroll for Yaya&apos;s profile
                          </div>
                          <ChevronDown className="mx-auto mt-1 h-3 w-3 text-[#C98991]" strokeWidth={2} />
                        </div>
                      </div>

                      {/* Same Yaya profile continues below — this is what the prototype shows after scrolling */}
                      <section className="mx-3 mb-5 overflow-hidden rounded-[1.55rem] border border-[#E8DDD5] bg-[#FFFDFC] shadow-[0_8px_22px_rgba(91,61,54,0.07)]">
                        <div className="px-4 pb-4 pt-4">
                          <div className="flex items-end justify-between gap-3">
                            <h3
                              className="text-[18px] font-medium text-[#9A2730]"
                              style={{ fontFamily: "Georgia, serif" }}
                            >
                              Yaya
                            </h3>
                            <div className="pb-0.5 text-[6.5px] font-semibold text-[#A09690]">
                              26 · Commercial operations
                            </div>
                          </div>

                          <div className="mt-5 flex gap-5 border-b border-[#E8DED6] text-[8px] font-bold">
                            <div className="border-b border-[#A62A32] pb-2.5 text-[#A62A32]">About</div>
                            <div className="pb-2.5 text-[#A9A09B]">Photos</div>
                          </div>

                          <p className="mt-4 text-[8.2px] font-medium leading-[1.8] text-[#6E625D]">
                            Commercial operations: I sit between the product and the people buying it, and I keep our partner accounts growing. Off the clock I am the one holding the aux cable. Happy to drive, happier if you have somewhere in mind.
                          </p>

                          <div className="mt-4 overflow-hidden rounded-[1rem] bg-[#F7F1EC]">
                            {[
                              ["Lives", "City centre · 5 km"],
                              ["Work", "Commercial operations"],
                              ["Speaks", "English, Malay"],
                              ["Into", "Live music"],
                            ].map(([label, value]) => (
                              <div key={label} className="flex min-h-[39px] items-center justify-between gap-3 border-b border-[#EDE4DD] px-3 last:border-b-0">
                                <div className="text-[5.5px] font-black uppercase tracking-[0.16em] text-[#A59A93]">{label}</div>
                                <div className="text-right text-[7.5px] font-bold text-[#5C504B]">{value}</div>
                              </div>
                            ))}
                          </div>

                          <div className="mt-4 rounded-[1rem] border border-[#E4BF68] bg-[#FAF0D9] px-3 py-3">
                            <div className="text-[5.5px] font-black uppercase tracking-[0.14em] text-[#A76B66]">Looking for</div>
                            <div className="mt-1.5 text-[8.5px] font-black text-[#A62A32]">Something serious, taken slowly</div>
                          </div>

                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {["Music first", "Organised", "Easy company", "Late drives", "Straight talker", "Always early"].map((tag) => (
                              <span key={tag} className="rounded-full bg-[#F5E7E4] px-2.5 py-1.5 text-[6.7px] font-bold text-[#A23A42]">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </section>

                      <div className="h-[20px]" aria-hidden="true" />
                    </div>

                    {/* Navigation remains fixed while only the phone content scrolls */}
                    {sharedBottomNav}
                  </>
                )}

                <FrequenciesSyncedAnimation
                  visible={discoverScreen === "matched"}
                  profileName="Yaya"
                  logoSrc={seraseLogo}
                  shouldReduceMotion={shouldReduceMotion}
                  onSkip={() => {
                    clearAllTimers();
                    resetDiscoverCard();
                    setHasInteracted(true);
                  }}
                />
              </>
            )}


            {/* Page 02 — Chat & Media phone UI from Features.tsx */}
            {panelPage === 1 && (
              <>
                <div className="absolute inset-x-0 top-[30px] z-30 h-[52px] border-b border-[#E8DED1] bg-[#FFF9F3]/98 px-3 backdrop-blur-md">
                  <div className="flex h-full items-center justify-between">
                    <div className="flex min-w-0 items-center gap-2.5">
                      <button
                        type="button"
                        aria-label="Back"
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F8E9E7] text-[#98252D]"
                      >
                        <ChevronLeft className="h-3 w-3" strokeWidth={2} />
                      </button>

                      <div className="relative h-8 w-8 shrink-0 rounded-full bg-[radial-gradient(circle_at_50%_30%,#DCC8C1_0%,#A98480_52%,#755C64_100%)] shadow-sm">
                        <span className="absolute bottom-[1px] right-[1px] h-2.5 w-2.5 rounded-full border-2 border-[#FFF9F3] bg-[#8FA23D]" />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-1 text-[11.5px] font-extrabold leading-tight text-[#2E2928]">
                          <span>Amira</span>
                          <ShieldCheck className="h-2.5 w-2.5 shrink-0 text-[#C79A45]" />
                        </div>
                        <div className="mt-0.5 text-[6.8px] font-bold leading-none text-[#879B32]">Active now</div>
                      </div>
                    </div>
                    <MoreVertical className="h-4 w-4 shrink-0 text-[#98252D]" />
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: shouldReduceMotion ? 0.1 : 0.45 }}
                  className="absolute inset-x-0 top-[82px] z-20 h-[62px] border-b border-[#D9DDB9] bg-[#ECEFCE] px-3 py-2.5"
                >
                  <div className="flex h-full items-center justify-between gap-2.5">
                    <div className="min-w-0 pr-1">
                      <div className="text-[9px] font-extrabold leading-tight text-[#292625]">Ready to meet in person?</div>
                      <div className="mt-1.5 text-[6.8px] font-medium leading-[1.35] text-[#66645C]">A private signal. She only learns if she says yes too.</div>
                    </div>
                    <button type="button" className="shrink-0 rounded-full bg-[#A3222D] px-3 py-2 text-[6.8px] font-extrabold text-white shadow-[0_5px_12px_rgba(163,34,45,0.18)]">I&apos;m ready</button>
                  </div>
                </motion.div>

                <div className="absolute inset-x-0 bottom-[74px] top-[144px] z-10 overflow-y-auto overflow-x-hidden px-3 py-2.5 pr-5 [scrollbar-width:thin] [scrollbar-color:#C3BDB8_transparent] [&::-webkit-scrollbar]:w-[3px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#C3BDB8]">
                  <div className="flex min-h-full flex-col gap-2.5">
                    <div className="self-center rounded-full bg-[#E8D6D0] px-3 py-0.5 text-[6.3px] font-bold text-[#8D3C40]">Today</div>
                    <div className="w-[82%] self-start rounded-[1.15rem] rounded-tl-[0.45rem] border border-[#E4C1BE]/70 bg-[#EBCBC8] px-3.5 py-3 text-[8.9px] font-medium leading-[1.55] text-[#342E2C] shadow-[0_5px_14px_rgba(83,51,46,0.055)]">
                      Okay the shophouse tiles arrived and they are the wrong green. Devastating.
                      <div className="mt-1.5 text-[6.2px] font-medium text-[#9A6A6A]">11:29</div>
                    </div>
                    <div className="relative w-[80%] self-end rounded-[1.15rem] rounded-tr-[0.45rem] bg-[#A6232D] px-3.5 pb-[18px] pt-3 text-[8.9px] font-semibold leading-[1.55] text-white shadow-[0_7px_16px_rgba(163,34,45,0.16)]">
                      Wrong green is still a green. Send a photo, I&apos;ll rule on it.
                      <div className="absolute bottom-[6px] right-3 flex items-center gap-1.5 text-[6.1px] font-medium text-white/65"><span>11:34</span><span className="tracking-[-0.12em] text-white/70">✓✓</span></div>
                    </div>
                    <div className="w-[77%] self-start rounded-[1.15rem] rounded-tl-[0.45rem] border border-[#E4C1BE]/70 bg-[#EBCBC8] px-3.5 py-3 text-[8.9px] font-medium leading-[1.55] text-[#342E2C] shadow-[0_5px_14px_rgba(83,51,46,0.05)]">
                      Ha. You get one vote. Are you around Thursday?
                      <div className="mt-1.5 text-[6.2px] font-medium text-[#9A6A6A]">11:36</div>
                    </div>
                  </div>
                </div>

                <div className="absolute inset-x-0 bottom-0 z-30 h-[74px] border-t border-[#E8DED1] bg-[#FFF9F3]/98 px-3 pt-2.5">
                  <div className="flex items-center gap-2">
                    <button type="button" aria-label="Add attachment" className="flex h-[25px] w-[25px] shrink-0 items-center justify-center rounded-lg border border-[#E2D4C7] bg-[#FFFDFC] text-[#A3222D]"><span className="text-[14px] font-light leading-none">+</span></button>
                    <button type="button" aria-label="AI prompts" className="flex h-[25px] w-[25px] shrink-0 items-center justify-center rounded-lg border border-[#EAD8B1] bg-[#F4E7CA]"><Sparkles className="h-3 w-3 text-[#98252D]" fill="currentColor" /></button>
                    <div className="flex h-7 flex-1 items-center rounded-full border border-[#D8CEC3] bg-white/90 px-3 text-[8.8px] text-[#AAA09A]">Message...</div>
                    <button type="button" aria-label="Send" className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-[#A3222D] pl-0.5 shadow-sm"><Send className="h-[11px] w-[11px] text-white" /></button>
                  </div>
                  <div className="mt-1.5 pl-0.5 text-[6.4px] font-medium text-[#A69E99]">3 AI prompts left today · Serasé Core</div>
                </div>

              </>
            )}

            {/* Page 03 / 04 — Date Planning & Safety phone UI from Features.tsx */}
            {panelPage >= 2 && (
              <>
                <div className="absolute inset-x-0 top-[30px] z-30 h-[52px] border-b border-[#E8DED1] bg-[#FFF9F3]/98 px-3 backdrop-blur-md">
                  <div className="flex h-full items-center justify-between">
                    <div className="flex min-w-0 items-center gap-2">
                      <button type="button" aria-label="Back" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F8E9E7] text-[#98252D]"><ChevronLeft className="h-3.5 w-3.5" strokeWidth={2} /></button>
                      <div className="relative h-8 w-8 shrink-0 rounded-full bg-[radial-gradient(circle_at_50%_30%,#DCC8C1_0%,#A98480_52%,#755C64_100%)] shadow-sm"><span className="absolute bottom-[1px] right-[1px] h-2 w-2 rounded-full border-[1.5px] border-[#FFF9F3] bg-[#8FA23D]" /></div>
                      <div className="min-w-0"><div className="flex items-center gap-1 text-[11px] font-extrabold leading-tight text-[#2E2928]"><span>Amira</span><ShieldCheck className="h-2.5 w-2.5 shrink-0 text-[#C79A45]" /></div><div className="mt-0.5 text-[6.8px] font-bold leading-none text-[#879B32]">Active now</div></div>
                    </div>
                    <MoreVertical className="h-4 w-4 shrink-0 text-[#98252D]" />
                  </div>
                </div>

                <div className="absolute inset-x-0 top-[82px] z-20 h-[62px] border-b border-[#D8DDB5] bg-[#ECEFCE] px-3 py-2.5">
                  <div className="flex h-full items-center justify-between gap-2"><div className="min-w-0"><div className="text-[8.8px] font-extrabold leading-tight text-[#292625]">Ready to meet in person?</div><div className="mt-1 text-[6.2px] font-medium leading-[1.35] text-[#67665D]">A private signal. She only learns if she says yes too.</div></div><button type="button" className="shrink-0 rounded-full bg-[#A3222D] px-3 py-1.5 text-[6.8px] font-extrabold text-white shadow-sm">I&apos;m ready</button></div>
                </div>

                <div className="absolute inset-x-0 bottom-[74px] top-[144px] z-10 overflow-y-auto overflow-x-hidden px-3 py-3 pr-5 [scrollbar-width:thin] [scrollbar-color:#9B9996_transparent] [&::-webkit-scrollbar]:w-[4px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#9B9996]">
                  <div className="flex min-h-full flex-col gap-2.5">
                    <div className="w-[82%] self-start rounded-[1.05rem] rounded-tl-[0.42rem] bg-[#EBCBC8] px-3 py-2.5 text-[8.7px] font-medium leading-[1.5] text-[#342E2C]">Ha. You get one vote. Are you around Thursday?<div className="mt-1.5 text-[6.1px] font-medium text-[#9A6A6A]">11:36</div></div>

                    <div className="overflow-hidden rounded-[1.2rem] border border-[#E8C785] bg-[#FFFDFC] shadow-[0_8px_18px_rgba(124,88,44,0.07)]">
                      <div className="flex items-center justify-between px-3 pb-2 pt-3"><span className="text-[6px] font-black uppercase tracking-[0.16em] text-[#A3262D]">Date Plan · Thu 27 Aug</span><span className="text-[6.3px] font-extrabold text-[#71872C]">Amira is in</span></div>
                      <div className="px-3 pb-3">
                        <div>
                          <div className="grid grid-cols-[42px_1fr] items-start gap-2 border-b border-[#EFE7DE] py-3"><span className="text-[8px] font-black text-[#A3262D]">18:30</span><div><div className="text-[9px] font-bold text-[#2F2A28]">Coffee</div><div className="mt-1 flex items-center gap-1 text-[6.2px] font-medium text-[#8C827C]"><MapPin className="h-2.5 w-2.5" />Bangsar</div></div></div>
                          <div className="grid grid-cols-[42px_1fr] items-start gap-2 border-b border-[#EFE7DE] py-3"><span className="text-[8px] font-black text-[#A3262D]">20:00</span><div><div className="text-[9px] font-bold text-[#2F2A28]">Dinner</div><div className="mt-1 flex items-center gap-1 text-[6.2px] font-medium text-[#8C827C]"><MapPin className="h-2.5 w-2.5" />Jalan Telawi</div></div></div>
                        </div>
                        <div className="mt-3 rounded-[1rem] border border-[#C8D37B] bg-[#EEF0CB] px-3 py-3">
                          <div className="flex items-center justify-center"><div className="flex flex-col items-center gap-1"><div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#8EAE27] text-[#304000]"><CheckCircle2 className="h-4 w-4" strokeWidth={2.2} /></div><span className="text-[5.8px] font-black uppercase tracking-[0.08em] text-[#6E7E23]">You</span></div><div className="mx-3 h-px w-10 bg-[#A8BD42]" /><div className="flex flex-col items-center gap-1"><div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#8EAE27] text-[#304000]"><CheckCircle2 className="h-4 w-4" strokeWidth={2.2} /></div><span className="text-[5.8px] font-black uppercase tracking-[0.08em] text-[#6E7E23]">Amira</span></div></div>
                          <div className="mt-2 text-center text-[6.6px] font-extrabold text-[#5F7119]">Both confirmed at 17:04</div>
                        </div>
                        <div className="mt-2.5 grid grid-cols-2 gap-1.5"><button type="button" className="flex items-center justify-center gap-1.5 rounded-xl border border-[#E2D9D0] bg-white py-2 text-[6.8px] font-semibold text-[#4C4642]"><CalendarHeart className="h-3 w-3" />Add to calendar</button><button type="button" className="flex items-center justify-center gap-1.5 rounded-xl border border-[#E2D9D0] bg-white py-2 text-[6.8px] font-semibold text-[#4C4642]"><MapPin className="h-3 w-3" />Directions</button></div>
                        <div className="mt-2 grid grid-cols-[1fr_auto] gap-1.5"><button type="button" className="rounded-full border border-[#D39B9C] bg-white py-1.5 text-[6.8px] font-bold text-[#872226]">Edit plan</button><button type="button" className="rounded-full border border-[#E5DDD6] bg-white px-4 py-1.5 text-[6.8px] font-semibold text-[#7E7671]">Cancel</button></div>
                      </div>
                    </div>

                    <div className="w-[64%] self-start rounded-[1rem] rounded-tl-[0.4rem] bg-[#EBCBC8] px-3 py-2.5 text-[8.4px] font-medium leading-[1.5] text-[#342E2C]">Locked in. I will see you there.<div className="mt-1.5 text-[6px] font-medium text-[#9A6A6A]">17:04</div></div>
                    <div className="rounded-[1rem] border border-[#F1A8AC] bg-[#FBE9E7] px-3 py-2.5"><div className="mb-1.5 text-[5.8px] font-black uppercase tracking-[0.15em] text-[#E05A62]">Date is set · Safety</div><div className="flex items-center justify-between gap-2"><div className="min-w-0"><div className="text-[8.8px] font-extrabold text-[#2F2A28]">Sibling</div><div className="mt-0.5 whitespace-nowrap text-[6.2px] font-medium text-[#8A817C]">+60 12 345 6789 · one tap to call</div></div><button type="button" className="flex shrink-0 items-center gap-1 rounded-full bg-[#E75661] px-3 py-1.5 text-white"><Phone className="h-2.5 w-2.5" /><span className="text-[6.8px] font-extrabold">Call</span></button></div></div>
                  </div>
                </div>

                {/* Composer — exact Features.tsx structure; no Product global nav on this screen */}
                <div className="absolute inset-x-0 bottom-0 z-30 h-[74px] border-t border-[#E8DED1] bg-[#FFF9F3]/98 px-3 pt-2.5">
                  <div className="flex items-center gap-2">
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.94 }}
                      aria-label="Add attachment"
                      className="flex h-[25px] w-[25px] shrink-0 items-center justify-center rounded-lg border border-[#E2D4C7] bg-[#FFFDFC] text-[#A3222D]"
                    >
                      <span className="text-[14px] font-light leading-none">+</span>
                    </motion.button>

                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.94 }}
                      aria-label="AI Prompt"
                      className="flex h-[25px] w-[25px] shrink-0 items-center justify-center rounded-lg border border-[#EAD8B1] bg-[#F4E7CA]"
                    >
                      <Sparkles className="h-3 w-3 text-[#98252D]" fill="currentColor" />
                    </motion.button>

                    <div className="flex h-7 flex-1 items-center rounded-full border border-[#D8CEC3] bg-white/90 px-3 text-[8px] text-[#AAA09A]">
                      Message...
                    </div>

                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.94 }}
                      aria-label="Send"
                      className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-[#A3222D] pl-0.5 shadow-sm"
                    >
                      <Send className="h-[11px] w-[11px] text-white" />
                    </motion.button>
                  </div>

                  <div className="mt-1.5 pl-0.5 text-[6.4px] font-medium text-[#A69E99]">
                    3 AI prompts left today · Serasé Core
                  </div>
                </div>
              </>
            )}
          </>
        )}

        {/* ==================== TIMED CONNECTIONS ==================== */}
        {activeSection === "timed" && (
          <>
            {/* Fixed Messages header */}
            <div className="absolute inset-x-0 top-[30px] z-40 h-[58px] bg-[#FFF9F3]/98 px-4 pt-3">
              <div
                className="text-[24px] font-medium leading-none text-[#8A2128]"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Messages
              </div>

              <div className="mt-2 flex h-[27px] items-center rounded-full bg-[#F2DFC1] px-3 text-[7px] font-semibold text-[#A76B66]">
                Search connections
              </div>
            </div>

            {/* User can freely scroll the real Messages content */}
            <div className="absolute inset-x-0 bottom-[63px] top-[88px] z-20 overflow-y-auto overscroll-contain bg-[#FFF9F3] pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="border-b border-[#E9DCCF] px-3 pb-4 pt-4">
                <div className="flex items-center justify-between">
                  <div className="text-[7px] font-black uppercase tracking-[0.17em] text-[#9A746C]">
                    New connections
                  </div>
                  <div className="text-[7px] font-bold text-[#9C756B]">
                    Say hi before the ring empties
                  </div>
                </div>

                <div className="mt-3 flex items-start justify-between">
                  {[
                    ["Y", "Yaya", "4h left", 78, false],
                    ["S", "Soso", "29h left", 62, false],
                    ["A", "Amira", "35h left", 72, false],
                    ["P", "Priya", "3h left", 58, false],
                    ["Y", "Yuki", "57m left", 14, true],
                  ].map(([initial, name, time, progress, urgent]) => (
                    <div
                      key={String(name)}
                      className="flex w-[42px] flex-col items-center"
                    >
                      <div
                        className="flex h-[36px] w-[36px] items-center justify-center rounded-full p-[2px]"
                        style={{
                          background: `conic-gradient(${
                            urgent ? "#A72B37" : "#D0A34C"
                          } ${progress}%, #D3CDC6 ${progress}%)`,
                        }}
                      >
                        <div className="flex h-full w-full items-center justify-center rounded-full bg-[#C6ADA6] text-[9px] font-black text-[#8A2128]">
                          {initial}
                        </div>
                      </div>
                      <div className="mt-1 text-[7px] font-black text-[#5A4D48]">
                        {name}
                      </div>
                      <div
                        className={`mt-0.5 whitespace-nowrap text-[6.2px] font-bold ${
                          urgent ? "text-[#BB3340]" : "text-[#9A8178]"
                        }`}
                      >
                        {time}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mx-3 mt-3 flex h-[48px] items-center gap-3 rounded-[1rem] bg-[#A51F2C] px-3 text-white shadow-sm">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#E4BF67] text-[#8A2128]">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-[9px] font-black">
                    Serasé Coach
                  </div>
                  <div className="mt-0.5 truncate text-[7px] font-medium text-white/78">
                    Want me to plan Thursday for you and Amira?
                  </div>
                </div>
              </div>

              <div className="mx-3 mt-3 overflow-hidden rounded-[1.1rem] bg-white/55">
                {[
                  ["A", "Amira", "Ha. You get one vote. Are you around...", "11:36", "1"],
                  ["Y", "Yaya", "Sent you the set list. Third track is...", "10:12", "2"],
                  ["S", "Soso", "Sunday drive. I am picking the route.", "10:04", ""],
                        ].map(([initial, name, copy, time, badge]) => (
                  <div
                    key={String(name)}
                    className="flex h-[54px] items-center gap-3 border-b border-[#EADFD5] px-3 last:border-b-0"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#C5AAA5] text-[9px] font-black text-[#8A2128]">
                      {initial}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[9px] font-black text-[#4E423E]">
                        {name}
                      </div>
                      <div className="mt-1 truncate text-[7.2px] font-medium text-[#8F8078]">
                        {copy}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className="text-[6.1px] font-semibold text-[#A19189]">
                        {time}
                      </div>
                      {badge && (
                        <div className="flex h-4 min-w-4 items-center justify-center rounded-full bg-[#E1B75C] px-1 text-[6.1px] font-black text-[#8A2128]">
                          {badge}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {sharedBottomNav}
          </>
        )}

        {/* ==================== SERASÉ AI ==================== */}
        {activeSection === "ai" && (
          <>
            {/* Prototype Coach header — kept identical across all five AI states */}
            <div className="absolute inset-x-0 top-[30px] z-40 h-[52px] bg-[#A51F2C] px-3 text-white">
              <div className="flex h-full items-center gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/12">
                  <ChevronLeft className="h-3.5 w-3.5" strokeWidth={2} />
                </div>

                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#E5BE66] text-[#8A2128] shadow-[0_4px_10px_rgba(70,25,27,0.12)]">
                  <Sparkles className="h-4 w-4" />
                </div>

                <div className="min-w-0">
                  <div className="text-[11px] font-black leading-tight">Serasé Coach</div>
                  <div className="mt-0.5 text-[6.5px] font-semibold leading-tight text-white/74">
                    Private · never shown to your matches
                  </div>
                </div>
              </div>
            </div>

            {/* The Coach conversation changes together with the right-hand description page. */}
            <div className="absolute inset-x-0 bottom-[108px] top-[82px] z-20 overflow-y-auto overscroll-contain bg-[#F8F1EA] px-3 pb-5 pt-4 [scrollbar-width:thin] [scrollbar-color:#9B9691_transparent] [&::-webkit-scrollbar]:w-[4px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#9B9691]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`ai-phone-${panelPage}`}
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                  transition={{ duration: shouldReduceMotion ? 0.08 : 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-3"
                >
                  {/* 01 / 05 — initial prototype context */}
                  {panelPage === 0 && (
                    <>
                      <div className="rounded-[1.2rem] border border-[#E8DDD3] bg-[#FFFDFC] px-4 py-4 shadow-[0_6px_16px_rgba(88,58,52,0.08)]">
                        <p className="text-[8.4px] font-semibold leading-[1.65] text-[#5B4C47]">
                          Amira asked about Thursday. Want me to shape it into something specific?
                        </p>
                        <p className="mt-3 text-[8.4px] font-semibold leading-[1.65] text-[#5B4C47]">
                          She likes slow dinners and walkable streets, and you both listed night walker.
                        </p>
                      </div>
                      <div className="h-[210px]" aria-hidden="true" />
                    </>
                  )}

                  {/* 02 / 05 — Help me reply */}
                  {panelPage === 1 && (
                    <>
                      <div className="ml-auto max-w-[72%] rounded-[1.05rem] rounded-tr-[0.38rem] bg-[#A51F2C] px-3 py-2.5 text-[8px] font-bold leading-[1.5] text-white shadow-[0_5px_12px_rgba(165,31,44,0.14)]">
                        Help me reply
                      </div>

                      <div className="rounded-[1.2rem] border border-[#E8DDD3] bg-[#FFFDFC] px-4 py-4 shadow-[0_6px_16px_rgba(88,58,52,0.08)]">
                        <div className="mb-2 flex items-center gap-2 text-[6.3px] font-black uppercase tracking-[0.12em] text-[#9A6B27]">
                          <MessageSquareText className="h-3 w-3" />
                          Suggested reply
                        </div>
                        <p className="text-[8.5px] font-semibold leading-[1.65] text-[#51443F]">
                          “Thursday works. How about a slow dinner somewhere we can walk around after?”
                        </p>
                      </div>

                      <div className="rounded-[1rem] bg-[#F1E7DE] px-3 py-2.5 text-[7.2px] font-semibold leading-[1.45] text-[#766862]">
                        Edit it until it sounds like you. Nothing is sent automatically.
                      </div>
                      <div className="h-[110px]" aria-hidden="true" />
                    </>
                  )}

                  {/* 03 / 05 — Plan a date */}
                  {panelPage === 2 && (
                    <>
                      <div className="ml-auto max-w-[72%] rounded-[1.05rem] rounded-tr-[0.38rem] bg-[#A51F2C] px-3 py-2.5 text-[8px] font-bold leading-[1.5] text-white shadow-[0_5px_12px_rgba(165,31,44,0.14)]">
                        Plan a date
                      </div>

                      <div className="rounded-[1.2rem] border border-[#E8DDD3] bg-[#FFFDFC] px-4 py-4 shadow-[0_6px_16px_rgba(88,58,52,0.08)]">
                        <p className="text-[8.2px] font-semibold leading-[1.55] text-[#5B4C47]">
                          A Thursday plan that fits what you both like:
                        </p>

                        <div className="mt-3 overflow-hidden rounded-[0.95rem] border border-[#ECDDBA] bg-[#FFF9EC]">
                          <div className="flex items-start gap-3 border-b border-[#EEDFC8] px-3 py-3">
                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-[#E8C969] text-[#7E1E26]">
                              <CalendarHeart className="h-3.5 w-3.5" />
                            </div>
                            <div>
                              <div className="text-[8px] font-black text-[#4B403B]">Dinner · 7:30 PM</div>
                              <div className="mt-1 text-[6.6px] font-semibold text-[#8A7B74]">Bangsar · somewhere quiet</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 px-3 py-3">
                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-[#F0DDD6] text-[#A51F2C]">
                              <MapPin className="h-3.5 w-3.5" />
                            </div>
                            <div>
                              <div className="text-[8px] font-black text-[#4B403B]">Walk · after dinner</div>
                              <div className="mt-1 text-[6.6px] font-semibold text-[#8A7B74]">Keep it flexible and easy</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-[1rem] bg-[#F1E7DE] px-3 py-2.5 text-[7.2px] font-semibold leading-[1.45] text-[#766862]">
                        You can change the time, place or order before you share anything.
                      </div>
                    </>
                  )}

                  {/* 04 / 05 — Restaurant recommendation */}
                  {panelPage === 3 && (
                    <>
                      <div className="ml-auto max-w-[78%] rounded-[1.05rem] rounded-tr-[0.38rem] bg-[#A51F2C] px-3 py-2.5 text-[8px] font-bold leading-[1.5] text-white shadow-[0_5px_12px_rgba(165,31,44,0.14)]">
                        Recommend a restaurant
                      </div>

                      <div className="rounded-[1.2rem] border border-[#E8DDD3] bg-[#FFFDFC] px-4 py-4 shadow-[0_6px_16px_rgba(88,58,52,0.08)]">
                        <p className="text-[8.2px] font-semibold leading-[1.55] text-[#5B4C47]">
                          For a slower dinner and an easy walk after, I would start with these kinds of places:
                        </p>

                        <div className="mt-3 space-y-2">
                          {[
                            ["Quiet bistro", "Conversation-friendly · Bangsar"],
                            ["Neighbourhood Italian", "Relaxed dinner · walkable area"],
                            ["Modern Malaysian", "A little more special, still easy-going"],
                          ].map(([title, meta], index) => (
                            <div key={title} className="flex items-center gap-3 rounded-[0.9rem] border border-[#EEE2D8] bg-[#FAF5F0] px-3 py-2.5">
                              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-[#E7C96D]/35 text-[#9A6B27]">
                                {index === 0 ? <Utensils className="h-3.5 w-3.5" /> : <MapPin className="h-3.5 w-3.5" />}
                              </div>
                              <div className="min-w-0">
                                <div className="text-[7.7px] font-black text-[#4B403B]">{title}</div>
                                <div className="mt-0.5 truncate text-[6.3px] font-semibold text-[#8A7B74]">{meta}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {/* 05 / 05 — Outfit Check / private guidance */}
                  {panelPage >= 4 && (
                    <>
                      <div className="ml-auto max-w-[72%] rounded-[1.05rem] rounded-tr-[0.38rem] bg-[#A51F2C] px-3 py-2.5 text-[8px] font-bold leading-[1.5] text-white shadow-[0_5px_12px_rgba(165,31,44,0.14)]">
                        Outfit Check
                      </div>

                      <div className="rounded-[1.2rem] border border-[#E8DDD3] bg-[#FFFDFC] px-4 py-4 shadow-[0_6px_16px_rgba(88,58,52,0.08)]">
                        <div className="mb-2 flex items-center gap-2 text-[6.3px] font-black uppercase tracking-[0.12em] text-[#9A6B27]">
                          <Shirt className="h-3 w-3" />
                          For this date
                        </div>
                        <p className="text-[8.4px] font-semibold leading-[1.6] text-[#51443F]">
                          Smart casual fits the plan: relaxed enough for a walk, but intentional enough for dinner.
                        </p>

                        <div className="mt-3 grid grid-cols-2 gap-2">
                          <div className="rounded-[0.9rem] bg-[#F4E9E4] px-3 py-3">
                            <div className="text-[7.5px] font-black text-[#8A2128]">Keep</div>
                            <div className="mt-1 text-[6.3px] font-semibold leading-[1.4] text-[#756761]">Clean layers · comfortable shoes</div>
                          </div>
                          <div className="rounded-[0.9rem] bg-[#F5EEDC] px-3 py-3">
                            <div className="text-[7.5px] font-black text-[#9A6B27]">Skip</div>
                            <div className="mt-1 text-[6.3px] font-semibold leading-[1.4] text-[#756761]">Anything too formal for the walk</div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 rounded-[1rem] border border-[#E7D9CF] bg-[#F6EFE9] px-3 py-2.5">
                        <LockKeyhole className="h-3.5 w-3.5 shrink-0 text-[#8A2128]" />
                        <div className="text-[6.8px] font-semibold leading-[1.4] text-[#756761]">
                          Your Coach chat stays private from your match.
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Prototype quick actions. The selected action follows the description page. */}
            <div className="absolute inset-x-3 bottom-[72px] z-40 flex gap-1.5">
              {[
                ["Plan a date", 2],
                ["Recommend a restaurant", 3],
                ["Outfit Check", 4],
              ].map(([action, page]) => {
                const isSelected = panelPage === page;
                return (
                  <div
                    key={String(action)}
                    className={`flex-1 whitespace-nowrap rounded-full border px-2 py-2 text-center text-[6.1px] font-black transition-colors ${
                      isSelected
                        ? "border-[#A51F2C] bg-[#A51F2C] text-white"
                        : "border-[#D9BEB8] bg-[#FFF9F4] text-[#8A2128]"
                    }`}
                  >
                    {action}
                  </div>
                );
              })}
            </div>

            {/* Prototype action rail — this is part of the Coach screen, not the global app nav. */}
            <div className="absolute inset-x-3 bottom-[55px] z-40 flex items-center gap-1.5" aria-hidden="true">
              <span className="text-[8px] leading-none text-[#8F918F]">◀</span>
              <div className="h-[6px] flex-1 rounded-full bg-[#A2A3A0]" />
              <span className="text-[8px] leading-none text-[#8F918F]">▶</span>
            </div>

            <div className="absolute inset-x-3 bottom-[18px] z-40 flex items-center gap-2">
              <div className="flex h-[30px] flex-1 items-center rounded-full border border-[#D9CEC5] bg-[#FFF9F4] px-3 text-[7px] font-semibold text-[#A69A93]">
                {panelPage === 1 ? "Help me reply…" : "Ask the coach anything…"}
              </div>
              <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#A51F2C] text-white shadow-[0_5px_12px_rgba(165,31,44,0.16)]">
                <Send className="h-3 w-3" />
              </div>
            </div>
          </>
        )}
      </div>
    </PhoneFrame>
  );
}

const PRODUCT_CATEGORIES = [
  {
    id: "discover" as const,
    label: "Discover & Connect",
    shortLabel: "Discover",
    icon: Heart,
  },
  {
    id: "timed" as const,
    label: "Timed Connections",
    shortLabel: "48H",
    icon: Clock3,
  },
  {
    id: "ai" as const,
    label: "Serasé AI",
    shortLabel: "AI",
    icon: Sparkles,
  },
];

const PRODUCT_DETAILS: Record<
  ProductSectionId,
  {
    eyebrow: string;
    title: string;
    copy: string;
    icon: React.ElementType;
    panelClass: string;
    eyebrowClass: string;
    iconWrapClass: string;
    titleClass: string;
    copyClass: string;
    pointIconClass: string;
    pointTitleClass: string;
    pointCopyClass: string;
    points: ProductPanelPoint[];
  }
> = {
  discover: {
    eyebrow: "01 · Discover & Connect",
    title: "See more before you connect.",
    copy:
      "See verified profiles, interests and personality before deciding to connect.",
    icon: Heart,
    panelClass: "border-[#E5D7D0] bg-[#F8ECE8]",
    eyebrowClass: "text-[#8A2128]",
    iconWrapClass: "bg-[#EACDCA] text-[#8A2128]",
    titleClass: "text-[#241F1D]",
    copyClass: "text-muted-foreground",
    pointIconClass: "bg-white text-[#8A2128]",
    pointTitleClass: "text-[#3E3431]",
    pointCopyClass: "text-[#776963]",
    points: [
      {
        title: "Verified profiles",
        copy: "Know you are talking to a real person.",
        icon: ShieldCheck,
      },
      {
        title: "More than photos",
        copy: "See interests and profile details before deciding.",
        icon: User,
      },
      {
        title: "Send a Signal",
        copy: "Show extra interest when someone stands out.",
        icon: Sparkles,
      },
    ],
  },

  timed: {
    eyebrow: "02 · Timed Connections",
    title: "Keep new matches moving.",
    copy:
      "A 48-hour window shows how much time is left to start talking.",
    icon: Clock3,
    panelClass: "border-[#E8DEC9] bg-[#F8F2E6]",
    eyebrowClass: "text-[#946423]",
    iconWrapClass: "bg-[#EEDDBA] text-[#946423]",
    titleClass: "text-[#241F1D]",
    copyClass: "text-muted-foreground",
    pointIconClass: "bg-white text-[#A77025]",
    pointTitleClass: "text-[#3E3431]",
    pointCopyClass: "text-[#776963]",
    points: [
      {
        title: "48-hour window",
        copy: "Every new connection starts with a visible timer.",
        icon: Clock3,
      },
      {
        title: "See the time left",
        copy: "Both people can see the same countdown.",
        icon: Bell,
      },
      {
        title: "Start the conversation",
        copy: "The goal is simple: start talking while the match is fresh.",
        icon: MessageCircle,
      },
    ],
  },

  ai: {
    eyebrow: "03 · Serasé AI",
    title: "AI help when you need it.",
    copy:
      "Get private help with replies, date ideas and next steps. You stay in control.",
    icon: Sparkles,
    panelClass: "border-[#E0D5D1] bg-[#2A2322]",
    eyebrowClass: "text-[#E3BC66]",
    iconWrapClass: "bg-[#E3BC66]/14 text-[#E3BC66]",
    titleClass: "text-white",
    copyClass: "text-white/68",
    pointIconClass: "bg-white/10 text-[#E3BC66]",
    pointTitleClass: "text-white",
    pointCopyClass: "text-white/55",
    points: [
      {
        title: "Reply help",
        copy: "Get a reply idea and make it sound like you.",
        icon: MessageCircle,
      },
      {
        title: "Private Coach",
        copy: "Your Coach chat stays private from your match.",
        icon: ShieldCheck,
      },
      {
        title: "Date ideas",
        copy: "Get simple ideas for meeting in real life.",
        icon: CalendarHeart,
      },
    ],
  },
};


type ProductPanelPoint = {
  title: string;
  copy: string;
  icon: React.ElementType;
};

type ProductPanelPage = {
  eyebrow: string;
  title: string;
  copy: string;
  points: ProductPanelPoint[];
  icon?: React.ElementType;
  variant?: "cards" | "flow" | "timer" | "principles";
  highlight?: {
    value: string;
    label: string;
    note: string;
  };
};

const PRODUCT_EXTRA_PAGES: Record<ProductSectionId, ProductPanelPage[]> = {
  discover: [
    {
      eyebrow: "From profile to conversation",
      title: "A match should go somewhere.",
      copy:
        "After you connect, Serasé helps you start talking and move things forward.",
      icon: MessageCircle,
      variant: "cards",
      points: [
        {
          title: "Profile → Connect",
          copy: "Learn enough about someone, then connect when it feels right.",
          icon: Heart,
        },
        {
          title: "Chat naturally",
          copy: "Use text, photos and GIFs to keep the conversation natural.",
          icon: Bookmark,
        },
        {
          title: "Private readiness",
          copy: "When you are both ready, you can move toward a date plan.",
          icon: CheckCircle2,
        },
      ],
    },
    {
      eyebrow: "From match to date",
      title: "One simple journey.",
      copy:
        "Serasé keeps each step connected, from profile to conversation to date plan.",
      icon: Heart,
      variant: "flow",
      points: [
        { title: "Discover", copy: "See more than a photo.", icon: User },
        { title: "Connect", copy: "Connect when it feels right.", icon: Heart },
        { title: "Talk", copy: "Start talking while it is fresh.", icon: MessageCircle },
        { title: "Ready", copy: "Say you are ready privately.", icon: CheckCircle2 },
        { title: "Plan", copy: "Plan the date together.", icon: CalendarHeart },
      ],
    },
    {
      eyebrow: "Why Discover",
      title: "Less swiping. Better choices.",
      copy:
        "See who someone is, choose clearly, and move forward when it feels right.",
      icon: Sparkles,
      variant: "principles",
      points: [
        { title: "Verified first", copy: "Start with a verified profile.", icon: ShieldCheck },
        { title: "48 hours to start", copy: "See how much time is left to start talking.", icon: Clock3 },
        { title: "Built for real dates", copy: "Move from a match to a shared date plan.", icon: CalendarHeart },
      ],
    },
  ],

  timed: [
    {
      eyebrow: "Why 48 hours?",
      title: "48 hours to start talking.",
      copy:
        "The timer gives both people a clear window to start the conversation.",
      icon: Clock3,
      variant: "timer",
      highlight: {
        value: "48:00",
        label: "CONNECTION WINDOW",
        note: "Both people can see the same countdown.",
      },
      points: [
        { title: "Start while it is fresh", copy: "Start talking before the match goes quiet.", icon: MessageCircle },
        { title: "Same countdown", copy: "You both see how much time is left.", icon: Bell },
      ],
    },
    {
      eyebrow: "How it works",
      title: "Simple and clear.",
      copy:
        "The timer encourages a first message without rushing the conversation.",
      icon: RotateCcw,
      variant: "flow",
      points: [
        { title: "Connect", copy: "A new match starts the timer.", icon: Heart },
        { title: "48H", copy: "See the time left.", icon: Clock3 },
        { title: "Message", copy: "Start the conversation.", icon: MessageCircle },
        { title: "Reply", copy: "Keep talking if it feels right.", icon: RotateCcw },
      ],
    },
    {
      eyebrow: "Clear, not stressful",
      title: "A timer should make things clear.",
      copy:
        "You can always see the match status without feeling rushed.",
      icon: Bell,
      variant: "principles",
      points: [
        { title: "Clear status", copy: "Know if the connection is still open.", icon: Bell },
        { title: "Conversation first", copy: "The goal is to talk, not collect matches.", icon: MessageCircle },
        { title: "Clear ending", copy: "When the timer ends, the connection closes.", icon: CheckCircle2 },
      ],
    },
  ],

  ai: [
    {
      eyebrow: "Reply help",
      title: "Get help with a reply.",
      copy:
        "Serasé Coach can suggest a reply. Edit it before you send anything.",
      icon: MessageSquareText,
      variant: "cards",
      points: [
        { title: "Uses chat context", copy: "Suggestions can use the current conversation.", icon: MessageCircle },
        { title: "Edit the suggestion", copy: "Change the words until they sound like you.", icon: RotateCcw },
        { title: "You send it", copy: "Nothing is sent automatically.", icon: CheckCircle2 },
      ],
    },
    {
      eyebrow: "Plan a date",
      title: "Plan a date together.",
      copy:
        "Ask Serasé Coach for a simple date plan, then edit the details before sharing it.",
      icon: CalendarHeart,
      variant: "flow",
      points: [
        { title: "Date", copy: "Choose a day.", icon: CalendarHeart },
        { title: "Time", copy: "Choose a time.", icon: Clock3 },
        { title: "Place", copy: "Choose a place.", icon: MapPin },
        { title: "You decide", copy: "Edit before sharing.", icon: CheckCircle2 },
      ],
    },
    {
      eyebrow: "Restaurant ideas",
      title: "Find a place that fits.",
      copy:
        "Tell Serasé Coach the kind of date you want and get restaurant ideas that fit.",
      icon: Utensils,
      variant: "cards",
      points: [
        { title: "Match the mood", copy: "Choose quiet, casual, lively or something special.", icon: Sparkles },
        { title: "Keep it practical", copy: "Think about the area and what comes after.", icon: MapPin },
        { title: "You choose", copy: "Suggestions are options. You decide.", icon: CheckCircle2 },
      ],
    },
    {
      eyebrow: "Outfit Check",
      title: "Get a quick outfit opinion.",
      copy:
        "Get outfit ideas based on the date. Your Coach chat stays private.",
      icon: Shirt,
      variant: "principles",
      points: [
        { title: "Fit the plan", copy: "Dress for the place, time and activity.", icon: Shirt },
        { title: "Stay comfortable", copy: "Choose something that still feels like you.", icon: User },
        { title: "Private", copy: "Your match never sees your Coach chat.", icon: LockKeyhole },
      ],
    },
  ],
};


export default function Product() {
  useDocumentTitle("Product | Serasé");

  const shouldReduceMotion = useReducedMotion();
  const [activeSection, setActiveSection] = useState<ProductSectionId>("discover");
  const [panelPage, setPanelPage] = useState(0);

  const goToSection = (id: ProductSectionId) => {
    setActiveSection(id);
    setPanelPage(0);
  };

  const activeDetails = PRODUCT_DETAILS[activeSection];
  const panelPages: ProductPanelPage[] = [
    {
      eyebrow: activeDetails.eyebrow,
      title: activeDetails.title,
      copy: activeDetails.copy,
      points: activeDetails.points,
      icon: activeDetails.icon,
    },
    ...PRODUCT_EXTRA_PAGES[activeSection],
  ];
  const activePanelPage = panelPages[panelPage] ?? panelPages[0];
  const ActiveDescriptionIcon = activePanelPage.icon ?? activeDetails.icon;

  const goToPreviousPanelPage = () => {
    setPanelPage((current) => Math.max(0, current - 1));
  };

  const goToNextPanelPage = () => {
    setPanelPage((current) => Math.min(panelPages.length - 1, current + 1));
  };

  return (
    <div className="relative overflow-x-clip pb-24 pt-20 md:pb-28 md:pt-24">
      {/* ==================== Intro ==================== */}
      <section className="relative isolate min-h-[610px] overflow-hidden">
        {/* Single decorative heart-line only — no dots, particles, or extra shapes. */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 610"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 z-0 h-full w-full"
        >
          <defs>
            <linearGradient
              id="seraseProductHeartStroke"
              x1="0"
              y1="0"
              x2="1"
              y2="1"
            >
              <stop offset="0%" stopColor="#8A2128" stopOpacity="0.18" />
              <stop offset="42%" stopColor="#8A2128" stopOpacity="0.58" />
              <stop offset="100%" stopColor="#65171D" stopOpacity="0.78" />
            </linearGradient>
          </defs>

          <path
            transform="translate(90 -72)"
            d="M 520 495 C 640 535 760 505 820 445 C 865 400 870 352 840 317 C 810 282 760 286 735 326 C 715 286 665 278 632 307 C 594 340 602 397 640 435 C 694 489 780 495 880 465 C 1070 410 1260 330 1460 210"
            fill="none"
            stroke="url(#seraseProductHeartStroke)"
            strokeWidth="3.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <div className="serase-container-wide relative z-10 px-6">
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="max-w-4xl pt-3 md:pt-5"
          >
            <div className="text-[12px] font-black uppercase tracking-[0.18em] text-[#8A2128]">
              Product
            </div>

            <h1 className="mt-5 text-[48px] font-black leading-[0.96] tracking-[-0.055em] text-[#241F1D] sm:text-[58px] md:text-[68px] lg:text-[78px]">
              Three parts.
              <br />
              <span className="bg-gradient-to-r from-[#A21F2D] via-[#C71E3B] to-[#E56A0A] bg-clip-text text-transparent">
                One simple experience.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-[17px] font-medium leading-[1.8] text-muted-foreground md:text-[18px]">
              Discover people, keep new matches moving, and get private AI help
              when you need it. Everything works together from match to date.
            </p>

            <div className="mt-8 text-[13px] font-black text-[#8A2128]">
              Choose a category to explore.
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== Product Layout ==================== */}
      <section className="serase-container-hero mt-16 px-4 md:mt-20 md:px-5">
        <div className="grid gap-12 lg:grid-cols-[340px_minmax(0,1fr)] lg:gap-16 xl:grid-cols-[365px_minmax(0,1fr)] xl:gap-20">
          {/* ==================== Fixed / Sticky Phone Category Rail ==================== */}
          <aside className="relative hidden lg:block">
            <div className="sticky top-[9vh] flex justify-center">
              <div className="relative h-[610px] w-[340px] xl:w-[365px]">
                {/* Reuse the exact same PhoneFrame component as Home — near full visual scale */}
                <div className="absolute left-1/2 top-1/2 h-[546px] w-[260px] -translate-x-1/2 -translate-y-1/2">
                  <div className="origin-top-left scale-[1.05]">
                    <ProductPhonePreview activeSection={activeSection} panelPage={panelPage} />
                  </div>
                </div>

                {/* ==================== Floating category icons outside phone ==================== */}

                {/* Discover & Connect — upper right */}
                <button
                  type="button"
                  onClick={() => goToSection("discover")}
                  aria-label="Discover & Connect"
                  aria-current={activeSection === "discover" ? "true" : undefined}
                  className={`group absolute right-[8px] top-[62px] z-20 flex h-[54px] w-[54px] items-center justify-center rounded-full border-[3px] transition-all duration-300 ${
                    activeSection === "discover"
                      ? "scale-[1.06] border-white bg-[#8A2128] text-white shadow-[0_12px_28px_rgba(138,33,40,0.24)] ring-4 ring-[#8A2128]/10"
                      : "border-white bg-[#FFF8F3] text-[#8A2128] shadow-[0_10px_24px_rgba(75,45,42,0.12)] hover:-translate-y-0.5"
                  }`}
                >
                  <Heart className="h-5 w-5" strokeWidth={1.9} />
                  <span className="pointer-events-none invisible absolute left-[62px] top-1/2 -translate-y-1/2 translate-x-1 whitespace-nowrap rounded-full border border-[#E3D5CE] bg-white/96 px-3 py-2 text-[9px] font-black text-[#4E403B] opacity-0 shadow-[0_8px_20px_rgba(75,45,42,0.10)] backdrop-blur-md transition-all duration-200 group-hover:visible group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:visible group-focus-visible:translate-x-0 group-focus-visible:opacity-100">
                    Discover &amp; Connect
                  </span>
                </button>

                {/* Timed Connections — left middle */}
                <button
                  type="button"
                  onClick={() => goToSection("timed")}
                  aria-label="Timed Connections"
                  aria-current={activeSection === "timed" ? "true" : undefined}
                  className={`group absolute left-[4px] top-[265px] z-20 flex h-[54px] w-[54px] items-center justify-center rounded-full border-[3px] transition-all duration-300 ${
                    activeSection === "timed"
                      ? "scale-[1.06] border-white bg-[#8A2128] text-white shadow-[0_12px_28px_rgba(138,33,40,0.24)] ring-4 ring-[#8A2128]/10"
                      : "border-white bg-[#FFF8F3] text-[#8A2128] shadow-[0_10px_24px_rgba(75,45,42,0.12)] hover:-translate-y-0.5"
                  }`}
                >
                  <Clock3 className="h-5 w-5" strokeWidth={1.9} />
                  <span className="pointer-events-none invisible absolute right-[62px] top-1/2 -translate-y-1/2 -translate-x-1 whitespace-nowrap rounded-full border border-[#E3D5CE] bg-white/96 px-3 py-2 text-[9px] font-black text-[#4E403B] opacity-0 shadow-[0_8px_20px_rgba(75,45,42,0.10)] backdrop-blur-md transition-all duration-200 group-hover:visible group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:visible group-focus-visible:translate-x-0 group-focus-visible:opacity-100">
                    Timed Connections
                  </span>
                </button>

                {/* Serasé AI — lower right */}
                <button
                  type="button"
                  onClick={() => goToSection("ai")}
                  aria-label="Serasé AI"
                  aria-current={activeSection === "ai" ? "true" : undefined}
                  className={`group absolute right-[6px] bottom-[68px] z-20 flex h-[54px] w-[54px] items-center justify-center rounded-full border-[3px] transition-all duration-300 ${
                    activeSection === "ai"
                      ? "scale-[1.06] border-white bg-[#8A2128] text-white shadow-[0_12px_28px_rgba(138,33,40,0.24)] ring-4 ring-[#8A2128]/10"
                      : "border-white bg-[#FFF8F3] text-[#8A2128] shadow-[0_10px_24px_rgba(75,45,42,0.12)] hover:-translate-y-0.5"
                  }`}
                >
                  <Sparkles className="h-5 w-5" strokeWidth={1.9} />
                  <span className="pointer-events-none invisible absolute left-[62px] top-1/2 -translate-y-1/2 translate-x-1 whitespace-nowrap rounded-full border border-[#E3D5CE] bg-white/96 px-3 py-2 text-[9px] font-black text-[#4E403B] opacity-0 shadow-[0_8px_20px_rgba(75,45,42,0.10)] backdrop-blur-md transition-all duration-200 group-hover:visible group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:visible group-focus-visible:translate-x-0 group-focus-visible:opacity-100">
                    Serasé AI
                  </span>
                </button>




              </div>
            </div>
          </aside>

          {/* Mobile sticky category tabs */}
          <div className="sticky top-[72px] z-40 -mx-2 overflow-x-auto px-2 py-2 lg:hidden">
            <div className="mx-auto flex w-max items-center gap-2 rounded-full border border-[#E2D4CD] bg-[#FFF9F5]/92 p-1.5 shadow-[0_12px_30px_rgba(75,45,42,0.09)] backdrop-blur-xl">
              {PRODUCT_CATEGORIES.map((category) => {
                const Icon = category.icon;
                const active = activeSection === category.id;

                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => goToSection(category.id)}
                    className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-[11px] font-black transition-all ${
                      active
                        ? "bg-[#8A2128] text-white"
                        : "text-[#665752] hover:bg-white"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {category.shortLabel}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ==================== Right-side Description — paginated, no extra scrolling ==================== */}
          <div className="min-w-0 w-full max-w-[860px] justify-self-end">
            <section
              className={`overflow-hidden rounded-[3rem] border p-7 transition-colors duration-300 md:p-10 lg:h-[620px] lg:px-10 lg:py-9 xl:px-11 ${activeDetails.panelClass}`}
            >
              <div className="flex h-full flex-col">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeSection}-${panelPage}`}
                    initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: shouldReduceMotion ? 0 : -16 }}
                    transition={{
                      duration: shouldReduceMotion ? 0.12 : 0.3,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex min-h-0 flex-1 flex-col overflow-visible pt-1 lg:overflow-y-auto lg:overscroll-contain lg:pr-2 lg:[scrollbar-width:thin]"
                  >
                    <div
                      className={`flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.16em] ${activeDetails.eyebrowClass}`}
                    >
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-full ${activeDetails.iconWrapClass}`}
                      >
                        <ActiveDescriptionIcon className="h-4 w-4" />
                      </span>
                      {activePanelPage.eyebrow}
                    </div>

                    <h2
                      className={`mt-6 max-w-[690px] text-[38px] font-black leading-[1.02] tracking-[-0.042em] md:text-[48px] ${activeDetails.titleClass}`}
                    >
                      {activePanelPage.title}
                    </h2>

                    <p
                      className={`mt-5 max-w-[680px] text-[15.5px] font-medium leading-[1.72] md:text-[16px] ${activeDetails.copyClass}`}
                    >
                      {activePanelPage.copy}
                    </p>

                    {activePanelPage.variant === "timer" && activePanelPage.highlight ? (
                      <div className="mt-6 grid gap-4 md:grid-cols-[1.05fr_0.95fr]">
                        <div
                          className={`relative overflow-hidden rounded-[1.8rem] border px-5 py-5 ${
                            activeSection === "ai"
                              ? "border-white/10 bg-white/[0.055]"
                              : "border-[#DCCBA8]/70 bg-white/52"
                          }`}
                        >
                          <div
                            className={`text-[9px] font-black uppercase tracking-[0.18em] ${activeDetails.eyebrowClass}`}
                          >
                            {activePanelPage.highlight.label}
                          </div>
                          <div
                            className={`mt-3 text-[58px] font-black leading-none tracking-[-0.065em] md:text-[66px] ${activeDetails.titleClass}`}
                          >
                            {activePanelPage.highlight.value}
                          </div>
                          <div className={`mt-3 max-w-[260px] text-[12px] font-semibold leading-[1.5] ${activeDetails.pointCopyClass}`}>
                            {activePanelPage.highlight.note}
                          </div>
                          <div
                            aria-hidden="true"
                            className={`absolute -bottom-10 -right-8 h-28 w-28 rounded-full border ${
                              activeSection === "ai" ? "border-white/10" : "border-[#C89A45]/18"
                            }`}
                          />
                        </div>

                        <div className="grid gap-3">
                          {activePanelPage.points.map(({ title, copy, icon: PointIcon }) => (
                            <div
                              key={title}
                              className={`flex gap-3 rounded-[1.3rem] px-3.5 py-3.5 ${
                                activeSection === "ai" ? "bg-white/[0.055]" : "bg-white/45"
                              }`}
                            >
                              <div
                                className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full shadow-sm ${activeDetails.pointIconClass}`}
                              >
                                <PointIcon className="h-3.5 w-3.5" />
                              </div>
                              <div className="min-w-0">
                                <div className={`text-[13px] font-black ${activeDetails.pointTitleClass}`}>{title}</div>
                                <div className={`mt-1 text-[12px] font-medium leading-[1.5] ${activeDetails.pointCopyClass}`}>{copy}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : activePanelPage.variant === "flow" ? (
                      <div
                        className={`mt-6 grid gap-2.5 ${
                          activePanelPage.points.length >= 5
                            ? "sm:grid-cols-2 md:grid-cols-5"
                            : "sm:grid-cols-2 md:grid-cols-4"
                        }`}
                      >
                        {activePanelPage.points.map(({ title, copy, icon: PointIcon }, index) => (
                          <div
                            key={title}
                            className={`relative rounded-[1.35rem] border px-3 py-3.5 text-center ${
                              activeSection === "ai"
                                ? "border-white/10 bg-white/[0.055]"
                                : "border-white/60 bg-white/42"
                            }`}
                          >
                            <div
                              className={`mx-auto flex h-9 w-9 items-center justify-center rounded-full shadow-sm ${activeDetails.pointIconClass}`}
                            >
                              <PointIcon className="h-4 w-4" />
                            </div>
                            <div className={`mt-2 text-[11.5px] font-black ${activeDetails.pointTitleClass}`}>{title}</div>
                            <div className={`mt-1 text-[10.5px] font-medium leading-[1.4] ${activeDetails.pointCopyClass}`}>{copy}</div>
                            {index < activePanelPage.points.length - 1 && (
                              <ArrowRight
                                aria-hidden="true"
                                className={`absolute -right-[9px] top-1/2 hidden h-4 w-4 -translate-y-1/2 md:block ${
                                  activeSection === "ai" ? "text-[#E3BC66]/55" : "text-[#A45C55]/45"
                                }`}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    ) : activePanelPage.variant === "principles" ? (
                      <div className="mt-6 grid gap-3 sm:grid-cols-3">
                        {activePanelPage.points.map(({ title, copy, icon: PointIcon }, index) => (
                          <div
                            key={title}
                            className={`relative overflow-hidden rounded-[1.45rem] border px-4 py-4 ${
                              activeSection === "ai"
                                ? "border-white/10 bg-white/[0.05]"
                                : "border-white/65 bg-white/44"
                            }`}
                          >
                            <div
                              className={`absolute inset-x-0 top-0 h-[3px] ${
                                activeSection === "ai"
                                  ? "bg-[#E3BC66]/70"
                                  : activeSection === "timed"
                                  ? "bg-[#C99538]/62"
                                  : "bg-[#A8343D]/58"
                              }`}
                            />
                            <div className="flex items-center justify-between gap-3">
                              <div
                                className={`flex h-9 w-9 items-center justify-center rounded-full shadow-sm ${activeDetails.pointIconClass}`}
                              >
                                <PointIcon className="h-4 w-4" />
                              </div>
                              <div className={`text-[9px] font-black tracking-[0.16em] ${activeDetails.eyebrowClass}`}>
                                0{index + 1}
                              </div>
                            </div>
                            <div className={`mt-4 text-[13px] font-black leading-[1.25] ${activeDetails.pointTitleClass}`}>{title}</div>
                            <div className={`mt-2 text-[11.5px] font-medium leading-[1.5] ${activeDetails.pointCopyClass}`}>{copy}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="mt-6 grid gap-3.5">
                        {activePanelPage.points.map(({ title, copy, icon: PointIcon }) => (
                          <div
                            key={title}
                            className={`flex gap-3.5 rounded-[1.35rem] px-3.5 py-3 ${
                              activeSection === "ai" ? "bg-white/[0.055]" : "bg-white/45"
                            }`}
                          >
                            <div
                              className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full shadow-sm ${activeDetails.pointIconClass}`}
                            >
                              <PointIcon className="h-3.5 w-3.5" />
                            </div>

                            <div className="min-w-0">
                              <div className={`text-[13.5px] font-black ${activeDetails.pointTitleClass}`}>
                                {title}
                              </div>
                              <div className={`mt-1 text-[12.5px] font-medium leading-[1.55] ${activeDetails.pointCopyClass}`}>
                                {copy}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Pagination stays visually centered, independent of the page counter. */}
                <div className="mt-5 grid shrink-0 grid-cols-[1fr_auto_1fr] items-center border-t border-current/10 pt-4">
                  <div className={`justify-self-start text-[10px] font-black uppercase tracking-[0.14em] ${activeDetails.pointCopyClass}`}>
                    {String(panelPage + 1).padStart(2, "0")} / {String(panelPages.length).padStart(2, "0")}
                  </div>

                  <div className="flex items-center justify-center gap-2">
                    {panelPage > 0 && (
                      <button
                        type="button"
                        onClick={goToPreviousPanelPage}
                        aria-label="Previous description"
                        className={`group flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-200 hover:-translate-x-0.5 ${
                          activeSection === "ai"
                            ? "border-white/15 bg-white/10 text-white"
                            : "border-[#DCCFC8] bg-white/75 text-[#5A4944]"
                        }`}
                      >
                        <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
                      </button>
                    )}

                    {panelPage < panelPages.length - 1 && (
                      <button
                        type="button"
                        onClick={goToNextPanelPage}
                        aria-label="Next product detail"
                        className={`group flex h-11 w-11 items-center justify-center rounded-full shadow-[0_10px_24px_rgba(74,40,37,0.14)] transition-all duration-200 hover:translate-x-0.5 hover:shadow-[0_12px_28px_rgba(74,40,37,0.18)] ${
                          activeSection === "ai"
                            ? "bg-[#E3BC66] text-[#2A2322]"
                            : "bg-[#8A2128] text-white"
                        }`}
                      >
                        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </button>
                    )}
                  </div>

                  <div aria-hidden="true" />
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>


    </div>
  );
}
