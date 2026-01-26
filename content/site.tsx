
import { SiteConfig, ThemeConfig } from '../types';

export const SITE: SiteConfig = {
  name: "Vilde Brecke",
  tagline: "Ph.d. i psykologi | Veileder",
  location: "Bergen, Norge",
  email: "vilde.brecke@gmail.com",
  images: {
    portrait: "https://i.ibb.co/dstnXYsg/IMG-8537.jpg",
    action: "https://i.ibb.co/whVp9Th4/IMG-8539.jpg"
  }
};

export const THEME: ThemeConfig = {
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
