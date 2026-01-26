
import React, { useState } from 'react';
import { BentoGrid, BentoItem } from './components/BentoGrid';
import { SECTIONS } from './content/sections';
import { SITE, THEME } from './content/site';
import { NeuroDecorations } from './components/NeuroAssets';
import { Menu, X } from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen ${THEME.background} ${THEME.textMain} ${THEME.font || 'font-sans'} pb-20 transition-all duration-700 ease-in-out`}>
      
      {/* Navbar */}
      <nav className={`sticky top-0 z-50 ${THEME.background} border-b ${THEME.border} transition-colors duration-700 ease-in-out bg-opacity-90 backdrop-blur-sm`}>
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Brand */}
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => scrollToSection('home')}>
             <div className={`relative w-12 h-12 overflow-hidden rounded-full border-2 ${THEME.border} ${THEME.accentBorder} transition-colors`}>
                <img src={SITE.images.portrait} alt={SITE.name} className="w-full h-full object-cover" />
             </div>
             <div className="flex flex-col">
                <span className={`font-bold tracking-tight text-lg leading-none ${THEME.textMain}`}>{SITE.name}</span>
                <span className={`text-xs font-medium ${THEME.primary}`}>{SITE.tagline}</span>
             </div>
          </div>

          {/* Desktop Nav */}
          <div className={`hidden md:flex items-center gap-1 bg-white/50 p-1 rounded-full border ${THEME.border}`}>
            {['Hjem', 'Om meg', 'Forskning', 'Kontakt'].map((item, i) => {
               const map: Record<string, string> = { 'Hjem': 'home', 'Om meg': 'about', 'Forskning': 'research', 'Kontakt': 'contact' };
               return (
                <button 
                  key={i} 
                  onClick={() => scrollToSection(map[item])} 
                  className={`px-5 py-2 rounded-full text-sm font-medium ${THEME.textSecondary} hover:${THEME.primaryBg} hover:${THEME.primary} transition-all`}
                >
                  {item}
                </button>
               )
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className={`p-2 rounded-full hover:${THEME.primaryBg} transition-colors`}
              aria-label="Meny"
            >
              {isMenuOpen ? <X className={THEME.textMain} /> : <Menu className={THEME.textMain} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Overlay */}
        {isMenuOpen && (
           <div className={`md:hidden absolute top-20 left-0 w-full ${THEME.background} border-b ${THEME.border} p-4 flex flex-col gap-2 z-40 animate-in slide-in-from-top-2 duration-200`}>
              {['Hjem', 'Om meg', 'Forskning', 'Kontakt'].map((item, i) => {
               const map: Record<string, string> = { 'Hjem': 'home', 'Om meg': 'about', 'Forskning': 'research', 'Kontakt': 'contact' };
               return (
                <button 
                  key={i} 
                  onClick={() => scrollToSection(map[item])} 
                  className={`w-full text-left px-4 py-3 rounded-xl text-lg font-medium ${THEME.textSecondary} hover:${THEME.primaryBg} hover:${THEME.primary} transition-all`}
                >
                  {item}
                </button>
               )
            })}
           </div>
        )}
      </nav>

      <main className="pt-8 px-4" id="main-content">
        <BentoGrid>
          {SECTIONS.map((section) => (
            <BentoItem
              key={section.id}
              id={section.id}
              colSpan={section.colSpan}
              rowSpan={section.rowSpan}
              className={section.className}
            >
              {section.component}
            </BentoItem>
          ))}
        </BentoGrid>

        <NeuroDecorations />

        <footer className={`max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-medium ${THEME.textSecondary} opacity-60`}>
           <div className="flex items-center gap-2">
             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
             2026 © {SITE.name}
           </div>
           <div className="flex gap-6">
             <span className="opacity-50 fon ok t-bold">NORGE</span>
           </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
