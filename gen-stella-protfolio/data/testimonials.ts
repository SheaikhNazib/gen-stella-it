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
    quote: 'Gen Stella turned a rough product brief into a polished platform our customers adopted immediately. Their team moved fast, asked the right questions, and made sound engineering decisions from day one.',
    author: 'R. Patel',
    title: 'CEO',
    company: 'Acme Corp',
    image: '',
    rating: 5,
  },
  {
    id: 't2',
    quote: 'What stood out was their ability to balance speed with discipline. We shipped core features ahead of schedule without creating the kind of technical debt that usually comes with fast delivery.',
    author: 'L. Mendes',
    title: 'Head of Product',
    company: 'BrightApps',
    image: '',
    rating: 5,
  },
  {
    id: 't3',
    quote: 'They felt like an embedded product and engineering partner rather than an outside vendor. Communication was sharp, execution was reliable, and every milestone came with clear business value.',
    author: 'N. Rahman',
    title: 'Operations Director',
    company: 'Northfield Logistics',
    image: '',
    rating: 5,
  },
  {
    id: 't4',
    quote: 'From design refinement to backend delivery, Gen Stella brought a level of ownership that materially improved our launch. The final product was faster, clearer, and more scalable than we initially planned.',
    author: 'S. Coleman',
    title: 'Founder',
    company: 'Atlas Health Systems',
    image: '',
    rating: 5,
  },
];
