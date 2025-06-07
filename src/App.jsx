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
      
      {/* Navigation buttons */}
      <button
        onClick={() => scrollToProject(-1)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-80 hover:bg-opacity-100 text-white p-2 rounded-full transition-all z-10"
        aria-label="Previous project"
      >
        ←
      </button>
      <button
        onClick={() => scrollToProject(1)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-80 hover:bg-opacity-100 text-white p-2 rounded-full transition-all z-10"
        aria-label="Next project"
      >
        →
      </button>
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

        <section id="projects" className="px-4 py-16 sm:px-6 sm:py-20 bg-gray-900 bg-opacity-75">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">Projects</h2>
          <svg className="w-24 h-2 mb-6 mx-auto" viewBox="0 0 100 4" fill="none" stroke="#34d399" strokeWidth="4">
            <path d="M0 2 L100 2" strokeDasharray="100" strokeDashoffset="100">
              <animate attributeName="strokeDashoffset" from="100" to="0" dur="1s" fill="freeze" />
            </path>
          </svg>
          <div className="flex items-center mb-6 mx-4">
            {projects.map((_, i) => (
              <React.Fragment key={i}>
                <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${activeIdx >= i ? "bg-green-300" : "bg-gray-600"}`} />
                {i < projects.length - 1 && (
                  <div className={`flex-auto h-0.5 sm:h-1 ${activeIdx > i ? "bg-green-300" : "bg-gray-600"}`} />
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="relative">
            <HorizontalScroll>
              {projects.map((p, i) => (
                <div key={i} className="snap-start flex-shrink-0 w-screen flex justify-center">
                  <div className="flex flex-col md:flex-row w-full max-w-[95vw] gap-6 md:gap-8 items-start">
                    <div className="w-full md:w-3/5 flex-shrink-0">
                      <img src={p.image} alt={p.title} className="w-full h-auto object-contain" />
                    </div>
                    <motion.div
                      onViewportEnter={() => setActiveIdx(i)}
                      className="w-full md:w-2/5 bg-gray-800 rounded-xl p-6 sm:p-8 shadow-lg flex flex-col justify-start"
                      initial={{ opacity: 0, rotateX: 30, rotateY: -10 }}
                      whileInView={{ opacity: 1, rotateX: 0, rotateY: 0 }}
                      transition={{ type: "spring", stiffness: 120, damping: 12 }}
                      viewport={{ once: true, margin: "-100px" }}
                    >
                      <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3">{p.title}</h3>
                      <p className="text-gray-300 mb-4 text-sm sm:text-base leading-relaxed">{p.description}</p>
                      <div className="flex flex-wrap gap-2 text-xs sm:text-sm text-indigo-300 mt-auto">
                        {p.tech.map((t, idx) => (
                          <span key={idx} className="bg-gray-700 px-2 py-1 rounded">{t}</span>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              ))}
            </HorizontalScroll>
            
            {/* Navigation hint */}
            <div className="text-center mt-4 text-gray-400 text-sm">
              Use arrow buttons or Shift + scroll to navigate • {activeIdx + 1} of {projects.length}
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
