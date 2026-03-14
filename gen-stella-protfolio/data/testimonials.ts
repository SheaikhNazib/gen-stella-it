/**
 * Testimonials Data
 * 
 * Client testimonials and reviews
 * TODO: Add client quotes, ratings, and company names
 */

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  title: string;
  company: string;
  image?: string;
  rating?: number;
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote: 'Gen Stella transformed our idea into a production-grade product — on time and on budget.',
    author: 'R. Patel',
    title: 'CEO',
    company: 'Acme Corp',
    image: '',
    rating: 5,
  },
  {
    id: 't2',
    quote: 'Fast, communicative, and pragmatic — the team became an extension of ours.',
    author: 'L. Mendes',
    title: 'Head of Product',
    company: 'BrightApps',
    image: '',
    rating: 5,
  },
];
