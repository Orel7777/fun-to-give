"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";

// Types
type DonationOption = "monthly" | "basket" | "oneTime";

interface FormState {
  firstName: string;
  lastName: string;
  phone?: string;
  email?: string;
  address?: string;
}

export default function ContributionPage(): React.ReactElement {
  const [selected, setSelected] = useState<DonationOption>("monthly");
  const [form, setForm] = useState<FormState>({ firstName: "", lastName: "" });
  const [isSmall, setIsSmall] = useState<boolean>(false);

  // Detect viewport for sticky CTA visibility
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onResize = () => setIsSmall(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize as EventListener);
  }, []);

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Open donation link in new tab
    window.open(
      "https://www.matara.pro/nedarimplus/online/?mosad=7014073",
      "_blank",
      "noopener,noreferrer"
    );
  };

  // Simple emoji-based animation using framer-motion (no extra deps)
  const controls = useAnimation();
  useEffect(() => {
    let mounted = true;
    const run = async () => {
      while (mounted) {
        // Closed fridge
        await controls.start({ rotate: 0, scale: 1, transition: { duration: 0.6 } });
        // Pray
        await controls.start({ rotate: -5, scale: 1.05, transition: { duration: 0.6 } });
        // Full fridge celebration
        await controls.start({ rotate: 5, scale: 1.08, transition: { duration: 0.6 } });
        await controls.start({ rotate: 0, scale: 1, transition: { duration: 0.6 } });
      }
    };
    run();
    return () => {
      mounted = false;
    };
  }, [controls]);

  const optionClasses = useMemo(
    () =>
      ({
        monthly:
          "bg-primary text-[#2a2b26] hover:brightness-110",
        basket:
          "bg-secondary text-[#2a2b26] hover:brightness-110",
        oneTime:
          "bg-accent text-[#2a2b26] hover:bg-accent-dark",
      } as const),
    []
  );

  const OptionButton = ({
    id,
    label,
    emoji,
  }: {
    id: DonationOption;
    label: string;
    emoji: string;
  }): React.ReactElement => (
    <motion.button
      type="button"
      onClick={() => setSelected(id)}
      className={`py-4 px-6 rounded-lg shadow-md transition transform hover:scale-105 hover:shadow-lg flex items-center gap-3 ${optionClasses[id]} ${
        selected === id ? "ring-2 ring-white/70" : ""
      }`}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      aria-pressed={selected === id}
    >
      <span className="text-xl" aria-hidden>
        {emoji}
      </span>
      <span className="font-semibold">{label}</span>
    </motion.button>
  );

  return (
    <main className="w-full bg-cream min-h-screen px-4 md:px-6 lg:px-10 py-10 md:py-14">
      {/* Header */}
      <section className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-extrabold text-center text-primary">
          הצטרפו אלינו – כל תרומה משנה חיים
        </h1>
        <p className="text-center mt-3 text-sm md:text-base text-gray">
          לא חובה למלא את כל הפרטים – רק שם ושם משפחה.
        </p>
      </section>

      {/* Options */}
      <section className="max-w-5xl mx-auto mt-8 md:mt-10">
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <OptionButton id="monthly" label="תרומה חודשית" emoji="♻️" />
          <OptionButton id="basket" label="סל לתרומה" emoji="🛒" />
          <OptionButton id="oneTime" label="תרומה חד פעמית" emoji="💝" />
        </div>
      </section>

      {/* Form + Animation */}
      <section className="max-w-6xl mx-auto mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Form */}
        <form onSubmit={onSubmit} className="bg-accent/10 border border-accent rounded-2xl p-6 shadow-sm backdrop-blur">
          {/* Names */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-[#2a2b26] mb-1">
                שם <span className="text-red-500">*</span>
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                value={form.firstName}
                onChange={onInputChange}
                placeholder="שם פרטי"
                className="w-full rounded-lg border border-accent bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-[#2a2b26] placeholder:text-gray"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-[#2a2b26] mb-1">
                שם משפחה <span className="text-red-500">*</span>
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                value={form.lastName}
                onChange={onInputChange}
                placeholder="שם משפחה"
                className="w-full rounded-lg border border-accent bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-[#2a2b26] placeholder:text-gray"
              />
            </div>
          </div>

          {/* Optional Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-[#2a2b26] mb-1">
                טלפון <span className="text-[#2a2b26] text-xs">(לא חובה – ניתן להשאיר ריק)</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone ?? ""}
                onChange={onInputChange}
                placeholder="050-0000000"
                className="w-full rounded-lg border border-accent bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary text-[#2a2b26] placeholder:text-gray"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#2a2b26] mb-1">
                אימייל <span className="text-[#2a2b26] text-xs">(לא חובה – ניתן להשאיר ריק)</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email ?? ""}
                onChange={onInputChange}
                placeholder="name@example.com"
                className="w-full rounded-lg border border-accent bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary text-[#2a2b26] placeholder:text-gray"
              />
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="address" className="block text-sm font-medium text-[#2a2b26] mb-1">
              כתובת <span className="text-[#2a2b26] text-xs">(לא חובה – ניתן להשאיר ריק)</span>
            </label>
            <input
              id="address"
              name="address"
              type="text"
              value={form.address ?? ""}
              onChange={onInputChange}
              placeholder="רחוב, מספר, עיר"
              className="w-full rounded-lg border border-accent bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary text-[#2a2b26] placeholder:text-gray"
            />
          </div>

          {/* Primary CTA */}
          <div className="mt-6 flex items-center gap-3">
            <a
              href="https://www.matara.pro/nedarimplus/online/?mosad=7014073"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent hover:bg-accent-dark text-white font-bold py-3 px-6 rounded-lg flex items-center gap-2"
            >
              <span className="text-lg" aria-hidden>
                ❤️
              </span>
              <span>לתמיכה עכשיו</span>
            </a>

            {/* Secondary helper text */}
            <span className="text-xs text-[#2a2b26]">פתיחה בחלון חדש</span>
          </div>
        </form>

        {/* Illustration / Animation */}
        <div className="flex items-center justify-center">
          <div className="bg-accent/10 border border-accent rounded-2xl p-6 w-full max-w-md shadow-sm">
            <div className="text-center text-sm text-[#2a2b26] mb-3">אנימציה: ילד פותח מקרר ריק, מתפלל והמקרר מתמלא</div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-accent/30 grid place-items-center bg-cream">
              {/* Emoji-based simple animation */}
              <motion.div
                initial={{ scale: 1 }}
                animate={controls}
                className="text-6xl select-none text-[#2a2b26]"
                aria-label="Fridge and food animation"
              >
                🧊➕🙏➕🧺
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Emotional Reinforcement */}
      <section className="max-w-4xl mx-auto mt-8">
        <p className="text-center text-lg mt-4 text-primary-dark">
          בזכותך, עוד משפחה תשב לשולחן מלא – תודה על הלב הגדול 💛
        </p>
      </section>

      {/* Image at bottom */}
      <section className="max-w-5xl mx-auto mt-6">
        <div className="overflow-hidden rounded-2xl shadow-md">
          {/* Replace with a real image under public/images/food-basket.jpg */}
          <Image
            src="/images/food-basket.jpg"
            alt="סל מזון של העמותה"
            width={1600}
            height={900}
            className="w-full h-auto object-cover"
            sizes="100vw"
            priority={false}
          />
        </div>
      </section>

      {/* Sticky CTA for small screens */}
      {isSmall && (
        <Link
          href="https://www.matara.pro/nedarimplus/online/?mosad=7014073"
          target="_blank"
          className="fixed bottom-4 right-4 z-50 bg-accent hover:bg-accent-dark text-white font-bold py-3 px-5 rounded-full shadow-lg flex items-center gap-2 md:hidden"
        >
          <span className="text-lg" aria-hidden>
            ❤️
          </span>
          <span>לתמיכה עכשיו</span>
        </Link>
      )}
    </main>
  );
}
