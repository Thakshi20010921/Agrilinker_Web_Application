//  src/pages/IntroHome.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ChatBot from "../components/ChatBot";

//  assets (make sure these exist)
import leafLeft from "../assets/leaf-left.png";
import leafRight from "../assets/leaf-right.png";
import basketBadge from "../assets/basket.png";

import {
  ShoppingCart,
  Sprout,
  Truck,
  ArrowRight,
  CheckCircle,
  Target,
  Handshake,
  ShieldCheck,
  Leaf,
  PhoneCall,
  MessageCircle,
  Mail,
  Clock,
} from "lucide-react";

export default function IntroHome() {
  const navigate = useNavigate();

  // staged loading:
  // 0 = glass AGRI LINKER + basket only
  // 1 = leaves slide in
  // 2 = subtitle + button + 3 checks
  // 3 = rest of page loads
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 850);
    const t2 = setTimeout(() => setStage(2), 1500);
    const t3 = setTimeout(() => setStage(3), 2000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className="bg-white overflow-hidden font-sans selection:bg-green-200">
      <ChatBot />

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-16 pb-12 bg-[#062016] text-white overflow-hidden">
        {/* 🌿 subtle texture */}
        <div className="absolute inset-0 z-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/leaf.png')] pointer-events-none" />

        {/*  leaves appear after stage 1 */}
        {stage >= 1 && <LeafBackground />}

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center relative z-10">
          {/* ================= LEFT CONTENT ================= */}
          <div className="relative">
            {/* Glass AGRI LINKER (stage 0) */}
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={stage >= 0 ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="
                inline-flex
                px-10 py-7
                rounded-[2.2rem]
                bg-white/10 backdrop-blur-xl
                border border-white/20
                shadow-[0_30px_80px_rgba(0,0,0,0.35)]
              "
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]">
                AGRI{" "}
                <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                  LINKER
                </span>
              </h1>
            </motion.div>

            {/* subtitle (stage 2) */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={stage >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="mt-7 text-lg text-green-100/80 leading-relaxed max-w-lg"
            >
              AgriLinker bridges the gap between the soil and the shelf. Join a
              trusted ecosystem designed to empower farmers and streamline supply
              chains.
            </motion.p>

            {/*  button (stage 2) */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={stage >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.05 }}
              className="mt-9"
            >
              <button
                onClick={() => navigate("/landing")}
                className="group bg-green-500 hover:bg-green-400 text-black px-10 py-5 rounded-2xl text-lg font-bold transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(34,197,94,0.3)]"
              >
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            {/*  checks (stage 2) */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={stage >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
              className="mt-10 flex flex-wrap items-center gap-6 text-sm text-green-200/60"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" /> Secure Payments
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" /> Verified Farmers
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" /> Direct Sourcing
              </div>
            </motion.div>
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="relative flex items-center justify-center min-h-[320px] lg:min-h-[520px]">
            <motion.img
              src={basketBadge}
              alt="Basket"
              className="
                w-[280px] h-[280px]
                md:w-[360px] md:h-[360px]
                lg:w-[600px] lg:h-[600px]
                drop-shadow-[0_25px_55px_rgba(0,0,0,0.55)]
                select-none
              "
              animate={{ rotate: 360 }}
              transition={{ duration: 12, ease: "linear", repeat: Infinity }}
            />
          </div>
        </div>

        {/* MOVING TAPE appears with stage 2 */}
        <motion.div
          className="mt-16 relative z-10"
          initial={{ opacity: 0, y: 10 }}
          animate={stage >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.55, delay: 0.15 }}
        >
          <MovingTape />
        </motion.div>
      </section>

      {/* REST OF PAGE (stage 3) */}
      {stage >= 3 && (
        <>
          {/* ================= ROLES SECTION ================= */}
          <section className="relative bg-white py-32 overflow-hidden">
            <FloatingEmojiVeggies variant="roles" />
            <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="text-center max-w-3xl mx-auto mb-24">
                <h2 className="text-indigo-950 text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                  One Platform, Every Role
                </h2>
                <p className="text-gray-500 text-xl">
                  Tailored experiences for the heartbeat of the agricultural
                  industry.
                </p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                <FeatureCard
                  icon={<ShoppingCart className="w-8 h-8 text-green-600" />}
                  title="Buyers"
                  description="Access farm-to-table freshness. Real-time pricing, transparent logistics, and buyer protection."
                  color="bg-emerald-50"
                />
                <FeatureCard
                  icon={<Sprout className="w-8 h-8 text-green-600" />}
                  title="Farmers"
                  description="Digitize your harvest. Manage inventory, reach global markets, and get paid instantly."
                  color="bg-green-50"
                  highlighted={true}
                />
                <FeatureCard
                  icon={<Truck className="w-8 h-8 text-green-600" />}
                  title="Suppliers"
                  description="The supply chain for the modern grower. Scale your fertilizer and seed distribution."
                  color="bg-teal-50"
                />
              </div>
            </div>
          </section>

          {/* ================= HOW IT WORKS ================= */}
          <section className="relative bg-gray-50/50 py-28 border-y border-gray-100 overflow-hidden">
            <FloatingEmojiVeggies variant="how" />
            <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-bold text-green-900 mb-4 tracking-tight">
                  How It Works
                </h2>
                <div className="h-1.5 w-20 bg-green-500 mx-auto rounded-full"></div>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                <WorkCard
                  icon={<Sprout className="w-10 h-10 text-green-600" />}
                  title="For Farmers"
                  steps={[
                    "Register as a farmer on AgriLinker",
                    "List your products with images and details",
                    "Receive orders from buyers directly",
                    "Fulfill orders and get paid",
                  ]}
                />
                <WorkCard
                  icon={<ShoppingCart className="w-10 h-10 text-green-600" />}
                  title="For Buyers"
                  steps={[
                    "Browse fresh products from local farmers",
                    "Add products to cart and place order",
                    "Make secure payment via platform",
                    "Receive fresh products at your doorstep",
                  ]}
                />
                <WorkCard
                  icon={<Truck className="w-10 h-10 text-green-600" />}
                  title="For Suppliers"
                  steps={[
                    "Register as a certified agri-supplier",
                    "List fertilizers and farming equipment",
                    "Supply farmers and bulk buyers",
                    "Track inventory and manage sales",
                  ]}
                />
              </div>
            </div>
          </section>

          {/* ================= OUR MISSION ================= */}
          <MissionSection />

          {/* ================= FINAL CTA ================= */}
          <section className="px-6 py-20 pb-16">
            <div className="max-w-7xl mx-auto bg-green-600 rounded-[3rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl">
              <div className="relative z-10">
                <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                  Start Growing with <br className="hidden md:block" /> AgriLinker
                  Today
                </h2>
                <button
                  onClick={() => navigate("/landing")}
                  className="bg-white hover:bg-gray-100 text-green-700 px-12 py-5 rounded-2xl text-xl font-bold transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center gap-3 mx-auto"
                >
                  Create Your Account <ArrowRight />
                </button>
              </div>

              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-green-500 rounded-full opacity-50 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-green-700 rounded-full opacity-50 blur-3xl"></div>
            </div>
          </section>

          {/* ================= CONTACT FOOTER STRIP (NEW) ================= */}
          <ContactFooterStrip />
        </>
      )}
    </div>
  );
}

/* Leaves appear AFTER stage 1 */
function LeafBackground() {
  return (
    <div className="absolute inset-0 z-[2] pointer-events-none">
      <motion.img
        src={leafLeft}
        alt=""
        className="absolute left-0 top-[38%] -translate-y-1/2 w-[230px] md:w-[340px] opacity-90 drop-shadow-[0_30px_60px_rgba(0,0,0,0.35)]"
        initial={{ x: "-120%", rotate: -12, opacity: 0 }}
        animate={{ x: "0%", rotate: -2, opacity: 1 }}
        transition={{ duration: 1.05, ease: "easeOut" }}
      />
      <motion.img
        src={leafRight}
        alt=""
        className="absolute right-0 top-[38%] -translate-y-1/2 w-[220px] md:w-[330px] opacity-90 drop-shadow-[0_30px_60px_rgba(0,0,0,0.35)]"
        initial={{ x: "120%", rotate: 12, opacity: 0 }}
        animate={{ x: "0%", rotate: 2, opacity: 1 }}
        transition={{ duration: 1.05, ease: "easeOut" }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/20" />
    </div>
  );
}

/* ================= MOVING TAPE (MARQUEE) ================= */
function MovingTape() {
  const items = [
    { label: "Organic Vegetables", icon: "🥬" },
    { label: "Fresh Fruits", icon: "🍍" },
    { label: "Farm-to-Table", icon: "🧺" },
    { label: "Natural Products", icon: "🌿" },
    { label: "Daily Harvest", icon: "🌾" },
    { label: "Pesticide-Free", icon: "✅" },
    { label: "Local Farmers", icon: "👨‍🌾" },
    { label: "Healthy Choice", icon: "💚" },
  ];

  const Row = ({ ariaHidden = false }) => (
    <div
      aria-hidden={ariaHidden}
      className="flex items-center gap-10 pr-10"
      style={{ flex: "0 0 auto" }}
    >
      {items.map((it, idx) => (
        <div key={idx} className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-lg shadow-md">
            {it.icon}
          </div>
          <span className="text-white font-extrabold tracking-wide whitespace-nowrap">
            {it.label}
          </span>
          <span className="text-white/60 font-black">—</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="relative bg-[#0b7f7a] py-6 overflow-hidden">
      <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-[#0b7f7a] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-[#0b7f7a] to-transparent z-10" />

      <div className="flex">
        <div className="marquee-track flex">
          <Row />
          <Row ariaHidden />
        </div>
      </div>

      <style>{`
        .marquee-track{
          width: max-content;
          animation: marquee 22s linear infinite;
        }
        @keyframes marquee{
          0%{ transform: translateX(0); }
          100%{ transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce){
          .marquee-track{ animation: none; }
        }
      `}</style>
    </div>
  );
}

/* ================= FLOATING EMOJIS ================= */
function FloatingEmojiVeggies({ variant = "roles" }) {
  const float = (delay = 0, duration = 8) => ({
    animate: {
      y: [0, -20, 0],
      rotate: [0, 8, -8, 0],
      opacity: [0.5, 0.9, 0.6],
    },
    transition: { duration, repeat: Infinity, delay, ease: "easeInOut" },
  });

  const Emoji = ({ children, className, size = "text-4xl", anim }) => (
    <motion.div
      aria-hidden
      className={`absolute select-none pointer-events-none ${className}`}
      {...anim}
    >
      <span className={`${size} drop-shadow-[0_20px_35px_rgba(0,0,0,0.15)]`}>
        {children}
      </span>
    </motion.div>
  );

  if (variant === "how") {
    return (
      <>
        <Emoji className="left-6 top-12" size="text-5xl" anim={float(0, 8)}>
          🍅
        </Emoji>
        <Emoji className="right-10 top-20" size="text-4xl" anim={float(0.6, 9)}>
          🥕
        </Emoji>
        <Emoji className="left-14 bottom-24" size="text-5xl" anim={float(1.2, 10)}>
          🥦
        </Emoji>
        <Emoji className="right-16 bottom-20" size="text-4xl" anim={float(0.8, 7)}>
          🌽
        </Emoji>
        <Emoji
          className="left-1/2 top-10 -translate-x-1/2"
          size="text-3xl"
          anim={float(1.5, 11)}
        >
          🍆
        </Emoji>
        <Emoji className="left-1/3 bottom-10" size="text-3xl" anim={float(0.4, 9)}>
          🍊
        </Emoji>
        <Emoji className="right-1/3 bottom-8" size="text-3xl" anim={float(1.8, 10)}>
          🍇
        </Emoji>
      </>
    );
  }

  return (
    <>
      <Emoji className="left-6 top-16" size="text-5xl" anim={float(0, 8)}>
        🍅
      </Emoji>
      <Emoji className="right-10 top-24" size="text-4xl" anim={float(0.5, 9)}>
        🥕
      </Emoji>
      <Emoji className="left-10 bottom-28" size="text-5xl" anim={float(1.1, 10)}>
        🥦
      </Emoji>
      <Emoji className="right-14 bottom-24" size="text-4xl" anim={float(0.7, 7)}>
        🌶️
      </Emoji>
      <Emoji
        className="left-1/2 top-6 -translate-x-1/2"
        size="text-3xl"
        anim={float(1.6, 11)}
      >
        🍆
      </Emoji>

      <Emoji className="left-1/4 bottom-10" size="text-3xl" anim={float(0.3, 9)}>
        🍎
      </Emoji>
      <Emoji className="right-1/4 bottom-12" size="text-3xl" anim={float(1.4, 10)}>
        🍋
      </Emoji>
      <Emoji className="left-1/3 top-32" size="text-3xl" anim={float(0.9, 8)}>
        🥒
      </Emoji>
      <Emoji className="right-1/3 top-36" size="text-3xl" anim={float(1.9, 9)}>
        🫑
      </Emoji>
      <Emoji className="left-2/3 bottom-6" size="text-3xl" anim={float(0.6, 10)}>
        🍉
      </Emoji>
      <Emoji className="right-2/3 top-10" size="text-3xl" anim={float(1.2, 11)}>
        🥬
      </Emoji>
    </>
  );
}

/* ================= OUR MISSION SECTION ================= */
function MissionSection() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };

  const item = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="relative py-28">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?q=80&w=2000')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/55 to-black/70" />
      </div>

      <motion.div
        aria-hidden
        className="absolute left-10 top-16 text-white/25"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Leaf className="w-10 h-10" />
      </motion.div>

      <motion.div
        aria-hidden
        className="absolute right-10 bottom-16 text-white/20"
        animate={{ y: [0, 14, 0] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Leaf className="w-12 h-12" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7 }}
          className="flex justify-center"
        >
          <div className="inline-flex items-center justify-center px-8 py-5 rounded-[1.75rem] bg-green-500/90 text-[#062016] shadow-2xl">
            <div className="text-center">
              <p className="text-sm font-semibold tracking-wide opacity-80">
                Our Mission
              </p>
              <h3 className="text-3xl md:text-5xl font-extrabold leading-tight">
                Why AgriLinker Exists
              </h3>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          className="mt-14 grid lg:grid-cols-3 gap-8"
        >
          <MissionCard
            variants={item}
            icon={<Target className="w-6 h-6 text-white" />}
            title="Empower Farmers"
            description="Connect farmers directly with buyers, remove middlemen, and ensure fair, transparent pricing."
          />
          <MissionCard
            variants={item}
            icon={<Handshake className="w-6 h-6 text-white" />}
            title="Strengthen Supply Chains"
            description="Support fertilizer & input distribution with verified suppliers and reliable delivery tracking."
          />
          <MissionCard
            variants={item}
            icon={<ShieldCheck className="w-6 h-6 text-white" />}
            title="Build Trust for Buyers"
            description="Give customers a safe digital marketplace to purchase fresh agricultural products directly from farmers."
          />
        </motion.div>
      </div>
    </section>
  );
}

function MissionCard({ icon, title, description, variants }) {
  return (
    <motion.div
      variants={variants}
      whileHover={{ y: -10, rotate: -0.3 }}
      className="rounded-[2rem] bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_25px_70px_rgba(0,0,0,0.35)] p-8 md:p-10 relative overflow-hidden text-white"
    >
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-green-400/20 rounded-full blur-2xl" />

      <div className="flex items-center justify-between gap-4">
        <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shadow-sm">
          {icon}
        </div>
        <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
          <ArrowRight className="w-5 h-5 text-white/70" />
        </div>
      </div>

      <h4 className="mt-6 text-xl md:text-2xl font-extrabold text-white">
        {title}
      </h4>
      <p className="mt-3 text-white/85 leading-relaxed text-base md:text-lg">
        {description}
      </p>
    </motion.div>
  );
}

function FeatureCard({ icon, title, description, color, highlighted = false }) {
  return (
    <div
      className={`p-10 rounded-[2.5rem] transition-all duration-300 border ${highlighted
        ? "border-green-200 shadow-xl ring-4 ring-green-50"
        : "border-gray-100 hover:border-green-200 hover:shadow-lg"
        } ${color}`}
    >
      <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm mb-8">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-4 text-gray-900">{title}</h3>
      <p className="text-gray-600 leading-relaxed text-lg">{description}</p>
    </div>
  );
}

function WorkCard({ icon, title, steps }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-green-50 flex flex-col items-center text-center"
    >
      <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-8">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-green-800 mb-8">{title}</h3>
      <ul className="space-y-5 text-left w-full">
        {steps.map((step, index) => (
          <li key={index} className="flex items-start gap-4 group">
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-green-100 text-green-700 text-xs font-bold flex items-center justify-center group-hover:bg-green-500 group-hover:text-white transition-colors">
              {index + 1}
            </span>
            <p className="text-gray-600 text-base leading-snug pt-0.5">{step}</p>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

/* ================= CONTACT FOOTER STRIP (NEW) ================= */
function ContactFooterStrip() {
  const contacts = [
    {
      title: "Hotline",
      value: "+94 11 245 8899",
      icon: <PhoneCall className="w-6 h-6" />,
      href: "tel:+94112458899",
      badge: "Call us",
    },
    {
      title: "WhatsApp",
      value: "+94 77 222 3723",
      icon: <MessageCircle className="w-6 h-6" />,
      href: "https://wa.me/94772223723",
      badge: "Chat now",
    },
    {
      title: "Email",
      value: "support@agrilinker.lk",
      icon: <Mail className="w-6 h-6" />,
      href: "mailto:support@agrilinker.lk",
      badge: "Send mail",
    },
    {
      title: "Business Hours",
      value: "Mon - Sat, 8:00 AM to 6:00 PM",
      icon: <Clock className="w-6 h-6" />,
      href: null,
      badge: "Open hours",
    },
  ];

  return (
    <section className="relative px-6 pb-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[2.8rem] border border-gray-100 bg-white shadow-[0_25px_70px_rgba(0,0,0,0.06)]"
        >
          {/* soft blobs */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-green-200/40 rounded-full blur-3xl" />
          <div className="absolute -bottom-28 -left-28 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl" />

          <div className="relative z-10 p-10 md:p-14">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                  Need Help? Contact AgriLinker
                </h3>
                <p className="mt-2 text-gray-500 text-lg">
                  We’re happy to support you with orders, payments, and account
                  issues.
                </p>
              </div>

              <div className="inline-flex items-center gap-2 rounded-2xl bg-green-50 px-5 py-3 text-green-800 font-bold">
                <Clock className="w-5 h-5" />
                Mon - Sat • 8:00 AM - 6:00 PM
              </div>
            </div>

            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {contacts.map((c, idx) => {
                const CardInner = (
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.55, delay: idx * 0.06 }}
                    whileHover={{ y: -8 }}
                    className="group rounded-[2.2rem] border border-gray-100 bg-white p-7 shadow-[0_18px_45px_rgba(0,0,0,0.05)] transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-700 flex items-center justify-center">
                        {c.icon}
                      </div>

                      <span className="text-xs font-extrabold tracking-wide text-green-700 bg-green-50 px-3 py-1.5 rounded-full">
                        {c.badge}
                      </span>
                    </div>

                    <h4 className="mt-5 text-lg font-extrabold text-gray-900">
                      {c.title}
                    </h4>

                    <p className="mt-2 text-gray-600 font-semibold leading-snug break-words">
                      {c.value}
                    </p>

                    {c.href ? (
                      <div className="mt-5 inline-flex items-center gap-2 text-green-700 font-bold">
                        Contact{" "}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    ) : (
                      <div className="mt-5 text-gray-400 font-bold">Available</div>
                    )}
                  </motion.div>
                );

                return c.href ? (
                  <a
                    key={c.title}
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noreferrer" : undefined}
                    className="block"
                  >
                    {CardInner}
                  </a>
                ) : (
                  <div key={c.title}>{CardInner}</div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
