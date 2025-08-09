"use client";

import React, { useEffect, useMemo, useState } from "react";
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

export default function ContributionSection(): React.ReactElement {
  const [selected, setSelected] = useState<DonationOption>("monthly");
  const [form, setForm] = useState<FormState>({ firstName: "", lastName: "" });
  const [isSmall, setIsSmall] = useState<boolean>(false);

  // Detect viewport for sticky CTA visibility
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onResize = () => setIsSmall(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize, { passive: true } as EventListenerOptions);
    return () => window.removeEventListener("resize", onResize as EventListener);
  }, []);

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Simple emoji-based animation using framer-motion (no extra deps)
  const controls = useAnimation();
  useEffect(() => {
    let mounted = true;
    const run = async () => {
      while (mounted) {
        await controls.start({ rotate: 0, scale: 1, transition: { duration: 0.6 } });
        await controls.start({ rotate: -5, scale: 1.05, transition: { duration: 0.6 } });
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
        monthly: "bg-primary text-[#2a2b26] hover:brightness-110",
        basket: "bg-secondary text-[#2a2b26] hover:brightness-110",
        oneTime: "bg-accent text-[#2a2b26] hover:bg-accent-dark",
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
    <section className="w-full bg-cream px-4 md:px-6 lg:px-10 py-12 md:py-16 rounded-t-3xl">
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold text-primary">
          הצטרפו אלינו – כל תרומה משנה חיים
        </h2>
        <p className="mt-3 text-sm md:text-base text-gray">
          לא חובה למלא את כל הפרטים – רק שם ושם משפחה.
        </p>
      </div>

      {/* Options */}
      <div className="max-w-5xl mx-auto mt-8 md:mt-10">
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <OptionButton id="monthly" label="תרומה חודשית" emoji="♻️" />
          <OptionButton id="basket" label="סל לתרומה" emoji="🛒" />
          <OptionButton id="oneTime" label="תרומה חד פעמית" emoji="💝" />
        </div>
      </div>

      {/* Form + Animation */}
      <div className="max-w-6xl mx-auto mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Form */}
        <form onSubmit={(e) => e.preventDefault()} className="bg-accent/10 border border-accent rounded-2xl p-6 shadow-sm backdrop-blur">
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
            <span className="text-xs text-gray">פתיחה בחלון חדש</span>
          </div>
        </form>

        {/* Illustration / Animation */}
        <div className="flex items-center justify-center">
          <div className="bg-accent/10 border border-accent rounded-2xl p-6 w-full max-w-md shadow-sm">
            <div className="text-center text-sm text-[#2a2b26] mb-3">אנימציה: ילד פותח מקרר ריק, מתפלל והמקרר מתמלא</div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-accent/30 grid place-items-center bg-cream">
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
      </div>

      {/* Emotional Reinforcement */}
      <div className="max-w-4xl mx-auto mt-8">
        <p className="text-center text-lg mt-4 text-primary-dark">
          בזכותך, עוד משפחה תשב לשולחן מלא – תודה על הלב הגדול 💛
        </p>
      </div>

      {/* Decorative wave divider */}
      <div className="mt-10">
        <svg className="w-full h-16 text-cream" preserveAspectRatio="none" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,0V46.29c47.79,22.2,103.59,29.05,158,17C230.68,52.69,284.3,16.79,339,6.9c54.78-9.93,113,5.32,167,22.5,59.66,18.94,117.44,42.79,177,54.3,86.86,16.74,172.23,0,258.1-16.82C1010.79,54.28,1095.1,38.94,1180,41V0Z" fill="currentColor"/>
        </svg>
      </div>

      {/* Sticky CTA for small screens */}
      {isSmall && (
        <a
          href="https://www.matara.pro/nedarimplus/online/?mosad=7014073"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-4 right-4 z-50 bg-accent hover:bg-accent-dark text-white font-bold py-3 px-5 rounded-full shadow-lg flex items-center gap-2 md:hidden"
        >
          <span className="text-lg" aria-hidden>
            ❤️
          </span>
          <span>לתמיכה עכשיו</span>
        </a>
      )}
    </section>
  );
}
