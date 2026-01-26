
import { PortfolioContent, LayoutConfig, ThemeConfig } from './types';
import { Mail, Linkedin, Globe } from 'lucide-react';
import React from 'react';

export const INITIAL_CONTENT: PortfolioContent = {
  name: "Vilde Brecke",
  tagline: "Ph.d. i psykologi | Veileder",
  welcomeTitle: "Mestringsfølelse i psykologifaget",
  welcomeText: "Sliter du med å knekke koden på bacheloroppgaven, eller virker kvantitativ metode uoverkommelig? Jeg tilbyr skreddersydd veiledning for psykologistudenter i Bergen og på nett.",
  about: "Jeg er utdannet psykolog med doktorgrad (Ph.d.) i psykologi. Med bred erfaring som sensor og underviser ved universitetet, vet jeg nøyaktig hva som kreves for å gå fra en C til en A. Jeg brenner for å gjøre tungt fagstoff forståelig.",
  location: "Bergen, Norge",
  email: "vilde.brecke@gmail.com",
  education: [
    {
      role: "Ph.d. i psykologi",
      company: "Universitetet i Bergen (UiB)", 
      year: "2023-2026" 
    },
    {
      role: "Mastergrad i psykologi",
      company: "Universitetet i Bergen (UiB)",
      year: "2021"
    }
  ],
  experience: [
    {
      role: "Universitetslektor / Stipendiat",
      company: "UiB",
      description: "Undervisning i metode og statistikk."
    },
    {
      role: "Sensor",
      company: "Høyskolenivå",
      description: "Sensurering av bachelor- og masteroppgaver."
    },
    {
      role: "Privatunderviser",
      company: "Selvstendig",
      description: "En-til-en veiledning av studenter."
    }
  ],
  publications: [
    {
      title: "The thalamus and its subnuclei—a gateway to obsessive-compulsive disorder",
      journal: "Translational Psychiatry",
      url: "https://www.researchgate.net/profile/Vilde-Brecke",
      year: "2023"
    },
    {
      title: "Exploring Glial Marker Activation and Neuroinflammation in Schizophrenia: A multimodal Approach",
      journal: "Biological Psychiatry",
      url: "https://www.researchgate.net/profile/Vilde-Brecke",
      year: "2024"
    },
    {
      title: "BCBP: Treatment effects in OCD - a DTI study",
      journal: "Diffusion Tensor Imaging",
      url: "https://www.researchgate.net/profile/Vilde-Brecke",
      year: "2022"
    },
    {
      title: "Diffusion Tensor Imaging Before and 3 Months After Concentrated Exposure Response Prevention in Obsessive-Compulsive Disorder",
      journal: "Biological Psychiatry",
      url: "https://www.researchgate.net/profile/Vilde-Brecke",
      year: "2022"
    }
  ],
  skills: [
    "Kvantitativ metode (SPSS/R)",
    "Akademisk skriving (APA 7)",
    "Kvalitativ analyse",
    "Psykometri",
    "Undervisning",
    "Veiledning"
  ],
  services: [
    "Gjennomlesing av oppgaver",
    "Statistikkhjelp",
    "Eksamensdrilling"
  ],
  socials: [
    {
      label: "LinkedIn",
      url: "https://no.linkedin.com/in/vilde-brecke-149b5764",
      icon: "linkedin"
    },
    {
      label: "Tur",
      url: "https://www.kimkim.com/c/romantic-autumn-adventure-in-norways-arctic-9-days",
      icon: "globe"
    }
  ]
};

export const INITIAL_LAYOUT: LayoutConfig = {
  welcome: { colSpan: 2, rowSpan: 2 },
  contact: { colSpan: 1, rowSpan: 2 }, // Top Row, Right
  about: { colSpan: 1, rowSpan: 2 }, // Top Row, Middle Right
  research: { colSpan: 2, rowSpan: 2 }, // Bottom Left
  timeline: { colSpan: 2, rowSpan: 2 }, // Bottom Right - Unified Section
};

export const INITIAL_THEME: ThemeConfig = {
  background: "bg-[#fafaf9]", // Warm stone
  textMain: "text-stone-900",
  textSecondary: "text-stone-600",
  primary: "text-orange-700",
  primaryBg: "bg-orange-50",
  border: "border-stone-200",
  accentBorder: "hover:border-orange-300",
  gradientFrom: "from-orange-700",
  gradientTo: "to-amber-900",
  buttonBg: "bg-[#292524]",
  buttonText: "text-white",
  font: "font-sans"
};

export const ICON_MAP: Record<string, React.ReactNode> = {
  mail: <Mail size={20} />,
  linkedin: <Linkedin size={20} />,
  globe: <Globe size={20} />
};
