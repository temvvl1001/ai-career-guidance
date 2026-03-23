import { ALL_CAREERS } from "@/lib/career-data";

export interface SkillQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
}

export const CAREER_SKILL_QUESTIONS: Record<string, SkillQuestion[]> = {
  "Software Engineer": [
    { id: 1, question: "What does the following code output? console.log(2 + '2')", options: ["4", "22", "NaN", "Error"], correctAnswer: 1, category: "Programming" },
    { id: 2, question: "Which data structure uses LIFO (Last In First Out)?", options: ["Queue", "Stack", "Array", "Linked List"], correctAnswer: 1, category: "Logic" },
    { id: 3, question: "What is the time complexity of binary search?", options: ["O(n)", "O(log n)", "O(n²)", "O(1)"], correctAnswer: 1, category: "Problem Solving" },
    { id: 4, question: "Which keyword is used to declare a constant in JavaScript?", options: ["var", "let", "const", "constant"], correctAnswer: 2, category: "Programming" },
    { id: 5, question: "What does API stand for?", options: ["Application Programming Interface", "Advanced Program Integration", "Automated Process Interface", "Application Process Integration"], correctAnswer: 0, category: "Technical" },
    { id: 6, question: "In OOP, what is encapsulation?", options: ["Bundling data with methods", "Inheriting from parent class", "Creating multiple forms", "Hiding implementation"], correctAnswer: 0, category: "Programming" },
    { id: 7, question: "Which HTTP method is used to create a new resource?", options: ["GET", "POST", "PUT", "DELETE"], correctAnswer: 1, category: "Technical" },
    { id: 8, question: "What is a recursive function?", options: ["A function that calls another function", "A function that calls itself", "A function with no parameters", "A function that returns void"], correctAnswer: 1, category: "Logic" },
    { id: 9, question: "What does SQL stand for?", options: ["Structured Query Language", "Simple Query Language", "Standard Query Logic", "System Query Language"], correctAnswer: 0, category: "Technical" },
    { id: 10, question: "Which is NOT a valid variable naming convention?", options: ["camelCase", "snake_case", "PascalCase", "kebab-case"], correctAnswer: 3, category: "Programming" },
  ],

  "Data Scientist": [
    { id: 1, question: "What is the purpose of a p-value in statistics?", options: ["Measure effect size", "Probability of observed data given null hypothesis", "Confidence level", "Sample size"], correctAnswer: 1, category: "Statistics" },
    { id: 2, question: "Which algorithm is used for classification?", options: ["K-Means", "Linear Regression", "Logistic Regression", "PCA"], correctAnswer: 2, category: "Machine Learning" },
    { id: 3, question: "What does overfitting mean?", options: ["Model too simple", "Model memorizes training data", "Too few features", "Low accuracy"], correctAnswer: 1, category: "Machine Learning" },
    { id: 4, question: "Which library is commonly used for data manipulation in Python?", options: ["TensorFlow", "Pandas", "React", "Django"], correctAnswer: 1, category: "Programming" },
    { id: 5, question: "What is correlation coefficient range?", options: ["0 to 1", "-1 to 1", "0 to 100", "Unlimited"], correctAnswer: 1, category: "Statistics" },
    { id: 6, question: "What does NaN stand for?", options: ["Not a Number", "Null and None", "No Answer", "Negative Number"], correctAnswer: 0, category: "Programming" },
    { id: 7, question: "Which technique reduces dimensionality?", options: ["Gradient Descent", "PCA", "Random Forest", "SVM"], correctAnswer: 1, category: "Machine Learning" },
    { id: 8, question: "What is a confusion matrix used for?", options: ["Data visualization", "Model evaluation", "Data cleaning", "Feature selection"], correctAnswer: 1, category: "Machine Learning" },
    { id: 9, question: "What does EDA stand for?", options: ["Extended Data Analysis", "Exploratory Data Analysis", "External Data Access", "Efficient Data Algorithm"], correctAnswer: 1, category: "Statistics" },
    { id: 10, question: "Which metric is used for regression models?", options: ["Accuracy", "F1-Score", "RMSE", "Precision"], correctAnswer: 2, category: "Machine Learning" },
  ],

  "UI/UX Designer": [
    { id: 1, question: "What does UX stand for?", options: ["User Experience", "User Extension", "Universal Experience", "User Execution"], correctAnswer: 0, category: "UX" },
    { id: 2, question: "What is a wireframe?", options: ["Final design", "Low-fidelity layout", "Color scheme", "Typography"], correctAnswer: 1, category: "Design" },
    { id: 3, question: "Which principle suggests related items should be grouped?", options: ["Contrast", "Proximity", "Repetition", "Alignment"], correctAnswer: 1, category: "Design" },
    { id: 4, question: "What is usability testing?", options: ["Testing with real users", "Automated testing", "Code review", "A/B testing"], correctAnswer: 0, category: "UX" },
    { id: 5, question: "What does F-pattern refer to?", options: ["Color scheme", "Reading pattern", "Font choice", "Layout grid"], correctAnswer: 1, category: "UX" },
    { id: 6, question: "Which tool is used for prototyping?", options: ["Figma", "Excel", "MySQL", "Git"], correctAnswer: 0, category: "Design" },
    { id: 7, question: "What is information architecture?", options: ["Database design", "Content organization", "Network setup", "Security design"], correctAnswer: 1, category: "UX" },
    { id: 8, question: "What does accessibility (a11y) ensure?", options: ["Fast loading", "Usable by people with disabilities", "Mobile friendly", "SEO optimized"], correctAnswer: 1, category: "UX" },
    { id: 9, question: "What is a user persona?", options: ["Real user", "Fictional user representation", "Admin account", "Test account"], correctAnswer: 1, category: "UX" },
    { id: 10, question: "What does CTA stand for?", options: ["Click Through Analysis", "Call To Action", "Content Type Agreement", "Customer Touchpoint Analysis"], correctAnswer: 1, category: "Design" },
  ],

  "Cyber Security Analyst": [
    { id: 1, question: "What is phishing?", options: ["Network scanning", "Social engineering attack", "Encryption method", "Firewall type"], correctAnswer: 1, category: "Security" },
    { id: 2, question: "What does SSL/TLS provide?", options: ["Load balancing", "Encrypted communication", "Caching", "Compression"], correctAnswer: 1, category: "Security" },
    { id: 3, question: "What is a zero-day vulnerability?", options: ["Old vulnerability", "Unknown/unpatched vulnerability", "Low severity bug", "False positive"], correctAnswer: 1, category: "Security" },
    { id: 4, question: "What does 2FA stand for?", options: ["Two Factor Authentication", "Two File Access", "Second Firewall Activation", "Dual Format Analysis"], correctAnswer: 0, category: "Security" },
    { id: 5, question: "What is penetration testing?", options: ["Performance testing", "Authorized security assessment", "User acceptance testing", "Unit testing"], correctAnswer: 1, category: "Security" },
    { id: 6, question: "What does DDoS stand for?", options: ["Data Distribution Over System", "Distributed Denial of Service", "Direct Data Output Stream", "Digital Document Storage"], correctAnswer: 1, category: "Security" },
    { id: 7, question: "What is encryption?", options: ["Data compression", "Converting data to unreadable form", "Data backup", "Data deletion"], correctAnswer: 1, category: "Security" },
    { id: 8, question: "What does IDS stand for?", options: ["Integrated Data System", "Intrusion Detection System", "Internal Design Specification", "Internet Data Service"], correctAnswer: 1, category: "Security" },
    { id: 9, question: "What is social engineering?", options: ["Software development", "Manipulating people for information", "Network design", "Database management"], correctAnswer: 1, category: "Security" },
    { id: 10, question: "What does VPN provide?", options: ["Faster internet", "Encrypted private connection", "Free storage", "Email service"], correctAnswer: 1, category: "Security" },
  ],

  "AI Engineer": [
    { id: 1, question: "What is a neural network?", options: ["Database", "Computing system inspired by brain", "Network protocol", "Storage system"], correctAnswer: 1, category: "ML" },
    { id: 2, question: "What does NLP stand for?", options: ["Natural Language Processing", "Neural Learning Protocol", "Network Layer Protocol", "Non-Linear Programming"], correctAnswer: 0, category: "ML" },
    { id: 3, question: "What is gradient descent?", options: ["Data visualization", "Optimization algorithm", "Sorting algorithm", "Search algorithm"], correctAnswer: 1, category: "ML" },
    { id: 4, question: "What is transfer learning?", options: ["Moving data", "Using pre-trained models", "Data transfer", "Model export"], correctAnswer: 1, category: "ML" },
    { id: 5, question: "What does GPU accelerate in ML?", options: ["Data loading", "Matrix operations", "API calls", "File I/O"], correctAnswer: 1, category: "ML" },
    { id: 6, question: "What is a transformer model?", options: ["Electrical device", "Attention-based architecture", "Data transformer", "Signal processor"], correctAnswer: 1, category: "ML" },
    { id: 7, question: "What does fine-tuning do?", options: ["Deletes model", "Adapts pre-trained model", "Compresses model", "Exports model"], correctAnswer: 1, category: "ML" },
    { id: 8, question: "What is reinforcement learning?", options: ["Supervised learning", "Learning through rewards", "Unsupervised clustering", "Data labeling"], correctAnswer: 1, category: "ML" },
    { id: 9, question: "What does LLM stand for?", options: ["Large Language Model", "Low Level Module", "Linear Learning Method", "Long-term Memory"], correctAnswer: 0, category: "ML" },
    { id: 10, question: "What is overfitting in ML?", options: ["Model too simple", "Model memorizes training data", "Too little data", "Wrong algorithm"], correctAnswer: 1, category: "ML" },
  ],

  "Architect": [
    { id: 1, question: "What is a blueprint in architecture?", options: ["Final building", "Detailed building plan", "Construction material", "Style guide"], correctAnswer: 1, category: "Design" },
    { id: 2, question: "Which software is commonly used for 3D modeling?", options: ["AutoCAD", "Photoshop", "Excel", "SQL"], correctAnswer: 0, category: "Technical" },
    { id: 3, question: "What is sustainable design?", options: ["Cheap materials", "Environmentally friendly design", "Fast construction", "Luxury design"], correctAnswer: 1, category: "Design" },
    { id: 4, question: "Which principle deals with balance in structures?", options: ["Symmetry", "Contrast", "Hierarchy", "Typography"], correctAnswer: 0, category: "Design" },
    { id: 5, question: "What is BIM?", options: ["Building Information Modeling", "Basic Infrastructure Model", "Building Internal Management", "Blueprint Integration Method"], correctAnswer: 0, category: "Technical" },
    { id: 6, question: "What is load-bearing wall?", options: ["Wall that supports weight", "Partition wall", "Decorative wall", "Glass wall"], correctAnswer: 0, category: "Technical" },
    { id: 7, question: "What is a site plan?", options: ["Interior design plan", "Top-view layout of building site", "Electrical plan", "Furniture layout"], correctAnswer: 1, category: "Design" },
    { id: 8, question: "What is facade in architecture?", options: ["Roof", "Front exterior of building", "Foundation", "Interior wall"], correctAnswer: 1, category: "Design" },
    { id: 9, question: "Which material is sustainable?", options: ["Bamboo", "Plastic", "Concrete", "PVC"], correctAnswer: 0, category: "Design" },
    { id: 10, question: "What is CAD used for?", options: ["Code writing", "Computer-aided design", "Marketing plan", "Budgeting"], correctAnswer: 1, category: "Technical" },
  ],

  "Product Manager": [
    { id: 1, question: "What is a product roadmap?", options: ["Marketing plan", "Visual summary of product vision and timeline", "User manual", "Sales pitch"], correctAnswer: 1, category: "Management" },
    { id: 2, question: "What does MVP stand for?", options: ["Most Valuable Product", "Minimum Viable Product", "Major Version Plan", "Maximum Value Proposition"], correctAnswer: 1, category: "Management" },
    { id: 3, question: "What is backlog grooming?", options: ["Deleting old tasks", "Prioritizing and refining tasks", "Hiring team members", "Analyzing competitors"], correctAnswer: 1, category: "Process" },
    { id: 4, question: "Which framework is used for agile product management?", options: ["Scrum", "Waterfall", "Lean Six Sigma", "PRINCE2"], correctAnswer: 0, category: "Process" },
    { id: 5, question: "What is KPI in product management?", options: ["Key Performance Indicator", "Knowledge Process Integration", "Key Product Innovation", "Knowledge Performance Index"], correctAnswer: 0, category: "Management" },
    { id: 6, question: "What is user story?", options: ["Technical spec", "Short description of user need", "Marketing content", "Bug report"], correctAnswer: 1, category: "Process" },
    { id: 7, question: "What is feature prioritization?", options: ["Ranking features by importance", "Ignoring features", "Designing UI", "Coding feature"], correctAnswer: 0, category: "Process" },
    { id: 8, question: "What is roadmap milestone?", options: ["Small task", "Significant project checkpoint", "Email notification", "Team meeting"], correctAnswer: 1, category: "Management" },
    { id: 9, question: "Which tool is used for product management?", options: ["Jira", "Photoshop", "Excel", "AutoCAD"], correctAnswer: 0, category: "Technical" },
    { id: 10, question: "What is stakeholder management?", options: ["Hiring staff", "Communicating with key stakeholders", "Coding backend", "Designing UI"], correctAnswer: 1, category: "Management" },
  ],

  "Entrepreneur": [
    { id: 1, question: "What is a business plan?", options: ["Legal document", "Plan detailing business goals, strategy, and finance", "Marketing campaign", "HR policy"], correctAnswer: 1, category: "Business" },
    { id: 2, question: "What is venture capital?", options: ["Personal savings", "Investment funding for startups", "Bank loan", "Crowdfunding"], correctAnswer: 1, category: "Finance" },
    { id: 3, question: "What does ROI stand for?", options: ["Return on Investment", "Rate of Innovation", "Revenue of Industry", "Risk of Investment"], correctAnswer: 0, category: "Finance" },
    { id: 4, question: "What is a startup pivot?", options: ["Company closure", "Major strategic shift in product or business model", "New hire process", "Marketing rebrand"], correctAnswer: 1, category: "Business" },
    { id: 5, question: "Which skill is most important for entrepreneurs?", options: ["Coding", "Resilience and adaptability", "Data entry", "Graphic design"], correctAnswer: 1, category: "Soft Skill" },
    { id: 6, question: "What is customer discovery?", options: ["Hiring customers", "Researching customer needs", "Marketing campaign", "Financial audit"], correctAnswer: 1, category: "Business" },
    { id: 7, question: "What is bootstrapping?", options: ["Startup funded without external help", "Taking loans", "Hiring team", "Selling product"], correctAnswer: 0, category: "Finance" },
    { id: 8, question: "What is product-market fit?", options: ["Perfect marketing strategy", "Alignment of product with market demand", "Financial plan", "Team structure"], correctAnswer: 1, category: "Business" },
    { id: 9, question: "What is scaling?", options: ["Growing business operations efficiently", "Marketing campaign", "Coding process", "Team onboarding"], correctAnswer: 0, category: "Business" },
    { id: 10, question: "What is lean startup methodology?", options: ["Fast experimentation with minimal resources", "Detailed business plan", "Strict management hierarchy", "Marketing strategy"], correctAnswer: 0, category: "Process" },
  ],

  "Content Designer": [
    { id: 1, question: "What is content strategy?", options: ["Creating visuals only", "Planning, creating, and managing content", "Social media posting", "Ad campaign"], correctAnswer: 1, category: "Strategy" },
    { id: 2, question: "Which tool is used for prototyping content?", options: ["Figma", "Excel", "Python", "AutoCAD"], correctAnswer: 0, category: "Technical" },
    { id: 3, question: "What is microcopy?", options: ["Small pieces of text guiding users", "Short videos", "Icons", "Images"], correctAnswer: 0, category: "UX" },
    { id: 4, question: "What does readability mean?", options: ["Ease of reading text", "Color contrast", "Font size only", "Design layout"], correctAnswer: 0, category: "UX" },
    { id: 5, question: "Which principle ensures consistent messaging?", options: ["Tone of voice", "Font choice", "Contrast", "Layout grid"], correctAnswer: 0, category: "Strategy" },
    { id: 6, question: "What is content audit?", options: ["Analyzing and evaluating existing content", "Creating new graphics", "Coding content", "Marketing campaign"], correctAnswer: 0, category: "Process" },
    { id: 7, question: "What is user-centered content?", options: ["Content focused on user needs", "Content focused on company only", "Random content", "Content for SEO only"], correctAnswer: 0, category: "UX" },
    { id: 8, question: "What is CTA in content design?", options: ["Call to Action", "Content Template Assignment", "Creative Text Analysis", "Customer Tracking Analytics"], correctAnswer: 0, category: "UX" },
    { id: 9, question: "Which element improves accessibility?", options: ["Alt text for images", "Fancy fonts", "Long paragraphs", "Hidden content"], correctAnswer: 0, category: "UX" },
    { id: 10, question: "What is content governance?", options: ["Rules and process for managing content", "Graphic design only", "Marketing campaign", "Coding standards"], correctAnswer: 0, category: "Process" },
  ],
};

const CAREER_SKILL_ALIASES: Record<string, string> = {
  "Systems Architect": "Architect",
  "Tech Entrepreneur": "Entrepreneur",
  "UX Researcher": "UI/UX Designer",
  "Research Scientist": "Data Scientist",
};

const FALLBACK_DISTRACTOR_SKILLS = [
  "Accounting",
  "Budgeting",
  "Business Analysis",
  "Copywriting",
  "Customer Support",
  "Data Entry",
  "Legal Compliance",
  "Payroll",
  "Procurement",
  "Project Planning",
  "Public Speaking",
  "Quality Assurance",
  "Sales Pipeline",
  "SEO",
  "Supply Chain",
  "UX Writing",
  "Video Editing",
];

const GENERAL_FALLBACK_QUESTIONS: Array<Omit<SkillQuestion, "id">> = [
  {
    question: "Which action best supports consistent improvement in any role?",
    options: [
      "Review feedback and iterate regularly",
      "Avoid feedback to stay confident",
      "Change goals every week",
      "Ignore metrics and focus on speed",
    ],
    correctAnswer: 0,
    category: "Professional",
  },
  {
    question: "When priorities conflict, what is the best approach?",
    options: [
      "Confirm priorities with stakeholders and align on trade-offs",
      "Do everything at once without updating anyone",
      "Pause all tasks until it resolves itself",
      "Ignore the higher-impact work",
    ],
    correctAnswer: 0,
    category: "Professional",
  },
  {
    question: "Which habit most improves team collaboration?",
    options: [
      "Clear communication and regular updates",
      "Working in isolation",
      "Hiding blockers until the end",
      "Skipping documentation entirely",
    ],
    correctAnswer: 0,
    category: "Professional",
  },
];

const normalizeValue = (value: string) => value.trim().toLowerCase();

const hashString = (value: string) => {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash || 1;
};

const shuffleWithSeed = <T,>(items: T[], seed: number) => {
  const result = [...items];
  let state = seed >>> 0;
  for (let i = result.length - 1; i > 0; i -= 1) {
    state = (state * 1664525 + 1013904223) >>> 0;
    const j = state % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

const pickWithSeed = <T,>(items: T[], count: number, seed: number) =>
  shuffleWithSeed(items, seed).slice(0, Math.min(count, items.length));

const CORE_SKILL_TEMPLATES = [
  (career: string) => `Which of these is a core skill for a ${career}?`,
  (career: string) => `Which skill is most essential for a ${career} role?`,
  (career: string) => `A ${career} relies heavily on which ability?`,
];

const buildFallbackQuestions = (careerName: string): SkillQuestion[] => {
  const career = ALL_CAREERS.find(
    (item) => normalizeValue(item.name) === normalizeValue(careerName)
  );
  if (!career) return [];

  const coreSkills =
    career.requiredSkills?.length > 0
      ? career.requiredSkills
      : ["Problem Solving", "Communication", "Teamwork"];

  const normalizedCore = new Set(coreSkills.map(normalizeValue));
  const distractors = FALLBACK_DISTRACTOR_SKILLS.filter(
    (skill) => !normalizedCore.has(normalizeValue(skill))
  );
  const seed = hashString(careerName);

  const questions: SkillQuestion[] = coreSkills.map((skill, index) => {
    const picks = pickWithSeed(distractors, 3, seed + index * 11);
    const options = shuffleWithSeed([skill, ...picks], seed + index * 17);
    return {
      id: index + 1,
      question: CORE_SKILL_TEMPLATES[index % CORE_SKILL_TEMPLATES.length](
        careerName
      ),
      options,
      correctAnswer: options.indexOf(skill),
      category: "Core Skills",
    };
  });

  const generalStartId = questions.length + 1;
  GENERAL_FALLBACK_QUESTIONS.forEach((question, index) => {
    questions.push({
      id: generalStartId + index,
      ...question,
    });
  });

  return questions;
};

export function getSkillQuestionsForCareer(career: string): SkillQuestion[] {
  const direct = CAREER_SKILL_QUESTIONS[career];
  if (direct?.length) return direct;

  const alias = CAREER_SKILL_ALIASES[career];
  if (alias && CAREER_SKILL_QUESTIONS[alias]?.length) {
    return CAREER_SKILL_QUESTIONS[alias];
  }

  return buildFallbackQuestions(career);
}
