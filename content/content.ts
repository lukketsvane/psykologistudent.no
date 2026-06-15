import { parse as parseYaml } from 'yaml';
import rawContent from './content.md?raw';

export type SocialIcon = 'linkedin' | 'globe';
export type TimelineType = 'edu' | 'job';

export interface SiteContent {
  site: {
    name: string;
    tagline: string;
    location: string;
    email: string;
    images: {
      portrait: string;
      action: string;
    };
  };
  seo: {
    title: string;
    metaTitle: string;
    description: string;
    keywords: string;
    author: string;
    canonical: string;
    openGraph: {
      title: string;
      description: string;
      image: string;
    };
    twitter: {
      title: string;
      description: string;
      image: string;
    };
  };
  navigation: {
    home: string;
    about: string;
    research: string;
    contact: string;
  };
  home: {
    title: string;
    description: string;
    credentialTitle: string;
    credentialSubtitle: string;
  };
  about: {
    imageAlt: string;
    body: string[];
  };
  contact: {
    title: string;
    emailButton: string;
    reminderTitle: string;
    reminderFileName: string;
    calendarSummary: string;
    calendarDescription: string;
    socialLinks: Array<{
      label: string;
      url: string;
      icon: SocialIcon;
    }>;
  };
  cv: {
    skillsHeading: string;
    skills: string[];
    whyTitle: string;
    whyText: string;
    timelineHeading: string;
    timeline: Array<{
      role: string;
      company: string;
      year: string;
      description: string;
      type: TimelineType;
    }>;
  };
  research: {
    heading: string;
    label: string;
    linkLabel: string;
    linkUrl: string;
    publications: Array<{
      title: string;
      journal: string;
      year: string;
      url: string;
    }>;
  };
}

type UnknownRecord = Record<string, unknown>;

const frontmatterMatch = rawContent.match(/^---\r?\n([\s\S]*?)\r?\n---/);

if (!frontmatterMatch) {
  throw new Error('content/content.md must start with YAML frontmatter.');
}

const parsedContent = parseYaml(frontmatterMatch[1]) as unknown;

const isRecord = (value: unknown): value is UnknownRecord =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const requireRecord = (value: unknown, path: string): UnknownRecord => {
  if (!isRecord(value)) {
    throw new Error(`Missing or invalid object: ${path}`);
  }
  return value;
};

const requireString = (record: UnknownRecord, key: string, path: string): string => {
  const value = record[key];
  if (typeof value !== 'string' || value.length === 0) {
    throw new Error(`Missing or invalid text: ${path}.${key}`);
  }
  return value;
};

const requireStringArray = (record: UnknownRecord, key: string, path: string): string[] => {
  const value = record[key];
  if (!Array.isArray(value) || value.some((item) => typeof item !== 'string')) {
    throw new Error(`Missing or invalid text list: ${path}.${key}`);
  }
  return value;
};

const requireArray = (record: UnknownRecord, key: string, path: string): unknown[] => {
  const value = record[key];
  if (!Array.isArray(value)) {
    throw new Error(`Missing or invalid list: ${path}.${key}`);
  }
  return value;
};

const requireSocialIcon = (record: UnknownRecord, key: string, path: string): SocialIcon => {
  const value = requireString(record, key, path);
  if (value !== 'linkedin' && value !== 'globe') {
    throw new Error(`Invalid social icon: ${path}.${key}`);
  }
  return value;
};

const requireTimelineType = (record: UnknownRecord, key: string, path: string): TimelineType => {
  const value = requireString(record, key, path);
  if (value !== 'edu' && value !== 'job') {
    throw new Error(`Invalid timeline type: ${path}.${key}`);
  }
  return value;
};

const parseContent = (value: unknown): SiteContent => {
  const content = requireRecord(value, 'content');
  const site = requireRecord(content.site, 'site');
  const images = requireRecord(site.images, 'site.images');
  const seo = requireRecord(content.seo, 'seo');
  const openGraph = requireRecord(seo.openGraph, 'seo.openGraph');
  const twitter = requireRecord(seo.twitter, 'seo.twitter');
  const navigation = requireRecord(content.navigation, 'navigation');
  const home = requireRecord(content.home, 'home');
  const about = requireRecord(content.about, 'about');
  const contact = requireRecord(content.contact, 'contact');
  const cv = requireRecord(content.cv, 'cv');
  const research = requireRecord(content.research, 'research');

  return {
    site: {
      name: requireString(site, 'name', 'site'),
      tagline: requireString(site, 'tagline', 'site'),
      location: requireString(site, 'location', 'site'),
      email: requireString(site, 'email', 'site'),
      images: {
        portrait: requireString(images, 'portrait', 'site.images'),
        action: requireString(images, 'action', 'site.images'),
      },
    },
    seo: {
      title: requireString(seo, 'title', 'seo'),
      metaTitle: requireString(seo, 'metaTitle', 'seo'),
      description: requireString(seo, 'description', 'seo'),
      keywords: requireString(seo, 'keywords', 'seo'),
      author: requireString(seo, 'author', 'seo'),
      canonical: requireString(seo, 'canonical', 'seo'),
      openGraph: {
        title: requireString(openGraph, 'title', 'seo.openGraph'),
        description: requireString(openGraph, 'description', 'seo.openGraph'),
        image: requireString(openGraph, 'image', 'seo.openGraph'),
      },
      twitter: {
        title: requireString(twitter, 'title', 'seo.twitter'),
        description: requireString(twitter, 'description', 'seo.twitter'),
        image: requireString(twitter, 'image', 'seo.twitter'),
      },
    },
    navigation: {
      home: requireString(navigation, 'home', 'navigation'),
      about: requireString(navigation, 'about', 'navigation'),
      research: requireString(navigation, 'research', 'navigation'),
      contact: requireString(navigation, 'contact', 'navigation'),
    },
    home: {
      title: requireString(home, 'title', 'home'),
      description: requireString(home, 'description', 'home'),
      credentialTitle: requireString(home, 'credentialTitle', 'home'),
      credentialSubtitle: requireString(home, 'credentialSubtitle', 'home'),
    },
    about: {
      imageAlt: requireString(about, 'imageAlt', 'about'),
      body: requireStringArray(about, 'body', 'about'),
    },
    contact: {
      title: requireString(contact, 'title', 'contact'),
      emailButton: requireString(contact, 'emailButton', 'contact'),
      reminderTitle: requireString(contact, 'reminderTitle', 'contact'),
      reminderFileName: requireString(contact, 'reminderFileName', 'contact'),
      calendarSummary: requireString(contact, 'calendarSummary', 'contact'),
      calendarDescription: requireString(contact, 'calendarDescription', 'contact'),
      socialLinks: requireArray(contact, 'socialLinks', 'contact').map((item, index) => {
        const link = requireRecord(item, `contact.socialLinks[${index}]`);
        return {
          label: requireString(link, 'label', `contact.socialLinks[${index}]`),
          url: requireString(link, 'url', `contact.socialLinks[${index}]`),
          icon: requireSocialIcon(link, 'icon', `contact.socialLinks[${index}]`),
        };
      }),
    },
    cv: {
      skillsHeading: requireString(cv, 'skillsHeading', 'cv'),
      skills: requireStringArray(cv, 'skills', 'cv'),
      whyTitle: requireString(cv, 'whyTitle', 'cv'),
      whyText: requireString(cv, 'whyText', 'cv'),
      timelineHeading: requireString(cv, 'timelineHeading', 'cv'),
      timeline: requireArray(cv, 'timeline', 'cv').map((item, index) => {
        const entry = requireRecord(item, `cv.timeline[${index}]`);
        return {
          role: requireString(entry, 'role', `cv.timeline[${index}]`),
          company: requireString(entry, 'company', `cv.timeline[${index}]`),
          year: requireString(entry, 'year', `cv.timeline[${index}]`),
          description: requireString(entry, 'description', `cv.timeline[${index}]`),
          type: requireTimelineType(entry, 'type', `cv.timeline[${index}]`),
        };
      }),
    },
    research: {
      heading: requireString(research, 'heading', 'research'),
      label: requireString(research, 'label', 'research'),
      linkLabel: requireString(research, 'linkLabel', 'research'),
      linkUrl: requireString(research, 'linkUrl', 'research'),
      publications: requireArray(research, 'publications', 'research').map((item, index) => {
        const publication = requireRecord(item, `research.publications[${index}]`);
        return {
          title: requireString(publication, 'title', `research.publications[${index}]`),
          journal: requireString(publication, 'journal', `research.publications[${index}]`),
          year: requireString(publication, 'year', `research.publications[${index}]`),
          url: requireString(publication, 'url', `research.publications[${index}]`),
        };
      }),
    },
  };
};

export const CONTENT = parseContent(parsedContent);
