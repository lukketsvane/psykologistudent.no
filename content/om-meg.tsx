
import React from 'react';
import { Prose } from '../components/Prose';
import { SITE } from './site';

export default function OmMeg() {
  return (
    <div className="flex flex-col h-full justify-between">
      {/* Photo Area */}
      <div className="h-56 w-full relative bg-stone-100 shrink-0 -mx-8 -mt-8 mb-6 overflow-hidden">
          <img 
            src={SITE.images.action} 
            alt="Vilde Action" 
            className="w-full h-full object-cover"
          />
      </div>

      <div className="flex-grow">
        <h2 className="text-2xl font-bold text-stone-900 leading-tight">{SITE.name}</h2>
        
        <div className="inline-block px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-xs font-bold my-3">
          {SITE.tagline}
        </div>
        
        <Prose className="text-sm">
          <p>
            Jeg er utdannet psykolog med doktorgrad (Ph.d.) i psykologi.
          </p>
          <p>
            Med bred erfaring som sensor og underviser ved universitetet, vet jeg nøyaktig hva som kreves for å gå fra en <strong>C til en A</strong>.
          </p>
          <p>
            Jeg brenner for å gjøre tungt fagstoff forståelig.
          </p>
        </Prose>
      </div>
    </div>
  );
}
