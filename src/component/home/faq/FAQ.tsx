"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "What is Local Guide?",
    answer: "Local Guide is a platform that connects travelers with passionate local guides who offer personalized, authentic, and immersive tour experiences in their cities.",
  },
  {
    id: 2,
    question: "How do I book a tour with a guide?",
    answer: "Simply browse through our available guides or explore specific tours, select your preferred guide, choose your date and time, and click 'Book Now'. Follow the checkout instructions to finalize your booking.",
  },
  {
    id: 3,
    question: "Can I cancel or reschedule my booking?",
    answer: "Yes, you can cancel or reschedule bookings up to 24 hours prior to the scheduled tour start time directly from your dashboard under 'My Bookings'. Cancellations made within 24 hours may not be eligible for a refund.",
  },
  {
    id: 4,
    question: "Is payment secure on this website?",
    answer: "Absolutely. We use industry-standard SSL encryption and trusted payment gateways to ensure all your transactions are 100% secure. Your sensitive payment details are never stored on our servers.",
  },
  {
    id: 5,
    question: "How do I contact my guide after booking?",
    answer: "Once your booking is confirmed, your guide's contact information (including phone number and email) will become visible in your dashboard under the booking details. You can also message them directly.",
  },
  {
    id: 6,
    question: "Can I register to become a guide?",
    answer: "Yes! We welcome local experts to join our community. Sign up for an account, visit your dashboard/profile page, click on 'Register as Guide', and complete the guide onboarding application.",
  },
];

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-20 bg-background/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Support Center</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-base max-w-2xl mx-auto">
            Got questions? We have answers. Find quick answers to the most common queries about booking, cancellation, and guide registration.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqData.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`border rounded-xl transition-all duration-300 ${isOpen
                    ? "border-primary bg-card/80 shadow-md"
                    : "border-border bg-card/30 hover:border-muted-foreground/30 hover:bg-card/50"
                  }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full flex items-center justify-between p-5 text-left font-medium text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg pr-4 font-semibold">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180 text-primary" : ""
                      }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-0 text-muted-foreground text-sm sm:text-base leading-relaxed border-t border-border/50 mt-1">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
