
import React from 'react';

export interface LinkItem {
  label: string;
  url: string;
  icon?: string;
}

export interface SectionConfig {
  id: string;
  component: React.ReactNode;
  colSpan: 1 | 2 | 3 | 4;
  rowSpan: 1 | 2 | 3;
  className?: string; // Allow overriding background colors etc
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

export interface SiteConfig {
  name: string;
  tagline: string;
  location: string;
  email: string;
  images: {
    portrait: string;
    action: string;
  };
}
