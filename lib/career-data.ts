export interface Career {
  id: string;
  name: string;
  description: string;
  salary: string;
  demandLevel: "High" | "Medium" | "Low";
  requiredSkills: string[];
  futureDemand: string;

  // Tags used by the recommendation algorithm.
  mbtiTypes?: string[];
  interests?: string[];
  subjects?: string[];
}

export interface UserProfile {
  // Signals captured from the user (preferences page).
  mbti: string;
  interests: string[];
  favoriteSubjects: string[];
}

export const TOP_CAREERS: Career[] = [
  {
    id: "software-engineer",
    name: "Software Engineer",
    description: "Design, develop, and maintain software applications and systems.",
    salary: "$90,000 - $180,000",
    demandLevel: "High",
    requiredSkills: ["Programming", "Problem Solving", "System Design"],
    futureDemand: "Very High - 22% growth expected",
    mbtiTypes: ["INTJ", "INTP", "ENTJ", "ENTP"],
    interests: ["technology", "problem-solving"],
    subjects: ["math", "computer-science"],
  },
  {
    id: "data-scientist",
    name: "Data Scientist",
    description: "Analyze complex data to extract insights and build predictive models.",
    salary: "$95,000 - $165,000",
    demandLevel: "High",
    requiredSkills: ["Statistics", "Machine Learning", "Python"],
    futureDemand: "Very High - 36% growth expected",
    mbtiTypes: ["INTJ", "INTP", "ENTJ", "ENTP"],
    interests: ["analysis", "technology"],
    subjects: ["math", "statistics"],
  },
  {
    id: "ui-ux-designer",
    name: "UI/UX Designer",
    description: "Create intuitive and visually appealing user experiences.",
    salary: "$70,000 - $140,000",
    demandLevel: "High",
    requiredSkills: ["Design", "User Research", "Prototyping"],
    futureDemand: "High - 13% growth expected",
    mbtiTypes: ["INFP", "ISFP", "ENFP", "INFJ"],
    interests: ["design", "creativity"],
    subjects: ["art", "design"],
  },
  {
    id: "cyber-security-analyst",
    name: "Cyber Security Analyst",
    description: "Protect organizations from cyber threats and security breaches.",
    salary: "$85,000 - $155,000",
    demandLevel: "High",
    requiredSkills: ["Security", "Networking", "Risk Assessment"],
    futureDemand: "Very High - 35% growth expected",
    mbtiTypes: ["ISTJ", "INTJ", "ISTP", "ESTJ"],
    interests: ["security", "problem-solving"],
    subjects: ["computer-science", "networking"],
  },
  {
    id: "ai-engineer",
    name: "AI Engineer",
    description: "Build and deploy AI/ML models and intelligent systems.",
    salary: "$120,000 - $200,000",
    demandLevel: "High",
    requiredSkills: ["Machine Learning", "Python", "Deep Learning"],
    futureDemand: "Very High - 40% growth expected",
    mbtiTypes: ["INTJ", "INTP", "ENTJ", "ENTP"],
    interests: ["ai", "technology", "analysis"],
    subjects: ["math", "computer-science"],
  },
];

// MBTI to Career mapping
export const MBTI_CAREER_MAP: Record<string, Career[]> = {
  INTJ: [
    TOP_CAREERS[0],
    TOP_CAREERS[1],
    TOP_CAREERS[4],
    {
      id: "architect",
      name: "Systems Architect",
      description: "Design complex technical systems and infrastructure.",
      salary: "$110,000 - $190,000",
      demandLevel: "High",
      requiredSkills: ["System Design", "Architecture", "Technical Leadership"],
      futureDemand: "High - 15% growth expected",
      mbtiTypes: ["INTJ"],
      interests: ["technology", "design"],
      subjects: ["computer-science", "engineering"],

    },
  ],
  INTP: [
    TOP_CAREERS[1],
    TOP_CAREERS[4],
    TOP_CAREERS[0],
    {
      id: "research-scientist",
      name: "Research Scientist",
      description: "Conduct research and develop new technologies.",
      salary: "$85,000 - $160,000",
      demandLevel: "Medium",
      requiredSkills: ["Research", "Analysis", "Technical Writing"],
      futureDemand: "Medium - 8% growth expected",
      mbtiTypes: ["INTP"],
      interests: ["research", "technology", "analysis"],
      subjects: ["math", "computer-science", "physics"],
    },
  ],
  ENTJ: [
    TOP_CAREERS[0],
    TOP_CAREERS[4],
    {
      id: "product-manager",
      name: "Product Manager",
      description: "Lead product strategy and development teams.",
      salary: "$100,000 - $180,000",
      demandLevel: "High",
      requiredSkills: ["Leadership", "Strategy", "Communication"],
      futureDemand: "High - 10% growth expected",
      mbtiTypes: ["ENTJ"],
      interests: ["leadership", "strategy", "technology"],
      subjects: ["business", "computer-science"],
    },
  ],
  ENTP: [
    TOP_CAREERS[0],
    TOP_CAREERS[1],
    {
      id: "entrepreneur",
      name: "Tech Entrepreneur",
      description: "Build and scale innovative technology ventures.",
      salary: "Variable",
      demandLevel: "Medium",
      requiredSkills: ["Innovation", "Leadership", "Risk-taking"],
      futureDemand: "Variable",
      mbtiTypes: ["ENTP"],
      interests: ["entrepreneurship", "innovation", "leadership"],
      subjects: ["business", "entrepreneurship"],
    },
  ],
  INFJ: [
    TOP_CAREERS[2],
    TOP_CAREERS[1],
    {
      id: "ux-researcher",
      name: "UX Researcher",
      description: "Understand user needs through research and empathy.",
      salary: "$75,000 - $135,000",
      demandLevel: "High",
      requiredSkills: ["User Research", "Empathy", "Analysis"],
      futureDemand: "High - 12% growth expected",
      mbtiTypes: ["INFJ"],
      interests: ["user experience", "research", "psychology"],
      subjects: ["psychology", "design"],
    },
  ],
  INFP: [
    TOP_CAREERS[2],
    {
      id: "content-designer",
      name: "Content Designer",
      description: "Create meaningful content and user experiences.",
      salary: "$65,000 - $120,000",
      demandLevel: "Medium",
      requiredSkills: ["Writing", "Design", "Creativity"],
      futureDemand: "Medium - 7% growth expected",
      mbtiTypes: ["INFP"],
      interests: ["content creation", "creativity", "writing"],
      subjects: ["english", "design"],
    },
  ],
  ENFJ: [
    {
      id: "hr-director",
      name: "HR Director",
      description: "Lead people strategy and organizational development.",
      salary: "$90,000 - $160,000",
      demandLevel: "Medium",
      requiredSkills: ["Leadership", "Communication", "Empathy"],
      futureDemand: "Medium - 7% growth expected",
      mbtiTypes: ["ENFJ"],
      interests: ["leadership", "people", "communication"],
      subjects: ["business", "psychology"],
    },
    TOP_CAREERS[2],
  ],
  ENFP: [
    {
      id: "marketing-specialist",
      name: "Marketing Specialist",
      description: "Create engaging campaigns and brand strategies.",
      salary: "$60,000 - $120,000",
      demandLevel: "High",
      requiredSkills: ["Creativity", "Communication", "Strategy"],
      futureDemand: "High - 10% growth expected",
      mbtiTypes: ["ENFP"],
      interests: ["marketing", "creativity", "communication"],
      subjects: ["business", "marketing"],
    },
    {
      id: "event-manager",
      name: "Event Manager",
      description: "Plan and execute memorable events and experiences.",
      salary: "$50,000 - $95,000",
      demandLevel: "Medium",
      requiredSkills: ["Organization", "Creativity", "Communication"],
      futureDemand: "Medium - 8% growth expected",
      mbtiTypes: ["ENFP"], 
      interests: ["events", "planning", "creativity"],
      subjects: ["business", "communication"],
    
    },
    {
      id: "media-creator",
      name: "Media Creator",
      description: "Create content across digital platforms.",
      salary: "$45,000 - $110,000",
      demandLevel: "High",
      requiredSkills: ["Content Creation", "Social Media", "Storytelling"],
      futureDemand: "High - 12% growth expected",
      mbtiTypes: ["ENFP"],
      interests: ["content creation", "social media", "storytelling"],
      subjects: ["media studies", "communication"],
    },
  ],
  ISTJ: [
    TOP_CAREERS[3],
    {
      id: "devops-engineer",
      name: "DevOps Engineer",
      description: "Manage infrastructure and deployment pipelines.",
      salary: "$95,000 - $165,000",
      demandLevel: "High",
      requiredSkills: ["DevOps", "Cloud", "Automation"],
      futureDemand: "High - 15% growth expected",
      mbtiTypes: ["ISTJ"],
      interests: ["technology", "systems"],
      subjects: ["computer-science", "engineering"],
    },
  ],
  ISFJ: [
    {
      id: "project-coordinator",
      name: "Project Coordinator",
      description: "Coordinate projects and ensure smooth execution.",
      salary: "$55,000 - $95,000",
      demandLevel: "Medium",
      requiredSkills: ["Organization", "Communication", "Detail-oriented"],
      futureDemand: "Medium - 6% growth expected",
      mbtiTypes: ["ISFJ"],
      interests: ["organization", "communication"],
      subjects: ["business", "communication"],
    },
  ],
  ESTJ: [
    TOP_CAREERS[3],
    {
      id: "it-manager",
      name: "IT Manager",
      description: "Lead IT teams and technology strategy.",
      salary: "$90,000 - $155,000",
      demandLevel: "Medium",
      requiredSkills: ["Leadership", "IT Management", "Strategy"],
      futureDemand: "Medium - 11% growth expected",
      mbtiTypes: ["ESTJ"],
      interests: ["technology", "leadership"],
      subjects: ["computer-science", "business"],
    },
  ],
  ESFJ: [
    {
      id: "customer-success",
      name: "Customer Success Manager",
      description: "Ensure customer satisfaction and retention.",
      salary: "$60,000 - $115,000",
      demandLevel: "High",
      requiredSkills: ["Communication", "Empathy", "Problem-solving"],
      futureDemand: "High - 9% growth expected",
      mbtiTypes: ["ESFJ", "ENFJ"],
      interests: ["customer service", "communication"],
      subjects: ["business", "communication"],
    },
  ],
  ISTP: [
    TOP_CAREERS[3],
    TOP_CAREERS[0],
    {
      id: "network-engineer",
      name: "Network Engineer",
      description: "Design and maintain network infrastructure.",
      salary: "$75,000 - $130,000",
      demandLevel: "Medium",
      requiredSkills: ["Networking", "Troubleshooting", "Security"],
      futureDemand: "Medium - 5% growth expected",
      mbtiTypes: ["ISTP"],
      interests: ["technology", "problem-solving"],
      subjects: ["computer-science", "networking"],
    },
  ],
  ISFP: [
    TOP_CAREERS[2],
    {
      id: "graphic-designer",
      name: "Graphic Designer",
      description: "Create visual content and brand assets.",
      salary: "$50,000 - $95,000",
      demandLevel: "Medium",
      requiredSkills: ["Design", "Creativity", "Software"],
      futureDemand: "Medium - 3% growth expected",
      mbtiTypes: ["ISFP"],
      interests: ["design", "art"],
      subjects: ["art", "design"],
    },
  ],
  ESTP: [
    {
      id: "sales-engineer",
      name: "Sales Engineer",
      description: "Combine technical knowledge with sales.",
      salary: "$80,000 - $150,000",
      demandLevel: "High",
      requiredSkills: ["Technical Sales", "Communication", "Problem-solving"],
      futureDemand: "High - 8% growth expected",
      mbtiTypes: ["ESTP", "ENTP"],
      interests: ["sales", "technology", "communication"],
      subjects: ["business", "computer-science"],
    },
  ],
  ESFP: [
    {
      id: "marketing-specialist",
      name: "Marketing Specialist",
      description: "Create engaging campaigns and brand strategies.",
      salary: "$60,000 - $120,000",
      demandLevel: "High",
      requiredSkills: ["Creativity", "Communication", "Strategy"],
      futureDemand: "High - 10% growth expected",
      mbtiTypes: ["ENFP", "ESFP"],
      interests: ["marketing", "creativity", "communication"],
      subjects: ["business", "marketing"],
    },
    {
      id: "event-manager",
      name: "Event Manager",
      description: "Plan and execute memorable events.",
      salary: "$50,000 - $95,000",
      demandLevel: "Medium",
      requiredSkills: ["Organization", "Creativity", "Communication"],
      futureDemand: "Medium - 8% growth expected",
      mbtiTypes: ["ESFP"],
      interests: ["events", "planning", "creativity"],
      subjects: ["business", "communication"],
    },
    {
      id: "media-creator",
      name: "Media Creator",
      description: "Create content across digital platforms.",
      salary: "$45,000 - $110,000",
      demandLevel: "High",
      requiredSkills: ["Content Creation", "Social Media", "Storytelling"],
      futureDemand: "High - 12% growth expected",
      mbtiTypes: ["ESFP"],
      interests: ["content creation", "social media", "storytelling"],
      subjects: ["media studies", "communication"],
    },
  ],
};

const normalizeList = (values: string[]) =>
  // Normalize user input & tags to make matching consistent.
  values
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);

const addCareerToCatalog = (
  catalog: Map<string, Career>,
  career: Career,
  mbtiType?: string
) => {
  // Merge duplicates (same career id) and union MBTI tags when a career
  // appears in multiple MBTI lists.
  const existing = catalog.get(career.id);
  const merged: Career = existing ? { ...existing, ...career } : { ...career };

  const mbtiSet = new Set<string>(merged.mbtiTypes ?? []);
  if (mbtiType) mbtiSet.add(mbtiType);
  merged.mbtiTypes = mbtiSet.size ? Array.from(mbtiSet) : undefined;

  catalog.set(career.id, merged);
};

export const ALL_CAREERS: Career[] = (() => {
  // TOP карьерууд + MBTI map-ийг нэгтгээд давхардалгүй каталог үүсгэнэ.
  const catalog = new Map<string, Career>();

  TOP_CAREERS.forEach((career) => addCareerToCatalog(catalog, career));

  Object.entries(MBTI_CAREER_MAP).forEach(([mbtiType, careers]) => {
    careers.forEach((career) => addCareerToCatalog(catalog, career, mbtiType));
  });

  return Array.from(catalog.values());
})();

export function getCareersForMBTI(mbtiType: string): Career[] {
  return MBTI_CAREER_MAP[mbtiType] || TOP_CAREERS;
}

export function recommendCareers(profile: UserProfile, careers: Career[]) {
  // Жинтэй онооны загвар. Жинг аль болох энгийн, ойлгомжтой байлгасан.
  // MBTI нь хамгийн хүчтэй дохио; interests/subjects нь эрэмбийг нарийсгана.
  const profileInterests = normalizeList(profile.interests);
  const profileSubjects = normalizeList(profile.favoriteSubjects);
  const mbti = profile.mbti.toUpperCase();

  const results = careers.map((career) => {
    let score = 0;

    // MBTI таарах эсэх (үндсэн дохио)
    if (career.mbtiTypes?.includes(mbti)) {
      score += 40;
    }

    // Сонирхлын таарц (нэг таарц бүр 8 оноо)
    const interestMatch = normalizeList(career.interests ?? []).filter((interest) =>
      profileInterests.includes(interest)
    );
    score += interestMatch.length * 8;

    // Хичээлийн таарц (нэг таарц бүр 6 оноо)
    const subjectMatch = normalizeList(career.subjects ?? []).filter((subject) =>
      profileSubjects.includes(subject)
    );
    score += subjectMatch.length * 6;

    return {
      career,
      // Дэлгэцэнд харагдахуйц байлгахын тулд 100-аар дээдлэнэ.
      score: Math.min(score, 100),
    };
  });

  return results.sort((a, b) => b.score - a.score).slice(0, 10);
}
