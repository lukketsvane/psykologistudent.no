
import React from 'react';
import { SITE } from './site';

export default function OmMeg() {
  return (
    <div className="flex flex-col h-full w-full bg-white">
      {/* Photo Area - Reduced height to allow more space for text */}
      <div className="h-32 w-full relative bg-stone-100 shrink-0 overflow-hidden group">
          <img 
            src={SITE.images.action} 
            alt="Vilde Action" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Subtle gradient overlay for better integration */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="flex-grow p-5 flex flex-col">
        <div className="flex flex-col mb-3">
            <h2 className="text-xl font-bold text-stone-900 leading-none mb-1">{SITE.name}</h2>
            <div className="inline-block self-start px-2 py-0.5 bg-orange-50 text-orange-700 rounded text-[10px] font-bold uppercase tracking-wider border border-orange-100">
            {SITE.tagline}
            </div>
        </div>
        
        <div className="text-xs text-stone-600 leading-relaxed font-medium space-y-2 overflow-y-auto pr-1 hide-scrollbar">
           <p>
            Jeg er utdannet psykolog med doktorgrad (Ph.d.) i psykologi. 
           </p>
           <p>
            Med bred erfaring som sensor og underviser ved universitetet, vet jeg nøyaktig hva som kreves for å gå fra en <strong>C til en A</strong>.
           </p>
           <p>
            Jeg brenner for å gjøre tungt fagstoff forståelig.
           </p>
        </div>
      </div>
    </div>
  );
}
