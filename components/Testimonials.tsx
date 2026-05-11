"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { TestimonialsColumn, type Testimonial } from "@/components/ui/testimonials-columns-1";

const testimonials: Testimonial[] = [
  {
    text: "Sailing the Nile on a Dahabiya was the most peaceful experience of our lives. No crowds, no rush — just the river, the stars, and ancient temples at every bend.",
    name: "Sophie Marchand",
    role: "Traveller from France",
  },
  {
    text: "The crew treated us like royalty. The food was extraordinary — fresh Egyptian cuisine served on the sun deck as we glided past Edfu Temple. Truly unforgettable.",
    name: "James Hartley",
    role: "Traveller from the UK",
  },
  {
    text: "We chose the Dahabiya over a large cruise ship and it was absolutely the right decision. Intimate, elegant, and deeply authentic. Egypt the way it should be experienced.",
    name: "Lena Vogel",
    role: "Traveller from Germany",
  },
  {
    text: "Waking up to the sound of the Nile and watching feluccas drift past from our cabin window — no five-star hotel can offer that. A memory we will carry forever.",
    name: "Carlos Reyes",
    role: "Traveller from Spain",
  },
  {
    text: "The itinerary was perfectly paced. We stopped at hidden villages the big ships never visit. The children there were so welcoming — a side of Egypt tourists rarely see.",
    name: "Aisha Thornton",
    role: "Traveller from the USA",
  },
  {
    text: "Our honeymoon exceeded every expectation. The Dahabiya crew decorated the cabin with flowers and prepared a private dinner under the stars at Kom Ombo. Simply magical.",
    name: "Elena Rossi",
    role: "Traveller from Italy",
  },
  {
    text: "The private temple visits in the early morning before other tourists arrived were worth every penny. Standing alone in Karnak as the sun rose was surreal.",
    name: "David Kowalski",
    role: "Traveller from Poland",
  },
  {
    text: "As a solo traveller, I felt completely safe and genuinely cared for. The captain shared stories about the Nile passed down through generations. This is living history.",
    name: "Nora Andersen",
    role: "Traveller from Denmark",
  },
  {
    text: "From Luxor to Aswan in seven days — each morning brought a new wonder. The slow pace of the Dahabiya lets you truly absorb the landscape. I came home transformed.",
    name: "Michael Tan",
    role: "Traveller from Australia",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export default function Testimonials() {
  const t = useTranslations("testimonials");
  return (
    <section className="py-24 px-4 bg-[#FDFAF5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center max-w-2xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-[#F5A623]/15 border border-[#F5A623]/30 rounded-full px-4 py-1.5 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" />
            <span className="text-[#F5A623] text-sm font-medium tracking-wide">{t("badge")}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1B2785] mb-4">
            {t("title")}
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] max-h-[720px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={18} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={22} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={16} />
        </div>
      </div>
    </section>
  );
}
