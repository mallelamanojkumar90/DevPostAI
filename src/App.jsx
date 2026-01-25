import React, { useState } from "react";
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

      // Generate content based on details
      const techStr = details.techStack.join(", ");
      const coreTech = details.techStack.slice(0, 3).join(", ");
      const name = details.name;
      const type = details.projectType;
      const featureStr = details.features.map(f => `- ${f}`).join('\n');
      const updateStr = details.recentUpdates.map(u => `- ${u}`).join('\n');

      setResults({
        linkedin: `Engineering Update: Analyzing the architecture of ${name}, a ${type} designed for high-performance and scalability.\n\nCore Engineering Features:\n${featureStr}\n\nTechnical Stack:\n${techStr || "Modern Software Engineering"}\n\nRecent Activity:\n${updateStr}\n\nThis project emphasizes clean code principles and robust implementation details. View the full repository here:\n${repoUrl}\n\n#SoftwareEngineering #SystemArchitecture #OpenSource #${name.replace(/[^a-zA-Z]/g, "")}`,
        twitter: `Exploring the implementation of ${name}, a ${type} built for performance and maintainability.\n\nKey Features:\n${details.features.slice(0, 2).map(f => `- ${f}`).join('\n')}\n\nStack: ${coreTech}\n\nFull repository and documentation:\n${repoUrl}\n\n#BuildInPublic #SoftwareEngineering`,
        whatsapp: `Checking out ${name}. It's a ${type} built with ${coreTech}. \n\nKey features include:\n${details.features.slice(0, 2).map(f => `- ${f}`).join('\n')}\n\nRepo link: ${repoUrl}`,
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
            <a href="#" className="hover:text-white transition-colors">
              How it works
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Pricing
            </a>
            <a href="#" className="hover:text-white transition-colors">
              About
            </a>
          </div>
          <button className="premium-button text-sm px-5 py-2">
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

            <form onSubmit={analyzeRepo} className="relative max-w-2xl mx-auto">
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
                      className="p-2 rounded-lg hover:bg-white/5 transition-colors text-white/40 hover:text-white"
                    >
                      {copiedId === platform.id ? (
                        <Check size={18} className="text-green-400" />
                      ) : (
                        <Copy size={18} />
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
    </div>
  );
};

export default DevPostAI;
