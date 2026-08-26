export const getAssetUrl = (path) => {
  if (!path) return path;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const cleanPath = path.replace(/^(\.\/|\/)+/, '');
  const base = import.meta.env.BASE_URL || './';
  const prefix = base.endsWith('/') ? base : `${base}/`;
  return `${prefix}${cleanPath}`;
};

export const projectsData = [
  {
    id: 'overpaid-sea',
    title: 'Overpaid',
    tag: 'Deployed project · Tourist Price Detector & Price Sense Web App',
    category: 'Deployed project | Web Application × Price Data Analytics',
    description: 'Instant price sense across Southeast Asia for exchange students and travellers. Know what locals pay before opening your wallet.',
    image: getAssetUrl('assets/overpaid_hero.png'),
    objectFit: 'cover',
    visualStyle: 'emerald-bg',
    liveUrl: 'https://jaehee2245.github.io/overpaid/',
    tags: ['Deployed Web App', 'Price Analytics', 'Interactive UI', 'SEA Travel', 'Vanilla JS & CSS'],
    caseStudy: {
      tagline: 'Did you get the tourist price? Giving exchange students and travellers instant local price sense across Southeast Asia.',
      heroImage: getAssetUrl('assets/overpaid_hero.png'),
      problemImage: getAssetUrl('assets/overpaid_how_it_works.png'),
      overview: "When my exchange friend bought a simple bowl of noodles for $20 and genuinely thought that was just standard Singapore pricing, it hit me: <u>foreigners and exchange students don't have price sense</u>.\n\nLocal price intuition takes years of living in a region to build. You learn what a night market pad thai costs in Bangkok vs a mall food court, or what a hawker chicken rice costs in Singapore vs a tourist spot in Marina Bay.\n\nWithout that mental baseline, newcomers get systematically overcharged without ever realizing it.\n\nThat's why I built <u>Overpaid</u>—a lightweight, instant tourist-price detector that gives travellers years of local price sense on Day 1.",
      problem: "The problem isn't just exchange rates—it's contextual pricing across local vs tourist zones, seasonal fluctuations, and lack of real-time benchmarks.\n\nThe engineering challenge was to design a responsive Verdict Engine that:\n• Compares user spending against authentic local floor/ceiling benchmarks\n• Shifts evaluation thresholds dynamically when users are in tourist zones rather than penalising them unfairly\n• Visualises spend variance using dynamic meter geometry and custom receipts\n• Provides interactive price trends across Southeast Asian countries (Singapore, Thailand, Vietnam, Indonesia, Malaysia, Philippines)",
      architecture: [
        { title: 'Verdict Engine Logic', desc: 'Paid Amount vs Local Baseline → Zone Allowance Threshold Adjuster → Dynamic Grade (STEAL / FAIR / A BIT MUCH / OVERPAID / BRUTAL)' },
        { title: 'Meter Geometry Renderer', desc: 'Calculates dynamic percentage spans comparing local price spread (lo-hi) against tourist zone spread (tLo-tHi).' },
        { title: 'Regional FX & Price Data Schema', desc: 'Centralised dataset tracking item baselines, unit currencies (SGD, THB, VND, IDR, MYR, PHP), and seasonal variations.' },
        { title: 'Interactive Receipt Component', desc: 'Generates detailed itemised breakdown cards showing precise savings or overpayment percentage.' }
      ],
      techStack: [
        { name: 'JavaScript (ES6+)', role: 'Core verdict algorithm, state management & DOM render pipeline' },
        { name: 'Custom CSS Design System', role: 'Editorial typographic hierarchy, grain overlays & dark aesthetic' },
        { name: 'GitHub Pages', role: 'Production deployment pipeline for fast global CDN access' },
        { name: 'SEA Price Matrix', role: 'Curated price database covering food, transport & everyday goods' }
      ],
      highlights: [
        'Built and deployed a live price checker web app for Southeast Asia',
        'Implemented contextual tourist-zone allowance logic in verdict evaluation',
        'Created dynamic visual receipts with SVG/CSS meter scale geometry',
        'Designed multi-country price tracking (Singapore, Thailand, Vietnam, Indonesia, Malaysia, Philippines)',
        'Delivered instant UX designed specifically for exchange students and travellers',
        'Deployed live at https://jaehee2245.github.io/overpaid/'
      ]
    }
  },
  {
    id: 'gemini-google-maps',
    title: 'Gemini × Google Maps',
    tag: 'Concept project · AI × Product Design',
    category: 'Concept project | AI × Product Design',
    description: 'What if Google Maps could actually help me find the food I saved?',
    image: getAssetUrl('assets/0806.mp4'),
    video: getAssetUrl('assets/0806.mp4'),
    objectFit: 'contain',
    visualStyle: 'powder-blue',
    tags: ['Concept Project', 'AI × Product Design', 'LLM', 'Information Architecture'],
    caseStudy: {
      tagline: 'Using AI to transform cluttered Saved Lists into organised, searchable collections',
      heroImage: getAssetUrl('assets/0806.mp4'),
      heroVideo: getAssetUrl('assets/0806.mp4'),
      overview: "I’m a HUGE foodie which also means my Google Maps is basically a graveyard of restaurants I swore I would visit someday.\n\nAfter saving way too many places, I started noticing a problem: the more places I saved, the harder it became to actually find what I was looking for.\n\nWant Korean food? Scroll through hundreds of saved places.\nTrying to remember that one ramen place my friend recommended? Good luck.\n\nThen I thought — <u>if AI can understand what I’m asking, why not let it organise my saved places too</u>?\n\nAnd that became the idea behind Gemini × Google Maps.\n\nNote: This is a concept project exploring how AI could enhance the existing Google Maps experience. It is not an actual Google product or deployed application.",
      problem: "Google Maps already has a huge amount of information , the problem is finding the right information at the right time.\n\nThe challenge was to explore how Gemini could:\n• Understand the context of saved locations\n• Automatically categorise places\n• Assign multiple relevant categories to a location\n• Make large collections easier to search and filter\n• Reduce the amount of manual organisation required from users",
      architecture: [
        { title: 'AI Categorisation Layer', desc: 'Saved Places → Gemini → AI Categorisation → Structured Categories → Search & Filters → Personalised Results' },
        { title: 'Automated List Parsing', desc: 'Analyses 100+ saved locations to auto-generate lists (Korean Food, Cafés, Attractions).' },
        { title: 'Multi-Label Assignment', desc: 'Allows one location to fit multiple dynamic tags for flexible retrieval.' },
        { title: 'Contextual Intent Search', desc: 'Enables users to filter and find saved spots instantly without manual list curation.' }
      ],
      techStack: [
        { name: 'Gemini', role: 'AI-powered categorisation engine' },
        { name: 'Google Maps', role: 'Existing saved-place ecosystem' },
        { name: 'Information Retrieval', role: 'Search & filtering logic' },
        { name: 'UI/UX Prototyping', role: 'Interaction and experience design' }
      ],
      highlights: [
        'Designed an AI-assisted information organisation system',
        'Explored how LLMs can reduce manual categorisation',
        'Designed multi-label categorisation, allowing one location to fit multiple categories',
        'Considered how AI-generated structure could improve information retrieval',
        'Designed the concept around an existing product ecosystem',
        'Translated a personal everyday frustration into a potential product solution'
      ]
    }
  },
  {
    id: 'hubble-campus',
    title: 'Hubble',
    tag: 'Full-stack project · Product Design × Engineering',
    category: 'Full-stack project | Product Design × Engineering, Figma',
    image: getAssetUrl('assets/hubble_image.png'),
    objectFit: 'contain',
    visualStyle: 'cloud-bg',
    tags: ['Full-stack Project', 'React Native', 'Supabase', 'PostgreSQL', 'Figma'],
    posterUrl: getAssetUrl('assets/DIP_Poster.png'),
    videoUrl: 'https://drive.google.com/file/d/1reBm5gGMH6L_oUhDb6ARYaNlBf4wCP2y/view?usp=sharing',
    caseStudy: {
      tagline: 'Your all-in-one hall events app!',
      heroImage: getAssetUrl('assets/hubble_image.png'),
      overview: "Being a university student means juggling school, hall, CCAs, events, projects, deadlines, friendships... and somehow still trying to have a life.\n\nBut all of these things often live in completely different places:\n• School information might be on one platform.\n• Hall events are posted on Telegram or Instagram.\n• CCA activities have their own chats.\n• Event registration happens through Forms.\n• And important announcements? Somewhere in the 500 messages you haven't read.\n\nWe started asking: <u>Why isn't there one place where students can actually manage university life?</u>\n\nThat idea became Hubble.",
      problem: "The initial problem was simple: Hall events are everywhere, but nowhere.\n\n The engineering challenge was to build a system that could support two different user roles — students and administrators — while keeping event information centralised and up to date.",
      architecture: [
        { title: 'Client–Backend Architecture', desc: 'Student / Admin App → Auth & Access Control → Supabase Backend → PostgreSQL → Realtime Updates' },
        { title: 'PostgreSQL Relational Schema', desc: 'Structured database managing Users, Events, Categories, RSVPs, Sign-ups, and Announcements.' },
        { title: 'Supabase Storage Pipeline', desc: 'Image Upload → Supabase Storage → Media URL → Database Reference → React Native UI' },
        { title: 'Realtime Sync Data Flow', desc: 'Admin Creates Event → PostgreSQL → Realtime Update → Student App' }
      ],
      techStack: [
        { name: 'React Native & Expo Go', role: 'Cross-platform mobile application frontend' },
        { name: 'Supabase & PostgreSQL', role: 'Backend database & Auth access control engine' },
        { name: 'Supabase Storage', role: 'Cloud storage for event posters and profile images' },
        { name: 'Supabase Realtime', role: 'Websocket synchronisation for live updates' }
      ],
      highlights: [
        'Built a full-stack mobile application from concept to working prototype',
        'Designed separate student and admin experiences',
        'Implemented authentication and different access levels',
        'Designed a structured database for users, events and RSVPs',
        'Implemented event creation, editing and management',
        'Integrated cloud storage for event and profile images',
        'Used Realtime synchronisation for event and announcement updates',
        'Built the application using React Native for a cross-platform experience',
        'Explored how a small, focused hall-level solution could potentially scale into a wider NTU ecosystem'
      ],
    }
  }
];

export const aboutData = {
  name: 'Lee Jaehee',
  university: 'Nanyang Technological University (NTU), Singapore',
  degree: 'Bachelor of Engineering (Information Engineering and Media)',
  bio: "Hi, I'm Jaehee! I enjoy turning problems into simple, engaging experiences. I'm passionate about the space where technology, design, and business meet : whether that's building a product, designing an interface, making sense of data, or figuring out how an idea can become something people actually want to use. I like experimenting, building things, and occasionally asking, 'Why isn't there an app for this?",
  skills: [
    'UI/UX & Product Design',
    'Front-End & Interactive Web Development',
    'Data Analytics & Visualisation',
    'Python, Java & C',
    'Power BI & Data Storytelling',
    'Creative Technology & Digital Media',
    'Product Management & Strategy',
    'Prototyping & User-Centred Design'
  ],
  linkedinUrl: 'https://www.linkedin.com/in/jaehee-lee2245'
};
