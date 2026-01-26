
import { PortfolioContent, LayoutConfig, ThemeConfig } from './types';
import { Mail, Linkedin, Globe } from 'lucide-react';
import React from 'react';

// Content Imports
import { SITE_NAME, SITE_TAGLINE, SITE_LOCATION, IMAGES, INITIAL_THEME as THEME, INITIAL_LAYOUT as LAYOUT } from './content/site';
import { WELCOME_TITLE, WELCOME_TEXT } from './content/hjem';
import { ABOUT_TEXT } from './content/om-meg';
import { EMAIL, SOCIALS } from './content/kontakt';
import { EDUCATION, EXPERIENCE, SKILLS } from './content/cv';
import { PUBLICATIONS } from './content/forskning';
import { SERVICES } from './content/tjenester';

export const INITIAL_CONTENT: PortfolioContent = {
  name: SITE_NAME,
  tagline: SITE_TAGLINE,
  welcomeTitle: WELCOME_TITLE,
  welcomeText: WELCOME_TEXT.trim(),
  about: ABOUT_TEXT.trim(),
  location: SITE_LOCATION,
  email: EMAIL,
  images: IMAGES,
  education: EDUCATION,
  experience: EXPERIENCE,
  publications: PUBLICATIONS,
  skills: SKILLS,
  services: SERVICES,
  socials: SOCIALS
};

export const INITIAL_LAYOUT: LayoutConfig = LAYOUT;
export const INITIAL_THEME: ThemeConfig = THEME;

export const ICON_MAP: Record<string, React.ReactNode> = {
  mail: <Mail size={20} />,
  linkedin: <Linkedin size={20} />,
  globe: <Globe size={20} />
};
