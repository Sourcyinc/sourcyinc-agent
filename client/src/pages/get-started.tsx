import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, Send, X, MessageCircle, Clock, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import logo from "@assets/favi_1763705012744.png";

interface Message {
  id: number;
  sender: "agent" | "user";
  text: string;
}

export default function GetStarted() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Generate a unique chat session ID
  const generateChatId = (): string => {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}-${Math.random().toString(36).substring(2, 15)}`;
  };

  // Get or create chat ID from localStorage
  const getOrCreateChatId = (): string => {
    const STORAGE_KEY = "sourcy_chat_session_id";
    let chatId = localStorage.getItem(STORAGE_KEY);
    if (!chatId) {
      chatId = generateChatId();
      localStorage.setItem(STORAGE_KEY, chatId);
    }
    return chatId;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

  useEffect(() => {
    if (chatOpen && messages.length === 0) {
      setIsTyping(true);
      setTimeout(() => {
        setMessages([
          {
            id: 1,
            sender: "agent",
            text: "Hi there! 👋 I'm Mr. Sourcy, your AI solutions guide."
          }
        ]);
        setIsTyping(false);
        setTimeout(() => {
          setIsTyping(true);
          setTimeout(() => {
            setMessages(prev => [...prev, {
              id: 2,
              sender: "agent",
              text: "I help businesses understand where AI can remove friction, save time, and improve how things run across text, voice, workflows, and internal systems. To get started, tell me a bit about what you're trying to improve or simplify in your business right now."
            }]);
            setIsTyping(false);
          }, 1500);
        }, 500);
      }, 1000);
    }
  }, [chatOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    const userMessage: Message = {
      id: messages.length + 1,
      sender: "user",
      text: inputValue
    };
    
    setMessages(prev => [...prev, userMessage]);
    const messageText = inputValue;
    setInputValue("");
    
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
        setMessages(prev => [...prev, {
          id: prev.length + 1,
          sender: "agent",
          text: data.response || data.message || "Thanks for your message! Our team will get back to you shortly."
        }]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        sender: "agent",
        text: "Sorry, there was an error sending your message. Please try again."
      }]);
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        background: `
          linear-gradient(135deg, rgba(0, 217, 255, 0.15) 0%, transparent 50%, rgba(0, 255, 163, 0.1) 100%),
          radial-gradient(ellipse at center, rgba(0, 200, 200, 0.1) 0%, transparent 60%),
          #020617
        `
      }}
    >
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          background: `
            radial-gradient(ellipse at 30% 20%, rgba(6, 182, 212, 0.2) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, rgba(20, 184, 166, 0.15) 0%, transparent 50%)
          `
        }}
      />

      <Link href="/">
        <a className="absolute top-8 left-1/2 -translate-x-1/2 z-20 cursor-pointer hover:opacity-90 transition-opacity group" data-testid="link-home-logo">
          <div className="flex items-center gap-3">
            <img 
              src={logo} 
              alt="Sourcy" 
              className="h-12 w-auto object-contain transition-transform group-hover:scale-105" 
            />
            <span className="font-heading font-bold text-2xl tracking-tight text-brand-gradient">
              Sourcy
            </span>
          </div>
        </a>
      </Link>

      <div className="relative z-10 flex flex-col items-center px-6 max-w-2xl mx-auto text-center pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            See how AI agents can actually help your business{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
              run smoother
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xl text-slate-300 mb-12 max-w-xl leading-relaxed"
        >
          Let's remove the busywork that slows your business down, so your team can focus on what truly matters.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-8 shadow-2xl shadow-cyan-500/10 border border-cyan-500/20 mb-12 w-full max-w-md"
        >
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-500/20 to-teal-500/20 flex items-center justify-center flex-shrink-0 border border-cyan-500/30">
                <MessageCircle className="h-5 w-5 text-cyan-400" />
              </div>
              <span className="text-base text-slate-200 leading-relaxed pt-2">We'll ask a few focused questions to understand your business</span>
            </div>
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-500/20 to-teal-500/20 flex items-center justify-center flex-shrink-0 border border-cyan-500/30">
                <Sparkles className="h-5 w-5 text-cyan-400" />
              </div>
              <span className="text-base text-slate-200 leading-relaxed pt-2">You'll have space to explain your challenges and AI would help you</span>
            </div>
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-500/20 to-teal-500/20 flex items-center justify-center flex-shrink-0 border border-cyan-500/30">
                <CheckCircle2 className="h-5 w-5 text-cyan-400" />
              </div>
              <span className="text-base text-slate-200 leading-relaxed pt-2">Our team reviews every request and reaches out when it makes sense</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col items-center"
        >
          <div className="mb-8">
            <div className="relative">
              <div className="h-24 w-24 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 p-1 shadow-xl shadow-cyan-500/30">
                <div className="h-full w-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
                  <Sparkles className="h-10 w-10 text-cyan-400" />
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-emerald-500 rounded-full border-3 border-slate-900 shadow-lg" />
            </div>
            <p className="mt-4 text-white font-semibold text-lg">Mr. Sourcy</p>
          </div>

          <Button
            onClick={() => setChatOpen(true)}
            className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white px-12 py-6 rounded-full text-xl font-bold shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105 border-0"
            data-testid="button-start-conversation"
          >
            Start Conversation
            <ArrowRight className="ml-3 h-6 w-6" />
          </Button>

          <p className="mt-5 text-base text-slate-400">
            No commitment. Just clarity.
          </p>
        </motion.div>
      </div>

      <div className="absolute bottom-8 text-slate-500 text-sm">
        Powered by <span className="font-semibold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">Sourcy</span>
      </div>

      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(2, 6, 23, 0.85)", backdropFilter: "blur(8px)" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-lg bg-slate-900 rounded-2xl shadow-2xl shadow-cyan-500/20 overflow-hidden flex flex-col border border-cyan-500/20"
              style={{ maxHeight: "85vh" }}
            >
              <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-5 flex items-center justify-between border-b border-cyan-500/20">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 p-0.5">
                    <div className="h-full w-full rounded-full bg-slate-800 flex items-center justify-center">
                      <Sparkles className="h-6 w-6 text-cyan-400" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">Mr. Sourcy</h4>
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 bg-emerald-500 rounded-full animate-pulse" />
                      <span className="text-sm text-slate-400">Online now</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setChatOpen(false)} 
                  className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-800 rounded-lg"
                  data-testid="button-close-chat"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-950/50" style={{ minHeight: "350px" }}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.sender === "agent" && (
                      <div className="h-9 w-9 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 p-0.5 mr-3 flex-shrink-0">
                        <div className="h-full w-full rounded-full bg-slate-800 flex items-center justify-center">
                          <Sparkles className="h-4 w-4 text-cyan-400" />
                        </div>
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                        msg.sender === "user"
                          ? "bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-br-md"
                          : "bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-md"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 p-0.5 mr-3 flex-shrink-0">
                      <div className="h-full w-full rounded-full bg-slate-800 flex items-center justify-center">
                        <Sparkles className="h-4 w-4 text-cyan-400" />
                      </div>
                    </div>
                    <div className="bg-slate-800 text-slate-400 px-4 py-3 rounded-2xl rounded-bl-md border border-slate-700">
                      <div className="flex gap-1.5">
                        <div className="h-2 w-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <div className="h-2 w-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <div className="h-2 w-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              <div className="p-5 bg-slate-900 border-t border-cyan-500/20">
                <div className="flex gap-3 items-end">
                  <Textarea
                    ref={textareaRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your message... (Press Enter for new line)"
                    className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors resize-none overflow-hidden min-h-[48px] max-h-[120px] leading-relaxed"
                    rows={1}
                    data-testid="input-chat-message"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white px-5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all border-0 h-12 shrink-0"
                    data-testid="button-send-message"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
                <p className="text-xs text-slate-500 mt-3 text-center">
                  Press <kbd className="px-1.5 py-0.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-300 rounded">Enter</kbd> for a new line, click the send button to send your message
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
