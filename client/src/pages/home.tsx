import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle2,
  MessageSquare,
  Phone,
  Zap,
  BarChart3,
  Calendar,
  Languages,
  Timer,
  TrendingUp,
  Users,
  Shield,
  Mic,
  Settings,
  Search,
  FileCheck,
  Hash,
  Cloud,
  Share2,
  Grid,
  Video,
  CreditCard,
  X,
} from "lucide-react";
import { Link } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LogoAWS,
  LogoN8n,
  LogoTwilio,
  LogoWhatsApp,
  LogoMeta,
  LogoPinecone,
  LogoGoogle,
  LogoOpenAI,
  LogoClaude,
} from "@/components/tech-logos";
import { useState, useEffect } from "react";
// Importar assets como módulos ES para que funcionen en producción
import brightcoastLogo from "@/assets/logos/brightcoast.png";
import pinelandLogo from "@/assets/logos/pineland.png";
import designdaLogo from "@/assets/logos/designda.png";
import gmailLogo from "@/assets/logos/gmail_new.png";
import stripeLogo from "@/assets/logos/stripe_new.png";
import slackLogo from "@/assets/logos/slack_new.png";
import calendarLogo from "@/assets/logos/calendar_new.png";
import imessageLogo from "@/assets/logos/imessage_new.png";
import xLogo from "@/assets/logos/x_new.png";
import twilioLogo from "@/assets/logos/twilio_new.png";
import whatsappLogo from "@/assets/logos/whatsapp_new.png";
import googleLogo from "@/assets/logos/google_new.png";
import metaLogo from "@/assets/logos/meta_new.png";
import n8nLogo from "@/assets/logos/n8n_new.png";
import awsLogo from "@/assets/logos/aws_new.png";
import openaiLogo from "@/assets/logos/openai.png";
import claudeLogo from "@/assets/logos/claude_new.png";
import pineconeLogo from "@/assets/logos/pinecone_new.png";

export default function Home() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [tryMeOpen, setTryMeOpen] = useState(false);
  const [tryMeSubmitted, setTryMeSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phone_number: "",
    company_name: "",
    industry: "",
    how_can_ai_help: "",
    language: "",
  });

  const handleTryMeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch(
        "https://n8n.arkoswearshop.com/webhook/cf52b748-d3e4-45d0-af04-58f1126be79c",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );
    } catch (error) {
      console.error("Webhook error:", error);
    }
    setTryMeSubmitted(true);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section
        className="relative py-4 flex items-center justify-center overflow-hidden bg-slate-950 text-white"
        style={{
          background: `
            linear-gradient(135deg, rgba(0, 217, 255, 0.15) 0%, transparent 50%, rgba(0, 255, 163, 0.1) 100%),
            radial-gradient(ellipse at center, rgba(0, 200, 200, 0.1) 0%, transparent 60%),
            #020617
          `,
        }}
      >
        <div className="container mx-auto px-4 relative z-20 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-sm font-medium mb-6 backdrop-blur-md shadow-lg shadow-cyan-500/5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              AI Agents + Smart Automations
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 font-heading text-white drop-shadow-2xl">
              Build smarter systems that <br />
              <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent pb-2 filter drop-shadow-sm">
                take work off your plate
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mb-4 max-w-2xl mx-auto leading-relaxed">
              We use AI agents and smart automations to handle the repetitive,
              messy, and time consuming parts of your business so you can focus
              on what really matters.
            </p>

            <p className="text-base md:text-lg text-slate-400 mb-10 max-w-xl mx-auto italic">
              If a task can be handled automatically, we make sure it is.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
              <Link href="/agents">
                <Button
                  size="lg"
                  data-testid="button-explore-agents"
                  className="py-6 px-10 text-lg rounded-full text-white shadow-[0_10px_25px_-5px_rgba(6,182,212,0.3)] hover:scale-105 hover:shadow-[0_10px_25px_-5px_rgba(6,182,212,0.5)] transition-all border-0"
                  style={{
                    background: "linear-gradient(to right, #06b6d4, #2dd4bf)",
                  }}
                >
                  Explore Agents
                </Button>
              </Link>

              <Button
                size="lg"
                data-testid="button-try-me"
                onClick={() => setTryMeOpen(true)}
                className="py-6 px-10 text-lg rounded-full text-white shadow-[0_0_20px_rgba(20,184,166,0.35),0_0_40px_rgba(20,184,166,0.2),0_10px_25px_-5px_rgba(20,184,166,0.3)] hover:scale-105 hover:shadow-[0_0_25px_rgba(20,184,166,0.5),0_0_50px_rgba(20,184,166,0.3),0_10px_25px_-5px_rgba(20,184,166,0.5)] transition-all ring-2 ring-teal-400/30 ring-offset-2 ring-offset-transparent"
                style={{
                  background: "linear-gradient(to right, #14b8a6, #0d9488)",
                }}
              >
                Try Me
              </Button>

              <Link href="/automations">
                <Button
                  size="lg"
                  data-testid="button-automations"
                  className="py-6 px-10 text-lg rounded-full text-white shadow-[0_0_20px_rgba(6,182,212,0.35),0_0_40px_rgba(6,182,212,0.2),0_10px_25px_-5px_rgba(6,182,212,0.3)] hover:scale-105 hover:shadow-[0_0_25px_rgba(6,182,212,0.5),0_0_50px_rgba(6,182,212,0.3),0_10px_25px_-5px_rgba(6,182,212,0.5)] transition-all ring-2 ring-cyan-400/30 ring-offset-2 ring-offset-transparent"
                  style={{
                    background: "linear-gradient(to right, #06b6d4, #0d9488)",
                  }}
                >
                  Automations
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Try Me Modal */}
        <AnimatePresence>
          {tryMeOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
              onClick={() => setTryMeOpen(false)}
            >
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-lg bg-slate-900 border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden"
              >
                {/* Header */}
                <div className="bg-cyan-600/20 p-4 border-b border-cyan-500/20 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
                      <Mic className="h-4 w-4 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">
                        Talk to AI
                      </h4>
                      <span className="text-[10px] text-cyan-300/80 uppercase tracking-wider font-medium">
                        Request a Call
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setTryMeOpen(false)}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Body */}
                <div className="p-6 bg-slate-950/50">
                  {!tryMeSubmitted ? (
                    <form onSubmit={handleTryMeSubmit} className="space-y-4">
                      <p className="text-base font-medium text-white mb-4">
                        Leave your details and our AI agent will call you to
                        show what it can do.
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-slate-400 mb-1.5">
                            Name *
                          </label>
                          <input
                            required
                            type="text"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                            placeholder="John"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-400 mb-1.5">
                            Surname *
                          </label>
                          <input
                            required
                            type="text"
                            value={formData.surname}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                surname: e.target.value,
                              })
                            }
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                            placeholder="Doe"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-slate-400 mb-1.5">
                            Email *
                          </label>
                          <input
                            required
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                            placeholder="name@company.com"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-400 mb-1.5">
                            Phone Number *
                          </label>
                          <input
                            required
                            type="tel"
                            value={formData.phone_number}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                phone_number: e.target.value,
                              })
                            }
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                            placeholder="+1 (555) 000-0000"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1.5">
                          Company Name *
                        </label>
                        <input
                          required
                          type="text"
                          value={formData.company_name}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              company_name: e.target.value,
                            })
                          }
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                          placeholder="Your company"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1.5">
                          Industry *
                        </label>
                        <input
                          type="text"
                          value={formData.industry}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              industry: e.target.value,
                            })
                          }
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                          placeholder="e.g. SaaS, Healthcare, E-commerce"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1.5">
                          How can AI help you? *
                        </label>
                        <textarea
                          value={formData.how_can_ai_help}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              how_can_ai_help: e.target.value,
                            })
                          }
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors resize-none h-20"
                          placeholder="I need help automating..."
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1.5">
                          Language *
                        </label>
                        <select
                          required
                          value={formData.language}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              language: e.target.value,
                            })
                          }
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                        >
                          <option value="" disabled>
                            Select a language
                          </option>
                          <option value="English">English</option>
                          <option value="Spanish">Spanish</option>
                        </select>
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2 rounded-lg transition-colors"
                      >
                        Request a Call
                      </Button>
                    </form>
                  ) : (
                    <div className="py-8 text-center">
                      <div className="h-16 w-16 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-cyan-500/20">
                        <CheckCircle2 className="h-8 w-8 text-cyan-400" />
                      </div>
                      <h4 className="text-lg font-bold text-white mb-2">
                        Request Received!
                      </h4>
                      <p className="text-slate-400 text-sm">
                        One of our AI voice agents will contact you shortly at
                        the provided number.
                      </p>
                      <Button
                        onClick={() => {
                          setTryMeSubmitted(false);
                          setTryMeOpen(false);
                        }}
                        variant="ghost"
                        className="mt-4 text-cyan-400 hover:text-cyan-300 hover:bg-transparent text-sm"
                      >
                        Close
                      </Button>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Value Proposition */}
      <section className="py-24 bg-slate-900 border-y border-slate-800/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-[680px] mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400 drop-shadow-sm">
              Why Sourcy?
            </h2>

            <div className="space-y-8">
              <div className="space-y-3">
                <p className="text-xl font-medium text-slate-200/90 tracking-wide">
                  Your business doesn’t need more tools.
                </p>
                <p className="text-3xl md:text-4xl font-bold text-white leading-tight">
                  It needs systems that actually work without constant
                  oversight.
                </p>
              </div>

              <p className="text-lg text-slate-400 leading-loose max-w-[90%] mx-auto font-light">
                At Sourcy, we build AI agents that take real work off your
                plate. They handle conversations, follow context, and adapt to
                your operation, so your team can focus on what truly moves the
                business forward.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
            {[
              {
                icon: <Languages className="h-8 w-8" />,
                value: "Multilingual",
                label: "Any Language You Need",
                desc: "Native-level conversations for diverse markets across the U.S.",
                className: "",
                style: {
                  background:
                    "linear-gradient(to bottom right, rgba(88, 28, 135, 0.45), rgba(15, 23, 42, 0.9))",
                  border: "1px solid rgba(192, 132, 252, 0.35)",
                  boxShadow: "0 25px 50px -12px rgba(129, 140, 248, 0.15)",
                },
                cornerClass: "bg-purple-500/10",
                iconClass: "bg-purple-500/10 text-purple-400",
                textClass: "text-purple-400",
              },
              {
                icon: <Timer className="h-8 w-8" />,
                value: "< 2 min",
                label: "Response Time",
                desc: "Instant lead qualification and seamless transfer to your sales team.",
                className: "",
                style: {
                  background:
                    "linear-gradient(to bottom right, rgba(22, 78, 99, 0.45), rgba(15, 23, 42, 0.9))",
                  border: "1px solid rgba(34, 211, 238, 0.35)",
                  boxShadow: "0 25px 50px -12px rgba(34, 211, 238, 0.15)",
                },
                cornerClass: "bg-cyan-500/10",
                iconClass: "bg-cyan-500/10 text-cyan-400",
                textClass: "text-cyan-400",
              },
              {
                icon: <TrendingUp className="h-8 w-8" />,
                value: "+30%",
                label: "ROI Increase",
                desc: "Convert more leads into paying projects automatically.",
                className: "",
                style: {
                  background:
                    "linear-gradient(to bottom right, rgba(6, 78, 59, 0.45), rgba(15, 23, 42, 0.9))",
                  border: "1px solid rgba(52, 211, 153, 0.35)",
                  boxShadow: "0 25px 50px -12px rgba(52, 211, 153, 0.15)",
                },
                cornerClass: "bg-emerald-500/10",
                iconClass: "bg-emerald-500/10 text-emerald-400",
                textClass: "text-emerald-400",
              },
              {
                icon: <Zap className="h-8 w-8" />,
                value: "70%",
                label: "Efficiency Boost",
                desc: "Free up your team to focus on closing deals and building.",
                className: "",
                style: {
                  background:
                    "linear-gradient(to bottom right, rgba(30, 58, 138, 0.45), rgba(15, 23, 42, 0.9))",
                  border: "1px solid rgba(96, 165, 250, 0.35)",
                  boxShadow: "0 25px 50px -12px rgba(96, 165, 250, 0.15)",
                },
                cornerClass: "bg-blue-500/10",
                iconClass: "bg-blue-500/10 text-blue-400",
                textClass: "text-blue-400",
              },
            ].map((stat, i) => (
              <div
                key={i}
                className={`relative p-6 rounded-2xl ${stat.className} text-center hover:scale-105 hover:-translate-y-2 transition-all duration-300 group overflow-hidden`}
                style={stat.style}
              >
                <div
                  className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full -mr-6 -mt-6 transition-all group-hover:scale-150 duration-500 ${stat.cornerClass}`}
                />
                <div className="relative z-10">
                  <div
                    className={`p-4 rounded-full inline-flex mb-4 shadow-sm group-hover:scale-110 transition-transform ${stat.iconClass}`}
                  >
                    {stat.icon}
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </h3>
                  <p className={`font-bold mb-2 ${stat.textClass}`}>
                    {stat.label}
                  </p>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {stat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Trusted By Section */}
          <div
            className="w-full py-16 mb-24 rounded-3xl overflow-hidden relative shadow-[0_0_50px_-12px_rgba(6,182,212,0.25)] backdrop-blur-xl border border-cyan-500/30"
            style={{
              background:
                "linear-gradient(to bottom right, rgba(2, 6, 23, 0.8), rgba(15, 23, 42, 0.9))",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 pointer-events-none" />

            <p className="relative z-10 text-center text-xl font-bold text-slate-300 uppercase tracking-widest mb-12 drop-shadow-md">
              Trusted by leading companies
            </p>

            <div className="relative flex overflow-hidden z-10">
              <motion.div
                className="flex gap-32 items-center flex-nowrap min-w-full px-8"
                animate={{ x: [0, -1000] }}
                transition={{
                  repeat: Infinity,
                  ease: "linear",
                  duration: 25,
                }}
              >
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-32 flex-shrink-0 transition-all duration-300"
                  >
                    <img
                      src={brightcoastLogo}
                      alt="Brightcoast Insurance"
                      className="h-60 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity brightness-0 invert"
                    />
                    <img
                      src={pinelandLogo}
                      alt="Pineland Engineering"
                      className="h-48 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity brightness-0 invert"
                    />
                    <img
                      src={designdaLogo}
                      alt="Designda L"
                      className="h-56 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity brightness-0 invert"
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 drop-shadow-sm">
              The Core Pillars of Automation
            </h2>
            <p className="text-slate-400 text-lg">
              A unified system designed to remove friction from your daily
              operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Voice Pillar */}
            <motion.div
              whileHover={{ scale: 1.05, y: -8 }}
              transition={{ duration: 0.3 }}
              className="relative p-8 rounded-3xl shadow-sm overflow-hidden group"
              style={{
                background:
                  "linear-gradient(to bottom right, rgba(88, 28, 135, 0.45), rgba(15, 23, 42, 0.9))",
                border: "1px solid rgba(192, 132, 252, 0.35)",
                boxShadow: "0 25px 50px -12px rgba(129, 140, 248, 0.15)",
              }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-bl-full -mr-8 -mt-8 transition-all group-hover:scale-150 duration-500" />
              <div className="relative z-10">
                <div className="h-14 w-14 bg-purple-500/10 text-purple-400 rounded-2xl flex items-center justify-center mb-6">
                  <Phone className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">
                  Voice Automation
                </h3>
                <p className="text-slate-400 mb-6 leading-relaxed">
                  Handle calls naturally, without bottlenecks or missed
                  opportunities. <br />
                  <span className="text-slate-300">
                    Your business stays responsive, even when your team is not.
                  </span>
                </p>

                {/* Floating Elements */}
                <div className="bg-slate-900 p-4 rounded-xl shadow-md border border-slate-700 mb-3 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-xs font-bold text-slate-300">
                        Live Call
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">
                      00:42
                    </span>
                  </div>
                  <div className="flex gap-1 items-center justify-center h-8 mb-3">
                    {[0.4, 0.7, 0.3, 1, 0.6, 0.8, 0.4, 0.9, 0.3, 0.6, 0.2].map(
                      (h, i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 bg-teal-400 rounded-full"
                          animate={{ height: [h * 10, h * 24, h * 10] }}
                          transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            delay: i * 0.05,
                          }}
                        />
                      ),
                    )}
                  </div>
                  <div className="flex items-center justify-between bg-green-900/20 px-3 py-2 rounded-lg border border-green-900/30">
                    <span className="text-[10px] font-medium text-green-400">
                      Qualifying Lead...
                    </span>
                    <CheckCircle2 className="h-3 w-3 text-green-500" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Text Pillar */}
            <motion.div
              whileHover={{ scale: 1.05, y: -8 }}
              transition={{ duration: 0.3 }}
              className="relative p-8 rounded-3xl shadow-sm overflow-hidden group"
              style={{
                background:
                  "linear-gradient(to bottom right, rgba(22, 78, 99, 0.45), rgba(15, 23, 42, 0.9))",
                border: "1px solid rgba(34, 211, 238, 0.35)",
                boxShadow: "0 25px 50px -12px rgba(34, 211, 238, 0.15)",
              }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-bl-full -mr-8 -mt-8 transition-all group-hover:scale-150 duration-500" />
              <div className="relative z-10">
                <div className="h-14 w-14 bg-cyan-500/10 text-cyan-400 rounded-2xl flex items-center justify-center mb-6">
                  <MessageSquare className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">
                  Intelligent Text
                </h3>
                <p className="text-slate-400 mb-6 leading-relaxed">
                  Engage leads instantly across channels, without manual
                  follow-ups. <br />
                  <span className="text-slate-300">
                    Conversations move forward automatically, with context and
                    intent.
                  </span>
                </p>

                {/* Floating Elements */}
                <div className="space-y-3">
                  <div className="flex items-end gap-2 justify-end">
                    <div className="bg-gradient-to-br from-cyan-600 to-blue-600 text-white text-xs p-3 rounded-2xl rounded-tr-sm shadow-md max-w-[85%]">
                      Hi! Can you give me a quote for a roof repair?
                    </div>
                  </div>
                  <div className="flex items-end gap-2 justify-start">
                    <div className="h-8 w-8 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-400 border border-teal-500/20 shrink-0">
                      <Zap className="h-4 w-4" />
                    </div>
                    <div className="bg-slate-900 border border-slate-700 text-slate-300 text-xs p-3 rounded-2xl rounded-tl-sm shadow-sm max-w-[85%]">
                      <span className="text-teal-400 font-bold block mb-1 text-[10px] uppercase tracking-wide">
                        Sourcy Agent
                      </span>
                      Absolutely! I just need to ask 3 quick questions...
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Data Pillar */}
            <motion.div
              whileHover={{ scale: 1.05, y: -8 }}
              transition={{ duration: 0.3 }}
              className="relative p-8 rounded-3xl shadow-sm overflow-hidden group"
              style={{
                background:
                  "linear-gradient(to bottom right, rgba(6, 78, 59, 0.45), rgba(15, 23, 42, 0.9))",
                border: "1px solid rgba(52, 211, 153, 0.35)",
                boxShadow: "0 25px 50px -12px rgba(52, 211, 153, 0.15)",
              }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-bl-full -mr-8 -mt-8 transition-all group-hover:scale-150 duration-500" />
              <div className="relative z-10">
                <div className="h-14 w-14 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center mb-6">
                  <BarChart3 className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">
                  Data Driven
                </h3>
                <p className="text-slate-400 mb-6 leading-relaxed">
                  Turn every interaction into insight. <br />
                  <span className="text-slate-300">
                    Know what’s working, what’s not, and where to focus
                    next—without guessing.
                  </span>
                </p>

                {/* Floating Elements */}
                <div className="bg-slate-900 p-3 rounded-xl shadow-md border border-slate-700">
                  <div className="flex items-end gap-1 h-10 justify-between px-2">
                    <div className="w-2 bg-slate-700 h-4 rounded-t-sm" />
                    <div className="w-2 bg-slate-700 h-6 rounded-t-sm" />
                    <div className="w-2 bg-slate-700 h-5 rounded-t-sm" />
                    <div className="w-2 bg-teal-400 h-8 rounded-t-sm animate-pulse" />
                    <div className="w-2 bg-slate-700 h-3 rounded-t-sm" />
                  </div>
                  <div className="text-[10px] text-center text-slate-500 mt-1">
                    Leads Converted
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Agent Preview */}
      <section className="py-24 bg-slate-900 border-y border-slate-800/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Our Specialized Agents
            </h2>
            <p className="text-slate-400 text-lg mb-6">
              Browse our catalog of Voice and Text agents designed for speed.
            </p>
            <Link href="/agents">
              <Button
                variant="ghost"
                className="group text-teal-400 hover:text-teal-300 hover:bg-transparent p-0 text-lg"
              >
                View full catalog{" "}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <Tabs defaultValue="voice" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-8 mx-auto h-auto p-1 rounded-full bg-slate-800 border border-slate-700/50">
              <TabsTrigger
                value="voice"
                className="rounded-full py-3 data-[state=active]:bg-slate-700 data-[state=active]:text-white text-slate-400 hover:text-slate-200 transition-all"
              >
                <Mic className="mr-2 h-4 w-4" />
                Voice Agents
              </TabsTrigger>
              <TabsTrigger
                value="text"
                className="rounded-full py-3 data-[state=active]:bg-slate-700 data-[state=active]:text-white text-slate-400 hover:text-slate-200 transition-all"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Text Agents
              </TabsTrigger>
            </TabsList>

            <TabsContent value="voice">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    name: "Lead Qualification",
                    icon: <Users className="h-6 w-6" />,
                    desc: "Qualifies real opportunities and filters low-intent calls automatically.",
                  },
                  {
                    name: "Proposal Follow-up",
                    icon: <MessageSquare className="h-6 w-6" />,
                    desc: "Follows up automatically to revive deals and move opportunities forward.",
                  },
                  {
                    name: "Scheduling",
                    icon: <Calendar className="h-6 w-6" />,
                    desc: "Manages conversations and books meetings without manual coordination.",
                  },
                  {
                    name: "Customer Service",
                    icon: <Shield className="h-6 w-6" />,
                    desc: "Answers 24/7, resolves common requests, and escalates when needed.",
                  },
                ].map((agent, i) => {
                  const isLeadQual = agent.name === "Lead Qualification";
                  const isProposal = agent.name === "Proposal Follow-up";
                  const isScheduling = agent.name === "Scheduling";
                  const isCustomerService = agent.name === "Customer Service";

                  return (
                    <div
                      key={i}
                      className={`relative p-6 rounded-2xl border shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group flex flex-col items-center text-center overflow-hidden
                      ${
                        isLeadQual
                          ? "bg-slate-900 border-purple-500/50 shadow-purple-500/20"
                          : isProposal
                            ? "bg-slate-900 border-amber-500/50 shadow-amber-500/20"
                            : isScheduling
                              ? "bg-slate-900 border-cyan-500/50 shadow-cyan-500/20"
                              : isCustomerService
                                ? "bg-slate-900 border-emerald-500/50 shadow-emerald-500/20"
                                : "bg-slate-800 border-slate-700/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] hover:border-cyan-500/50"
                      }`}
                    >
                      {/* Geometric Background Shapes */}
                      {isLeadQual && (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-slate-900 to-slate-900" />
                          <div className="absolute -right-10 -top-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl group-hover:bg-purple-500/30 transition-colors duration-500" />
                          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl" />
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-purple-500/20 rounded-full opacity-30 group-hover:opacity-50 transition-all duration-700 scale-50 group-hover:scale-100" />
                        </>
                      )}
                      {isProposal && (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-br from-amber-900/80 via-slate-900 to-slate-900" />
                          <div className="absolute -right-10 -top-10 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl group-hover:bg-amber-500/30 transition-colors duration-500" />
                          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-orange-600/20 rounded-full blur-3xl" />
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-amber-500/20 rounded-full opacity-30 group-hover:opacity-50 transition-all duration-700 scale-50 group-hover:scale-100" />
                        </>
                      )}
                      {isScheduling && (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/80 via-slate-900 to-slate-900" />
                          <div className="absolute -right-10 -top-10 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl group-hover:bg-cyan-500/30 transition-colors duration-500" />
                          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl" />
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-cyan-500/20 rounded-full opacity-30 group-hover:opacity-50 transition-all duration-700 scale-50 group-hover:scale-100" />
                        </>
                      )}
                      {isCustomerService && (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/80 via-slate-900 to-slate-900" />
                          <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl group-hover:bg-emerald-500/30 transition-colors duration-500" />
                          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-teal-600/20 rounded-full blur-3xl" />
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-emerald-500/20 rounded-full opacity-30 group-hover:opacity-50 transition-all duration-700 scale-50 group-hover:scale-100" />
                        </>
                      )}

                      {/* Decorative Rings - Common */}
                      <div
                        className={`absolute top-5 right-5 w-16 h-16 border-2 rounded-full opacity-20 
                        ${
                          isLeadQual
                            ? "border-purple-500/30"
                            : isProposal
                              ? "border-amber-500/30"
                              : isScheduling
                                ? "border-cyan-500/30"
                                : isCustomerService
                                  ? "border-emerald-500/30"
                                  : "border-slate-500/20"
                        }`}
                      />
                      <div
                        className={`absolute bottom-8 left-8 w-8 h-8 rounded-lg rotate-12 opacity-30 
                        ${
                          isLeadQual
                            ? "bg-purple-500/20"
                            : isProposal
                              ? "bg-amber-500/20"
                              : isScheduling
                                ? "bg-cyan-500/20"
                                : isCustomerService
                                  ? "bg-emerald-500/20"
                                  : "bg-slate-500/20"
                        }`}
                      />

                      <div
                        className={`relative z-10 h-14 w-14 rounded-2xl border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm
                        ${
                          isLeadQual
                            ? "bg-gradient-to-br from-purple-500/20 to-blue-600/20 border-purple-500/30 text-purple-300"
                            : isProposal
                              ? "bg-gradient-to-br from-amber-500/20 to-orange-600/20 border-amber-500/30 text-amber-300"
                              : isScheduling
                                ? "bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border-cyan-500/30 text-cyan-300"
                                : isCustomerService
                                  ? "bg-gradient-to-br from-emerald-500/20 to-teal-600/20 border-emerald-500/30 text-emerald-300"
                                  : "bg-slate-900 border-slate-700 text-teal-400"
                        }`}
                      >
                        {agent.icon}
                      </div>
                      <h4 className="relative z-10 font-bold text-lg mb-2 text-white">
                        {agent.name}
                      </h4>
                      <p className="relative z-10 text-sm mb-4 text-slate-300">
                        {agent.desc}
                      </p>
                      <div
                        className={`relative z-10 flex items-center text-xs font-medium gap-2 border py-1.5 px-3 rounded-full w-fit shadow-sm
                        ${
                          isLeadQual
                            ? "bg-purple-500/10 border-purple-500/30 text-purple-300"
                            : isProposal
                              ? "bg-amber-500/10 border-amber-500/30 text-amber-300"
                              : isScheduling
                                ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-300"
                                : isCustomerService
                                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                                  : "bg-slate-900 border-slate-700 text-teal-400"
                        }`}
                      >
                        <CheckCircle2 className="h-3 w-3" />
                        <span>Voice • Ready in 5 to 10 business days</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="text">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    name: "Lead Qualification",
                    icon: <MessageSquare className="h-6 w-6" />,
                    desc: "Qualifies inbound leads via SMS or WhatsApp and routes high-intent prospects.",
                  },
                  {
                    name: "Invoice Generator",
                    icon: <Zap className="h-6 w-6" />,
                    desc: "Creates and delivers invoices automatically, reducing billing overhead.",
                  },
                  {
                    name: "Payment Reminders",
                    icon: <Timer className="h-6 w-6" />,
                    desc: "Sends automated reminders for overdue invoices, improving collection rates.",
                  },
                  {
                    name: "CRM Analysis",
                    icon: <BarChart3 className="h-6 w-6" />,
                    desc: "Audits and enriches your CRM data, surfacing insights and fixing gaps.",
                  },
                ].map((agent, i) => {
                  const isLeadQualText = agent.name === "Lead Qualification";
                  const isInvoice = agent.name === "Invoice Generator";
                  const isPayment = agent.name === "Payment Reminders";
                  const isCRM = agent.name === "CRM Analysis";

                  return (
                    <div
                      key={i}
                      className={`relative p-6 rounded-2xl border shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group flex flex-col items-center text-center overflow-hidden
                      ${
                        isLeadQualText
                          ? "bg-slate-900 border-purple-500/50 shadow-purple-500/20"
                          : isInvoice
                            ? "bg-slate-900 border-emerald-500/50 shadow-emerald-500/20"
                            : isPayment
                              ? "bg-slate-900 border-amber-500/50 shadow-amber-500/20"
                              : isCRM
                                ? "bg-slate-900 border-cyan-500/50 shadow-cyan-500/20"
                                : "bg-slate-800 border-slate-700/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] hover:border-cyan-500/50"
                      }`}
                    >
                      {/* Geometric Background Shapes */}
                      {isLeadQualText && (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-slate-900 to-slate-900" />
                          <div className="absolute -right-10 -top-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl group-hover:bg-purple-500/30 transition-colors duration-500" />
                          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl" />
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-purple-500/20 rounded-full opacity-30 group-hover:opacity-50 transition-all duration-700 scale-50 group-hover:scale-100" />
                        </>
                      )}
                      {isInvoice && (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/80 via-slate-900 to-slate-900" />
                          <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl group-hover:bg-emerald-500/30 transition-colors duration-500" />
                          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-teal-600/20 rounded-full blur-3xl" />
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-emerald-500/20 rounded-full opacity-30 group-hover:opacity-50 transition-all duration-700 scale-50 group-hover:scale-100" />
                        </>
                      )}
                      {isPayment && (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-br from-amber-900/80 via-slate-900 to-slate-900" />
                          <div className="absolute -right-10 -top-10 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl group-hover:bg-amber-500/30 transition-colors duration-500" />
                          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-orange-600/20 rounded-full blur-3xl" />
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-amber-500/20 rounded-full opacity-30 group-hover:opacity-50 transition-all duration-700 scale-50 group-hover:scale-100" />
                        </>
                      )}
                      {isCRM && (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/80 via-slate-900 to-slate-900" />
                          <div className="absolute -right-10 -top-10 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl group-hover:bg-cyan-500/30 transition-colors duration-500" />
                          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl" />
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-cyan-500/20 rounded-full opacity-30 group-hover:opacity-50 transition-all duration-700 scale-50 group-hover:scale-100" />
                        </>
                      )}

                      {/* Decorative Rings - Common */}
                      <div
                        className={`absolute top-5 right-5 w-16 h-16 border-2 rounded-full opacity-20 
                        ${
                          isLeadQualText
                            ? "border-purple-500/30"
                            : isInvoice
                              ? "border-emerald-500/30"
                              : isPayment
                                ? "border-amber-500/30"
                                : isCRM
                                  ? "border-cyan-500/30"
                                  : "border-slate-500/20"
                        }`}
                      />
                      <div
                        className={`absolute bottom-8 left-8 w-8 h-8 rounded-lg rotate-12 opacity-30 
                        ${
                          isLeadQualText
                            ? "bg-purple-500/20"
                            : isInvoice
                              ? "bg-emerald-500/20"
                              : isPayment
                                ? "bg-amber-500/20"
                                : isCRM
                                  ? "bg-cyan-500/20"
                                  : "bg-slate-500/20"
                        }`}
                      />

                      <div
                        className={`relative z-10 h-14 w-14 rounded-2xl border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm
                        ${
                          isLeadQualText
                            ? "bg-gradient-to-br from-purple-500/20 to-blue-600/20 border-purple-500/30 text-purple-300"
                            : isInvoice
                              ? "bg-gradient-to-br from-emerald-500/20 to-teal-600/20 border-emerald-500/30 text-emerald-300"
                              : isPayment
                                ? "bg-gradient-to-br from-amber-500/20 to-orange-600/20 border-amber-500/30 text-amber-300"
                                : isCRM
                                  ? "bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border-cyan-500/30 text-cyan-300"
                                  : "bg-slate-900 border-slate-700 text-teal-400"
                        }`}
                      >
                        {agent.icon}
                      </div>
                      <h4 className="relative z-10 font-bold text-lg mb-2 text-white">
                        {agent.name}
                      </h4>
                      <p className="relative z-10 text-sm mb-4 text-slate-300">
                        {agent.desc}
                      </p>
                      <div
                        className={`relative z-10 flex items-center text-xs font-medium gap-2 border py-1.5 px-3 rounded-full w-fit shadow-sm
                        ${
                          isLeadQualText
                            ? "bg-purple-500/10 border-purple-500/30 text-purple-300"
                            : isInvoice
                              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                              : isPayment
                                ? "bg-amber-500/10 border-amber-500/30 text-amber-300"
                                : isCRM
                                  ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-300"
                                  : "bg-slate-900 border-slate-700 text-teal-400"
                        }`}
                      >
                        <CheckCircle2 className="h-3 w-3" />
                        <span>Text • Ready in 5 to 10 business days</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Custom Agents Section */}
      <section className="py-20 px-6 md:px-12 bg-gradient-to-br from-slate-900 to-slate-800 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-teal-500/5 opacity-[0.03]" />
        <div className="absolute -right-64 -top-64 h-[500px] w-[500px] bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute -left-64 -bottom-64 h-[500px] w-[500px] bg-cyan-500/10 rounded-full blur-3xl" />

        <div className="container mx-auto relative z-10 max-w-6xl">
          <div className="mb-16">
            <span className="inline-block py-2 px-5 rounded-full bg-white/10 text-white/90 border border-white/20 text-xs tracking-widest font-semibold mb-8 backdrop-blur-sm uppercase">
              Beyond Standard Agents
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6 bg-gradient-to-r from-cyan-400 via-teal-300 to-teal-400 bg-clip-text text-transparent">
              Build Custom Agents for Your Unique Workflow
            </h2>
            <p className="text-slate-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed opacity-90">
              Pre built agents are just the starting point. Tell us how your
              business operates, and we will design agents that fit your
              workflows. Everything is built around how you actually work.
            </p>
          </div>

          {/* Futuristic HUD Dashboard */}
          <div className="relative w-full max-w-4xl mx-auto mt-12 md:mt-48 mb-12 h-auto md:h-[500px] flex flex-col md:flex-row justify-center items-center md:items-end gap-8 md:gap-0">
            {/* Main Semi-Circle Arc Background - Desktop Only */}
            <div className="hidden md:block absolute bottom-0 w-full h-[800px] rounded-full border border-slate-700/30 opacity-50 translate-y-1/2 pointer-events-none" />
            <div className="hidden md:block absolute bottom-0 w-[90%] h-[720px] rounded-full border-2 border-dashed border-slate-700/30 opacity-30 translate-y-1/2 pointer-events-none" />
            <div className="hidden md:block absolute bottom-0 w-[80%] h-[640px] rounded-full border border-cyan-500/10 opacity-40 translate-y-1/2 pointer-events-none" />

            {/* Mobile Background Elements */}
            <div className="md:hidden absolute inset-0 bg-gradient-to-b from-slate-900/50 to-transparent rounded-3xl -z-10 border border-slate-800/50" />

            {/* Glowing Arc Segment - Desktop */}
            <div className="hidden md:block absolute bottom-0 w-[110%] h-[880px] rounded-full border-t border-cyan-500/20 opacity-60 translate-y-1/2 pointer-events-none shadow-[0_-10px_40px_rgba(6,182,212,0.1)]" />

            {/* Central Hub - Dashboard Screen */}
            <div className="relative md:absolute bottom-0 left-0 md:left-1/2 md:-translate-x-1/2 md:translate-y-1/3 w-full max-w-sm md:w-96 h-64 bg-slate-900 rounded-2xl md:rounded-t-2xl md:rounded-b-none border border-cyan-500/50 items-start justify-center z-20 shadow-[0_0_30px_rgba(6,182,212,0.15)] md:shadow-[0_-10px_50px_rgba(6,182,212,0.2)] overflow-hidden flex">
              {/* Dashboard Screen Content */}
              <div className="w-full h-full p-6 flex flex-col items-center justify-start relative">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:20px_20px] opacity-50" />
                <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500 shadow-[0_0_10px_#06b6d4]" />

                <div className="relative z-10 w-full">
                  <div className="flex justify-between items-center mb-4 border-b border-cyan-500/20 pb-2">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
                      System Status: Online
                    </span>
                    <span className="text-[10px] font-mono text-cyan-400">
                      v2.4.0
                    </span>
                  </div>

                  <motion.div
                    key={activeFeature}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="text-center"
                  >
                    <div className="inline-flex p-3 rounded-full bg-cyan-500/10 text-cyan-400 mb-3 border border-cyan-500/30">
                      {
                        [
                          <Settings className="h-6 w-6" />,
                          <FileCheck className="h-6 w-6" />,
                          <Search className="h-6 w-6" />,
                        ][activeFeature]
                      }
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">
                      {
                        [
                          "Verification and Compliance",
                          "Operations and Procurement",
                          "Tracking and Monitoring",
                        ][activeFeature]
                      }
                    </h3>
                    <p className="text-sm text-slate-400 mt-2">
                      {
                        [
                          "Credentials, approvals, and validations handled automatically.",
                          "Requests, approvals, and operational workflows handled without manual effort.",
                          "Real time visibility into processes, statuses, and progress.",
                        ][activeFeature]
                      }
                    </p>
                    <div className="flex justify-center gap-2 mt-4">
                      {[0, 1, 2].map((idx) => (
                        <div
                          key={idx}
                          className={`h-1 rounded-full transition-all duration-300 ${idx === activeFeature ? "w-8 bg-cyan-400" : "w-2 bg-slate-700"}`}
                        />
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Nodes positioned on the arc - Hidden on Mobile */}
            {[
              {
                title: "Verification and Compliance",
                desc: "Credentials, approvals, and validations handled automatically.",
                icon: <Settings className="h-6 w-6" />,
                theme: "purple",
                position: "left-0 top-1/4",
                index: 0,
              },
              {
                title: "Operations and Procurement",
                desc: "Requests, approvals, and operational workflows handled without manual effort.",
                icon: <FileCheck className="h-6 w-6" />,
                theme: "cyan",
                position: "left-1/2 -top-24 -translate-x-1/2",
                index: 1,
              },
              {
                title: "Tracking and Monitoring",
                desc: "Real time visibility into processes, statuses, and progress.",
                icon: <Search className="h-6 w-6" />,
                theme: "emerald",
                position: "right-0 top-1/4",
                index: 2,
              },
            ].map((custom, i) => {
              const isActive = activeFeature === i;
              const isPurple = custom.theme === "purple";
              const isCyan = custom.theme === "cyan";
              const isEmerald = custom.theme === "emerald";

              return (
                <div
                  key={i}
                  className={`hidden md:flex absolute ${custom.position} z-10 w-64 justify-center cursor-pointer`}
                  onClick={() => setActiveFeature(i)}
                >
                  {/* Connector Line to Center (Simplified visual approximation) - Desktop Only */}
                  <div
                    className={`absolute top-full left-1/2 w-0.5 origin-top -z-10 transition-all duration-500
                      ${i === 0 ? "rotate-[45deg] h-40" : ""}
                      ${i === 1 ? "h-32" : ""}
                      ${i === 2 ? "-rotate-[45deg] h-40" : ""}
                      ${
                        isActive
                          ? isPurple
                            ? "bg-purple-500 shadow-[0_0_10px_#a855f7]"
                            : isCyan
                              ? "bg-cyan-500 shadow-[0_0_10px_#06b6d4]"
                              : "bg-emerald-500 shadow-[0_0_10px_#10b981]"
                          : "bg-slate-700/30"
                      }
                    `}
                  />

                  <motion.div
                    animate={{
                      scale: isActive ? 1.1 : 1,
                      opacity: isActive ? 1 : 0.7,
                    }}
                    whileHover={{ scale: 1.1, opacity: 1 }}
                    className={`relative group w-full p-5 rounded-xl backdrop-blur-md flex flex-col items-center text-center transition-all duration-500
                      ${isActive ? "bg-slate-900 border-opacity-100" : "bg-slate-900/60 border-opacity-30 hover:bg-slate-900/80 hover:border-opacity-60"}
                    `}
                    style={{
                      background: isActive
                        ? isPurple
                          ? "linear-gradient(to bottom right, rgba(88, 28, 135, 0.4), rgba(15, 23, 42, 0.95))"
                          : isCyan
                            ? "linear-gradient(to bottom right, rgba(22, 78, 99, 0.4), rgba(15, 23, 42, 0.95))"
                            : "linear-gradient(to bottom right, rgba(6, 78, 59, 0.4), rgba(15, 23, 42, 0.95))"
                        : "rgba(15, 23, 42, 0.6)",
                      border: isPurple
                        ? `1px solid rgba(192, 132, 252, ${isActive ? 0.6 : 0.2})`
                        : isCyan
                          ? `1px solid rgba(34, 211, 238, ${isActive ? 0.6 : 0.2})`
                          : `1px solid rgba(52, 211, 153, ${isActive ? 0.6 : 0.2})`,
                      boxShadow: isActive
                        ? isPurple
                          ? "0 0 30px rgba(168, 85, 247, 0.2)"
                          : isCyan
                            ? "0 0 30px rgba(34, 211, 238, 0.2)"
                            : "0 0 30px rgba(16, 185, 129, 0.2)"
                        : "none",
                    }}
                  >
                    <div
                      className="absolute -top-6 w-12 h-12 flex items-center justify-center rounded-lg border shadow-lg transition-all duration-300"
                      style={{
                        background: "#0f172a",
                        borderColor: isPurple
                          ? "rgba(192, 132, 252, 0.5)"
                          : isCyan
                            ? "rgba(34, 211, 238, 0.5)"
                            : "rgba(52, 211, 153, 0.5)",
                        color: isPurple
                          ? "#c084fc"
                          : isCyan
                            ? "#22d3ee"
                            : "#34d399",
                        boxShadow: isActive
                          ? `0 0 15px ${isPurple ? "#c084fc" : isCyan ? "#22d3ee" : "#34d399"}40`
                          : "none",
                      }}
                    >
                      {custom.icon}
                    </div>

                    <h4
                      className={`font-bold text-lg mt-4 mb-1 transition-colors ${isActive ? "text-white" : "text-slate-300"}`}
                    >
                      {custom.title}
                    </h4>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      {custom.desc}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tech Stack Section - Perspective Grid */}
      <section className="py-32 bg-slate-950 overflow-hidden relative flex flex-col items-center justify-center min-h-[900px] perspective-[1200px]">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-slate-900/50 rounded-full blur-[100px] -z-10" />

        <div className="container mx-auto px-4 relative z-20 text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold font-heading mb-6 bg-gradient-to-r from-cyan-400 via-teal-300 to-teal-400 bg-clip-text text-transparent">
              AI Built for the Enterprise
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              We power your business with cutting-edge AI infrastructure trusted
              by Fortune 500 companies worldwide.
            </p>
          </motion.div>
        </div>

        {/* 3D Perspective Grid */}
        <div
          className="relative w-full max-w-6xl mx-auto h-[600px] flex items-center justify-center"
          style={{
            transformStyle: "preserve-3d",
            transform: "rotateX(25deg) translateY(-50px)",
          }}
        >
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4 md:gap-12 p-4 md:p-12">
            {[
              {
                name: "Gmail",
                logo: gmailLogo,
                type: "image",
                color: "bg-black",
              },
              {
                name: "Stripe",
                logo: stripeLogo,
                type: "image",
                color: "bg-[#635BFF]",
              },
              {
                name: "Slack",
                logo: slackLogo,
                type: "image",
                color: "bg-black",
              },
              {
                name: "Calendar",
                logo: calendarLogo,
                type: "image",
                color: "bg-black",
              },
              {
                name: "Messages",
                logo: imessageLogo,
                type: "image",
                color: "bg-[#4ade80]",
              },

              {
                name: "X",
                logo: xLogo,
                type: "image",
                color: "bg-black",
              },
              {
                name: "Twilio",
                logo: twilioLogo,
                type: "image",
                color: "bg-[#F22F46]",
              },
              {
                name: "WhatsApp",
                logo: whatsappLogo,
                type: "image",
                color: "bg-[#25D366]",
              },
              {
                name: "Google",
                logo: googleLogo,
                type: "image",
                color: "bg-white",
              },
              {
                name: "Meta",
                logo: metaLogo,
                type: "image",
                color: "bg-black",
              },

              {
                name: "n8n",
                logo: n8nLogo,
                type: "image",
                color: "bg-[#EA4B71]",
              },
              {
                name: "AWS",
                logo: awsLogo,
                type: "image",
                color: "bg-[#232F3E]",
              },
              {
                name: "OpenAI",
                logo: openaiLogo,
                type: "image",
                color: "bg-black",
              },
              {
                name: "Claude",
                logo: claudeLogo,
                type: "image",
                color: "bg-[#D97757]",
              },
              {
                name: "Pinecone",
                logo: pineconeLogo,
                type: "image",
                color: "bg-black",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 100, scale: 0.8 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  whileHover={{
                    y: -20,
                    scale: 1.1,
                    zIndex: 50,
                    boxShadow: "0 20px 40px -10px rgba(255,255,255,0.2)",
                  }}
                  className={`relative w-20 h-20 md:w-24 md:h-24 rounded-3xl flex items-center justify-center border border-slate-200 backdrop-blur-sm group cursor-pointer
                    ${item.type === "image" ? "bg-white" : item.color}
                  `}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Reflection Effect - Only for bottom row */}
                  {i >= 10 && (
                    <div
                      className="absolute top-full left-0 w-full h-full opacity-40 pointer-events-none"
                      style={{
                        transform: "scaleY(-1) translateY(-20px)",
                        maskImage:
                          "linear-gradient(to top, rgba(0,0,0,0.8), transparent 60%)",
                        WebkitMaskImage:
                          "linear-gradient(to top, rgba(0,0,0,0.8), transparent 60%)",
                      }}
                    >
                      <div
                        className={`w-full h-full rounded-3xl flex items-center justify-center border border-white/5
                          ${item.type === "image" ? "bg-white" : item.color}
                        `}
                      >
                        {item.type === "image" ? (
                          <img
                            src={item.logo}
                            alt={item.name}
                            className="w-12 h-12 object-contain opacity-50"
                          />
                        ) : (
                          Icon && (
                            <Icon className="w-10 h-10 text-white opacity-50" />
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {/* Main Icon */}
                  <div className="relative z-10">
                    {item.type === "image" ? (
                      <img
                        src={item.logo}
                        alt={item.name}
                        className="w-12 h-12 md:w-14 md:h-14 object-contain drop-shadow-lg"
                      />
                    ) : (
                      Icon && (
                        <Icon className="w-10 h-10 md:w-12 md:h-12 text-white drop-shadow-lg" />
                      )
                    )}
                  </div>

                  {/* Glossy Highlight */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 to-transparent opacity-50 pointer-events-none" />

                  {/* Tooltip on Hover */}
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-slate-800 text-white text-xs rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-slate-700">
                    {item.name}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Floor Gradient for depth */}
        <div className="absolute bottom-0 w-full h-[400px] bg-gradient-to-t from-slate-950 via-slate-950 to-transparent z-10 pointer-events-none" />
      </section>

      {/* CTA */}
      <section className="py-32 bg-slate-950 text-white relative overflow-hidden border-t border-slate-900">
        {/* Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-slate-900/50 rounded-full blur-[100px] -z-10" />
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl opacity-50" />

        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold font-heading mb-8 text-white">
              Let’s Build What Your Business Actually Needs
            </h2>
            <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Every business operates differently. Tell us what you are trying
              to solve, and we will help you figure out the right agents for
              your workflows.
            </p>

            <div className="flex flex-col items-center gap-6">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="py-8 px-16 text-2xl rounded-full text-white shadow-[0_10px_25px_-5px_rgba(6,182,212,0.3)] hover:scale-105 hover:shadow-[0_10px_25px_-5px_rgba(6,182,212,0.5)] transition-all border-0"
                  style={{
                    background: "linear-gradient(to right, #06b6d4, #2dd4bf)",
                  }}
                >
                  Get AI Help
                </Button>
              </Link>
              <p className="text-sm text-slate-500">
                One of our AI agents will reach out to understand your needs. No
                commitment required.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
