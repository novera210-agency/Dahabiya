import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import AboutPageClient from "@/components/AboutPageClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: `${t("hero_title")} | Treasure Egypt` };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <AboutPageClient locale={locale} />;
}
