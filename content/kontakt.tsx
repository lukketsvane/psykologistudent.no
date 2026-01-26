
import React from 'react';
import { PixelGame } from '../components/PixelGame';
import { SITE } from './site';
import { ArrowRight, Bell, Linkedin, Globe } from 'lucide-react';

export default function Kontakt() {
  
  const handleCreateReminder = () => {
    const event = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'BEGIN:VEVENT',
      'SUMMARY:Kontakt Vilde Brecke',
      'DESCRIPTION:Send mail til ' + SITE.email,
      `DTSTART:${new Date().toISOString().replace(/-|:|\.\d+/g, '')}`,
      `DTEND:${new Date(Date.now() + 3600000).toISOString().replace(/-|:|\.\d+/g, '')}`,
      'END:VEVENT', 'END:VCALENDAR'
    ].join('\n');
    const blob = new Blob([event], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Husk_Vilde.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col h-full w-full relative">
      
      {/* Pixel Game - Wide background */}
      <div className="absolute top-0 left-0 w-full h-full z-0 opacity-100">
         <PixelGame />
      </div>

      {/* Content Container - Overlay at the bottom */}
      <div className="flex flex-col justify-end h-full w-full px-6 pb-6 relative z-10 pt-40 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-2xl mx-auto bg-orange-600/80 backdrop-blur-md p-4 rounded-2xl border border-orange-500/50">
            {/* Header Row with Icons */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">Ta kontakt</h3>
                <div className="flex gap-2">
                    <a href="https://linkedin.com" target="_blank" className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all text-white">
                        <Linkedin size={16} />
                    </a>
                    <a href="https://researchgate.net" target="_blank" className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all text-white">
                        <Globe size={16} />
                    </a>
                </div>
            </div>
            
            {/* Actions */}
            <div className="flex items-center gap-2 w-full">
                <a 
                href={`mailto:${SITE.email}`} 
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-white text-orange-900 rounded-full font-bold text-sm hover:opacity-90 transition-opacity whitespace-nowrap"
                >
                Send e-post
                <ArrowRight className="w-4 h-4" />
                </a>
                <button 
                onClick={handleCreateReminder}
                title="Lag påminnelse"
                className="w-12 h-11 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors"
                >
                    <Bell size={20} className="text-white" />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}
