
import React from 'react';
import { SectionConfig } from '../types';
import { THEME } from './site';

// Import Content Components
import Hjem from './hjem';
import OmMeg from './om-meg';
import Kontakt from './kontakt';
import Forskning from './forskning';
import CV from './cv';

// Define the Grid Layout
export const SECTIONS: SectionConfig[] = [
  {
    id: 'home',
    component: <Hjem />,
    colSpan: 2,
    rowSpan: 1,
    className: `bg-gradient-to-br ${THEME.gradientFrom} ${THEME.gradientTo} text-white border-transparent flex flex-col justify-center`
  },
  {
    id: 'about',
    component: <OmMeg />,
    colSpan: 1,
    rowSpan: 1,
    className: 'overflow-hidden !p-0'
  },
  {
    id: 'contact',
    component: <Kontakt />,
    colSpan: 1,
    rowSpan: 1,
    className: '!bg-orange-600 text-white !p-0 overflow-hidden border-transparent'
  },
  {
    id: 'cv',
    component: <CV />,
    colSpan: 4,
    rowSpan: 2,
  },
  {
    id: 'research',
    component: <Forskning />,
    colSpan: 4,
    rowSpan: 1,
  }
];
