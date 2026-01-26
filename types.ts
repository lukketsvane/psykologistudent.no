
export interface LinkItem {
  label: string;
  url: string;
  icon?: string;
}

export interface ExperienceItem {
  year?: string;
  role: string;
  company?: string;
  description?: string;
}

export interface PublicationItem {
  title: string;
  journal?: string;
  year?: string;
  url?: string;
  type?: string;
}

export interface ThemeConfig {
  background: string;       // e.g. "bg-[#fafaf9]"
  textMain: string;         // e.g. "text-stone-900"
  textSecondary: string;    // e.g. "text-stone-500"
  primary: string;          // e.g. "text-orange-700"
  primaryBg: string;        // e.g. "bg-orange-50"
  border: string;           // e.g. "border-stone-200"
  accentBorder: string;     // e.g. "hover:border-orange-400"
  gradientFrom: string;     // e.g. "from-orange-700"
  gradientTo: string;       // e.g. "to-amber-800"
  buttonBg: string;         // e.g. "bg-[#292524]"
  buttonText: string;       // e.g. "text-white"
  font?: string;            // e.g. "font-sans", "font-serif", "font-mono"
}

export interface SectionLayout {
  colSpan: 1 | 2 | 3 | 4;
  rowSpan: 1 | 2 | 3;
}

export interface LayoutConfig {
  welcome: SectionLayout;
  about: SectionLayout;
  contact: SectionLayout;
  research: SectionLayout;
  timeline: SectionLayout; // Unified section
}

export interface PortfolioContent {
  name: string;
  tagline: string;
  welcomeTitle: string;
  welcomeText: string;
  about: string;
  location: string;
  education: ExperienceItem[];
  experience: ExperienceItem[];
  publications: PublicationItem[];
  skills: string[]; 
  services: string[]; 
  email: string;
  socials: LinkItem[];
  images: {
    portrait: string;
    action: string;
  };
}

export interface SearchResult {
  content: PortfolioContent;
  layout: LayoutConfig;
  theme: ThemeConfig;
  sources: string[];
}
