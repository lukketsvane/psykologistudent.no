
import React from 'react';
import { PixelGame } from '../components/PixelGame';
import { SITE } from './site';
import { ArrowRight, Bell, Linkedin, Globe, ExternalLink } from 'lucide-react';

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
    <div className="flex flex-col h-full justify-between items-center text-center w-full">
      
      {/* Pixel Game - Now just a standard component import! */}
      <div className="w-[calc(100%+4rem)] -mt-8 -mx-8">
         <PixelGame />
      </div>

      <div className="flex flex-col items-center w-full px-2 pb-2">
        <h3 className="text-xl font-bold mb-4">Ta kontakt</h3>
        
        <div className="flex items-center justify-center gap-2 w-full">
            <a 
              href={`mailto:${SITE.email}`} 
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-orange-900 rounded-full font-bold text-sm hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              Send e-post
              <ArrowRight className="w-4 h-4" />
            </a>
            <button 
             onClick={handleCreateReminder}
             title="Lag påminnelse"
             className="w-12 h-11 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            >
                <Bell size={20} className="text-white" />
            </button>
        </div>
        
        <div className="flex gap-2 mt-8">
           <a href="https://linkedin.com" target="_blank" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20">
             <Linkedin size={18} />
           </a>
           <a href="https://kimkim.com" target="_blank" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20">
             <Globe size={18} />
           </a>
        </div>
      </div>
    </div>
  );
}
