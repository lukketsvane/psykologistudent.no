import React from 'react';

interface SimpleMarkdownProps {
  content: string;
  className?: string;
}

export const SimpleMarkdown: React.FC<SimpleMarkdownProps> = ({ content, className = "" }) => {
  if (!content) return null;

  // Split content into paragraphs by double newlines
  const paragraphs = content.split(/\n\s*\n/);

  return (
    <div className={`space-y-4 ${className}`}>
      {paragraphs.map((paragraph, index) => {
        // Handle Headers
        if (paragraph.trim().startsWith('# ')) {
          return <h3 key={index} className="text-2xl font-bold mb-2 text-inherit">{paragraph.replace('# ', '')}</h3>;
        }
        if (paragraph.trim().startsWith('## ')) {
          return <h4 key={index} className="text-xl font-bold mb-2 text-inherit">{paragraph.replace('## ', '')}</h4>;
        }

        // Split paragraph by bold markers (**text**) and links ([text](url))
        // The regex captures the delimiters so we can process them
        const parts = paragraph.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);
        
        return (
          <p key={index} className="leading-relaxed opacity-90">
            {parts.map((part, i) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={i} className="font-bold">{part.slice(2, -2)}</strong>;
              }
              if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
                const match = part.match(/\[(.*?)\]\((.*?)\)/);
                if (match) {
                    const [, label, url] = match;
                    return (
                        <a key={i} href={url} target="_blank" rel="noreferrer" className="underline underline-offset-2 decoration-2 hover:opacity-70 transition-opacity">
                            {label}
                        </a>
                    );
                }
              }
              return part;
            })}
          </p>
        );
      })}
    </div>
  );
};