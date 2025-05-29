import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const BASE = import.meta.env.BASE_URL


// 1) Typewriter snippet
const codeString = `const Hamza_Ait_Hssayene = {
  role: "Full-stack Software Engineer",
  location: "Ottawa, Ontario, Canada",
  willingToRelocate: true,
  skills: ["JavaScript", "Java", "Spring", "NodeJS", "MongoDB", "Git"],
};
console.log(Welcome to Hamza's Portfolio!);
`;

// 2) Typewriter component
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
    } else {
      onComplete();
    }
  }, [idx, text, speed, onComplete]);
  return (
    <pre className="text-lg font-mono whitespace-pre-wrap text-white">
      {displayed}
    </pre>
  );
}

// 3) Matrix‐style falling digits background
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
        const num = Math.floor(Math.random() * 10).toString();
        ctx.fillText(num, i * fontSize, d * fontSize);
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

// 4) HorizontalScroll wrapper: vertical wheel → horizontal scroll
function HorizontalScroll({ children }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const onWheel = (e) => {
      // if primarily vertical scroll, hijack to horizontal
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);
  return (
    <div
      ref={ref}
      className="overflow-x-auto overflow-y-visible flex snap-x snap-mandatory scroll-smooth"
    >
      {children}
    </div>
  );
}

// 5) Projects data
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
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center p-8">
          <div className="relative">
            <img
              src={`${BASE}images/retro-computer.png`}
              alt="Retro Computer"
              className="w-[650px] mx-auto block"
            />
            <div
              className="absolute overflow-hidden"
              style={{
                top: 30,
                left: 30,
                width: 590,
                height: 330,
                padding: 16,
                boxSizing: "border-box",
              }}
            >
              <Typewriter
                text={codeString}
                speed={20}
                onComplete={() => setShowBtn(true)}
              />
              {showBtn && (
                <motion.a
                  href={`${BASE}resume.pdf`}
                  download
                  className="absolute bottom-4 right-4 font-mono text-green-300 hover:text-green-100"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  DownloadMyCV();
                </motion.a>
              )}
            </div>
          </div>
        </section>

        {/* About Me Section */}
        <motion.section
          id="about"
          className="flex justify-center px-6 py-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="backdrop-blur-lg bg-white bg-opacity-20 rounded-2xl p-8 max-w-3xl w-full flex flex-col md:flex-row items-center gap-6 shadow-xl">
            <img
              src={`${BASE}images/portrait.jpg`}
              alt="Hamza"
              className="w-32 h-32 md:w-48 md:h-48 rounded-full border-2 border-white"
            />
            <div>
              <h2 className="text-3xl font-bold mb-4">About Me</h2>
              <p className="text-gray-200 mb-4 text-lg">
                I’m a full-stack developer with experience building robust backends
                and intuitive user interfaces. I’ve worked with JavaScript, Java
                Spring, ExpressJS, Python, Vue, React, MongoDB, and more —
                delivering products from concept to deployment. I’m based in
                Ottawa and open to relocate.
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "JavaScript",
                  "Java",
                  "Spring",
                  "NodeJS",
                  "MongoDB",
                  "Git",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="bg-white bg-opacity-30 text-white px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Projects Timeline Section */}
        <motion.section
          id="projects"
          className="px-6 py-20 bg-gray-900 bg-opacity-75"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center mb-4">Projects</h2>
          <svg
            className="w-32 h-2 mb-6 mx-auto"
            viewBox="0 0 100 4"
            fill="none"
            stroke="#34d399"
            strokeWidth="4"
          >
            <path d="M0 2 L100 2" strokeDasharray="100" strokeDashoffset="100">
              <animate
                attributeName="strokeDashoffset"
                from="100"
                to="0"
                dur="1s"
                fill="freeze"
              />
            </path>
          </svg>

          {/* Progress bar */}
          <div className="flex items-center mb-6 mx-4">
            {projects.map((_, i) => (
              <React.Fragment key={i}>
                <div
                  className={`w-4 h-4 rounded-full ${
                    activeIdx >= i ? "bg-green-300" : "bg-gray-600"
                  }`}
                />
                {i < projects.length - 1 && (
                  <div
                    className={`flex-auto h-1 ${
                      activeIdx > i ? "bg-green-300" : "bg-gray-600"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Horizontal scroll timeline */}
          <HorizontalScroll>
            {projects.map((p, i) => (
              <div
                key={i}
                className="snap-start flex-shrink-0 w-screen flex justify-center"
              >
                <div
                  className="flex w-full max-w-[95vw] gap-8"
                  style={{ maxHeight: "70vh" }}
                >
                  {/* image container: max 60% */}
                  <div className="w-3/5 flex-shrink-0 h-full overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* description card: fixed 40%, scrolls internally */}
                  <motion.div
                    onViewportEnter={() => setActiveIdx(i)}
                    className="w-2/5 h-full bg-gray-800 rounded-xl p-8 shadow-lg overflow-y-auto"
                    initial={{ opacity: 0, rotateX: 30, rotateY: -10 }}
                    whileInView={{ opacity: 1, rotateX: 0, rotateY: 0 }}
                    transition={{ type: "spring", stiffness: 120, damping: 12 }}
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    <h3 className="text-2xl font-semibold text-white mb-4">
                      {p.title}
                    </h3>
                    <p className="text-gray-300 mb-6">{p.description}</p>
                    <div className="flex flex-wrap gap-2 text-sm text-indigo-300">
                      {p.tech.map((t, idx) => (
                        <span key={idx} className="bg-gray-700 px-2 py-1 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            ))}
          </HorizontalScroll>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          id="contact"
          className="flex flex-col items-center px-6 py-20 bg-gray-800 bg-opacity-50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">Contact Me</h2>
          <p className="text-gray-300 mb-6">
            Feel free to reach out via email or connect on LinkedIn and GitHub.
          </p>
          <div className="flex space-x-6">
            <a
              href="mailto:aithssayenehamza@gmail.com"
              className="text-green-300 hover:underline"
            >
              aithssayenehamza@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/hamza-ait-hssayene-98b273150/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-300 hover:underline"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/HamzaAit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-300 hover:underline"
            >
              GitHub
            </a>
          </div>
        </motion.section>
      </div>
    </>
  );
}
