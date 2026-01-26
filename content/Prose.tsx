
import React from 'react';

interface ProseProps {
  children: React.ReactNode;
  className?: string;
}

export const Prose: React.FC<ProseProps> = ({ children, className = "" }) => {
  return (
    <div className={`
      prose prose-stone max-w-none
      prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-stone-900
      prose-h1:text-3xl prose-h1:mb-4
      prose-h2:text-2xl prose-h2:mb-3
      prose-h3:text-lg prose-h3:uppercase prose-h3:tracking-widest prose-h3:text-orange-700 prose-h3:mb-2
      prose-p:text-stone-600 prose-p:leading-relaxed prose-p:mb-4
      prose-a:text-orange-700 prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
      prose-strong:font-bold prose-strong:text-stone-800
      prose-ul:list-none prose-ul:pl-0 prose-ul:space-y-2
      ${className}
    `}>
      {children}
    </div>
  );
};
