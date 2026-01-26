import React, { useState, useRef, useMemo } from 'react';
import { BentoGrid, BentoItem } from './components/BentoGrid';
import { INITIAL_CONTENT, INITIAL_LAYOUT, INITIAL_THEME, ICON_MAP } from './constants';
import { PortfolioContent, LayoutConfig, ThemeConfig } from './types';
import { remixVisuals } from './services/geminiService';
import { Sparkles, Loader2, Mail, ExternalLink, ArrowRight, GraduationCap, Copy, Check, Bell, FileText, BookOpen, Briefcase, Award } from 'lucide-react';
import { PixelGame } from './components/PixelGame';
import { NeuroDecorations } from './components/NeuroAssets';

const App = () => {
  const [content, setContent] = useState<PortfolioContent>(INITIAL_CONTENT);
  const [layout, setLayout] = useState<LayoutConfig>(INITIAL_LAYOUT);
  const [theme, setTheme] = useState<ThemeConfig>(INITIAL_THEME);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [sources, setSources] = useState<string[]>([]);
  const [showCopyFeedback, setShowCopyFeedback] = useState(false);
  
  // Double tap logic
  const lastTapRef = useRef<number>(0);

  // Merge Experience and Education for the Timeline
  const timelineItems = useMemo(() => {
    const edu = content.education.map(e => ({ ...e, type: 'education' }));
    const exp = content.experience.map(e => ({ ...e, type: 'experience' }));
    // Simple merge (assuming ordered in constants, or we could sort if years were date objects)
    return [...exp, ...edu];
  }, [content]);

  const handleEnhance = async () => {
    setIsEnhancing(true);
    try {
      await remixVisuals((newTheme) => {
        setTheme(newTheme);
      });
    } catch (e) {
      console.error("Failed to remix visuals", e);
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleCopyTheme = () => {
    const json = JSON.stringify(theme, null, 2);
    navigator.clipboard.writeText(json).then(() => {
        setShowCopyFeedback(true);
        setTimeout(() => setShowCopyFeedback(false), 2000);
    });
  };

  const handleButtonPress = (e: React.MouseEvent | React.TouchEvent) => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;
    
    if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
        handleCopyTheme();
    } else {
        if (!isEnhancing) {
            handleEnhance();
        }
    }
    lastTapRef.current = now;
  };

  const handleCreateReminder = () => {
    const event = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      'SUMMARY:Kontakt Vilde Brecke (Veiledning)',
      'DESCRIPTION:Husk å sende mail til vilde.brecke@gmail.com angående veiledning.',
      `DTSTART:${new Date().toISOString().replace(/-|:|\.\d+/g, '')}`,
      `DTEND:${new Date(Date.now() + 3600000).toISOString().replace(/-|:|\.\d+/g, '')}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\n');

    const blob = new Blob([event], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Husk_Vilde.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen ${theme.background} ${theme.textMain} ${theme.font || 'font-sans'} pb-20 transition-all duration-700 ease-in-out`}>
      
      {/* Toast Notification */}
      <div className={`fixed top-24 left-1/2 -translate-x-1/2 z-[100] px-4 py-2 bg-stone-900 text-white text-xs font-bold rounded-full flex items-center gap-2 transition-all duration-300 ${showCopyFeedback ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
        <Check size={14} className="text-green-400" />
        Stil kopiert til utklippstavle!
      </div>

      {/* Navbar */}
      <nav className={`sticky top-0 z-50 ${theme.background} border-b ${theme.border} transition-colors duration-700 ease-in-out bg-opacity-90 backdrop-blur-sm`}>
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Brand */}
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => scrollToSection('home')}>
             <div className={`relative w-12 h-12 overflow-hidden rounded-full border-2 ${theme.border} ${theme.accentBorder} transition-colors`}>
                <img 
                  src="https://i.ibb.co/dstnXYsg/IMG-8537.jpg" 
                  alt="Vilde"
                  className="w-full h-full object-cover"
                />
             </div>
             <div className="flex flex-col">
                <span className={`font-bold tracking-tight text-lg leading-none ${theme.textMain}`}>Vilde Brecke</span>
                <span className={`text-xs font-medium ${theme.primary}`}>Ph.d. i psykologi</span>
             </div>
          </div>

          <div className={`hidden md:flex items-center gap-1 bg-white/50 p-1 rounded-full border ${theme.border}`}>
            {['Hjem', 'Om meg', 'Tjenester', 'Kontakt'].map((item, i) => {
               const id = item === 'Hjem' ? 'home' : item === 'Om meg' ? 'about' : item === 'Tjenester' ? 'services' : 'contact';
               return (
                <button 
                  key={i} 
                  onClick={() => scrollToSection(id)} 
                  className={`px-5 py-2 rounded-full text-sm font-medium ${theme.textSecondary} hover:${theme.primaryBg} hover:${theme.primary} transition-all`}
                >
                  {item}
                </button>
               )
            })}
          </div>

          <button 
            onClick={handleButtonPress}
            disabled={isEnhancing}
            className={`opacity-0 flex items-center gap-2 px-5 py-2.5 bg-white border ${theme.border} ${theme.accentBorder} ${theme.textMain} text-xs font-bold uppercase tracking-wide rounded-full transition-all disabled:opacity-50 select-none active:scale-95`}
            title="Hemmelig remix knapp"
          >
            {isEnhancing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className={`w-4 h-4 ${theme.primary}`} />}
            {isEnhancing ? "Maler..." : "AI Remix"}
          </button>
        </div>
      </nav>

      <main className="pt-8 px-4" id="home">
        <BentoGrid>
          
          {/* Welcome / Hero */}
          <BentoItem 
            colSpan={layout.welcome.colSpan} 
            rowSpan={layout.welcome.rowSpan} 
            className={`justify-center bg-gradient-to-br ${theme.gradientFrom} ${theme.gradientTo} text-white border-transparent`}
          >
             <div className="space-y-6 relative z-10">
                <span className="inline-block px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-xs font-bold tracking-wider uppercase opacity-90">
                  👋 Hei student!
                </span>
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.15]">
                  {content.welcomeTitle}
                </h1>
                <p className="opacity-90 leading-relaxed text-lg font-medium max-w-md">
                  {content.welcomeText}
                </p>
                <div className="pt-6 border-t border-white/20 flex items-center gap-4">
                  <div className={`w-12 h-12 bg-white rounded-full flex items-center justify-center ${theme.primary}`}>
                     <GraduationCap size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-white">Jeg hjelper deg i mål</p>
                    <p className="opacity-70 text-sm">Med faglig trygghet</p>
                  </div>
                </div>
             </div>
          </BentoItem>

          {/* About / Photo - Moved next to Welcome */}
          <BentoItem 
            colSpan={layout.about.colSpan} 
            rowSpan={layout.about.rowSpan}
            className={`!p-0 overflow-hidden bg-white ${theme.accentBorder} flex flex-col justify-between`} 
            id="about"
          >
            <div className="h-56 w-full relative bg-stone-100 shrink-0">
               <img 
                 src="https://i.ibb.co/whVp9Th4/IMG-8539.jpg" 
                 alt="Vilde Dog" 
                 className="w-full h-full object-cover"
               />
            </div>
            <div className="p-8 flex flex-col flex-grow">
              <h2 className={`text-2xl font-bold ${theme.textMain} leading-tight`}>{content.name}</h2>
              <div className={`inline-block self-start px-3 py-1 ${theme.primaryBg} ${theme.primary} rounded-full text-xs font-bold my-3`}>
                {content.tagline}
              </div>
              <p className={`text-sm ${theme.textSecondary} leading-relaxed font-medium`}>
                {content.about}
              </p>
            </div>
          </BentoItem>

          {/* Contact - Moved to TOP Row (as requested) */}
          <BentoItem 
            colSpan={layout.contact.colSpan} 
            rowSpan={layout.contact.rowSpan}
            className={`!bg-orange-600 text-white !p-0 justify-between items-center text-center group overflow-hidden border-transparent flex flex-col`} 
            id="contact"
          >
             {/* Pixel Game Header */}
             <div className="w-full">
                <PixelGame />
             </div>

             <div className="relative z-10 flex flex-col items-center px-6 pb-8 w-full">
               <h3 className="text-xl font-bold mb-4">Ta kontakt</h3>
               
               <div className="flex items-center justify-center gap-2 w-full">
                   <a 
                     href={`mailto:${content.email}`} 
                     className={`flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-orange-900 rounded-full font-bold text-sm hover:opacity-90 transition-opacity whitespace-nowrap`}
                   >
                     Send e-post
                     <ArrowRight className="w-4 h-4" />
                   </a>
                   <button 
                    onClick={handleCreateReminder}
                    title="Lag påminnelse i kalender"
                    className="w-12 h-11 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                   >
                       <Bell size={20} className="text-white" />
                   </button>
               </div>
               
               <div className="flex gap-2 mt-8">
                 {content.socials?.map((link, i) => (
                   <a 
                     key={i}
                     href={link.url}
                     target="_blank"
                     rel="noreferrer"
                     className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all"
                   >
                     {ICON_MAP[link.icon || 'globe'] || <ExternalLink size={16} />}
                   </a>
                 ))}
               </div>
             </div>
          </BentoItem>

          {/* RESEARCH & PAPERS (Left side) */}
          <BentoItem colSpan={layout.research.colSpan} rowSpan={layout.research.rowSpan} className={`bg-white ${theme.accentBorder}`}>
             <div className="flex items-center justify-between mb-8">
                 <h3 className={`text-xs uppercase tracking-widest ${theme.primary} font-bold flex items-center gap-2`}>
                  <BookOpen size={14} />
                  Forskning & Publikasjoner
                 </h3>
                 <span className="text-[10px] font-medium text-stone-400 uppercase tracking-widest">Utvalgt</span>
             </div>

             <div className="relative space-y-8">
                 {/* Styled Vertical Line */}
                 <div className={`absolute left-[15px] top-2 bottom-2 w-0.5 ${theme.primaryBg} bg-opacity-50`}></div>
                 
                 {content.publications.map((pub, i) => (
                     <a 
                       href={pub.url} 
                       target="_blank" 
                       rel="noreferrer"
                       key={i} 
                       className="relative pl-10 flex flex-col group/paper cursor-pointer"
                     >
                         {/* Icon Node */}
                         <div className={`absolute left-0 top-0 w-8 h-8 rounded-full bg-white border border-stone-100 flex items-center justify-center z-10 group-hover/paper:border-orange-200 group-hover/paper:scale-105 transition-all shadow-sm`}>
                            <FileText size={12} className={`${theme.primary}`} />
                         </div>

                         <div className="bg-stone-50 group-hover/paper:bg-orange-50/50 rounded-r-xl rounded-bl-xl p-4 transition-colors">
                             <h4 className={`text-sm font-bold ${theme.textMain} leading-snug group-hover/paper:text-orange-900 transition-colors`}>
                                 {pub.title}
                             </h4>
                             <div className="flex items-center gap-2 mt-2">
                                 <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-white border border-stone-100 ${theme.textSecondary}`}>
                                     {pub.journal || "Paper"}
                                 </span>
                                 {pub.year && <span className="text-[10px] text-stone-400 font-medium">{pub.year}</span>}
                             </div>
                         </div>
                     </a>
                 ))}
             </div>
             
             <div className="mt-6 flex justify-end">
                 <a href="https://www.researchgate.net/profile/Vilde-Brecke" target="_blank" rel="noreferrer" className={`text-xs font-bold ${theme.primary} flex items-center gap-1 hover:gap-2 transition-all`}>
                     Se ResearchGate profil <ArrowRight size={12} />
                 </a>
             </div>
          </BentoItem>

          {/* UNIFIED TIMELINE & SKILLS (Combined Section) */}
          <BentoItem colSpan={layout.timeline.colSpan} rowSpan={layout.timeline.rowSpan} className={`bg-white ${theme.accentBorder}`} id="services">
             <div className="flex flex-col h-full">
                
                {/* 1. Skills Header / Cloud */}
                <div className="mb-8 border-b border-stone-100 pb-6">
                   <h3 className={`text-xs uppercase tracking-widest ${theme.textSecondary} mb-4 font-bold flex items-center gap-2`}>
                     <Award size={14} />
                     Kompetanse & Ferdigheter
                   </h3>
                   <div className="flex flex-wrap gap-2">
                      {content.skills.map((skill, idx) => (
                        <span key={idx} className={`text-xs font-semibold px-3 py-1.5 rounded-full ${theme.primaryBg} ${theme.primary} bg-opacity-30 border border-transparent`}>
                           {skill}
                        </span>
                      ))}
                   </div>
                </div>

                {/* 2. Unified Timeline */}
                <div className="flex-grow">
                   <h3 className={`text-xs uppercase tracking-widest ${theme.textSecondary} mb-6 font-bold flex items-center gap-2`}>
                    <Briefcase size={14} />
                    Progresjon
                   </h3>
                   <ul className="space-y-6 relative">
                    {/* Continuous vertical line */}
                    <div className="absolute left-[7px] top-2 bottom-2 w-[1px] bg-stone-200"></div>
                    
                    {timelineItems.map((item, idx) => (
                      <li key={idx} className="relative pl-8 group/item">
                        {/* Timeline Dot (Different color for Edu vs Exp) */}
                        <div className={`absolute left-[3px] top-1.5 w-[9px] h-[9px] rounded-full border-2 border-white transition-all z-10 ${item.type === 'education' ? 'bg-stone-800' : 'bg-orange-500'} group-hover/item:scale-125`}></div>
                        
                        <div className="flex flex-col">
                          <div className="flex justify-between items-start">
                             <h4 className={`font-bold ${theme.textMain} text-sm`}>{item.role}</h4>
                             {item.year && <span className="text-[10px] font-mono text-stone-400">{item.year}</span>}
                          </div>
                          <span className={`text-xs font-bold ${theme.primary} uppercase tracking-wide mt-0.5`}>{item.company}</span>
                          {item.description && (
                              <p className={`text-xs ${theme.textSecondary} mt-1 leading-relaxed opacity-80`}>
                                  {item.description}
                              </p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

             </div>
          </BentoItem>

        </BentoGrid>

        {/* NEURO ASSETS DECORATION */}
        <NeuroDecorations />

        {/* Footer */}
        <footer className={`max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-medium ${theme.textSecondary} opacity-60`}>
           <div className="flex items-center gap-2">
             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
             2026 © Vilde Brecke
           </div>
           <div className="flex gap-6">
             {sources.length > 0 && (
               <div className="flex gap-3 items-center bg-white px-4 py-2 rounded-full border border-stone-200">
                 <span className="text-xs font-bold uppercase tracking-wider">Kilder</span>
                 {sources.map((src, i) => (
                   <a key={i} href={src} target="_blank" className="hover:text-black transition-colors bg-stone-100 p-1.5 rounded-full"><ExternalLink size={12}/></a>
                 ))}
               </div>
             )}
             <span className="opacity-50 font-bold">NORGE</span>
           </div>
        </footer>
      </main>
    </div>
  );
};

export default App;