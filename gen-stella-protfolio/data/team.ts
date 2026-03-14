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
  bio: string;
  image: string;
  email?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Alex Rivera',
    role: 'Founder · Product Engineering',
    bio: 'Leads product strategy and frontend engineering — builds delightful, performant UIs.',
    image: '/team/member-1.svg',
    email: '',
    social: { twitter: '', linkedin: '', github: '' },
  },
  {
    id: '2',
    name: 'Maya Khan',
    role: 'Backend Engineer',
    bio: 'Designs resilient APIs and services for scale and maintainability.',
    image: '/team/member-2.svg',
    email: '',
    social: { twitter: '', linkedin: '', github: '' },
  },
  {
    id: '3',
    name: 'Samir Das',
    role: 'Product Designer',
    bio: 'Shapes UX, interaction, and product thinking that converts and retains users.',
    image: '/team/member-3.svg',
    email: '',
    social: { twitter: '', linkedin: '', github: '' },
  },
  {
    id: '4',
    name: 'Jordan Lee',
    role: 'DevOps Engineer',
    bio: 'Automates delivery, reliability, and cloud operations for fast iteration.',
    image: '/team/member-4.svg',
    email: '',
    social: { twitter: '', linkedin: '', github: '' },
  },
];
