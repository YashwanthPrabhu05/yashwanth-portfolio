/**
 * ===================================================================
 * YASHWANTH PRABHU — PORTFOLIO WEBSITE DATA SOURCE
 * ===================================================================
 * All portfolio content is managed here in a single place.
 * To update any text, links, projects, achievements, or experience,
 * simply edit the values in this file!
 */

export const portfolioData = {
  meta: {
    title: "Yashwanth Prabhu | Product Designer & UI/UX Designer",
    description: "Product Designer turning ideas into meaningful digital experiences. Based in Chennai, India.",
    favicon: "assets/images/yp-logo.jpg",
  },

  personal: {
    name: "Yashwanth Prabhu",
    shortName: "Yashwanth",
    positioning: "Product Designer | UI/UX Designer",
    location: "Chennai, India",
    email: "syashwanthprabhu@gmail.com",
    resumeUrl: "https://drive.google.com/file/d/1N4NUlXQF50N-j3Axq2XTDPnS74gBBICJ/view?usp=sharing",
    logoImage: "assets/images/yp-logo.jpg",
    portraitImage: "assets/images/yashwanth.jpg",
  },

  navigation: [
    { label: "WORK", href: "#featured" },
    { label: "PROJECTS", href: "#projects" },
    { label: "ABOUT", href: "#about" },
    { label: "JOURNEY", href: "#experience" },
    { label: "CONTACT", href: "#contact" },
    { label: "SOCIALS", href: "#socials" },
  ],

  // 01. HERO SECTION
  hero: {
    greeting: "Hey! I'm Yashwanth,",
    titleRole: "an AI-First Product Designer",
    accentText: "blending human creativity with artificial intelligence.",
    description: "I leverage AI to accelerate both design and development, turning concepts into intuitive interfaces and functional digital products.",
    workSnippet: "",
    ctaPrimary: {
      label: "View My Work",
      href: "#featured",
    },
    ctaSecondary: {
      label: "View Resume",
      href: "https://drive.google.com/file/d/1N4NUlXQF50N-j3Axq2XTDPnS74gBBICJ/view?usp=sharing",
      external: true,
    },
  },

  // 02. FEATURED PROJECT
  featuredProject: {
    sectionLabel: "WORK IN PROGRESS",
    status: "In progress",
    heading: "Now Building",
    projectName: "GRADIAN",
    subtitle: "Better insights. Better learning.",
    description: "Gradian brings teachers, students, and parents closer through smarter academic assessment and student performance tracking.",
    footerNote: "Education platform focused on bridging academic assessment, topic-wise clarity, and connected roles.",
    cta: {
      label: "See What I'm Building",
      href: "zeno/", // link to detailed case study
    },
  },

  // 03. SELECTED PROJECTS
  selectedProjects: {
    sectionLabel: "THERE'S MORE",
    heading: "Selected Projects",
    items: [
      {
        number: "01",
        title: "SwiftPay",
        description: "Making digital payments feel as simple as a conversation.",
        category: "Fintech · Mobile App · UI/UX Design",
        tags: ["FINTECH", "MOBILE APP", "UI/UX DESIGN"],
        bgClass: "project-card__image--lavender",
        image: "assets/images/SHOPEZ.png",
        href: "shopez/",
        wide: true,
      },
      {
        number: "02",
        title: "FinMate",
        description: "Connecting people with trusted financial experts.",
        category: "Fintech · Web Design · Product Design",
        tags: ["FINTECH", "WEB DESIGN", "PRODUCT DESIGN"],
        bgClass: "project-card__image--green",
        image: "assets/images/IoT%20APP.png",
        href: "#",
      },
      {
        number: "03",
        title: "CREA",
        description: "Bringing devotion and tradition into a premium digital experience.",
        category: "E-commerce · Web & App · UI/UX",
        tags: ["E-COMMERCE", "WEB & APP", "UI/UX"],
        bgClass: "project-card__image--cream",
        image: "assets/images/BRAND%20LOGO.png",
        href: "#",
      },
    ],
  },

  // 05. A BIT ABOUT ME
  about: {
    sectionLabel: "OBLIGATORY INTRODUCTION",
    heading: "A Bit About Me",
    portrait: "assets/images/yashwanth.jpg",
    bio: [
      "Namaste! I'm Yashwanth Prabhu, a Product Designer with a Computer Science background. My journey started with an interest in creating visually appealing interfaces, but I soon discovered that good design goes beyond aesthetics.",
      "I enjoy understanding user problems, exploring ideas, structuring experiences, and bringing them to life through thoughtful design. From mapping user journeys to refining the smallest details, I believe every design decision should have a purpose.",
      "These days, I'm particularly interested in the intersection of product design, technology, and AI — exploring better ways to turn ideas into real products.",
    ],
    details: [
      { label: "Designation", value: "Product Designer" },
      { label: "Experience", value: "Product Design at Fyrasoft" },
      { label: "Location", value: "Chennai, India" },
      { label: "Education", value: "New Prince Shri Bhavani College of Engineering & Technology", note: "Grad. 2026" },
      { label: "Email", value: "syashwanthprabhu@gmail.com", isLink: true, href: "mailto:syashwanthprabhu@gmail.com" },
    ],
    toolkit: {
      sectionLabel: "My Toolkit",
      heading: "Tools I reach for",
      subheading: "Curious by default",
      categories: [
        {
          name: "Design & Prototyping",
          items: ["Figma", "Adobe XD", "Adobe Photoshop", "Adobe Illustrator", "Framer"],
        },
        {
          name: "AI & Development",
          items: ["Figma Make", "Claude", "HTML", "CSS", "Java", "Spring Boot"],
        },
      ],
    },
    outsideOfDesign: {
      sectionLabel: "OUTSIDE OF DESIGN",
      heading: "Curiosity & Experimentation",
      text: "Exploring new AI tools, experimenting with creative workflows, and discovering how design and technology can work better together.",
    },
    opportunities: {
      title: "Open to Opportunities",
      text: "Always interested in meaningful collaborations, exciting product challenges, and opportunities to create better digital experiences.",
      statusText: "OPEN TO WORK",
    },
  },

  // 06. MY DESIGN JOURNEY
  journey: {
    sectionLabel: "SOMEHOW EMPLOYED",
    heading: "My Design Journey",
    timeline: [
      {
        company: "Fyrasoft",
        role: "Product Designer",
        duration: "November 2025 – Present | Full-time",
        description: "Working across web and mobile products, shaping user experiences, creating design systems, and translating business requirements into intuitive digital products.",
        icon: "assets/images/fyrasoft-logo.png",
      },
      {
        company: "Tems Tech Solutions",
        role: "UI/UX Design Intern",
        duration: "2024 | 15 Days",
        description: "Gained practical experience in UI/UX through mobile application concepts, login page design, and prototyping.",
        icon: "assets/images/tems-tech-logo.png",
      },
      {
        company: "New Prince Shri Bhavani College of Engineering & Technology",
        role: "B.E. Computer Science",
        duration: "2022 – 2026 | Degree",
        description: "Developed a foundation in technology while exploring product design, creative problem-solving, and digital experiences.",
        icon: "assets/images/education-mark.svg",
      },
    ]
  },

  // 07. CONTACT SECTION
  contact: {
    sectionLabel: "MIGHT AS WELL SAY HI",
    heading: "Let's Build Together",
    description: "Whether it's a collaboration, an exciting opportunity, or simply a conversation about design, I'm always happy to connect. Tell me what's on your mind.",
    fields: {
      nameLabel: "NAME",
      namePlaceholder: "Your name",
      emailLabel: "EMAIL",
      emailPlaceholder: "you@company.com",
      messageLabel: "PROJECT / MESSAGE",
      messagePlaceholder: "Tell me about your idea.",
    },
    cta: "Send Message",
    recipientEmail: "syashwanthprabhu@gmail.com",
  },

  // 08. FIND ME ONLINE
  findMeOnline: {
    sectionLabel: "ELSEWHERE ON THE INTERNET",
    heading: "Find Me Online",
    subtitle: "Connect with me, explore my work, or just say hello.",
    socialLinks: [
      {
        name: "LinkedIn",
        detail: "Connect with me",
        href: "https://www.linkedin.com/in/yashwanth-prabhu-474a37269/",
      },
      {
        name: "Behance",
        detail: "Explore my designs",
        href: "https://www.behance.net/yashwanthprabhu",
      },
      {
        name: "Email",
        detail: "Click to copy",
        href: "mailto:syashwanthprabhu@gmail.com",
        copy: "syashwanthprabhu@gmail.com",
      },
      {
        name: "Resume",
        detail: "Take a look",
        href: "https://drive.google.com/file/d/1N4NUlXQF50N-j3Axq2XTDPnS74gBBICJ/view?usp=sharing",
      },
    ],
  },

  // FOOTER
  footer: {
    monogram: "YP.",
    tagline: "Designed with curiosity. Crafted with purpose.",
    copyright: "© 2026 Yashwanth Prabhu. All rights reserved.",
  },
};
