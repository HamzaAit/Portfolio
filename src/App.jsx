import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const BASE = import.meta.env.BASE_URL;

const codeString = `const Hamza_Ait_Hssayene = {
  role: "Full-stack Software Engineer",
  location: "Ottawa, Ontario, Canada",
  willingToRelocate: true,
  skills: ["JavaScript", "Java", "Spring", "NodeJS", "MongoDB", "Git"],
};
console.log(Welcome to Hamza's Portfolio!);
`;

function Typewriter({ text, speed = 20, onComplete = () => {} }) {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    if (idx < text.length) {
      const t = setTimeout(() => {
        setDisplayed(text.slice(0, idx + 1));
        setIdx(idx + 1);
      }, speed);
      return () => clearTimeout(t);
    }
    onComplete();
  }, [idx, text, speed, onComplete]);
  return (
    <pre
      className="whitespace-pre-wrap text-white"
      style={{ fontSize: "clamp(12px,1.5vw,18px)", lineHeight: 1.3 }}
    >
      {displayed}
    </pre>
  );
}

function BackgroundCanvas() {
  useEffect(() => {
    const canvas = document.getElementById("matrix");
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const fontSize = 16;
    let cols = Math.floor(w / fontSize);
    const drops = Array(cols).fill(0);
    function draw() {
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "rgba(0,255,0,0.6)";
      ctx.font = `${fontSize}px monospace`;
      drops.forEach((d, i) => {
        ctx.fillText(
          Math.floor(Math.random() * 10).toString(),
          i * fontSize,
          d * fontSize
        );
        if (d * fontSize > h && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
      requestAnimationFrame(draw);
    }
    draw();
    window.addEventListener("resize", () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      cols = Math.floor(w / fontSize);
      drops.length = cols;
      drops.fill(0);
    });
    return () => window.removeEventListener("resize", () => {});
  }, []);
  return <canvas id="matrix" className="fixed inset-0 w-full h-full z-0" />;
}

function HorizontalScroll({ children }) {
  const ref = useRef(null);
  
  useEffect(() => {
    const el = ref.current;
    const onWheel = (e) => {
      // Check if the horizontal scroll container has scrollable content
      const canScrollHorizontally = el.scrollWidth > el.clientWidth;
      
      // Only intercept if we can scroll horizontally and user is holding Shift
      if (canScrollHorizontally && e.shiftKey) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };
    
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const scrollToProject = (direction) => {
    const el = ref.current;
    const scrollAmount = el.clientWidth;
    el.scrollLeft += direction * scrollAmount;
  };

  return (
    <div className="relative">
      <div
        ref={ref}
        className="overflow-x-auto overflow-y-visible flex snap-x snap-mandatory scroll-smooth"
      >
        {children}
      </div>
      
      {/* Navigation buttons - positioned within screen bounds but outside content */}
      <motion.button
        onClick={() => scrollToProject(-1)}
        className="hidden sm:block absolute left-2 lg:left-4 xl:left-8 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-gray-800 to-gray-700 hover:from-green-600 hover:to-blue-600 text-white p-2 sm:p-3 rounded-full transition-all duration-300 z-30 shadow-xl border border-gray-600 hover:border-green-400/50 backdrop-blur-sm"
        whileHover={{ scale: 1.1, x: -3 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8 }}
        aria-label="Previous project"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </motion.button>
      <motion.button
        onClick={() => scrollToProject(1)}
        className="hidden sm:block absolute right-2 lg:right-4 xl:right-8 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-gray-800 to-gray-700 hover:from-green-600 hover:to-blue-600 text-white p-2 sm:p-3 rounded-full transition-all duration-300 z-30 shadow-xl border border-gray-600 hover:border-green-400/50 backdrop-blur-sm"
        whileHover={{ scale: 1.1, x: 3 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8 }}
        aria-label="Next project"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </motion.button>
    </div>
  );
}

const projects = [
  {
    title: "AI Selfishness Simulator",
    image: `${BASE}images/ai-selfishness.png`,
    description:
      "Simulates AI agents with selfish or cooperative traits and evaluates their survival and reproduction rates based on differences in behavior and decision-making strategies.",
    tech: ["JavaScript", "Neural Networks", "Reinforcement Learning"],
  },
  {
    title: "MoodZik",
    image: `${BASE}images/moodzik.png`,
    description:
      "Web app that uses machine learning to detect a user's emotion via webcam and generates music from scratch to match their mood.",
    tech: ["Python", "TensorFlow", "Keras", "OpenCV", "Flask"],
  },
  {
    title: "Employee Evaluation Platform",
    image: `${BASE}images/employee-eval.png`,
    description:
      "Internal HR tool for survey creation, scoring, and trend analytics, built for Axum.",
    tech: ["Express.js", "Vue.js", "MongoDB"],
  },
  {
    title: "AquaDentist",
    image: `${BASE}images/aquadentist.png`,
    description:
      "AquaDentist is a dental practice management solution I co-founded and developed. It streamlines dental operations by offering features like patient scheduling, billing, and inventory management. The project involved building a robust, high-performance backend capable of handling millions of appointment records for thousands of concurrent dental clinics, ensuring uninterrupted service and data integrity. The development utilized Express.js, Angular, and MongoDB. Currently in production.",
    tech: ["Express.js", "Angular", "MongoDB"],
  },
  {
    title: "NarriClip",
    image: `${BASE}images/narriclip.png`,
    description:
      "NarriClip is an AI-driven content creation platform that transforms written stories into engaging video clips. It automatically combines narrated voiceovers (using Amazon Polly TTS), synced subtitles, and dynamic Minecraft-style gameplay footage to produce entertaining and shareable videos. The platform is designed for storytelling communities (e.g., Reddit stories) and uses a credit-based system for scalability and monetization.",
    tech: ["ExpressJS", "NextJS", "Supabase", "Polly", "S3", "FFmpeg", "Stripe"],
  },
];

export default function App() {
  const [showBtn, setShowBtn] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <>
      <BackgroundCanvas />

      <div className="relative z-10 font-sans text-white">
        <section className="min-h-screen flex items-center justify-center p-8">
          <div className="relative w-full max-w-[650px]">
            <img
              src={`${BASE}images/retro-computer.png`}
              alt="Retro Computer"
              className="w-full block"
            />
            <div className="absolute inset-[6%] flex flex-col">
              <div className="flex-1 overflow-auto pr-2 pb-8">
                <Typewriter
                  text={codeString}
                  speed={20}
                  onComplete={() => setShowBtn(true)}
                />
                {showBtn && (
                  <motion.div
                    className="flex justify-end mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <motion.a
                      href={`${BASE}resume.pdf`}
                      download
                      className="font-mono text-green-300 hover:text-green-100"
                      style={{ fontSize: "clamp(10px,1.2vw,16px)" }}
                    >
                      DownloadMyCV();
                    </motion.a>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="flex justify-center px-4 py-16 sm:px-6 sm:py-20">
          <div className="backdrop-blur-lg bg-white bg-opacity-20 rounded-2xl p-6 sm:p-8 max-w-3xl w-full flex flex-col md:flex-row items-center gap-6 shadow-xl">
            <img
              src={`${BASE}images/portrait.jpg`}
              alt="Hamza"
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 rounded-full border-2 border-white"
            />
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">About Me</h2>
              <p className="text-gray-200 mb-4 text-sm sm:text-lg">
                I’m a full-stack developer with experience building robust backends
                and intuitive user interfaces. I’ve worked with JavaScript, Java
                Spring, ExpressJS, Python, Vue, React, MongoDB, and more —
                delivering products from concept to deployment. I’m based in
                Ottawa and open to relocate.
              </p>
              <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
                {["JavaScript", "Java", "Spring", "NodeJS", "MongoDB", "Git"].map((skill) => (
                  <span key={skill} className="bg-white bg-opacity-30 text-white px-2 py-1 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="px-2 xs:px-4 py-16 sm:px-6 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/10 via-transparent to-blue-900/10"></div>
          <div className="absolute top-20 left-1/4 w-32 h-32 bg-green-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-1/4 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-8 sm:mb-12"
            >
              <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 xs:mb-4 sm:mb-6 bg-gradient-to-r from-green-300 via-blue-300 to-purple-300 bg-clip-text text-transparent px-2">
                Featured Projects
              </h2>
              <p className="text-gray-300 text-sm xs:text-base sm:text-lg max-w-2xl mx-auto mb-4 xs:mb-6 sm:mb-8 px-4">
                A showcase of my recent work spanning AI, web development, and innovative solutions
              </p>
              
              {/* Animated underline */}
              <motion.div 
                className="w-24 xs:w-32 h-1 bg-gradient-to-r from-green-400 to-blue-400 mx-auto rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: 128 }}
                transition={{ duration: 1.2, delay: 0.3 }}
                viewport={{ once: true }}
              />
            </motion.div>

            {/* Progress indicator */}
            <motion.div 
              className="flex items-center justify-center mb-8 sm:mb-12 max-w-xs xs:max-w-sm sm:max-w-md mx-auto px-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {projects.map((_, i) => (
                <React.Fragment key={i}>
                  <motion.div 
                    className={`w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-500 ${
                      activeIdx >= i 
                        ? "bg-gradient-to-r from-green-400 to-blue-400 shadow-lg shadow-green-400/50" 
                        : "bg-gray-600 hover:bg-gray-500"
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                  {i < projects.length - 1 && (
                    <motion.div 
                      className={`flex-auto h-0.5 xs:h-1 mx-1 xs:mx-2 rounded-full transition-all duration-700 ${
                        activeIdx > i 
                          ? "bg-gradient-to-r from-green-400 to-blue-400" 
                          : "bg-gray-600"
                      }`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: activeIdx > i ? 1 : 0 }}
                      transition={{ duration: 0.5 }}
                    />
                  )}
                </React.Fragment>
              ))}
            </motion.div>

            <div className="relative">
              <HorizontalScroll>
                {projects.map((p, i) => (
                  <motion.div 
                    key={i} 
                    className="snap-start flex-shrink-0 w-screen flex justify-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex flex-col lg:flex-row w-full max-w-[96vw] sm:max-w-[94vw] lg:max-w-7xl gap-3 sm:gap-4 lg:gap-12 items-center px-4 sm:px-6 lg:px-8 mx-4 sm:mx-8 lg:mx-12">
                      {/* Project Image */}
                      <motion.div 
                        className="w-full lg:w-3/5 flex-shrink-0 relative group"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-2xl bg-gradient-to-br from-gray-800 to-gray-900 p-1 xs:p-2 sm:p-4">
                          <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          <img 
                            src={p.image} 
                            alt={p.title} 
                            className="w-full h-auto object-contain rounded-lg transition-transform duration-500 group-hover:scale-105 max-h-[35vh] sm:max-h-[45vh] lg:max-h-none" 
                          />
                          <div className="absolute inset-0 ring-1 ring-white/10 rounded-xl sm:rounded-2xl"></div>
                        </div>
                      </motion.div>

                      {/* Project Info */}
                      <motion.div
                        onViewportEnter={() => setActiveIdx(i)}
                        className="w-full lg:w-2/5 relative"
                        initial={{ opacity: 0, x: 50, rotateY: 15 }}
                        whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 100, 
                          damping: 20,
                          delay: 0.2 
                        }}
                        viewport={{ once: true, margin: "-100px" }}
                      >
                        <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3 xs:p-4 sm:p-6 lg:p-8 shadow-2xl border border-gray-700/50 relative overflow-hidden">
                          {/* Background glow */}
                          <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-bl from-green-400/10 to-transparent rounded-full blur-2xl"></div>
                          
                          <motion.h3 
                            className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 xs:mb-3 sm:mb-4 relative z-10 leading-tight"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                          >
                            {p.title}
                          </motion.h3>
                          
                          <motion.p 
                            className="text-gray-300 mb-3 xs:mb-4 sm:mb-6 text-xs xs:text-sm sm:text-base lg:text-lg leading-relaxed relative z-10 max-h-[20vh] sm:max-h-[25vh] lg:max-h-none overflow-y-auto pr-2"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                          >
                            {p.description}
                          </motion.p>
                          
                          <motion.div 
                            className="relative z-10"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                          >
                            <h4 className="text-green-300 font-semibold mb-1.5 xs:mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wider">
                              Technologies Used
                            </h4>
                            <div className="flex flex-wrap gap-1 xs:gap-1.5 sm:gap-2">
                              {p.tech.map((t, idx) => (
                                <motion.span 
                                  key={idx} 
                                  className="bg-gradient-to-r from-gray-700 to-gray-600 hover:from-green-600 hover:to-blue-600 text-white px-1.5 xs:px-2 sm:px-3 py-0.5 xs:py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-default border border-gray-600 hover:border-green-400/50 shadow-lg"
                                  whileHover={{ scale: 1.05, y: -2 }}
                                  whileTap={{ scale: 0.95 }}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  whileInView={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: 0.6 + idx * 0.1 }}
                                >
                                  {t}
                                </motion.span>
                              ))}
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </HorizontalScroll>
              
              {/* Enhanced navigation hint */}
              <motion.div 
                className="text-center mt-8 text-gray-400"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div className="inline-flex items-center gap-4 bg-gray-800/50 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-700/50">
                  <span className="text-sm">Navigate:</span>
                  <div className="flex items-center gap-2 text-xs">
                    <kbd className="px-2 py-1 bg-gray-700 rounded text-green-300">Shift</kbd>
                    <span>+</span>
                    <kbd className="px-2 py-1 bg-gray-700 rounded text-green-300">Scroll</kbd>
                  </div>
                  <span className="text-gray-500">•</span>
                  <span className="text-sm">{activeIdx + 1} of {projects.length}</span>
                </div>
              </motion.div>

              {/* Mobile navigation buttons - only visible on small screens */}
              <motion.div 
                className="sm:hidden flex justify-center gap-4 mt-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <motion.button
                  onClick={() => scrollToProject(-1)}
                  className="bg-gradient-to-r from-gray-800 to-gray-700 hover:from-green-600 hover:to-blue-600 text-white p-3 rounded-full transition-all duration-300 shadow-xl border border-gray-600 hover:border-green-400/50 backdrop-blur-sm"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Previous project"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </motion.button>
                <motion.button
                  onClick={() => scrollToProject(1)}
                  className="bg-gradient-to-r from-gray-800 to-gray-700 hover:from-green-600 hover:to-blue-600 text-white p-3 rounded-full transition-all duration-300 shadow-xl border border-gray-600 hover:border-green-400/50 backdrop-blur-sm"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Next project"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="contact" className="flex flex-col items-center px-4 py-16 sm:px-6 sm:py-20 bg-gray-800 bg-opacity-50">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Contact Me</h2>
          <p className="text-gray-300 mb-6 text-sm sm:text-base">
            Feel free to reach out via email or connect on LinkedIn and GitHub.
          </p>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6">
            <a href="mailto:aithssayenehamza@gmail.com" className="text-green-300 hover:underline">
              aithssayenehamza@gmail.com
            </a>
            <a href="https://www.linkedin.com/in/hamza-ait-hssayene-98b273150/" target="_blank" rel="noopener noreferrer" className="text-green-300 hover:underline">
              LinkedIn
            </a>
            <a href="https://github.com/HamzaAit" target="_blank" rel="noopener noreferrer" className="text-green-300 hover:underline">
              GitHub
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
