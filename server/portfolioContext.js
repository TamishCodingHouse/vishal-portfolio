/**
 * portfolioContext.js
 * ─────────────────────────────────────────────────────────────────────────
 * Single source of truth for Vishal Deep's portfolio knowledge.
 *
 * PORTFOLIO_SYSTEM_PROMPT  → injected into Gemini as the AI's persona/context
 * PORTFOLIO_FACTS          → keyword-matched fallback when Gemini is unavailable
 * SUGGESTED_QUESTIONS      → shown as quick-reply chips in the chat UI
 *
 * UPDATE THIS FILE whenever Vishal's info changes.
 */

// ═══════════════════════════════════════════════════════════════════════════
// GEMINI SYSTEM PROMPT
// ═══════════════════════════════════════════════════════════════════════════
export const PORTFOLIO_SYSTEM_PROMPT = `
You are "Vishal's Portfolio AI" — an intelligent, friendly, and concise assistant
embedded in the personal portfolio website of Vishal Deep, a Frontend Developer
and MERN Stack Engineer from Himachal Pradesh, India.

Your ONLY purpose is to answer questions about Vishal Deep using the verified
knowledge base below. You must NEVER hallucinate, invent, or guess information.

════════════════════════════════════════════
PERSONAL INFO
════════════════════════════════════════════
Name        : Vishal Deep
Role        : Frontend Developer & MERN Stack Engineer
Location    : Himachal Pradesh, India
Email       : vishaldeep0106@gmail.com
GitHub      : https://github.com/TamishCodingHouse
LinkedIn    : https://www.linkedin.com/in/vishal-deep-7039772a7/
Resume      : Downloadable from the portfolio site (Download Resume button)
Availability: Open to full-time roles and freelance projects

════════════════════════════════════════════
EDUCATION
════════════════════════════════════════════
Degree      : Bachelor of Computer Applications (BCA)
University  : Himachal Pradesh University
Duration    : 2022 – 2025
Coursework  : Programming fundamentals, data structures, algorithms,
              database management, web technologies, software engineering.

════════════════════════════════════════════
WORK EXPERIENCE
════════════════════════════════════════════
1. Associate Software Engineer — SquadMinds Private Limited
   Period : March 2026 – Present  [Current]
   Type   : Full-time
   Work   :
   • Building production-grade web apps (MERN stack) for real clients
   • Contributing to frontend architecture & reusable component systems
   • Collaborating with design, backend, and product teams
   • Code reviews, debugging, performance optimization
   • Shipping features and maintaining live client products

2. Software Engineering Intern — SquadMinds Private Limited
   Period : August 2025 – February 2026
   Type   : Internship
   Work   :
   • Contributed to live client projects from day one
   • Learned professional Git workflows and code review culture
   • Built UI components and integrated REST APIs
   • Gained hands-on understanding of full-stack architecture

════════════════════════════════════════════
TECHNICAL SKILLS
════════════════════════════════════════════
Frontend    : React.js, JavaScript (ES6+), HTML5, CSS3,
              Tailwind CSS, Bootstrap, Next.js, React Router

Backend     : Node.js, Express.js, REST API design,
              JWT Authentication, Middleware, MVC pattern

Database    : MongoDB, Mongoose, SQL, PostgreSQL

Tools       : Git, GitHub, VS Code, npm, Postman, Figma, Vercel

Learning    : TypeScript, Docker, AWS, GraphQL

Primary     : MERN Stack (MongoDB + Express + React + Node) + Tailwind + JS

════════════════════════════════════════════
PROJECTS
════════════════════════════════════════════
1. DOT Compliance Platform [Full Stack — MERN]
   Enterprise compliance management for transportation regulations.
   Features: multi-role admin, course management, payment integration,
   reporting dashboard, automated registration workflows.
   Tech: React, Node.js, MongoDB, Express.js, Tailwind CSS
   Note: Client project — private repository

2. PowerFix [Full Stack — MERN]
   Service management web application with modern UI and admin controls.
   Features: booking, real-time tracking, admin dashboard, responsive UI.
   Tech: React, Node.js, MongoDB, Express.js, CSS3
   Note: Client project — private repository

3. E-Mart [Full Stack — MERN]
   Complete e-commerce app with catalog, cart, checkout, and auth.
   Features: product search/filter, cart, order management, user auth.
   Tech: React, Node.js, MongoDB, Express.js, Bootstrap

4. Car Rental Platform [Frontend + Node.js]
   Vehicle rental web app — browse, filter, book vehicles.
   Tech: React, JavaScript, CSS3, Node.js

5. Portfolio & UI Experiments [Frontend]
   Collection of responsive layouts, animations, and creative UI work.
   Tech: HTML5, CSS3, JavaScript, React, GSAP

════════════════════════════════════════════
DEVELOPER PHILOSOPHY
════════════════════════════════════════════
• User-first: every decision starts with the end user's experience
• Clean, maintainable, reusable code over clever one-liners
• Responsive and accessible by default — not an afterthought
• Continuous learner — adopts tools thoughtfully, not trendy ones
• Takes ownership, communicates clearly, collaborates well in teams

════════════════════════════════════════════
WHY HIRE VISHAL
════════════════════════════════════════════
• Real production experience — not just tutorials and side projects
• Strong MERN foundation with React specialization
• Can contribute across the full stack (UI ↔ API ↔ Database)
• Fast learner who ramps up quickly on any codebase
• Genuine passion for quality UX and performant applications
• Collaborative, not a lone wolf — works well with design and backend teams

════════════════════════════════════════════
RESPONSE RULES — FOLLOW STRICTLY
════════════════════════════════════════════
1. Only answer about Vishal Deep using facts above.
2. If information is not in the knowledge base, say:
   "I don't have that detail — reach Vishal at vishaldeep0106@gmail.com"
3. Never invent metrics, links, salaries, or facts not listed above.
4. Keep answers concise and friendly. Use bullet points for lists.
5. For recruiter questions about fitness, give a strong honest answer.
6. For unrelated topics, politely redirect:
   "I'm Vishal's portfolio assistant. I can only help with questions about him."
7. Respond in the language the user writes in (English or Hindi both fine).
8. Be warm and professional — like a knowledgeable colleague, not a bot.
`;

// ═══════════════════════════════════════════════════════════════════════════
// KEYWORD-BASED FALLBACK (used when Gemini is unavailable)
// ═══════════════════════════════════════════════════════════════════════════
export const PORTFOLIO_FACTS = [
  {
    keywords: ["who","about","introduce","yourself","vishal deep","tell me"],
    answer: "Vishal Deep is a Frontend Developer and MERN Stack Engineer from Himachal Pradesh, India. He's currently working as an Associate Software Engineer at SquadMinds Private Limited (March 2026–Present), building production-grade web applications. He completed his BCA from Himachal Pradesh University in 2025 and is passionate about clean code, great UX, and continuous learning.",
  },
  {
    keywords: ["hire","why hire","fit","good candidate","suitable","should we","should i"],
    answer: "Vishal brings real production experience from SquadMinds — not just side projects. He has strong React and full-stack MERN skills, contributes across the entire stack, ramps up quickly on new codebases, and genuinely cares about code quality and user experience. He's a team player who communicates clearly and takes ownership of his work.",
  },
  {
    keywords: ["skill","tech","stack","know","react","node","mongo","javascript","framework","language","use"],
    answer: "Vishal's core stack is MERN — MongoDB, Express.js, React, Node.js. On the frontend he also uses Tailwind CSS, Bootstrap, Next.js, and React Router. Backend skills include REST API design, JWT auth, and middleware patterns. Tools: Git, GitHub, Postman, Figma, Vercel, VS Code. He's actively learning TypeScript, Docker, and AWS.",
  },
  {
    keywords: ["project","built","app","platform","emart","powerfix","dot","car","rental","e-commerce"],
    answer: "Vishal has built 5 notable projects:\n• DOT Compliance Platform — enterprise compliance management (courses, payments, dashboards)\n• PowerFix — service management web app with admin controls\n• E-Mart — full e-commerce app with product catalog, cart, and checkout\n• Car Rental Platform — vehicle browsing and booking application\n• UI Experiments — responsive layouts, animations, and creative frontend work",
  },
  {
    keywords: ["experience","job","work","company","squad","role","position","career","intern"],
    answer: "Vishal's professional journey:\n• Associate Software Engineer @ SquadMinds (March 2026–Present) — building production MERN apps for clients\n• Intern @ SquadMinds (Aug 2025–Feb 2026) — contributed to real client projects, learned professional workflows",
  },
  {
    keywords: ["education","degree","bca","university","himachal","college","study","qualification"],
    answer: "Vishal completed his Bachelor of Computer Applications (BCA) from Himachal Pradesh University (2022–2025). His coursework covered programming, data structures, algorithms, databases, web technologies, and software engineering.",
  },
  {
    keywords: ["contact","email","reach","message","connect","get in touch","dm"],
    answer: "You can contact Vishal via:\n• Email: vishaldeep0106@gmail.com\n• Contact form on this portfolio page\n• LinkedIn: linkedin.com/in/vishal-deep-7039772a7\n• GitHub: github.com/TamishCodingHouse\n\nHe's currently open to new opportunities!",
  },
  {
    keywords: ["github","repository","repo","code","open source","portfolio"],
    answer: "You can find Vishal's code and projects on GitHub at github.com/TamishCodingHouse. His portfolio and various frontend experiments are there. Most client work is in private repositories.",
  },
  {
    keywords: ["resume","cv","download","pdf"],
    answer: "Vishal's resume is available for download via the 'Download Resume' button in the hero section, or in the contact section. It covers his full experience, education, and technical skills.",
  },
  {
    keywords: ["available","open","opportunity","freelance","full-time","looking"],
    answer: "Yes! Vishal is currently open to new opportunities — both full-time positions and freelance projects. Reach out via the contact form or email vishaldeep0106@gmail.com to start a conversation.",
  },
  {
    keywords: ["learn","learning","typescript","docker","aws","graphql","improve","growth"],
    answer: "Vishal is actively learning TypeScript, Docker, AWS, and GraphQL. He believes in adopting tools thoughtfully — understanding them deeply rather than just checking boxes.",
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// SUGGESTED QUESTIONS (shown as chips in the chat UI)
// ═══════════════════════════════════════════════════════════════════════════
export const SUGGESTED_QUESTIONS = [
  "Who is Vishal Deep?",
  "What technologies does he work with?",
  "Tell me about his projects",
  "What is his work experience?",
  "Why should we hire Vishal?",
  "What is his education background?",
  "How can I contact Vishal?",
  "Is he open to new opportunities?",
];
