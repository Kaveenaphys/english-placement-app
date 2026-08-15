
export const grammarQuestions = [
  // A2
  {
    id: "A2-01",
    level: "A2",
    question: "I usually _____ breakfast at 7:30 in the morning.",
    options: ["have", "having", "had", "has"],
    correctAnswer: "have",
  },
  {
    id: "A2-02",
    level: "A2",
    question: "Sarah _____ to work by bus every day.",
    options: ["go", "goes", "going", "gone"],
    correctAnswer: "goes",
  },
  {
    id: "A2-03",
    level: "A2",
    question: "We _____ dinner when John called us.",
    options: ["have", "had", "were having", "are having"],
    correctAnswer: "were having",
  },
  {
    id: "A2-05",
    level: "A2",
    question: "I haven't seen David _____ Monday.",
    options: ["for", "since", "during", "from"],
    correctAnswer: "since",
  },
  {
    id: "A2-14",
    level: "A2",
    question: "If it rains tomorrow, we _____ at home.",
    options: ["stay", "stayed", "will stay", "staying"],
    correctAnswer: "will stay",
  },

  // B1
  {
    id: "B1-01",
    level: "B1",
    question:
      "I _____ this book for three weeks, but I still haven't finished it.",
    options: ["read", "am reading", "have been reading", "was reading"],
    correctAnswer: "have been reading",
  },
  {
    id: "B1-02",
    level: "B1",
    question: "When I arrived at the station, the train _____.",
    options: [
      "already left",
      "has already left",
      "had already left",
      "already leaves",
    ],
    correctAnswer: "had already left",
  },
  {
    id: "B1-03",
    level: "B1",
    question:
      "If I _____ enough money, I would buy a new laptop.",
    options: ["have", "had", "will have", "would have"],
    correctAnswer: "had",
  },
  {
    id: "B1-06",
    level: "B1",
    question: "She asked me where _____.",
    options: ["did I live", "I lived", "do I live", "lived I"],
    correctAnswer: "I lived",
  },
  {
    id: "B1-15",
    level: "B1",
    question: "If you had told me earlier, I _____ you.",
    options: ["help", "would help", "would have helped", "will help"],
    correctAnswer: "would have helped",
  },

  // C1
  {
    id: "C1-01",
    level: "C1",
    question:
      "The report's conclusions are somewhat _____, given the limited amount of available evidence.",
    options: ["tentative", "hesitant", "reluctant", "indecisive"],
    correctAnswer: "tentative",
  },
  {
    id: "C1-02",
    level: "C1",
    question:
      "The board decided to _____ the proposed merger until further financial analysis could be conducted.",
    options: ["defer", "deter", "decline", "deviate"],
    correctAnswer: "defer",
  },
  {
    id: "C1-04",
    level: "C1",
    question:
      "The company needs to _____ the potential risks before proceeding with the investment.",
    options: ["ascertain", "assess", "assume", "assert"],
    correctAnswer: "assess",
  },
  {
    id: "C1-07",
    level: "C1",
    question:
      "Were the company _____ to expand internationally, it would need to reconsider its current supply chain.",
    options: ["decide", "deciding", "to decide", "decided"],
    correctAnswer: "to decide",
  },
  {
    id: "C1-11",
    level: "C1",
    question:
      "Little _____ that the decision would have such far-reaching consequences.",
    options: [
      "they realized",
      "did they realize",
      "they had realized",
      "had they realized",
    ],
    correctAnswer: "did they realize",
  },

  // C2
  {
    id: "C2-01",
    level: "C2",
    question:
      "The minister's statement was carefully worded so as to _____ any suggestion that the government had acted improperly.",
    options: ["dispel", "dispel with", "dissuade", "deter"],
    correctAnswer: "dispel",
  },
  {
    id: "C2-02",
    level: "C2",
    question:
      "The evidence is far from _____; indeed, several independent studies have reached similar conclusions.",
    options: ["conclusive", "concluding", "concluded", "conclusively"],
    correctAnswer: "conclusive",
  },
  {
    id: "C2-04",
    level: "C2",
    question:
      "His criticism was not so much directed at the policy _____ at the way it had been implemented.",
    options: ["than", "as", "but", "rather"],
    correctAnswer: "as",
  },
  {
    id: "C2-07",
    level: "C2",
    question:
      "The argument is predicated _____ the assumption that consumers will continue to behave in the same way.",
    options: ["in", "at", "on", "with"],
    correctAnswer: "on",
  },
  {
    id: "C2-13",
    level: "C2",
    question:
      "Rarely _____ such a comprehensive review of the organization's internal procedures.",
    options: [
      "has the company undertaken",
      "the company has undertaken",
      "the company undertook",
      "did the company undertaken",
    ],
    correctAnswer: "has the company undertaken",
  },
];

export const readingPassage = `
Many people believe that working from home is a recent idea,
but remote work has existed in different forms for many years.
What has changed is the number of people who now have the
technology to work effectively without being in an office.

Working from home can offer several advantages. Employees may
save time because they do not have to travel to and from work.
They may also have greater flexibility when organizing their
working day. For some people, this can make it easier to balance
their professional and personal responsibilities.

However, remote work is not without challenges. Some employees
find it difficult to separate work from their personal life when
both take place in the same environment. Others miss the social
interaction they normally have with colleagues. For this reason,
some companies have adopted a flexible approach in which
employees work from home on some days and in an office on others.

The success of remote work therefore depends on more than simply
having the right technology. It also requires employees and
employers to develop effective ways of communicating, managing
time, and maintaining a healthy balance between work and personal
life.
`;
export const readingQuestions = [
  {
    id: "R-01",
    question: "What is the main idea of the passage?",
    options: [
      "Working from home is always better than working in an office.",
      "Remote work has advantages and challenges and requires effective management.",
      "Technology has made offices unnecessary.",
      "Most employees prefer working from home.",
    ],
    correctAnswer:
      "Remote work has advantages and challenges and requires effective management.",
  },

  {
    id: "R-02",
    question: "According to the passage, what is one advantage of working from home?",
    options: [
      "Employees have more social interaction.",
      "Employees can avoid communicating with colleagues.",
      "Employees may save time by not travelling to work.",
      "Employees always work fewer hours.",
    ],
    correctAnswer:
      "Employees may save time by not travelling to work.",
  },

  {
    id: "R-03",
    question: "In the passage, what does the word 'flexibility' most closely mean?",
    options: [
      "The ability to change or organize things more freely.",
      "The requirement to work longer hours.",
      "The ability to avoid responsibility.",
      "The need to follow a strict schedule.",
    ],
    correctAnswer:
      "The ability to change or organize things more freely.",
  },

  {
    id: "R-04",
    question:
      "What can be inferred about companies that allow employees to work both remotely and in the office?",
    options: [
      "They believe remote work has no disadvantages.",
      "They are trying to combine the benefits of different working arrangements.",
      "They do not trust their employees to work remotely.",
      "They want employees to work longer hours.",
    ],
    correctAnswer:
      "They are trying to combine the benefits of different working arrangements.",
  },

  {
    id: "R-05",
    question:
      "Why does the author mention communication and time management in the final paragraph?",
    options: [
      "To explain why technology is unnecessary.",
      "To suggest that remote work requires skills and organization in addition to technology.",
      "To argue that employees should return to offices.",
      "To show that remote work is becoming less popular.",
    ],
    correctAnswer:
      "To suggest that remote work requires skills and organization in addition to technology.",
  },
    {
    id: "R-06",
    question:
      "Why might working from home make it easier for some people to balance their responsibilities?",
    options: [
      "They have fewer professional responsibilities.",
      "They can organize their working day with greater flexibility.",
      "They do not need to communicate with employers.",
      "They work fewer hours than office employees.",
    ],
    correctAnswer:
      "They can organize their working day with greater flexibility.",
  },

  {
    id: "R-07",
    question:
      "What is one problem some employees experience when working remotely?",
    options: [
      "They cannot use modern technology.",
      "They have difficulty separating work from personal life.",
      "They have too much social interaction.",
      "They are unable to organize their working day.",
    ],
    correctAnswer:
      "They have difficulty separating work from personal life.",
  },

  {
    id: "R-08",
    question:
      "Why do some employees miss working in an office?",
    options: [
      "They prefer travelling to work.",
      "They need access to better technology.",
      "They miss interacting socially with colleagues.",
      "They find office work less demanding.",
    ],
    correctAnswer:
      "They miss interacting socially with colleagues.",
  },

  {
    id: "R-09",
    question:
      "What approach have some companies adopted in response to the challenges of remote work?",
    options: [
      "They have completely stopped allowing remote work.",
      "They require employees to work from home every day.",
      "They allow employees to work remotely on some days and in the office on others.",
      "They allow employees to choose whether or not to work.",
    ],
    correctAnswer:
      "They allow employees to work remotely on some days and in the office on others.",
  },

  {
    id: "R-10",
    question:
      "According to the final paragraph, what does successful remote work require besides technology?",
    options: [
      "Longer working hours and fewer meetings.",
      "Effective communication, time management, and a healthy work-life balance.",
      "Employees to work entirely from home.",
      "Companies to provide larger offices.",
    ],
    correctAnswer:
      "Effective communication, time management, and a healthy work-life balance.",
  },
];
export const listeningQuestions = [
  // =========================
  // PART 1
  // Questions 1–10
  // =========================

  {
    id: "L1-01",
    part: 1,
    question: "Why does the caller contact Country Comfort Albury?",
    options: [
      "To ask about local activities",
      "To book a double room for a weekend",
      "To find a restaurant",
      "To ask about long-term accommodation",
    ],
    correctAnswer: "To book a double room for a weekend",
  },

  {
    id: "L1-02",
    part: 1,
    question: "How much does a waterfront room cost per night?",
    options: [
      "$45",
      "$55",
      "$80",
      "$95",
    ],
    correctAnswer: "$80",
  },

  {
    id: "L1-03",
    part: 1,
    question:
      "How much does extra bedding cost for a child aged 12 or under staying in a guest house room?",
    options: [
      "$8 per night",
      "$10 per night",
      "$15 per night",
      "$20 per night",
    ],
    correctAnswer: "$10 per night",
  },

  {
    id: "L1-04",
    part: 1,
    question: "Which facility is free for hotel guests?",
    options: [
      "The tennis court",
      "In-house movies",
      "The swimming pool",
      "Extra bedding",
    ],
    correctAnswer: "The swimming pool",
  },

  {
    id: "L1-05",
    part: 1,
    question:
      "How much does it cost to use the tennis court for one hour, including racket rental?",
    options: [
      "$4",
      "$8",
      "$10",
      "$15",
    ],
    correctAnswer: "$8",
  },

  {
    id: "L1-06",
    part: 1,
    question: "Which two facilities are provided free of charge?",
    options: [
      "Parking and internet access",
      "Tennis and parking",
      "Internet access and movies",
      "Parking and swimming",
    ],
    correctAnswer: "Parking and internet access",
  },

  {
    id: "L1-07",
    part: 1,
    question: "What is the hotel's street address?",
    options: [
      "648 Dean Street",
      "684 Dean Street",
      "648 Queen Street",
      "684 Queen Street",
    ],
    correctAnswer: "648 Dean Street",
  },

  {
    id: "L1-08",
    part: 1,
    question: "Which activity does the man say is particularly suitable for winter?",
    options: [
      "Swimming",
      "Alpine skiing",
      "Tennis",
      "Shopping",
    ],
    correctAnswer: "Alpine skiing",
  },

  {
    id: "L1-09",
    part: 1,
    question: "What does the woman say she would like to do?",
    options: [
      "Go skiing",
      "Visit the restaurants",
      "Walk through the valleys and use the spa",
      "Watch movies at the hotel",
    ],
    correctAnswer:
      "Walk through the valleys and use the spa",
  },

  {
    id: "L1-10",
    part: 1,
    question:
      "What is the hotel particularly convenient for because of its location?",
    options: [
      "Access to the airport",
      "Access to the beach",
      "Access to the business district, shops and restaurants",
      "Access to the ski slopes",
    ],
    correctAnswer:
      "Access to the business district, shops and restaurants",
  },


  // =========================
  // PART 2
  // Questions 11–20
  // =========================

  {
    id: "L2-01",
    part: 2,
    question:
      "Why did Joey miss the first lecture about the semester project?",
    options: [
      "He was working.",
      "He was travelling.",
      "He was ill.",
      "He had forgotten about the lecture.",
    ],
    correctAnswer: "He was ill.",
  },

  {
    id: "L2-02",
    part: 2,
    question: "Which author has Joey chosen for his project?",
    options: [
      "Ernest Hemingway",
      "Emily Brontë",
      "Carlos Castanada",
      "Dr. Castle",
    ],
    correctAnswer: "Carlos Castanada",
  },

  {
    id: "L2-03",
    part: 2,
    question:
      "What must students read about their chosen author?",
    options: [
      "A collection of poems",
      "A full-length biography",
      "An online article",
      "A short story",
    ],
    correctAnswer: "A full-length biography",
  },

  {
    id: "L2-04",
    part: 2,
    question:
      "What is the minimum length required for the biography?",
    options: [
      "150 pages",
      "200 pages",
      "250 pages",
      "300 pages",
    ],
    correctAnswer: "250 pages",
  },

  {
    id: "L2-05",
    part: 2,
    question:
      "What type of work is Joey planning to read for the main part of his project?",
    options: [
      "A novel",
      "A collection of poems",
      "A short story",
      "A biography",
    ],
    correctAnswer: "A novel",
  },

  {
    id: "L2-06",
    part: 2,
    question:
      "What does the video need to communicate about the author?",
    options: [
      "Only the author's most famous work",
      "The essence of the author's life and writing",
      "A complete history of the author's country",
      "A summary of the author's biography",
    ],
    correctAnswer:
      "The essence of the author's life and writing",
  },

  {
    id: "L2-07",
    part: 2,
    question:
      "What should the selected passage from the author's work have in common with the biographical extract?",
    options: [
      "They should have the same length.",
      "They should be written in the same year.",
      "They should be connected by a theme.",
      "They should both describe the author's childhood.",
    ],
    correctAnswer:
      "They should be connected by a theme.",
  },

  {
    id: "L2-08",
    part: 2,
    question:
      "What does Olivia suggest using to create the atmosphere in the video?",
    options: [
      "Live actors only",
      "Sound effects and visuals",
      "Music and interviews",
      "Photographs from the university",
    ],
    correctAnswer: "Sound effects and visuals",
  },

  {
    id: "L2-09",
    part: 2,
    question:
      "What must students include at the end of their video?",
    options: [
      "A summary of their findings",
      "Their personal contact information",
      "A bibliography of the materials they used",
      "A list of all the software they used",
    ],
    correctAnswer:
      "A bibliography of the materials they used",
  },

  {
    id: "L2-10",
    part: 2,
    question:
      "What percentage of the project mark is based on the content?",
    options: [
      "25%",
      "40%",
      "50%",
      "75%",
    ],
    correctAnswer: "50%",
  },
];