import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Mic,
  MessageSquare,
  Clock,
  Zap,
  ShieldCheck,
  CheckCircle2,
  BarChart3,
  Users,
  Calendar,
  X,
  Send,
} from "lucide-react";
import { Link, useSearch } from "wouter";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState, useRef, useEffect } from "react";

const voiceAgents = [
  {
    title: "Lead Qualification",
    time: "10 to 15 business days",
    function:
      "Automatically handles inbound calls, qualifies real opportunities, and filters out low intent conversations.",
    icon: <Users className="h-6 w-6" />,
    theme: "purple",
  },
  {
    title: "Proposal Follow up",
    time: "10 to 15 business days",
    function:
      "Follows up on proposals automatically, revives inactive deals, and keeps opportunities moving forward.",
    icon: <MessageSquare className="h-6 w-6" />,
    theme: "amber",
  },
  {
    title: "Appointment Scheduling",
    time: "10 to 15 business days",
    function:
      "Handles scheduling conversations and books meetings automatically, without manual coordination.",
    icon: <Calendar className="h-6 w-6" />,
    theme: "cyan",
  },
  {
    title: "Customer Service",
    time: "10 to 15 business days",
    function:
      "Answers inbound calls around the clock, resolves common requests, and escalates when needed.",
    icon: <ShieldCheck className="h-6 w-6" />,
    theme: "emerald",
  },
];

const textAgents = [
  {
    title: "Lead Qualification",
    time: "10 to 15 business days",
    function:
      "Qualifies inbound leads via SMS or WhatsApp and routes high-intent prospects to your team.",
    icon: <MessageSquare className="h-6 w-6" />,
    theme: "purple",
  },
  {
    title: "Proposal Follow-up",
    time: "10 to 15 business days",
    function:
      "Re-engages stalled deals with automated follow-ups that keep your pipeline moving.",
    icon: <MessageSquare className="h-6 w-6" />,
    theme: "amber",
  },
  {
    title: "Appointment Scheduling",
    time: "10 to 15 business days",
    function:
      "Books meetings automatically via text, eliminating back-and-forth coordination.",
    icon: <Clock className="h-6 w-6" />,
    theme: "cyan",
  },
  {
    title: "Customer Service",
    time: "10 to 15 business days",
    function:
      "Handles support requests 24/7 via chat, resolving issues and escalating when needed.",
    icon: <ShieldCheck className="h-6 w-6" />,
    theme: "emerald",
  },
  {
    title: "Invoice Generator",
    time: "10 to 15 business days",
    function:
      "Creates and delivers invoices automatically, reducing manual billing overhead.",
    icon: <Zap className="h-6 w-6" />,
    theme: "emerald",
  },
  {
    title: "CRM Analysis",
    time: "10 to 15 business days",
    function:
      "Audits and enriches your CRM data, surfacing insights and cleaning inconsistencies.",
    icon: <BarChart3 className="h-6 w-6" />,
    theme: "blue",
  },
  {
    title: "Payment Reminders",
    time: "10 to 15 business days",
    function:
      "Sends automated reminders for overdue invoices, improving collection rates.",
    icon: <TimerIcon className="h-6 w-6" />,
    theme: "amber",
  },
  {
    title: "Portfolio Analysis",
    time: "10 to 15 business days",
    function:
      "Generates profitability reports by project, giving you visibility into performance.",
    icon: <BarChart3 className="h-6 w-6" />,
    theme: "blue",
  },
];

// Helper component for the Timer icon since it wasn't imported from lucide-react in the original file correctly sometimes
function TimerIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="10" x2="14" y1="2" y2="2" />
      <line x1="12" x2="15" y1="14" y2="11" />
      <circle cx="12" cy="14" r="8" />
    </svg>
  );
}

export default function Agents() {
  const searchString = useSearch();
  const urlParams = new URLSearchParams(searchString);
  const tabFromUrl = urlParams.get("tab");

  const [activeTab, setActiveTab] = useState(
    tabFromUrl === "text" ? "text" : "voice",
  );
  const [customModalOpen, setCustomModalOpen] = useState(false);
  const tryMeOutButtonRef = useRef<HTMLButtonElement>(null);

  // Handle deep links from footer and scroll to "Try me Out" button when switching to text tab
  useEffect(() => {
    const sectionFromUrl = urlParams.get("section");

    if (sectionFromUrl === "custom") {
      // Deep link to Custom Solutions section
      setTimeout(() => {
        const customSection = document.getElementById("custom-solutions");
        if (customSection) {
          customSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    } else if (tabFromUrl === "voice" || tabFromUrl === "text") {
      setActiveTab(tabFromUrl);
      // Scroll to the agent section after a small delay to ensure render
      setTimeout(() => {
        const tabsSection = document.querySelector('[role="tablist"]');
        if (tabsSection) {
          tabsSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, [tabFromUrl, searchString]);

  // Scroll to "Try me Out" button when switching to text tab
  useEffect(() => {
    if (activeTab === "text") {
      // Wait for the widget to render, then scroll smoothly to the button
      setTimeout(() => {
        if (tryMeOutButtonRef.current) {
          tryMeOutButtonRef.current.scrollIntoView({ 
            behavior: "smooth", 
            block: "center",
            inline: "nearest"
          });
          // Add a subtle highlight effect to draw attention
          tryMeOutButtonRef.current.style.transition = "all 0.3s ease";
          tryMeOutButtonRef.current.style.transform = "scale(1.05)";
          setTimeout(() => {
            if (tryMeOutButtonRef.current) {
              tryMeOutButtonRef.current.style.transform = "scale(1)";
            }
          }, 500);
        }
      }, 500); // Increased delay to ensure the widget is fully rendered
    }
  }, [activeTab]);
  const [customForm, setCustomForm] = useState({
    name: "",
    last_name: "",
    email: "",
    phone_number: "",
    company_name: "",
    industry: "",
    request: "",
  });

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      source: "agents_custom_engineering",
      ...customForm,
    };
    console.log("Custom agent quote payload:", payload);
    alert(
      "Request submitted! Our team will review and reach out with next steps.",
    );
    setCustomModalOpen(false);
    setCustomForm({
      name: "",
      last_name: "",
      email: "",
      phone_number: "",
      company_name: "",
      industry: "",
      request: "",
    });
  };

  return (
    <div
      className="min-h-screen bg-slate-950 text-white pb-24 relative selection:bg-cyan-500/30"
      style={{
        background: `
          linear-gradient(135deg, rgba(0, 217, 255, 0.15) 0%, transparent 50%, rgba(0, 255, 163, 0.1) 100%),
          radial-gradient(ellipse at center, rgba(0, 200, 200, 0.1) 0%, transparent 60%),
          #020617
        `,
      }}
    >
      {/* Header Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="container mx-auto relative z-10 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-sm font-medium mb-8 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              Catalog
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-heading text-white drop-shadow-2xl">
              Our Agent{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                Catalog
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Specialized AI agents designed to handle high impact tasks across
              sales, operations, and customer experience. These agents are built
              to plug into your workflows and deliver value fast.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 relative z-10">
        <Tabs
          value={activeTab}
          className="w-full max-w-6xl mx-auto"
          onValueChange={(value) => setActiveTab(value)}
        >
          <div className="flex justify-center mb-12">
            <TabsList className="grid w-full max-w-md grid-cols-2 p-1 h-auto bg-slate-900/80 border border-slate-800 rounded-full backdrop-blur-sm">
              <TabsTrigger
                value="voice"
                className="rounded-full py-3 data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400 data-[state=active]:border data-[state=active]:border-cyan-500/30 text-slate-400 hover:text-white transition-all"
              >
                <Mic className="w-4 h-4 mr-2" /> Voice Agents
              </TabsTrigger>
              <TabsTrigger
                value="text"
                className="rounded-full py-3 data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400 data-[state=active]:border data-[state=active]:border-emerald-500/30 text-slate-400 hover:text-white transition-all"
              >
                <MessageSquare className="w-4 h-4 mr-2" /> Text Agents
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Primary Try Me Out CTA - Conditional based on active tab */}
          {activeTab === "voice" && <VoiceAgentWidget />}
          {activeTab === "text" && <TextAgentWidget tryMeOutButtonRef={tryMeOutButtonRef} />}

          <TabsContent value="voice">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {voiceAgents.map((agent, i) => (
                <AgentCard key={i} agent={agent} type="Voice" index={i} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="text">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {textAgents.map((agent, i) => (
                <AgentCard key={i} agent={agent} type="Text" index={i} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Custom Solutions Section */}
        <div
          id="custom-solutions"
          className="mt-32 group relative rounded-3xl p-1 overflow-hidden"
        >
          {/* Gradient Border */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-emerald-500 opacity-30 group-hover:opacity-60 transition-opacity duration-500 rounded-3xl" />

          <div className="relative bg-slate-900 rounded-[22px] p-8 md:p-12 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 to-slate-950/50" />

            {/* Background Effects */}
            <div className="absolute -right-24 -top-24 h-64 w-64 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-colors duration-500" />
            <div className="absolute -left-24 -bottom-24 h-64 w-64 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-colors duration-500" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-purple-300 mb-4">
                  <Zap className="h-3 w-3" /> Custom Engineering
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                  Need something truly custom?
                </h3>
                <p className="text-slate-400 text-lg mb-8">
                  We design and build custom AI agents tailored to your exact
                  workflows, systems, and constraints. Whether your challenge is
                  operational complexity, fragmented tools, or high volume
                  interactions, we engineer agents that fit how your business
                  actually runs.
                </p>
                <ul className="space-y-3 inline-block text-left">
                  <li className="flex items-center gap-3 text-slate-300">
                    <CheckCircle2 className="h-5 w-5 text-cyan-400" /> Custom
                    workflows designed around your internal processes
                  </li>
                  <li className="flex items-center gap-3 text-slate-300">
                    <CheckCircle2 className="h-5 w-5 text-purple-400" />{" "}
                    Integration with existing tools, CRMs, and data sources
                  </li>
                  <li className="flex items-center gap-3 text-slate-300">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />{" "}
                    Secure, proprietary handling of your business logic and data
                  </li>
                </ul>
              </div>
              <div className="flex-shrink-0">
                <Button
                  size="lg"
                  onClick={() => setCustomModalOpen(true)}
                  className="py-6 px-12 text-xl rounded-full text-white shadow-[0_10px_25px_-5px_rgba(6,182,212,0.3)] hover:scale-105 hover:shadow-[0_10px_25px_-5px_rgba(6,182,212,0.5)] transition-all border-0"
                  style={{
                    background: "linear-gradient(to right, #06b6d4, #2dd4bf)",
                  }}
                >
                  Talk to Our Team
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Engineering Modal */}
      <AnimatePresence>
        {customModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setCustomModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl bg-slate-900 border border-cyan-500/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-5 border-b border-slate-700/50 flex justify-between items-start shrink-0">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Build Your Full Stack Agent System
                  </h3>
                  <p className="text-sm text-slate-400 mt-2">
                    Combine voice, text, and workflows into one system tailored
                    to your operations—without unnecessary back-and-forth.
                  </p>
                </div>
                <button
                  onClick={() => setCustomModalOpen(false)}
                  className="text-slate-400 hover:text-white transition-colors p-1 ml-4"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Form */}
              <form
                onSubmit={handleCustomSubmit}
                className="p-5 space-y-4 overflow-y-auto flex-1"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-1.5">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customForm.name}
                      onChange={(e) =>
                        setCustomForm((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-1.5">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customForm.last_name}
                      onChange={(e) =>
                        setCustomForm((prev) => ({
                          ...prev,
                          last_name: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1.5">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={customForm.email}
                    onChange={(e) =>
                      setCustomForm((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customForm.phone_number}
                    onChange={(e) =>
                      setCustomForm((prev) => ({
                        ...prev,
                        phone_number: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-1.5">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customForm.company_name}
                      onChange={(e) =>
                        setCustomForm((prev) => ({
                          ...prev,
                          company_name: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-1.5">
                      Industry *
                    </label>
                    <input
                      type="text"
                      required
                      value={customForm.industry}
                      onChange={(e) =>
                        setCustomForm((prev) => ({
                          ...prev,
                          industry: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1.5">
                    What should AI handle for you? *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={customForm.request}
                    onChange={(e) =>
                      setCustomForm((prev) => ({
                        ...prev,
                        request: e.target.value,
                      }))
                    }
                    placeholder="Tell us what you want handled across voice, text, CRM, follow-ups, or workflows."
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all resize-none"
                  />
                </div>

                {/* Footer */}
                <div className="pt-2 flex items-center justify-end gap-3">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setCustomModalOpen(false)}
                    className="text-slate-400 hover:text-white"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white px-6"
                  >
                    Send Request
                  </Button>
                </div>
                <p className="text-xs text-slate-500 text-right">
                  Our team will review your request and reach out with next
                  steps.
                </p>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AgentCard({
  agent,
  type,
  index,
}: {
  agent: any;
  type: string;
  index: number;
}) {
  const isPurple = agent.theme === "purple";
  const isCyan = agent.theme === "cyan";
  const isEmerald = agent.theme === "emerald";
  const isAmber = agent.theme === "amber";
  const isBlue = agent.theme === "blue";

  // Dynamic styles based on theme
  const getThemeStyles = () => {
    if (isPurple)
      return {
        border: "border-purple-500/30",
        shadow: "shadow-purple-500/10",
        bg: "bg-purple-500/10",
        text: "text-purple-300",
        gradient: "from-purple-500/20 to-blue-600/20",
        glow: "group-hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] group-hover:border-purple-500/50",
      };
    if (isCyan)
      return {
        border: "border-cyan-500/30",
        shadow: "shadow-cyan-500/10",
        bg: "bg-cyan-500/10",
        text: "text-cyan-300",
        gradient: "from-cyan-500/20 to-blue-600/20",
        glow: "group-hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] group-hover:border-cyan-500/50",
      };
    if (isEmerald)
      return {
        border: "border-emerald-500/30",
        shadow: "shadow-emerald-500/10",
        bg: "bg-emerald-500/10",
        text: "text-emerald-300",
        gradient: "from-emerald-500/20 to-teal-600/20",
        glow: "group-hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] group-hover:border-emerald-500/50",
      };
    if (isAmber)
      return {
        border: "border-amber-500/30",
        shadow: "shadow-amber-500/10",
        bg: "bg-amber-500/10",
        text: "text-amber-300",
        gradient: "from-amber-500/20 to-orange-600/20",
        glow: "group-hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] group-hover:border-amber-500/50",
      };
    if (isBlue)
      return {
        border: "border-blue-500/30",
        shadow: "shadow-blue-500/10",
        bg: "bg-blue-500/10",
        text: "text-blue-300",
        gradient: "from-blue-500/20 to-indigo-600/20",
        glow: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] group-hover:border-blue-500/50",
      };
    return {
      border: "border-slate-700",
      shadow: "shadow-none",
      bg: "bg-slate-800",
      text: "text-slate-300",
      gradient: "from-slate-800 to-slate-900",
      glow: "group-hover:border-slate-500",
    };
  };

  const styles = getThemeStyles();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`relative p-8 rounded-3xl border ${styles.border} bg-slate-900/50 backdrop-blur-sm transition-all duration-300 group hover:-translate-y-1 ${styles.glow}`}
    >
      {/* Background Gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${styles.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}
      />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div
            className={`h-14 w-14 rounded-2xl ${styles.bg} border ${styles.border} flex items-center justify-center ${styles.text} group-hover:scale-110 transition-transform duration-300`}
          >
            {agent.icon}
          </div>
          <div
            className={`px-3 py-1 rounded-full text-xs font-medium border ${styles.border} ${styles.bg} ${styles.text}`}
          >
            Ready in {agent.time}
          </div>
        </div>

        <h3 className="text-2xl font-bold text-white mb-3 group-hover:translate-x-1 transition-transform">
          {agent.title}
        </h3>
        <p className="text-slate-400 leading-relaxed mb-6 group-hover:text-slate-300 transition-colors">
          {agent.function}
        </p>

        <div className="flex items-center text-sm font-medium text-slate-500 group-hover:text-white transition-colors">
          <span className="mr-2">Learn more</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </motion.div>
  );
}

function ArrowRight(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function TextAgentWidget({ tryMeOutButtonRef }: { tryMeOutButtonRef?: React.RefObject<HTMLButtonElement | null> }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "agent", text: "Hello! I'm Mr. Sourcy. How can I help you today?" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatWidgetRef = useRef<HTMLDivElement>(null);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Generate a unique chat session ID
  const generateChatId = (): string => {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}-${Math.random().toString(36).substring(2, 15)}`;
  };

  // Get or create chat ID from localStorage
  const getOrCreateChatId = (): string => {
    const STORAGE_KEY = "sourcy_agent_chat_session_id";
    let chatId = localStorage.getItem(STORAGE_KEY);
    if (!chatId) {
      chatId = generateChatId();
      localStorage.setItem(STORAGE_KEY, chatId);
    }
    return chatId;
  };

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const maxHeight = 120;
      const newHeight = Math.min(textarea.scrollHeight, maxHeight);
      textarea.style.height = `${newHeight}px`;
    }
  }, [inputValue]);

  // Auto-scroll to bottom when messages change or typing status changes
  useEffect(() => {
    if (messagesEndRef.current && chatContainerRef.current) {
      // Small delay to ensure DOM is updated
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ 
          behavior: "smooth",
          block: "nearest"
        });
      }, 50);
    }
  }, [messages, isTyping]);

  // Also scroll when chat container is scrolled manually and a new message arrives
  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      // When user scrolls manually, we can track if they're near bottom
      const isNearBottom = 
        container.scrollHeight - container.scrollTop - container.clientHeight < 100;
      
      // Store scroll position preference
      (container as any).userScrolledUp = !isNearBottom;
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to chat when it opens
  useEffect(() => {
    if (isOpen && chatWidgetRef.current) {
      // Wait for animation to start, then scroll smoothly
      setTimeout(() => {
        chatWidgetRef.current?.scrollIntoView({ 
          behavior: "smooth", 
          block: "center",
          inline: "nearest"
        });
        // Focus on textarea and scroll to bottom after scroll animation completes
        setTimeout(() => {
          textareaRef.current?.focus();
          // Ensure we scroll to the last message
          if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ 
              behavior: "smooth",
              block: "nearest"
            });
          }
        }, 1000); // Increased timeout to allow scroll animation to complete
      }, 200);
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // En mobile: Enter envía el mensaje (comportamiento de chat normal)
    // En desktop: Enter sin Shift = salto de línea, Shift+Enter también = salto de línea
    if (e.key === "Enter" && !e.shiftKey) {
      if (isMobile) {
        e.preventDefault();
        if (inputValue.trim()) {
          handleSend();
        }
      }
      // En desktop, no hacemos nada - permite el salto de línea por defecto
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    setMessages((prev) => [...prev, { role: "user", text: inputValue }]);
    const messageText = inputValue;
    setInputValue("");

    // Scroll to bottom immediately when user sends message
    setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ 
          behavior: "smooth",
          block: "nearest"
        });
      }
    }, 50);

    setIsTyping(true);

    try {
      const chatId = getOrCreateChatId();

      // Send to backend API (same as brightcoast)
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messageText,
          sender: "user",
          timestamp: new Date().toISOString(),
          chatId: chatId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = await response.json();

      setIsTyping(false);

      // Add agent response if provided by n8n
      if (data.response || data.message) {
        setMessages((prev) => [
          ...prev,
          {
            role: "agent",
            text:
              data.response ||
              data.message ||
              "Thanks for your message! Our team will get back to you shortly.",
          },
        ]);
        
        // Force scroll to bottom after new message is added
        setTimeout(() => {
          if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ 
              behavior: "smooth",
              block: "nearest"
            });
          }
        }, 100);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "agent",
          text: "Sorry, there was an error sending your message. Please try again.",
        },
      ]);
    }
  };

  return (
    <div className="w-full flex flex-col items-center mb-16 relative z-20">
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="chat"
            ref={chatWidgetRef}
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            className="w-full max-w-lg bg-slate-900 border border-emerald-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col mx-auto"
          >
            {/* Chat Header */}
            <div className="bg-emerald-600/20 p-4 border-b border-emerald-500/20 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                  <MessageSquare className="h-4 w-4 text-emerald-400" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Mr. Sourcy</h4>
                  <span className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] text-emerald-300/80 uppercase tracking-wider font-medium">
                      Online
                    </span>
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div 
              ref={chatContainerRef}
              className="h-80 overflow-y-auto p-4 space-y-4 bg-slate-950/50 scroll-smooth"
              style={{ scrollBehavior: "smooth" }}
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm whitespace-pre-line ${msg.role === "user" ? "bg-emerald-600 text-white rounded-tr-sm" : "bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-sm"}`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-800 text-slate-400 px-3 py-2 rounded-xl border border-slate-700">
                    <div className="flex gap-1.5">
                      <div
                        className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <div
                        className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <div
                        className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-3 bg-slate-900 border-t border-slate-800">
              <div className="flex gap-2 items-end">
                <Textarea
                  ref={textareaRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={isMobile ? "Type a message..." : "Type a message... (Press Enter for new line)"}
                  enterKeyHint={isMobile ? "send" : undefined}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50 placeholder:text-slate-600 resize-none overflow-hidden min-h-[40px] max-h-[120px] leading-relaxed"
                  rows={1}
                />
                <button
                  onClick={handleSend}
                  className="p-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed h-10 shrink-0"
                  disabled={!inputValue.trim()}
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              {!isMobile && (
                <p className="text-xs text-slate-500 mt-2 text-center">
                  Press{" "}
                  <kbd className="px-1.5 py-0.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-300 rounded">
                    Enter
                  </kbd>{" "}
                  for a new line, click the send button to send your message
                </p>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="button"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center"
          >
            <button
              ref={tryMeOutButtonRef}
              onClick={() => setIsOpen(true)}
              className="group flex items-center justify-center gap-5 bg-slate-900 border-2 border-emerald-500/40 hover:border-emerald-400 text-emerald-400 px-16 py-5 rounded-full shadow-xl shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-300 hover:scale-105 min-w-[320px]"
            >
              <span className="font-bold text-xl">Try me Out</span>
              <div className="h-14 w-14 bg-emerald-500/20 rounded-full flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 flex-shrink-0">
                <MessageSquare className="h-7 w-7" />
              </div>
            </button>
            <p className="mt-4 text-slate-400 text-sm text-center max-w-sm">
              I'm a text agent. Write to me and see what I can do.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function VoiceAgentWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    country_code: "+1",
    phone_number: "",
    company_name: "",
    industry: "",
    how_can_ai_help: "",
    language: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Concatenar código de país con el número de teléfono
      const fullPhoneNumber = `${formData.country_code}${formData.phone_number}`;
      const payload = {
        ...formData,
        phone_number: fullPhoneNumber,
      };

      await fetch(
        "https://n8n.arkoswearshop.com/webhook/cf52b748-d3e4-45d0-af04-58f1126be79c",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
    } catch (error) {
      console.error("Webhook error:", error);
    }
    setSubmitted(true);
  };

  return (
    <div className="w-full flex flex-col items-center mb-16 relative z-20">
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            className="w-full max-w-lg bg-slate-900 border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col mx-auto"
          >
            {/* Header */}
            <div className="bg-cyan-600/20 p-4 border-b border-cyan-500/20 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
                  <Mic className="h-4 w-4 text-cyan-400" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Talk to AI</h4>
                  <span className="text-[10px] text-cyan-300/80 uppercase tracking-wider font-medium">
                    Request a Call (Max 5 minutes)
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 bg-slate-950/50">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
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
                          setFormData({ ...formData, surname: e.target.value })
                        }
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">
                      Email *
                    </label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                      placeholder="name@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">
                      Phone Number *
                    </label>
                    <div className="flex gap-2">
                      <select
                        required
                        value={formData.country_code}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            country_code: e.target.value,
                          })
                        }
                        className="w-24 bg-slate-900 border border-slate-800 rounded-lg px-2 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                      >
                        <option value="+1">+1</option>
                        <option value="+57">+57</option>
                      </select>
                      <input
                        required
                        type="tel"
                        value={formData.phone_number}
                        onChange={(e) => {
                          // Solo permitir números
                          const numericValue = e.target.value.replace(
                            /\D/g,
                            "",
                          );
                          setFormData({
                            ...formData,
                            phone_number: numericValue,
                          });
                        }}
                        className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                        placeholder="5550000000"
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
                      required
                      type="text"
                      value={formData.industry}
                      onChange={(e) =>
                        setFormData({ ...formData, industry: e.target.value })
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
                      required
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
                        setFormData({ ...formData, language: e.target.value })
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
                    Request a Call (Max 5 minutes)
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
                    One of our AI voice agents will contact you shortly at the
                    provided number.
                  </p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    variant="ghost"
                    className="mt-4 text-cyan-400 hover:text-cyan-300 hover:bg-transparent text-sm"
                  >
                    Send another request
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="button"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center"
          >
            <button
              onClick={() => setIsOpen(true)}
              className="group flex items-center justify-center gap-5 bg-slate-900 border-2 border-cyan-500/40 hover:border-cyan-400 text-cyan-400 px-16 py-5 rounded-full shadow-xl shadow-cyan-500/10 hover:shadow-cyan-500/20 transition-all duration-300 hover:scale-105 min-w-[320px]"
            >
              <span className="font-bold text-xl">Try me Out</span>
              <div className="h-14 w-14 bg-cyan-500/20 rounded-full flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-white transition-all duration-300 flex-shrink-0">
                <Mic className="h-7 w-7" />
              </div>
            </button>
            <p className="mt-4 text-slate-400 text-sm text-center max-w-sm">
              Try it yourself. Fill out the form and I'll call you to show what
              I can do.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
