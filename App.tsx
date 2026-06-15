import React, { useEffect, useState } from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';
import {
  ArrowRight,
  Award,
  Bell,
  BookOpen,
  Briefcase,
  FileText,
  Globe,
  GraduationCap,
  Linkedin,
  Menu,
  X,
} from 'lucide-react';
import { BentoGrid, BentoItem } from './components/BentoGrid';
import { NeuroDecorations } from './components/NeuroAssets';
import { PixelGame } from './components/PixelGame';
import { CONTENT, type SocialIcon } from './content/content';

const THEME = {
  background: 'bg-[#fafaf9]',
  textMain: 'text-stone-900',
  textSecondary: 'text-stone-600',
  primary: 'text-orange-700',
  primaryBg: 'bg-orange-50',
  border: 'border-stone-200',
  accentBorder: 'hover:border-orange-300',
  gradientFrom: 'from-orange-700',
  gradientTo: 'to-amber-900',
  font: 'font-sans',
} as const;

const NAV_ITEMS = [
  { key: 'home', target: 'home' },
  { key: 'about', target: 'about' },
  { key: 'research', target: 'research' },
  { key: 'contact', target: 'contact' },
] as const;

const markdownComponents: Components = {
  p: ({ children }) => <>{children}</>,
  strong: ({ children }) => <strong className="font-bold">{children}</strong>,
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noreferrer" className="underline underline-offset-2 decoration-2 hover:opacity-70 transition-opacity">
      {children}
    </a>
  ),
};

const SOCIAL_ICONS: Record<SocialIcon, typeof Linkedin> = {
  linkedin: Linkedin,
  globe: Globe,
};

type SectionLayout = {
  id: string;
  component: React.ReactNode;
  colSpan: 1 | 2 | 3 | 4;
  rowSpan: 1 | 2 | 3;
  className?: string;
};

const MarkdownInline = ({ children }: { children: string }) => (
  <ReactMarkdown components={markdownComponents}>{children}</ReactMarkdown>
);

const syncMetadata = () => {
  document.title = CONTENT.seo.title;

  const setMeta = (selector: string, value: string) => {
    document.querySelector<HTMLMetaElement>(selector)?.setAttribute('content', value);
  };

  setMeta('meta[name="title"]', CONTENT.seo.metaTitle);
  setMeta('meta[name="description"]', CONTENT.seo.description);
  setMeta('meta[name="keywords"]', CONTENT.seo.keywords);
  setMeta('meta[name="author"]', CONTENT.seo.author);
  setMeta('meta[property="og:title"]', CONTENT.seo.openGraph.title);
  setMeta('meta[property="og:description"]', CONTENT.seo.openGraph.description);
  setMeta('meta[property="og:image"]', CONTENT.seo.openGraph.image);
  setMeta('meta[property="twitter:title"]', CONTENT.seo.twitter.title);
  setMeta('meta[property="twitter:description"]', CONTENT.seo.twitter.description);
  setMeta('meta[property="twitter:image"]', CONTENT.seo.twitter.image);
  document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute('href', CONTENT.seo.canonical);
};

const HomeSection = () => (
  <div className="flex flex-row items-center gap-8 h-full">
    <div className="flex-1 space-y-4 relative z-10">
      <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight leading-[1.1] text-balance">
        {CONTENT.home.title}
      </h1>

      <p className="opacity-90 leading-relaxed text-sm md:text-base font-medium max-w-sm text-balance">
        <MarkdownInline>{CONTENT.home.description}</MarkdownInline>
      </p>

      <div className="flex flex-wrap items-center gap-3 pt-1">
        <a
          href={`mailto:${CONTENT.site.email}`}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-orange-900 rounded-full font-bold text-sm hover:opacity-90 transition-opacity"
        >
          {CONTENT.contact.emailButton}
          <ArrowRight className="w-4 h-4" />
        </a>

        <span className="inline-flex md:hidden items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full border border-white/15 backdrop-blur-sm">
          <GraduationCap size={16} className="text-white shrink-0" />
          <span className="leading-tight text-left">
            <span className="block font-bold text-white text-xs">{CONTENT.home.credentialTitle}</span>
            <span className="block opacity-70 text-[10px]">{CONTENT.home.credentialSubtitle}</span>
          </span>
        </span>
      </div>
    </div>

    <div className="hidden md:flex flex-col items-center justify-center gap-3 p-4 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-sm">
      <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-orange-700">
        <GraduationCap size={28} />
      </div>
      <div className="text-center">
        <p className="font-bold text-white text-sm">{CONTENT.home.credentialTitle}</p>
        <p className="opacity-70 text-xs">{CONTENT.home.credentialSubtitle}</p>
      </div>
    </div>
  </div>
);

const AboutSection = () => (
  <div className="flex flex-col h-full w-full bg-white">
    <div className="h-32 w-full relative bg-stone-100 shrink-0 overflow-hidden group">
      <img
        src={CONTENT.site.images.action}
        alt={CONTENT.about.imageAlt}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
    </div>

    <div className="flex-grow p-5 flex flex-col">
      <div className="flex flex-col mb-3">
        <h2 className="text-xl font-bold text-stone-900 leading-none mb-1">{CONTENT.site.name}</h2>
        <div className="inline-block self-start px-2 py-0.5 bg-orange-50 text-orange-700 rounded text-[10px] font-bold uppercase tracking-wider border border-orange-100">
          {CONTENT.site.tagline}
        </div>
      </div>

      <div className="text-xs text-stone-600 leading-relaxed font-medium space-y-2 overflow-y-auto pr-1 hide-scrollbar">
        {CONTENT.about.body.map((paragraph) => (
          <p key={paragraph}>
            <MarkdownInline>{paragraph}</MarkdownInline>
          </p>
        ))}
      </div>
    </div>
  </div>
);

const ContactSection = () => {
  const handleCreateReminder = () => {
    const description = CONTENT.contact.calendarDescription.replace('{email}', CONTENT.site.email);
    const event = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `SUMMARY:${CONTENT.contact.calendarSummary}`,
      `DESCRIPTION:${description}`,
      `DTSTART:${new Date().toISOString().replace(/-|:|\.\d+/g, '')}`,
      `DTEND:${new Date(Date.now() + 3600000).toISOString().replace(/-|:|\.\d+/g, '')}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\n');
    const blob = new Blob([event], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', CONTENT.contact.reminderFileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col h-full w-full relative">
      <div className="absolute top-0 left-0 w-full h-full z-0 opacity-100">
        <PixelGame />
      </div>

      <div className="flex flex-col justify-end h-full w-full px-6 pb-6 relative z-10 pt-40 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-2xl mx-auto bg-orange-600/80 backdrop-blur-md p-4 rounded-2xl border border-orange-500/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">{CONTENT.contact.title}</h3>
            <div className="flex gap-2">
              {CONTENT.contact.socialLinks.map((link) => {
                const Icon = SOCIAL_ICONS[link.icon];
                return (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    title={link.label}
                    aria-label={link.label}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all text-white"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-2 w-full">
            <a
              href={`mailto:${CONTENT.site.email}`}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-white text-orange-900 rounded-full font-bold text-sm hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              {CONTENT.contact.emailButton}
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={handleCreateReminder}
              title={CONTENT.contact.reminderTitle}
              aria-label={CONTENT.contact.reminderTitle}
              className="w-12 h-11 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors"
            >
              <Bell size={20} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CvSection = () => (
  <div className="flex flex-col md:flex-row h-full gap-8">
    <div className="md:w-1/3 flex flex-col gap-8">
      <div>
        <h3 className="text-xs uppercase tracking-widest text-stone-500 mb-4 font-bold flex items-center gap-2">
          <Award size={14} />
          {CONTENT.cv.skillsHeading}
        </h3>
        <div className="flex flex-wrap gap-2">
          {CONTENT.cv.skills.map((skill) => (
            <span key={skill} className="text-xs font-semibold px-3 py-1.5 rounded-full bg-orange-50 text-orange-700 border border-orange-100">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100">
        <h4 className="font-bold text-stone-900 mb-2">{CONTENT.cv.whyTitle}</h4>
        <p className="text-sm text-stone-600 leading-relaxed">
          <MarkdownInline>{CONTENT.cv.whyText}</MarkdownInline>
        </p>
      </div>
    </div>

    <div className="md:w-2/3">
      <h3 className="text-xs uppercase tracking-widest text-stone-500 mb-6 font-bold flex items-center gap-2">
        <Briefcase size={14} />
        {CONTENT.cv.timelineHeading}
      </h3>

      <ul className="space-y-0 relative border-l border-stone-200 ml-3">
        {CONTENT.cv.timeline.map((item) => (
          <li key={`${item.role}-${item.year}`} className="relative pl-8 pb-8 last:pb-0 group">
            <div className={`absolute -left-[5px] top-1.5 w-[11px] h-[11px] rounded-full border-2 border-white z-10 transition-colors
              ${item.type === 'edu' ? 'bg-stone-700 group-hover:bg-stone-900' : 'bg-orange-500 group-hover:bg-orange-600'}`}>
            </div>

            <div className="flex flex-col">
              <div className="flex flex-wrap justify-between items-baseline gap-2">
                <h4 className="font-bold text-stone-900 text-base">{item.role}</h4>
                <span className="text-xs font-mono font-medium text-stone-400 bg-stone-50 px-2 py-0.5 rounded">{item.year}</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-orange-700 uppercase tracking-wide">{item.company}</span>
              </div>
              <p className="text-sm text-stone-600 leading-relaxed opacity-90 max-w-xl">
                <MarkdownInline>{item.description}</MarkdownInline>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const ResearchSection = () => (
  <div className="h-full flex flex-col">
    <div className="flex items-center justify-between mb-8">
      <h3 className="text-xs uppercase tracking-widest text-orange-700 font-bold flex items-center gap-2">
        <BookOpen size={14} />
        {CONTENT.research.heading}
      </h3>
      <span className="text-[10px] font-medium text-stone-400 uppercase tracking-widest">{CONTENT.research.label}</span>
    </div>

    <div className="relative space-y-6 flex-grow">
      <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-orange-50"></div>

      {CONTENT.research.publications.map((publication) => (
        <a href={publication.url} target="_blank" rel="noreferrer" key={`${publication.title}-${publication.year}`} className="relative pl-10 flex flex-col group cursor-pointer">
          <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-white border border-stone-100 flex items-center justify-center z-10 group-hover:scale-110 transition-transform">
            <FileText size={12} className="text-orange-700" />
          </div>

          <div className="bg-stone-50 group-hover:bg-orange-50/50 rounded-r-xl rounded-bl-xl p-4 transition-colors">
            <h4 className="text-sm font-bold text-stone-900 leading-snug group-hover:text-orange-900 whitespace-normal break-words">
              {publication.title}
            </h4>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white border border-stone-100 text-stone-500">
                {publication.journal}
              </span>
              {publication.year && <span className="text-[10px] text-stone-400 font-medium">{publication.year}</span>}
            </div>
          </div>
        </a>
      ))}
    </div>

    <div className="mt-4 flex justify-end">
      <a href={CONTENT.research.linkUrl} target="_blank" rel="noreferrer" className="text-xs font-bold text-orange-700 flex items-center gap-1 hover:gap-2 transition-all">
        {CONTENT.research.linkLabel} <ArrowRight size={12} />
      </a>
    </div>
  </div>
);

const SECTIONS: SectionLayout[] = [
  {
    id: 'home',
    component: <HomeSection />,
    colSpan: 2,
    rowSpan: 1,
    className: `bg-gradient-to-br ${THEME.gradientFrom} ${THEME.gradientTo} text-white border-transparent flex flex-col justify-center order-4 md:order-none`,
  },
  {
    id: 'about',
    component: <AboutSection />,
    colSpan: 2,
    rowSpan: 1,
    className: 'overflow-hidden !p-0 order-1 md:order-none',
  },
  {
    id: 'contact',
    component: <ContactSection />,
    colSpan: 4,
    rowSpan: 1,
    className: '!bg-orange-600 text-white !p-0 overflow-hidden border-transparent order-5 md:order-none',
  },
  {
    id: 'cv',
    component: <CvSection />,
    colSpan: 4,
    rowSpan: 2,
    className: 'order-2 md:order-none',
  },
  {
    id: 'research',
    component: <ResearchSection />,
    colSpan: 4,
    rowSpan: 1,
    className: 'order-3 md:order-none',
  },
];

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(syncMetadata, []);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderNavButton = (item: (typeof NAV_ITEMS)[number], mobile = false) => (
    <button
      key={item.key}
      onClick={() => scrollToSection(item.target)}
      className={mobile
        ? `w-full text-left px-4 py-3 rounded-xl text-lg font-medium ${THEME.textSecondary} hover:${THEME.primaryBg} hover:${THEME.primary} transition-all`
        : `px-5 py-2 rounded-full text-sm font-medium ${THEME.textSecondary} hover:${THEME.primaryBg} hover:${THEME.primary} transition-all`}
    >
      {CONTENT.navigation[item.key]}
    </button>
  );

  return (
    <div className={`min-h-screen ${THEME.background} ${THEME.textMain} ${THEME.font} pb-20 transition-all duration-700 ease-in-out`}>
      <nav className={`sticky top-0 z-50 ${THEME.background} border-b ${THEME.border} transition-colors duration-700 ease-in-out bg-opacity-90 backdrop-blur-sm`}>
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => scrollToSection('home')}>
            <div className={`relative w-12 h-12 overflow-hidden rounded-full border-2 ${THEME.border} ${THEME.accentBorder} transition-colors`}>
              <img src={CONTENT.site.images.portrait} alt={CONTENT.site.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className={`font-bold tracking-tight text-lg leading-none ${THEME.textMain}`}>{CONTENT.site.name}</span>
              <span className={`text-xs font-medium ${THEME.primary}`}>{CONTENT.site.tagline}</span>
            </div>
          </div>

          <div className={`hidden md:flex items-center gap-1 bg-white/50 p-1 rounded-full border ${THEME.border}`}>
            {NAV_ITEMS.map((item) => renderNavButton(item))}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-full hover:${THEME.primaryBg} transition-colors`}
              aria-label="Meny"
            >
              {isMenuOpen ? <X className={THEME.textMain} /> : <Menu className={THEME.textMain} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className={`md:hidden absolute top-20 left-0 w-full ${THEME.background} border-b ${THEME.border} p-4 flex flex-col gap-2 z-40 animate-in slide-in-from-top-2 duration-200`}>
            {NAV_ITEMS.map((item) => renderNavButton(item, true))}
          </div>
        )}
      </nav>

      <main className="pt-8 px-4" id="main-content">
        <BentoGrid>
          {SECTIONS.map((section) => (
            <BentoItem
              key={section.id}
              id={section.id}
              colSpan={section.colSpan}
              rowSpan={section.rowSpan}
              className={section.className}
            >
              {section.component}
            </BentoItem>
          ))}
        </BentoGrid>

        <NeuroDecorations />
      </main>
    </div>
  );
};

export default App;
