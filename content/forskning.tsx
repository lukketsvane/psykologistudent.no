
import React from 'react';
import { BookOpen, FileText, ArrowRight } from 'lucide-react';

const PUBLICATIONS = [
  { title: "The thalamus and its subnuclei...", journal: "Translational Psychiatry", year: "2023", url: "#" },
  { title: "Exploring Glial Marker Activation...", journal: "Biological Psychiatry", year: "2024", url: "#" },
  { title: "BCBP: Treatment effects in OCD...", journal: "Diffusion Tensor Imaging", year: "2022", url: "#" },
];

export default function Forskning() {
  return (
    <div className="h-full flex flex-col">
       <div className="flex items-center justify-between mb-8">
           <h3 className="text-xs uppercase tracking-widest text-orange-700 font-bold flex items-center gap-2">
            <BookOpen size={14} />
            Forskning
           </h3>
           <span className="text-[10px] font-medium text-stone-400 uppercase tracking-widest">Utvalgt</span>
       </div>

       <div className="relative space-y-6 flex-grow">
           <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-orange-50"></div>
           
           {PUBLICATIONS.map((pub, i) => (
               <a href={pub.url} target="_blank" key={i} className="relative pl-10 flex flex-col group cursor-pointer">
                   <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-white border border-stone-100 flex items-center justify-center z-10 group-hover:scale-110 transition-transform shadow-sm">
                      <FileText size={12} className="text-orange-700" />
                   </div>

                   <div className="bg-stone-50 group-hover:bg-orange-50/50 rounded-r-xl rounded-bl-xl p-4 transition-colors">
                       <h4 className="text-sm font-bold text-stone-900 leading-snug group-hover:text-orange-900">
                           {pub.title}
                       </h4>
                       <div className="flex items-center gap-2 mt-2">
                           <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white border border-stone-100 text-stone-500">
                               {pub.journal}
                           </span>
                           {pub.year && <span className="text-[10px] text-stone-400 font-medium">{pub.year}</span>}
                       </div>
                   </div>
               </a>
           ))}
       </div>
       
       <div className="mt-4 flex justify-end">
           <a href="https://researchgate.net" target="_blank" className="text-xs font-bold text-orange-700 flex items-center gap-1 hover:gap-2 transition-all">
               Se ResearchGate <ArrowRight size={12} />
           </a>
       </div>
    </div>
  );
}
