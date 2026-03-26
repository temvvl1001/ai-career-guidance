export interface MBTIQuestion {
  id: number;
  question: string;
  questionMn?: string;
  dimension: "E-I" | "S-N" | "T-F" | "J-P";
  positiveDirection: "first" | "second";
}

export const MBTI_QUESTIONS: MBTIQuestion[] = [
  { id: 1, question: "I prefer to spend time with others rather than alone.", questionMn: "Би ганцаараа байхаас бусадтай цаг өнгөрүүлэхийг илүүд үздэг.", dimension: "E-I", positiveDirection: "first" },
  { id: 2, question: "I focus on concrete facts rather than abstract ideas.", questionMn: "Би хийсвэр санаанаас илүү тодорхой баримт дээр анхаарлаа төвлөрүүлдэг.", dimension: "S-N", positiveDirection: "first" },
  { id: 3, question: "I make decisions based on logic rather than feelings.", questionMn: "Би мэдрэмжээсээ илүү логикт тулгуурлан шийдвэр гаргадаг.", dimension: "T-F", positiveDirection: "first" },
  { id: 4, question: "I prefer a structured schedule over spontaneity.", questionMn: "Би аяндаа болохоос илүү тогтвортой хуваарийг илүүд үздэг.", dimension: "J-P", positiveDirection: "first" },
  { id: 5, question: "I feel energized after social gatherings.", questionMn: "Нийгмийн цуглаанаас хойш би эрч хүч мэдэрдэг.", dimension: "E-I", positiveDirection: "first" },
  { id: 6, question: "I enjoy thinking about future possibilities.", questionMn: "Би ирээдүйн боломжуудын талаар бодохдоо баяртай байдаг.", dimension: "S-N", positiveDirection: "second" },
  { id: 7, question: "I consider others' feelings when making decisions.", questionMn: "Шийдвэр гаргахдаа би бусдын мэдрэмжийг харгалздаг.", dimension: "T-F", positiveDirection: "second" },
  { id: 8, question: "I like to keep my options open.", questionMn: "Би сонголтоо нээлттэй байлгахыг дуртай.", dimension: "J-P", positiveDirection: "second" },
  { id: 9, question: "I need alone time to recharge.", questionMn: "Би эрч хүчээ сэргээхийн тулд ганцаараа цаг хэрэгтэй.", dimension: "E-I", positiveDirection: "second" },
  { id: 10, question: "I pay attention to details and specifics.", questionMn: "Би нарийн ширийн зүйл, тодорхой мэдээлэлд анхаарал тавьдаг.", dimension: "S-N", positiveDirection: "first" },
  { id: 11, question: "I prioritize fairness over harmony.", questionMn: "Би эв найрамдлаас илүү шударга ёсыг эрхэмлэдэг.", dimension: "T-F", positiveDirection: "first" },
  { id: 12, question: "I make to-do lists and follow them.", questionMn: "Би хийх зүйлсийн жагсаалт гаргаж, дагаж мөрддөг.", dimension: "J-P", positiveDirection: "first" },
  { id: 13, question: "I enjoy being the center of attention.", questionMn: "Би анхаарлын төвд байхдаа таатай байдаг.", dimension: "E-I", positiveDirection: "first" },
  { id: 14, question: "I see the big picture rather than details.", questionMn: "Би нарийн ширийн зүйлсээс илүү ерөнхий зургийг хардаг.", dimension: "S-N", positiveDirection: "second" },
  { id: 15, question: "I value empathy in decision-making.", questionMn: "Шийдвэр гаргахад би эмпатийг чухалчилдаг.", dimension: "T-F", positiveDirection: "second" },
  { id: 16, question: "I prefer flexibility over planning.", questionMn: "Би төлөвлөлтөөс илүү уян хатан байдлыг илүүд үздэг.", dimension: "J-P", positiveDirection: "second" },
  { id: 17, question: "I have a wide circle of acquaintances.", questionMn: "Миний танилуудын тойрог өргөн.", dimension: "E-I", positiveDirection: "first" },
  { id: 18, question: "I trust my intuition over data.", questionMn: "Би өгөгдлөөс илүү зөн совиндоо итгэдэг.", dimension: "S-N", positiveDirection: "second" },
  { id: 19, question: "I prefer objective analysis over subjective judgment.", questionMn: "Би субьектив үнэлгээнээс илүү объектив шинжилгээг илүүд үздэг.", dimension: "T-F", positiveDirection: "first" },
  { id: 20, question: "I like to finish tasks before starting new ones.", questionMn: "Би шинэ ажил эхлэхийн өмнө одоогийнхоо ажлаа дуусгахыг дуртай.", dimension: "J-P", positiveDirection: "first" },
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
export function getPersonalityDescription(
  type: string,
  locale: "en" | "mn"
): { strengths: string[]; weaknesses: string[] } {
  const descriptions: Record<
    string,
    {
      en: { strengths: string[]; weaknesses: string[] };
      mn: { strengths: string[]; weaknesses: string[] };
    }
  > = {
    INTJ: {
      en: {
        strengths: ["Strategic thinking", "Independent", "Determined", "Analytical"],
        weaknesses: ["Can be dismissive", "Overly critical", "Impatient"],
      },
      mn: {
        strengths: ["Стратегийн сэтгэлгээтэй", "Бие даасан", "Шийдэмгий", "Аналитик"],
        weaknesses: ["Бусдыг үл тоомсорлох", "Хэт шүүмжлэлтэй", "Тэвчээргүй"],
      },
    },

    INTP: {
      en: {
        strengths: ["Logical", "Innovative", "Objective", "Open-minded"],
        weaknesses: ["Insensitive", "Absent-minded", "Second-guessing"],
      },
      mn: {
        strengths: ["Логик сэтгэлгээтэй", "Шинийг санаачлагч", "Объектив", "Нээлттэй"],
        weaknesses: ["Мэдрэмжгүй мэт", "Анхаарал сарнидаг", "Эргэлздэг"],
      },
    },

    ENTJ: {
      en: {
        strengths: ["Efficient", "Energetic", "Self-confident", "Strategic"],
        weaknesses: ["Dominating", "Impatient", "Intolerant"],
      },
      mn: {
        strengths: ["Үр ашигтай", "Эрч хүчтэй", "Өөртөө итгэлтэй", "Стратегич"],
        weaknesses: ["Захирах хандлагатай", "Тэвчээргүй", "Хүлээцгүй"],
      },
    },

    ENTP: {
      en: {
        strengths: ["Quick-witted", "Innovative", "Enthusiastic", "Knowledgeable"],
        weaknesses: ["Argumentative", "Insensitive", "Intolerant"],
      },
      mn: {
        strengths: ["Сэргэлэн", "Шинийг санаачлагч", "Идэвхтэй", "Мэдлэгтэй"],
        weaknesses: ["Маргаантай", "Мэдрэмжгүй", "Хүлээцгүй"],
      },
    },

    INFJ: {
      en: {
        strengths: ["Insightful", "Determined", "Passionate", "Altruistic"],
        weaknesses: ["Sensitive", "Private", "Perfectionistic"],
      },
      mn: {
        strengths: ["Гүн ойлголттой", "Шийдэмгий", "Сэтгэлтэй", "Өгөөмөр"],
        weaknesses: ["Эмзэг", "Хэт хаалттай", "Төгс төгөлдөрч"],
      },
    },

    INFP: {
      en: {
        strengths: ["Empathetic", "Creative", "Passionate", "Idealistic"],
        weaknesses: ["Overly idealistic", "Self-critical", "Impersonal"],
      },
      mn: {
        strengths: ["Эмпатитай", "Бүтээлч", "Сэтгэлтэй", "Идеалист"],
        weaknesses: ["Хэт идеалист", "Өөрийгөө шүүмжилдэг", "Хөндий"],
      },
    },

    ENFJ: {
      en: {
        strengths: ["Tolerant", "Reliable", "Charismatic", "Altruistic"],
        weaknesses: ["Overly idealistic", "Too sensitive", "Self-sacrificing"],
      },
      mn: {
        strengths: ["Хүлээцтэй", "Найдвартай", "Харизмтай", "Өгөөмөр"],
        weaknesses: ["Хэт идеалист", "Хэт эмзэг", "Өөрийгөө золиосолдог"],
      },
    },

    ENFP: {
      en: {
        strengths: ["Curious", "Perceptive", "Enthusiastic", "Excellent communicator"],
        weaknesses: ["Stress-prone", "Overly emotional", "Difficulty focusing"],
      },
      mn: {
        strengths: ["Сониуч", "Ажигч", "Идэвхтэй", "Сайн харилцагч"],
        weaknesses: ["Стресст амархан", "Хэт сэтгэл хөдлөлтэй", "Төвлөрөхөд хэцүү"],
      },
    },

    ISTJ: {
      en: {
        strengths: ["Honest", "Dedicated", "Calm", "Practical"],
        weaknesses: ["Stubborn", "Insensitive", "Judgmental"],
      },
      mn: {
        strengths: ["Шударга", "Үнэнч", "Тайван", "Практик"],
        weaknesses: ["Зөрүүд", "Мэдрэмж багатай", "Шүүмжлэлтэй"],
      },
    },

    ISFJ: {
      en: {
        strengths: ["Supportive", "Reliable", "Patient", "Observant"],
        weaknesses: ["Humble", "Overload themselves", "Reluctant to change"],
      },
      mn: {
        strengths: ["Дэмждэг", "Найдвартай", "Тэвчээртэй", "Ажигч"],
        weaknesses: ["Өөрийгөө дарамталдаг", "Ачаалал их авдаг", "Өөрчлөлтөд дургүй"],
      },
    },

    ESTJ: {
      en: {
        strengths: ["Dedicated", "Direct", "Honest", "Loyal"],
        weaknesses: ["Inflexible", "Uncomfortable with unconventional"],
      },
      mn: {
        strengths: ["Үнэнч", "Шударга", "Шууд", "Итгэлтэй"],
        weaknesses: ["Уян хатан биш", "Шинэ зүйлд дургүй"],
      },
    },

    ESFJ: {
      en: {
        strengths: ["Loyal", "Sensitive", "Warm", "Practical"],
        weaknesses: ["Worried", "Insecure", "Overly needy"],
      },
      mn: {
        strengths: ["Үнэнч", "Мэдрэмжтэй", "Дулаан", "Практик"],
        weaknesses: ["Санаа зовдог", "Итгэлгүй", "Хэт хамааралтай"],
      },
    },

    ISTP: {
      en: {
        strengths: ["Optimistic", "Creative", "Practical", "Calm"],
        weaknesses: ["Stubborn", "Insensitive", "Private"],
      },
      mn: {
        strengths: ["Өөдрөг", "Бүтээлч", "Практик", "Тайван"],
        weaknesses: ["Зөрүүд", "Мэдрэмжгүй", "Хаалттай"],
      },
    },

    ISFP: {
      en: {
        strengths: ["Charming", "Sensitive", "Artistic", "Imaginative"],
        weaknesses: ["Unpredictable", "Easily stressed", "Independent"],
      },
      mn: {
        strengths: ["Сэтгэл татам", "Мэдрэмжтэй", "Уран бүтээлч", "Сэтгэмжтэй"],
        weaknesses: ["Тогтворгүй", "Стресст амархан", "Хэт бие даасан"],
      },
    },

    ESTP: {
      en: {
        strengths: ["Bold", "Rational", "Original", "Perceptive"],
        weaknesses: ["Impatient", "Risk-prone", "Insensitive"],
      },
      mn: {
        strengths: ["Зоригтой", "Рационал", "Өвөрмөц", "Ажигч"],
        weaknesses: ["Тэвчээргүй", "Эрсдэлд дуртай", "Мэдрэмжгүй"],
      },
    },

    ESFP: {
      en: {
        strengths: ["Bold", "Original", "Aesthetic", "Practical"],
        weaknesses: ["Easily bored", "Conflict-averse", "Sensitive"],
      },
      mn: {
        strengths: ["Зоригтой", "Өвөрмөц", "Гоо зүйн мэдрэмжтэй", "Практик"],
        weaknesses: ["Амархан уйддаг", "Маргаанаас зайлсхийдэг", "Эмзэг"],
      },
    },
  };

  const selected = descriptions[type];

  if (!selected) {
    return locale === "mn"
      ? {
          strengths: ["Дасан зохицох чадвартай", "Бүтээлч", "Шийдэмгий"],
          weaknesses: ["Тэнцвэрээ сайжруулах шаардлагатай"],
        }
      : {
          strengths: ["Adaptable", "Creative", "Determined"],
          weaknesses: ["May need to develop balance"],
        };
  }

  return selected[locale];
}
