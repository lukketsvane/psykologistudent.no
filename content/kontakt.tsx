
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
      
      {/* Pixel Game - Adjusted height for square card */}
      <div className="absolute top-0 left-0 w-full h-28 z-0">
         <PixelGame />
      </div>

      {/* Content Container - Pushed down by padding */}
      <div className="flex flex-col justify-end h-full w-full px-6 pb-6 relative z-10 pt-32">
        
        {/* Header Row with Icons */}
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white shadow-sm">Ta kontakt</h3>
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
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-white text-orange-900 rounded-full font-bold text-sm hover:opacity-90 transition-opacity whitespace-nowrap shadow-lg"
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
  );
}
