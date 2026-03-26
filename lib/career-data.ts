export interface Career {
  id: string;
  name: string;
  nameMn?: string;
  description: string;
  descriptionMn?: string;
  salary: string;
  salaryMn?: string;
  demandLevel: "High" | "Medium" | "Low";
  demandLevelMn?: string;
  requiredSkills: string[];
  requiredSkillsMn?: string[];
  futureDemand: string;
  futureDemandMn?: string;
 
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
  nameMn: "Програм хангамжийн инженер",
  description: "Design, develop, and maintain software applications and systems.",
  descriptionMn: "Програм хангамжийн систем, аппликейшн зохион бүтээх, хөгжүүлэх, арчлах.",
  salary: "$90,000 - $180,000",
  salaryMn: "$90,000 - $180,000",
  demandLevel: "High",
  demandLevelMn: "Өндөр",
  requiredSkills: ["Programming", "Problem Solving", "System Design"],
  requiredSkillsMn: ["Програмчлал", "Асуудал шийдвэрлэх", "Системийн дизайн"],
  futureDemand: "Very High - 22% growth expected",
  futureDemandMn: "Маш өндөр - 22% өсөлттэй",
  mbtiTypes: ["INTJ", "INTP", "ENTJ", "ENTP"],
  interests: ["technology", "problem-solving"],
  subjects: ["math", "computer-science"],
  },
  {
  id: "data-scientist",
  name: "Data Scientist",
  nameMn: "Өгөгдлийн шинжээч",
  description: "Analyze complex data to extract insights and build predictive models.",
  descriptionMn: "Нийлмэл өгөгдөлд дүн шинжилгээ хийж, таамаглал дэвшүүлэх загвар боловсруулах.",
  salary: "$95,000 - $165,000",
  salaryMn: "$95,000 - $165,000",
  demandLevel: "High",
  demandLevelMn: "Өндөр",
  requiredSkills: ["Statistics", "Machine Learning", "Python"],
  requiredSkillsMn: ["Статистик", "Машин сургалт", "Python"],
  futureDemand: "Very High - 36% growth expected",
  futureDemandMn: "Маш өндөр - 36% өсөлттэй",
  mbtiTypes: ["INTJ", "INTP", "ENTJ", "ENTP"],
  interests: ["analysis", "technology"],
  subjects: ["math", "statistics"],
  },
  {
  id: "ui-ux-designer",
  name: "UI/UX Designer",
  nameMn: "UI/UX дизайнер",
  description: "Create intuitive and visually appealing user experiences.",
  descriptionMn: "Хэрэглэгчдэд ойлгомжтой, үзэмжтэй дизайн боловсруулах.",
  salary: "$70,000 - $140,000",
  salaryMn: "$70,000 - $140,000",
  demandLevel: "High",
  demandLevelMn: "Өндөр",
  requiredSkills: ["Design", "User Research", "Prototyping"],
  requiredSkillsMn: ["Дизайн", "Хэрэглэгчийн судалгаа", "Прототип хийх"],
  futureDemand: "High - 13% growth expected",
  futureDemandMn: "Өндөр - 13% өсөлттэй",
  mbtiTypes: ["INFP", "ISFP", "ENFP", "INFJ"],
  interests: ["design", "creativity"],
  subjects: ["art", "design"],
  },
  {
  id: "cyber-security-analyst",
  name: "Cyber Security Analyst",
  nameMn: "Кибер аюулгүй байдлын шинжээч",
  description: "Protect organizations from cyber threats and security breaches.",
  descriptionMn: "Байгууллагыг кибер халдлага, аюул заналаас хамгаалах.",
  salary: "$85,000 - $155,000",
  salaryMn: "$85,000 - $155,000",
  demandLevel: "High",
  demandLevelMn: "Өндөр",
  requiredSkills: ["Security", "Networking", "Risk Assessment"],
  requiredSkillsMn: ["Аюулгүй байдал", "Сүлжээ", "Эрсдэлийн үнэлгээ"],
  futureDemand: "Very High - 35% growth expected",
  futureDemandMn: "Маш өндөр - 35% өсөлттэй",
  mbtiTypes: ["ISTJ", "INTJ", "ISTP", "ESTJ"],
  interests: ["security", "problem-solving"],
  subjects: ["computer-science", "networking"],
  },
  {
  id: "ai-engineer",
  name: "AI Engineer",
  nameMn: "Хиймэл оюун ухааны инженер",
  description: "Build and deploy AI/ML models and intelligent systems.",
  descriptionMn: "Хиймэл оюун ухааны загвар, ухаалаг системүүд бүтээх.",
  salary: "$120,000 - $200,000",
  salaryMn: "$120,000 - $200,000",
  demandLevel: "High",
  demandLevelMn: "Өндөр",
  requiredSkills: ["Machine Learning", "Python", "Deep Learning"],
  requiredSkillsMn: ["Машин сургалт", "Python", "Гүнзгий сургалт"],
  futureDemand: "Very High - 40% growth expected",
  futureDemandMn: "Маш өндөр - 40% өсөлттэй",
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
  nameMn: "Системийн архитектор",
  description: "Design complex technical systems and infrastructure.",
  descriptionMn: "Нарийн төвөгтэй техникийн систем, дэд бүтцийн зураг төсөл боловсруулах.",
  salary: "$110,000 - $190,000",
  salaryMn: "$110,000 - $190,000",
  demandLevel: "High",
  demandLevelMn: "Өндөр",
  requiredSkills: ["System Design", "Architecture", "Technical Leadership"],
  requiredSkillsMn: ["Системийн дизайн", "Архитектур", "Техникийн манлайлал"],
  futureDemand: "High - 15% growth expected",
  futureDemandMn: "Өндөр - 15% өсөлттэй",
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
  nameMn: "Эрдэм шинжилгээний ажилтан",
  description: "Conduct research and develop new technologies.",
  descriptionMn: "Судалгаа шинжилгээ хийж, шинэ технологи хөгжүүлэх.",
  salary: "$85,000 - $160,000",
  salaryMn: "$85,000 - $160,000",
  demandLevel: "Medium",
  demandLevelMn: "Дундаж",
  requiredSkills: ["Research", "Analysis", "Technical Writing"],
  requiredSkillsMn: ["Судалгаа", "Шинжилгээ", "Техникийн бичиг баримт"],
  futureDemand: "Medium - 8% growth expected",
  futureDemandMn: "Дундаж - 8% өсөлттэй",
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
  nameMn: "Бүтээгдэхүүний менежер",
  description: "Lead product strategy and development teams.",
  descriptionMn: "Бүтээгдэхүүний стратеги болон хөгжүүлэлтийн багийг удирдах.",
  salary: "$100,000 - $180,000",
  salaryMn: "$100,000 - $180,000",
  demandLevel: "High",
  demandLevelMn: "Өндөр",
  requiredSkills: ["Leadership", "Strategy", "Communication"],
  requiredSkillsMn: ["Манлайлал", "Стратеги", "Харилцаа холбоо"],
  futureDemand: "High - 10% growth expected",
  futureDemandMn: "Өндөр - 10% өсөлттэй",
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
  nameMn: "Технологийн бизнес эрхлэгч",
  description: "Build and scale innovative technology ventures.",
  descriptionMn: "Шинэлэг технологийн стартап байгуулах, өргөжүүлэх.",
  salary: "Variable",
  salaryMn: "Хувьсах",
  demandLevel: "Medium",
  demandLevelMn: "Дундаж",
  requiredSkills: ["Innovation", "Leadership", "Risk-taking"],
  requiredSkillsMn: ["Инноваци", "Манлайлал", "Эрсдэл даах"],
  futureDemand: "Variable",
  futureDemandMn: "Хувьсах",
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
  nameMn: "UX судлаач",
  description: "Understand user needs through research and empathy.",
  descriptionMn: "Хэрэглэгчийн хэрэгцээг судалгаа болон эмпати ашиглан ойлгох.",
  salary: "$75,000 - $135,000",
  salaryMn: "$75,000 - $135,000",
  demandLevel: "High",
  demandLevelMn: "Өндөр",
  requiredSkills: ["User Research", "Empathy", "Analysis"],
  requiredSkillsMn: ["Хэрэглэгчийн судалгаа", "Эмпати", "Шинжилгээ"],
  futureDemand: "High - 12% growth expected",
  futureDemandMn: "Өндөр - 12% өсөлттэй",
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
  nameMn: "Контент дизайнер",
  description: "Create meaningful content and user experiences.",
  descriptionMn: "Утга учиртай контент болон хэрэглэгчийн туршлага бүтээх.",
  salary: "$65,000 - $120,000",
  salaryMn: "$65,000 - $120,000",
  demandLevel: "Medium",
  demandLevelMn: "Дундаж",
  requiredSkills: ["Writing", "Design", "Creativity"],
  requiredSkillsMn: ["Бичих", "Дизайн", "Бүтээлч сэтгэлгээ"],
  futureDemand: "Medium - 7% growth expected",
  futureDemandMn: "Дундаж - 7% өсөлттэй",
  mbtiTypes: ["INFP"],
  interests: ["content creation", "creativity", "writing"],
  subjects: ["english", "design"],
  },
  ],
  ENFJ: [
  {
  id: "hr-director",
  name: "HR Director",
  nameMn: "Хүний нөөцийн захирал",
  description: "Lead people strategy and organizational development.",
  descriptionMn: "Хүний нөөцийн стратеги болон байгууллагын хөгжлийг удирдах.",
  salary: "$90,000 - $160,000",
  salaryMn: "$90,000 - $160,000",
  demandLevel: "Medium",
  demandLevelMn: "Дундаж",
  requiredSkills: ["Leadership", "Communication", "Empathy"],
  requiredSkillsMn: ["Манлайлал", "Харилцаа холбоо", "Эмпати"],
  futureDemand: "Medium - 7% growth expected",
  futureDemandMn: "Дундаж - 7% өсөлттэй",
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
  nameMn: "Маркетингийн мэргэжилтэн",
  description: "Create engaging campaigns and brand strategies.",
  descriptionMn: "Сонирхолтой кампанит ажил болон брэнд стратеги боловсруулах.",
  salary: "$60,000 - $120,000",
  salaryMn: "$60,000 - $120,000",
  demandLevel: "High",
  demandLevelMn: "Өндөр",
  requiredSkills: ["Creativity", "Communication", "Strategy"],
  requiredSkillsMn: ["Бүтээлч байдал", "Харилцаа холбоо", "Стратеги"],
  futureDemand: "High - 10% growth expected",
  futureDemandMn: "Өндөр - 10% өсөлттэй",
  mbtiTypes: ["ENFP"],
  interests: ["marketing", "creativity", "communication"],
  subjects: ["business", "marketing"],
  },
  {
  id: "event-manager",
  name: "Event Manager",
  nameMn: "Эвент менежер",
  description: "Plan and execute memorable events and experiences.",
  descriptionMn: "Мартагдашгүй арга хэмжээ, туршлага төлөвлөх, зохион байгуулах.",
  salary: "$50,000 - $95,000",
  salaryMn: "$50,000 - $95,000",
  demandLevel: "Medium",
  demandLevelMn: "Дундаж",
  requiredSkills: ["Organization", "Creativity", "Communication"],
  requiredSkillsMn: ["Зохион байгуулалт", "Бүтээлч байдал", "Харилцаа холбоо"],
  futureDemand: "Medium - 8% growth expected",
  futureDemandMn: "Дундаж - 8% өсөлттэй",
  mbtiTypes: ["ENFP"], 
  interests: ["events", "planning", "creativity"],
  subjects: ["business", "communication"],
  
  },
  {
  id: "media-creator",
  name: "Media Creator",
  nameMn: "Медиа бүтээгч",
  description: "Create content across digital platforms.",
  descriptionMn: "Дижитал платформуудад зориулсан контент бүтээх.",
  salary: "$45,000 - $110,000",
  salaryMn: "$45,000 - $110,000",
  demandLevel: "High",
  demandLevelMn: "Өндөр",
  requiredSkills: ["Content Creation", "Social Media", "Storytelling"],
  requiredSkillsMn: ["Контент бүтээх", "Сошиал медиа", "Өгүүллэг бүтээх"],
  futureDemand: "High - 12% growth expected",
  futureDemandMn: "Өндөр - 12% өсөлттэй",
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
  nameMn: "DevOps инженер",
  description: "Manage infrastructure and deployment pipelines.",
  descriptionMn: "Дэд бүтэц болон систем нэвтрүүлэлтийн дамжлагыг удирдах.",
  salary: "$95,000 - $165,000",
  salaryMn: "$95,000 - $165,000",
  demandLevel: "High",
  demandLevelMn: "Өндөр",
  requiredSkills: ["DevOps", "Cloud", "Automation"],
  requiredSkillsMn: ["DevOps", "Үүлэн тооцоолол", "Автоматжуулалт"],
  futureDemand: "High - 15% growth expected",
  futureDemandMn: "Өндөр - 15% өсөлттэй",
  mbtiTypes: ["ISTJ"],
  interests: ["technology", "systems"],
  subjects: ["computer-science", "engineering"],
  },
  ],
  ISFJ: [
  {
  id: "project-coordinator",
  name: "Project Coordinator",
  nameMn: "Төслийн зохицуулагч",
  description: "Coordinate projects and ensure smooth execution.",
  descriptionMn: "Төслүүдийг зохицуулж, хэвийн үйл ажиллагааг хангах.",
  salary: "$55,000 - $95,000",
  salaryMn: "$55,000 - $95,000",
  demandLevel: "Medium",
  demandLevelMn: "Дундаж",
  requiredSkills: ["Organization", "Communication", "Detail-oriented"],
  requiredSkillsMn: ["Зохион байгуулалт", "Харилцаа холбоо", "Нягт нямбай"],
  futureDemand: "Medium - 6% growth expected",
  futureDemandMn: "Дундаж - 6% өсөлттэй",
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
  nameMn: "Мэдээллийн технологийн менежер",
  description: "Lead IT teams and technology strategy.",
  descriptionMn: "Мэдээллийн технологийн баг болон стратегийг удирдах.",
  salary: "$90,000 - $155,000",
  salaryMn: "$90,000 - $155,000",
  demandLevel: "Medium",
  demandLevelMn: "Дундаж",
  requiredSkills: ["Leadership", "IT Management", "Strategy"],
  requiredSkillsMn: ["Манлайлал", "IT удирдлага", "Стратеги"],
  futureDemand: "Medium - 11% growth expected",
  futureDemandMn: "Дундаж - 11% өсөлттэй",
  mbtiTypes: ["ESTJ"],
  interests: ["technology", "leadership"],
  subjects: ["computer-science", "business"],
  },
  ],
  ESFJ: [
  {
  id: "customer-success",
  name: "Customer Success Manager",
  nameMn: "Харилцагчийн амжилтын менежер",
  description: "Ensure customer satisfaction and retention.",
  descriptionMn: "Харилцагчийн сэтгэл ханамж, үнэнч байдлыг хангах.",
  salary: "$60,000 - $115,000",
  salaryMn: "$60,000 - $115,000",
  demandLevel: "High",
  demandLevelMn: "Өндөр",
  requiredSkills: ["Communication", "Empathy", "Problem-solving"],
  requiredSkillsMn: ["Харилцаа холбоо", "Эмпати", "Асуудал шийдвэрлэх"],
  futureDemand: "High - 9% growth expected",
  futureDemandMn: "Өндөр - 9% өсөлттэй",
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
  nameMn: "Сүлжээний инженер",
  description: "Design and maintain network infrastructure.",
  descriptionMn: "Сүлжээний дэд бүтцийн зураг төсөл боловсруулах, арчлах.",
  salary: "$75,000 - $130,000",
  salaryMn: "$75,000 - $130,000",
  demandLevel: "Medium",
  demandLevelMn: "Дундаж",
  requiredSkills: ["Networking", "Troubleshooting", "Security"],
  requiredSkillsMn: ["Сүлжээ", "Алдаа илрүүлэх", "Аюулгүй байдал"],
  futureDemand: "Medium - 5% growth expected",
  futureDemandMn: "Дундаж - 5% өсөлттэй",
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
  nameMn: "График дизайнер",
  description: "Create visual content and brand assets.",
  descriptionMn: "Визуал контент болон брэнд материалууд бүтээх.",
  salary: "$50,000 - $95,000",
  salaryMn: "$50,000 - $95,000",
  demandLevel: "Medium",
  demandLevelMn: "Дундаж",
  requiredSkills: ["Design", "Creativity", "Software"],
  requiredSkillsMn: ["Дизайн", "Бүтээлч байдал", "Програм хангамж"],
  futureDemand: "Medium - 3% growth expected",
  futureDemandMn: "Дундаж - 3% өсөлттэй",
  mbtiTypes: ["ISFP"],
  interests: ["design", "art"],
  subjects: ["art", "design"],
  },
  ],
  ESTP: [
  {
  id: "sales-engineer",
  name: "Sales Engineer",
  nameMn: "Борлуулалтын инженер",
  description: "Combine technical knowledge with sales.",
  descriptionMn: "Техникийн мэдлэгийг борлуулалттай хослуулах.",
  salary: "$80,000 - $150,000",
  salaryMn: "$80,000 - $150,000",
  demandLevel: "High",
  demandLevelMn: "Өндөр",
  requiredSkills: ["Technical Sales", "Communication", "Problem-solving"],
  requiredSkillsMn: ["Техникийн борлуулалт", "Харилцаа холбоо", "Асуудал шийдвэрлэх"],
  futureDemand: "High - 8% growth expected",
  futureDemandMn: "Өндөр - 8% өсөлттэй",
  mbtiTypes: ["ESTP", "ENTP"],
  interests: ["sales", "technology", "communication"],
  subjects: ["business", "computer-science"],
  },
  ],
  ESFP: [
  {
  id: "marketing-specialist",
  name: "Marketing Specialist",
  nameMn: "Маркетингийн мэргэжилтэн",
  description: "Create engaging campaigns and brand strategies.",
  descriptionMn: "Сонирхолтой кампанит ажил болон брэнд стратеги боловсруулах.",
  salary: "$60,000 - $120,000",
  salaryMn: "$60,000 - $120,000",
  demandLevel: "High",
  demandLevelMn: "Өндөр",
  requiredSkills: ["Creativity", "Communication", "Strategy"],
  requiredSkillsMn: ["Бүтээлч байдал", "Харилцаа холбоо", "Стратеги"],
  futureDemand: "High - 10% growth expected",
  futureDemandMn: "Өндөр - 10% өсөлттэй",
  mbtiTypes: ["ENFP", "ESFP"],
  interests: ["marketing", "creativity", "communication"],
  subjects: ["business", "marketing"],
  },
  {
  id: "event-manager",
  name: "Event Manager",
  nameMn: "Эвент менежер",
  description: "Plan and execute memorable events.",
  descriptionMn: "Мартагдашгүй арга хэмжээ төлөвлөх, зохион байгуулах.",
  salary: "$50,000 - $95,000",
  salaryMn: "$50,000 - $95,000",
  demandLevel: "Medium",
  demandLevelMn: "Дундаж",
  requiredSkills: ["Organization", "Creativity", "Communication"],
  requiredSkillsMn: ["Зохион байгуулалт", "Бүтээлч байдал", "Харилцаа холбоо"],
  futureDemand: "Medium - 8% growth expected",
  futureDemandMn: "Дундаж - 8% өсөлттэй",
  mbtiTypes: ["ESFP"],
  interests: ["events", "planning", "creativity"],
  subjects: ["business", "communication"],
  },
  {
  id: "media-creator",
  name: "Media Creator",
  nameMn: "Медиа бүтээгч",
  description: "Create content across digital platforms.",
  descriptionMn: "Дижитал платформуудад зориулсан контент бүтээх.",
  salary: "$45,000 - $110,000",
  salaryMn: "$45,000 - $110,000",
  demandLevel: "High",
  demandLevelMn: "Өндөр",
  requiredSkills: ["Content Creation", "Social Media", "Storytelling"],
  requiredSkillsMn: ["Контент бүтээх", "Сошиал медиа", "Өгүүллэг бүтээх"],
  futureDemand: "High - 12% growth expected",
  futureDemandMn: "Өндөр - 12% өсөлттэй",
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
 
 export function localizeCareer(career: Career, locale: string): Career {
  if (locale !== "mn") return career;
  return {
  ...career,
  name: career.nameMn || career.name,
  description: career.descriptionMn || career.description,
  salary: career.salaryMn || career.salary,
  demandLevel: (career.demandLevelMn as any) || career.demandLevel,
  requiredSkills: career.requiredSkillsMn || career.requiredSkills,
  futureDemand: career.futureDemandMn || career.futureDemand,
  };
 }
 
 export function recommendCareers(profile: UserProfile, careers: Career[], locale: string = "en") {
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
  career: localizeCareer(career, locale),
  // Дэлгэцэнд харагдахуйц байлгахын тулд 100-аар дээдлэнэ.
  score: Math.min(score, 100),
  };
  });
 
  return results.sort((a, b) => b.score - a.score).slice(0, 10);
 }