
import React from 'react';
import { GraduationCap } from 'lucide-react';

export default function Hjem() {
  return (
    <div className="flex flex-row items-center gap-8 h-full">
        <div className="flex-1 space-y-4 relative z-10">
            <span className="inline-block px-3 py-1 bg-white/10 border border-white/20 rounded-full text-[10px] font-bold tracking-wider uppercase opacity-90">
                👋 Hei student!
            </span>
            
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight leading-[1.1] text-balance">
                Mestringsfølelse i psykologifaget
            </h1>

            <p className="opacity-90 leading-relaxed text-sm md:text-base font-medium max-w-sm text-balance">
                Sliter du med metodedelen? Jeg tilbyr <strong>skreddersydd veiledning</strong> for å sikre toppkarakteren.
            </p>
        </div>

        <div className="hidden md:flex flex-col items-center justify-center gap-3 p-4 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-sm">
             <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-orange-700 shadow-xl">
                <GraduationCap size={28} />
             </div>
             <div className="text-center">
                <p className="font-bold text-white text-sm">Faglig trygghet</p>
                <p className="opacity-70 text-xs">Ph.d. nivå</p>
             </div>
        </div>
    </div>
  );
}
