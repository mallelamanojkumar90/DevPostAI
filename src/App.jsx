import React, { useState, useEffect } from "react";
import {
  Github,
  Send,
  Linkedin,
  Twitter,
  MessageCircle,
  Copy,
  Check,
  Sparkles,
  Rocket,
  Brain,
  Code,
  ArrowUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { fetchRepoDetails } from "./services/github";

const DevPostAI = () => {
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [error, setError] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Refs for navigation sections
  const inputRef = React.useRef(null);
  const howItWorksRef = React.useRef(null);
  const aboutRef = React.useRef(null);

  const analyzeRepo = async (e) => {
    e.preventDefault();
    if (!repoUrl) return;

    setLoading(true);
    setError("");

    try {
      const details = await fetchRepoDetails(repoUrl);
      if (!details) {
        throw new Error(
          "Could not fetch repository details. Please check the URL."
        );
      }

      // Generate professional developer-focused content
      const techStack = details.techStack.slice(0, 5);
      const coreTech = details.techStack.slice(0, 3).join(" • ");
      const name = details.name;
      const type = details.projectType;
      const stats = details.stats;

      // === LINKEDIN POST - Professional Technical Update ===
      const linkedinFeatures = details.features.slice(0, 3).map(f => `• ${f}`).join('\n');

      // Add stats if significant
      let statsLine = '';
      if (stats.stars > 10 || stats.forks > 5) {
        statsLine = `\n⭐ ${stats.stars} stars • 🔀 ${stats.forks} forks`;
      }

      const linkedinPost = `Just pushed some updates to ${name} — sharing what I learned building this ${type.toLowerCase()}.

📋 Technical Overview:
${linkedinFeatures}

🔧 Tech Stack:
${techStack.slice(0, 4).join(' • ')}

💡 Key Learnings:
${details.insights.slice(0, 2).map(i => `• ${i}`).join('\n')}
${statsLine}

The codebase is open source — contributions and feedback welcome.

Repository: ${repoUrl}

#SoftwareDevelopment #OpenSource #${techStack[0]?.replace(/[^a-zA-Z]/g, "") || "Engineering"} #DeveloperTools`;

      // === TWITTER/X POST - Concise Technical Update ===
      const primaryUseCase = details.useCases[0] || details.description || "streamlining development workflows";
      const twitterFeatures = details.features.slice(0, 2).map(f => `→ ${f}`).join('\n');

      const twitterPost = `Built ${name} — a ${type.toLowerCase()} for ${primaryUseCase.toLowerCase()}.

Tech stack:
${coreTech}

Key features:
${twitterFeatures}

Open source ↓
${repoUrl}

#coding #opensource #buildinpublic`;

      // === WHATSAPP POST - Casual but Professional ===
      const whatsappFeatures = details.features.slice(0, 2).map(f => `✓ ${f}`).join('\n');

      const whatsappPost = `Hey! Wanted to share ${name} — been working on this ${type.toLowerCase()}.

Built with: ${coreTech}

Main features:
${whatsappFeatures}

${details.description ? `\n${details.description}\n` : ''}Check it out: ${repoUrl}

Let me know what you think!`;

      setResults({
        linkedin: linkedinPost,
        twitter: twitterPost,
        whatsapp: whatsappPost,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleGetStarted = () => {
    inputRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
    // Focus the input after scrolling
    setTimeout(() => {
      inputRef.current?.querySelector('input')?.focus();
    }, 500);
  };

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Track scroll position for back-to-top button and active section
  useEffect(() => {
    const handleScroll = () => {
      // Show back-to-top button after scrolling 300px
      setShowBackToTop(window.scrollY > 300);

      // Determine active section
      const scrollPosition = window.scrollY + 100;

      if (howItWorksRef.current && aboutRef.current) {
        const howItWorksTop = howItWorksRef.current.offsetTop;
        const aboutTop = aboutRef.current.offsetTop;

        if (scrollPosition >= aboutTop) {
          setActiveSection('about');
        } else if (scrollPosition >= howItWorksTop) {
          setActiveSection('howItWorks');
        } else {
          setActiveSection('');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#05070a] text-[#f0f6fc]">
      {/* Navbar */}
      <nav className="border-b border-white/5 py-4 sticky top-0 bg-[#05070a]/80 backdrop-blur-md z-50">
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[#00d2ff] to-[#3a7bd5] rounded-xl flex items-center justify-center">
              <Code size={24} className="text-white" />
            </div>
            <span className="text-xl font-extrabold tracking-tight outfit-font">
              DevPost<span className="premium-gradient-text">AI</span>
            </span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-white/60">
            <button
              onClick={() => scrollToSection(howItWorksRef)}
              style={{
                color: activeSection === 'howItWorks' ? '#60a5fa' : 'rgba(255, 255, 255, 0.6)',
                borderBottom: activeSection === 'howItWorks' ? '2px solid #60a5fa' : '2px solid transparent',
                paddingBottom: '4px',
                transition: 'all 0.3s ease',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
              onMouseLeave={(e) => e.currentTarget.style.color = activeSection === 'howItWorks' ? '#60a5fa' : 'rgba(255, 255, 255, 0.6)'}
            >
              How it works
            </button>
            <button
              onClick={() => scrollToSection(aboutRef)}
              style={{
                color: activeSection === 'about' ? '#60a5fa' : 'rgba(255, 255, 255, 0.6)',
                borderBottom: activeSection === 'about' ? '2px solid #60a5fa' : '2px solid transparent',
                paddingBottom: '4px',
                transition: 'all 0.3s ease',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
              onMouseLeave={(e) => e.currentTarget.style.color = activeSection === 'about' ? '#60a5fa' : 'rgba(255, 255, 255, 0.6)'}
            >
              About
            </button>
          </div>
          <button
            onClick={handleGetStarted}
            className="premium-button text-sm px-5 py-2"
          >
            Get Started
          </button>
        </div>
      </nav>

      <main className="container section-padding">
        {/* Hero Section */}
        <section className="text-center mb-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-6">
              <Sparkles size={14} /> AI-POWERED CONTENT GENERATOR
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
              Turn Code into{" "}
              <span className="premium-gradient-text">Conversations.</span>
            </h1>
            <p className="text-lg text-white/60 mb-10 leading-relaxed">
              Analyze your GitHub repositories and generate developer-first
              social media posts in seconds. Authentic, technical, and optimized
              for your favorite platforms.
            </p>

            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}

            <form
              ref={inputRef}
              onSubmit={analyzeRepo}
              className="relative max-w-2xl mx-auto"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-blue-500/20 rounded-2xl blur-xl group-focus-within:bg-blue-500/30 transition-all duration-500"></div>
                <div className="relative flex items-center bg-[#0d1117] border border-white/10 rounded-2xl overflow-hidden focus-within:border-blue-500/50 transition-all">
                  <div className="pl-5 text-white/40">
                    <Github size={20} />
                  </div>
                  <input
                    type="text"
                    placeholder="Paste GitHub Repository URL..."
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    className="w-full bg-transparent border-none outline-none py-5 px-4 text-white placeholder:text-white/20"
                  />
                  <div className="pr-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="premium-button h-12 px-6 disabled:opacity-50"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Generate <Send size={18} />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </motion.div>
        </section>

        {/* Results Section */}
        <AnimatePresence>
          {results && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
            >
              {[
                {
                  id: "linkedin",
                  title: "LinkedIn",
                  icon: <Linkedin size={20} />,
                  content: results.linkedin,
                  color: "blue",
                },
                {
                  id: "twitter",
                  title: "Twitter / X",
                  icon: <Twitter size={20} />,
                  content: results.twitter,
                  color: "sky",
                },
                {
                  id: "whatsapp",
                  title: "WhatsApp",
                  icon: <MessageCircle size={20} />,
                  content: results.whatsapp,
                  color: "green",
                },
              ].map((platform) => (
                <motion.div
                  key={platform.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -5 }}
                  className="glass-card p-6 flex flex-col h-full relative group"
                >
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg bg-${platform.color}-500/20 text-${platform.color}-400`}
                      >
                        {platform.icon}
                      </div>
                      <h3 className="text-lg font-bold">{platform.title}</h3>
                    </div>
                    <button
                      onClick={() =>
                        copyToClipboard(platform.content, platform.id)
                      }
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 20px',
                        background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(37, 99, 235, 0.4)',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 6px 16px rgba(37, 99, 235, 0.6)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.4)';
                      }}
                    >
                      {copiedId === platform.id ? (
                        <>
                          <Check size={20} />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={20} />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="bg-[#05070a]/50 rounded-xl p-4 flex-grow text-sm leading-relaxed text-white/80 whitespace-pre-wrap font-mono relative">
                    {platform.content}
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center text-xs text-white/40">
                    <span>Generated optimized content</span>
                    <span className="flex items-center gap-1">
                      <Sparkles size={12} /> AI Verified
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Features Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-12 py-20 border-t border-white/5">
          <div className="flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400">
              <Brain size={24} />
            </div>
            <h4 className="text-xl font-bold">Smart Analysis</h4>
            <p className="text-white/40 text-sm">
              Deeply understands your README, code structure, and tech stack
              without hallucinations.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400">
              <Rocket size={24} />
            </div>
            <h4 className="text-xl font-bold">Platform-Optimized</h4>
            <p className="text-white/40 text-sm">
              Automatically adjusts tone, length, and formatting for LinkedIn,
              X, and WhatsApp.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
              <Check size={24} />
            </div>
            <h4 className="text-xl font-bold">Authentic Voice</h4>
            <p className="text-white/40 text-sm">
              Writes like a real developer, avoiding marketing cliches and hype
              words.
            </p>
          </div>
        </section>

        {/* How it Works Section */}
        <section
          ref={howItWorksRef}
          className="py-20 border-t border-white/5"
        >
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold mb-4">
                <Brain size={14} /> SIMPLE PROCESS
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
                How <span className="premium-gradient-text">It Works</span>
              </h2>
              <p className="text-white/60 text-lg max-w-2xl mx-auto">
                Transform your GitHub repository into professional social media content in three simple steps
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Paste Repository URL",
                description: "Simply paste your GitHub repository URL into the input field. We support both public and private repositories.",
                icon: <Github size={28} />,
                color: "blue"
              },
              {
                step: "02",
                title: "AI Analysis",
                description: "Our AI analyzes your README, package.json, commits, and tech stack to understand your project deeply.",
                icon: <Brain size={28} />,
                color: "purple"
              },
              {
                step: "03",
                title: "Get Your Posts",
                description: "Receive platform-optimized posts for LinkedIn, Twitter/X, and WhatsApp. Copy and share instantly!",
                icon: <Sparkles size={28} />,
                color: "cyan"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-8 relative overflow-hidden group hover:border-white/20 transition-all"
              >
                <div className="absolute top-0 right-0 text-8xl font-black text-white/5 -mr-4 -mt-4 group-hover:text-white/10 transition-all">
                  {item.step}
                </div>
                <div className={`w-14 h-14 rounded-2xl bg-${item.color}-500/10 flex items-center justify-center text-${item.color}-400 mb-6 relative z-10`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 relative z-10">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed relative z-10">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section
          ref={aboutRef}
          className="py-20 border-t border-white/5"
        >
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold mb-4">
                <Code size={14} /> ABOUT THE PROJECT
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
                Built for <span className="premium-gradient-text">Developers</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card p-8 md:p-12 space-y-6"
            >
              <p className="text-white/80 text-lg leading-relaxed">
                <span className="font-bold text-white">DevPostAI</span> was created to solve a common problem: developers spend hours crafting social media posts to showcase their work, often struggling to translate technical achievements into engaging content.
              </p>

              <p className="text-white/80 text-lg leading-relaxed">
                We built an AI-powered platform that deeply analyzes your GitHub repositories—reading your README, understanding your tech stack, examining recent commits, and extracting key features—to generate authentic, developer-focused social media posts.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 flex-shrink-0">
                    <Check size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">No Marketing Fluff</h4>
                    <p className="text-white/60 text-sm">Authentic technical content that resonates with developers</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 flex-shrink-0">
                    <Check size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Platform Optimized</h4>
                    <p className="text-white/60 text-sm">Tailored for LinkedIn, Twitter/X, and WhatsApp formats</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 flex-shrink-0">
                    <Check size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Open Source</h4>
                    <p className="text-white/60 text-sm">Built in public with modern web technologies</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400 flex-shrink-0">
                    <Check size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Privacy First</h4>
                    <p className="text-white/60 text-sm">We only read public repository data via GitHub API</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/5">
                <p className="text-white/60 text-sm">
                  <span className="font-semibold text-white">Tech Stack:</span> React 19, Vite, Framer Motion, Axios, GitHub REST API
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 mt-20">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="text-sm text-white/40">
              © 2026 DevPostAI. Built for developers.
            </span>
          </div>
          <div className="flex gap-6 text-sm text-white/40">
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-white transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            style={{
              position: 'fixed',
              bottom: '30px',
              right: '30px',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #00d2ff, #3a7bd5)',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(0, 210, 255, 0.4)',
              zIndex: 1000,
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 6px 25px rgba(0, 210, 255, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 210, 255, 0.4)';
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DevPostAI;
