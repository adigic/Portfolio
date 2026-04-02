import { Project } from './types';

export const fallbackProjects: Project[] = [
  {
    _id: 'runclub',
    title: 'RunClub',
    description:
      'Community-first running concept with focus on clear UX, structured content and a modern responsive frontend.',
    imageUrl: '/projects/RunClub.avif',
    tags: ['Next.js', 'TypeScript', 'Tailwind'],
    type: 'Personal',
    url: '#',
  },
  {
    _id: 'golfcount',
    title: 'GolfCount',
    description:
      'Score tracking experience designed to feel lightweight and precise, with a clean interface tailored for mobile use.',
    imageUrl: '/projects/GolfCount.avif',
    tags: ['React', 'UX/UI', 'Responsive'],
    type: 'Personal',
    url: '#',
  },
  {
    _id: 'portfolio',
    title: 'Portfolio',
    description:
      'Personal portfolio concept focused on strong visual hierarchy, refined spacing and a premium presentation for frontend work.',
    imageUrl: '/cards/design.avif',
    tags: ['Next.js', 'Figma', 'Tailwind'],
    type: 'Personal',
    url: '#',
  },
  {
    _id: 'travelmate',
    title: 'TravelMate',
    description:
      'Travel planning concept combining strong visual hierarchy, practical flows and a polished product presentation.',
    imageUrl: '/projects/TravelMate.avif',
    tags: ['Angular', 'NgRx', 'Tailwind'],
    type: 'Professional',
    url: '#',
  },
  {
    _id: 'fleetflow',
    title: 'FleetFlow',
    description:
      'Operational dashboard concept for vehicle logistics with focus on monitoring, clarity and fast decision-making.',
    imageUrl: '/cards/code.avif',
    tags: ['Next.js', 'TypeScript', 'Analytics'],
    type: 'Professional',
    url: '#',
  },
  {
    _id: 'designsystem',
    title: 'Design System',
    description:
      'Scalable UI system work centered on reusable components, documentation and consistent product presentation.',
    imageUrl: '/cards/ux.avif',
    tags: ['Figma', 'Components', 'UX/UI'],
    type: 'Professional',
    url: '#',
  },
];
