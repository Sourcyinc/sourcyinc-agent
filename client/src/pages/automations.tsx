import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useState } from "react";
import { 
  CheckCircle2, ArrowRight, Zap, Settings, RefreshCw, Mail, CalendarCheck, 
  CreditCard, Bell, MessageSquare, Inbox, Brain, Clock, AlertCircle,
  Send, Users, FileText, ChevronRight, Sparkles, Target, TrendingUp,
  Shield, Heart, Eye, Search, Workflow, X
} from "lucide-react";

const manualWork = [
  { icon: <Inbox className="h-5 w-5" />, text: "People checking inboxes" },
  { icon: <Brain className="h-5 w-5" />, text: "Someone remembering to follow up" },
  { icon: <Search className="h-5 w-5" />, text: "Tasks being chased" },
  { icon: <AlertCircle className="h-5 w-5" />, text: "Things falling through the cracks" }
];

const automatedWork = [
  { icon: <Zap className="h-5 w-5" />, text: "Systems responding instantly" },
  { icon: <RefreshCw className="h-5 w-5" />, text: "Information moving on its own" },
  { icon: <Send className="h-5 w-5" />, text: "Follow ups happening automatically" },
  { icon: <Shield className="h-5 w-5" />, text: "Nothing getting forgotten" }
];

const examples = [
  {
    icon: <FileText className="h-6 w-6" />,
    trigger: "Form submitted",
    result: "Personalized email sent + team notified",
    theme: "cyan"
  },
  {
    icon: <Users className="h-6 w-6" />,
    trigger: "New lead enters CRM",
    result: "Follow up messages go out automatically",
    theme: "emerald"
  },
  {
    icon: <Mail className="h-6 w-6" />,
    trigger: "Proposal sent",
    result: "Reminders follow up if no response",
    theme: "amber"
  },
  {
    icon: <CreditCard className="h-6 w-6" />,
    trigger: "Payment overdue",
    result: "Polite reminders sent automatically",
    theme: "purple"
  },
  {
    icon: <CalendarCheck className="h-6 w-6" />,
    trigger: "Call booked",
    result: "Confirmations and notifications happen instantly",
    theme: "blue"
  }
];

const benefits = [
  { icon: <Shield className="h-6 w-6" />, text: "Fewer things fall through the cracks", color: "cyan" },
  { icon: <Clock className="h-6 w-6" />, text: "Faster response times without extra staff", color: "emerald" },
  { icon: <Target className="h-6 w-6" />, text: "Consistent execution every time", color: "purple" },
  { icon: <Heart className="h-6 w-6" />, text: "Less stress for your team", color: "amber" },
  { icon: <TrendingUp className="h-6 w-6" />, text: "More time focused on decisions and growth", color: "blue" }
];

const steps = [
  { number: "01", title: "Understand", desc: "How your business currently works" },
  { number: "02", title: "Identify", desc: "Where things slow down or get forgotten" },
  { number: "03", title: "Decide", desc: "What should happen automatically versus manually" },
  { number: "04", title: "Design", desc: "Systems that fit your workflows, tools, and goals" }
];

const getThemeColors = (theme: string) => {
  const themes: Record<string, { bg: string; border: string; text: string; glow: string }> = {
    cyan: { bg: "bg-cyan-500/10", border: "border-cyan-500/30", text: "text-cyan-400", glow: "shadow-cyan-500/20" },
    emerald: { bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-400", glow: "shadow-emerald-500/20" },
    amber: { bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-400", glow: "shadow-amber-500/20" },
    purple: { bg: "bg-purple-500/10", border: "border-purple-500/30", text: "text-purple-400", glow: "shadow-purple-500/20" },
    blue: { bg: "bg-blue-500/10", border: "border-blue-500/30", text: "text-blue-400", glow: "shadow-blue-500/20" }
  };
  return themes[theme] || themes.cyan;
};

export default function Automations() {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    company_name: "",
    industry: "",
    automation_request: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      source: "automations_page",
      ...formData
    };
    console.log("Automation request payload:", payload);
    alert("Request submitted! Our team will review and follow up when it makes sense.");
    setModalOpen(false);
    setFormData({ first_name: "", last_name: "", email: "", phone_number: "", company_name: "", industry: "", automation_request: "" });
  };

  return (
    <div 
      className="min-h-screen bg-slate-950 text-white pb-24 relative selection:bg-cyan-500/30 overflow-hidden"
      style={{
        background: `
          linear-gradient(135deg, rgba(0, 217, 255, 0.15) 0%, transparent 50%, rgba(0, 255, 163, 0.1) 100%),
          radial-gradient(ellipse at center, rgba(0, 200, 200, 0.1) 0%, transparent 60%),
          #020617
        `
      }}
    >
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-20 left-10 h-64 w-64 bg-cyan-500/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute top-40 right-20 h-48 w-48 bg-teal-500/5 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-40 left-1/4 h-56 w-56 bg-emerald-500/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="container mx-auto relative z-10 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-sm font-medium mb-8 backdrop-blur-md">
              <motion.span 
                className="relative flex h-2 w-2"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </motion.span>
              Smart Automations
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-heading text-white drop-shadow-2xl" data-testid="text-automations-headline">
              Automations that quietly run your <br />
              <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">business in the background</span>
            </h1>
            
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-4">
              We build smart systems that move information, trigger actions, and keep things running without you having to think about them.
            </p>
            
            <p className="text-lg text-slate-500 italic max-w-2xl mx-auto">
              If something happens the same way every time, it should not require your attention.
            </p>

            {/* Floating Icons Animation */}
            <div className="relative h-20 mt-8">
              <motion.div
                className="absolute left-1/4 top-0"
                animate={{ y: [0, -10, 0], opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0 }}
              >
                <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <RefreshCw className="h-5 w-5" />
                </div>
              </motion.div>
              <motion.div
                className="absolute left-1/2 top-2 -translate-x-1/2"
                animate={{ y: [0, -8, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
              >
                <div className="h-12 w-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                  <Workflow className="h-6 w-6" />
                </div>
              </motion.div>
              <motion.div
                className="absolute right-1/4 top-0"
                animate={{ y: [0, -12, 0], opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
              >
                <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Zap className="h-5 w-5" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        
        {/* What Are Automations - Visual Comparison */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">
              What do we mean by automations?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Manual Work Side */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative p-8 rounded-3xl bg-slate-900/50 border border-red-500/20 backdrop-blur-sm"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-bl-full -mr-8 -mt-8" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                    <AlertCircle className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold text-red-300">Manual work looks like</h3>
                </div>
                <div className="space-y-4">
                  {manualWork.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-4 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50"
                    >
                      <div className="text-red-400/60">{item.icon}</div>
                      <span className="text-slate-400">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Automated Work Side */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative p-8 rounded-3xl bg-slate-900/50 border border-emerald-500/20 backdrop-blur-sm"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-full -mr-8 -mt-8" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold text-emerald-300">Automations look like</h3>
                </div>
                <div className="space-y-4">
                  {automatedWork.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-4 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20"
                    >
                      <div className="text-emerald-400">{item.icon}</div>
                      <span className="text-slate-300">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-10 text-center"
          >
            <p className="text-slate-400 text-lg">Automations do not replace your team.</p>
            <p className="text-white font-medium text-xl mt-2">
              They support your team by handling the boring, repetitive, easy to forget work.
            </p>
          </motion.div>
        </motion.section>

        {/* Real Examples - Card Grid */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">
              Examples you can instantly relate to
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {examples.map((example, i) => {
              const colors = getThemeColors(example.theme);
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  className={`relative p-6 rounded-2xl bg-slate-900/50 border ${colors.border} backdrop-blur-sm group transition-all duration-300 hover:shadow-lg ${colors.glow}`}
                >
                  <div className={`h-12 w-12 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center ${colors.text} mb-4 group-hover:scale-110 transition-transform`}>
                    {example.icon}
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${colors.bg} ${colors.text} border ${colors.border}`}>
                        Trigger
                      </span>
                      <span className="text-white font-medium">{example.trigger}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-slate-500">
                      <ChevronRight className="h-4 w-4" />
                      <ChevronRight className="h-4 w-4 -ml-2" />
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                        Result
                      </span>
                      <span className="text-slate-300">{example.result}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-12 text-center bg-slate-900/30 border border-slate-700/50 rounded-2xl p-6"
          >
            <p className="text-slate-400 mb-2">The key idea:</p>
            <p className="text-xl text-white font-medium">
              Things move forward without someone needing to push every button manually.
            </p>
          </motion.div>
        </motion.section>

        {/* Why This Matters - Benefits */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Why this matters for your business
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            {benefits.map((benefit, i) => {
              const colors = getThemeColors(benefit.color);
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className={`p-6 rounded-2xl bg-slate-900/50 border ${colors.border} backdrop-blur-sm text-center group transition-all`}
                >
                  <div className={`h-14 w-14 rounded-2xl ${colors.bg} border ${colors.border} flex items-center justify-center ${colors.text} mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    {benefit.icon}
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">{benefit.text}</p>
                </motion.div>
              );
            })}
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-slate-400 text-lg">Automation is not about doing more work.</p>
            <p className="text-white font-medium text-xl mt-2">It is about removing unnecessary work.</p>
          </motion.div>
        </motion.section>

        {/* How We Build - Process Steps */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              How we build automations
            </h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-700/50 backdrop-blur-sm h-full group hover:border-cyan-500/30 transition-all">
                  <div className="text-5xl font-bold text-cyan-500/20 group-hover:text-cyan-500/40 transition-colors mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-slate-400">{step.desc}</p>
                </div>
                
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ChevronRight className="h-6 w-6 text-slate-600" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-slate-400">Some automations are simple. Some are complex.</p>
            <p className="text-white font-medium text-xl mt-2">All of them are built intentionally.</p>
          </motion.div>
        </motion.section>

        {/* Automations + AI Agents */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
              Automations and AI agents work together
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="relative p-8 rounded-3xl bg-slate-900/50 border border-cyan-500/30 backdrop-blur-sm overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 rounded-bl-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500" />
              <div className="relative z-10">
                <div className="h-16 w-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6">
                  <Settings className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Automations</h3>
                <div className="space-y-3">
                  {["Handle structured, rule based tasks", "Move information reliably between systems", "Follow predefined workflows"].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-cyan-400 flex-shrink-0" />
                      <span className="text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="relative p-8 rounded-3xl bg-slate-900/50 border border-purple-500/30 backdrop-blur-sm overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 rounded-bl-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500" />
              <div className="relative z-10">
                <div className="h-16 w-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-6">
                  <Brain className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">AI Agents</h3>
                <div className="space-y-3">
                  {["Handle conversations and decisions", "Adapt to context", "Respond intelligently"].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-purple-400 flex-shrink-0" />
                      <span className="text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-10 text-center bg-slate-900/30 border border-slate-700/50 rounded-2xl p-6"
          >
            <p className="text-slate-400 mb-2">Sometimes they work independently. Sometimes they work together.</p>
            <p className="text-white font-medium text-lg">
              The goal is not technology for the sake of technology.<br />
              The goal is smoother operations and less friction across your business.
            </p>
          </motion.div>
        </motion.section>

        {/* Talk to Our Team CTA */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">
              Talk to Our Team
            </h2>
          </div>

          <div className="group relative rounded-3xl p-1 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 opacity-30 group-hover:opacity-60 transition-opacity duration-500 rounded-3xl" />
            
            <div className="relative bg-slate-900 rounded-[22px] p-8 md:p-16 overflow-hidden text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 to-slate-950/50" />
              
              <motion.div 
                className="absolute -right-24 -top-24 h-64 w-64 bg-cyan-500/10 rounded-full blur-3xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div 
                className="absolute -left-24 -bottom-24 h-64 w-64 bg-teal-500/10 rounded-full blur-3xl"
                animate={{ scale: [1.2, 1, 1.2] }}
                transition={{ duration: 5, repeat: Infinity }}
              />
              
              <div className="relative z-10 max-w-2xl mx-auto">
                <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                  Ready to remove friction from your operations?
                </h3>
                <p className="text-slate-400 text-lg mb-8">
                  See how smart systems can quietly support your business every day.
                </p>
                
                <Button 
                  size="lg"
                  onClick={() => setModalOpen(true)}
                  data-testid="button-explore-automations-cta"
                  className="py-6 px-12 text-lg rounded-full text-white shadow-[0_10px_25px_-5px_rgba(6,182,212,0.3)] hover:scale-105 hover:shadow-[0_10px_25px_-5px_rgba(6,182,212,0.5)] transition-all border-0"
                  style={{ background: 'linear-gradient(to right, #06b6d4, #2dd4bf)' }}
                >
                  Explore Automations
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                <p className="text-sm text-slate-500 mt-6">
                  Talk to us about your workflows
                </p>
              </div>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Automations Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
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
                <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white transition-colors p-1 ml-4">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto flex-1">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-1.5">First Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.first_name}
                      onChange={(e) => setFormData(prev => ({ ...prev, first_name: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
                      data-testid="input-first-name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-1.5">Last Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.last_name}
                      onChange={(e) => setFormData(prev => ({ ...prev, last_name: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
                      data-testid="input-last-name"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1.5">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
                    data-testid="input-email"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1.5">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone_number}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone_number: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
                    data-testid="input-phone"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-1.5">Company Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.company_name}
                      onChange={(e) => setFormData(prev => ({ ...prev, company_name: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
                      data-testid="input-company"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-1.5">Industry *</label>
                    <input
                      type="text"
                      required
                      value={formData.industry}
                      onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
                      data-testid="input-industry"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1.5">What should we automate for you? *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.automation_request}
                    onChange={(e) => setFormData(prev => ({ ...prev, automation_request: e.target.value }))}
                    placeholder="Tell us about the repetitive or manual tasks in your business. For example, follow ups, internal notifications, CRM updates, emails, or processes you wish ran automatically."
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all resize-none"
                    data-testid="input-automation-request"
                  />
                </div>

                {/* Footer */}
                <div className="pt-2 flex items-center justify-end gap-3">
                  <Button type="button" variant="ghost" onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    data-testid="button-send-request"
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
    </div>
  );
}
