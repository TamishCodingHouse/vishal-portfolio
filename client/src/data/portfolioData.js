// ============================================================
// PORTFOLIO DATA — Edit this file to update your information
// ============================================================


export const personalInfo = {
  name: "Vishal Deep",
  title: "MERN Stack Engineer",
  tagline: "I Build Digital Experiences That Feel Different.",
  bio: "A passionate software engineer who crafts responsive interfaces, scalable web applications, and thoughtful user experiences.",
  shortBio:
    "Frontend Developer & MERN Stack Engineer based in Himachal Pradesh, India — turning complex problems into elegant digital solutions.",
  availability: "Open to Opportunities",
  location: "Himachal Pradesh, India",
  email: "vishaldeep0106@gmail.com",
  github: "https://github.com/TamishCodingHouse",
  linkedin: "https://www.linkedin.com/in/vishal-deep-7039772a7/",
  resume: "/vishalresume.pdf",
};

export const experience = [
  {
    id: 1,
    role: "Associate Software Engineer",
    company: "SquadMinds Private Limited",
    duration: "March 2026 — Present",
    type: "Full-time",
    description:
      "Working on real-world client projects, building and maintaining web applications using the MERN stack. Collaborating with cross-functional teams to deliver frontend features, debug issues, and continuously improve codebase quality and user experience.",
    highlights: [
      "Building production-grade web applications with React and Node.js",
      "Contributing to frontend architecture and component systems",
      "Debugging, optimizing, and maintaining existing codebases",
      "Collaborating closely with design and backend teams",
    ],
    current: true,
  },
  {
    id: 2,
    role: "Software Engineering Intern",
    company: "SquadMinds Private Limited",
    duration: "August 2025 — February 2026",
    type: "Internship",
    description:
      "Gained hands-on experience with professional development workflows, contributed to real client projects, and developed practical skills in React, Node.js, and MongoDB while learning from senior engineers.",
    highlights: [
      "Contributed to live client projects from day one",
      "Learned professional Git workflows and code review practices",
      "Built UI components and integrated REST APIs",
      "Developed understanding of full-stack application architecture",
    ],
    current: false,
  },
  {
    id: 3,
    role: "Bachelor of Computer Applications (BCA)",
    company: "Himachal Pradesh University",
    duration: "2022 — 2025",
    type: "Education",
    description:
      "Completed BCA with focus on computer science fundamentals, web technologies, database management, and software engineering principles. Built the foundation for practical software development.",
    highlights: [
      "Core programming, data structures, and algorithms",
      "Database management systems and SQL",
      "Web technologies and software engineering",
      "Final year project in web application development",
    ],
    current: false,
  },
];


export const projects = [
  {
    id: 1,
    title: "HireAI",
    subtitle: "AI-Powered Recruitment Platform",
    description:
      "An AI-powered recruitment platform designed to simplify hiring through intelligent candidate evaluation, streamlined recruitment workflows, and modern user experiences.",
    longDescription:
      "HireAI is a full-stack recruitment platform that helps streamline the hiring process using AI-powered capabilities. Built with modern web technologies, it focuses on improving recruitment efficiency, candidate management, and the overall hiring experience.",
    tech: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Gemini API",
    ],
    features: [
      "AI-powered recruitment workflows",
      "Candidate and job management",
      "Intelligent candidate evaluation",
      "Modern and responsive dashboard",
      "Scalable full-stack architecture",
    ],
    category: "Full Stack",
    image: "/projects/hire-ai.png",
    live: null,
    github: "https://github.com/TamishCodingHouse/HireAI",
    caseStudy: null,
    featured: true,
    color: "#8B5CF6",
  },
  {
    id: 2,
    title: "PowerFix",
    subtitle: "Electrical Services Management Platform",
    description:
      "A modern electrical services management platform built to simplify service operations, manage requests, and deliver a seamless experience for users and administrators.",
    longDescription:
      "PowerFix is a full-stack service management application designed to organize service-related workflows through a responsive interface, structured data management, and secure backend functionality.",
    tech: [
      "Next.js",
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "JWT",
      "Zod",
    ],
    features: [
      "Service request management",
      "Structured administrative workflows",
      "Form validation and data handling",
      "Secure authentication architecture",
      "Responsive and modern UI",
    ],
    category: "Full Stack",
    image: "/projects/powerfix.png",
    live: null,
    github: null,
    caseStudy: null,
    featured: true,
    color: "#F59E0B",
  },
  {
    id: 3,
    title: "Car Rental",
    subtitle: "Vehicle Rental Management Platform",
    description:
      "A responsive car rental platform where users can explore vehicles, browse listings, and submit rental requests through an intuitive interface.",
    longDescription:
      "The Car Rental project provides a user-friendly vehicle browsing experience with organized car listings and rental request workflows. Administrators can add vehicles, manage listings, and handle customer rental requests.",
    tech: [
      "React.js",
      "JavaScript",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
    ],
    features: [
      "Browse available rental vehicles",
      "Vehicle listing management",
      "Rental request handling",
      "Admin controls for managing cars",
      "Responsive design for all devices",
    ],
    category: "Full Stack",
    image: "/projects/car-rental.png",
    live: null,
    github: null,
    caseStudy: null,
    featured: true,
    color: "#06B6D4",
  },
];


export const skills = {
  frontend: [
    { name: "React", icon: "react", color: "#61DAFB", level: "professional" },
    { name: "JavaScript", icon: "javascript", color: "#F7DF1E", level: "professional" },
    { name: "HTML5", icon: "html5", color: "#E34F26", level: "professional" },
    { name: "CSS3", icon: "css3", color: "#1572B6", level: "professional" },
    { name: "Tailwind CSS", icon: "tailwindcss", color: "#06B6D4", level: "professional" },
    { name: "Bootstrap", icon: "bootstrap", color: "#7952B3", level: "professional" },
    { name: "Next.js", icon: "nextdotjs", color: "#000000", level: "professional" },
    { name: "React Router", icon: "reactrouter", color: "#CA4245", level: "professional" },
  ],
  backend: [
    { name: "Node.js", icon: "nodedotjs", color: "#339933", level: "professional" },
    { name: "Express.js", icon: "express", color: "#000000", level: "professional" },
    { name: "REST APIs", icon: "fastapi", color: "#009688", level: "professional" },
  ],
  database: [
    { name: "MongoDB", icon: "mongodb", color: "#47A248", level: "professional" },
    { name: "Mongoose", icon: "mongoose", color: "#880000", level: "professional" },
    { name: "SQL", icon: "mysql", color: "#4479A1", level: "professional" },
    { name: "PostgreSQL", icon: "postgresql", color: "#336791", level: "professional" },
  ],
  tools: [
    { name: "Git", icon: "git", color: "#F05032", level: "professional" },
    { name: "GitHub", icon: "github", color: "#181717", level: "professional" },
    { name: "VS Code", icon: "visualstudiocode", color: "#007ACC", level: "professional" },
    { name: "npm", icon: "npm", color: "#CB3837", level: "professional" },
    { name: "Postman", icon: "postman", color: "#FF6C37", level: "professional" },
    { name: "Figma", icon: "figma", color: "#F24E1E", level: "professional" },
    { name: "Vercel", icon: "vercel", color: "#000000", level: "professional" },
  ],
  learning: [
    { name: "TypeScript", icon: "typescript", color: "#3178C6", level: "learning" },
    { name: "Docker", icon: "docker", color: "#2496ED", level: "learning" },
    { name: "AWS", icon: "amazonaws", color: "#FF9900", level: "learning" },
    { name: "GraphQL", icon: "graphql", color: "#E10098", level: "learning" },
  ],
};

export const philosophyPoints = [
  {
    id: 1,
    icon: "Users",
    title: "User-Focused Development",
    description:
      "Every decision starts with the end user. I build interfaces that are intuitive, accessible, and genuinely pleasant to use — not just visually impressive.",
  },
  {
    id: 2,
    icon: "Code2",
    title: "Maintainable, Reusable Code",
    description:
      "I write code I'd be proud to come back to in six months. Clean components, consistent naming, thoughtful abstractions — code that scales without becoming a burden.",
  },
  {
    id: 3,
    icon: "Smartphone",
    title: "Responsive & Accessible by Default",
    description:
      "Responsive design and accessibility aren't afterthoughts — they're foundational. Every interface I build works beautifully across all devices and for all users.",
  },
  {
    id: 4,
    icon: "TrendingUp",
    title: "Continuous Learning",
    description:
      "The web platform evolves constantly. I stay current, pick up new tools thoughtfully, and apply learnings to solve real problems rather than chasing trends.",
  },
];

export const assistantKnowledge = {
  greeting: "Hi! I'm Vishal's portfolio assistant. Ask me anything about his skills, projects, experience, or how to get in touch.",
  suggestedQuestions: [
    "What technologies does Vishal work with?",
    "Tell me about his projects",
    "What's his work experience?",
    "How can I contact Vishal?",
    "Why hire Vishal for a frontend role?",
    "What is his education background?",
  ],
  responses: {
    who: {
      keywords: ["who", "about", "introduce", "tell me about", "vishal"],
      answer:
        "Vishal Deep is a Frontend Developer and MERN Stack Engineer based in Himachal Pradesh, India. He's currently working as an Associate Software Engineer at SquadMinds Private Limited, where he builds production-grade web applications. He completed his BCA from Himachal Pradesh University (2022–2025) and has a strong focus on clean architecture, modern frontend engineering, and creating great user experiences.",
    },
    skills: {
      keywords: ["skill", "technolog", "stack", "know", "use", "work with", "languages", "framework"],
      answer:
        "Vishal's core stack is React, JavaScript, Node.js, Express.js, and MongoDB (MERN). On the frontend he also works with Tailwind CSS, Bootstrap, Next.js, and React Router. For backend work, he builds REST APIs with Express.js. His tools include Git, GitHub, VS Code, Postman, Figma, and Vercel. He's actively learning TypeScript, Docker, and AWS.",
    },
    projects: {
      keywords: ["project", "built", "work", "portfolio", "application", "app", "build"],
      answer:
        "Vishal has built several notable projects: (1) DOT Compliance Platform — an enterprise compliance system with course management, payments, and admin dashboards. (2) PowerFix — a service management web application. (3) E-Mart — a full-featured e-commerce application. (4) Car Rental Platform — a vehicle browsing and booking application. (5) Various frontend UI experiments showcasing animations and responsive layouts.",
    },
    experience: {
      keywords: ["experience", "job", "work", "company", "role", "position", "career", "squadminds"],
      answer:
        "Vishal is currently an Associate Software Engineer at SquadMinds Private Limited (March 2026 – Present). Before that, he completed an internship at the same company (August 2025 – February 2026), where he contributed to real client projects and learned professional development workflows.",
    },
    education: {
      keywords: ["education", "degree", "university", "college", "study", "bca", "himachal"],
      answer:
        "Vishal holds a Bachelor of Computer Applications (BCA) from Himachal Pradesh University, completed in 2025. His studies covered programming fundamentals, data structures, database management, web technologies, and software engineering principles.",
    },
    contact: {
      keywords: ["contact", "reach", "email", "message", "hire", "connect", "get in touch"],
      answer:
        "You can reach Vishal through the contact form at the bottom of this page, or directly via email at vishaldeep@example.com. You'll also find links to his GitHub and LinkedIn profiles throughout the site. He's currently open to new opportunities!",
    },
    github: {
      keywords: ["github", "code", "repository", "repo", "open source"],
      answer:
        "You can find Vishal's code and repositories on GitHub. Look for the GitHub link in the hero section or the footer of this portfolio. His GitHub showcases his projects, contributions, and coding style.",
    },
    resume: {
      keywords: ["resume", "cv", "download", "pdf"],
      answer:
        "You can download Vishal's resume using the 'Download Resume' button in the hero section, or via the contact section at the bottom of the page. The resume covers his full experience, education, and technical skills.",
    },
    hire: {
      keywords: ["hire", "fit", "why", "good", "frontend", "mern", "role", "team", "suitable"],
      answer:
        "Vishal brings a strong combination of frontend expertise and full-stack capability. He has real production experience from SquadMinds, strong React and MERN skills, and a genuine focus on code quality, accessibility, and user experience. He's a fast learner, works well in teams, and takes ownership of his work. Whether you need a frontend specialist or a MERN stack developer, he can hit the ground running.",
    },
  },
};
