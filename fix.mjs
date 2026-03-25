import fs from 'fs';

let content = fs.readFileSync('./src/App.tsx', 'utf8');

const badChunk = \`function handleFirestoreError(error: unknown) {
  console.error("Supabase Error:", error);
  toast.error("Error en base de datos. Verifica RLS.");
}

// --- COMPONENTS ---
      console.error("Payment error:", error);
\`;

const goodChunk = \`function handleFirestoreError(error: unknown) {
  console.error("Supabase Error:", error);
  toast.error("Error en base de datos. Verifica RLS.");
}

// --- COMPONENTS ---

// --- LLM BANNER COMPONENT ---
const LLMBanner = () => {
  const llms = [
    { 
      name: "ChatGPT", 
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5153-4.9108 6.0462 6.0462 0 0 0-4.7471-3.124 5.9867 5.9867 0 0 0-7.6927-1.0659 6.0479 6.0479 0 0 0-3.124 4.7471 5.9885 5.9885 0 0 0-1.0659 7.6927 6.0462 6.0462 0 0 0 4.7471 3.124 5.9867 5.9867 0 0 0 .5153 4.9108 6.0462 6.0462 0 0 0 4.7471 3.124 5.9867 5.9867 0 0 0 7.6927 1.0659 6.0479 6.0479 0 0 0 3.124-4.7471 5.9885 5.9885 0 0 0 1.0659-7.6927 6.0462 6.0462 0 0 0-4.7471-3.124zm-9.0359 10.1087c-1.2231 0-2.2154-.9923-2.2154-2.2154v-1.1077h1.1077c1.2231 0 2.2154.9923 2.2154 2.2154v1.1077h-1.1077zm-1.1077-4.4308c-1.2231 0-2.2154-.9923-2.2154-2.2154v-1.1077h1.1077c1.2231 0 2.2154.9923 2.2154 2.2154v1.1077h-1.1077zm-4.4308-1.1077c-1.2231 0-2.2154-.9923-2.2154-2.2154v-1.1077h1.1077c1.2231 0 2.2154.9923 2.2154 2.2154v1.1077h-1.1077zm1.1077-4.4308c-1.2231 0-2.2154-.9923-2.2154-2.2154v-1.1077h1.1077c1.2231 0 2.2154.9923 2.2154 2.2154v1.1077h-1.1077zm4.4308-1.1077c-1.2231 0-2.2154-.9923-2.2154-2.2154v-1.1077h1.1077c1.2231 0 2.2154.9923 2.2154 2.2154v1.1077h-1.1077zm1.1077 4.4308c1.2231 0 2.2154.9923 2.2154 2.2154v1.1077h-1.1077c-1.2231 0-2.2154-.9923-2.2154-2.2154v-1.1077h1.1077z" />
        </svg>
      )
    },
    { 
      name: "Midjourney", 
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 18C4 18 6 16 12 16C18 16 20 18 20 18M4 18L7 6L12 4L17 6L20 18M12 4V16" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4 18C4 18 6 20 12 20C18 20 20 18 20 18" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    { 
      name: "Gemini", 
      icon: <Sparkles size={20} className="text-white" />
    },
    { 
      name: "Claude", 
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" />
          <path d="M12 10L12 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="12" cy="10" r="1" fill="currentColor" />
          <path d="M12 4L12.5 7L15 7.5L12.5 8L12 11L11.5 8L9 7.5L11.5 7L12 4Z" transform="translate(4, 4) scale(0.5)" />
          <path d="M12 4L12.5 7L15 7.5L12.5 8L12 11L11.5 8L9 7.5L11.5 7L12 4Z" transform="translate(-4, -4) scale(0.5)" />
        </svg>
      )
    },
    { 
      name: "Copilot", 
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM11 7H13V13H11V7ZM11 15H13V17H11V15Z" />
        </svg>
      )
    }
  ];

  return (
    <div className="w-full bg-black py-6 border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <button className="text-gray-600 hover:text-white transition-colors">
          <ChevronLeft size={20} />
        </button>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {llms.map((llm, i) => (
            <div key={i} className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity cursor-default">
              <div className="text-white">
                {llm.icon}
              </div>
              <span className="text-white font-bold text-lg tracking-tight">{llm.name}</span>
            </div>
          ))}
        </div>

        <button className="text-gray-600 hover:text-white transition-colors">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

const Navbar = ({ user }: { user: FirebaseUser | null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed w-full z-50 transition-all duration-300",
      scrolled ? "bg-black/90 backdrop-blur-md py-3 border-b border-white/10" : "bg-transparent py-5"
    )}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FF5B00] rounded-lg flex items-center justify-center font-bold text-black text-lg italic tracking-tighter shadow-[0_0_15px_rgba(255,91,0,0.3)]">CIX</div>
          <div className="flex flex-col leading-none">
            <span className="text-white font-bold text-xl tracking-tighter uppercase leading-none">CIX</span>
            <span className="text-[10px] text-gray-400 font-medium uppercase tracking-[0.1em] hidden sm:block mt-0.5">Centro de Innovación Tecnológica</span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-8 text-xs font-medium uppercase tracking-widest">
          <a href="#" className="text-white hover:text-[#FF5B00] transition-colors">Inicio</a>
          <a href="#cursos" className="text-white hover:text-[#FF5B00] transition-colors">Programas</a>
          <a href="#ecosistema" className="text-white hover:text-[#FF5B00] transition-colors">Ecosistema</a>
          
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-white">
                <img src={user.user_metadata?.avatar_url || ''} alt={user.user_metadata?.full_name || ''} className="w-8 h-8 rounded-full border border-white/20" referrerPolicy="no-referrer" />
                <span className="hidden xl:inline">{user.user_metadata?.full_name}</span>
              </div>
              <button onClick={signInWithEmail} className="text-gray-400 hover:text-white transition-colors">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <button 
              onClick={signInWithEmail}
              className="bg-[#FF5B00] text-black px-6 py-2 rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-2"
            >
              <User size={16} /> Iniciar Sesión
            </button>
          )}
        </div>

        <button className="lg:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-black border-b border-white/10 p-6 flex flex-col gap-4 lg:hidden"
          >
            <a href="#" className="text-white py-2">Inicio</a>
            <a href="#cursos" className="text-white py-2 border-t border-white/5">Programas</a>
            <a href="#ecosistema" className="text-white py-2 border-t border-white/5">Ecosistema</a>
            {user ? (
              <button onClick={signInWithEmail} className="text-[#FF5B00] py-2 border-t border-white/5 text-left">Cerrar Sesión</button>
            ) : (
              <button onClick={signInWithEmail} className="bg-[#FF5B00] text-black px-6 py-3 rounded-xl font-bold mt-2 tracking-widest uppercase text-xs">Iniciar Sesión</button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ToolNode = ({ tool, side }: { tool: any, side: string }) => (
  <motion.div 
    initial={{ opacity: 0, x: side === 'left' ? -20 : 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="relative group w-48 md:w-56"
  >
    <div className={\`absolute inset-0 blur-xl opacity-20 group-hover:opacity-40 transition-opacity rounded-xl\`} style={{ backgroundColor: tool.color }} />
    <div className="relative bg-[#111] border border-white/10 p-4 rounded-xl flex items-center gap-3 transition-all group-hover:border-white/20">
      <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: \`\${tool.color}22\`, border: \`1px solid \${tool.color}44\` }}>
        {tool.icon}
      </div>
      <span className="text-white font-semibold text-sm md:text-base tracking-tight">{tool.name}</span>
    </div>
  </motion.div>
);

const CourseCard = ({ course, onOpenDetails, highlight }: { course: any, onOpenDetails: (course: any) => void, highlight?: boolean }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className={cn(
      "bg-[#111] rounded-3xl overflow-hidden border flex flex-col h-full group cursor-pointer transition-all duration-500",
      highlight ? "border-[#FF5B00] shadow-[0_0_30px_rgba(255,91,0,0.2)] scale-[1.02]" : "border-white/5"
    )}
    onClick={() => onOpenDetails(course)}
  >
    <div className="relative aspect-video bg-gradient-to-br from-[#222] to-black flex items-center justify-center overflow-hidden">
      <div className={cn(
        "absolute inset-0 transition-opacity",
        highlight ? "bg-[#FF5B00]/20 opacity-100" : "bg-[#FF5B00]/10 opacity-0 group-hover:opacity-100"
      )} />
      <div className={cn(
        "p-4 rounded-full transition-transform",
        highlight ? "bg-[#FF5B00] text-black scale-110" : "bg-[#FF5B00]/20 text-[#FF5B00] group-hover:scale-125"
      )}>
        <PlayCircle size={48} strokeWidth={1} />
      </div>
      {course.tag && (
        <span className="absolute top-4 right-4 bg-[#FF5B00] text-black text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">
          {course.tag}
        </span>
      )}
    </div>
    <div className="p-8 flex flex-col flex-grow">
      <h3 className="text-xl font-bold text-white mb-3 leading-tight">{course.title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">{course.desc}</p>
      
      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-3 text-xs text-gray-300">
          <Clock size={16} className="text-[#FF5B00]" />
          <span>Dedicación: {course.duration}</span>
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-300">
          <Globe size={16} className="text-[#FF5B00]" />
          <span>Modalidad: {course.modality}</span>
        </div>
        {course.cert && (
          <div className="flex items-center gap-3 text-xs text-[#FF5B00] font-semibold">
            <Award size={16} />
            <span>Certificación Oficial CIX</span>
          </div>
        )}
      </div>

      <button className="w-full bg-white/5 group-hover:bg-[#FF5B00] text-white group-hover:text-black py-3 rounded-2xl font-bold transition-all flex items-center justify-center gap-2">
        Ver detalles <ArrowRight size={16} />
      </button>
    </div>
  </motion.div>
);

// --- PAYMENT MODAL ---
const PaymentModal = ({ isOpen, onClose, course, user }: { isOpen: boolean, onClose: () => void, course: any, user: FirebaseUser | null }) => {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    if (!user) {
      toast.error("Inicia sesión para completar el pago.");
      return;
    }
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
      await supabase.from('enrollments').insert({
        user_id: user.id,
        course_id: course.id,
        course_title: course.title,
        amount: course.price,
        status: 'completed'
      });
      setStep(2);
      toast.success("¡Pago completado con éxito!");
    } catch (error) {
      console.error("Payment error:", error);
\`;

content = content.replace(badChunk, goodChunk);

fs.writeFileSync('./src/App.tsx', content, 'utf8');
console.log("Restoration applied!");
