
import React from 'react';
import { Award, Briefcase, GraduationCap } from 'lucide-react';

// -- DATA --
const SKILLS = [
  "Kvantitativ metode", "SPSS", "R-Studio", 
  "Akademisk skriving", "Kvalitativ analyse", 
  "Psykometri", "Forskningsformidling", 
  "Undervisning", "Veiledning", "Nevropsykologi"
];

const TIMELINE = [
  { 
      role: "Ph.d.-stipendiat i psykologi", 
      company: "Universitetet i Bergen (UiB)", 
      year: "2023 - Nå", 
      desc: "Forsker på nevrobiologiske mekanismer ved tvangslidelse (OCD). Underviser i metode og statistikk.",
      type: "edu" 
  },
  { 
      role: "Universitetslektor", 
      company: "UiB / Institutt for klinisk psykologi", 
      year: "2022 - 2023", 
      desc: "Emneansvarlig for bacheloroppgaven. Veiledning av studenter i akademisk skriving og metode.",
      type: "job" 
  },
  { 
      role: "Privatist-veileder", 
      company: "Frilans", 
      year: "2021 - Nå", 
      desc: "Hjelper psykologistudenter med å mestre statistikk og metodefag. Skreddersydd en-til-en oppfølging.",
      type: "job" 
  },
  { 
      role: "Sensor", 
      company: "Høyskolenivå", 
      year: "2021 - Nå", 
      desc: "Ekstern sensor på bachelor- og masternivå. Vurdering av oppgaver innen klinisk, personlighets- og sosialpsykologi.",
      type: "job" 
  },
  { 
      role: "Mastergrad i psykologi", 
      company: "Universitetet i Bergen", 
      year: "2021", 
      desc: "Fordypning i adferdsnevrovitenskap. Karakter A på masteroppgave.",
      type: "edu" 
  },
];

export default function CV() {
  return (
    <div className="flex flex-col md:flex-row h-full gap-8">
      
      {/* Left Column: Intro & Skills */}
      <div className="md:w-1/3 flex flex-col gap-8">
          <div>
            <h3 className="text-xs uppercase tracking-widest text-stone-500 mb-4 font-bold flex items-center gap-2">
            <Award size={14} />
            Kompetanse
            </h3>
            <div className="flex flex-wrap gap-2">
                {SKILLS.map((skill, i) => (
                <span key={i} className="text-xs font-semibold px-3 py-1.5 rounded-full bg-orange-50 text-orange-700 border border-orange-100">
                    {skill}
                </span>
                ))}
            </div>
          </div>
          
          <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100">
             <h4 className="font-bold text-stone-900 mb-2">Hvorfor velge meg?</h4>
             <p className="text-sm text-stone-600 leading-relaxed">
               Som sensor vet jeg hva som skiller en god oppgave fra en fremragende. Jeg kombinerer dyp fagkunnskap med en pedagogisk tilnærming som gir deg mestringsfølelse.
             </p>
          </div>
      </div>

      {/* Right Column: Timeline */}
      <div className="md:w-2/3">
         <h3 className="text-xs uppercase tracking-widest text-stone-500 mb-6 font-bold flex items-center gap-2">
          <Briefcase size={14} />
          Erfaring & Utdanning
         </h3>
         
         <ul className="space-y-0 relative border-l border-stone-200 ml-3">
          {TIMELINE.map((item, idx) => (
            <li key={idx} className="relative pl-8 pb-8 last:pb-0 group">
              <div className={`absolute -left-[5px] top-1.5 w-[11px] h-[11px] rounded-full border-2 border-white z-10 transition-colors
                  ${item.type === 'edu' ? 'bg-stone-700 group-hover:bg-stone-900' : 'bg-orange-500 group-hover:bg-orange-600'}`}>
              </div>
              
              <div className="flex flex-col">
                <div className="flex flex-wrap justify-between items-baseline gap-2">
                   <h4 className="font-bold text-stone-900 text-base">{item.role}</h4>
                   <span className="text-xs font-mono font-medium text-stone-400 bg-stone-50 px-2 py-0.5 rounded">{item.year}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                    {item.type === 'edu' && <GraduationCap size={12} className="text-stone-400"/>}
                    <span className="text-xs font-bold text-orange-700 uppercase tracking-wide">{item.company}</span>
                </div>
                <p className="text-sm text-stone-600 leading-relaxed opacity-90 max-w-xl">
                    {item.desc}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}
