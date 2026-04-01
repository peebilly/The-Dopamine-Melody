/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, Component, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Brain3D from './components/Brain3D';

// --- Error Boundary ---
class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean, error: Error | null }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-cream flex flex-col items-center justify-center p-6 text-center">
          <h1 className="text-4xl font-bold text-dopamine-orange mb-4 font-sans">อุ๊ปส์! เกิดข้อผิดพลาดบางอย่าง</h1>
          <p className="text-lg text-ink/70 mb-8 max-w-md font-sans">
            แอปพลิเคชันพบข้อผิดพลาดที่ไม่คาดคิด โปรดลองรีเฟรชหน้าเว็บอีกครั้ง
          </p>
          <div className="bg-white p-4 rounded-lg border border-ink/10 text-left overflow-auto max-w-2xl w-full">
            <code className="text-xs text-red-600">{this.state.error?.toString()}</code>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="mt-8 bg-dopamine-yellow text-white px-8 py-3 rounded-full font-bold shadow-lg font-sans"
          >
            รีเฟรชหน้าเว็บ
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
import { 
  Brain, 
  Play, 
  X, 
  Mail, 
  Facebook, 
  ChevronRight, 
  Menu, 
  User,
  Clock,
  MessageSquare
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'หน้าแรก', href: '#home' },
    { name: 'วิดีโอ', href: '#video' },
    { name: 'สาระน่ารู้', href: '#update' },
    { name: 'เกี่ยวกับเรา', href: '#about' },
    { name: 'ติดต่อเรา', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-cream/80 backdrop-blur-md border-b border-ink/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="w-8 h-8 text-dopamine-yellow" />
          <span className="title-prompt text-xl tracking-tighter">DOPAMINE STUDIO</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a 
              key={item.name} 
              href={item.href}
              className="text-sm font-medium uppercase tracking-widest hover:text-dopamine-orange transition-colors"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-20 left-0 w-full bg-cream border-b border-ink/10 p-6 flex flex-col gap-4 shadow-xl"
          >
            {navItems.map((item) => (
              <a 
                key={item.name} 
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium uppercase tracking-widest"
              >
                {item.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onWatchClick }: { onWatchClick: () => void }) => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden px-6">
      {/* Background Decorative Icons */}
      <motion.div 
        animate={{ y: [0, -20, 0], rotate: [-12, -8, -12] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-40 right-[15%] text-dopamine-yellow/40 text-9xl font-bold select-none pointer-events-none hidden md:block"
      >
        ?
      </motion.div>
      <motion.div 
        animate={{ y: [0, 20, 0], rotate: [12, 15, 12] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-40 left-[10%] text-dopamine-yellow/40 text-8xl font-bold select-none pointer-events-none hidden md:block"
      >
        ?
      </motion.div>
      <motion.div 
        animate={{ x: [0, 15, 0], y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-[20%] text-dopamine-yellow/30 text-7xl select-none pointer-events-none"
      >
        ♪
      </motion.div>
      <motion.div 
        animate={{ x: [0, -15, 0], y: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/3 right-[10%] text-dopamine-yellow/40 text-8xl select-none pointer-events-none"
      >
        ♫
      </motion.div>
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 right-[5%] text-dopamine-yellow/35 text-6xl select-none pointer-events-none hidden lg:block"
      >
        ♬
      </motion.div>
      <motion.div 
        animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[15%] left-[25%] text-dopamine-yellow/35 text-7xl select-none pointer-events-none hidden md:block"
      >
        ♪
      </motion.div>
      <motion.div 
        animate={{ rotate: [0, 15, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[15%] left-[40%] text-dopamine-yellow/25 text-6xl select-none pointer-events-none hidden lg:block"
      >
        ♫
      </motion.div>
      <motion.div 
        animate={{ y: [0, 25, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[50%] left-[12%] text-dopamine-yellow/35 text-8xl font-bold select-none pointer-events-none hidden md:block"
      >
        ?
      </motion.div>
      <motion.div 
        animate={{ x: [0, -20, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[45%] right-[35%] text-dopamine-yellow/35 text-7xl select-none pointer-events-none hidden lg:block"
      >
        ♬
      </motion.div>
      <motion.div 
        animate={{ y: [0, -30, 0], rotate: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] right-[45%] text-dopamine-yellow/40 text-5xl select-none pointer-events-none hidden md:block"
      >
        ♪
      </motion.div>
      <motion.div 
        animate={{ scale: [1, 1.3, 1], rotate: [0, -15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[10%] right-[25%] text-dopamine-yellow/40 text-9xl font-bold select-none pointer-events-none hidden lg:block"
      >
        ?
      </motion.div>
      <motion.div 
        animate={{ x: [0, 20, 0], y: [0, 15, 0] }}
        transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[65%] left-[35%] text-dopamine-yellow/30 text-8xl select-none pointer-events-none hidden md:block"
      >
        ♫
      </motion.div>
      <motion.div 
        animate={{ rotate: [0, 360, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[30%] left-[45%] text-dopamine-yellow/35 text-6xl select-none pointer-events-none"
      >
        ♬
      </motion.div>
      <motion.div 
        animate={{ y: [0, -40, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[35%] right-[20%] text-dopamine-yellow/40 text-7xl select-none pointer-events-none hidden md:block"
      >
        ♪
      </motion.div>
      <motion.div 
        animate={{ scale: [0.8, 1.1, 0.8], rotate: [0, 10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[55%] left-[5%] text-dopamine-yellow/25 text-8xl font-bold select-none pointer-events-none hidden lg:block"
      >
        ?
      </motion.div>

      {/* Decorative Lines (Corner accents from screenshot) */}
      <div className="absolute top-0 left-0 w-64 h-64 pointer-events-none opacity-20 md:opacity-100">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <path d="M0,0 Q100,0 200,100" fill="none" stroke="black" strokeWidth="2" />
          <path d="M0,20 Q90,20 180,110" fill="none" stroke="black" strokeWidth="2" />
          <path d="M0,40 Q80,40 160,120" fill="none" stroke="black" strokeWidth="2" />
          <path d="M0,60 Q70,60 140,130" fill="none" stroke="black" strokeWidth="2" />
        </svg>
      </div>
      <div className="absolute bottom-0 right-0 w-64 h-64 pointer-events-none rotate-180 opacity-20 md:opacity-100">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <path d="M0,0 Q100,0 200,100" fill="none" stroke="black" strokeWidth="2" />
          <path d="M0,20 Q90,20 180,110" fill="none" stroke="black" strokeWidth="2" />
          <path d="M0,40 Q80,40 160,120" fill="none" stroke="black" strokeWidth="2" />
          <path d="M0,60 Q70,60 140,130" fill="none" stroke="black" strokeWidth="2" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center z-10">
        {/* Left Column: 3D Brain */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex justify-center md:justify-end"
        >
          <Brain3D />
        </motion.div>

        {/* Right Column: Text & Button */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-center md:text-left"
        >
          <h1 className="font-sans font-bold text-5xl md:text-7xl lg:text-8xl leading-none mb-4 text-dopamine-yellow tracking-tighter">
            THE<br />DOPAMINE<br />MELODY
          </h1>
          <p className="text-lg md:text-xl uppercase tracking-[0.3em] font-medium mb-12 opacity-70">
            โมชั่นกราฟิกอธิบายความรู้
          </p>

          <div className="flex justify-center md:justify-start">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onWatchClick}
              className="bg-dopamine-orange text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl shadow-dopamine-orange/20 flex items-center gap-3 group transition-all hover:bg-dopamine-yellow"
            >
              <Play className="fill-current" />
              รับชมวิดีโอ!
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const VideoSection = () => {
  return (
    <section id="video" className="py-24 px-6 bg-dopamine-yellow scroll-mt-20 overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 text-white/30 text-6xl font-bold select-none">?</div>
      <div className="absolute bottom-10 right-10 text-white/30 text-6xl font-bold select-none">?</div>
      <div className="absolute top-1/4 right-10 text-dopamine-orange/30 text-5xl select-none">♪</div>
      <div className="absolute bottom-1/4 left-10 text-dopamine-orange/30 text-5xl select-none">♫</div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-sans font-bold text-5xl md:text-7xl mb-4 tracking-tight text-white drop-shadow-sm">THE DOPAMINE MELODY</h2>
          <p className="text-lg uppercase tracking-[0.3em] font-medium text-ink/60">รับชมวิดีโออธิบายเรื่อง Dopamine Melody</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full max-w-5xl mx-auto aspect-video bg-ink rounded-3xl overflow-hidden shadow-2xl relative group"
        >
          {/* YouTube Video Player */}
          <iframe 
            className="w-full h-full"
            src="https://www.youtube.com/embed/ebfQ_NMPkIE"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
          
          {/* Overlay text if needed */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-white/10 backdrop-blur-md px-8 py-4 rounded-full border border-white/20">
              <p className="text-white font-medium tracking-widest">วิดีโออธิบายเรื่อง DOPAMINE MELODY</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const PostModal = ({ post, onClose }: { post: any, onClose: () => void }) => {
  if (!post) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] bg-ink/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-cream w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl relative shadow-2xl"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-ink hover:text-dopamine-orange transition-colors z-10 bg-white/50 backdrop-blur-md p-2 rounded-full"
        >
          <X size={24} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="h-64 md:h-auto relative">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-6 left-6 bg-dopamine-yellow px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-ink">
              สาระน่ารู้
            </div>
          </div>
          
          <div className="p-8 md:p-12">
            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest opacity-40 mb-6">
              <span className="flex items-center gap-1"><User size={14} /> {post.author}</span>
              <span className="flex items-center gap-1"><Clock size={14} /> {post.date}</span>
            </div>
            
            <h2 className="font-sans font-bold text-3xl md:text-4xl mb-6 leading-tight tracking-tight">
              {post.title}
            </h2>
            
            <div className="space-y-6 text-ink/70 leading-relaxed">
              <p className="text-xl font-medium text-ink/90 italic">
                {post.excerpt}
              </p>
              <p>
                โดปามีนเป็นสารสื่อประสาทที่ร่างกายสร้างขึ้น และระบบประสาทใช้เพื่อส่งข้อความระหว่างเซลล์ประสาท นั่นเป็นเหตุผลที่บางครั้งเรียกว่าสารเคมีส่งข้อความ
              </p>
              <p>
                มันมีบทบาทสำคัญในการที่เรารู้สึกถึงความพึงพอใจ โดยเฉพาะอย่างยิ่งเมื่อเราฟังเพลงที่ไพเราะ สมองจะหลั่งโดปามีนออกมาทำให้เรารู้สึกมีความสุขและผ่อนคลาย
              </p>
              <p>
                ในการอัปเดตรายละเอียดนี้ เราจะสำรวจว่าการฟังเพลงส่งผลต่อเส้นทางการให้รางวัลของสมองอย่างไร และงานวิจัยล่าสุดกล่าวว่าอย่างไรเกี่ยวกับการใช้ดนตรีเพื่อเพิ่มสุขภาพจิตและประสิทธิภาพในการทำงาน
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-ink/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-dopamine-yellow flex items-center justify-center font-bold text-ink">
                  A
                </div>
                <div>
                  <div className="text-sm font-bold">{post.author}</div>
                  <div className="text-[10px] uppercase tracking-widest opacity-50">ผู้สร้างคอนเทนต์</div>
                </div>
              </div>
              
              <button 
                onClick={onClose}
                className="text-sm font-bold uppercase tracking-widest border-b-2 border-dopamine-orange hover:text-dopamine-orange transition-colors"
              >
                ปิดบทความ
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const UpdateSection = () => {
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const posts = [
    {
      id: 1,
      title: "สมองกับการฟังเพลง",
      excerpt: "การฟังเพลงที่คุณชอบช่วยกระตุ้นการหลั่งโดปามีนในสมองส่วนที่เกี่ยวข้องกับความพึงพอใจ",
      author: "Admin",
      date: "20 มี.ค. 2026",
      image: "https://picsum.photos/seed/brain-music/800/600"
    },
    {
      id: 2,
      title: "โดปามีนและจังหวะดนตรี",
      excerpt: "วิทยาศาสตร์เบื้องหลังว่าทำไมจังหวะดนตรีถึงช่วยเพิ่มสมาธิและอารมณ์ผ่านการเปลี่ยนแปลงทางเคมีในสมอง",
      author: "Admin",
      date: "18 มี.ค. 2026",
      image: "https://picsum.photos/seed/rhythm/800/600"
    },
    {
      id: 3,
      title: "เสียงเพลงและระบบรางวัล",
      excerpt: "สำรวจว่าแนวเพลงที่แตกต่างกันส่งผลต่อระดับโดปามีนและความเป็นอยู่ที่ดีทางอารมณ์อย่างไร",
      author: "Admin",
      date: "15 มี.ค. 2026",
      image: "https://picsum.photos/seed/neuroscience/800/600"
    }
  ];

  return (
    <section id="update" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <h2 className="font-sans font-bold text-5xl md:text-7xl mb-4 tracking-tight">สาระน่ารู้เรื่องโดปามีน</h2>
            <p className="text-lg opacity-60 uppercase tracking-widest">แบ่งปันความรู้และข้อมูลใหม่ๆ</p>
          </div>
          <div className="flex items-center gap-2 text-dopamine-orange font-bold uppercase tracking-widest text-sm">
            บทความทั้งหมด <ChevronRight size={16} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {posts.map((post) => (
            <motion.article 
              key={post.id}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6 relative">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  สาระน่ารู้
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest opacity-40 mb-3">
                <span className="flex items-center gap-1"><User size={12} /> {post.author}</span>
                <span className="flex items-center gap-1"><Clock size={12} /> {post.date}</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-dopamine-orange transition-colors">{post.title}</h3>
              <p className="text-ink/60 leading-relaxed mb-4">{post.excerpt}</p>
              <div 
                onClick={() => setSelectedPost(post)}
                className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest group-hover:gap-4 transition-all"
              >
                อ่านเพิ่มเติม <ChevronRight size={14} />
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedPost && (
          <PostModal 
            post={selectedPost} 
            onClose={() => setSelectedPost(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};

const JourneyModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] bg-ink/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            className="bg-cream w-full max-w-5xl h-full max-h-[90vh] overflow-y-auto rounded-3xl relative shadow-2xl p-8 md:p-16"
          >
            <button 
              onClick={onClose}
              className="absolute top-8 right-8 text-ink hover:text-dopamine-orange transition-colors z-10 bg-white/50 backdrop-blur-md p-3 rounded-full"
            >
              <X size={28} />
            </button>

            <div className="max-w-3xl mx-auto">
              <h2 className="font-sans font-bold text-5xl md:text-7xl mb-12 tracking-tight text-dopamine-yellow">กว่าจะมาเป็นเรา</h2>
              
              <div className="space-y-12 text-lg text-ink/80 leading-relaxed">
                <section className="relative pl-12 border-l-2 border-dopamine-orange/30">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-dopamine-orange" />
                  <h3 className="text-2xl font-bold mb-4 text-ink">จุดเริ่มต้นของแรงบันดาลใจ</h3>
                  <p>
                    โปรเจกต์นี้เริ่มต้นจากความสงสัยว่า "ทำไมดนตรีถึงทำให้เรามีความสุข?" เราจึงเริ่มศึกษาเรื่องระบบประสาทและสารโดปามีน จนพบว่ามันคือท่วงทำนองที่ซ่อนอยู่ในสมองของเราทุกคน
                  </p>
                </section>

                <section className="relative pl-12 border-l-2 border-dopamine-orange/30">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-dopamine-orange" />
                  <h3 className="text-2xl font-bold mb-4 text-ink">การออกแบบและการทดลอง</h3>
                  <p>
                    เราใช้เวลาหลายเดือนในการทดลองสไตล์ภาพที่สามารถสื่อสารความรู้สึกของสารเคมีในสมองได้ จนออกมาเป็นสไตล์โมชั่นกราฟิกที่สดใสและเข้าใจง่ายอย่างที่เห็นในปัจจุบัน
                  </p>
                </section>

                <section className="relative pl-12 border-l-2 border-dopamine-orange/30">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-dopamine-orange" />
                  <h3 className="text-2xl font-bold mb-4 text-ink">เป้าหมายในอนาคต</h3>
                  <p>
                    เรามุ่งหวังที่จะสร้างสรรค์คอนเทนต์ที่ให้ความรู้ควบคู่ไปกับความบันเทิง เพื่อให้ทุกคนเข้าใจตัวเองและสมองของตัวเองได้ดียิ่งขึ้นผ่านท่วงทำนองของโดปามีน
                  </p>
                </section>
              </div>

              <div className="mt-16 text-center">
                <button 
                  onClick={onClose}
                  className="bg-dopamine-orange text-white px-12 py-4 rounded-full font-bold text-xl shadow-xl hover:bg-dopamine-yellow transition-colors"
                >
                  กลับสู่หน้าหลัก
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const AboutSection = () => {
  const [isJourneyOpen, setIsJourneyOpen] = useState(false);
  return (
    <section id="about" className="py-24 px-6 bg-cream overflow-hidden relative">
      <JourneyModal isOpen={isJourneyOpen} onClose={() => setIsJourneyOpen(false)} />
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-sans font-bold text-5xl md:text-7xl mb-8 tracking-tight">เกี่ยวกับโปรเจกต์นี้</h2>
          <div className="space-y-6 text-lg text-ink/70 leading-relaxed">
            <p>
              "The Dopamine Melody" เป็นโปรเจกต์โมชั่นกราฟิกเชิงทดลองที่ถ่ายทอดกระบวนการทางเคมีอันซับซ้อนของสมองผ่านมุมมองของดนตรีและจังหวะ
            </p>
            <p>
              ด้วยการผสมผสานสุนทรียศาสตร์ที่สดใสเข้ากับการเล่าเรื่องเชิงการศึกษา เรามุ่งหวังที่จะทำให้ประสาทวิทยาศาสตร์เป็นเรื่องที่เข้าถึงได้และน่าสนใจสำหรับทุกคน โดปามีนไม่ใช่แค่เรื่องของความพึงพอใจ แต่เป็นท่วงทำนองของการรอคอย แรงจูงใจ และรางวัล
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-2 gap-8">
            <div className="border-l-4 border-dopamine-yellow pl-6">
              <div className="text-4xl title-prompt mb-1">98%</div>
              <div className="text-sm uppercase tracking-widest font-bold opacity-50">อัตราการมีส่วนร่วม</div>
            </div>
            <div className="border-l-4 border-dopamine-orange pl-6">
              <div className="text-4xl title-prompt mb-1">15k+</div>
              <div className="text-sm uppercase tracking-widest font-bold opacity-50">ผู้เรียนที่เข้าถึง</div>
            </div>
          </div>

          <div className="mt-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsJourneyOpen(true)}
              className="bg-ink text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl flex items-center gap-3 group transition-all hover:bg-dopamine-orange"
            >
              กว่าจะมาเป็นเรา
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="aspect-square rounded-full bg-dopamine-yellow/10 absolute -inset-10 animate-pulse" />
          <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl rotate-3">
            <img 
              src="/Brain.jpg" 
              alt="Brain" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Floating elements */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-dopamine-orange rounded-full flex items-center justify-center text-white font-bold text-center p-4 shadow-xl -rotate-12">
            โปรดติดตาม!
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ContactFooter = () => {
  return (
    <footer id="contact" className="bg-ink text-white pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-20">
          <div>
            <h2 className="font-sans font-bold text-5xl md:text-7xl mb-8 text-dopamine-yellow tracking-tight">ติดต่อผู้สร้าง</h2>
            <p className="text-white/60 text-lg mb-12 max-w-md">
              มีคำถามเกี่ยวกับโปรเจกต์หรือต้องการร่วมงานกับเรา? ติดต่อเราได้ผ่านช่องทางเหล่านี้
            </p>
            
            <div className="space-y-6">
              <a href="mailto:peekcnvs@gmail.com" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-dopamine-orange transition-colors">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest opacity-50 font-bold">อีเมล</div>
                  <div className="text-lg">peekcnvs@gmail.com</div>
                </div>
              </a>
              <a href="#" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-dopamine-orange transition-colors">
                  <Facebook size={20} />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest opacity-50 font-bold">เฟซบุ๊ก</div>
                  <div className="text-lg">Dopamine Melody Official</div>
                </div>
              </a>
            </div>
          </div>

          <div className="bg-white/5 p-8 md:p-12 rounded-3xl border border-white/10">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold opacity-50">ชื่อ</label>
                  <input type="text" className="w-full bg-white/10 border-b border-white/20 py-3 px-4 focus:outline-none focus:border-dopamine-yellow transition-colors" placeholder="ชื่อของคุณ" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold opacity-50">อีเมล</label>
                  <input type="email" className="w-full bg-white/10 border-b border-white/20 py-3 px-4 focus:outline-none focus:border-dopamine-yellow transition-colors" placeholder="your@email.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold opacity-50">ข้อความ</label>
                <textarea rows={4} className="w-full bg-white/10 border-b border-white/20 py-3 px-4 focus:outline-none focus:border-dopamine-yellow transition-colors resize-none" placeholder="เราจะช่วยคุณได้อย่างไร?"></textarea>
              </div>
              <button className="w-full bg-dopamine-yellow text-ink font-bold py-4 rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-2">
                ส่งข้อความ <MessageSquare size={18} />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-dopamine-yellow" />
            <span className="title-prompt text-lg tracking-tighter">DOPAMINE STUDIO</span>
          </div>
          
          <div className="text-center">
            <p className="title-prompt text-2xl md:text-4xl italic opacity-80">ขอบคุณที่รับชม</p>
          </div>

          <div className="text-xs uppercase tracking-[0.2em] opacity-30">
            © 2026 THE DOPAMINE MELODY
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  useEffect(() => {
    console.log("กำลังเริ่มต้นแอป Dopamine Studio...");
  }, []);

  // Smooth scroll implementation
  useEffect(() => {
    const handleScroll = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')?.substring(1);
        const element = document.getElementById(id!);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    window.addEventListener('click', handleScroll);
    return () => window.removeEventListener('click', handleScroll);
  }, []);

  return (
    <ErrorBoundary>
      <div className="selection:bg-dopamine-yellow selection:text-ink">
        <Navbar />
        
        <main>
          <Hero onWatchClick={() => {
            const element = document.getElementById('video');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }} />
          
          <VideoSection />
          
          <UpdateSection />
          
          <AboutSection />
        </main>

        <ContactFooter />
      </div>
    </ErrorBoundary>
  );
}
