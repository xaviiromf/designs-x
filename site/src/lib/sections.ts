export const SECTIONS = ['hero', 'features', 'pricing', 'testimonials', 'process', 'cta', 'footer', 'portfolio', 'crud', 'nav', 'story', 'gallery', 'faq', 'contact', 'team'] as const;
export type Section = (typeof SECTIONS)[number];
export const SECTION_NAMES: Record<Section, string> = {
  hero: 'Hero',
  features: 'Features',
  pricing: 'Pricing',
  testimonials: 'Testimonials',
  process: 'Process',
  cta: 'Call to action',
  footer: 'Footer',
  portfolio: 'Portfolio',
  crud: 'CRUD',
  nav: 'Navigation',
  story: 'Scroll story',
  gallery: 'Gallery',
  faq: 'FAQ',
  contact: 'Contact',
  team: 'Team',
};
