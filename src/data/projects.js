export const projects = [
  {
    id: "jobradar-ai",
    title: "JobRadar AI",
    tagline: "AI-Powered Job Search Copilot",
    description:
      "Full-stack job-hunting platform that crawls live listings, rates fit against your CV with a calibrated LLM pipeline, and turns strong matches into ATS-screened apply packs, tracked on a Kanban board.",
    images: [
      "/projects/JobRadarAI-1.webp",
      "/projects/JobRadarAI-2.webp",
      "/projects/JobRadarAI-3.webp",
    ],
    problem:
      "Job hunting means scanning hundreds of listings to find the ones actually worth your time, then losing track of who you applied to and why. Generic skill-overlap scores waste time on categorically wrong roles, and writing a tailored CV for every decent match is its own second job. I wanted a system that filters honestly, remembers my corrections, and drafts the application, not just ranks job titles.",
    whatIBuilt:
      "A FastAPI + React/TypeScript app where you upload a CV once (PDF, Word, ODT, text, or LaTeX), set role, location, work-mode, and visa preferences, and the system crawls Jooble and JobsAPI (Indeed) in parallel. Each posting is rated 1-10 against the parsed CV with structured Pydantic output: score, matched strengths, essential vs preferred gaps, a verdict, auto-reject, and tailoring tips. Obvious mismatches never hit the LLM. A cosine-similarity pre-filter scores them cheaply. Surviving JDs are chunked into FAISS so the model reads the relevant parts of long postings instead of a truncated dump. You can star-rate the rating and leave a note; those corrections are retrieved as calibration context the next time a similar job is scored. Strong matches (6+) can generate an apply pack over SSE: a real three-call loop (draft, independent ATS critique, one bounded revision) that rewrites existing CV bullets in Google XYZ format and a structured cover letter, without inventing metrics. Every job moves through a Kanban pipeline from New to Saved to Applied to Interviewing to Offer or Rejected. Freemium quotas, an admin model catalog, GDPR-style data export/delete, and EU-default LLM routing (Mistral) sit underneath.",
    unique:
      "Split LLM layer: CV parsing and bulk rating can run on different providers (Ollama, OpenAI, xAI, Mistral, DeepSeek) via env plus a per-user Settings picker, with LangSmith tracing on every call. Embeddings pre-filter, FAISS RAG, and user-calibration form a closed loop so the model gets cheaper, more consistent, and less same-stack-wrong-job. The prompt and hard post-processing separate categorical disqualifiers (IC vs management, junior vs senior, domain-as-core, visa/sponsorship) from gradable skill gaps; 2+ Essential gaps clamp the score to 6. Apply packs are a second pipeline, not a one-shot prompt: an ATS critic that did not write the draft tries to reject it, then a revision pass fixes only what was flagged.",
    stack: [
      "FastAPI",
      "React",
      "TypeScript",
      "MongoDB",
      "LangChain",
      "LangSmith",
      "FAISS",
      "Pydantic",
      "Ollama",
      "OpenAI",
      "Mistral",
      "xAI",
      "Jooble API",
      "JobsAPI (Indeed)",
    ],
    live: "https://jobradar.saimjs.com",
    github: "https://github.com/itsmesaim/jobRadarAI",
    status: "live",
    hasImages: true,
  },
  {
    id: "6g-firewall",
    title: "AI Firewall: 6G Threat Detection",
    tagline: "MSc Dissertation · ML Network Security",
    description:
      "Simulated a smart city 6G network and trained ML models to detect cyber threats in real-time, with a human-in-the-loop review dashboard.",
    images: ["/projects/6gfirewall-1.webp", "/projects/6gfirewall-2.webp"],

    problem:
      "6G network security is largely uncharted. There are no production playbooks yet. I needed to model real attack vectors and build defences before the infrastructure even exists.",
    whatIBuilt:
      "An NS-3 (C++) simulation of a smart city 6G network with simulated attacks. Multiple ML models were trained and compared for threat classification, with a React dashboard plus WebSocket integration for real-time alerts and human-in-the-loop review.",
    unique:
      "Modelled a genuine agentic AI system, one that learns and improves from human operator decisions over time. The dashboard isn't just a viewer; it's part of the training loop.",
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
    hasImages: true,
  },
  {
    id: "meetx",
    title: "MeetX",
    tagline: "Real-Time Video Platform with AI",
    description:
      "Production-grade video conferencing with AI-powered transcription, session summaries, and an in-meeting Q&A chatbot.",
    images: [
      "/projects/meetx-1.webp",
      "/projects/meetx-2.webp",
      "/projects/meetx-3.webp",
      "/projects/meetx-4.webp",
      "/projects/meetx-5.webp",
    ],
    problem:
      "Most open-source video conferencing tools feel either basic or bloated. I wanted to push WebRTC beyond tutorials and build something with AI baked in, not bolted on as an afterthought.",
    whatIBuilt:
      "A full-stack platform with React/TypeScript on the frontend and Spring Boot (Java) on the backend. WebRTC + LiveKit handle real-time video. LangChain and LangSmith power transcription, AI session summaries, and an in-meeting Q&A chatbot, with every LLM call traced for evaluation.",
    unique:
      "Every LLM call is observable through LangSmith. Most AI features ship as black boxes; mine show their work. Also using a Spring Boot backend instead of the usual Node.js stack, which gives proper thread safety for real-time signalling.",
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
    hasImages: true,
  },
  {
    id: "memon-cloth-store",
    title: "Memon Cloth Store",
    tagline: "Freelance · Full-Stack E-Commerce for a Family Clothing Business",
    description:
      "Complete online store rebuild for a real Mumbai clothing shop: Next.js storefront, standalone React admin panel, and an Express/MongoDB API tying together payments, shipping, and email, all deployed on a self-managed VPS.",
    images: [
      "/projects/MemonClothStore-1.webp",
      "/projects/MemonClothStore-2.webp",
      "/projects/MemonClothStore-3.webp",
    ],
    problem:
      "A local clothing store needed to move online, but not with a templated store builder. Products come in multiple colors with independent pricing/stock/photos per variant, customers wanted to know when sold-out items were back, and the owner needed a way to run their own marketing without hiring anyone.",
    whatIBuilt:
      "A three-app architecture: a Next.js 16 App Router storefront with server actions for auth, orders, and payments; a Vite + React admin panel for inventory, orders, and shipping; and a shared Express + MongoDB API. Products support per-color variants with independent images, stock, and price overrides, editable inline in the admin form rather than through a separate screen. Razorpay handles payments, Shiprocket handles fulfillment with live webhook-driven status updates, and Cloudinary hosts all product imagery. Customers get transactional emails at every order milestone (confirmed, shipped, out for delivery, delivered) plus opt-in back-in-stock alerts on sold-out items. The admin panel includes a marketing email tool with test sends and unsubscribe compliance, and a moderation queue so customer reviews (including photos) are checked before going live.",
    unique:
      "On-demand ISR revalidation between the two frontends: a webhook from the API tells the Next.js storefront exactly which cached pages to drop the moment an admin edits a product, so changes go live in seconds instead of waiting for a timed rebuild. Deployed and operated end-to-end on a self-managed CloudPanel VPS, including migrating live production data between MongoDB Atlas and a self-hosted instance with zero downtime.",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Express",
      "MongoDB",
      "Vite",
      "Razorpay",
      "Shiprocket API",
      "Cloudinary",
      "Nodemailer",
      "Google OAuth",
    ],
    live: "https://memonclothstore.com",
    github: "https://github.com/anaskapadia24/memon-cloth-store",
    status: "live",
    hasImages: true,
  },

  {
    id: "diabeto-predict",
    title: "Diabeto Predict",
    tagline: "ML-Powered Diabetes Risk Screening",
    description:
      "A full-stack health screening app with a React questionnaire frontend and a Flask REST API that runs a scikit-learn model trained on the Pima Indians diabetes dataset.",
    images: [
      "/projects/diabeto-1.webp",
      "/projects/diabeto-2.webp",
      "/projects/diabeto-3.webp",
    ],
    problem:
      "Most people don't know their clinical diabetes markers (glucose, insulin, skin fold thickness), but early awareness matters. I wanted a tool that asks simple lifestyle questions and still feeds a real ML model, without requiring a lab visit first.",
    whatIBuilt:
      "A React + Flask application with an 8-step wizard that maps everyday answers to Pima dataset features. The Flask API exposes POST /predict, loads a pickled LogisticRegression model, and returns a risk result with tailored prevention guidance. The model was trained on raw clinical features (~70% test accuracy) and the full request path is documented in the README.",
    unique:
      "Non-medical inputs become clinical features: glucose estimated from meal timing, insulin from post-meal symptoms, skin thickness from physical descriptions, so lay users can drive a real backend ML pipeline. Mobile-first UI with a progress wizard, not a single long form.",
    stack: [
      "React",
      "Vite",
      "Flask",
      "Python",
      "scikit-learn",
      "pandas",
      "REST API",
      "LogisticRegression",
    ],
    live: "https://diabetio.saimjs.com",
    github: "https://github.com/itsmesaim/diabetic_prediction",
    status: "completed",
    hasImages: true,
  },

  {
    id: "pong-mern",
    title: "PONG-MERN",
    tagline: "Real-Time Multiplayer Pong",
    description:
      "Server-authoritative multiplayer Pong with optional accounts, persistent stats, power-up orbs, and reconnect grace handling. Deployed live at pong.saimjs.com.",
    images: [
      "/projects/pong-1.webp",
      "/projects/pong-2.webp",
      "/projects/pong-3.webp",
      "/projects/pong-4.webp",
      "/projects/pong-5.webp",
    ],
    problem:
      "I wanted to properly understand server-authoritative game state not just syncing two clients, but building a system where the server owns the physics, validates all input, and handles the messy real-world stuff like dropped connections mid-game.",
    whatIBuilt:
      "A shared 60Hz server loop runs physics across all active rooms simultaneously. Swept collision detection prevents fast balls tunneling through paddles. Friend matches pause on disconnect and give the player 10 seconds to reconnect and reclaim their seat via a stable clientId. If they don't return, a walkover is recorded in MongoDB. Power-up orbs spawn mid-rally and apply randomised effects: speed boost with a telegraph warning, curve spin, or opponent paddle shrink. Optional JWT accounts persist win/loss records, match history, and a global leaderboard. AI mode runs client-side and reports results to the same stats pipeline.",
    unique:
      "Two visual themes (neon arcade and phosphor green) toggle from the header. The canvas reads CSS variables live so the entire game:  paddles, ball, scores, orbs : recolours instantly. On mobile the board rotates vertical with remapped touch input. Deployed with the API on a separate subdomain under pm2 and the static frontend served directly by Nginx.",
    stack: [
      "React",
      "Node.js",
      "Socket.IO",
      "Express",
      "MongoDB",
      "JWT",
      "Canvas API",
      "Nginx",
      "pm2",
    ],
    github: "https://github.com/itsmesaim/PONG-MERN",
    live: "https://pong.saimjs.com",
    status: "live",
    hasImages: true,
  },

  {
    id: "ir-system",
    title: "Information Retrieval System",
    tagline: "NLP Pipeline · Vector Space Model",
    description:
      "Full document retrieval engine built from scratch: TF-IDF matrix, inverted index, cosine similarity ranking, and a complete NLP preprocessing pipeline.",
    images: ["/projects/ir-system-1.png"],
    problem:
      "Most developers use search APIs without understanding how they work. I wanted to build retrieval from first principles so I'd actually own the knowledge, not just call elasticsearch.",
    whatIBuilt:
      "A Python retrieval engine with full NLP preprocessing (tokenization, stopwords, lemmatization via NLTK + spaCy), TF-IDF matrix construction, inverted index, and cosine similarity ranking, all written from scratch with scikit-learn primitives.",
    unique:
      "No black-box search libraries. Every component, from text cleaning to ranking, was implemented manually, so I can explain and modify every part of the pipeline.",
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
  },

  {
    id: "f1-stats-manager",
    title: "F1 Stats Manager",
    tagline: "MSc Cloud Assignment · Public read, protected write",
    description:
      "One of three MSc cloud assignments. Full-stack F1 stats app where guests browse, filter, and compare drivers and teams, while authenticated users manage the database. Built with FastAPI, Firebase Auth, and Cloud Firestore.",
    images: [
      "/projects/F1-home.webp",
      "/projects/F1-query-driver.webp",
      "/projects/F1-driver-detail.webp",
      "/projects/F1-compare-drivers.webp",
      "/projects/F1-compare-teams.webp",
      "/projects/F1-add-driver.webp",
    ],
    problem:
      "Sports stats apps are often either static pages you can't update, or admin tools with no public browse experience. I wanted one place to store F1 driver and team records, let anyone query and compare them, and only allow writes after a real login. Same guest-vs-editor split you see in real products.",
    whatIBuilt:
      "A FastAPI server-rendered app (Jinja2 + dark F1-themed UI) backed by Google Cloud Firestore. Users sign up and log in with Firebase email/password; the client stores the ID token in a cookie, and the server validates it before any create, update, or delete. Guests can still search drivers and teams with numeric filters (<, ==, >) on stats like wins, poles, titles, and age; open detail pages; and compare two drivers or two teams side-by-side. Logged-in users add teams, register drivers against an existing team dropdown, edit stats after a race weekend, and delete bad records. Duplicate names are blocked on write so the registry stays clean.",
    unique:
      "Clear permission boundary: public read/query/compare, protected mutations. Enforced both in the UI (Add buttons disabled until login) and on the server (Firebase token verification on every write). Built as a cloud assignment stack end to end: FastAPI routes, Firebase Auth, Firestore CRUD, and App Engine-style deployment readiness, with an F1 domain that makes CRUD feel like managing a real season database rather than todos.",
    stack: [
      "FastAPI",
      "Python",
      "Jinja2",
      "Firebase Auth",
      "Cloud Firestore",
      "Google Cloud",
      "HTML/CSS",
      "JavaScript",
    ],
    github: "https://github.com/itsmesaim/F1",
    status: "coursework",
    hasImages: true,
  },
  {
    id: "collab-taskboards",
    title: "Collab TaskBoards",
    tagline: "MSc Cloud Assignment · Shared boards, owner controls",
    description:
      "One of three MSc cloud assignments. Full-stack collaborative task management app where users create boards, assign tasks with due dates, share boards with teammates, and track completion. Built with FastAPI, a server-rendered UI, and Google Cloud Firestore.",
    images: [
      "/projects/taskboards-login.webp",
      "/projects/taskboards-list.webp",
      "/projects/taskboards-details.webp",
      "/projects/taskboards-create.webp",
    ],
    problem:
      "Group projects fall apart when to-dos live in chats, notes, and memory. I wanted a single place where a team can own boards, share access, assign work, and see what is done, without a heavy third-party tool.",
    whatIBuilt:
      "A FastAPI web app with Jinja2/Bootstrap UI and Firebase email/password authentication. After login, the Firebase ID token is stored in a cookie and verified server-side on every protected route. Users create task boards, add tasks (title, description, due date, multi-assignee), toggle completion with timestamps, and edit or delete work. Board owners can invite other registered users, remove collaborators (including cleaning them off assigned tasks), rename boards, and delete boards only when empty of tasks and shares. Firestore stores users, boards, and tasks with document references for board membership and assignments. The home view merges owned and shared boards so collaborators always see the same workspaces.",
    unique:
      "Clear ownership model: only the board owner can manage membership, rename, or delete the board, while owners and shared users can create and update tasks. Delete is gated until tasks and shared users are removed. Duplicate task titles are rejected per board. Unassigned tasks are visually flagged, and completion tracks when work finished. Small product rules that make the collaboration story real, not just CRUD.",
    stack: [
      "FastAPI",
      "Python",
      "Jinja2",
      "Bootstrap",
      "Firebase Authentication",
      "Google Cloud Firestore",
      "JavaScript",
      "Uvicorn",
    ],
    github: "https://github.com/itsmesaim/task-management",
    status: "coursework",
    hasImages: true,
  },
  {
    id: "postnow-instaclone",
    title: "PostNow",
    tagline: "MSc Cloud Assignment · Follow graph, feed, Cloud Storage",
    description:
      "One of three MSc cloud assignments. Full-stack Instagram-style mini social network: Firebase Auth login, Firestore users/posts/comments, Cloud Storage for images, and a personalized feed of you plus people you follow. Built with FastAPI, Jinja2, and Google Cloud.",
    images: [
      "/projects/postnow-login.webp",
      "/projects/postnow-feed.webp",
      "/projects/postnow-profile.webp",
      "/projects/postnow-create.webp",
      "/projects/postnow-search.webp",
      "/projects/postnow-followers.webp",
    ],
    problem:
      "Most todo CRUD demos never touch real product problems: who can see what, how identity works, how media lives outside the DB, and how a feed is built from relationships. I wanted one app that forces those lessons: login, profiles, follow graph, image posts, comments, and a timeline, on a real cloud stack.",
    whatIBuilt:
      "A FastAPI server-rendered social app (Jinja2 + Poppins UI) backed by Cloud Firestore and Cloud Storage. Users sign up and log in with Firebase email/password; the client stores the Firebase ID token in a cookie, and the server verifies it before any protected action. Logged-in users get a home feed of their own posts plus posts from people they follow (newest first, capped at 50). They can search users by name, open profiles, follow/unfollow, create image+caption posts (PNG/JPG uploaded to a public GCS bucket), and comment on posts (max 200 chars, first 5 shown with expand for the rest). First login auto-creates a User document with empty followers/following maps.",
    unique:
      "Not a public guest browse app. The product is the logged-in social graph. No token means no feed, search, post, follow, or comment. The UI shows login; the server re-checks the cookie on every write. End-to-end GCP assignment shape: FastAPI routes, Firebase Auth, Firestore CRUD plus comment subcollections, Cloud Storage for media, relationship maps for follow, and App Engine-style deploy readiness. Domain feels like a mini Instagram, not a generic form demo.",
    stack: [
      "FastAPI",
      "Python",
      "Jinja2",
      "Firebase Auth",
      "Cloud Firestore",
      "Cloud Storage",
      "Google Cloud",
      "HTML/CSS",
      "JavaScript",
    ],
    github: "https://github.com/itsmesaim/instaClone",
    status: "coursework",
    hasImages: true,
  },
  {
    id: "aeroflow-airport",
    title: "AeroFlow",
    tagline: "Airport ops: search, book, check-in, board",
    description:
      "Full-stack airport management system: JWT role-based login (passenger / staff / admin), flight search and booking with seat maps, QR boarding passes, staff check-in, group boarding queues, gate assignment, and live Socket.io updates. Express, MongoDB, jQuery, and Bootstrap.",
    images: [
      "/projects/aeroflow-flights.webp",
      "/projects/aeroflow-pass.webp",
      "/projects/aeroflow-checkin.webp",
      "/projects/aeroflow-boarding.webp",
      "/projects/aeroflow-gates.webp",
      "/projects/aeroflow-analytics.webp",
    ],
    problem:
      "Most login-plus-CRUD demos never touch a real operations problem: who can do what, how a ticket becomes a seat, how a gate gets assigned, and how the departure board stays honest when status changes. I wanted one app that forces those lessons: identity, inventory, check-in, boarding, notifications, as a small airport, not a generic form.",
    whatIBuilt:
      "An Express + MongoDB airport system with a static jQuery/Bootstrap UI. Users register or log in with email/password; the server hashes passwords with bcrypt and issues a JWT. Passengers search flights, pick a class and seat (layout comes from the aircraft type), create a booking with a 6-character reference, and get a QR boarding pass plus a confirmation email. Staff check passengers in by reference or passport and push them onto a boarding queue by group. Admins create and edit flights (A320, A330, B737, B777, B787, A380), assign compatible gates by terminal, update status, and read 30-day analytics (bookings, revenue, top routes). Socket.io pushes flight and boarding changes to open boards. A complete profile stores phone, passport, DOB, and nationality so booking can auto-fill.",
    unique:
      "The product is the whole airport day, not a public browse demo. Guests can search the board. Passengers book and manage tickets. Staff check in and board. Only admins create flights, assign gates, and see revenue. Seat maps, gate compatibility (narrow-body vs wide-body), and the Flight to Booking to Passenger to BoardingQueue chain make the domain feel like a mini airline, not a todo list with airplane icons.",
    stack: [
      "Node.js",
      "Express",
      "MongoDB",
      "Mongoose",
      "JWT",
      "Socket.io",
      "Nodemailer",
      "jQuery",
      "Bootstrap",
      "HTML/CSS",
      "JavaScript",
    ],
    github: "https://github.com/itsmesaim/AeroFlow",
    status: "shipped",
    hasImages: true,
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
      "Schema is designed around how money actually flows: recurring transactions, planned vs actual budgets, and rollover handling for shared expenses.",
    stack: ["FastAPI", "Python", "SQLite", "JWT", "Pydantic"],
    github: "https://github.com/itsmesaim/Finaicial-management",
    status: "Research method - grp project",
  },
];

export const clientWork = {
  title: "10+ Client Projects",
  period: "Freelance · 2022 – Present",
  blurb:
    "Paid delivery for real businesses alongside the case studies above. Restaurant billing, inventory tools, marketing sites, and WordPress builds. Shipped to production with SSL, hosting, and the messy bits that only show up when someone is actually paying.",
  highlights: [
    "Billing systems",
    "Inventory tools",
    "Marketing sites",
    "WordPress",
    "AWS / VPS",
  ],
};
