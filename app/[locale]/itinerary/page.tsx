import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import ItineraryPageClient from "@/components/ItineraryPageClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "itinerary" });
  return { title: `${t("hero_title")} | Treasure Egypt` };
}

export default async function ItineraryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ItineraryPageClient locale={locale} />;
}
