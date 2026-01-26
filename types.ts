
import React from 'react';

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
  background: string;
  textMain: string;
  textSecondary: string;
  primary: string;
  primaryBg: string;
  border: string;
  accentBorder: string;
  gradientFrom: string;
  gradientTo: string;
  buttonBg: string;
  buttonText: string;
  font?: string;
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
  timeline: SectionLayout;
}

export interface PortfolioContent {
  name: string;
  tagline: string;
  welcomeTitle: string;
  welcomeText: React.ComponentType | React.ReactNode; // Updated for Rich Text
  about: React.ComponentType | React.ReactNode; // Updated for Rich Text
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
