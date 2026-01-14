import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import logo from "@assets/favi_1763705012744.png";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll to top on route change (for header navigation)
  useEffect(() => {
    // Don't scroll to top if there's a query param (deep links from footer)
    if (!window.location.search) {
      window.scrollTo(0, 0);
    }
  }, [location]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/agents", label: "Agents" },
    { href: "/automations", label: "Automations" },
    { href: "/pricing", label: "Pricing" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-foreground">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-md supports-[backdrop-filter]:bg-slate-950/60">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity group">
            <img 
              src={logo} 
              alt="Sourcy" 
              className="h-10 w-auto object-contain transition-transform group-hover:scale-105" 
            />
            <span className="font-heading font-bold text-2xl tracking-tight text-brand-gradient">Sourcy</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-cyan-400 relative py-1",
                  location === link.href ? "text-cyan-400" : "text-slate-300"
                )}
              >
                {link.label}
                {location === link.href && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 right-0 bottom-0 h-0.5 bg-brand-gradient"
                  />
                )}
              </Link>
            ))}
            <Link href="/get-started">
              <Button size="sm" className="font-semibold bg-brand-gradient hover:opacity-90 border-0 shadow-lg shadow-brand-teal/20 hover:shadow-brand-teal/40 transition-all hover:-translate-y-0.5">
                Get Started
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-slate-300 hover:text-cyan-400 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-background p-4 flex flex-col gap-4 animate-in slide-in-from-top-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium p-2 rounded-md transition-colors hover:bg-muted",
                  location === link.href ? "text-brand-teal bg-primary/5" : "text-foreground"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/get-started" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full bg-brand-gradient border-0">Get Started</Button>
            </Link>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700/50" style={{ background: "linear-gradient(to bottom, #1e293b 0%, rgba(46, 16, 101, 0.15) 50%, #0f172a 100%)" }}>
        <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="block">
              <img 
                src={logo} 
                alt="Sourcy" 
                className="h-8 w-auto object-contain opacity-80 grayscale hover:grayscale-0 transition-all" 
              />
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Empowering businesses with intelligent AI agents. Automate conversations, workflows, and decision making at scale.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Products</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/agents?tab=voice" className="hover:text-teal-400 transition-colors">Voice Agents</Link></li>
              <li><Link href="/agents?tab=text" className="hover:text-teal-400 transition-colors">Text Agents</Link></li>
              <li><Link href="/automations" className="hover:text-teal-400 transition-colors">Automations</Link></li>
              <li><Link href="/agents?section=custom" className="hover:text-teal-400 transition-colors">Custom Solutions</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/pricing" className="hover:text-teal-400 transition-colors">Pricing</Link></li>
              <li><Link href="/contact" className="hover:text-teal-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>Florida, USA</li>
              <li>innovation.ia@sourcyinc.com</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800/50 py-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Sourcy. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

