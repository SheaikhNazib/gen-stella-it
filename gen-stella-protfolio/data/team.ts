/**
 * Team Data
 * 
 * Team members information
 * TODO: Add team member details, roles, images, social links
 */

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  expertise?: string[];
  bio: string;
  image: string;
  imagePositionX?: number;
  imagePositionY?: number;
  imageScale?: number;
  email?: string;
  twitter?: string;
  linkedin?: string;
  github?: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Alex Rivera',
    role: 'Founder, Product Engineer',
    expertise: ['Next.js', 'Product Strategy', 'UI Engineering'],
    bio: 'Leads product strategy and frontend engineering — builds delightful, performant UIs.',
    image: '/team/member-1.svg',
    imagePositionX: 50,
    imagePositionY: 40,
    imageScale: 1,
    email: '',
    twitter: '', linkedin: '', github: '',
  },
  {
    id: '2',
    name: 'Maya Khan',
    role: 'Backend Engineer, Platform Engineer',
    expertise: ['Node.js', 'PostgreSQL', 'API Design'],
    bio: 'Designs resilient APIs and services for scale and maintainability.',
    image: '/team/member-2.svg',
    imagePositionX: 50,
    imagePositionY: 45,
    imageScale: 1,
    email: '',
    twitter: '', linkedin: '', github: '',
  },
  {
    id: '3',
    name: 'Samir Das',
    role: 'Product Designer, UX Researcher',
    expertise: ['Design Systems', 'Figma', 'Interaction Design'],
    bio: 'Shapes UX, interaction, and product thinking that converts and retains users.',
    image: '/team/member-3.svg',
    imagePositionX: 50,
    imagePositionY: 45,
    imageScale: 1,
    email: '',
    twitter: '', linkedin: '', github: '',
  },
  {
    id: '4',
    name: 'Jordan Lee',
    role: 'DevOps Engineer, Cloud Engineer',
    expertise: ['AWS', 'CI/CD', 'Observability'],
    bio: 'Automates delivery, reliability, and cloud operations for fast iteration.',
    image: '/team/member-4.svg',
    imagePositionX: 50,
    imagePositionY: 45,
    imageScale: 1,
    email: '',
    twitter: '', linkedin: '', github: '',
  },
];
