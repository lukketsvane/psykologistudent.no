
import React from 'react';
import { Prose } from '../components/Prose';
import { SITE } from './site';

export default function OmMeg() {
  return (
    <div className="flex flex-col h-full">
      {/* Photo Area - Compact height for square tile */}
      <div className="h-40 w-full relative bg-stone-100 shrink-0 -mx-0 -mt-0 overflow-hidden">
          <img 
            src={SITE.images.action} 
            alt="Vilde Action" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
            <h2 className="text-xl font-bold text-white leading-tight">{SITE.name}</h2>
          </div>
      </div>

      <div className="flex-grow p-6 flex flex-col justify-center">
        <div className="inline-block self-start px-2 py-0.5 bg-orange-50 text-orange-700 rounded-full text-[10px] font-bold mb-3 uppercase tracking-wider border border-orange-100">
          {SITE.tagline}
        </div>
        
        <p className="text-sm text-stone-600 leading-relaxed font-medium">
            Erfaren veileder og sensor. Jeg hjelper deg å knekke koden fra <strong>C til A</strong>.
        </p>
      </div>
    </div>
  );
}
