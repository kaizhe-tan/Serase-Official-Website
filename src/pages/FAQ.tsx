import React, { useState } from 'react';
import { Search, ChevronDown, MessageCircleQuestion, Mail } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useDocumentTitle } from '../hooks/usePageMeta';

const faqData = [
  { category: "ID Verification", question: "How does the Dual Verification process work?", answer: "We require both a valid government-issued ID (like a Passport or IC) and a live facial recognition scan. This ensures that every member on Serasé is exactly who they say they are, completely eliminating fake accounts." },
  { category: "ID Verification", question: "What happens if my verification fails?", answer: "If your verification fails, please ensure you are in a well-lit area and that your ID is clear and readable. If you continue to experience issues, you can contact our support team at CS@seraseapp.com for manual review." },
  { category: "App Features", question: "How does the 'Timed Connections' feature work?", answer: "Once you match with someone, a 24-hour countdown starts. If a conversation isn't started or a message is left unread/unreplied after the timer ends, the match will expire. This encourages intentional and active communication." },
  { category: "App Features", question: "Can I change my location to meet people in other cities?", answer: "Yes, users subscribed to our Serasé Signature plan have access to the Global Passport feature, allowing you to change your location and connect with verified members worldwide." },
  { category: "Omar AI Coach", question: "What's the difference between the AI Copilot and Omar the Dating Coach?", answer: "The AI Copilot is available to help you craft the perfect icebreaker using natural language prompts. Omar, our dedicated Dating Coach, is an exclusive feature for Signature members. Omar goes beyond icebreakers to generate full timeline-based date itineraries based on mutual interests and locations." },
  { category: "Safety & Privacy", question: "How do I use the SOS / Emergency Contact feature during a date?", answer: "Safety is our top priority. If you ever feel unsafe during a date, you can trigger the SOS button inside the app. This will silently send your live location and details to your pre-saved Emergency Contact." },
  { category: "Safety & Privacy", question: "How do I report or block an inappropriate user?", answer: "You can block or report any user directly from their profile or within your chat by tapping the three dots in the top right corner. Our moderation team reviews reports 24/7 to enforce our zero-tolerance policy." },
  { category: "Payments & Billing", question: "Can I pay using my mobile phone bill (Direct Carrier Billing)?", answer: "Yes! For a seamless experience, you can charge your Serasé subscription directly to your monthly mobile phone bill or prepaid balance (supported by Celcom, Digi, Maxis, U Mobile). No credit card is required." },
  { category: "Payments & Billing", question: "How do I upgrade or cancel my subscription?", answer: "You can manage your subscription directly through the App Store or Google Play settings on your device. We offer Select, Elite, and Signature tiers." },
  { category: "Payments & Billing", question: "What is your refund policy?", answer: "Generally, all purchases are final and non-refundable. However, if you experience a technical issue, please contact our support team within 48 hours for assistance." }
];

const categories = ["All Questions", "ID Verification", "App Features", "Safety & Privacy", "Omar AI Coach", "Payments & Billing"];

// 🚀 加上了 : Variants 类型注解
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "tween", ease: "easeOut", duration: 0.5 } }
};

export default function Faq() {
  useDocumentTitle("FAQ | Serasé");
  
  const [activeCategory, setActiveCategory] = useState("All Questions");
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs = faqData.filter(faq => {
    const matchesCategory = activeCategory === "All Questions" || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background selection:bg-accent/30 selection:text-primary pt-12 pb-32 relative overflow-x-hidden">
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-b from-amber-500/10 via-rose-500/5 to-transparent rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-4xl mx-auto px-6 relative z-10"
      >
        
        <motion.div variants={itemVariants} className="text-center space-y-6 mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200/60 px-4 py-1.5 rounded-full text-amber-700 text-xs font-extrabold tracking-widest uppercase shadow-sm">
            <MessageCircleQuestion className="w-3.5 h-3.5" /> Support Center
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-sm font-medium text-muted-foreground max-w-lg mx-auto">
            Everything you need to know about using Serasé. Can't find the answer? Our support team is here to help.
          </p>

          <div className="relative max-w-xl mx-auto mt-8">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for answers (e.g., 'Direct Carrier Billing')"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-4 bg-white border border-gray-200 rounded-2xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
            />
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-2.5 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all border ${
                activeCategory === cat 
                  ? 'bg-primary text-white border-primary shadow-md' 
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white/95 backdrop-blur-md border border-gray-200/80 rounded-[2.5rem] p-6 md:p-10 shadow-xl shadow-gray-200/40">
          
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 text-gray-500 font-medium text-sm">
              No results found for "{searchQuery}". Try another keyword.
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredFaqs.map((faq, index) => (
                <div key={index} className="py-4 first:pt-0 last:pb-0">
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full flex items-center justify-between text-left focus:outline-none group"
                  >
                    <span className={`text-base font-black transition-colors pr-6 ${
                      openIndex === index ? 'text-primary' : 'text-gray-900 group-hover:text-primary'
                    }`}>
                      {faq.question}
                    </span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
                      openIndex === index ? 'bg-primary/10 text-primary rotate-180' : 'bg-gray-50 text-gray-400 group-hover:bg-primary/5 group-hover:text-primary'
                    }`}>
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm text-gray-600 font-medium leading-relaxed pr-10 pt-4 pb-2">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          )}

        </motion.div>

        <motion.div variants={itemVariants} className="mt-12 bg-rose-50/80 border border-rose-100 rounded-3xl p-8 text-center flex flex-col items-center gap-4">
          <p className="text-sm font-black text-gray-900">
            Still need help? Our support team is available 24/7.
          </p>
          <a 
            href="mailto:CS@seraseapp.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold text-sm shadow-md hover:bg-primary/90 transition-all"
          >
            <Mail className="w-4 h-4" /> Email Support
          </a>
        </motion.div>

      </motion.div>
    </div>
  );
}