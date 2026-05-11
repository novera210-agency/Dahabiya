"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  dates: z.string().min(3),
  guests: z.string().min(1),
  message: z.string().min(10),
});

type FormData = z.infer<typeof schema>;

export default function InquiryForm() {
  const t = useTranslations("contact.form");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  const inputClass = (hasError: boolean) =>
    `w-full px-4 py-3 rounded-xl border text-sm transition-all outline-none focus:ring-2 focus:ring-[#1B2785]/30 ${
      hasError
        ? "border-red-300 bg-red-50"
        : "border-gray-200 bg-white focus:border-[#1B2785]"
    }`;

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 gap-4">
        <CheckCircle size={56} className="text-green-500" />
        <p className="text-[#1B2785] font-semibold text-xl">{t("success")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-[#1B2785] mb-1.5">{t("name")}</label>
          <input {...register("name")} className={inputClass(!!errors.name)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1B2785] mb-1.5">{t("email")}</label>
          <input {...register("email")} type="email" className={inputClass(!!errors.email)} />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#1B2785] mb-1.5">{t("phone")}</label>
        <input {...register("phone")} className={inputClass(!!errors.phone)} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-[#1B2785] mb-1.5">{t("dates")}</label>
          <input {...register("dates")} type="text" placeholder="e.g. Oct 2025" className={inputClass(!!errors.dates)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1B2785] mb-1.5">{t("guests")}</label>
          <select {...register("guests")} className={inputClass(!!errors.guests)}>
            <option value="">—</option>
            {["1-2", "3-4", "5-6", "7-8", "9+"].map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#1B2785] mb-1.5">{t("message")}</label>
        <textarea {...register("message")} rows={5} className={inputClass(!!errors.message)} />
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-100 rounded-xl px-4 py-3">
          <AlertCircle size={16} />
          {t("error")}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-[#F5A623] hover:bg-[#e09410] disabled:opacity-60 text-white font-semibold px-8 py-3.5 rounded-full transition-all flex items-center justify-center gap-2 text-base"
      >
        <Send size={16} />
        {status === "sending" ? t("sending") : t("submit")}
      </button>
    </form>
  );
}
