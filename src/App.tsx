import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Github, Linkedin, Mail, Download, ExternalLink, Award, Code, Briefcase, User, Home, Phone, MapPin, Calendar, ChevronDown, Brain, Database, Server, Cloud, Terminal, BookOpen, FlaskConical, GitBranch, Globe, BarChart2, Cpu, CheckCircle } from 'lucide-react';
import { SiTensorflow, SiPytorch, SiHuggingface, SiScikitlearn, SiOpenai, SiPython, SiCplusplus, SiJavascript, SiTypescript, SiC, SiNumpy, SiPandas, SiJupyter, SiReact, SiNodedotjs, SiHtml5, SiCss3, SiDocker, SiAmazon, SiKubernetes, SiLinux, SiMongodb, SiPostgresql, SiGit } from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import MorphingBackground from './MorphingBackground';
import GlassCard from './GlassCard';

const SnakeGame: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [running, setRunning] = useState(true);
  const [score, setScore] = useState(0);
  const [snake, setSnake] = useState([{ x: 8, y: 8 }]);
  const [dir, setDir] = useState({ x: 1, y: 0 });
  const [food, setFood] = useState({ x: 12, y: 8 });
  const [nextDir, setNextDir] = useState(dir);
  const gridSize = 16;
  const tileSize = 20;
  const dirRef = useRef(dir);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => { dirRef.current = dir; }, [dir]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle keyboard
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
      }
      if (!running && (e.key === 'r' || e.key === 'R')) {
        setSnake([{ x: 8, y: 8 }]);
        setDir({ x: 1, y: 0 });
        setNextDir({ x: 1, y: 0 });
        setFood({ x: 12, y: 8 });
        setScore(0);
        setRunning(true);
        return;
      }
      if (e.key === 'ArrowUp' && dirRef.current.y !== 1) setNextDir({ x: 0, y: -1 });
      if (e.key === 'ArrowDown' && dirRef.current.y !== -1) setNextDir({ x: 0, y: 1 });
      if (e.key === 'ArrowLeft' && dirRef.current.x !== 1) setNextDir({ x: -1, y: 0 });
      if (e.key === 'ArrowRight' && dirRef.current.x !== -1) setNextDir({ x: 1, y: 0 });
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [dir, onClose]);

  // Game loop
  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setDir(nextDir);
      setSnake(prev => {
        // Wrap around logic
        let newHead = {
          x: (prev[0].x + nextDir.x + gridSize) % gridSize,
          y: (prev[0].y + nextDir.y + gridSize) % gridSize
        };
        // Only lose if snake eats itself
        if (prev.some(seg => seg.x === newHead.x && seg.y === newHead.y)) {
          setRunning(false);
          return prev;
        }
        let newSnake = [newHead, ...prev];
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore(s => s + 1);
          // Place new food
          let newFood: { x: number; y: number };
          do {
            newFood = {
              x: Math.floor(Math.random() * gridSize),
              y: Math.floor(Math.random() * gridSize)
            };
          } while (newSnake.some(seg => seg.x === newFood.x && seg.y === newFood.y));
          setFood(newFood);
        } else {
          newSnake.pop();
        }
        return newSnake;
      });
    }, 90);
    return () => clearInterval(interval);
  }, [nextDir, running, food, gridSize]);

  // Draw
  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, gridSize * tileSize, gridSize * tileSize);
    // Draw food
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);
    // Draw snake
    ctx.fillStyle = '#fff';
    snake.forEach((seg, i) => {
      ctx.globalAlpha = 1 - i * 0.04;
      ctx.fillRect(seg.x * tileSize, seg.y * tileSize, tileSize, tileSize);
    });
    ctx.globalAlpha = 1;
  }, [snake, food]);

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-md snake-modal-pop"
      style={{ cursor: 'pointer', alignItems: 'center', justifyContent: 'center', display: 'flex' }}
      onClick={onClose}
    >
      <div
        className="relative bg-gray-900 rounded-2xl shadow-2xl p-6 flex flex-col items-center"
        onClick={e => e.stopPropagation()}
        style={{ cursor: 'default' }}
      >
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-white text-2xl font-bold focus:outline-none">&times;</button>
        <canvas
          ref={canvasRef}
          width={gridSize * tileSize}
          height={gridSize * tileSize}
          className="rounded-lg bg-gray-800 mb-4"
          style={{ width: 320, height: 320, maxWidth: '80vw', maxHeight: '60vw' }}
        />
        <button
          onClick={() => {
            setSnake([{ x: 8, y: 8 }]);
            setDir({ x: 1, y: 0 });
            setNextDir({ x: 1, y: 0 });
            setFood({ x: 12, y: 8 });
            setScore(0);
            setRunning(true);
          }}
          className="mb-2 px-3 py-1 rounded bg-cyan-700 hover:bg-cyan-500 text-white text-xs font-semibold transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          style={{ position: 'relative', zIndex: 2 }}
          aria-label="Restart Game"
        >
          &#8635; Restart
        </button>
        {isMobile && (
          <div className="flex flex-col items-center gap-1 mb-2 select-none" style={{ userSelect: 'none' }}>
            <button
              className="w-10 h-10 rounded-full bg-gray-700 text-white flex items-center justify-center mb-1 active:bg-cyan-600"
              onClick={() => { if (dirRef.current.y !== 1) setNextDir({ x: 0, y: -1 }); }}
              aria-label="Up"
            >&#8593;</button>
            <div className="flex flex-row gap-2">
              <button
                className="w-10 h-10 rounded-full bg-gray-700 text-white flex items-center justify-center active:bg-cyan-600"
                onClick={() => { if (dirRef.current.x !== 1) setNextDir({ x: -1, y: 0 }); }}
                aria-label="Left"
              >&#8592;</button>
              <button
                className="w-10 h-10 rounded-full bg-gray-700 text-white flex items-center justify-center active:bg-cyan-600"
                onClick={() => { if (dirRef.current.x !== -1) setNextDir({ x: 1, y: 0 }); }}
                aria-label="Right"
              >&#8594;</button>
            </div>
            <button
              className="w-10 h-10 rounded-full bg-gray-700 text-white flex items-center justify-center mt-1 active:bg-cyan-600"
              onClick={() => { if (dirRef.current.y !== -1) setNextDir({ x: 0, y: 1 }); }}
              aria-label="Down"
            >&#8595;</button>
          </div>
        )}
        <div className="text-white mb-2">Score: {score}</div>
        {!running && <div className="text-red-400 font-bold mb-2">Game Over</div>}
        <div className="text-gray-400 text-xs">
          Use arrow keys. ESC to close.
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [openGallery, setOpenGallery] = useState<null | 'photography' | 'videography' | 'design'>(null);
  const [showSnake, setShowSnake] = useState(false);
  const [showMeTooltip, setShowMeTooltip] = useState(false);
  const [meTooltipPos, setMeTooltipPos] = useState({ x: 0, y: 0 });
  const tooltipRAF = useRef<number | null>(null);
  const [headerHover, setHeaderHover] = useState(false);
  const [headerFill, setHeaderFill] = useState(0); // 0 to 1
  const headerTimer = useRef<any>(null);
  const headerFillRAF = useRef<any>(null);

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'projects', 'competitions', 'creative', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navSections = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'competitions', label: 'Competitions', icon: Award },
    { id: 'creative', label: 'Creative', icon: Briefcase },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  const handleTooltipMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (tooltipRAF.current) cancelAnimationFrame(tooltipRAF.current);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    tooltipRAF.current = requestAnimationFrame(() => {
      setMeTooltipPos({ x, y });
    });
  };

  // Gold fill animation on hover
  useEffect(() => {
    if (headerHover) {
      const start = performance.now();
      const animate = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / 3500, 1);
        setHeaderFill(progress);
        if (progress < 1 && headerHover) {
          headerFillRAF.current = requestAnimationFrame(animate);
        } else if (progress >= 1) {
          setShowSnake(true);
        }
      };
      headerFillRAF.current = requestAnimationFrame(animate);
    } else {
      setHeaderFill(0);
      if (headerFillRAF.current) cancelAnimationFrame(headerFillRAF.current);
    }
    return () => {
      if (headerFillRAF.current) cancelAnimationFrame(headerFillRAF.current);
    };
  }, [headerHover]);

  // Blur website when snake game is open
  useEffect(() => {
    if (showSnake) {
      document.body.classList.add('snake-blur');
    } else {
      document.body.classList.remove('snake-blur');
    }
  }, [showSnake]);

  return (
    <MorphingBackground>
      <div className="min-h-screen transition-colors duration-300 relative text-white">
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 py-3 px-4`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
                <h1
                  className="syed-header text-2xl font-medium tracking-wide italic font-serif transition-shadow duration-200 cursor-pointer relative overflow-hidden"
                  style={{ fontFamily: 'Great Vibes, cursive', color: `rgb(${255 - (255-255)*headerFill}, ${255 - (255-215)*headerFill}, ${255 - (255-116)*headerFill})`, transition: 'color 0.3s' }}
                  onMouseEnter={() => setHeaderHover(true)}
                  onMouseLeave={() => setHeaderHover(false)}
                >
                Syed Affan
                </h1>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                  {navSections.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-1 ${
                      activeSection === id
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-300 hover:text-blue-400'
                    }`}
                  >
                    <Icon size={16} />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
                {/* <a
                  href="/Syed M. Affan - BSc. Computer Engineering - Resume.pdf"
                  download
                  className="animated-gradient-btn inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md"
                >
                  <Download size={18} />
                  Resume
                </a> */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="p-2 rounded-md hover:bg-gray-800"
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
              <div className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800 border-t border-gray-700`}>
              {[
                { id: 'home', label: 'Home', icon: Home },
                { id: 'about', label: 'About', icon: User },
                { id: 'projects', label: 'Projects', icon: Code },
                { id: 'competitions', label: 'Competitions', icon: Award },
                { id: 'creative', label: 'Creative', icon: Briefcase },
                { id: 'contact', label: 'Contact', icon: Mail }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 flex items-center gap-2 ${
                    activeSection === id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-300 hover:text-blue-400'
                  }`}
                >
                  <Icon size={18} />
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <section id="home" className="pt-28 md:pt-28 min-h-screen flex items-center justify-center relative">
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-16">
            <div className="mb-8 flex flex-col items-center relative">
              <div
                className="relative mb-6 md:mb-8"
                onMouseEnter={() => setShowMeTooltip(true)}
                onMouseLeave={() => setShowMeTooltip(false)}
                onMouseMove={handleTooltipMove}
              >
                <img
                  src="/profilepic.jpg"
                  alt="Syed M. Affan Graduation"
                  className="w-40 h-40 md:w-80 md:h-80 rounded-full object-cover shadow-xl border-2 border-white"
                  style={{ pointerEvents: 'none' }}
                />
                {showMeTooltip && (
                  <div
                    style={{
                      position: 'absolute',
                      left: meTooltipPos.x - 24,
                      top: Math.max(meTooltipPos.y - 32, 0),
                      pointerEvents: 'none',
                      zIndex: 10
                    }}
                  >
                    <span className="text-xs font-bold text-white select-none" style={{ textShadow: '0 1px 6px #000' }}>
                      that's me!
                    </span>
                  </div>
                )}
              </div>
              <h1 className="text-3xl md:text-7xl font-bold mb-2 md:mb-4 text-gray-200">
                Syed Affan
              </h1>
              <p className="text-lg md:text-3xl text-gray-200 mb-2">  
                Computer Engineer
              </p>
              <p className="text-sm md:text-xl text-gray-300 max-w-2xl mx-auto mb-4 md:mb-2">
                Passionate about AI/ML, software development, and creating innovative solutions that make a difference
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6 md:mb-10">
            <button
              onClick={() => scrollToSection('projects')}
                className="animated-gradient-btn rounded-lg px-6 py-3 text-base font-semibold whitespace-nowrap flex items-center justify-center gap-2"
                style={{ minWidth: '12rem' }}
            >
              <Code size={20} />
              View My Work
            </button>
            {/* <a
              href="/Syed M. Affan - BSc. Computer Engineering - Resume.pdf"
              download
                className="animated-gradient-btn rounded-lg px-6 py-3 text-base font-semibold whitespace-nowrap flex items-center justify-center gap-2"
                style={{ minWidth: '12rem' }}
            >
              <Download size={20} />
                Resume
            </a> */}
          </div>

            <div className="flex justify-center space-x-4 md:space-x-10 mb-12">
            <a
              href="mailto:smaffan21@gmail.com"
                className="icon-glow-email p-3 md:p-5 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow duration-200 text-gray-600 hover:text-blue-600"
            >
              <Mail className="h-6 w-6 md:h-10 md:w-10" />
            </a>
            <a
              href="https://www.linkedin.com/in/syed-m-affan/"
              target="_blank"
              rel="noopener noreferrer"
                className="icon-glow-linkedin p-3 md:p-5 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow duration-200 text-gray-600 hover:text-blue-600"
            >
              <Linkedin className="h-6 w-6 md:h-10 md:w-10" />
            </a>
            <a
                href="https://github.com/smaffan21/"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-glow-github p-3 md:p-5 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow duration-200 text-gray-600 hover:text-blue-600"
            >
              <Github className="h-6 w-6 md:h-10 md:w-10" />
            </a>
          </div>

            <div className="absolute left-1/2 transform -translate-x-1/2 bottom-4 md:bottom-2">
              <button
                onClick={() => scrollToSection('about')}
                className="focus:outline-none cursor-pointer group"
                aria-label="Scroll to About section"
                style={{ background: 'none', border: 'none', padding: 0 }}
              >
                <ChevronDown
                  size={28}
                  className="text-gray-300 group-hover:text-blue-400 transition-colors duration-200 animate-bounce-slow"
                  style={{ display: 'block' }}
                />
              </button>
          </div>
        </div>
      </section>

        <section id="about" className="py-10">
          <GlassCard>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900 dark:text-gray-100">About Me</h2>
                <p className="text-base md:text-lg font-medium text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              A dedicated Computer Engineering student with a passion for artificial intelligence, 
              machine learning, and innovative software solutions.
            </p>
          </div>
              <div className="flex flex-col gap-8 items-center w-full">
            <div className="w-full">
                  <h3 className="text-2xl font-bold mb-4">Background</h3>
                  <p className="text-gray-200 mb-4 bg-gray-900/60 rounded-lg px-4 py-2">
                Currently pursuing a Bachelor's degree in Computer Engineering, I'm deeply passionate about 
                the intersection of technology and innovation. My academic journey has equipped me with 
                strong foundations in software development, AI/ML, and system design.
              </p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 font-semibold">
                  <MapPin size={16} className="text-blue-600" />
                  <span className="text-sm">Abu Dhabi, UAE (Flexible)</span>
                </div>
                    <div className="flex items-center gap-2 font-semibold">
                  <Calendar size={16} className="text-blue-600" />
                  <span className="text-sm">Available for Opportunities</span>
                </div>
              </div>
                  <div className="mt-8">
                    <h3 className="text-2xl font-bold mb-4">Education</h3>
                    <div className="bg-gray-900/60 rounded-lg px-4 py-3 mb-2 flex items-center gap-3">
                      <img src="/ku-logo.png" alt="Khalifa University Logo" className="h-8 w-8 mr-2" />
                      <div>
                        <div className="font-bold text-lg text-white inline-block align-middle">Khalifa University</div>
                        <div className="text-gray-300 font-medium">BSc. Computer Engineering</div>
                        <div className="text-gray-400 text-sm">2020 – 2024 &bull; Abu Dhabi, UAE</div>
            </div>
                    </div>
                  </div>
                  <div className="mt-8">
                    <h3 className="text-2xl font-bold mb-4">Skills</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {/* Programming Languages */}
                      <div className="bg-white/10 dark:bg-gray-800/80 rounded-xl p-6 flex flex-col gap-4 shadow-md">
                        <h4 className="font-semibold text-lg mb-2 flex items-center gap-2 text-white">Programming Languages</h4>
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center gap-2 text-white"><SiPython className="text-yellow-400" size={20}/> Python</div>
                          <div className="flex items-center gap-2 text-white"><SiCplusplus className="text-blue-500" size={20}/> C++</div>
                          <div className="flex items-center gap-2 text-white"><SiJavascript className="text-yellow-300" size={20}/> JavaScript</div>
                          <div className="flex items-center gap-2 text-white"><SiTypescript className="text-blue-400" size={20}/> TypeScript</div>
                          <div className="flex items-center gap-2 text-white"><FaJava className="text-red-500" size={20}/> Java</div>
                          <div className="flex items-center gap-2 text-white"><SiC className="text-gray-400" size={20}/> C</div>
                        </div>
                      </div>
                      {/* Machine Learning & AI */}
                      <div className="bg-white/10 dark:bg-gray-800/80 rounded-xl p-6 flex flex-col gap-4 shadow-md">
                        <h4 className="font-semibold text-lg mb-2 flex items-center gap-2 text-white"> Machine Learning & AI</h4>
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center gap-2 text-white"><SiTensorflow className="text-orange-500" size={20}/> TensorFlow</div>
                          <div className="flex items-center gap-2 text-white"><SiPytorch className="text-orange-600" size={20}/> PyTorch</div>
                          <div className="flex items-center gap-2 text-white"><SiHuggingface className="text-yellow-400" size={20}/> Hugging Face</div>
                          <div className="flex items-center gap-2 text-white"><SiScikitlearn className="text-orange-400" size={20}/> Scikit-learn</div>
                          <div className="flex items-center gap-2 text-white"><SiOpenai className="text-teal-400" size={20}/> OpenAI</div>
                        </div>
                      </div>
                      
                      {/* Data Science & Analytics */}
                      <div className="bg-white/10 dark:bg-gray-800/80 rounded-xl p-6 flex flex-col gap-4 shadow-md">
                        <h4 className="font-semibold text-lg mb-2 flex items-center gap-2 text-white"> Data Science & Analytics</h4>
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center gap-2 text-white"><SiNumpy className="text-blue-400" size={20}/> NumPy</div>
                          <div className="flex items-center gap-2 text-white"><SiPandas className="text-purple-400" size={20}/> Pandas</div>
                          <div className="flex items-center gap-2 text-white"><SiJupyter className="text-orange-500" size={20}/> Jupyter</div>
                        </div>
                      </div>
                      {/* Web Development */}
                      <div className="bg-white/10 dark:bg-gray-800/80 rounded-xl p-6 flex flex-col gap-4 shadow-md">
                        <h4 className="font-semibold text-lg mb-2 flex items-center gap-2 text-white"> Web Development</h4>
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center gap-2 text-white"><SiReact className="text-cyan-400" size={20}/> React</div>
                          <div className="flex items-center gap-2 text-white"><SiNodedotjs className="text-green-500" size={20}/> Node.js</div>
                          <div className="flex items-center gap-2 text-white"><SiHtml5 className="text-orange-500" size={20}/> HTML</div>
                          <div className="flex items-center gap-2 text-white"><SiCss3 className="text-blue-500" size={20}/> CSS</div>
                        </div>
                      </div>
                      {/* DevOps & Cloud */}
                      <div className="bg-white/10 dark:bg-gray-800/80 rounded-xl p-6 flex flex-col gap-4 shadow-md">
                        <h4 className="font-semibold text-lg mb-2 flex items-center gap-2 text-white">DevOps & Cloud</h4>
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center gap-2 text-white"><SiAmazon className="text-yellow-400" size={20}/> AWS</div>
                          <div className="flex items-center gap-2 text-white"><SiDocker className="text-blue-500" size={20}/> Docker</div>
                          <div className="flex items-center gap-2 text-white"><SiLinux className="text-gray-300" size={20}/> Linux</div>
                        </div>
                      </div>
                      {/* Databases & Tools */}
                      <div className="bg-white/10 dark:bg-gray-800/80 rounded-xl p-6 flex flex-col gap-4 shadow-md">
                        <h4 className="font-semibold text-lg mb-2 flex items-center gap-2 text-white"> Databases & Tools</h4>
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center gap-2 text-white"><SiMongodb className="text-green-500" size={20}/> MongoDB</div>
                          <div className="flex items-center gap-2 text-white"><SiPostgresql className="text-blue-400" size={20}/> PostgreSQL</div>
                          <div className="flex items-center gap-2 text-white"><SiGit className="text-orange-600" size={20}/> Git</div>
                        </div>
                      </div>
                    </div>
                  </div>
            </div>
          </div>
        </div>
          </GlassCard>
      </section>

        <section id="experience" className="py-10">
          <GlassCard>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-100">Work Experience</h2>
              </div>
              <div className="space-y-8">
                {/* Ab Ovo */}
                <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6 p-4 md:p-6 bg-gray-900/60 rounded-lg">
                  <img src="/abovo-logo.png" alt="Ab Ovo Logo" className="h-12 w-12 md:h-16 md:w-16 object-contain mt-1"/>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-white">Machine Learning Intern – Ab Ovo</h3>
                    <p className="text-sm md:text-base text-gray-400 mb-3">Abu Dhabi, UAE | 05/2025 – Present</p>
                    <ul className="list-disc pl-5 text-sm md:text-base text-gray-300 space-y-1">
                      <li>Building PIKE-RAG system to transform complex railway legal media into actionable B2B insights</li>
                      <li>Engineering data ingestion pipelines, including document chunking, semantic embedding, and vector DB integration</li>
                      <li>Optimizing LLM outputs via prompt engineering to ensure contextually accurate business analysis from legal sources</li>
                    </ul>
                  </div>
                </div>

                {/* Khalifa University */}
                <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6 p-4 md:p-6 bg-gray-900/60 rounded-lg">
                  <img src="/ku-logo.png" alt="Khalifa University Logo" className="h-12 w-12 md:h-16 md:w-16 object-contain mt-1"/>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-white">Cybersecurity Undergraduate Research Fellow – Khalifa University</h3>
                    <p className="text-sm md:text-base text-gray-400 mb-3">Abu Dhabi, UAE | 10/2024 – Present</p>
                    <ul className="list-disc pl-5 text-sm md:text-base text-gray-300 space-y-1">
                      <li>Co-authoring journal paper titled "Real-Time Intrusion Detection at the Edge Leveraging Hybrid Transformers," planned for publication by beginning of June 2025</li>
                      <li>Conducted experimentation on binary & multi-class classification of Transformers on NIDS datasets, improving on accuracy and time by 31% with data ingestion strategies & hyperparameter tuning</li>
                    </ul>
                  </div>
                </div>

                {/* Siemens */}
                <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6 p-4 md:p-6 bg-gray-900/60 rounded-lg">
                  <img src="/siemens-logo.png" alt="Siemens Logo" className="h-12 w-12 md:h-16 md:w-16 object-contain mt-1"/>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-white">Software Engineering Intern – Siemens Industrial LLC</h3>
                    <p className="text-sm md:text-base text-gray-400 mb-3">Abu Dhabi, UAE | 06/2024 – 08/2024</p>
                    <ul className="list-disc pl-5 text-sm md:text-base text-gray-300 space-y-1">
                      <li>Developed a KPI automation tool using Python, minimizing overall data processing time by 80%</li>
                      <li>Participated in cybersecurity upgrade project and used MS Power BI & MS Project to support execution & monitoring phases</li>
                      <li>Completed extensive training on Siemens EA portfolio and project management, practical experience at Power Academy</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
      </section>

        <section id="projects" className="py-10">
          <GlassCard>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">Featured Projects</h2>
                <p className="text-base md:text-lg font-medium text-gray-300 max-w-3xl mx-auto">
              A showcase of my technical projects and innovations
            </p>
          </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <a href="https://www.youtube.com/watch?v=3I6_HGFMFMQ&feature=youtu.be" target="_blank" rel="noopener noreferrer" className="group bg-gray-900/60 rounded-xl shadow-lg hover:shadow-2xl transition-transform duration-300 overflow-hidden flex flex-col cursor-pointer hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <div className="aspect-video bg-gradient-to-br from-green-200 to-green-400 flex items-center justify-center">
                    <span className="text-5xl text-green-400">
                      <svg width="64" height="64" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="currentColor"/><path d="M7 17l5-5 5 5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                  </div>
                  <div className="p-6 flex-1 flex flex-col relative">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold group-hover:text-green-600 transition-colors">GreenCart</h3>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-semibold">Flutter / Python</span>
                    </div>
                    <div className="mt-2">
                      <span className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm font-medium">
                        <ExternalLink size={14} />
                        View Project
                      </span>
                    </div>
                    <p className="text-gray-700 mb-2 text-sm leading-relaxed">Built GreenCart to promote sustainable shopping, securing 9,000 AED prize against 20 teams.</p>
                    <p className="text-gray-700 mb-2 text-sm leading-relaxed">Utilized Flutter for front-end, Python & Flask for back-end and integrated Google's Gemini & various APIs using JS.</p>
                    <p className="text-gray-700 mb-4 text-sm leading-relaxed">Enabled real-time product analysis and sustainability insights, aligning with 5 SDGs and the UAE's Green Agenda.</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Flutter</span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Python</span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Flask</span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Gemini</span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">REST API</span>
                    </div>
                  </div>
                </a>
                <a href="https://socia-ae.vercel.app/" target="_blank" rel="noopener noreferrer" className="group bg-gray-900/60 rounded-xl shadow-lg hover:shadow-2xl transition-transform duration-300 overflow-hidden flex flex-col cursor-pointer hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <div className="aspect-video bg-gradient-to-br from-blue-200 to-blue-400 flex items-center justify-center">
                    <span className="text-5xl text-blue-400">
                      <svg width="64" height="64" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="currentColor"/><path d="M7 17l5-5 5 5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                  </div>
                  <div className="p-6 flex-1 flex flex-col relative">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold group-hover:text-blue-600 transition-colors">Socia</h3>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-semibold">React Native / Python</span>
                    </div>
                    <div className="mt-2">
                      <span className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm font-medium">
                      <ExternalLink size={14} />
                      View Project
                      </span>
                    </div>
                    <p className="text-gray-700 mb-2 text-sm leading-relaxed">Implemented a cross-platform mobile app using React Native and Flask-Python backend integrated with Azure AI.</p>
                    <p className="text-gray-700 mb-4 text-sm leading-relaxed">Designed 4 realistic practice environments, improving user engagement and public speaking proficiency by 70%.</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Python</span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Expo</span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">React Native</span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Flask</span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Azure</span>
                    </div>
                  </div>
                </a>
                <a href="https://www.canva.com/design/DAGgCawTGH8/reEiSTx2A2L76Y9IYZbNmA/view?utm_content=DAGgCawTGH8&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h17cd0e311c" target="_blank" rel="noopener noreferrer" className="group bg-gray-900/60 rounded-xl shadow-lg hover:shadow-2xl transition-transform duration-300 overflow-hidden flex flex-col cursor-pointer hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <div className="aspect-video bg-gradient-to-br from-purple-200 to-purple-400 flex items-center justify-center">
                    <span className="text-5xl text-purple-400">
                      <svg width="64" height="64" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="currentColor"/><path d="M7 17l5-5 5 5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                  </div>
                  <div className="p-6 flex-1 flex flex-col relative">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold group-hover:text-purple-600 transition-colors">F.A.L.C.O.N. Flood Monitoring System</h3>
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full font-semibold">Python / CNN</span>
                </div>
                    <div className="mt-2">
                      <span className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm font-medium">
                        <ExternalLink size={14} />
                        View Project
                      </span>
              </div>
                    <p className="text-gray-700 mb-2 text-sm leading-relaxed">Deployed a YOLOv9 model for real-time flood segmentation on satellite imagery using DEMs for flood volume.</p>
                    <p className="text-gray-700 mb-4 text-sm leading-relaxed">Developed a cloud pipeline for scalable flood detection and visualization, supporting urban disaster planning in the UAE.</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Python</span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">CNN</span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Torch</span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">React</span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Flask</span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">OpenAI</span>
          </div>
        </div>
                </a>
                <a href="https://auro-uaehackathon.vercel.app/" target="_blank" rel="noopener noreferrer" className="group bg-gray-900/60 rounded-xl shadow-lg hover:shadow-2xl transition-transform duration-300 overflow-hidden flex flex-col cursor-pointer hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <div className="aspect-video bg-gradient-to-br from-yellow-200 to-yellow-400 flex items-center justify-center">
                    <span className="text-5xl text-yellow-400">
                      <svg width="64" height="64" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="currentColor"/><path d="M7 17l5-5 5 5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                  </div>
                  <div className="p-6 flex-1 flex flex-col relative">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold group-hover:text-yellow-600 transition-colors">AuroAI</h3>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full font-semibold">React Native / Python</span>
                    </div>
                    <div className="mt-2">
                      <span className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm font-medium">
                      <ExternalLink size={14} />
                      View Project
                      </span>
                    </div>
                    <p className="text-gray-700 mb-2 text-sm leading-relaxed">Implemented React Native frontend with Flask-Python/Azure AI backend for cross-platform Autism caregiver app.</p>
                    <p className="text-gray-700 mb-2 text-sm leading-relaxed">Built TensorFlow emotion-recognition pipeline integrated via Azure Cognitive Service.</p>
                    <p className="text-gray-700 mb-4 text-sm leading-relaxed">Developed Node.js WebSocket speech-to-text microservice delivering rapid feedback.</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Python</span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Expo</span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">TensorFlow</span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">React Native</span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Flask</span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Azure ML</span>
                    </div>
                  </div>
                </a>
                <a href="https://uavms.vercel.app/" target="_blank" rel="noopener noreferrer" className="group bg-gray-900/60 rounded-xl shadow-lg hover:shadow-2xl transition-transform duration-300 overflow-hidden flex flex-col cursor-pointer hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <div className="aspect-video bg-gradient-to-br from-cyan-200 to-cyan-400 flex items-center justify-center">
                    <span className="text-5xl text-cyan-400">
                      <svg width="64" height="64" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="currentColor"/><path d="M7 17l5-5 5 5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                  </div>
                  <div className="p-6 flex-1 flex flex-col relative">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold group-hover:text-cyan-600 transition-colors">UAVMS: UTM Drone Identification & Disambiguation</h3>
                      <span className="px-2 py-1 bg-cyan-100 text-cyan-800 text-xs rounded-full font-semibold">Python / YOLOv8</span>
                    </div>
                    <div className="mt-2">
                      <span className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm font-medium">
                        <ExternalLink size={14} />
                        View Project
                      </span>
                    </div>
                    <p className="text-gray-700 mb-2 text-sm leading-relaxed">Developed UAVMS to verify indoor drone identities by fusing AI visual detection (YOLOv8, 90.5% mAP) with our Indoor Positioning System data (±8cm accuracy).</p>
                    <p className="text-gray-700 mb-2 text-sm leading-relaxed">Engineered VIDTrack (Python) for real-time comparison of observed visual coordinates against reported positions.</p>
                    <p className="text-gray-700 mb-4 text-sm leading-relaxed">Created a comprehensive solution with a custom 50k+ image dataset and a GUI for robust indoor UTM monitoring.</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Python</span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">YOLOv8</span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">OpenCV</span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">ZED SDK</span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">PX4</span>
                  </div>
                </div>
                </a>
              </div>
          </div>
          </GlassCard>
      </section>

        <section id="competitions" className="py-10">
          <GlassCard>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-100">Competitions & Awards</h2>
                <p className="text-base md:text-lg font-medium text-gray-300 max-w-3xl mx-auto">
                  Recognitions and achievements from various competitions and hackathons
            </p>
          </div>
          <div className="space-y-8">
            {[
              {
                title: 'Zayed University Digital Transformation Hackathon',
                position: '1st Place',
                date: '2025',
                description: 'Developed F.A.L.C.O.N., a flood monitoring system using YOLOv9 and satellite imagery to aid disaster response.',
                achievement: '1st Place',
                participants: '14 teams',
                color: 'gold',
                logo: '/zu-logo.png',
                url: '#' // Replace with actual URL
              },
              {
                title: 'NYUAD Slush\'D AI Hackathon',
                position: '1st Place',
                date: '2025',
                description: 'Built Socia, a public speaking aid app with real-time AI feedback on fluency, tone, and emotion.',
                achievement: '1st Place',
                participants: '104 teams',
                color: 'gold',
                logo: '/nyu-logo.png',
                url: '#' // Replace with actual URL
              },
              {
                title: 'BCG Platinion Hackathon - Middle East',
                position: '1st Place',
                date: '2024',
                description: 'Created Scrap-E, an incentivized service for e-waste collection, validation, and recycling.',
                achievement: '1st Place',
                participants: 'Regional',
                color: 'gold',
                logo: '/bcg-logo.png',
                url: '#' // Replace with actual URL
              },
              {
                title: 'Smart Mobile Application Contest',
                position: '1st Place',
                date: '2024',
                description: 'Won with GreenCart, a sustainability-focused app for conscious food choices using AI analysis.',
                achievement: '1st Place',
                participants: '13 teams',
                color: 'gold',
                logo: '/ku-logo.png',
                url: '#' // Replace with actual URL
              },
              {
                title: 'MOExEPG Mail Robotics Competition',
                position: '2nd Place',
                date: '2023',
                description: 'Prototyped a gravity-fed mail sorting system with machine learning for automated mail processing.',
                achievement: '2nd Place',
                participants: 'National',
                color: 'silver',
                logo: '/moe-logo.jpg',
                url: '#' // Replace with actual URL
              },
              {
                title: 'IEEE UAE Section Student Day',
                position: 'University Representative',
                date: '2025',
                description: 'Showcased UAVMS, an AI-powered drone identification and location verification system.',
                achievement: 'Showcase',
                participants: '100+ projects',
                color: 'bronze',
                logo: '/ieee-logo.png',
                url: '#' // Replace with actual URL
              },
              {
                title: 'KU Film Festival',
                position: 'Best Director',
                date: '2024',
                description: 'Awarded for directing "Butterfly," a short film exploring the profound impact of the butterfly effect.',
                achievement: 'Special Award',
                participants: 'Festival',
                color: 'purple',
                logo: '/ku-logo.png',
                url: '#' // Replace with actual URL
              },
            ].map((competition, index) => {
              const competitionStyles: { [key: string]: any } = {
                gold: {
                  container: 'award-container-gold',
                  iconBg: 'bg-yellow-500/20',
                  iconColor: 'text-yellow-400',
                  positionColor: 'text-yellow-400',
                },
                silver: {
                  container: 'award-container-silver',
                  iconBg: 'bg-slate-400/20',
                  iconColor: 'text-slate-300',
                  positionColor: 'text-slate-300',
                },
                bronze: {
                  container: 'award-container-bronze',
                  iconBg: 'bg-orange-500/20',
                  iconColor: 'text-orange-400',
                  positionColor: 'text-orange-400',
                },
                purple: {
                  container: 'award-container-purple',
                  iconBg: 'bg-purple-500/20',
                  iconColor: 'text-purple-400',
                  positionColor: 'text-purple-400',
                },
              };
              const styles = competitionStyles[competition.color] || {
                container: 'bg-gray-900/60',
                iconBg: 'bg-gray-700/50',
                iconColor: 'text-gray-400',
                positionColor: 'text-gray-300',
              };

              return (
                <a 
                  key={index} 
                  href={competition.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group block rounded-xl p-6 flex items-start space-x-6 ${styles.container} cursor-pointer transition-all duration-300 ease-in-out`}
                >
                  <div className={`hidden md:flex flex-shrink-0 w-32 h-32 rounded-lg items-center justify-center shadow-md ${styles.iconBg}`}>
                    <CheckCircle size={56} className={styles.iconColor}/>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-4">
                        {competition.logo && (
                           <div className="w-10 h-10 rounded-lg p-1 flex-shrink-0 flex items-center justify-center shadow-sm" style={{ backgroundColor: 'white' }}>
                            <img src={competition.logo} alt={`${competition.title} logo`} className="max-w-full max-h-full object-contain" />
                           </div>
                        )}
                        <div>
                          <h3 className="text-gray-300 font-semibold">{competition.title}</h3>
                          <p className={`text-lg font-bold ${styles.positionColor}`}>{competition.position}</p>
                        </div>
                      </div>
                      <span className="text-gray-400 text-sm font-semibold">{competition.date}</span>
                    </div>
                    <p className="text-gray-300 mt-2 mb-4">{competition.description}</p>
                    <div className="flex gap-2">
                      <span className="award-tag">{competition.achievement}</span>
                      <span className="award-tag award-participants">{competition.participants}</span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
          </GlassCard>
      </section>

        <section id="creative" className="py-10">
          <GlassCard>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400">Creative Gallery</h2>
                <p className="text-lg text-gray-300">A vibrant showcase of my creative pursuits</p>
          </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <button onClick={() => setOpenGallery('photography')} className="group block rounded-2xl overflow-hidden shadow-xl bg-[#a21caf] hover:scale-105 transition-transform duration-300 border-4 border-pink-500 focus:outline-none">
                  <div className="aspect-video bg-pink-400 flex items-center justify-center">
                    <svg width="48" height="48" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#EC4899"/><path d="M8 12l2 2 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                  <div className="p-6 text-center bg-gray-900">
                    <h3 className="text-xl font-bold mb-2 text-pink-300">Photography</h3>
                    <p className="text-gray-300">Explore my best shots and photo stories</p>
                  </div>
                </button>
                <button onClick={() => setOpenGallery('videography')} className="group block rounded-2xl overflow-hidden shadow-xl bg-[#7c3aed] hover:scale-105 transition-transform duration-300 border-4 border-purple-500 focus:outline-none">
                  <div className="aspect-video bg-purple-400 flex items-center justify-center">
                    <svg width="48" height="48" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#8B5CF6"/><path d="M8 12l2 2 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                  <div className="p-6 text-center bg-gray-900">
                    <h3 className="text-xl font-bold mb-2 text-purple-300">Videography</h3>
                    <p className="text-gray-300">Short films, edits, and creative videos</p>
              </div>
                </button>
                <button onClick={() => setOpenGallery('design')} className="group block rounded-2xl overflow-hidden shadow-xl bg-[#1d4ed8] hover:scale-105 transition-transform duration-300 border-4 border-blue-500 focus:outline-none">
                  <div className="aspect-video bg-blue-400 flex items-center justify-center">
                    <svg width="48" height="48" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#3B82F6"/><path d="M8 12l2 2 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                  <div className="p-6 text-center bg-gray-900">
                    <h3 className="text-xl font-bold mb-2 text-blue-300">Design Work</h3>
                    <p className="text-gray-300">UI/UX, branding, and digital art</p>
                  </div>
                </button>
              </div>
              <div className="text-center mt-12">
                <a href="https://www.behance.net/your-behance" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-lg hover:from-purple-600 hover:to-blue-600 transition-all text-lg font-semibold">
                  <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.6 17.2C14.5333 16.8 15.0667 16.0667 15.0667 15.0667C15.0667 13.3333 13.6 12.8 11.7333 12.8H7.2V22.1333H11.7333C13.6 22.1333 15.0667 21.3333 15.0667 19.6C15.0667 18.6667 14.5333 17.8667 13.6 17.2ZM9.06667 14.4H11.6C12.5333 14.4 13.0667 14.8 13.0667 15.4667C13.0667 16.1333 12.5333 16.5333 11.6 16.5333H9.06667V14.4ZM11.8667 20.5333H9.06667V18.1333H11.8667C12.8 18.1333 13.3333 18.5333 13.3333 19.3333C13.3333 20.1333 12.8 20.5333 11.8667 20.5333ZM24.8 17.3333C23.7333 17.3333 22.9333 17.7333 22.6667 18.6667H26.1333C26.1333 18.6667 26.1333 17.3333 24.8 17.3333ZM22.6667 19.6C22.8 20.4 23.4667 20.6667 24.1333 20.6667C24.9333 20.6667 25.3333 20.2667 25.3333 19.7333H27.0667C26.9333 21.0667 25.8667 21.7333 24.1333 21.7333C22.1333 21.7333 21.0667 20.2667 21.0667 18.6667C21.0667 17.0667 22.1333 15.7333 24.1333 15.7333C25.8667 15.7333 26.9333 16.9333 26.9333 18.6667V19.0667H22.6667V19.6ZM20.2667 13.0667H25.6V14.1333H20.2667V13.0667Z" fill="white"/>
                  </svg>
                  More on my Behance Profile
                </a>
              </div>
              {openGallery && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm">
                  <div className="relative w-full max-w-3xl mx-auto rounded-2xl bg-gray-900 shadow-2xl p-6 flex flex-col">
                    <button onClick={() => setOpenGallery(null)} className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold focus:outline-none">&times;</button>
                    <h3 className="text-2xl font-bold mb-4 text-center text-white">
                      {openGallery === 'photography' && 'Photography Gallery'}
                      {openGallery === 'videography' && 'Videography Gallery'}
                      {openGallery === 'design' && 'Design Gallery'}
                    </h3>
                    <div className="flex gap-4 overflow-x-auto pb-2">
                      {openGallery === 'photography' && [
                        '/creative/photography/photo1.jpg',
                        '/creative/photography/photo2.jpg',
                        '/creative/photography/photo3.jpg',
                      ].map((src, i) => (
                        <img key={i} src={src} alt="Photography work" className="rounded-lg shadow-lg w-64 h-40 object-cover" />
                      ))}
                      {openGallery === 'videography' && [
                        '/creative/videography/video1.jpg',
                        '/creative/videography/video2.jpg',
                        '/creative/videography/video3.jpg',
                      ].map((src, i) => (
                        <img key={i} src={src} alt="Videography work" className="rounded-lg shadow-lg w-64 h-40 object-cover" />
                      ))}
                      {openGallery === 'design' && [
                        '/creative/design/design1.jpg',
                        '/creative/design/design2.jpg',
                        '/creative/design/design3.jpg',
                      ].map((src, i) => (
                        <img key={i} src={src} alt="Design work" className="rounded-lg shadow-lg w-64 h-40 object-cover" />
            ))}
          </div>
        </div>
                </div>
              )}
            </div>
          </GlassCard>
      </section>

        <section id="contact" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Get In Touch</h2>
              <p className="text-lg text-gray-700">
              Let's discuss opportunities, collaborations, or just connect!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <Mail className="text-blue-600" size={20} />
                  <a
                    href="mailto:smaffan21@gmail.com"
                      className="text-gray-700 hover:text-blue-600"
                  >
                    smaffan21@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                    <Linkedin className="text-blue-600" size={20} />
                  <a
                    href="https://www.linkedin.com/in/syed-m-affan/"
                  target="_blank"
                  rel="noopener noreferrer"
                      className="text-gray-700 hover:text-blue-600"
                  >
                    linkedin.com/in/syed-m-affan
                  </a>
                </div>
                <div className="flex items-center gap-3">
                    <a
                      href="https://wa.me/971507329827"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-500 hover:text-green-600 flex items-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="20" height="20"><path d="M12.004 2.003a9.994 9.994 0 0 0-8.77 14.98l-1.18 4.32a1 1 0 0 0 1.22 1.22l4.32-1.18a9.994 9.994 0 1 0 4.41-19.34zm0 18.002a7.99 7.99 0 0 1-4.09-1.13l-.29-.17-2.56.7.7-2.56-.17-.29A7.99 7.99 0 1 1 20 12.003a7.98 7.98 0 0 1-7.996 8.002zm4.36-6.19c-.24-.12-1.41-.7-1.63-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.92-1.18-.71-.63-1.19-1.41-1.33-1.65-.14-.24-.01-.37.11-.49.12-.12.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54z"/></svg>
                      WhatsApp
                    </a>
                    <span className="text-gray-700">+971 50 732 9827</span>
                </div>
                <div className="flex items-center gap-3">
                    <MapPin className="text-blue-600" size={20} />
                    <span className="text-gray-700">United Arab Emirates</span>
                </div>
              </div>

              <div className="mt-8">
                {/* <h4 className="font-semibold mb-4">Download Resume</h4> */}
                {/* <a
                  href="/Syed M. Affan - BSc. Computer Engineering - Resume.pdf"
                  download
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <Download size={20} />
                  Download PDF
                </a> */}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6">Send a Message</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                    placeholder="Your message..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

        <footer className="py-8 border-t border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
                <p className="text-gray-700">
                  Made with 🤍 by Afft
              </p>
            </div>
            <div className="flex space-x-6">
              <a
                href="mailto:smaffan21@gmail.com"
                  className="text-gray-700 hover:text-blue-600"
              >
                <Mail size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/syed-m-affan/"
                target="_blank"
                rel="noopener noreferrer"
                  className="text-gray-700 hover:text-blue-600"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                  className="text-gray-700 hover:text-blue-600"
              >
                <Github size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
      {showSnake && <SnakeGame onClose={() => setShowSnake(false)} />}
    </MorphingBackground>
  );
};

export default App;