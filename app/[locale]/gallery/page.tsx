import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import GalleryPageClient from "@/components/GalleryPageClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "gallery" });
  return { title: `${t("hero_title")} | Treasure Egypt` };
}

export default function GalleryPage() {
  return <GalleryPageClient />;
}
