
import React from 'react';
import { Prose } from '../components/Prose';
import { GraduationCap } from 'lucide-react';

export default function Hjem() {
  return (
    <div className="space-y-6 relative z-10">
      <span className="inline-block px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-xs font-bold tracking-wider uppercase opacity-90">
        👋 Hei student!
      </span>
      
      <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.15]">
        Mestringsfølelse i psykologifaget
      </h1>

      <div className="opacity-90 leading-relaxed text-lg font-medium max-w-md">
        <p>
          Sliter du med å knekke koden på bacheloroppgaven, eller virker kvantitativ metode uoverkommelig?
        </p>
        <p>
          Jeg tilbyr <strong>skreddersydd veiledning</strong> for psykologistudenter i Bergen og på nett.
        </p>
      </div>

      <div className="pt-6 border-t border-white/20 flex items-center gap-4">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-orange-700">
            <GraduationCap size={24} />
        </div>
        <div>
          <p className="font-bold text-white">Jeg hjelper deg i mål</p>
          <p className="opacity-70 text-sm">Med faglig trygghet</p>
        </div>
      </div>
    </div>
  );
}
