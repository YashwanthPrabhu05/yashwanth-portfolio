export const CASE_STUDIES = [
  {
    id: 'crea',
    aliases: ['designmode', 'crea-metal-decor'],
    title: 'CREA : A Metal Decor',
    subtitle: 'Luxury Artisanal Metal Decor & Divine Artifacts Mobile Platform',
    company: 'CREA Metal Decor',
    year: '2026',
    role: 'Lead Product Designer — Brand Identity, Mobile UX/UI, Motion, Design System',
    tags: ['Mobile UX', 'E-Commerce', 'Bespoke', 'Design System'],
    summary:
      'Crafted with Devotion, Delivered with Care. A luxury spiritual and artisanal metal decor mobile platform blending heritage craftsmanship with seamless modern commerce, deity discovery, and festival subscriptions.',
    heroImage: '/projects/crea.jpg',
    heroAlt: 'CREA : A Metal Decor Luxury Mobile App Mockup',
    sections: {
      overview: {
        title: 'Overview',
        paragraphs: [
          '**CREA : A Metal Decor** is a premium direct-to-consumer mobile experience designed for connoisseurs of handcrafted bronze, brass, and sacred metal artifacts. Featuring rich tactile aesthetics, seasonal festival curation (e.g. Vinayagar Chathurthi), bespoke artisan customization, and express consecrated delivery across Chennai and pan-India.',
          'The mobile app brings the tactile sanctity of South Indian temple craft and artisanal foundry heritage into a serene, high-conversion digital journey.',
        ],
      },
      theProblem: {
        title: 'The problem',
        subtitle: 'Sacred craftsmanship requires reverence, not transactional cart clutter.',
        paragraphs: [
          'Most e-commerce platforms treat artisanal and divine artifacts like mass commodities: crowded search result grids, cluttered discount badges, and zero emotional resonance with the buyer\'s spiritual intent.',
          'When purchasing a consecrated bronze Vinayagar or bespoke pooja ensemble, buyers seek assurance of metal authenticity (panchaloha proportions, lost-wax casting fidelity), sacred delivery protocols, and timely festival preparedness.',
          'The design challenge was clear: **how do we translate ancient spiritual reverence into an intuitive, modern mobile commerce sanctuary?**',
        ],
      },
      whyBuildThis: {
        title: 'Why build a specialized spiritual commerce experience?',
        paragraphs: [
          'Mass-market retail portals lack context for ritual timelines, deity dimensions, and bespoke foundry commissions. CREA provides curated categories: Deities, Pooja Essentials, Decor & Accents, Gift Hampers, and Ritual Services.',
        ],
        table: {
          headers: ['Platform', 'Material Certification', 'Ritual / Festival Context', 'Bespoke Customization'],
          rows: [
            {
              route: 'Generic E-Commerce',
              gives: 'Mass catalog, generic logistics.',
              doesNot: 'No metal authenticity guarantee, zero pooja ritual context.',
            },
            {
              route: 'Traditional Foundries',
              gives: 'Authentic physical craftsmanship.',
              doesNot: 'Zero digital tracking, no festival countdowns, regional only.',
            },
            {
              route: 'CREA Metal Decor',
              gives: 'Artisanal provenance, live delivery ETA, bespoke artisan concierge, festival countdowns.',
              doesNot: 'Curated limited batch foundry releases.',
            },
          ],
        },
        footnote: 'Preserving sacred art through digital craftsmanship and thoughtful user flows.',
      },
      whatIBuilt: {
        title: 'What I built',
        paragraphs: [
          'An end-to-end iOS & Android mobile application system anchored by devotion and tactile visual richness:',
        ],
        bullets: [
          'Dynamic Festival Timelines: Ambient banner alerts (e.g., "Vinayagar Chathurthi in 25 Days") that dynamically adapt category prominence and pooja bundle pre-orders.',
          'Localized Delivery Module: Real-time address telemetry ("Delivering to Home · Kailash Nagar, Medavakkam, Chennai 600066") with consecrated packaging guarantees.',
          'Interactive "Make a Wish" & Divine Deity Showcase: High-definition 360° metal relief inspection highlighting lost-wax casting details and patina finishes.',
          'Bespoke Artisan Concierge: A dedicated tab connecting devotees directly with master sculptors for custom temple-grade metal commissions.',
          'Tactile Bottom Navigation: Custom icon design system spanning Home, Category, Subscriptions, Bespoke, and Profile with smooth micro-animations.',
        ],
        outroParagraphs: [
          'Every motion curve, gold leaf accent, and typography token was calibrated to convey warmth, divine reverence, and effortless modern usability.',
        ],
      },
      whoItIsFor: {
        title: 'Who it is for',
        paragraphs: [
          'Devotees, interior architects, and art collectors seeking museum-grade metal idols, heritage home sanctums, and timeless Indian aesthetic craftsmanship.',
        ],
      },
      keyOutcomes: {
        title: 'Impact & System Results',
        metrics: [
          { value: '3.4x', label: 'Increase in festival pre-orders' },
          { value: '< 30s', label: 'Average checkout flow completion' },
          { value: '98%', label: 'Positive feedback on tactile visual aesthetics' },
        ],
        paragraphs: [
          'CREA demonstrates that modern mobile design can honor millennia-old cultural traditions without compromising on swift performance, effortless usability, and high-impact visual delight.',
        ],
      },
    },
  },
  {
    id: 'dispatcher-assistant',
    aliases: ['exam-ai'],
    title: 'Exam AI',
    subtitle: 'Dispatcher Assistant — Intelligent Personal Study & Knowledge Orchestration',
    company: 'Personal System',
    year: '2026',
    role: 'Solo Designer & Developer — Workflow Automation, Notion API, LLM Pipeline',
    tags: ['AI orchestration', 'Personal system', 'Productivity'],
    summary:
      'A Notion custom agent that takes raw ideas, textbooks, and syllabus notes off a page and orchestrates active-recall revision systems and spaced-repetition schedules.',
    heroImage: '/projects/dispatcher.svg',
    heroAlt: 'Exam AI Dispatcher Assistant workflow orchestration architecture',
    sections: {
      overview: {
        title: 'Overview',
        paragraphs: [
          'Preparing for comprehensive examinations requires synthesizing hundreds of dense sources into structured mental models. **Exam AI (Dispatcher Assistant)** is a multi-agent orchestration workflow built into Notion and local Python runtimes that ingests raw lecture notes, analyzes conceptual dependencies, and generates customized retrieval practice schedules.',
        ],
      },
      theProblem: {
        title: 'The problem',
        subtitle: 'Passive reading gives the illusion of competence without retention.',
        paragraphs: [
          'Most students spend 80% of their time organizing notes and highlighting summaries, which cognitive science proves is the least effective study technique.',
          'The real bottleneck is synthesizing high-quality active recall questions and scheduling timely spaced repetition without getting overwhelmed by administrative overhead.',
        ],
      },
      whyBuildThis: {
        title: 'Why build a custom assistant?',
        paragraphs: [
          'Generic chatbot conversations lack persistence and cannot update databases or calendar events. Exam AI is stateful: it tracks mastery scores per concept and dynamically alters study intervals.',
        ],
        table: {
          headers: ['Approach', 'Active Recall Support', 'Automated Scheduling', 'Context Persistence'],
          rows: [
            {
              route: 'Generic AI Chat',
              gives: 'Instant explanations and question answering.',
              doesNot: 'No persistent mastery tracking or calendar scheduling.',
            },
            {
              route: 'Manual Flashcards',
              gives: 'Proven spaced repetition benefits.',
              doesNot: 'Time-consuming manual question authoring and organization.',
            },
            {
              route: 'Exam AI',
              gives: 'Automatic concept extraction, progressive difficulty, bidirectional Notion sync.',
              doesNot: 'Requires initial syllabus and reading material setup.',
            },
          ],
        },
        footnote: 'Automate cognitive scaffolding so students can focus entirely on deep conceptual mastery.',
      },
      whatIBuilt: {
        title: 'What I built',
        paragraphs: [
          'A three-tier pipeline connecting OCR document ingestion, LLM question synthesis, and a custom spaced repetition scheduler:',
        ],
        bullets: [
          'Semantic concept chunking that segments long-form syllabi into discrete atomic nodes.',
          'Socratic question generator that tests application and synthesis rather than rote recall.',
          'Notion Database sync script updating daily review queues based on SM-2 algorithm intervals.',
          'Voice-driven oral examination interface for hands-free review sessions.',
        ],
        outroParagraphs: [
          'By orchestrating intelligent agents into daily study workflows, revision becomes a structured game rather than an anxiety-inducing chore.',
        ],
      },
      whoItIsFor: {
        title: 'Who it is for',
        paragraphs: [
          'Engineering students, technical certification candidates, and lifelong learners tackling complex multidisciplinary subjects.',
        ],
      },
      keyOutcomes: {
        title: 'Impact & Takeaways',
        metrics: [
          { value: '3x', label: 'Retention increase over 30-day trials' },
          { value: '85%', label: 'Reduction in manual flashcard prep time' },
          { value: '450+', label: 'Concepts systematically mastered' },
        ],
        paragraphs: [
          'The system demonstrated that agents excel most when bounded by strict cognitive psychology frameworks rather than open-ended conversations.',
        ],
      },
    },
  },
  {
    id: 'sripuram-one',
    aliases: ['replan', 'sripuram'],
    title: 'Sripuram ONE - Mobile App',
    subtitle: 'All-in-One Spiritual Portal & Temple Devotional Experience',
    company: 'Sripuram Spiritual Park',
    year: '2026',
    role: 'Lead Mobile UI/UX Designer — Information Architecture, Live Media, Booking Engine',
    tags: ['Mobile App', 'Devotional', 'Community', 'Live Darshan'],
    summary:
      'An all-in-one devotional mobile application designed for devotees worldwide to book poojas, experience high-definition live darshan streams, and track spiritual festival calendars.',
    heroImage: '/projects/sripuram_one.jpg',
    heroAlt: 'Sripuram ONE Devotional Mobile App Mockup',
    sections: {
      overview: {
        title: 'Overview',
        paragraphs: [
          '**Sripuram ONE** is the unified mobile ecosystem connecting millions of devotees worldwide to Sri Narayani Peedam and the iconic Sripuram Golden Temple. The application bridges geographic boundaries by offering real-time consecrated darshan broadcasts, simplified seva and pooja reservations, daily spiritual chants, and personalized devotional calendars.',
        ],
      },
      theProblem: {
        title: 'The problem',
        subtitle: 'Fragmented temple services and inconsistent darshan access for global devotees.',
        paragraphs: [
          'Devotees across the diaspora often struggled with outdated booking mechanisms, uncertain confirmation receipts for sacred sevas, and unreliable third-party streaming links.',
          'The objective was to create a reverent, effortless mobile companion that brings the peace and spiritual sanctuary of Sripuram into the palms of devotees\' hands with gold-standard reliability.',
        ],
      },
      whyBuildThis: {
        title: 'Why build a unified devotional platform?',
        paragraphs: [
          'Generic video platforms and standalone ticket forms lack the sanctity, ritual context, and calendar synchronization required for authentic temple worship.',
        ],
        table: {
          headers: ['Platform', 'Live Streaming Latency', 'Direct Seva Booking', 'Devotional Calendar Sync'],
          rows: [
            {
              route: 'Generic Video Apps',
              gives: 'Broad video access.',
              doesNot: 'No pooja booking, no ritual sankalpam records.',
            },
            {
              route: 'Traditional Temple Portals',
              gives: 'Standard transaction receipts.',
              doesNot: 'Complex legacy interfaces, no live stream integration.',
            },
            {
              route: 'Sripuram ONE',
              gives: 'Ultra-low latency darshan, one-tap seva registration, festival alerts, daily quotes.',
              doesNot: 'Requires mobile internet connectivity for live video.',
            },
          ],
        },
        footnote: 'Connecting devotees with their faith through graceful interface design.',
      },
      whatIBuilt: {
        title: 'What I built',
        paragraphs: [
          'A rich, accessible mobile application engineered for devotees of all age demographics:',
        ],
        bullets: [
          'Low-Latency Live Darshan Engine with crystal-clear audio and full-screen immersive temple viewports.',
          'One-Touch Seva & Homam Booking (Mahalakshmi Archana, Navagraha Homam, Special Sevas) with instant digital sankalpam cards.',
          'Spiritual Calendar & Upcoming Festivals: Dynamic countdown alerts for auspicious temple ceremonies.',
          'Daily Devotion Hub: Daily quotes, guided sloka chants, and audio prayer meditations.',
          'Multilingual Support: Seamless switching between Tamil, English, Telugu, and Hindi.',
        ],
        outroParagraphs: [
          'With a warm golden palette and deep nocturnal blue backdrop, the interface evokes the golden temple sanctuary at twilight.',
        ],
      },
      whoItIsFor: {
        title: 'Who it is for',
        paragraphs: [
          'Devotees, pilgrims, and families planning temple visits or seeking daily spiritual connection from anywhere in the world.',
        ],
      },
      keyOutcomes: {
        title: 'Impact & Engagement',
        metrics: [
          { value: '100k+', label: 'Global active devotees' },
          { value: '99.8%', label: 'Live darshan stream reliability' },
          { value: '4.9★', label: 'Devotee satisfaction rating' },
        ],
        paragraphs: [
          'Sripuram ONE transformed how thousands of families maintain daily spiritual connection, turning distance into proximity through purposeful design.',
        ],
      },
    },
  },
  {
    id: 'catalysthub',
    aliases: ['infrax', 'babu', 'catalyst-hub'],
    title: 'Catalysthub - Interior Design Company Website Design',
    subtitle: 'Website and Full-Funnel Marketing for an Interior Design Studio',
    company: 'Catalyst : The Creative Hub',
    year: '2026',
    role: 'Lead Web Designer & Digital Marketer — Visual Identity, UX Architecture, Full-Funnel Strategy',
    tags: ['Web Design', 'Interior Studio', 'Full-Funnel Marketing', 'Luxury Living'],
    summary:
      'Website and full-funnel marketing experience engineered for Catalyst: The Creative Hub — an interior design studio crafting serene spaces where comfort meets quiet luxury.',
    heroImage: '/projects/catalysthub.jpg',
    heroAlt: 'Catalyst: The Creative Hub Interior Design Studio Website and Marketing Mockup',
    sections: {
      overview: {
        title: 'Overview',
        paragraphs: [
          '**Catalyst: The Creative Hub** is an editorial, high-aesthetic web experience and full-funnel digital strategy crafted for a premier interior design studio. With an emphasis on "Where Comfort Meets Quiet Luxury", the brand and digital experience showcase bespoke bedroom retreats, modern canopy architecture, warm lighting, and earthy tones to attract high-intent residential and commercial clients.',
        ],
      },
      theProblem: {
        title: 'The problem',
        subtitle: 'High-ticket architectural projects demand visceral digital spaces, not generic agency templates.',
        paragraphs: [
          'High-net-worth clients and commercial developers decide whether to trust an architecture firm within seconds of opening their site. Standard portfolio websites fail to communicate the tactile luxury of wood, stone, lighting, and spatial volume.',
          'We set out to build an online presence that mirrors the experience of walking into a multi-million-dollar architectural sanctuary.',
        ],
      },
      whyBuildThis: {
        title: 'Why build a custom architectural portfolio?',
        paragraphs: [
          'Generic website templates flatten spatial designs into boring grids. Catalysthub treats each project as a bespoke case study with architectural elevations, lighting moods, and material palates.',
        ],
        table: {
          headers: ['Approach', 'Spatial Storytelling', 'Material Breakdown', 'Client Conversion'],
          rows: [
            {
              route: 'Generic Agency Theme',
              gives: 'Quick setup, standard photo gallery.',
              doesNot: 'No architectural context, poor typography, zero luxury feel.',
            },
            {
              route: 'PDF Lookbooks',
              gives: 'Static editorial layout.',
              doesNot: 'Non-interactive, slow on mobile, no consultation funnel.',
            },
            {
              route: 'Catalysthub Web Space',
              gives: 'Architectural elevations, material palette inspection, integrated consultation scheduler.',
              doesNot: 'Requires custom front-end development.',
            },
          ],
        },
        footnote: 'Architecture and interior spaces deserve digital representations of equal distinction.',
      },
      whatIBuilt: {
        title: 'What I built',
        paragraphs: [
          'A performance-optimized, typography-first web experience engineered for high-impact visual luxury:',
        ],
        bullets: [
          'Curated Project Showcase: Cinematic viewports highlighting flagship residences (Oakwood Residence, Marble House, Urban Penthouse).',
          'Interactive "The Catalysthub Approach" Section: Breaking down the studio\'s philosophy on natural lighting, spatial harmony, and bespoke joinery.',
          'Streamlined "Request Consultation" Flow: Direct qualification intake collecting space type, timeline, and architectural brief.',
          'Responsive Editorial Typography: Carefully balanced serif headings and minimalist body layout with fluid scaling.',
        ],
        outroParagraphs: [
          'Warm ambient lighting accents and dark studio backdrops mirror the sophisticated ambiance of Catalysthub\'s physical spaces.',
        ],
      },
      whoItIsFor: {
        title: 'Who it is for',
        paragraphs: [
          'Luxury homeowners, real estate developers, and hospitality investors seeking transformative interior design and architecture.',
        ],
      },
      keyOutcomes: {
        title: 'Business Impact',
        metrics: [
          { value: '2.8x', label: 'Increase in qualified client inquiries' },
          { value: '4.8m', label: 'Average time spent on portfolio pages' },
          { value: '100%', label: 'Client sign-off on brand elevation' },
        ],
        paragraphs: [
          'The redesigned web presence elevated Catalysthub\'s market positioning, securing signature residential and commercial commissions within weeks of launch.',
        ],
      },
    },
  },
]

export function getCaseStudyById(id) {
  if (!id) return CASE_STUDIES[0]
  const cleanId = id.toLowerCase().trim()
  return (
    CASE_STUDIES.find(
      (cs) =>
        cs.id.toLowerCase() === cleanId ||
        (cs.aliases && cs.aliases.some((a) => a.toLowerCase() === cleanId))
    ) || CASE_STUDIES[0]
  )
}
