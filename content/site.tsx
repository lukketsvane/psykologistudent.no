
import { ThemeConfig, LayoutConfig } from '../types';

export const SITE_NAME = "Vilde Brecke";
export const SITE_TAGLINE = "Ph.d. i psykologi | Veileder";
export const SITE_LOCATION = "Bergen, Norge";

export const IMAGES = {
  portrait: "https://i.ibb.co/dstnXYsg/IMG-8537.jpg",
  action: "https://i.ibb.co/whVp9Th4/IMG-8539.jpg"
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

export const INITIAL_LAYOUT: LayoutConfig = {
  welcome: { colSpan: 2, rowSpan: 2 },
  contact: { colSpan: 1, rowSpan: 2 }, // Top Row, Right
  about: { colSpan: 1, rowSpan: 2 }, // Top Row, Middle Right
  research: { colSpan: 2, rowSpan: 2 }, // Bottom Left
  timeline: { colSpan: 2, rowSpan: 2 }, // Bottom Right - Unified Section
};
