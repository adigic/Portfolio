import { Project } from './types';

export const fallbackProjects: Project[] = [
  {
    _id: 'runclub',
    title: 'RunClub',
    description:
      'Community-first running concept with focus on clear UX, structured content and a modern responsive frontend.',
    // images borttaget, används ej i nya typen
    tags: ['Next.js', 'TypeScript', 'Tailwind'],
    type: 'Personal',
    featured: true,
    url: '#',
    role: 'Concept, UX/UI, Frontend Development',
    client: 'Independent learning project',
    year: '2025',
    overview:
      'RunClub was created as a learning-focused concept to explore how a community-driven product can feel both energetic and easy to use. The project focused on translating content and interactions into a clean, mobile-friendly frontend experience.',
    process:
      'The process started with a simple product concept and moved through layout exploration, responsive structure, interface refinement and frontend implementation. Each step focused on making the experience feel motivating without losing clarity.',
    challenge:
      'The challenge was to create a social and motivating product direction without letting the interface become crowded. The experience needed to feel light, structured and easy to scan, especially on smaller screens.',
    solution:
      'I approached the project with a clear visual hierarchy, structured spacing and responsive layouts built with modern frontend tooling. The goal was to make the product feel approachable while still giving it a strong visual identity.',
    outcome:
      'The result is a polished concept project that helped me strengthen my work with responsive UI, layout systems and product-oriented frontend thinking.',
    toolsUsed: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Figma'],
    uiSummary:
      'The UX/UI direction focused on strong spacing, friendly visual rhythm and mobile-first clarity. The interface was shaped to feel active and modern while keeping every section easy to scan and interact with.',
    uxImages: [
      {
        image: { asset: { url: '/cards/design.avif' }, _type: 'image' },
        title: 'Logotyp',
        description: 'RunClub logotyp',
        aspect: 'square',
      },
    ],
  },
  {
    _id: 'golfcount',
    title: 'GolfCount',
    description:
      'Score tracking experience designed to feel lightweight and precise, with a clean interface tailored for mobile use.',
    // images borttaget, används ej i nya typen
    tags: ['React', 'UX/UI', 'Responsive'],
    type: 'Personal',
    featured: false,
    url: '#',
    role: 'UX/UI, Frontend Development',
    client: 'Independent learning project',
    year: '2025',
    overview:
      'GolfCount was built as a test project focused on mobile usability and clean score tracking flows. It gave me room to explore how utility-based interfaces can still feel refined and user-friendly.',
    process:
      'The project was approached from a utility-first perspective, with fast interaction patterns, simplified layout decisions and repeated refinement of small UI details that affect ease of use on mobile.',
    challenge:
      'The main challenge was reducing friction in an interface that users would interact with quickly and repeatedly. Every element had to support clarity, fast input and minimal cognitive load.',
    solution:
      'I focused on strong visual contrast, compact spacing and an interface that keeps the most important actions close at hand. The frontend was shaped around a simple flow rather than decorative complexity.',
    outcome:
      'The project became a useful exercise in mobile-first thinking, lightweight product flows and designing for practical real-world interaction patterns.',
    toolsUsed: ['React', 'Responsive Design', 'UX/UI', 'Figma'],
    uiSummary:
      'The UX/UI work centered on reducing friction. Clear contrast, compact controls and a calm layout language made the product feel more precise and dependable during repeated use.',
    uxImages: [
      {
        image: { asset: { url: '/cards/design.avif' }, _type: 'image' },
        title: 'Logotyp',
        description: 'GolfCount logotyp',
        aspect: 'square',
      },
    ],
  },
  {
    _id: 'portfolio',
    title: 'Portfolio',
    description:
      'Personal portfolio concept focused on strong visual hierarchy, refined spacing and a premium presentation for frontend work.',
      cardImage: { asset: { url: '/cards/design.avif' }, _type: 'image' },
      foundationImage: { asset: { url: '/cards/design.avif' }, _type: 'image' },
    tags: ['Next.js', 'Figma', 'Tailwind'],
    type: 'Personal',
    featured: true,
    url: '#',
    role: 'Design Direction, Frontend Development',
    client: 'Independent learning project',
    year: '2026',
    overview:
      'This portfolio project was built to present my work, strengths and background in a more professional way. It combines frontend development, design decisions and content structure in one focused personal product.',
    process:
      'The process combined content restructuring, visual refinement, responsive iteration and frontend implementation. The goal was to create a portfolio that feels intentional from hero to footer, not just assembled section by section.',
    challenge:
      'The challenge was creating a portfolio that feels premium and personal without becoming visually noisy. The site needed to support clear storytelling, responsive behavior and a strong first impression.',
    solution:
      'I worked with typography, spacing, section rhythm and motion to create a clear one-page experience. The implementation uses a modern Next.js setup and components that balance presentation with performance.',
    outcome:
      'The result is a more intentional portfolio experience that communicates both technical ability and a design-aware approach to frontend work.',
    toolsUsed: ['Next.js', 'Tailwind CSS', 'Figma', 'Framer Motion', 'Sanity'],
    uiSummary:
      'The UI direction focused on typography, rhythm, contrast and section hierarchy. Figma thinking and frontend implementation worked closely together to create a portfolio that feels structured, editorial and modern.',
      uxImages: [
        {
          image: { asset: { url: '/cards/design.avif' }, _type: 'image' },
          title: 'Logotyp',
          description: 'Portfolio logotyp',
          aspect: 'square',
        },
        {
          image: { asset: { url: '/cards/ux.avif' }, _type: 'image' },
          title: 'Mobile screenshot',
          description: 'Mobilvy',
          aspect: 'portrait',
        },
      ],
  },
  {
    _id: 'travelmate',
    title: 'TravelMate',
    description:
      'Travel planning concept combining strong visual hierarchy, practical flows and a polished product presentation.',
      cardImage: { asset: { url: '/projects/TravelMate.avif' }, _type: 'image' },
      foundationImage: { asset: { url: '/projects/TravelMate.avif' }, _type: 'image' },
    tags: ['Angular', 'NgRx', 'Tailwind'],
    type: 'Professional',
    featured: true,
    url: '#',
    role: 'Frontend Development',
    client: 'Project delivered through my company',
    year: '2025',
    overview:
      'TravelMate represents client-oriented product work where structure, presentation and usability all need to align. The project focused on delivering a polished interface suitable for a travel planning context.',
    process:
      'The project moved from product framing into interface structuring, frontend development and refinement of the user flow. The work focused on making a practical planning tool feel visually coherent and easy to navigate.',
    challenge:
      'The challenge was building an experience that could handle practical travel-related flows while still feeling clean and visually composed. The interface needed to guide users without overwhelming them.',
    solution:
      'I worked with a frontend architecture built for clear state handling, structured layouts and consistent UI behavior. The implementation prioritized readable content blocks and intuitive user flow.',
    outcome:
      'The project demonstrates how I approach production-oriented frontend work with attention to clarity, maintainability and product presentation.',
    toolsUsed: ['Angular', 'NgRx', 'Tailwind CSS', 'Product UI'],
    uiSummary:
      'The UX/UI direction centered on calm structure and guided decision-making. The interface needed to support planning flows while maintaining a polished travel-oriented visual tone.',
      uxImages: [
        {
          image: { asset: { url: '/projects/TravelMate.avif' }, _type: 'image' },
          title: 'Desktop screenshot',
          description: 'TravelMate desktopvy',
          aspect: 'landscape',
        },
      ],
  },
  {
    _id: 'fleetflow',
    title: 'FleetFlow',
    description:
      'Operational dashboard concept for vehicle logistics with focus on monitoring, clarity and fast decision-making.',
      cardImage: { asset: { url: '/cards/code.avif' }, _type: 'image' },
      foundationImage: { asset: { url: '/cards/code.avif' }, _type: 'image' },
    tags: ['Next.js', 'TypeScript', 'Analytics'],
    type: 'Professional',
    featured: true,
    url: '#',
    role: 'Frontend Development, Interface Structuring',
    client: 'Project delivered through my company',
    year: '2025',
    overview:
      'FleetFlow is a dashboard-focused project built around monitoring, visibility and operational clarity. It reflects client work where information density must be handled carefully to support decision-making.',
    process:
      'The process focused on information hierarchy, dashboard layout and frontend patterns that make dense operational data more understandable. Each UI decision was aimed at making actions and insights easier to access quickly.',
    challenge:
      'The challenge was presenting dense operational information in a way that still feels clear and actionable. Dashboards can become visually heavy very quickly if hierarchy is not handled well.',
    solution:
      'I approached the interface through structured sections, deliberate spacing and visual grouping that made key data easier to scan. The frontend was shaped to support control, overview and reliability.',
    outcome:
      'The outcome is a more focused dashboard concept that shows how I think about production-ready interfaces with practical business use in mind.',
    toolsUsed: ['Next.js', 'TypeScript', 'Analytics', 'Dashboard UI'],
    uiSummary:
      'The UX/UI direction focused on scanability, data grouping and fast orientation. Visual restraint was important so the dashboard could support action instead of distraction.',
      uxImages: [
        {
          image: { asset: { url: '/cards/code.avif' }, _type: 'image' },
          title: 'Dashboard',
          description: 'FleetFlow dashboard',
          aspect: 'landscape',
        },
      ],
  },
  {
    _id: 'designsystem',
    title: 'Design System',
    description:
      'Scalable UI system work centered on reusable components, documentation and consistent product presentation.',
      cardImage: { asset: { url: '/cards/ux.avif' }, _type: 'image' },
      foundationImage: { asset: { url: '/cards/ux.avif' }, _type: 'image' },
    tags: ['Figma', 'Components', 'UX/UI'],
    type: 'Professional',
    featured: false,
    url: '#',
    role: 'System Thinking, Components, Documentation',
    client: 'Project delivered through my company',
    year: '2025',
    overview:
      'This project reflects system-oriented work where consistency, reusable patterns and documentation are central. It focuses on building a stronger foundation for product teams and frontend implementation.',
    process:
      'The work centered on reviewing component patterns, defining reusable structures and improving documentation so the system could support both product consistency and smoother implementation workflows.',
    challenge:
      'The key challenge was creating consistency across components and design patterns while keeping the system practical for real use. A design system needs to support both designers and developers.',
    solution:
      'I focused on reusable UI patterns, clearer documentation and a component mindset that supports scalability. The work centered on establishing a more dependable design and implementation baseline.',
    outcome:
      'The result is a stronger system approach that supports consistency, better collaboration and more maintainable frontend work across projects.',
    toolsUsed: ['Figma', 'Component Systems', 'Documentation', 'UX/UI'],
    uiSummary:
      'The UX/UI focus was on building a coherent visual system rather than isolated screens. That meant clearer component behavior, stronger documentation and more dependable design patterns.',
      uxImages: [
        {
          image: { asset: { url: '/cards/ux.avif' }, _type: 'image' },
          title: 'Logotyp',
          description: 'Designsystem logotyp',
          aspect: 'square',
        },
        {
          image: { asset: { url: '/cards/design.avif' }, _type: 'image' },
          title: 'Desktop screenshot',
          description: 'Designsystem desktopvy',
          aspect: 'landscape',
        },
      ],
  },
];
