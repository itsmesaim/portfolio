export const projects = [
  {
    id: "meetx",
    title: "MeetX",
    tagline: "Real-Time Video Platform with AI",
    description:
      "Production-grade video conferencing with AI-powered transcription, session summaries, and an in-meeting Q&A chatbot.",
    images: [
      "/projects/meetx-1.png",
      "/projects/meetx-2.png",
      "/projects/meetx-3.png",
      "/projects/meetx-4.png",
    ],
    problem:
      "Most open-source video conferencing tools feel either basic or bloated. I wanted to push WebRTC beyond tutorials and build something with AI baked in — not bolted on as an afterthought.",
    whatIBuilt:
      "A full-stack platform with React/TypeScript on the frontend and Spring Boot (Java) on the backend. WebRTC + LiveKit handle real-time video. LangChain and LangSmith power transcription, AI session summaries, and an in-meeting Q&A chatbot, with every LLM call traced for evaluation.",
    unique:
      "Every LLM call is observable through LangSmith — most AI features ship as black boxes, mine show their work. Also using a Spring Boot backend instead of the usual Node.js stack, which gives proper thread safety for real-time signalling.",
    stack: [
      "React",
      "TypeScript",
      "Spring Boot",
      "WebRTC",
      "LiveKit",
      "WebSockets",
      "LangChain",
      "LangSmith",
      "Jest",
    ],
    live: "https://meetx.saimjs.com",
    github: "https://github.com/itsmesaim/meetX",
    status: "in-progress",
    featured: true,
    tier: 1,
  },
  {
    id: "6g-firewall",
    title: "AI Firewall — 6G Threat Detection",
    tagline: "MSc Dissertation · ML Network Security",
    description:
      "Simulated a smart city 6G network and trained ML models to detect cyber threats in real-time, with a human-in-the-loop review dashboard.",
    images: ["/projects/6g-firewall-1.png", "/projects/6g-firewall-2.png"],
    problem:
      "6G network security is largely uncharted — there are no production playbooks yet. I needed to model real attack vectors and build defences before the infrastructure even exists.",
    whatIBuilt:
      "An NS-3 (C++) simulation of a smart city 6G network with simulated attacks. Multiple ML models were trained and compared for threat classification, with a React dashboard plus WebSocket integration for real-time alerts and human-in-the-loop review.",
    unique:
      "Modelled a genuine agentic AI system — one that learns and improves from human operator decisions over time. The dashboard isn't just a viewer; it's part of the training loop.",
    stack: [
      "Python",
      "scikit-learn",
      "NS-3",
      "C++",
      "React",
      "WebSockets",
      "Jupyter",
      "pandas",
      "numpy",
    ],
    github: "https://github.com/itsmesaim/AI-firewall",
    status: "academic",
    featured: true,
    tier: 1,
  },
  {
    id: "ir-system",
    title: "Information Retrieval System",
    tagline: "NLP Pipeline · Vector Space Model",
    description:
      "Full document retrieval engine built from scratch — TF-IDF matrix, inverted index, cosine similarity ranking, and a complete NLP preprocessing pipeline.",
    images: ["/projects/ir-system-1.png"],
    problem:
      "Most developers use search APIs without understanding how they work. I wanted to build retrieval from first principles so I'd actually own the knowledge — not just call elasticsearch.",
    whatIBuilt:
      "A Python retrieval engine with full NLP preprocessing (tokenization, stopwords, lemmatization via NLTK + spaCy), TF-IDF matrix construction, inverted index, and cosine similarity ranking — all written from scratch with scikit-learn primitives.",
    unique:
      "No black-box search libraries. Every component — from text cleaning to ranking — was implemented manually, so I can explain and modify every part of the pipeline.",
    stack: [
      "Python",
      "scikit-learn",
      "NLTK",
      "spaCy",
      "TF-IDF",
      "pandas",
      "numpy",
      "Jupyter",
    ],
    github: "https://github.com/itsmesaim/Retrevial_System",
    status: "academic",
    featured: true,
    tier: 1,
  },
  {
    id: "cipherhealth",
    title: "CipherHealth",
    tagline: "Blockchain Hospital Management",
    description:
      "Angular frontend for a hospital management system with Ethereum blockchain for tamper-proof patient data storage and wallet transactions.",
    images: ["/projects/cipherhealth-1.png"],
    problem:
      "Hospital records get tampered with, lost, or held hostage by ransomware. Traditional databases give one party god-mode access. I wanted to test whether blockchain could actually solve healthcare data integrity in practice.",
    whatIBuilt:
      "A full Angular frontend for patient registration, appointment booking, and medical records, integrated with Ethereum via Ganache. All record changes are written to the blockchain as immutable transactions tied to wallet addresses.",
    unique:
      "Most blockchain healthcare projects are slide decks. This was a working prototype where clinical staff could navigate without training and every record change had a cryptographic audit trail.",
    stack: [
      "Angular",
      "Ethereum",
      "Ganache",
      "Web3.js",
      "TypeScript",
      "Node.js",
    ],
    status: "academic",
    featured: false,
    tier: 2,
  },
  {
    id: "pong-mern",
    title: "PONG-MERN",
    tagline: "Real-Time Multiplayer Game",
    description:
      "Cross-continent multiplayer Pong with AI opponent mode, dynamic ball physics, and mobile touch controls. Zero login required.",
    images: ["/projects/pong-1.png"],
    problem:
      "I wanted to deeply understand real-time state synchronization. Keeping two clients in sync across latency is one of those problems that sounds simple until you build it.",
    whatIBuilt:
      "A React frontend with a Node.js/Express backend and Socket.IO for real-time sync. Custom game loop with delta-time physics, shared room IDs for matchmaking, mobile touch controls, and an AI opponent mode for solo play.",
    unique:
      "Zero login required — you generate a room code, share it, and play. No accounts, no friction. Plays smoothly across continents thanks to client-side prediction.",
    stack: ["React", "Node.js", "Socket.IO", "Express", "CSS3"],
    github: "https://github.com/itsmesaim/PONG-MERN",
    status: "live",
    featured: false,
    tier: 2,
  },
  {
    id: "fastapi-f1",
    title: "F1 Racing Data Platform",
    tagline: "FastAPI Backend",
    description:
      "Backend platform for Formula 1 racing data with full REST API, JWT auth, and auto-generated OpenAPI docs.",
    images: ["/projects/f1-1.png"],
    problem:
      "Wanted to properly learn Python backend development — auth flows, structured routing, database modelling — using a domain I actually enjoy (F1).",
    whatIBuilt:
      "A FastAPI + SQLite backend serving F1 race data, drivers, and constructor info. JWT auth, Pydantic models, structured routing, and auto-generated OpenAPI documentation.",
    unique:
      "Clean Pydantic-first design — every endpoint has full type safety end-to-end, and the OpenAPI docs are good enough to ship as the actual API reference.",
    stack: ["FastAPI", "Python", "SQLite", "JWT", "Pydantic", "OpenAPI"],
    github: "https://github.com/itsmesaim/F1",
    status: "live",
    featured: false,
    tier: 2,
  },
  {
    id: "task-manager",
    title: "Task Management API",
    tagline: "FastAPI Backend",
    description:
      "Production-style task management backend with user accounts, task hierarchies, and full CRUD with auth.",
    images: ["/projects/task-manager-1.png"],
    problem:
      "Every task management tool I've used has weird limitations. I wanted to build a backend that handles real edge cases — subtasks, ownership transfers, soft deletes — properly.",
    whatIBuilt:
      "A FastAPI + SQLite backend with full user authentication, task CRUD, hierarchical subtasks, and soft-delete recovery. JWT-based auth with refresh tokens and proper role separation.",
    unique:
      "Soft delete with recovery window means nothing is ever really lost. Built-in audit trail for every task change.",
    stack: ["FastAPI", "Python", "SQLite", "JWT", "Pydantic", "SQLAlchemy"],
    github: "https://github.com/itsmesaim/task-manager",
    status: "live",
    featured: false,
    tier: 2,
  },
  {
    id: "financial-management",
    title: "Financial Management App",
    tagline: "FastAPI Backend",
    description:
      "Personal finance backend tracking income, expenses, and budgets with category analytics.",
    images: ["/projects/financial-1.png"],
    problem:
      "Wanted a finance tracker that wasn't a spreadsheet or a creepy app that sells data. Built my own backend that I fully own.",
    whatIBuilt:
      "A FastAPI + SQLite backend tracking transactions across categories with monthly aggregates, budget targets, and a clean REST API ready to plug into any frontend.",
    unique:
      "Schema is designed around how money actually flows — recurring transactions, planned vs actual budgets, and rollover handling for shared expenses.",
    stack: ["FastAPI", "Python", "SQLite", "JWT", "Pydantic"],
    github: "https://github.com/itsmesaim/Finaicial-management",
    status: "live",
    featured: false,
    tier: 2,
  },
  {
    id: "freelance",
    title: "15+ Client Projects",
    tagline: "Freelance · 2022 – Present",
    description:
      "Real-world delivery for paying clients: billing systems for restaurants, inventory management tools, marketing sites, and WordPress builds — all deployed and live.",
    images: ["/projects/freelance-1.png"],
    problem:
      "Tutorial projects don't teach you what happens when a real business depends on the code. Started freelancing to learn what 'production' actually means.",
    whatIBuilt:
      "Full-stack delivery on 15+ paying projects: React/Node frontends, AWS or VPS deployments with proper SSL and CI/CD, plus LLM integrations for client workflow automation. One client's marketing site directly drove 15% of new customer acquisitions in its launch period.",
    unique:
      "Every project shipped to production with real users — billing systems that handle real money, inventory tools that affect real stock counts. No demos, only live systems.",
    stack: ["React", "Node.js", "AWS", "WordPress", "MySQL", "Docker", "CI/CD"],
    status: "live",
    featured: false,
    tier: 3,
  },
];
