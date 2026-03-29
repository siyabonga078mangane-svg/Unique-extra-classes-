/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Star, 
  Menu, 
  X, 
  ChevronRight, 
  BookOpen, 
  FlaskConical, 
  Calculator, 
  Languages, 
  GraduationCap,
  MessageCircle,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
type Page = 'home' | 'about' | 'services' | 'reviews' | 'gallery' | 'contact';

// --- Constants ---
const LOGO_URL = "https://images.scalebranding.com/electric-blue-lightbulb-gear-logo-525ea178-39a1-4536-99e5-2e8b020988f6.jpg";
const CONTACT_NUMBERS = ["073 620 5618", "081 529 9903"];
const EMAIL = "siyabonga078mangane@gmail.com";
const LOCATION = "Bloemfontein";

// --- Components ---

const Navbar = ({ currentPage, setPage }: { currentPage: Page, setPage: (p: Page) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string, id: Page }[] = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: 'Reviews', id: 'reviews' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center cursor-pointer" onClick={() => setPage('home')}>
            <img src={LOGO_URL} alt="Unique Extra Classes" className="h-12 w-auto rounded-lg shadow-sm mr-3" referrerPolicy="no-referrer" />
            <div className="flex flex-col">
              <span className={`font-display font-bold text-xl leading-tight ${scrolled ? 'text-academic-blue' : 'text-white'}`}>Unique Extra</span>
              <span className={`font-display font-medium text-sm tracking-widest uppercase ${scrolled ? 'text-metallic-gold' : 'text-gold-light'}`}>Classes</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                className={`font-medium transition-colors hover:text-metallic-gold ${
                  currentPage === item.id 
                    ? 'text-metallic-gold' 
                    : scrolled ? 'text-academic-blue' : 'text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button onClick={() => setPage('contact')} className="btn-gold py-2 px-5 text-sm">
              Enroll Now
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className={scrolled ? 'text-academic-blue' : 'text-white'}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setPage(item.id); setIsOpen(false); }}
                  className={`block w-full text-left px-3 py-3 text-base font-medium rounded-md ${
                    currentPage === item.id ? 'text-metallic-gold bg-slate-50' : 'text-academic-blue hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4">
                <button 
                  onClick={() => { setPage('contact'); setIsOpen(false); }}
                  className="w-full btn-gold"
                >
                  Enroll Now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = ({ setPage }: { setPage: (p: Page) => void }) => {
  return (
    <footer className="bg-academic-blue text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center">
              <img src={LOGO_URL} alt="Logo" className="h-10 w-auto rounded mr-3" referrerPolicy="no-referrer" />
              <span className="font-display font-bold text-xl">Unique Extra Classes</span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Premium tutoring in Bloemfontein — where Learning Brings Hope. We empower students to reach their full potential.
            </p>
            <div className="flex space-x-4">
              {/* Social placeholders */}
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-metallic-gold transition-colors cursor-pointer">
                <MessageCircle size={18} />
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg mb-6 text-metallic-gold">Quick Links</h4>
            <ul className="space-y-3 text-slate-300">
              {['Home', 'About', 'Services', 'Reviews', 'Gallery', 'Contact'].map((item) => (
                <li key={item}>
                  <button 
                    onClick={() => setPage(item.toLowerCase() as Page)}
                    className="hover:text-white transition-colors flex items-center group"
                  >
                    <ChevronRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-all" />
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg mb-6 text-metallic-gold">Our Services</h4>
            <ul className="space-y-3 text-slate-300 text-sm">
              <li>Mathematics (Grades 4–12)</li>
              <li>Physical Sciences</li>
              <li>Life Sciences</li>
              <li>Accounting</li>
              <li>Homework Assistance</li>
              <li>Exam Preparation</li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg mb-6 text-metallic-gold">Contact Us</h4>
            <ul className="space-y-4 text-slate-300 text-sm">
              <li className="flex items-start">
                <Phone size={18} className="mr-3 text-metallic-gold shrink-0" />
                <div>
                  <p>{CONTACT_NUMBERS[0]}</p>
                  <p>{CONTACT_NUMBERS[1]}</p>
                </div>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-3 text-metallic-gold shrink-0" />
                <a href={`mailto:${EMAIL}`} className="hover:text-white transition-colors">{EMAIL}</a>
              </li>
              <li className="flex items-center">
                <MapPin size={18} className="mr-3 text-metallic-gold shrink-0" />
                <span>{LOCATION}</span>
              </li>
              <li className="flex items-center">
                <Clock size={18} className="mr-3 text-metallic-gold shrink-0" />
                <span>Mon–Fri: 2 PM – 6 PM</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 text-center text-slate-400 text-xs">
          <p>© 2026 Unique Extra Classes — <span className="italic">Learning Brings Hope.</span></p>
        </div>
      </div>
    </footer>
  );
};

const WhatsAppButton = () => (
  <a 
    href={`https://wa.me/27${CONTACT_NUMBERS[0].replace(/\s/g, '').substring(1)}`} 
    target="_blank" 
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform active:scale-95 flex items-center justify-center"
    title="Chat with us on WhatsApp"
  >
    <MessageCircle size={30} fill="currentColor" />
  </a>
);

// --- Page Sections ---

const HomePage = ({ setPage }: { setPage: (p: Page) => void }) => {
  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-academic-blue/80 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=2070" 
            alt="Students studying" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-gold-light text-sm font-medium mb-6">
                <Star size={16} className="mr-2 fill-metallic-gold text-metallic-gold" />
                Rated ★4.5 by Parents & Students
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Unlock Your Child’s <br />
                <span className="text-metallic-gold">Full Academic Potential</span>
              </h1>
              <p className="text-xl text-slate-200 mb-10 leading-relaxed max-w-2xl">
                Premium tutoring in Bloemfontein — where <span className="italic font-medium text-white">Learning Brings Hope.</span> Trusted by parents, loved by learners.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button onClick={() => setPage('contact')} className="btn-gold text-lg px-8 py-4 flex items-center justify-center">
                  Enroll Now <ArrowRight size={20} className="ml-2" />
                </button>
                <a 
                  href={`https://wa.me/27${CONTACT_NUMBERS[0].replace(/\s/g, '').substring(1)}`} 
                  className="btn-blue border border-white/30 text-lg px-8 py-4 flex items-center justify-center"
                >
                  WhatsApp Us
                </a>
              </div>

              <div className="flex flex-wrap gap-6 text-white/80 text-sm">
                <div className="flex items-center">
                  <Phone size={16} className="mr-2 text-metallic-gold" />
                  {CONTACT_NUMBERS[0]}
                </div>
                <div className="flex items-center">
                  <Phone size={16} className="mr-2 text-metallic-gold" />
                  {CONTACT_NUMBERS[1]}
                </div>
                <div className="flex items-center">
                  <Mail size={16} className="mr-2 text-metallic-gold" />
                  {EMAIL}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1491841573634-28140fc7ced7?auto=format&fit=crop&q=80&w=2070" 
                  alt="Tutoring session" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-metallic-gold text-academic-blue p-8 rounded-2xl shadow-xl hidden md:block">
                <p className="text-4xl font-bold">Grades 4–12</p>
                <p className="font-medium">Comprehensive Support</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-academic-blue text-sm font-bold uppercase tracking-widest">About Us</h2>
              <h3 className="text-4xl font-bold text-slate-900 leading-tight">
                Personalised Support to Help Every Student Grow
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed">
                At Unique Extra Classes, we believe every learner deserves personalised support to grow academically. We are committed to helping students improve their marks, build confidence, and develop strong study habits.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed">
                We proudly serve the Bloemfontein community with high-quality tutoring for Grades 4–12 — offering a safe, supportive, and motivating environment.
              </p>
              <div className="flex items-center p-4 bg-slate-50 rounded-xl border-l-4 border-metallic-gold">
                <Clock className="text-metallic-gold mr-4" />
                <div>
                  <p className="font-bold text-academic-blue">Operating Hours</p>
                  <p className="text-slate-600">Opens Monday at 2 PM</p>
                </div>
              </div>
              <button onClick={() => setPage('about')} className="text-academic-blue font-bold flex items-center hover:text-metallic-gold transition-colors">
                Learn More About Our Story <ChevronRight size={20} className="ml-1" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-academic-blue text-sm font-bold uppercase tracking-widest mb-4">Subjects & Programs</h2>
            <h3 className="text-4xl font-bold text-slate-900 mb-6">Comprehensive Extra Classes</h3>
            <p className="text-slate-600 text-lg">We offer a wide range of subjects designed to help students excel in their schoolwork and exams.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Mathematics', icon: <Calculator />, desc: 'Grades 4–12. Foundations to Advanced.' },
              { title: 'Physical Sciences', icon: <FlaskConical />, desc: 'Physics & Chemistry simplified.' },
              { title: 'Life Sciences', icon: <BookOpen />, desc: 'Biology concepts made easy.' },
              { title: 'Accounting', icon: <GraduationCap />, desc: 'Strong foundations for success.' },
              { title: 'Languages', icon: <Languages />, desc: 'English, Afrikaans, Setswana & more.' },
              { title: 'Homework Assistance', icon: <CheckCircle2 />, desc: 'Daily support to stay on track.' },
              { title: 'Exam Preparation', icon: <GraduationCap />, desc: 'Past papers & mock tests.' },
              { title: 'Study Skills', icon: <BookOpen />, desc: 'Effective learning strategies.' },
            ].map((subject, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="card-shadow p-8 hover:border-metallic-gold transition-all group"
              >
                <div className="w-14 h-14 bg-academic-blue text-white rounded-xl flex items-center justify-center mb-6 group-hover:bg-metallic-gold transition-colors">
                  {React.cloneElement(subject.icon as React.ReactElement, { size: 28 })}
                </div>
                <h4 className="text-xl font-bold text-academic-blue mb-3">{subject.title}</h4>
                <p className="text-slate-600 text-sm">{subject.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button onClick={() => setPage('services')} className="btn-blue">
              View Full Class Schedule
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-academic-blue text-sm font-bold uppercase tracking-widest">Why Choose Us</h2>
              <h3 className="text-4xl font-bold text-slate-900">The Unique Advantage</h3>
              <div className="space-y-6">
                {[
                  'Qualified, patient, experienced tutors',
                  'Small-group & one-on-one classes',
                  'Proven improvement in exam results',
                  'Personalised learning strategies',
                  'Safe and encouraging environment',
                  'Responsive WhatsApp support for parents'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center">
                    <div className="w-6 h-6 bg-gold-light text-metallic-gold rounded-full flex items-center justify-center mr-4 shrink-0">
                      <CheckCircle2 size={16} />
                    </div>
                    <span className="text-lg text-slate-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-slate-600 text-lg italic border-l-4 border-metallic-gold pl-6">
                "At Unique Extra Classes, every learner receives the attention they need to succeed."
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1000" alt="Learning" className="rounded-2xl h-64 w-full object-cover" referrerPolicy="no-referrer" />
              <img src="https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&q=80&w=1000" alt="Learning" className="rounded-2xl h-64 w-full object-cover mt-12" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-24 bg-academic-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-4">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} className={`fill-metallic-gold text-metallic-gold ${i === 5 ? 'opacity-50' : ''}`} size={24} />)}
            </div>
            <h3 className="text-4xl font-bold mb-4">Rated ★4.5 by Satisfied Parents</h3>
            <p className="text-slate-300">Real feedback from our community in Bloemfontein.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-10 rounded-3xl">
              <p className="text-xl italic mb-8 leading-relaxed">
                “My child’s marks improved dramatically. Professional and reliable service!”
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-metallic-gold rounded-full flex items-center justify-center text-academic-blue font-bold text-xl mr-4">P</div>
                <div>
                  <p className="font-bold">Happy Parent</p>
                  <p className="text-slate-400 text-sm">Bloemfontein</p>
                </div>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-10 rounded-3xl">
              <p className="text-xl italic mb-8 leading-relaxed">
                “The teachers explain everything so clearly. My results improved quickly.”
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-metallic-gold rounded-full flex items-center justify-center text-academic-blue font-bold text-xl mr-4">S</div>
                <div>
                  <p className="font-bold">Grade 11 Student</p>
                  <p className="text-slate-400 text-sm">Bloemfontein</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-metallic-gold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-academic-blue mb-6">Ready to See Real Academic Progress?</h3>
          <p className="text-xl text-academic-blue/80 mb-10 max-w-2xl mx-auto font-medium">Secure your child’s spot today and give them the gift of confidence.</p>
          <button onClick={() => setPage('contact')} className="bg-academic-blue text-white font-bold px-10 py-4 rounded-full text-lg shadow-2xl hover:scale-105 transition-transform">
            Book a Class Now
          </button>
        </div>
      </section>
    </div>
  );
};

const AboutPage = () => (
  <div className="pt-32 pb-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center mb-20">
        <h1 className="text-5xl font-bold text-academic-blue mb-6">Who We Are</h1>
        <p className="text-xl text-slate-600 leading-relaxed">
          Unique Extra Classes is a trusted tutoring centre dedicated to helping learners excel academically through personalised teaching and structured support.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
        <div className="card-shadow p-10 text-center">
          <div className="w-16 h-16 bg-gold-light text-metallic-gold rounded-full flex items-center justify-center mx-auto mb-6">
            <GraduationCap size={32} />
          </div>
          <h3 className="text-2xl font-bold text-academic-blue mb-4">Our Mission</h3>
          <p className="text-slate-600">To provide high-quality, affordable tutoring that inspires confidence, strengthens understanding, and improves results.</p>
        </div>
        <div className="card-shadow p-10 text-center">
          <div className="w-16 h-16 bg-gold-light text-metallic-gold rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={32} />
          </div>
          <h3 className="text-2xl font-bold text-academic-blue mb-4">Our Approach</h3>
          <ul className="text-slate-600 text-sm space-y-2 text-left list-disc pl-4">
            <li>Individualised attention</li>
            <li>Friendly, patient educators</li>
            <li>Real-world teaching examples</li>
            <li>Past-paper practice</li>
            <li>Parent progress updates</li>
          </ul>
        </div>
        <div className="card-shadow p-10 text-center">
          <div className="w-16 h-16 bg-gold-light text-metallic-gold rounded-full flex items-center justify-center mx-auto mb-6">
            <Star size={32} />
          </div>
          <h3 className="text-2xl font-bold text-academic-blue mb-4">Our Belief</h3>
          <p className="text-slate-600 italic font-medium">“Learning Brings Hope.”</p>
          <p className="text-slate-500 text-sm mt-4">We empower learners across Bloemfontein with the belief that education is the key to a brighter future.</p>
        </div>
      </div>

      <div className="bg-academic-blue rounded-3xl p-12 text-white overflow-hidden relative">
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <p className="text-lg text-slate-300 leading-relaxed mb-6">
            We began with a simple dream: to make quality education accessible and effective. We saw too many students struggling in overcrowded classrooms without the individual attention they needed.
          </p>
          <p className="text-lg text-slate-300 leading-relaxed">
            Today, we proudly empower learners across Bloemfontein, helping them bridge the gap between confusion and clarity.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 hidden lg:block">
          <img src={LOGO_URL} alt="Logo" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
        </div>
      </div>
    </div>
  </div>
);

const ServicesPage = () => {
  const services = [
    { title: 'Mathematics', desc: 'Step-by-step explanations, improved problem-solving skills, and exam-focused teaching.', icon: <Calculator /> },
    { title: 'Physical Sciences', desc: 'Clear breakdowns of Physics & Chemistry concepts with practical examples.', icon: <FlaskConical /> },
    { title: 'Life Sciences', desc: 'Easy-to-understand lessons covering everything from cells to genetics.', icon: <BookOpen /> },
    { title: 'Accounting', desc: 'Strong foundations, guided exercises, and exam strategy preparation.', icon: <GraduationCap /> },
    { title: 'Languages', desc: 'Improvement in grammar, comprehension, writing, and exam answers.', icon: <Languages /> },
    { title: 'Homework Support', desc: 'Daily assistance to keep learners on track and reduce school stress.', icon: <CheckCircle2 /> },
    { title: 'Exam Preparation', desc: 'Past papers, mock tests, and personalised revision plans.', icon: <GraduationCap /> },
  ];

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold text-academic-blue mb-6">Our Services</h1>
          <p className="text-xl text-slate-600">Specialised tutoring programs tailored for success.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <div key={i} className="card-shadow p-8 flex flex-col h-full">
              <div className="text-metallic-gold mb-6">{React.cloneElement(s.icon as React.ReactElement, { size: 40 })}</div>
              <h3 className="text-2xl font-bold text-academic-blue mb-4">{s.title}</h3>
              <p className="text-slate-600 mb-8 flex-grow">{s.desc}</p>
              <button className="btn-gold w-full">Enroll for This Subject</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ReviewsPage = () => (
  <div className="pt-32 pb-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-20">
        <h1 className="text-5xl font-bold text-academic-blue mb-6">What Parents & Students Say</h1>
        <div className="flex justify-center items-center gap-4">
          <div className="flex">
            {[1, 2, 3, 4, 5].map(i => <Star key={i} className={`fill-metallic-gold text-metallic-gold ${i === 5 ? 'opacity-50' : ''}`} size={32} />)}
          </div>
          <span className="text-3xl font-bold text-academic-blue">4.5 / 5</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="card-shadow p-12 relative">
          <div className="absolute top-6 right-8 text-6xl text-slate-100 font-serif">“</div>
          <p className="text-2xl italic text-slate-700 mb-8 relative z-10">
            “The improvement in my child’s marks is amazing. Highly recommended!”
          </p>
          <div className="flex items-center">
            <div className="w-14 h-14 bg-academic-blue text-white rounded-full flex items-center justify-center font-bold text-xl mr-4">M</div>
            <div>
              <p className="font-bold text-lg">Mrs. Mokoena</p>
              <p className="text-slate-500">Parent</p>
            </div>
          </div>
        </div>
        <div className="card-shadow p-12 relative">
          <div className="absolute top-6 right-8 text-6xl text-slate-100 font-serif">“</div>
          <p className="text-2xl italic text-slate-700 mb-8 relative z-10">
            “I finally understand my work. Best tutoring classes ever.”
          </p>
          <div className="flex items-center">
            <div className="w-14 h-14 bg-metallic-gold text-academic-blue rounded-full flex items-center justify-center font-bold text-xl mr-4">L</div>
            <div>
              <p className="font-bold text-lg">Lerato S.</p>
              <p className="text-slate-500">Grade 12 Student</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const GalleryPage = () => {
  const images = [
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=1000",
  ];

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold text-academic-blue mb-6">Our Gallery</h1>
          <p className="text-xl text-slate-600">Success moments and learning environments.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.02 }}
              className="aspect-video rounded-2xl overflow-hidden shadow-lg cursor-pointer"
            >
              <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h1 className="text-5xl font-bold text-academic-blue mb-8 text-gradient-gold">Get in Touch</h1>
            <p className="text-xl text-slate-600 mb-12">
              We are ready to help your child succeed. Reach out to us for any inquiries or to book a spot.
            </p>

            <div className="space-y-8">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-gold-light text-metallic-gold rounded-xl flex items-center justify-center mr-6 shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-academic-blue text-lg">Call Us</h4>
                  <p className="text-slate-600">{CONTACT_NUMBERS[0]}</p>
                  <p className="text-slate-600">{CONTACT_NUMBERS[1]}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-12 h-12 bg-gold-light text-metallic-gold rounded-xl flex items-center justify-center mr-6 shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-academic-blue text-lg">Email Us</h4>
                  <p className="text-slate-600">{EMAIL}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-12 h-12 bg-gold-light text-metallic-gold rounded-xl flex items-center justify-center mr-6 shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-academic-blue text-lg">Location</h4>
                  <p className="text-slate-600">{LOCATION}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-12 h-12 bg-gold-light text-metallic-gold rounded-xl flex items-center justify-center mr-6 shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-academic-blue text-lg">Operating Hours</h4>
                  <p className="text-slate-600">Mon–Fri: 2 PM – 6 PM</p>
                  <p className="text-slate-500 text-sm italic">Closed on Weekends</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card-shadow p-10">
            {submitted ? (
              <div className="text-center py-20 space-y-6">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-bold text-academic-blue">Message Sent!</h3>
                <p className="text-slate-600">Thank you for reaching out. We will respond within minutes during open hours.</p>
                <button onClick={() => setSubmitted(false)} className="btn-gold">Send Another Message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-academic-blue">Full Name</label>
                    <input required type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-metallic-gold focus:ring-2 focus:ring-gold-light outline-none transition-all" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-academic-blue">Email</label>
                    <input required type="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-metallic-gold focus:ring-2 focus:ring-gold-light outline-none transition-all" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-academic-blue">Phone Number</label>
                    <input required type="tel" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-metallic-gold focus:ring-2 focus:ring-gold-light outline-none transition-all" placeholder="073 620 5618" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-academic-blue">Child’s Grade</label>
                    <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-metallic-gold focus:ring-2 focus:ring-gold-light outline-none transition-all">
                      <option>Grade 4</option>
                      <option>Grade 5</option>
                      <option>Grade 6</option>
                      <option>Grade 7</option>
                      <option>Grade 8</option>
                      <option>Grade 9</option>
                      <option>Grade 10</option>
                      <option>Grade 11</option>
                      <option>Grade 12</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-academic-blue">Subject(s)</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-metallic-gold focus:ring-2 focus:ring-gold-light outline-none transition-all" placeholder="Mathematics, Physical Sciences..." />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-academic-blue">Message</label>
                  <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-metallic-gold focus:ring-2 focus:ring-gold-light outline-none transition-all" placeholder="How can we help your child?"></textarea>
                </div>
                <button type="submit" className="w-full btn-gold py-4 text-lg">Send Message</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [page, setPage] = useState<Page>('home');

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const renderPage = () => {
    switch (page) {
      case 'home': return <HomePage setPage={setPage} />;
      case 'about': return <AboutPage />;
      case 'services': return <ServicesPage />;
      case 'reviews': return <ReviewsPage />;
      case 'gallery': return <GalleryPage />;
      case 'contact': return <ContactPage />;
      default: return <HomePage setPage={setPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentPage={page} setPage={setPage} />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer setPage={setPage} />
      <WhatsAppButton />
    </div>
  );
}
