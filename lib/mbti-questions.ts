export interface MBTIQuestion {
  id: number;
  question: string;
  dimension: "E-I" | "S-N" | "T-F" | "J-P";
  positiveDirection: "first" | "second"; // first = E, S, T, J | second = I, N, F, P
}

export const MBTI_QUESTIONS: MBTIQuestion[] = [
  { id: 1, question: "I prefer to spend time with others rather than alone.", dimension: "E-I", positiveDirection: "first" },
  { id: 2, question: "I focus on concrete facts rather than abstract ideas.", dimension: "S-N", positiveDirection: "first" },
  { id: 3, question: "I make decisions based on logic rather than feelings.", dimension: "T-F", positiveDirection: "first" },
  { id: 4, question: "I prefer a structured schedule over spontaneity.", dimension: "J-P", positiveDirection: "first" },
  { id: 5, question: "I feel energized after social gatherings.", dimension: "E-I", positiveDirection: "first" },
  { id: 6, question: "I enjoy thinking about future possibilities.", dimension: "S-N", positiveDirection: "second" },
  { id: 7, question: "I consider others' feelings when making decisions.", dimension: "T-F", positiveDirection: "second" },
  { id: 8, question: "I like to keep my options open.", dimension: "J-P", positiveDirection: "second" },
  { id: 9, question: "I need alone time to recharge.", dimension: "E-I", positiveDirection: "second" },
  { id: 10, question: "I pay attention to details and specifics.", dimension: "S-N", positiveDirection: "first" },
  { id: 11, question: "I prioritize fairness over harmony.", dimension: "T-F", positiveDirection: "first" },
  { id: 12, question: "I make to-do lists and follow them.", dimension: "J-P", positiveDirection: "first" },
  { id: 13, question: "I enjoy being the center of attention.", dimension: "E-I", positiveDirection: "first" },
  { id: 14, question: "I see the big picture rather than details.", dimension: "S-N", positiveDirection: "second" },
  { id: 15, question: "I value empathy in decision-making.", dimension: "T-F", positiveDirection: "second" },
  { id: 16, question: "I prefer flexibility over planning.", dimension: "J-P", positiveDirection: "second" },
  { id: 17, question: "I have a wide circle of acquaintances.", dimension: "E-I", positiveDirection: "first" },
  { id: 18, question: "I trust my intuition over data.", dimension: "S-N", positiveDirection: "second" },
  { id: 19, question: "I prefer objective analysis over subjective judgment.", dimension: "T-F", positiveDirection: "first" },
  { id: 20, question: "I like to finish tasks before starting new ones.", dimension: "J-P", positiveDirection: "first" },
];

export const MBTI_DIMENSIONS = ["E-I", "S-N", "T-F", "J-P"] as const;
export const MBTI_TYPES = ["INTJ", "INTP", "ENTJ", "ENTP", "INFJ", "INFP", "ENFJ", "ENFP", "ISTJ", "ISFJ", "ESTJ", "ESFJ", "ISTP", "ISFP", "ESTP", "ESFP"] as const;

export interface MBTIScores {
  "E-I": number;
  "S-N": number;
  "T-F": number;
  "J-P": number;
}

export function calculateMBTI(answers: { questionId: number; value: number }[]): { type: string; scores: MBTIScores } {
  const scores: MBTIScores = { "E-I": 0, "S-N": 0, "T-F": 0, "J-P": 0 };

  for (const answer of answers) {
    const question = MBTI_QUESTIONS.find((q) => q.id === answer.questionId);
    if (!question) continue;

    const value = answer.value; // 1-5: Strongly Disagree to Strongly Agree
    const normalized = value - 3; // -2 to 2

    if (question.positiveDirection === "first") {
      scores[question.dimension] += normalized;
    } else {
      scores[question.dimension] -= normalized;
    }
  }

  const type =
    (scores["E-I"] >= 0 ? "E" : "I") +
    (scores["S-N"] >= 0 ? "S" : "N") +
    (scores["T-F"] >= 0 ? "T" : "F") +
    (scores["J-P"] >= 0 ? "J" : "P");

  return { type, scores };
}

export function getPersonalityDescription(type: string): { strengths: string[]; weaknesses: string[] } {
  const descriptions: Record<string, { strengths: string[]; weaknesses: string[] }> = {
    INTJ: {
      strengths: ["Strategic thinking", "Independent", "Determined", "Analytical"],
      weaknesses: ["Can be dismissive", "Overly critical", "Impatient"],
    },
    INTP: {
      strengths: ["Logical", "Innovative", "Objective", "Open-minded"],
      weaknesses: ["Insensitive", "Absent-minded", "Second-guessing"],
    },
    ENTJ: {
      strengths: ["Efficient", "Energetic", "Self-confident", "Strategic"],
      weaknesses: ["Dominating", "Impatient", "Intolerant"],
    },
    ENTP: {
      strengths: ["Quick-witted", "Innovative", "Enthusiastic", "Knowledgeable"],
      weaknesses: ["Argumentative", "Insensitive", "Intolerant"],
    },
    INFJ: {
      strengths: ["Insightful", "Determined", "Passionate", "Altruistic"],
      weaknesses: ["Sensitive", "Extremely private", "Perfectionistic"],
    },
    INFP: {
      strengths: ["Empathetic", "Creative", "Passionate", "Idealistic"],
      weaknesses: ["Overly idealistic", "Self-critical", "Impersonal"],
    },
    ENFJ: {
      strengths: ["Tolerant", "Reliable", "Charismatic", "Altruistic"],
      weaknesses: ["Overly idealistic", "Too sensitive", "Self-sacrificing"],
    },
    ENFP: {
      strengths: ["Curious", "Perceptive", "Enthusiastic", "Excellent communicator"],
      weaknesses: ["Stress-prone", "Overly emotional", "Difficulty focusing"],
    },
    ISTJ: {
      strengths: ["Honest", "Dedicated", "Calm", "Practical"],
      weaknesses: ["Stubborn", "Insensitive", "Judgmental"],
    },
    ISFJ: {
      strengths: ["Supportive", "Reliable", "Patient", "Observant"],
      weaknesses: ["Humble", "Overload themselves", "Reluctant to change"],
    },
    ESTJ: {
      strengths: ["Dedicated", "Direct", "Honest", "Loyal"],
      weaknesses: ["Inflexible", "Uncomfortable with unconventional"],
    },
    ESFJ: {
      strengths: ["Loyal", "Sensitive", "Warm", "Practical"],
      weaknesses: ["Worried", "Insecure", "Overly needy"],
    },
    ISTP: {
      strengths: ["Optimistic", "Creative", "Practical", "Calm"],
      weaknesses: ["Stubborn", "Insensitive", "Private"],
    },
    ISFP: {
      strengths: ["Charming", "Sensitive", "Artistic", "Imaginative"],
      weaknesses: ["Independent", "Unpredictable", "Easily stressed"],
    },
    ESTP: {
      strengths: ["Bold", "Rational", "Original", "Perceptive"],
      weaknesses: ["Sensitive", "Impatient", "Risk-prone"],
    },
    ESFP: {
      strengths: ["Bold", "Original", "Aesthetic", "Practical"],
      weaknesses: ["Sensitive", "Conflict-averse", "Easily bored"],
    },
  };

  return descriptions[type] || {
    strengths: ["Adaptable", "Creative", "Determined"],
    weaknesses: ["May need to develop balance"],
  };
}
