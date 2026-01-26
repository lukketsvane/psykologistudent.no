
import React from 'react';
import { Award, Briefcase } from 'lucide-react';

// -- DATA --
const SKILLS = [
  "Kvantitativ metode (SPSS/R)", "Akademisk skriving", 
  "Kvalitativ analyse", "Psykometri", "Undervisning", "Veiledning"
];

const TIMELINE = [
  { role: "Universitetslektor", company: "UiB", year: "Nå", desc: "Undervisning i metode og statistikk", type: "job" },
  { role: "Ph.d. i psykologi", company: "UiB", year: "2023-26", type: "edu" },
  { role: "Sensor", company: "Høyskolenivå", desc: "Sensurering av bachelor/master", type: "job" },
  { role: "Mastergrad", company: "UiB", year: "2021", type: "edu" },
];

export default function CV() {
  return (
    <div className="flex flex-col h-full">
      
      {/* Skills Section */}
      <div className="mb-8 border-b border-stone-100 pb-6">
         <h3 className="text-xs uppercase tracking-widest text-stone-500 mb-4 font-bold flex items-center gap-2">
           <Award size={14} />
           Kompetanse
         </h3>
         <div className="flex flex-wrap gap-2">
            {SKILLS.map((skill, i) => (
              <span key={i} className="text-xs font-semibold px-3 py-1.5 rounded-full bg-orange-50 text-orange-700 bg-opacity-50">
                 {skill}
              </span>
            ))}
         </div>
      </div>

      {/* Timeline Section */}
      <div className="flex-grow">
         <h3 className="text-xs uppercase tracking-widest text-stone-500 mb-6 font-bold flex items-center gap-2">
          <Briefcase size={14} />
          Erfaring
         </h3>
         
         <ul className="space-y-6 relative">
          {/* Vertical Line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-[1px] bg-stone-200"></div>
          
          {TIMELINE.map((item, idx) => (
            <li key={idx} className="relative pl-8 group/item">
              <div className={`absolute left-[3px] top-1.5 w-[9px] h-[9px] rounded-full border-2 border-white z-10 
                  ${item.type === 'edu' ? 'bg-stone-800' : 'bg-orange-500'}`}>
              </div>
              
              <div className="flex flex-col">
                <div className="flex justify-between items-start">
                   <h4 className="font-bold text-stone-900 text-sm">{item.role}</h4>
                   {item.year && <span className="text-[10px] font-mono text-stone-400">{item.year}</span>}
                </div>
                <span className="text-xs font-bold text-orange-700 uppercase tracking-wide mt-0.5">{item.company}</span>
                {item.desc && (
                    <p className="text-xs text-stone-600 mt-1 leading-relaxed opacity-80">{item.desc}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}
