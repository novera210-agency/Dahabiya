import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Mail, Phone, MessageCircle } from "lucide-react";
import InquiryForm from "@/components/InquiryForm";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: `${t("hero_title")} | Treasure Egypt` };
}

function PageHero() {
  const t = useTranslations("contact");
  return (
    <section className="relative pt-32 pb-20 px-4 bg-gradient-to-br from-[#1B2785] to-[#111a60] overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='40' viewBox='0 0 80 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 20 Q20 0 40 20 Q60 40 80 20' stroke='%23F5A623' strokeWidth='1.5' fill='none'/%3E%3C/svg%3E")`,
        backgroundSize: "80px 40px",
      }} />
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">{t("hero_title")}</h1>
        <p className="text-white/60 text-xl">{t("hero_subtitle")}</p>
      </div>
    </section>
  );
}

function ContactInfo() {
  const t = useTranslations("contact.info");
  return (
    <div className="bg-[#1B2785] rounded-2xl p-8 text-white">
      <h3 className="font-bold text-xl mb-6">{t("title")}</h3>
      <ul className="space-y-4">
        <li className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#F5A623]/20 flex items-center justify-center shrink-0">
            <Mail size={16} className="text-[#F5A623]" />
          </div>
          <div>
            <div className="text-white/50 text-xs mb-0.5">{t("email_label")}</div>
            <div className="text-sm font-medium">info@treasureegypttours.com</div>
          </div>
        </li>
        <li className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#F5A623]/20 flex items-center justify-center shrink-0">
            <Phone size={16} className="text-[#F5A623]" />
          </div>
          <div>
            <div className="text-white/50 text-xs mb-0.5">{t("phone_label")}</div>
            <div className="text-sm font-medium">+20 100 258 8564</div>
            <div className="text-sm font-medium">+20 100 153 8358</div>
          </div>
        </li>
        <li className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#F5A623]/20 flex items-center justify-center shrink-0">
            <MessageCircle size={16} className="text-[#F5A623]" />
          </div>
          <div>
            <div className="text-white/50 text-xs mb-0.5">{t("whatsapp_label")}</div>
            <div className="text-sm font-medium">+20 100 258 8564</div>
            <div className="text-sm font-medium">+20 100 153 8358</div>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default async function ContactPage() {
  return (
    <>
      <PageHero />
      <section className="py-20 px-4 bg-[#FDFAF5]">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <InquiryForm />
            </div>
            <div>
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
