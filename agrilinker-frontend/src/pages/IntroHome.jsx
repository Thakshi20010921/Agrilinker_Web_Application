import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ShoppingCart, 
  Sprout, 
  Truck, 
  ArrowRight, 
  CheckCircle, 
  Leaf 
} from "lucide-react";

export default function IntroHome() {
  const navigate = useNavigate();

  // Animation variants
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="bg-white overflow-hidden font-sans selection:bg-green-200">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-32 pb-32 bg-[#062016] text-white">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/leaf.png')] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          
          <motion.div {...fadeIn}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Modernizing Agriculture
            </div>

            <h1 className="text-5xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight">
              Smart Digital <br />
              <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                Marketplace
              </span>
            </h1>

            <p className="mt-8 text-lg text-green-100/80 leading-relaxed max-w-lg">
              AgriLinker bridges the gap between the soil and the shelf. Join a trusted 
              ecosystem designed to empower farmers and streamline supply chains.
            </p>

            <div className="mt-10">
              <button
                onClick={() => navigate("/landing")}
                className="group bg-green-500 hover:bg-green-400 text-black px-10 py-5 rounded-2xl text-lg font-bold transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(34,197,94,0.3)]"
              >
                Get Started 
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-6 text-sm text-green-200/60">
              <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> Secure Payments</div>
              <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> Verified Farmers</div>
              <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> Direct Sourcing</div>
            </div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=1600"
                alt="Agriculture marketplace"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Background Glow Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-green-500/20 blur-[120px] rounded-full -z-10"></div>
          </motion.div>
        </div>
      </section>

      {/* ================= ROLES SECTION ================= */}
      <section className="bg-white py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="text-indigo-950 text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              One Platform, Every Role
            </h2>
            <p className="text-gray-500 text-xl">
              Tailored experiences for the heartbeat of the agricultural industry.
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
      <section className="bg-gray-50/50 py-28 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-green-900 mb-4 tracking-tight">How It Works</h2>
            <div className="h-1.5 w-20 bg-green-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Farmers Card */}
            <WorkCard 
              icon={<Sprout className="w-10 h-10 text-green-600" />}
              title="For Farmers"
              steps={[
                "Register as a farmer on AgriLinker",
                "List your products with images and details",
                "Receive orders from buyers directly",
                "Fulfill orders and get paid"
              ]}
            />

            {/* Buyers Card */}
            <WorkCard 
              icon={<ShoppingCart className="w-10 h-10 text-green-600" />}
              title="For Buyers"
              steps={[
                "Browse fresh products from local farmers",
                "Add products to cart and place order",
                "Make secure payment via platform",
                "Receive fresh products at your doorstep"
              ]}
            />

            {/* Suppliers Card */}
            <WorkCard 
              icon={<Truck className="w-10 h-10 text-green-600" />}
              title="For Suppliers"
              steps={[
                "Register as a certified agri-supplier",
                "List fertilizers and farming equipment",
                "Supply farmers and bulk buyers",
                "Track inventory and manage sales"
              ]}
            />
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="px-6 py-20 pb-32">
        <div className="max-w-7xl mx-auto bg-green-600 rounded-[3rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              Start Growing with <br className="hidden md:block" /> AgriLinker Today
            </h2>
            <button
              onClick={() => navigate("/landing")}
              className="bg-white hover:bg-gray-100 text-green-700 px-12 py-5 rounded-2xl text-xl font-bold transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center gap-3 mx-auto"
            >
              Create Your Account <ArrowRight />
            </button>
          </div>
          {/* Decorative Orbs */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-green-500 rounded-full opacity-50 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-green-700 rounded-full opacity-50 blur-3xl"></div>
        </div>
      </section>
    </div>
  );
}

// Sub-component for the "One Platform, Every Role" section
function FeatureCard({ icon, title, description, color, highlighted = false }) {
  return (
    <div className={`p-10 rounded-[2.5rem] transition-all duration-300 border ${highlighted ? 'border-green-200 shadow-xl ring-4 ring-green-50' : 'border-gray-100 hover:border-green-200 hover:shadow-lg'} ${color}`}>
      <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm mb-8">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-4 text-gray-900">{title}</h3>
      <p className="text-gray-600 leading-relaxed text-lg">
        {description}
      </p>
    </div>
  );
}

// Sub-component for the "How It Works" white cards
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