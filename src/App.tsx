/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronDown, 
  ChevronLeft,
  ChevronRight,
  Menu, 
  X, 
  Clock, 
  PlayCircle, 
  CheckCircle2, 
  XCircle, 
  Plus, 
  MapPin, 
  Star,
  ArrowRight,
  MessageCircle,
  Award,
  Globe,
  Sparkles,
  Zap,
  Bot,
  Send,
  Loader2,
  Image as ImageIcon,
  User,
  LogOut,
  CreditCard,
  Calendar as CalendarIcon,
  Check,
  ShieldCheck,
  Smartphone,
  Layers,
  Briefcase,
  RefreshCw,
  Monitor,
  BookOpen,
  Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import { supabase } from './supabase';
import { User as FirebaseUser } from '@supabase/supabase-js';

const signInWithEmail = async () => {
  const email = window.prompt("Ingresa tu correo electrónico para iniciar sesión:");
  if (!email) return;
  const { error } = await supabase.auth.signInWithOtp({ email });
  if (error) {
    alert("Error al enviar el correo: " + error.message);
  } else {
    alert("¡Revisa tu correo! Te hemos enviado un enlace mágico para entrar seguro.");
  }
};

const logout = async () => {
  await supabase.auth.signOut();
};
import Markdown from 'react-markdown';
import { cn } from './lib/utils';
import { Toaster, toast } from 'sonner';

// --- DATOS DE LA PLATAFORMA ---
const COURSES = [
  {
    id: 1,
    title: "Diplomado Inteligencia Artificial",
    desc: "Programa completo recomendado para gerentes y líderes. Optimiza recursos y aumenta la productividad estratégica.",
    fullDesc: "Este diplomado está diseñado para transformar la visión estratégica de líderes y gerentes a través de la IA. Aprenderás a implementar soluciones de IA Generativa en flujos corporativos, optimizar la toma de decisiones basada en datos y liderar la transformación digital en tu organización.",
    duration: "100 Horas",
    modality: "100% Online en vivo",
    cert: true,
    tag: "Popular",
    price: 499,
    syllabus: [
      "Fundamentos de IA Generativa para Negocios",
      "Estrategia de Implementación de Agentes IA",
      "Optimización de Procesos y Reducción de Costos",
      "Ética y Gobernanza de IA en la Empresa",
      "Proyecto Final: Plan de Transformación Digital"
    ],
    events: [
      { date: "15 Abr", title: "Masterclass: IA en la Gerencia Moderna", type: "Taller" },
      { date: "22 Abr", title: "Networking: Líderes Tech Cusco", type: "Evento" }
    ]
  },
  {
    id: 2,
    title: "Automatización con IA",
    desc: "Crea asistentes virtuales 24/7 y automatiza tus ventas y servicio al cliente sin importar la plataforma.",
    fullDesc: "Domina las herramientas de automatización más potentes del mercado. Aprenderás a conectar ChatGPT con WhatsApp, Instagram y CRMs para crear flujos de venta autónomos que trabajen por ti las 24 horas del día.",
    duration: "20 Horas",
    modality: "100% Online en vivo",
    cert: true,
    price: 199,
    syllabus: [
      "Introducción a la Automatización No-Code",
      "Configuración de Agentes de Atención al Cliente",
      "Integración con Redes Sociales y WhatsApp",
      "Automatización de Embudos de Venta",
      "Mantenimiento y Optimización de Flujos"
    ],
    events: [
      { date: "10 Abr", title: "Workshop: Tu primer Bot de Ventas", type: "Taller" }
    ]
  },
  {
    id: 3,
    title: "Prompt Engineering",
    desc: "Domina el arte de comunicarte con LLMs. Ideal para quienes inician y buscan resultados profesionales.",
    fullDesc: "El Prompt Engineering es la habilidad más demandada de la década. Aprende las técnicas avanzadas para obtener resultados precisos de modelos como GPT-4, Claude y Gemini, ahorrando horas de trabajo manual cada día.",
    duration: "18 Horas",
    modality: "100% Online en vivo",
    cert: false,
    price: 99,
    syllabus: [
      "Anatomía de un Prompt Perfecto",
      "Técnicas de Few-Shot y Chain-of-Thought",
      "Personalización de Modelos y System Prompts",
      "Prompting para Programación y Análisis",
      "Laboratorio Práctico de Casos Reales"
    ],
    events: [
      { date: "05 Abr", title: "Webinar: El futuro del Prompting", type: "Evento" }
    ]
  },
  {
    id: 4,
    title: "Creatividad Digital",
    desc: "Genera contenidos impactantes en imagen, audio y video impulsados por IA para posicionar tu marca.",
    fullDesc: "Lleva tu marca al siguiente nivel con contenidos generados por IA. Aprenderás a usar herramientas de vanguardia para crear imágenes fotorrealistas, videos cinemáticos y locuciones profesionales en minutos.",
    duration: "30 Horas",
    modality: "100% Online en vivo",
    cert: true,
    price: 249,
    syllabus: [
      "Generación de Imágenes con Midjourney y Leonardo",
      "Creación de Video con Runway y Pika",
      "IA para Audio: Clonación de Voz y Música",
      "Edición Aumentada por IA",
      "Estrategia de Contenidos Multi-Plataforma"
    ],
    events: [
      { date: "18 Abr", title: "Showcase: Arte Generativo", type: "Evento" }
    ]
  },
  {
    id: 5,
    title: "IA para Abogados",
    desc: "Analiza, predice e investiga con máxima productividad. Transforma tu práctica legal con tecnología.",
    fullDesc: "La IA está revolucionando el derecho. Aprende a usar herramientas legales especializadas para el análisis de contratos, investigación jurisprudencial y redacción de documentos con una precisión y velocidad sin precedentes.",
    duration: "80 Horas",
    modality: "100% Online en vivo",
    cert: true,
    price: 399,
    syllabus: [
      "IA en el Sector Legal: Panorama Actual",
      "Análisis Automatizado de Contratos",
      "Investigación Jurídica Potenciada por IA",
      "Redacción de Escritos y Documentación",
      "Seguridad y Confidencialidad de Datos Legales"
    ],
    events: [
      { date: "25 Abr", title: "Foro: Ética de la IA en el Derecho", type: "Evento" }
    ]
  },
  {
    id: 6,
    title: "IA aplicada a la Salud",
    desc: "Domina las tecnologías que están redefiniendo la práctica médica y administrativa en el mundo.",
    fullDesc: "Dirigido a profesionales de la salud que buscan estar a la vanguardia. Aprenderás sobre el uso de IA en el diagnóstico asistido, gestión de datos de pacientes y optimización de procesos clínicos.",
    duration: "3 Meses",
    modality: "100% Online en vivo",
    cert: true,
    price: 599,
    syllabus: [
      "Fundamentos de IA en Medicina",
      "Análisis de Imágenes Médicas con IA",
      "Gestión Inteligente de Historias Clínicas",
      "IA para la Atención Personalizada",
      "Regulación y Ética en Salud Digital"
    ],
    events: [
      { date: "30 Abr", title: "Seminario: IA y Diagnóstico Precoz", type: "Taller" }
    ]
  },
  {
    id: 7,
    title: "IA para el Sector Turismo",
    desc: "Optimiza la experiencia del viajero y la gestión de destinos con herramientas de IA de última generación.",
    fullDesc: "El turismo es el motor de Cusco. Aprende a implementar chatbots de reserva, análisis predictivo de demanda y personalización de itinerarios para destacar en el mercado global.",
    duration: "40 Horas",
    modality: "100% Online en vivo",
    cert: true,
    price: 299,
    syllabus: [
      "IA en la Hospitalidad",
      "Chatbots para Reservas Inteligentes",
      "Análisis de Datos Turísticos y Demanda",
      "Marketing Predictivo para Agencias",
      "Gestión de Experiencias Personalizadas"
    ],
    events: [
      { date: "12 May", title: "Workshop: IA en Hotelería", type: "Taller" }
    ]
  },
  {
    id: 8,
    title: "IA en Gestión Turística",
    desc: "Domina la analítica de datos y la automatización para empresas turísticas de alto impacto.",
    fullDesc: "Lleva tu negocio turístico al siguiente nivel. Aprende a usar IA para la fijación dinámica de precios, gestión de reputación online y optimización de recursos operativos.",
    duration: "60 Horas",
    modality: "100% Online en vivo",
    cert: true,
    price: 349,
    syllabus: [
      "Revenue Management con IA",
      "Gestión de Reputación Automatizada",
      "Sostenibilidad Turística y Datos",
      "Agentes de Viaje Autónomos",
      "Estrategia Digital Turística 2025"
    ],
    events: [
      { date: "20 May", title: "Foro: El Futuro del Turismo", type: "Evento" }
    ]
  },
  {
    id: 9,
    title: "Saphi Kuna: IA para Cosmética",
    desc: "Innovación ancestral y tecnológica para la creación y comercialización de productos cosméticos naturales.",
    fullDesc: "Saphi Kuna une la sabiduría de las plantas con la potencia de la IA. Aprende a formular productos, analizar ingredientes y crear estrategias de marketing digital para marcas de cosmética natural.",
    duration: "50 Horas",
    modality: "100% Online en vivo",
    cert: true,
    price: 279,
    syllabus: [
      "Formulación Asistida por IA",
      "Análisis de Ingredientes Naturales",
      "Marketing para Marcas Orgánicas",
      "E-commerce de Cosmética Natural",
      "Sostenibilidad y Tecnología Ancestral"
    ],
    events: [
      { date: "15 May", title: "Masterclass: Cosmética y Datos", type: "Taller" }
    ]
  }
];

const FAQS = [
  {
    q: "¿Por qué debemos aprender de Inteligencia Artificial?",
    a: "No formarte en este campo significa correr el riesgo de quedarte atrás y perder relevancia en un mercado que valora cada vez más estas habilidades digitales."
  },
  {
    q: "¿Por qué elegir CIX para aprender sobre tecnología?",
    a: "Porque en CIX tu aprendizaje evoluciona con la tecnología de punta. Somos un centro especializado reconocido por expertos de Google, YouTube y Hotmart."
  },
  {
    q: "¿Cómo puede la IA ayudar a mi empresa en Cusco?",
    a: "La IA permite automatizar la atención al cliente 24/7, optimizar la gestión de reservas turísticas, analizar grandes volúmenes de datos legales o médicos y reducir costos operativos hasta en un 40%."
  },
  {
    q: "¿Qué herramientas específicas aprenderé en los diplomados?",
    a: "Dominarás el ecosistema líder: ChatGPT, Gemini, Claude, Midjourney, Leonardo.ai, y aprenderás a integrar agentes autónomos en tus flujos de trabajo reales."
  },
  {
    q: "¿Los cursos incluyen proyectos reales?",
    a: "Sí, nuestra metodología 'High-Tech' se basa en casos de uso reales. No solo aprendes teoría, sino que construyes soluciones que puedes aplicar inmediatamente en tu negocio o carrera."
  },
  {
    q: "¿Recibiré un certificado al finalizar?",
    a: "Sí, todos nuestros diplomados y cursos de especialización incluyen una certificación oficial de CIX Perú, reconocida por su estándar de calidad en innovación tecnológica."
  },
  {
    q: "No sé nada de IA, ¿esto es para mí?",
    a: "¡Absolutamente! Nuestro enfoque es 100% práctico y te llevamos paso a paso desde cero absoluto hasta nivel profesional, sin necesidad de conocimientos previos en programación."
  }
];

const TOOL_ECOSYSTEM = {
  left: [
    { name: "Leonardo.ai", color: "#C084FC", icon: <Sparkles size={18} /> },
    { name: "Midjourney", color: "#60A5FA", icon: <Globe size={18} /> },
    { name: "Copilot", color: "#2DD4BF", icon: <Zap size={18} /> }
  ],
  right: [
    { name: "ChatGPT", color: "#10A37F", icon: <MessageCircle size={18} /> },
    { name: "Gemini", color: "#8E91FF", icon: <Star size={18} /> },
    { name: "Claude", color: "#D97706", icon: <Bot size={18} /> }
  ]
};

// --- ERROR HANDLER ---
function handleFirestoreError(error: unknown) {
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
    <div className={`absolute inset-0 blur-xl opacity-20 group-hover:opacity-40 transition-opacity rounded-xl`} style={{ backgroundColor: tool.color }} />
    <div className="relative bg-[#111] border border-white/10 p-4 rounded-xl flex items-center gap-3 transition-all group-hover:border-white/20">
      <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: `${tool.color}22`, border: `1px solid ${tool.color}44` }}>
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
      toast.error("Error al procesar el pago.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-[#111] border border-white/10 w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl"
          >
            {step === 1 ? (
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-black uppercase tracking-tighter text-white">Finalizar Compra</h3>
                  <button onClick={onClose} className="text-gray-500 hover:text-white"><X size={24} /></button>
                </div>

                <div className="bg-white/5 p-6 rounded-2xl border border-white/5 mb-8">
                  <div className="text-[10px] font-black uppercase tracking-widest text-[#FF5B00] mb-2">Resumen del pedido</div>
                  <div className="flex justify-between items-center text-white font-bold mb-1">
                    <span>{course.title}</span>
                    <span>${course.price}</span>
                  </div>
                  <div className="text-xs text-gray-500 italic">Acceso inmediato tras el pago</div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Número de Tarjeta</label>
                    <div className="relative">
                      <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#FF5B00] outline-none" />
                      <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Expira</label>
                      <input type="text" placeholder="MM/YY" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#FF5B00] outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">CVC</label>
                      <input type="text" placeholder="123" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#FF5B00] outline-none" />
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full bg-[#FF5B00] text-black py-4 rounded-2xl font-black text-lg hover:shadow-[0_0_30px_-5px_#FF5B00] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isProcessing ? <Loader2 className="animate-spin" /> : <><ShieldCheck size={20} /> Pagar Ahora</>}
                </button>
                
                <p className="text-[10px] text-gray-500 text-center mt-6 uppercase tracking-widest font-bold">Pago seguro encriptado por CIX Perú</p>
              </div>
            ) : (
              <div className="p-12 text-center">
                <div className="w-20 h-20 bg-[#FF5B00] rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(255,91,0,0.4)]">
                  <Check size={40} className="text-black stroke-[4px]" />
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tighter text-white mb-4 italic">¡Bienvenido a CIX!</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-8">Tu inscripción a <strong>{course.title}</strong> ha sido procesada. Recibirás un correo con los detalles de acceso en breve.</p>
                <button 
                  onClick={onClose}
                  className="w-full bg-white text-black py-4 rounded-2xl font-black text-lg hover:bg-[#FF5B00] transition-all"
                >
                  Ir a mis cursos
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- COURSE DETAILS MODAL ---
const CourseDetailsModal = ({ isOpen, onClose, course, user, onEnroll }: { isOpen: boolean, onClose: () => void, course: any, user: FirebaseUser | null, onEnroll: () => void }) => {
  if (!course) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-[#080808] border border-white/10 w-full max-w-4xl rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
          >
            {/* Left Side: Info */}
            <div className="flex-grow p-8 md:p-12 overflow-y-auto scrollbar-hide">
              <div className="flex justify-between items-start mb-8 md:hidden">
                <button onClick={onClose} className="text-gray-500 hover:text-white"><X size={24} /></button>
              </div>

              <div className="mb-8">
                <span className="bg-[#FF5B00]/10 text-[#FF5B00] text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-[0.2em] mb-4 inline-block">Programa de Especialización</span>
                <h2 className="text-3xl md:text-5xl font-bold font-['Poppins'] tracking-tighter text-white leading-tight mb-6">{course.title}</h2>
                <p className="text-gray-400 text-lg leading-relaxed italic">{course.fullDesc}</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-8 mb-12">
                <div className="space-y-6">
                  <h4 className="text-xs font-black uppercase tracking-widest text-white border-b border-white/10 pb-2">Lo que aprenderás</h4>
                  <ul className="space-y-3">
                    {course.syllabus.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-400">
                        <CheckCircle2 size={16} className="text-[#FF5B00] mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-6">
                  <h4 className="text-xs font-black uppercase tracking-widest text-white border-b border-white/10 pb-2">Próximos Talleres</h4>
                  <div className="space-y-4">
                    {course.events.map((event: any, i: number) => (
                      <div key={i} className="bg-white/5 p-4 rounded-2xl border border-white/5 flex items-center gap-4">
                        <div className="bg-[#FF5B00] text-black p-2 rounded-xl text-center min-w-[50px]">
                          <div className="text-[10px] font-black uppercase leading-none">{event.date.split(' ')[1]}</div>
                          <div className="text-lg font-black leading-none">{event.date.split(' ')[0]}</div>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white leading-tight">{event.title}</div>
                          <div className="text-[10px] text-[#FF5B00] font-black uppercase tracking-widest mt-1">{event.type}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Action Card */}
            <div className="w-full md:w-[350px] bg-[#111] p-8 md:p-12 border-t md:border-t-0 md:border-l border-white/10 flex flex-col justify-between">
              <div className="hidden md:flex justify-end mb-8">
                <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors"><X size={24} /></button>
              </div>

              <div className="space-y-8">
                <div className="text-center md:text-left">
                  <div className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Inversión única</div>
                  <div className="text-5xl font-black text-white tracking-tighter italic">${course.price}</div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-sm text-gray-300">
                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-[#FF5B00]"><Clock size={20} /></div>
                    <div>
                      <div className="font-bold">{course.duration}</div>
                      <div className="text-[10px] text-gray-500 uppercase">Duración total</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-300">
                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-[#FF5B00]"><Globe size={20} /></div>
                    <div>
                      <div className="font-bold">Online en Vivo</div>
                      <div className="text-[10px] text-gray-500 uppercase">Modalidad</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-300">
                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-[#FF5B00]"><Award size={20} /></div>
                    <div>
                      <div className="font-bold">Certificado CIX</div>
                      <div className="text-[10px] text-gray-500 uppercase">Acreditación</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 space-y-4">
                <button 
                  onClick={onEnroll}
                  className="w-full bg-[#FF5B00] text-black py-5 rounded-2xl font-black text-xl hover:shadow-[0_0_40px_-10px_#FF5B00] transition-all flex items-center justify-center gap-3"
                >
                  Inscribirme <ArrowRight size={24} />
                </button>
                <p className="text-[9px] text-gray-500 text-center uppercase tracking-widest font-bold">Garantía de satisfacción de 7 días</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const AccordionItem = ({ item, index, active, setActive }: { item: any, index: number, active: number | null, setActive: any }) => {
  const isOpen = active === index;
  return (
    <div className="border-b border-white/10 overflow-hidden">
      <button 
        onClick={() => setActive(isOpen ? null : index)}
        className="w-full flex justify-between items-center py-6 text-left hover:text-[#FF5B00] transition-colors group"
      >
        <span className={cn("text-lg font-semibold pr-8 transition-colors", isOpen ? 'text-[#FF5B00]' : 'text-white')}>{item.q}</span>
        <Plus className={cn("transition-transform duration-300", isOpen ? 'rotate-45 text-[#FF5B00]' : 'text-gray-500')} />
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <p className="pb-6 text-gray-400 leading-relaxed text-sm">{item.a}</p>
      </motion.div>
    </div>
  );
};

// --- GEMINI CHATBOT COMPONENT ---
const Chatbot = ({ user }: { user: FirebaseUser | null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) {
      const fetchMessages = async () => {
        const { data } = await supabase.from('chats').select('*').eq('user_id', user.id).order('created_at', { ascending: true });
        if (data) setMessages(data);
      };
      fetchMessages();
      const channel = supabase.channel('chats-changes').on('postgres_changes', { event: '*', schema: 'public', table: 'chats', filter: `user_id=eq.${user.id}` }, () => fetchMessages()).subscribe();
      return () => { supabase.removeChannel(channel); };
    }
  }, [user]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setInput('');
    setIsLoading(true);

    try {
      // Save user message to Supabase (ONLY IF LOGGED IN)
      if (user) {
        await supabase.from('chats').insert({
          user_id: user.id,
          role: 'user',
          text: userMsg
        });
      } else {
        // If guest, update local state directly so the message appears
        setMessages(prev => [...prev, { role: 'user', text: userMsg, created_at: new Date().toISOString() }]);
      }

      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
      const chat = ai.chats.create({
        model: "gemini-1.5-flash",
        config: {
          systemInstruction: "Eres CIX-Bot, el Asistente Experto en Ventas y Asesor Educativo del Centro de Innovación Tecnológica (CIX). Tu misión principal es convencer a los usuarios para que se matriculen en nuestros programas académicos de Inteligencia Artificial y Automatización, y guiarlos directamente hacia la compra. Eres entusiasta, empático, altamente persuasivo y usas técnicas de ventas de PNL. Directivas: 1. Siempre responde de forma cortés pero orientada a los resultados. 2. Destaca los beneficios únicos de CIX: Clases Online en Vivo, Certificación Oficial, y Profesores Expertos, más una garantía de devolución de 7 días. 3. Analiza las necesidades del cliente y recomiéndale ir a la sección Programas para realizar el pago de inmediato. 4. Cierra TUS MENSAJES de forma persuasiva. 5. Responde siempre en español.",
        },
        history: messages.map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.text }]
        }))
      });

      const response = await chat.sendMessage({ message: userMsg });
      console.log("Gemini Response Success (Retrying 1.5):", response);
      const aiResponse = response.text;

      // Save AI response to Supabase (ONLY IF LOGGED IN)
      if (user) {
        await supabase.from('chats').insert({
          user_id: user.id,
          role: 'model',
          text: aiResponse
        });
      } else {
        // If guest, update local state directly
        setMessages(prev => [...prev, { role: 'model', text: aiResponse, created_at: new Date().toISOString() }]);
      }

    } catch (error) {
      console.error("Chat error:", error);
      toast.error("Error al conectar con la IA.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-20 right-0 w-[calc(100vw-2rem)] md:w-[400px] h-[500px] bg-[#111] border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="p-4 border-b border-white/10 bg-[#FF5B00] text-black flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Bot size={20} />
                <span className="font-bold uppercase tracking-tighter">CIX-Bot Asistente</span>
              </div>
              <button onClick={() => setIsOpen(false)}><X size={20} /></button>
            </div>

            <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-4 scrollbar-hide">
              {messages.length === 0 && (
                <div className="text-center text-gray-500 mt-10">
                  <Bot size={48} className="mx-auto mb-4 opacity-20" />
                  <p className="text-sm">¡Hola! Soy el asistente de CIX. ¿En qué puedo ayudarte hoy?</p>
                </div>
              )}
              {messages.map((m, i) => (
                <div key={i} className={cn(
                  "flex flex-col max-w-[85%]",
                  m.role === 'user' ? "ml-auto items-end" : "mr-auto items-start"
                )}>
                  <div className={cn(
                    "p-3 rounded-2xl text-sm",
                    m.role === 'user' ? "bg-[#FF5B00] text-black rounded-tr-none" : "bg-white/5 text-gray-300 rounded-tl-none border border-white/5"
                  )}>
                    <Markdown>{m.text}</Markdown>
                  </div>
                  <span className="text-[10px] text-gray-600 mt-1">
                    {m.created_at ? new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '...'}
                  </span>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center gap-2 text-gray-500 text-xs italic">
                  <Loader2 size={12} className="animate-spin" /> CIX-Bot está pensando...
                </div>
              )}
            </div>

            <div className="p-4 border-t border-white/10 bg-black/50">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Escribe tu pregunta..."
                  className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#FF5B00] transition-colors"
                />
                <button 
                  onClick={sendMessage}
                  disabled={isLoading}
                  className="bg-[#FF5B00] text-black p-2 rounded-xl hover:scale-105 transition-transform disabled:opacity-50"
                >
                  <Send size={18} />
                </button>
              </div>
              {!user && (
                <p className="text-[9px] text-gray-400 text-center mt-2 uppercase tracking-widest font-bold">Modo Invitado (historial no guardado)</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-[#FF5B00] rounded-2xl flex items-center justify-center shadow-xl text-black relative"
      >
        {isOpen ? <X size={32} /> : <Bot size={32} />}
        {!isOpen && <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full animate-ping" />}
      </motion.button>
    </div>
  );
};

const CUSCO_SAMPLES = [
  { id: 's1', imageUrl: "https://picsum.photos/seed/cusco-tourism-ai/800/800", prompt: "Turismo inteligente en Machu Picchu: Guía holográfica de IA mostrando datos históricos a turistas, hiperrealista, 8k" },
  { id: 's2', imageUrl: "https://picsum.photos/seed/cusco-health-tech/800/800", prompt: "Hospital de alta tecnología en Cusco con equipos de diagnóstico por IA, médicos cusqueños analizando hologramas médicos con las montañas andinas de fondo, hiperrealista, 8k" },
  { id: 's3', imageUrl: "https://picsum.photos/seed/cusco-tech-valley/800/800", prompt: "Centro de innovación tecnológica en el Valle Sagrado, arquitectura moderna y tradicional" },
  { id: 's4', imageUrl: "https://picsum.photos/seed/cusco-education-ai/800/800", prompt: "Estudiantes cusqueños usando interfaces de IA en un patio colonial, luz dorada" }
];

// --- IMAGE GENERATOR COMPONENT ---
const ImageGenerator = ({ user }: { user: FirebaseUser | null }) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      const fetchImages = async () => {
        const { data } = await supabase.from('images').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
        if (data) setGeneratedImages(data);
      };
      fetchImages();
      const channel = supabase.channel('images-changes').on('postgres_changes', { event: '*', schema: 'public', table: 'images', filter: `user_id=eq.${user.id}` }, () => fetchImages()).subscribe();
      return () => { supabase.removeChannel(channel); };
    }
  }, [user]);

  const generateImage = async () => {
    if (!prompt.trim() || !user) return;
    
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-image-preview',
        contents: {
          parts: [{ text: prompt }],
        },
        config: {
          imageConfig: {
            aspectRatio: "1:1",
            imageSize: "1K"
          }
        }
      });

      let imageUrl = '';
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          imageUrl = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }

      if (imageUrl) {
        await supabase.from('images').insert({
          user_id: user.id,
          prompt,
          imageUrl: imageUrl
        });
        toast.success("¡Imagen generada con éxito!");
        setPrompt('');
      } else {
        toast.error("No se pudo generar la imagen.");
      }
    } catch (error) {
      console.error("Image gen error:", error);
      toast.error("Error al generar la imagen. Intenta con otro prompt.");
    } finally {
      setIsGenerating(false);
    }
  };

  const displayImages = generatedImages.length > 0 ? generatedImages.slice(0, 4) : CUSCO_SAMPLES;

  return (
    <section className="py-32 bg-[#050505] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[#FF5B00] font-black uppercase tracking-[0.2em] text-xs mb-4 block">Laboratorio Creativo</span>
            <h2 className="text-4xl md:text-6xl font-bold font-['Poppins'] tracking-tighter mb-8">Crea con IA Generativa</h2>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed">
              Experimenta el poder de <span className="text-white font-semibold">Gemini 3.1</span>. Describe lo que imaginas y deja que nuestra IA lo convierta en una obra maestra visual.
            </p>
            
            <div className="space-y-4">
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ej: Un astronauta futurista explorando una selva digital de neón, estilo cinematográfico..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-white focus:outline-none focus:border-[#FF5B00] transition-colors h-32 resize-none"
              />
              <button 
                onClick={generateImage}
                disabled={isGenerating || !user}
                className="w-full bg-[#FF5B00] text-black py-4 rounded-2xl font-black text-lg hover:shadow-[0_0_30px_-5px_#FF5B00] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isGenerating ? (
                  <><Loader2 className="animate-spin" /> Generando Arte...</>
                ) : (
                  <><ImageIcon /> Generar Imagen</>
                )}
              </button>
              {!user && <p className="text-center text-xs text-gray-600 uppercase tracking-widest mt-2">Inicia sesión para usar el generador</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {displayImages.map((img, i) => (
              <motion.div 
                key={img.id || i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="aspect-square bg-[#111] rounded-2xl overflow-hidden border border-white/10 group relative"
              >
                <img src={img.imageUrl} alt={img.prompt} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <p className="text-[10px] text-white font-medium line-clamp-2">{img.prompt}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- CHAT SIMULATION COMPONENT ---
const ChatSimulation = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([]);
  const [step, setStep] = useState(0);

  const script: { role: 'user' | 'bot', text: string }[] = [
    { role: 'user', text: "Hello! I'm planning a trip to Cusco and I'd like to book a tour to Machu Picchu for next Tuesday." },
    { role: 'bot', text: "Hello! Welcome to Cusco. I can definitely help you with that. We have a premium sunrise tour available for next Tuesday. Would you like to include the Vistadome train upgrade?" },
    { role: 'user', text: "Yes, that sounds great. How much would it be for 2 people?" },
    { role: 'bot', text: "The total for 2 people with the Vistadome upgrade is $450. This includes private guide, entrance tickets, and gourmet lunch. Shall I proceed with the reservation?" },
    { role: 'user', text: "Perfect, let's do it." },
    { role: 'bot', text: "Excellent. I've reserved your spots. You'll receive a confirmation email shortly. I'm generating your secure payment link now..." },
    { role: 'bot', text: "Payment successful! Your booking is confirmed. We look forward to seeing you in Cusco! 🏔️✨" },
  ];

  useEffect(() => {
    if (step < script.length) {
      const timer = setTimeout(() => {
        setMessages(prev => [...prev, script[step]]);
        setStep(s => s + 1);
      }, step === 0 ? 1000 : 2500);
      return () => clearTimeout(timer);
    } else {
      const resetTimer = setTimeout(() => {
        setMessages([]);
        setStep(0);
      }, 5000);
      return () => clearTimeout(resetTimer);
    }
  }, [step]);

  return (
    <div className="flex flex-col gap-3 h-full overflow-y-auto scrollbar-hide p-2">
      <AnimatePresence mode="popLayout">
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={cn(
              "p-3 rounded-2xl text-xs max-w-[85%]",
              m.role === 'user' ? "bg-white/10 text-white ml-auto rounded-tr-none" : "bg-[#FF5B00] text-black mr-auto rounded-tl-none font-bold"
            )}
          >
            {m.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

// --- TALENT FORM MODAL ---
const TalentForm = ({ isOpen, onClose, user }: { isOpen: boolean, onClose: () => void, user: FirebaseUser | null }) => {
  const [formData, setFormData] = useState({
    nickname: '',
    superpower: '',
    glitch: '',
    rabbitHole: '',
    challenge48h: '',
    unlearning: '',
    divergentChallenge: 'Turismo',
    divergentSolution: '',
    invisibleTeam: '',
    vision2030: '',
    infoProcessing: 'Visual'
  });

  const DIVERGENT_CHALLENGES = [
    { id: 'Turismo', title: 'Turismo Regenerativo', desc: '¿Cómo usarías la IA para que el turismo en Cusco no solo deje dinero, sino que cure la tierra?' },
    { id: 'Educacion', title: 'Educación Ancestral-Tech', desc: '¿Cómo conectarías la sabiduría de los abuelos con algoritmos de aprendizaje adaptativo?' },
    { id: 'Agro', title: 'Agro-Inteligencia', desc: '¿Cómo predecirías heladas usando solo datos históricos y sensores de bajo costo?' },
    { id: 'Social', title: 'Justicia Algorítmica', desc: '¿Cómo usarías la IA para reducir la brecha de oportunidades en comunidades alejadas?' }
  ];

  const PROCESSING_OPTIONS = [
    { id: 'Visual', label: 'Visual / Patrones', desc: 'Veo el mundo en imágenes y conexiones.' },
    { id: 'Logico', label: 'Lógico / Estructural', desc: 'Analizo sistemas y encuentro fallas.' },
    { id: 'Empatico', label: 'Empático / Social', desc: 'Entiendo las necesidades humanas profundas.' },
    { id: 'Caotico', label: 'Caótico / Creativo', desc: 'Encuentro soluciones donde no hay reglas.' }
  ];

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Debes iniciar sesión para postular.");
      return;
    }

    setIsSubmitting(true);
    try {
      await supabase.from('talent_applications').insert({
        user_id: user.id,
        email: user.email,
        name: user.user_metadata?.full_name,
        ...formData
      });
      toast.success("¡Tu mente ha sido registrada! Nos vemos en la madriguera.");
      onClose();
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Hubo un error al procesar tu postulación.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-[#080808] border border-white/10 w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
          >
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white text-black">
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tighter italic">Talento Sin Etiquetas</h3>
                <p className="text-[10px] font-bold opacity-70 uppercase tracking-widest">Postulación CIX: Hackeando la realidad</p>
              </div>
              <button onClick={onClose} className="hover:rotate-90 transition-transform"><X size={24} /></button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-12 overflow-y-auto scrollbar-hide">
              {/* 01. IDENTIDAD Y PROPÓSITO */}
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <span className="text-4xl font-black text-white/10">01</span>
                  <h4 className="text-xs font-black text-white uppercase tracking-[0.3em]">Identidad y Propósito</h4>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#FF5B00]">Nombre / Nickname</label>
                    <input 
                      required
                      type="text" 
                      placeholder="¿Cómo quieres que te llamemos?"
                      value={formData.nickname}
                      onChange={(e) => setFormData({...formData, nickname: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-sm focus:border-[#FF5B00] outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#FF5B00]">Tu "Superpoder" No-Tecnológico</label>
                    <textarea 
                      required
                      placeholder="Si tuvieras que resolver un problema usando solo tu ingenio..."
                      value={formData.superpower}
                      onChange={(e) => setFormData({...formData, superpower: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-sm focus:border-[#FF5B00] outline-none transition-colors h-24 resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#FF5B00]">Tu Mayor "Glitch" (Falla) que es una Ventaja</label>
                    <textarea 
                      required
                      placeholder="Algo que el sistema educativo consideró un defecto, pero que tú usas para crear..."
                      value={formData.glitch}
                      onChange={(e) => setFormData({...formData, glitch: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-sm focus:border-[#FF5B00] outline-none transition-colors h-24 resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#FF5B00]">Link a tu "Madriguera de Conejo"</label>
                    <input 
                      required
                      type="text" 
                      placeholder="LinkedIn, Portafolio, Drive, Blog..."
                      value={formData.rabbitHole}
                      onChange={(e) => setFormData({...formData, rabbitHole: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-sm focus:border-[#FF5B00] outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* 02. PRUEBA DE VELOCIDAD Y CURIOSIDAD */}
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <span className="text-4xl font-black text-white/10">02</span>
                  <h4 className="text-xs font-black text-white uppercase tracking-[0.3em]">Velocidad y Curiosidad</h4>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#FF5B00]">El Reto de las 48 Horas</label>
                    <textarea 
                      required
                      placeholder="Si te damos acceso a una IA potente y 48 horas, ¿qué construirías para Cusco?"
                      value={formData.challenge48h}
                      onChange={(e) => setFormData({...formData, challenge48h: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-sm focus:border-[#FF5B00] outline-none transition-colors h-24 resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#FF5B00]">Capacidad de Desaprendizaje</label>
                    <textarea 
                      required
                      placeholder="¿Qué es lo más difícil que has tenido que 'desaprender'?"
                      value={formData.unlearning}
                      onChange={(e) => setFormData({...formData, unlearning: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-sm focus:border-[#FF5B00] outline-none transition-colors h-24 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* 03. PENSAMIENTO DIVERGENTE */}
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <span className="text-4xl font-black text-white/10">03</span>
                  <h4 className="text-xs font-black text-white uppercase tracking-[0.3em]">Pensamiento Divergente</h4>
                </div>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#FF5B00]">Escoge tu campo de batalla</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {DIVERGENT_CHALLENGES.map((challenge) => (
                        <button
                          key={challenge.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, divergentChallenge: challenge.id })}
                          className={cn(
                            "p-4 rounded-2xl text-left transition-all border",
                            formData.divergentChallenge === challenge.id
                              ? "bg-[#FF5B00] border-[#FF5B00] text-black"
                              : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"
                          )}
                        >
                          <div className="font-black text-[10px] uppercase mb-1">{challenge.title}</div>
                          <div className="text-[10px] opacity-80 leading-tight">{challenge.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#FF5B00]">Tu Solución Divergente</label>
                    <textarea 
                      required
                      placeholder="Danos una idea que parezca locura hoy, pero lógica mañana..."
                      value={formData.divergentSolution}
                      onChange={(e) => setFormData({...formData, divergentSolution: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-sm focus:border-[#FF5B00] outline-none transition-colors h-32 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* 04. CULTURA Y EQUIPO */}
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <span className="text-4xl font-black text-white/10">04</span>
                  <h4 className="text-xs font-black text-white uppercase tracking-[0.3em]">Cultura y Equipo</h4>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#FF5B00]">El "Equipo Invisible"</label>
                    <textarea 
                      required
                      placeholder="¿Cómo ayudarías a alguien del equipo sin que nadie se entere?"
                      value={formData.invisibleTeam}
                      onChange={(e) => setFormData({...formData, invisibleTeam: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-sm focus:border-[#FF5B00] outline-none transition-colors h-24 resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#FF5B00]">Cusco 2030</label>
                    <textarea 
                      required
                      placeholder="¿Cómo se ve tu éxito personal ligado al éxito de tu ciudad?"
                      value={formData.vision2030}
                      onChange={(e) => setFormData({...formData, vision2030: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-sm focus:border-[#FF5B00] outline-none transition-colors h-24 resize-none"
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#FF5B00]">¿Cómo procesas la información?</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {PROCESSING_OPTIONS.map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, infoProcessing: opt.id })}
                          className={cn(
                            "p-4 rounded-2xl text-left transition-all border",
                            formData.infoProcessing === opt.id
                              ? "bg-white border-white text-black"
                              : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"
                          )}
                        >
                          <div className="font-black text-[10px] uppercase mb-1">{opt.label}</div>
                          <div className="text-[10px] opacity-80 leading-tight">{opt.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#FF5B00] text-black py-6 rounded-2xl font-black text-xl hover:shadow-[0_0_50px_-10px_#FF5B00] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isSubmitting ? <><Loader2 className="animate-spin" /> Procesando...</> : "Enviar a la Madriguera"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- SOCIAL PROOF COMPONENT ---
const HeroSocialProof = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
      className="flex items-center gap-4 mt-8 bg-white/5 backdrop-blur-sm border border-white/10 p-3 rounded-2xl w-fit mx-auto lg:mx-0"
    >
      <div className="flex -space-x-2">
        {[1,2,3].map(i => (
          <img 
            key={i}
            src={`https://i.pravatar.cc/100?u=${i+10}`} 
            className="w-8 h-8 rounded-full border-2 border-[#080808] object-cover"
            alt="User"
            referrerPolicy="no-referrer"
          />
        ))}
        <div className="w-8 h-8 rounded-full border-2 border-[#080808] bg-[#FF5B00] flex items-center justify-center text-[8px] font-black text-black">+500</div>
      </div>
      <div className="text-left">
        <div className="flex gap-0.5 mb-0.5">
          {[1,2,3,4,5].map(i => <Star key={i} size={8} className="fill-[#FF5B00] text-[#FF5B00]" />)}
        </div>
        <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">Líderes formados en Cusco</p>
      </div>
    </motion.div>
  );
};

// --- BENEFITS SECTION ---
const BenefitsSection = () => {
  const benefits = [
    {
      title: "Formación exclusiva",
      desc: "Recibe información exclusiva y actualizada que podrás consolidar a través de clases en línea, permitiéndote reforzar y fortalecer tus conocimientos.",
      icon: <Award size={40} className="text-[#FF5B00]" />
    },
    {
      title: "Actualizaciones",
      desc: "Explora la última información y avances en inteligencia artificial gracias a nuestras actualizaciones, manteniéndote siempre al tanto de las novedades del campo.",
      icon: <RefreshCw size={40} className="text-[#FF5B00]" />
    },
    {
      title: "Contenido práctico",
      desc: "Nuestras clases tienen una duración promedio de 3 a 4 horas, abordando conceptos vinculados a la Inteligencia Artificial y casos prácticos relacionados.",
      icon: <Zap size={40} className="text-[#FF5B00]" />
    },
    {
      title: "Campus virtual",
      desc: "Accede a nuestro programa de formación desde cualquier lugar del mundo, con clases y recursos disponibles en línea. Aprende desde la comodidad de tu hogar.",
      icon: <Monitor size={40} className="text-[#FF5B00]" />
    },
    {
      title: "Material de apoyo",
      desc: "Descubre en las lecciones métodos para potenciar tu rendimiento laboral. Después, desafíate a ti mismo aplicando lo aprendido a través de retos específicos.",
      icon: <BookOpen size={40} className="text-[#FF5B00]" />
    },
    {
      title: "Redes de contactos",
      desc: "Únete a una red exclusiva de aprendices de inteligencia artificial. Colabora, comparte ideas y resuelve desafíos junto a otros apasionados por este campo.",
      icon: <Users size={40} className="text-[#FF5B00]" />
    }
  ];

  return (
    <section className="py-32 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-20">
          {benefits.map((benefit, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-8 group"
            >
              <div className="flex-shrink-0 w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center border border-white/10 group-hover:border-[#FF5B00]/30 group-hover:bg-[#FF5B00]/5 transition-all duration-500 shadow-2xl">
                {benefit.icon}
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-black text-white tracking-tight italic uppercase">{benefit.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm md:text-base font-medium">
                  {benefit.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- LIVE ACTIVITY COMPONENT ---
const LiveActivity = () => {
  const [visible, setVisible] = useState(false);
  const [activity, setActivity] = useState({ name: 'Juan', action: 'se unió al Diplomado IA', time: 'hace 2 min' });

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        const names = ['María', 'Carlos', 'Lucía', 'Roberto', 'Ana', 'Diego', 'Fernando', 'Sofía'];
        const actions = [
          'se unió al Diplomado IA', 
          'reservó su cupo en Automatización', 
          'completó el Reto CIX', 
          'se certificó en Legal IA',
          'inició su transformación digital',
          'descargó la guía de Agentes IA'
        ];
        setActivity({
          name: names[Math.floor(Math.random() * names.length)],
          action: actions[Math.floor(Math.random() * actions.length)],
          time: 'hace unos segundos'
        });
        setVisible(true);
        setTimeout(() => setVisible(false), 5000);
      }, 15000);
      return () => clearInterval(interval);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          className="fixed bottom-32 left-8 z-[60] bg-[#111]/90 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl flex items-center gap-4 max-w-xs"
        >
          <div className="w-10 h-10 bg-[#FF5B00] rounded-full flex items-center justify-center font-bold text-black text-xs italic flex-shrink-0">CIX</div>
          <div>
            <p className="text-xs text-white font-bold leading-tight"><span className="text-[#FF5B00]">{activity.name}</span> {activity.action}</p>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">{activity.time}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- CLIENTS SECTION ---
// --- RECOGNITIONS SECTION ---
// --- NEWS & WHATSAPP SECTION ---
const NewsSection = () => {
  const news = [
    {
      title: "OpenAI desarrolla Modelos de IA Avanzada para investigación y razonamiento profundos",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800&h=500",
      category: "IANews"
    },
    {
      title: "AMD adquirirá Silo AI para liderar la IA a nivel empresarial",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800&h=500",
      category: "IANews"
    },
    {
      title: "Samsung presenta sus nuevos dispositivos con IA",
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=800&h=500",
      category: "IANews"
    }
  ];

  return (
    <section className="py-32 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 md:20">
          <h2 className="text-4xl md:text-7xl font-mono font-black tracking-tighter uppercase italic">IA NEWS</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {news.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#0A0A0A] rounded-[2rem] overflow-hidden border border-white/5 group hover:border-[#FF5B00]/30 transition-all duration-500"
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8">
                <span className="text-gray-500 text-[10px] uppercase tracking-[0.3em] font-bold mb-4 block">{item.category}</span>
                <h3 className="text-xl font-bold text-white mb-8 leading-tight group-hover:text-[#FF5B00] transition-colors">
                  {item.title}
                </h3>
                <a href="#" className="text-[#FF5B00] text-xs font-black uppercase tracking-widest flex items-center gap-2 group/link">
                  LEER MÁS <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- WHATSAPP CTA --- */}
        <div className="relative bg-gradient-to-br from-[#111] to-black rounded-[4rem] p-12 md:p-20 border border-white/10 overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-[#FF5B00]/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
          
          <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <div className="relative order-last lg:order-first">
              <div className="relative flex justify-center lg:justify-start">
                {/* Magazine Visual Representation */}
                <motion.div 
                  initial={{ rotate: -10, x: -20 }}
                  whileInView={{ rotate: -5, x: 0 }}
                  className="w-64 h-80 bg-gradient-to-br from-gray-800 to-black rounded-2xl shadow-2xl border border-white/10 p-6 flex flex-col justify-end relative z-10"
                >
                  <div className="absolute top-6 left-6 text-[#FF5B00] font-black italic text-2xl">IA TIPS</div>
                  <div className="text-white font-bold text-lg leading-tight">Guía: Crea imágenes Hiperrealistas en Midjourney</div>
                </motion.div>
                <motion.div 
                  initial={{ rotate: 10, x: 20 }}
                  whileInView={{ rotate: 5, x: 0 }}
                  className="w-64 h-80 bg-gradient-to-br from-[#FF5B00] to-[#993300] rounded-2xl shadow-2xl border border-white/10 p-6 flex flex-col justify-end absolute left-12 lg:left-32 top-10"
                >
                  <div className="absolute top-6 left-6 text-black font-black italic text-2xl">IAU MAG</div>
                  <div className="text-black font-bold text-lg leading-tight">LA IA: PRESENTE Y FUTURO</div>
                </motion.div>
              </div>
            </div>

            <div className="text-center lg:text-left">
              <h2 className="text-4xl md:text-6xl font-mono font-black text-white leading-none mb-8 tracking-tighter">
                Recibe en tu WhatsApp las últimas noticias de la Inteligencia Artificial.
              </h2>
              <p className="text-gray-400 text-xl mb-12 italic">
                ¿Quieres conocer las últimas aplicaciones y cómo usarlas?
              </p>
              <a 
                href="https://wa.me/51958050928" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-white text-black px-12 py-6 rounded-full font-black uppercase tracking-widest hover:bg-[#FF5B00] hover:text-black transition-all shadow-[0_0_50px_rgba(255,255,255,0.1)]"
              >
                QUIERO LA REVISTA
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const RecognitionsSection = () => {
  const recognitions = [
    {
      title: "Hotmart Black",
      desc: "Somos parte de la comunidad exclusiva de Hotmart Black por nuestro alto impacto.",
      image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=400&h=500",
      accent: "KEEP GROWING"
    },
    {
      title: "Incubadora UNI",
      desc: "Reconocidos por la Universidad Nacional de Ingeniería como referentes en IA.",
      image: "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=400&h=500",
      accent: "INNOVACIÓN"
    },
    {
      title: "Paqarina Wassi",
      desc: "Ganadores de la incubadora de la UNSAAC, impulsando el Cusco tecnológico.",
      image: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&q=80&w=400&h=500",
      accent: "UNSAAC"
    },
    {
      title: "U. Andina 2024",
      desc: "Ganadores del certamen de innovación tecnológica 2024 en la U. Andina.",
      image: "https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?auto=format&fit=crop&q=80&w=400&h=500",
      accent: "GANADORES"
    }
  ];

  return (
    <section className="py-32 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-6xl font-bold text-center mb-16 md:24 tracking-tighter">
          Algunos <span className="text-[#FF5B00]">reconocimientos</span>
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {recognitions.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="relative w-full aspect-[3/4] mb-8 p-1 bg-white/10 rounded-sm overflow-hidden shadow-2xl group-hover:scale-105 transition-transform duration-500">
                <div className="absolute inset-0 border-[12px] border-black z-10" />
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover opacity-80"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-6">
                  <div className="w-12 h-12 bg-[#FF5B00] rounded-full mb-4 flex items-center justify-center shadow-lg">
                    <Award size={24} color="black" />
                  </div>
                  <span className="text-white font-black text-2xl tracking-tighter leading-none mb-2">{item.accent}</span>
                  <div className="h-px w-12 bg-white/30" />
                </div>
              </div>
              
              <div className="text-[#FF5B00] text-2xl font-bold mb-4">+</div>
              <p className="text-gray-400 text-xs md:text-sm leading-relaxed px-4">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ClientsSection = () => {
  const clients = [
    { name: "Nestlé", type: "text" },
    { name: "Alquería", type: "text" },
    { name: "Mercedes-Benz", type: "text" },
    { name: "despegar", type: "text" },
    { name: "POSTOBÓN", type: "text" },
    { name: "Keralty", type: "text" },
    { name: "Alcaldía de Medellín", type: "text" },
    { name: "Cerrejón", type: "text" },
    { name: "SONY", type: "text" },
    { name: "LINIO", type: "text" },
    { name: "Universidad Externado de Colombia", type: "text" },
    { name: "falabella.com", type: "text" }
  ];

  return (
    <section className="py-32 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl md:text-5xl font-bold text-center mb-16 md:24 tracking-tight">
          <span className="text-[#FF5B00]">Clientes</span> que han confiado en nosotros
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-12 gap-y-20 items-center justify-items-center opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
          {clients.map((client, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="text-center group"
            >
              <span className="text-white font-black text-xl md:text-2xl tracking-tighter uppercase italic group-hover:text-[#FF5B00] transition-colors duration-300 cursor-default">
                {client.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const App = () => {
  const [activeFAQ, setActiveFAQ] = useState<number | null>(0);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [isTalentFormOpen, setIsTalentFormOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsAuthReady(true);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) {
        supabase.from('users').upsert({
          id: u.id,
          display_name: u.user_metadata?.full_name,
          email: u.email,
          photo_url: u.user_metadata?.avatar_url
        }).then(({error}) => { if(error) console.error(error) });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen font-['Inter'] selection:bg-[#FF5B00] selection:text-black">
      <Toaster position="top-center" richColors />
      <Navbar user={user} />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10" />
          <div className="w-full h-full bg-[#080808]" /> 
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#FF5B00]/10 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-20 grid lg:grid-cols-2 gap-12 items-center text-center lg:text-left">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#FF5B00] font-black uppercase tracking-[0.4em] text-[10px] mb-6 block border border-[#FF5B00]/30 w-fit px-4 py-1 rounded-full mx-auto lg:mx-0">
              Tech Innovation Center
            </span>
            <h1 className="text-4xl md:text-8xl font-bold font-['Poppins'] leading-[1.1] mb-8 tracking-tighter">
              Descubre el poder de la <br/>
              <span className="text-[#FF5B00]">Inteligencia Artificial</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-lg leading-relaxed mx-auto lg:mx-0">
              No importa quién seas ni qué hagas, la Inteligencia Artificial está aquí para cambiar la forma en que trabajas.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <a href="#cursos" className="bg-[#FF5B00] text-black px-10 py-5 rounded-2xl font-black text-lg hover:shadow-[0_0_40px_-10px_#FF5B00] transition-all flex items-center gap-3 group relative">
                Ver Programas <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                <div className="absolute -top-3 -right-3 bg-white text-black text-[8px] font-black px-2 py-1 rounded-full shadow-lg animate-bounce">
                  ¡CUPOS LIMITADOS!
                </div>
              </a>
              {!user && (
                <button onClick={signInWithEmail} className="bg-white/5 border border-white/10 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-white/10 transition-all">
                  Empezar Ahora
                </button>
              )}
            </div>
            <HeroSocialProof />
          </motion.div>
        </div>
      </section>

      {/* --- LLM LOGOS --- */}
      <LLMBanner />

      {/* --- COURSES SECTION --- */}
      <section id="cursos" className="py-32 max-w-7xl mx-auto px-6">
        <div className="mb-12 md:mb-20 text-center lg:text-left">
          <span className="text-[#FF5B00] font-black uppercase tracking-[0.2em] text-xs mb-4 block underline decoration-2 underline-offset-8">Oferta Académica</span>
          <h2 className="text-3xl md:text-6xl font-bold font-['Poppins'] tracking-tight">Cursos de Vanguardia</h2>
          <p className="text-gray-500 mt-6 text-base md:text-lg">Especialízate en el <span className="text-white font-semibold">Centro de Innovación Tecnológica</span> líder en la región.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COURSES.map((course, index) => (
            <CourseCard 
              key={course.id} 
              course={course} 
              highlight={index === 4}
              onOpenDetails={(c) => {
                setSelectedCourse(c);
                setIsDetailsOpen(true);
              }}
            />
          ))}
        </div>
      </section>

      {/* --- BENEFITS SECTION --- */}
      <BenefitsSection />

      {/* --- IMAGE GENERATOR --- */}
      <ImageGenerator user={user} />

      {/* --- ECOSYSTEM FLOW SECTION --- */}
      <section id="ecosistema" className="py-32 bg-[#000] relative overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 md:mb-24">
            <h2 className="text-3xl md:text-6xl font-bold font-['Poppins'] tracking-tighter">Flujo de Herramientas</h2>
            <p className="text-gray-500 mt-4 md:mt-6 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
              Integramos las plataformas líderes del mercado para crear un flujo de trabajo profesional potenciado por agentes autónomos.
            </p>
          </div>

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-12 md:gap-0 min-h-[500px]">
            <div className="flex flex-col gap-12 z-10">
              {TOOL_ECOSYSTEM.left.map((tool, i) => (
                <ToolNode key={i} tool={tool} side="left" />
              ))}
            </div>

            <div className="relative z-10 order-first md:order-none">
              <motion.div 
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="w-32 h-32 md:w-48 md:h-48 bg-[#FF5B00] rounded-[2rem] flex items-center justify-center shadow-[0_0_80px_rgba(255,91,0,0.4)]"
              >
                <div className="text-center text-black">
                  <div className="font-black text-3xl md:text-5xl italic tracking-tighter leading-none">CIX</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest mt-1">Engine</div>
                </div>
              </motion.div>
              
              <svg className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] pointer-events-none -z-10" viewBox="0 0 800 500">
                <path d="M150 100 Q 300 100 400 250" stroke="#FF5B00" strokeWidth="1" fill="none" className="opacity-20" strokeDasharray="5,5" />
                <path d="M150 250 L 400 250" stroke="#FF5B00" strokeWidth="1" fill="none" className="opacity-20" strokeDasharray="5,5" />
                <path d="M150 400 Q 300 400 400 250" stroke="#FF5B00" strokeWidth="1" fill="none" className="opacity-20" strokeDasharray="5,5" />
                <path d="M650 100 Q 500 100 400 250" stroke="#FF5B00" strokeWidth="1" fill="none" className="opacity-20" strokeDasharray="5,5" />
                <path d="M650 250 L 400 250" stroke="#FF5B00" strokeWidth="1" fill="none" className="opacity-20" strokeDasharray="5,5" />
                <path d="M650 400 Q 500 400 400 250" stroke="#FF5B00" strokeWidth="1" fill="none" className="opacity-20" strokeDasharray="5,5" />
              </svg>
            </div>

            <div className="flex flex-col gap-12 z-10">
              {TOOL_ECOSYSTEM.right.map((tool, i) => (
                <ToolNode key={i} tool={tool} side="right" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- VALUE PROP SECTION --- */}
      <section className="py-32 bg-[#080808] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#FF5B00]/5 blur-[150px] rounded-full translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold font-['Poppins'] leading-tight mb-8 md:10 tracking-tighter">
              Potencia tu trabajo bajo el <span className="text-[#FF5B00] italic underline decoration-[#FF5B00]/30 underline-offset-4">Estándar CIX</span>
            </h2>
            <div className="space-y-6 md:space-y-8 text-sm md:text-base">
              {[
                { title: "Metodología High-Tech", desc: "Aprendizaje inmersivo basado en casos de uso de empresas reales." },
                { title: "Innovación Continua", desc: "Contenido actualizado según los últimos avances en IA Generativa." },
                { title: "Certificación CIX", desc: "Tu esfuerzo respaldado por un ecosistema tecnológico regional." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="w-14 h-14 bg-[#FF5B00]/5 border border-[#FF5B00]/20 rounded-2xl flex items-center justify-center flex-shrink-0 text-[#FF5B00] transition-all">
                    <CheckCircle2 size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xl mb-1">{item.title}</h4>
                    <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative group">
             <div className="absolute inset-0 bg-[#FF5B00]/10 rounded-[50px] blur-3xl group-hover:bg-[#FF5B00]/20 transition-all" />
             <div className="relative bg-gradient-to-br from-[#111] to-[#000] rounded-[50px] aspect-square flex flex-col border border-white/10 overflow-hidden p-8 shadow-2xl">
                <div className="flex justify-between items-start mb-6">
                   <div className="w-12 h-12 bg-[#FF5B00] rounded-xl flex items-center justify-center shadow-lg">
                      <Bot size={24} color="black" strokeWidth={2.5} />
                   </div>
                   <div className="text-right">
                      <div className="text-[#FF5B00] font-black text-xl">98%</div>
                      <div className="text-[8px] text-gray-500 uppercase tracking-widest">Efficiency rate</div>
                   </div>
                </div>
                
                <div className="flex-grow bg-black/40 rounded-3xl p-4 border border-white/5 overflow-hidden">
                   <ChatSimulation />
                </div>

                <div className="mt-6">
                    <span className="text-2xl font-black leading-none mb-2 block tracking-tighter italic">CIX + AGENTS</span>
                    <p className="text-gray-500 text-xs font-medium tracking-wide leading-relaxed italic">Automatización real que cierra ventas mientras duermes.</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* --- TALENT SECTION --- */}
      <section className="py-32 bg-gradient-to-b from-[#080808] to-black border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#FF5B00_1px,transparent_1px)] [background-size:40px_40px]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="bg-[#111] border border-[#FF5B00]/20 rounded-[4rem] p-12 md:p-20 overflow-hidden relative group">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#FF5B00]/10 blur-[120px] rounded-full group-hover:bg-[#FF5B00]/20 transition-all" />
            
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="bg-[#FF5B00] text-black text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-[0.2em] mb-6 inline-block">CIX Open Talent</span>
                <h2 className="text-4xl md:text-6xl font-bold font-['Poppins'] tracking-tighter mb-8 leading-tight">
                  Tu talento vale más que un <span className="text-[#FF5B00] italic">título académico</span>
                </h2>
                <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                  En CIX creemos que la verdadera innovación nace de la capacidad y la pasión, no solo de los cartones. Si tienes habilidades en tecnología, diseño o resolución de problemas, queremos que trabajes con nosotros en proyectos reales de IA.
                </p>
                
                <div className="grid sm:grid-cols-2 gap-6 mb-12">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-[#FF5B00]/10 rounded-lg text-[#FF5B00]"><Zap size={20} /></div>
                    <div>
                      <h5 className="font-bold text-white mb-1">Sin Títulos</h5>
                      <p className="text-xs text-gray-500">Evaluamos tus habilidades reales y portafolio.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-[#FF5B00]/10 rounded-lg text-[#FF5B00]"><Bot size={20} /></div>
                    <div>
                      <h5 className="font-bold text-white mb-1">Proyectos IA</h5>
                      <p className="text-xs text-gray-500">Colabora en el desarrollo de agentes autónomos.</p>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    if (user) setIsTalentFormOpen(true);
                    else signInWithEmail();
                  }}
                  className="bg-white text-black px-10 py-5 rounded-2xl font-black text-lg hover:bg-[#FF5B00] hover:text-black transition-all flex items-center gap-3"
                >
                  Postular al Equipo <ArrowRight size={20} />
                </button>
              </div>

              <div className="relative">
                <div className="bg-black/50 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center text-white font-bold">?</div>
                    <div>
                      <h4 className="font-bold text-white">¿Eres tú?</h4>
                      <p className="text-xs text-gray-500 tracking-widest uppercase">Buscamos mentes brillantes</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      "Autodidactas apasionados por la tecnología.",
                      "Expertos en herramientas No-Code o Low-Code.",
                      "Creativos con visión estratégica de IA.",
                      "Solucionadores de problemas con lógica pura."
                    ].map((text, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-gray-300 bg-white/5 p-3 rounded-xl border border-white/5">
                        <CheckCircle2 size={16} className="text-[#FF5B00]" />
                        {text}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CLIENTS SECTION --- */}
      <ClientsSection />

      {/* --- RECOGNITIONS SECTION --- */}
      <RecognitionsSection />

      {/* --- NEWS SECTION --- */}
      <NewsSection />

      {/* --- FAQ SECTION --- */}
      <section className="py-32 max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">¿Preguntas sobre CIX?</h2>
        </div>
        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <AccordionItem key={i} item={faq} index={i} active={activeFAQ} setActive={setActiveFAQ} />
          ))}
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-[#050505] pt-32 pb-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-[#FF5B00] rounded flex items-center justify-center font-bold text-black text-xs italic tracking-tighter">CIX</div>
              <span className="text-white font-bold text-xl uppercase tracking-tighter">CIX Perú</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              Lideramos la formación tecnológica en Cusco con estándares de innovación global. Impulsando el talento regional hacia el futuro de la IA.
            </p>
          </div>
          
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-12">
            <div>
              <h5 className="font-bold mb-8 text-white uppercase text-[10px] tracking-[0.3em]">Programas</h5>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><a href="#" className="hover:text-[#FF5B00]">Diplomado IA</a></li>
                <li><a href="#" className="hover:text-[#FF5B00]">Automatización</a></li>
                <li><a href="#" className="hover:text-[#FF5B00]">Legal IA</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-8 text-white uppercase text-[10px] tracking-[0.3em]">Sede Cusco</h5>
              <p className="text-sm text-gray-500 leading-relaxed">
                Calle Chiwampata 543<br/>
                Barrio de San Blas<br/>
                Cusco, Perú
              </p>
            </div>
            <div>
              <h5 className="font-bold mb-8 text-white uppercase text-[10px] tracking-[0.3em]">Contacto</h5>
              <ul className="space-y-4 text-sm text-gray-500">
                <li className="flex items-center gap-2">
                  <Smartphone size={14} className="text-[#FF5B00]" />
                  <span>958050928</span>
                </li>
                <li className="flex items-center gap-2">
                  <Globe size={14} className="text-[#FF5B00]" />
                  <a href="https://www.cixperu.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF5B00]">www.cixperu.com</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-10 border-t border-white/5 text-center">
            <p className="text-gray-700 text-[10px] uppercase tracking-[0.3em]">© 2025 CIX Centro de Innovación Tecnológica · All rights reserved</p>
        </div>
      </footer>

      {/* --- FLOATING ACTIONS --- */}
      <div className="fixed bottom-8 left-8 z-50 flex flex-col gap-4">
        <motion.a 
            href="https://wa.me/573000000000"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            className="w-16 h-16 bg-[#25D366] rounded-2xl flex items-center justify-center shadow-xl text-white"
        >
            <MessageCircle size={32} />
        </motion.a>
      </div>

      {/* --- BOT --- */}
      <Chatbot user={user} />
      
      {/* --- TALENT FORM --- */}
      <TalentForm isOpen={isTalentFormOpen} onClose={() => setIsTalentFormOpen(false)} user={user} />

      {/* --- NEUROMARKETING ELEMENTS --- */}
      <LiveActivity />

      {/* --- COURSE MODALS --- */}
      <CourseDetailsModal 
        isOpen={isDetailsOpen} 
        onClose={() => setIsDetailsOpen(false)} 
        course={selectedCourse} 
        user={user}
        onEnroll={() => {
          setIsDetailsOpen(false);
          setIsPaymentOpen(true);
        }}
      />
      <PaymentModal 
        isOpen={isPaymentOpen} 
        onClose={() => setIsPaymentOpen(false)} 
        course={selectedCourse} 
        user={user} 
      />
    </div>
  );
};

export default App;
