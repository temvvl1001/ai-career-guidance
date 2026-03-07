export interface SkillQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
}

export const SOFTWARE_ENGINEER_QUESTIONS: SkillQuestion[] = [
  { id: 1, question: "What does the following code output? console.log(2 + '2')", options: ["4", "22", "NaN", "Error"], correctAnswer: 1, category: "Programming" },
  { id: 2, question: "Which data structure uses LIFO (Last In First Out)?", options: ["Queue", "Stack", "Array", "Linked List"], correctAnswer: 1, category: "Logic" },
  { id: 3, question: "What is the time complexity of binary search?" , options: ["O(n)", "O(log n)", "O(n²)", "O(1)"], correctAnswer: 1, category: "Problem Solving" },
  { id: 4, question: "Which keyword is used to declare a constant in JavaScript?", options: ["var", "let", "const", "constant"], correctAnswer: 2, category: "Programming" },
  { id: 5, question: "What does API stand for?", options: ["Application Programming Interface", "Advanced Program Integration", "Automated Process Interface", "Application Process Integration"], correctAnswer: 0, category: "Technical" },
  { id: 6, question: "In OOP, what is encapsulation?", options: ["Bundling data with methods", "Inheriting from parent class", "Creating multiple forms", "Hiding implementation"], correctAnswer: 0, category: "Programming" },
  { id: 7, question: "Which HTTP method is used to create a new resource?", options: ["GET", "POST", "PUT", "DELETE"], correctAnswer: 1, category: "Technical" },
  { id: 8, question: "What is a recursive function?", options: ["A function that calls another function", "A function that calls itself", "A function with no parameters", "A function that returns void"], correctAnswer: 1, category: "Logic" },
  { id: 9, question: "What does SQL stand for?", options: ["Structured Query Language", "Simple Query Language", "Standard Query Logic", "System Query Language"], correctAnswer: 0, category: "Technical" },
  { id: 10, question: "Which is NOT a valid variable naming convention?", options: ["camelCase", "snake_case", "PascalCase", "kebab-case"], correctAnswer: 3, category: "Programming" },
];

export const CAREER_SKILL_QUESTIONS: Record<string, SkillQuestion[]> = {
  "Software Engineer": SOFTWARE_ENGINEER_QUESTIONS,
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
};

export function getSkillQuestionsForCareer(career: string): SkillQuestion[] {
  return CAREER_SKILL_QUESTIONS[career] || SOFTWARE_ENGINEER_QUESTIONS;
}
