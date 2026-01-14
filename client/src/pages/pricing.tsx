import { Check, HelpCircle, X, Plus, Minus, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const TEXT_AGENTS = [
  { id: "lead-qualification", name: "Lead Qualification", description: "Qualify inbound leads instantly via SMS/Email", setup: 1500, monthly: 900 },
  { id: "proposal-follow-up", name: "Proposal Follow-Up", description: "Automatically follow up on pending proposals", setup: 1500, monthly: 900 },
  { id: "appointment-scheduling", name: "Appointment Scheduling", description: "Handle booking and calendar coordination", setup: 1200, monthly: 700 },
  { id: "customer-service-text", name: "Customer Service (Text)", description: "Respond to customer inquiries 24/7", setup: 1800, monthly: 1100 },
  { id: "invoice-generator", name: "Invoice Generator", description: "Generate and send invoices automatically", setup: 1000, monthly: 600 },
  { id: "crm-analysis", name: "CRM Analysis", description: "Surface insights from your CRM data", setup: 2000, monthly: 1200 },
  { id: "payment-reminders", name: "Payment Reminders", description: "Send timely reminders for outstanding payments", setup: 1000, monthly: 600 },
  { id: "portfolio-analysis", name: "Portfolio Analysis", description: "Analyze and report on portfolio performance", setup: 2000, monthly: 1200 },
];

const VOICE_AGENTS = [
  { id: "lead-qualification-voice", name: "Lead Qualification (Voice)", description: "Qualify leads through natural phone conversations", setup: 1500, monthly: 900 },
  { id: "appointment-scheduling-voice", name: "Appointment Scheduling (Voice)", description: "Book and manage appointments via phone calls", setup: 1200, monthly: 700 },
  { id: "proposal-follow-up-voice", name: "Proposal Follow-Up (Voice)", description: "Follow up on proposals with live conversations", setup: 1500, monthly: 900 },
  { id: "customer-service-voice", name: "Customer Service (Voice)", description: "Handle customer calls with human-like interaction", setup: 2000, monthly: 1200 },
];

export default function Pricing() {
  const [textAgentModalOpen, setTextAgentModalOpen] = useState(false);
  const [voiceAgentModalOpen, setVoiceAgentModalOpen] = useState(false);
  const [bundleModalOpen, setBundleModalOpen] = useState(false);
  const [customModalOpen, setCustomModalOpen] = useState(false);
  const [automationsModalOpen, setAutomationsModalOpen] = useState(false);
  const [selectedTextAgents, setSelectedTextAgents] = useState<Record<string, number>>({});
  const [selectedVoiceAgents, setSelectedVoiceAgents] = useState<Record<string, number>>({});
  const [bundleForm, setBundleForm] = useState({
    name: "",
    last_name: "",
    email: "",
    phone_number: "",
    company_name: "",
    industry: "",
    request: ""
  });
  const [customForm, setCustomForm] = useState({
    name: "",
    last_name: "",
    email: "",
    phone_number: "",
    company_name: "",
    industry: "",
    request: ""
  });
  const [automationsForm, setAutomationsForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    company_name: "",
    industry: "",
    automation_request: ""
  });

  const handleAutomationsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      source: "pricing_automations",
      ...automationsForm
    };
    console.log("Automations contact payload:", payload);
    alert("Request submitted! Our team will review and follow up when it makes sense.");
    setAutomationsModalOpen(false);
    setAutomationsForm({ first_name: "", last_name: "", email: "", phone_number: "", company_name: "", industry: "", automation_request: "" });
  };

  const handleBundleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      source: "pricing_full_stack_bundle",
      ...bundleForm
    };
    console.log("Bundle contact payload:", payload);
    alert("Request submitted! A specialist will reach out soon.");
    setBundleModalOpen(false);
    setBundleForm({ name: "", last_name: "", email: "", phone_number: "", company_name: "", industry: "", request: "" });
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      source: "pricing_custom_agent",
      ...customForm
    };
    console.log("Custom agent quote payload:", payload);
    alert("Quote request submitted! We'll get back to you with a proposal.");
    setCustomModalOpen(false);
    setCustomForm({ name: "", last_name: "", email: "", phone_number: "", company_name: "", industry: "", request: "" });
  };

  const toggleTextAgent = (agentId: string) => {
    setSelectedTextAgents(prev => {
      if (prev[agentId]) {
        const { [agentId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [agentId]: 1 };
    });
  };

  const updateTextQuantity = (agentId: string, delta: number) => {
    setSelectedTextAgents(prev => {
      const current = prev[agentId] || 1;
      const newQty = Math.max(1, current + delta);
      return { ...prev, [agentId]: newQty };
    });
  };

  const toggleVoiceAgent = (agentId: string) => {
    setSelectedVoiceAgents(prev => {
      if (prev[agentId]) {
        const { [agentId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [agentId]: 1 };
    });
  };

  const updateVoiceQuantity = (agentId: string, delta: number) => {
    setSelectedVoiceAgents(prev => {
      const current = prev[agentId] || 1;
      const newQty = Math.max(1, current + delta);
      return { ...prev, [agentId]: newQty };
    });
  };

  const textTotalSetup = TEXT_AGENTS.reduce((sum, agent) => {
    const qty = selectedTextAgents[agent.id] || 0;
    return sum + (agent.setup * qty);
  }, 0);

  const textTotalMonthly = TEXT_AGENTS.reduce((sum, agent) => {
    const qty = selectedTextAgents[agent.id] || 0;
    return sum + (agent.monthly * qty);
  }, 0);

  const voiceTotalSetup = VOICE_AGENTS.reduce((sum, agent) => {
    const qty = selectedVoiceAgents[agent.id] || 0;
    return sum + (agent.setup * qty);
  }, 0);

  const voiceTotalMonthly = VOICE_AGENTS.reduce((sum, agent) => {
    const qty = selectedVoiceAgents[agent.id] || 0;
    return sum + (agent.monthly * qty);
  }, 0);

  const handleTextBuy = () => {
    const payload = {
      plan_type: "text_agents",
      items: TEXT_AGENTS.filter(a => selectedTextAgents[a.id]).map(agent => ({
        agent_name: agent.name,
        setup_price: agent.setup,
        monthly_price: agent.monthly,
        quantity: selectedTextAgents[agent.id]
      })),
      setup_total: textTotalSetup,
      monthly_total: textTotalMonthly,
      currency: "USD"
    };
    console.log("Stripe checkout payload:", payload);
    alert("Stripe integration coming soon! Check console for payload.");
  };

  const handleVoiceBuy = () => {
    const payload = {
      plan_type: "voice_agents",
      items: VOICE_AGENTS.filter(a => selectedVoiceAgents[a.id]).map(agent => ({
        agent_name: agent.name,
        setup_price: agent.setup,
        monthly_price: agent.monthly,
        quantity: selectedVoiceAgents[agent.id]
      })),
      setup_total: voiceTotalSetup,
      monthly_total: voiceTotalMonthly,
      currency: "USD"
    };
    console.log("Stripe checkout payload:", payload);
    alert("Stripe integration coming soon! Check console for payload.");
  };

  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', updateScrollButtons);
      updateScrollButtons();
      return () => carousel.removeEventListener('scroll', updateScrollButtons);
    }
  }, []);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const cardWidth = 340;
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="py-16 bg-slate-50 dark:bg-background min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 font-heading">Transparent Pricing</h1>
          <p className="text-xl text-muted-foreground">
            Start small and scale as you grow. Transparent setup and ongoing partnership pricing.
          </p>
        </div>

        {/* Pricing Cards Header with Navigation */}
        <div className="flex items-center justify-end gap-3 max-w-7xl mx-auto mb-6">
          <button
            onClick={() => scrollCarousel('left')}
            disabled={!canScrollLeft}
            className={`h-10 w-10 rounded-full border flex items-center justify-center transition-all ${
              canScrollLeft 
                ? 'bg-background border-slate-300 dark:border-slate-600 hover:border-cyan-500 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] text-foreground cursor-pointer' 
                : 'bg-muted border-slate-200 dark:border-slate-700 text-muted-foreground/40 cursor-not-allowed'
            }`}
            data-testid="button-carousel-left"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scrollCarousel('right')}
            disabled={!canScrollRight}
            className={`h-10 w-10 rounded-full border flex items-center justify-center transition-all ${
              canScrollRight 
                ? 'bg-background border-slate-300 dark:border-slate-600 hover:border-cyan-500 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] text-foreground cursor-pointer' 
                : 'bg-muted border-slate-200 dark:border-slate-700 text-muted-foreground/40 cursor-not-allowed'
            }`}
            data-testid="button-carousel-right"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Pricing Cards Carousel */}
        <div 
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto pb-6 mb-24 snap-x snap-mandatory scrollbar-hide max-w-7xl mx-auto"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Automations Tier */}
          <div className="bg-background rounded-2xl p-8 border border-teal-500/30 shadow-sm hover:shadow-[0_0_20px_rgba(20,184,166,0.15)] transition-all flex flex-col flex-shrink-0 w-[320px] snap-start" data-testid="card-automations-pricing">
            <div className="mb-6 min-h-[140px]">
              <h3 className="text-xl font-bold text-teal-600 dark:text-teal-400 mb-2">Automations</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-sm text-muted-foreground">starting from</span>
                <span className="text-4xl font-bold text-teal-600 dark:text-teal-400">$800</span>
              </div>
              <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                Smart automations that run your workflows in the background.
              </p>
            </div>
            <Button className="w-full mb-8" variant="outline" onClick={() => setAutomationsModalOpen(true)} data-testid="button-automations-talk">Talk to Our Team</Button>
            <ul className="space-y-4 text-sm flex-1">
              <FeatureItem text="Workflow & process automation" />
              <FeatureItem text="CRM automations and lifecycle updates" />
              <FeatureItem text="Automated emails and internal notifications" />
              <FeatureItem text="Proposal and payment follow ups" />
              <FeatureItem text="Tool integrations and system syncing" />
              <FeatureItem text="Built intentionally around your operations" />
            </ul>
          </div>

          {/* Automations Modal */}
          <AnimatePresence>
            {automationsModalOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                onClick={() => setAutomationsModalOpen(false)}
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
                      <h3 className="text-xl font-bold text-white">Build Smart Automations for Your Business</h3>
                      <p className="text-sm text-slate-400 mt-2">Tell us how your business works today, and we'll explore how smart automations can remove friction and save your team time.</p>
                    </div>
                    <button onClick={() => setAutomationsModalOpen(false)} className="text-slate-400 hover:text-white transition-colors p-1 ml-4">
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleAutomationsSubmit} className="p-5 space-y-4 overflow-y-auto flex-1">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-slate-400 mb-1.5">First Name *</label>
                        <input
                          type="text"
                          required
                          value={automationsForm.first_name}
                          onChange={(e) => setAutomationsForm(prev => ({ ...prev, first_name: e.target.value }))}
                          className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-slate-400 mb-1.5">Last Name *</label>
                        <input
                          type="text"
                          required
                          value={automationsForm.last_name}
                          onChange={(e) => setAutomationsForm(prev => ({ ...prev, last_name: e.target.value }))}
                          className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-1.5">Email *</label>
                      <input
                        type="email"
                        required
                        value={automationsForm.email}
                        onChange={(e) => setAutomationsForm(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-1.5">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={automationsForm.phone_number}
                        onChange={(e) => setAutomationsForm(prev => ({ ...prev, phone_number: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-slate-400 mb-1.5">Company Name *</label>
                        <input
                          type="text"
                          required
                          value={automationsForm.company_name}
                          onChange={(e) => setAutomationsForm(prev => ({ ...prev, company_name: e.target.value }))}
                          className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-slate-400 mb-1.5">Industry *</label>
                        <input
                          type="text"
                          required
                          value={automationsForm.industry}
                          onChange={(e) => setAutomationsForm(prev => ({ ...prev, industry: e.target.value }))}
                          className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-1.5">What should we automate for you? *</label>
                      <textarea
                        required
                        rows={4}
                        value={automationsForm.automation_request}
                        onChange={(e) => setAutomationsForm(prev => ({ ...prev, automation_request: e.target.value }))}
                        placeholder="Tell us about repetitive or manual tasks in your business. For example, follow ups, CRM updates, emails, approvals, or internal processes you want to run automatically."
                        className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all resize-none"
                      />
                    </div>

                    {/* Footer */}
                    <div className="pt-2 flex items-center justify-end gap-3">
                      <Button type="button" variant="ghost" onClick={() => setAutomationsModalOpen(false)} className="text-slate-400 hover:text-white">
                        Cancel
                      </Button>
                      <Button 
                        type="submit"
                        className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white px-6"
                      >
                        Send Request
                      </Button>
                    </div>
                    <p className="text-xs text-slate-500 text-right">Our team reviews every request and follows up when it makes sense.</p>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Text Agent Tier */}
          <div className="bg-background rounded-2xl p-8 border shadow-sm hover:shadow-md transition-all flex flex-col flex-shrink-0 w-[320px] snap-start">
            <div className="mb-6 min-h-[140px]">
              <h3 className="text-xl font-bold text-muted-foreground mb-2">Text Agents</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-sm text-muted-foreground">starting from</span>
                <span className="text-4xl font-bold">$1,000</span>
              </div>
              <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                Perfect for lead qualification and rapid response via SMS/Email.
              </p>
            </div>
            <Button className="w-full mb-8" variant="outline" onClick={() => setTextAgentModalOpen(true)}>Get Started</Button>
            <ul className="space-y-4 text-sm flex-1">
              <FeatureItem text="Email & SMS Automation" />
              <FeatureItem text="Instant Lead Response" />
              <FeatureItem text="CRM Integration" />
              <FeatureItem text="Includes RAG Knowledge Base" />
              <FeatureItem text="Standard Support" />
            </ul>
          </div>

          {/* Text Agent Selection Modal */}
          <AnimatePresence>
            {textAgentModalOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                onClick={() => setTextAgentModalOpen(false)}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.95 }}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full max-w-2xl bg-slate-900 border border-cyan-500/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                >
                  {/* Header */}
                  <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-5 border-b border-slate-700/50 flex justify-between items-center shrink-0">
                    <div>
                      <h3 className="text-xl font-bold text-white">Select Your Text Agents</h3>
                      <p className="text-sm text-slate-400 mt-1">Choose what you need now. Add more anytime.</p>
                    </div>
                    <button onClick={() => setTextAgentModalOpen(false)} className="text-slate-400 hover:text-white transition-colors p-1">
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Agent List */}
                  <div className="p-5 space-y-3 overflow-y-auto flex-1">
                    {TEXT_AGENTS.map(agent => {
                      const isSelected = !!selectedTextAgents[agent.id];
                      const qty = selectedTextAgents[agent.id] || 1;
                      return (
                        <div
                          key={agent.id}
                          onClick={() => toggleTextAgent(agent.id)}
                          className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                            isSelected 
                              ? 'bg-cyan-500/10 border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.15)]' 
                              : 'bg-slate-800/50 border-slate-700/50 hover:border-slate-600'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3">
                                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                                  isSelected ? 'bg-cyan-500 border-cyan-500' : 'border-slate-500'
                                }`}>
                                  {isSelected && <Check className="h-3 w-3 text-white" />}
                                </div>
                                <span className="font-medium text-white">{agent.name}</span>
                              </div>
                              <p className="text-sm text-slate-400 mt-1 ml-8">{agent.description}</p>
                            </div>
                            <div className="flex items-center gap-4">
                              {isSelected && (
                                <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                                  <button
                                    onClick={() => updateTextQuantity(agent.id, -1)}
                                    disabled={qty <= 1}
                                    className="w-7 h-7 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center text-white transition-colors"
                                  >
                                    <Minus className="h-3 w-3" />
                                  </button>
                                  <span className="w-6 text-center text-white font-medium">{qty}</span>
                                  <button
                                    onClick={() => updateTextQuantity(agent.id, 1)}
                                    className="w-7 h-7 rounded-lg bg-slate-700 hover:bg-slate-600 flex items-center justify-center text-white transition-colors"
                                  >
                                    <Plus className="h-3 w-3" />
                                  </button>
                                </div>
                              )}
                              <div className="text-right min-w-[100px]">
                                <span className="text-white font-semibold">${agent.monthly.toLocaleString()}</span>
                                <span className="text-slate-400 text-xs"> /mo</span>
                                <span className="text-slate-500 text-xs block">${agent.setup.toLocaleString()} setup</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Footer */}
                  <div className="p-5 border-t border-slate-700/50 bg-slate-800/50 shrink-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-baseline gap-4">
                          <div>
                            <span className="text-slate-500 text-xs uppercase tracking-wide">Setup (one-time)</span>
                            <div className="text-lg font-bold text-white">${textTotalSetup.toLocaleString()}</div>
                          </div>
                          <div>
                            <span className="text-slate-500 text-xs uppercase tracking-wide">Monthly</span>
                            <div className="text-lg font-bold text-white">${textTotalMonthly.toLocaleString()} <span className="text-sm font-normal text-slate-400">/ mo</span></div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button variant="ghost" onClick={() => setTextAgentModalOpen(false)} className="text-slate-400 hover:text-white">
                          Cancel
                        </Button>
                        <Button 
                          onClick={handleTextBuy}
                          disabled={textTotalMonthly === 0}
                          className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white px-8 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Buy
                        </Button>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 mt-2 text-right">Secure checkout via Stripe</p>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Voice Agent Tier */}
          <div className="bg-background rounded-2xl p-8 border shadow-sm hover:shadow-md transition-all flex flex-col flex-shrink-0 w-[320px] snap-start">
            <div className="mb-6 min-h-[140px]">
              <h3 className="text-xl font-bold text-muted-foreground mb-2">Voice Agents</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-sm text-muted-foreground">starting from</span>
                <span className="text-4xl font-bold">$1,200</span>
              </div>
              <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                Complete inbound/outbound handling with human-like conversation.
              </p>
            </div>
            <Button className="w-full mb-8" variant="outline" onClick={() => setVoiceAgentModalOpen(true)}>Get Started</Button>
            <ul className="space-y-4 text-sm flex-1">
              <FeatureItem text="Inbound & Outbound Calls" />
              <FeatureItem text="Natural Conversation" />
              <FeatureItem text="Includes RAG Knowledge Base" />
              <FeatureItem text="Call Recording & Transcripts" />
              <FeatureItem text="Priority Support" />
            </ul>
          </div>

          {/* Voice Agent Selection Modal */}
          <AnimatePresence>
            {voiceAgentModalOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                onClick={() => setVoiceAgentModalOpen(false)}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.95 }}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full max-w-2xl bg-slate-900 border border-cyan-500/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                >
                  {/* Header */}
                  <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-5 border-b border-slate-700/50 flex justify-between items-center shrink-0">
                    <div>
                      <h3 className="text-xl font-bold text-white">Select Your Voice Agents</h3>
                      <p className="text-sm text-slate-400 mt-1">Choose how your business handles real conversations.</p>
                    </div>
                    <button onClick={() => setVoiceAgentModalOpen(false)} className="text-slate-400 hover:text-white transition-colors p-1">
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Agent List */}
                  <div className="p-5 space-y-3 overflow-y-auto flex-1">
                    {VOICE_AGENTS.map(agent => {
                      const isSelected = !!selectedVoiceAgents[agent.id];
                      const qty = selectedVoiceAgents[agent.id] || 1;
                      return (
                        <div
                          key={agent.id}
                          onClick={() => toggleVoiceAgent(agent.id)}
                          className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                            isSelected 
                              ? 'bg-cyan-500/10 border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.15)]' 
                              : 'bg-slate-800/50 border-slate-700/50 hover:border-slate-600'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3">
                                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                                  isSelected ? 'bg-cyan-500 border-cyan-500' : 'border-slate-500'
                                }`}>
                                  {isSelected && <Check className="h-3 w-3 text-white" />}
                                </div>
                                <span className="font-medium text-white">{agent.name}</span>
                              </div>
                              <p className="text-sm text-slate-400 mt-1 ml-8">{agent.description}</p>
                            </div>
                            <div className="flex items-center gap-4">
                              {isSelected && (
                                <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                                  <button
                                    onClick={() => updateVoiceQuantity(agent.id, -1)}
                                    disabled={qty <= 1}
                                    className="w-7 h-7 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center text-white transition-colors"
                                  >
                                    <Minus className="h-3 w-3" />
                                  </button>
                                  <span className="w-6 text-center text-white font-medium">{qty}</span>
                                  <button
                                    onClick={() => updateVoiceQuantity(agent.id, 1)}
                                    className="w-7 h-7 rounded-lg bg-slate-700 hover:bg-slate-600 flex items-center justify-center text-white transition-colors"
                                  >
                                    <Plus className="h-3 w-3" />
                                  </button>
                                </div>
                              )}
                              <div className="text-right min-w-[100px]">
                                <span className="text-white font-semibold">${agent.monthly.toLocaleString()}</span>
                                <span className="text-slate-400 text-xs"> /mo</span>
                                <span className="text-slate-500 text-xs block">${agent.setup.toLocaleString()} setup</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Footer */}
                  <div className="p-5 border-t border-slate-700/50 bg-slate-800/50 shrink-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-baseline gap-4">
                          <div>
                            <span className="text-slate-500 text-xs uppercase tracking-wide">Setup (one-time)</span>
                            <div className="text-lg font-bold text-white">${voiceTotalSetup.toLocaleString()}</div>
                          </div>
                          <div>
                            <span className="text-slate-500 text-xs uppercase tracking-wide">Monthly</span>
                            <div className="text-lg font-bold text-white">${voiceTotalMonthly.toLocaleString()} <span className="text-sm font-normal text-slate-400">/ mo</span></div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button variant="ghost" onClick={() => setVoiceAgentModalOpen(false)} className="text-slate-400 hover:text-white">
                          Cancel
                        </Button>
                        <Button 
                          onClick={handleVoiceBuy}
                          disabled={voiceTotalMonthly === 0}
                          className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white px-8 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Buy
                        </Button>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 mt-2 text-right">Secure checkout via Stripe</p>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bundle Tier */}
          <div className="bg-slate-900 text-white rounded-2xl p-8 border-2 border-brand-teal shadow-xl relative flex flex-col overflow-hidden group hover:shadow-brand-teal/20 transition-all duration-500 flex-shrink-0 w-[320px] snap-start">
            <div className="absolute inset-0 bg-brand-gradient opacity-5 group-hover:opacity-10 transition-opacity duration-500" />
            <div className="absolute top-4 right-4 bg-slate-700/80 text-slate-300 text-[10px] font-medium px-2 py-0.5 rounded-full uppercase tracking-wide">
              Best Value
            </div>
            <div className="relative z-10 flex flex-col h-full">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-brand-teal mb-2">Full Stack Bundle</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-sm text-slate-400">starting from</span>
                  <span className="text-4xl font-bold">$3,000</span>
                </div>
                <p className="text-sm text-slate-300 mt-4">
                  Complete automation suite combining Voice, Text, and Custom integrations.
                </p>
              </div>
              <Button 
                onClick={() => setBundleModalOpen(true)}
                className="w-full mb-8 bg-brand-gradient hover:opacity-90 border-none text-white shadow-lg shadow-brand-teal/20 hover:shadow-brand-teal/40 transition-all"
              >
                Contact Sales
              </Button>
              <ul className="space-y-4 text-sm flex-1">
                <FeatureItem text="All Voice & Text Features" dark />
                <FeatureItem text="Includes RAG Knowledge Base" dark />
                <FeatureItem text="Custom N8N Workflows" dark />
                <FeatureItem text="Dedicated Account Manager" dark />
                <FeatureItem text="Priority Custom Development" dark />
              </ul>
            </div>
          </div>

          {/* Full Stack Bundle Modal */}
          <AnimatePresence>
            {bundleModalOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                onClick={() => setBundleModalOpen(false)}
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
                      <h3 className="text-xl font-bold text-white">Build Your Full Stack Agent System</h3>
                      <p className="text-sm text-slate-400 mt-2">Combine voice, text, and workflows into one system tailored to your operations—without unnecessary back-and-forth.</p>
                    </div>
                    <button onClick={() => setBundleModalOpen(false)} className="text-slate-400 hover:text-white transition-colors p-1 ml-4">
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleBundleSubmit} className="p-5 space-y-4 overflow-y-auto flex-1">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-slate-400 mb-1.5">Name *</label>
                        <input
                          type="text"
                          required
                          value={bundleForm.name}
                          onChange={(e) => setBundleForm(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-slate-400 mb-1.5">Last Name *</label>
                        <input
                          type="text"
                          required
                          value={bundleForm.last_name}
                          onChange={(e) => setBundleForm(prev => ({ ...prev, last_name: e.target.value }))}
                          className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-1.5">Email *</label>
                      <input
                        type="email"
                        required
                        value={bundleForm.email}
                        onChange={(e) => setBundleForm(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-1.5">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={bundleForm.phone_number}
                        onChange={(e) => setBundleForm(prev => ({ ...prev, phone_number: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-slate-400 mb-1.5">Company Name *</label>
                        <input
                          type="text"
                          required
                          value={bundleForm.company_name}
                          onChange={(e) => setBundleForm(prev => ({ ...prev, company_name: e.target.value }))}
                          className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-slate-400 mb-1.5">Industry *</label>
                        <input
                          type="text"
                          required
                          value={bundleForm.industry}
                          onChange={(e) => setBundleForm(prev => ({ ...prev, industry: e.target.value }))}
                          className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-1.5">What should AI handle for you? *</label>
                      <textarea
                        required
                        rows={3}
                        value={bundleForm.request}
                        onChange={(e) => setBundleForm(prev => ({ ...prev, request: e.target.value }))}
                        placeholder="Tell us what you want handled across voice, text, CRM, follow-ups, or workflows."
                        className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all resize-none"
                      />
                    </div>

                    {/* Footer */}
                    <div className="pt-2 flex items-center justify-end gap-3">
                      <Button type="button" variant="ghost" onClick={() => setBundleModalOpen(false)} className="text-slate-400 hover:text-white">
                        Cancel
                      </Button>
                      <Button 
                        type="submit"
                        className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white px-6"
                      >
                        Send Request
                      </Button>
                    </div>
                    <p className="text-xs text-slate-500 text-right">Our team will review your request and reach out with next steps.</p>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Custom-made AI Agent Tier */}
          <div className="bg-background rounded-2xl p-8 border shadow-sm hover:shadow-md transition-all flex flex-col flex-shrink-0 w-[320px] snap-start">
            <div className="mb-6 min-h-[140px]">
              <h3 className="text-xl font-bold text-muted-foreground mb-2">Custom-made AI Agent</h3>
              <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                Tell us what you need. We'll scope it with you and propose the right solution.
              </p>
            </div>
            <Button className="w-full mb-8" variant="outline" onClick={() => setCustomModalOpen(true)}>Describe Your Idea</Button>
            <ul className="space-y-4 text-sm flex-1">
              <FeatureItem text="Tailored to Your Workflow" />
              <FeatureItem text="Voice, Text, or Both" />
              <FeatureItem text="Custom Integrations" />
              <FeatureItem text="Scoped Pricing Based on Need" />
              <FeatureItem text="Dedicated Support" />
            </ul>
          </div>

          {/* Custom Agent Modal */}
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
                      <h3 className="text-xl font-bold text-white">Let's Build What You Actually Need</h3>
                      <p className="text-sm text-slate-400 mt-2">Share your goal and we'll recommend the best agent setup—then price it based on scope.</p>
                    </div>
                    <button onClick={() => setCustomModalOpen(false)} className="text-slate-400 hover:text-white transition-colors p-1 ml-4">
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleCustomSubmit} className="p-5 space-y-4 overflow-y-auto flex-1">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-slate-400 mb-1.5">Name *</label>
                        <input
                          type="text"
                          required
                          value={customForm.name}
                          onChange={(e) => setCustomForm(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-slate-400 mb-1.5">Last Name *</label>
                        <input
                          type="text"
                          required
                          value={customForm.last_name}
                          onChange={(e) => setCustomForm(prev => ({ ...prev, last_name: e.target.value }))}
                          className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-1.5">Email *</label>
                      <input
                        type="email"
                        required
                        value={customForm.email}
                        onChange={(e) => setCustomForm(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-1.5">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={customForm.phone_number}
                        onChange={(e) => setCustomForm(prev => ({ ...prev, phone_number: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-slate-400 mb-1.5">Company Name *</label>
                        <input
                          type="text"
                          required
                          value={customForm.company_name}
                          onChange={(e) => setCustomForm(prev => ({ ...prev, company_name: e.target.value }))}
                          className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-slate-400 mb-1.5">Industry *</label>
                        <input
                          type="text"
                          required
                          value={customForm.industry}
                          onChange={(e) => setCustomForm(prev => ({ ...prev, industry: e.target.value }))}
                          className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-1.5">What do you want the AI agent to do? *</label>
                      <textarea
                        required
                        rows={3}
                        value={customForm.request}
                        onChange={(e) => setCustomForm(prev => ({ ...prev, request: e.target.value }))}
                        placeholder="Describe the outcome you want. Include channels (text/voice), integrations (CRM), and any workflows."
                        className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all resize-none"
                      />
                    </div>

                    {/* Footer */}
                    <div className="pt-2 flex items-center justify-end gap-3">
                      <Button type="button" variant="ghost" onClick={() => setCustomModalOpen(false)} className="text-slate-400 hover:text-white">
                        Cancel
                      </Button>
                      <Button 
                        type="submit"
                        className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white px-6"
                      >
                        Request a Quote
                      </Button>
                    </div>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Feature Comparison Table */}
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-3 text-center">Compare Features</h2>
          <p className="text-center text-muted-foreground mb-10">Different tools solve different problems. Most businesses end up needing both.</p>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left py-4 px-6 bg-muted/30 rounded-tl-lg font-semibold text-muted-foreground w-1/3">Feature</th>
                  <th className="py-4 px-6 bg-muted/30 font-semibold text-center">Text Agent</th>
                  <th className="py-4 px-6 bg-muted/30 font-semibold text-center">Voice Agent</th>
                  <th className="py-4 px-6 bg-muted/30 rounded-tr-lg font-semibold text-center relative">
                    <span className="text-brand-teal">Bundle</span>
                    <span className="block text-[10px] uppercase tracking-wider text-slate-500 font-normal mt-1">Designed for real operations</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <TableRow feature="Voice Capabilities" starter={false} pro="Handles real phone conversations" custom="Uses voice when conversation matters" highlight />
                <TableRow feature="Conversational Context" tooltip="Context is not stored or reused across different conversations" starter="Within active chat session" pro="Within active call" custom="Preserved per interaction" highlight />
                <TableRow feature="SMS & Email Automation" starter="Ideal for notifications & follow-ups" pro="Limited" custom="Text for consistency, voice for conversation" highlight />
                <TableRow feature="CRM Two-Way Sync" tooltip="CRM integration depends on the type of CRM used and must be reviewed and validated during setup." starter={true} pro={true} custom={true} highlight />
                <TableRow feature="Client Data Usage" starter={true} pro={true} custom={true} highlight />
                <TableRow feature="Inbound Handling" starter="Messages and written requests" pro="Answers phone calls automatically" custom={true} highlight />
                <TableRow feature="Outbound Engagement" starter="Reminders and written follow-ups" pro="Qualification and conversations" custom={true} highlight />
                <TableRow feature="Outbound Dialing" starter={false} pro={true} custom={true} highlight />
                <TableRow feature="Lead Qualification" starter="Quick, structured via messaging" pro="Deeper through live conversation" custom="Matches depth to channel" highlight />
                <TableRow feature="Decision Handling" starter="Executes based on rules" pro="Adjusts dynamically during calls" custom="Adapts to interaction type" highlight />
                <TableRow feature="Human Interaction Style" starter="Clear, concise, professional" pro="Natural, conversational" custom="Interact the way you prefer" highlight />
                <TableRow feature="Use-Case Alignment" starter="Quick answers and status checks" pro="Discussions and clarifications" custom="Covers both channels" highlight />
                <TableRow feature="Availability" starter={true} pro={true} custom={true} highlight />
                <TableRow feature="Knowledge Base (RAG)" starter={true} pro={true} custom={true} highlight />
                <TableRow feature="Workflow Automation" starter={true} pro={true} custom={true} highlight />
                <TableRow feature="Experience Control" starter="Predictable and consistent" pro="Flexible and adaptive" custom="Balanced across channels" highlight />
                <TableRow feature="Scalability" starter={true} pro={true} custom={true} highlight />
                <TableRow feature="Dedicated Development" starter={false} pro={false} custom="Priority customization support" highlight />
                <TableRow feature="Best Fit" starter="Speed and efficiency focused" pro="Conversation and trust focused" custom="Businesses that need both" highlight />
                <TableRow 
                  feature="Setup Time" 
                  tooltip="Time from contract to live deployment. Includes agent configuration, knowledge base setup, CRM connections, and testing."
                  starter="5–10 Business Days" 
                  pro="5–10 Business Days" 
                  custom="Varies" 
                  highlight
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ text, dark = false }: { text: string, dark?: boolean }) {
  return (
    <li className="flex items-center gap-3">
      <div className={`rounded-full p-0.5 ${dark ? "bg-primary/20 text-primary" : "bg-green-100 text-green-600"}`}>
        <Check className="h-3 w-3" />
      </div>
      <span className={dark ? "text-slate-300" : "text-foreground"}>{text}</span>
    </li>
  );
}

function TableRow({ feature, tooltip, starter, pro, custom, highlight }: { feature: string, tooltip?: string, starter: boolean | string, pro: boolean | string, custom: boolean | string, highlight?: boolean }) {
  return (
    <tr className="hover:bg-muted/10 transition-colors">
      <td className="py-4 px-6 text-sm font-medium flex items-center gap-2">
        {feature}
        {tooltip && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="h-4 w-4 text-muted-foreground/50 hover:text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </td>
      <td className="py-4 px-6 text-center text-sm">
        <StatusIndicator value={starter} />
      </td>
      <td className="py-4 px-6 text-center text-sm">
        <StatusIndicator value={pro} />
      </td>
      <td className={`py-4 px-6 text-center text-sm ${highlight ? 'bg-brand-teal/5 border-l border-brand-teal/20' : ''}`}>
        <StatusIndicator value={custom} />
      </td>
    </tr>
  );
}

function StatusIndicator({ value }: { value: boolean | string }) {
  if (typeof value === "string") {
    if (value === "") {
      return <span></span>;
    }
    return <span className="font-medium">{value}</span>;
  }
  return value ? (
    <div className="flex justify-center">
      <div className="rounded-full bg-primary/10 p-1 text-primary">
        <Check className="h-4 w-4" />
      </div>
    </div>
  ) : (
    <div className="flex justify-center">
      <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/20" />
    </div>
  );
}
