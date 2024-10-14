export const courses = [
  {
    id: 1,
    title: "Introduction to Computer Science",
    code: "CS101",
    instructor: "Dr. John Doe",
    progress: 60,
    department: "Computer Science",
    credits: 3,
    image: "/images/image1.png",
    description:
      "An introduction to the fundamental concepts of computer science, including programming basics, data structures, and algorithms.",
    modules: [
      { id: 1, title: "Introduction to Programming", completed: true },
      { id: 2, title: "Data Structures", completed: true },
      { id: 3, title: "Algorithms", completed: false },
      { id: 4, title: "Object-Oriented Programming", completed: false },
    ],
    assignments: [
      {
        id: 1,
        title: "Hello World Program",
        dueDate: "2024-09-15",
        submitted: true,
      },
      {
        id: 2,
        title: "Implementing a Linked List",
        dueDate: "2024-10-01",
        submitted: false,
      },
      {
        id: 3,
        title: "Sorting Algorithm Comparison",
        dueDate: "2024-10-15",
        submitted: false,
      },
    ],
    grades: [
      { id: 1, title: "Midterm Exam", grade: 85, weight: 30 },
      { id: 2, title: "Programming Assignment 1", grade: 92, weight: 15 },
      { id: 3, title: "Quiz 1", grade: 78, weight: 10 },
    ],
    resources: [
      { id: 1, title: "Introduction to Algorithms", type: "Book", link: "#" },
      {
        id: 2,
        title: "Python Documentation",
        type: "Website",
        link: "https://docs.python.org",
      },
      {
        id: 3,
        title: "Data Structures Visualization",
        type: "Interactive Tool",
        link: "#",
      },
    ],
    announcements: [
      {
        id: 1,
        date: "2024-09-01",
        content: "Welcome to CS101! Please review the syllabus.",
      },
      {
        id: 2,
        date: "2024-09-10",
        content: "Reminder: First assignment due next week.",
      },
    ],
    discussions: [
      {
        id: 1,
        title: "Week 1 Discussion: What is Computer Science?",
        replies: 15,
      },
      { id: 2, title: "Debugging Techniques", replies: 8 },
    ],
  },
  {
    id: 2,
    title: "Calculus I",
    code: "MATH201",
    instructor: "Prof. Jane Smith",
    progress: 45,
    department: "Mathematics",
    credits: 4,
    image: "/images/image2.png",
    description:
      "A comprehensive introduction to differential and integral calculus of functions of one variable.",
    modules: [
      { id: 1, title: "Limits and Continuity", completed: true },
      { id: 2, title: "Derivatives", completed: true },
      { id: 3, title: "Applications of Derivatives", completed: false },
      { id: 4, title: "Integrals", completed: false },
      { id: 5, title: "Applications of Integrals", completed: false },
    ],
    assignments: [
      {
        id: 1,
        title: "Limit Problems Set",
        dueDate: "2024-09-20",
        submitted: true,
      },
      {
        id: 2,
        title: "Derivative Techniques",
        dueDate: "2024-10-05",
        submitted: true,
      },
      {
        id: 3,
        title: "Optimization Problems",
        dueDate: "2024-10-25",
        submitted: false,
      },
    ],
    grades: [
      { id: 1, title: "Quiz 1: Limits", grade: 88, weight: 10 },
      { id: 2, title: "Midterm Exam", grade: 79, weight: 30 },
      { id: 3, title: "Homework Set 1", grade: 95, weight: 15 },
    ],
    resources: [
      {
        id: 1,
        title: "Calculus: Early Transcendentals",
        type: "Textbook",
        link: "#",
      },
      {
        id: 2,
        title: "Khan Academy Calculus",
        type: "Video Series",
        link: "https://www.khanacademy.org/math/calculus-1",
      },
      {
        id: 3,
        title: "Desmos Graphing Calculator",
        type: "Tool",
        link: "https://www.desmos.com/calculator",
      },
    ],
    announcements: [
      {
        id: 1,
        date: "2024-09-05",
        content:
          "Office hours have been updated. Check the syllabus for new times.",
      },
      {
        id: 2,
        date: "2024-09-15",
        content: "Extra credit opportunity: Math Club meeting this Friday.",
      },
    ],
    discussions: [
      { id: 1, title: "Intuitive Understanding of Limits", replies: 12 },
      { id: 2, title: "Real-world Applications of Derivatives", replies: 7 },
    ],
  },
  {
    id: 3,
    title: "World History: Ancient Civilizations",
    code: "HIST105",
    instructor: "Dr. Robert Johnson",
    progress: 70,
    department: "History",
    credits: 3,
    image: "/images/image3.png",
    description:
      "An exploration of major ancient civilizations, their cultures, and their impact on world history.",
    modules: [
      { id: 1, title: "Introduction to Ancient History", completed: true },
      { id: 2, title: "Mesopotamian Civilizations", completed: true },
      { id: 3, title: "Ancient Egypt", completed: true },
      { id: 4, title: "Ancient Greece", completed: false },
      { id: 5, title: "Roman Empire", completed: false },
    ],
    assignments: [
      {
        id: 1,
        title: "Comparative Essay: Mesopotamia and Egypt",
        dueDate: "2024-09-30",
        submitted: true,
      },
      {
        id: 2,
        title: "Ancient Artifact Analysis",
        dueDate: "2024-10-20",
        submitted: true,
      },
      {
        id: 3,
        title: "Research Paper: Chosen Ancient Civilization",
        dueDate: "2024-11-15",
        submitted: false,
      },
    ],
    grades: [
      { id: 1, title: "Quiz: Early Civilizations", grade: 92, weight: 10 },
      { id: 2, title: "Midterm Exam", grade: 88, weight: 25 },
      { id: 3, title: "Essay 1", grade: 90, weight: 20 },
    ],
    resources: [
      {
        id: 1,
        title: "The History of the Ancient World",
        type: "Textbook",
        link: "#",
      },
      {
        id: 2,
        title: "Ancient History Encyclopedia",
        type: "Website",
        link: "https://www.ancient.eu/",
      },
      {
        id: 3,
        title: "BBC Documentaries: Ancient Civilizations",
        type: "Video Series",
        link: "#",
      },
    ],
    announcements: [
      {
        id: 1,
        date: "2024-09-10",
        content:
          "Guest lecturer next week: Dr. Emily Carter on Archaeological Methods.",
      },
      {
        id: 2,
        date: "2024-09-25",
        content: "Reminder: Museum visit scheduled for October 5th.",
      },
    ],
    discussions: [
      {
        id: 1,
        title: "The Fall of Ancient Empires: Patterns and Causes",
        replies: 18,
      },
      { id: 2, title: "Women's Roles in Ancient Societies", replies: 22 },
    ],
  },
  {
    id: 4,
    title: "Introduction to Psychology",
    code: "PSYC101",
    instructor: "Dr. Alice Williams",
    progress: 55,
    department: "Psychology",
    credits: 3,
    image: "/images/image2.png",
    description:
      "A comprehensive overview of the fundamental principles of psychology, including cognition, development, and social behavior.",
    modules: [
      { id: 1, title: "History and Approaches", completed: true },
      { id: 2, title: "Research Methods in Psychology", completed: true },
      { id: 3, title: "Biological Bases of Behavior", completed: false },
      { id: 4, title: "Sensation and Perception", completed: false },
      { id: 5, title: "Learning and Cognition", completed: false },
    ],
    assignments: [
      {
        id: 1,
        title: "Psychology Experiment Participation",
        dueDate: "2024-10-10",
        submitted: true,
      },
      {
        id: 2,
        title: "Research Methods Critique",
        dueDate: "2024-10-30",
        submitted: false,
      },
      {
        id: 3,
        title: "Case Study Analysis",
        dueDate: "2024-11-20",
        submitted: false,
      },
    ],
    grades: [
      { id: 1, title: "Quiz: Research Methods", grade: 85, weight: 10 },
      { id: 2, title: "Midterm Exam", grade: 78, weight: 30 },
      { id: 3, title: "Research Participation", grade: 100, weight: 15 },
    ],
    resources: [
      {
        id: 1,
        title: "Psychology (12th Edition)",
        type: "Textbook",
        link: "#",
      },
      {
        id: 2,
        title: "American Psychological Association",
        type: "Website",
        link: "https://www.apa.org/",
      },
      {
        id: 3,
        title: "TED Talks: Psychology",
        type: "Video Series",
        link: "#",
      },
    ],
    announcements: [
      {
        id: 1,
        date: "2024-09-15",
        content:
          "Psychology Department Open House next Friday. All students welcome!",
      },
      {
        id: 2,
        date: "2024-09-30",
        content: "Reminder: Sign up for experiment participation credits.",
      },
    ],
    discussions: [
      { id: 1, title: "Nature vs. Nurture: Modern Perspectives", replies: 25 },
      {
        id: 2,
        title: "Ethical Considerations in Psychological Research",
        replies: 16,
      },
    ],
  },
  {
    id: 5,
    title: "Organic Chemistry",
    code: "CHEM301",
    instructor: "Prof. Charlie Brown",
    progress: 40,
    department: "Chemistry",
    credits: 4,
    image: "/images/image5.png",
    description:
      "A study of the structure, properties, composition, reactions, and synthesis of organic compounds.",
    modules: [
      { id: 1, title: "Introduction to Organic Compounds", completed: true },
      { id: 2, title: "Stereochemistry", completed: true },
      { id: 3, title: "Reaction Mechanisms", completed: false },
      { id: 4, title: "Alkenes and Alkynes", completed: false },
      { id: 5, title: "Aromatic Compounds", completed: false },
    ],
    assignments: [
      {
        id: 1,
        title: "Molecular Model Building",
        dueDate: "2024-09-25",
        submitted: true,
      },
      {
        id: 2,
        title: "Reaction Mechanism Problem Set",
        dueDate: "2024-10-15",
        submitted: false,
      },
      {
        id: 3,
        title: "Synthesis Design Challenge",
        dueDate: "2024-11-05",
        submitted: false,
      },
    ],
    grades: [
      { id: 1, title: "Lab Report 1", grade: 88, weight: 15 },
      { id: 2, title: "Midterm Exam", grade: 76, weight: 30 },
      { id: 3, title: "Quiz: Nomenclature", grade: 95, weight: 10 },
    ],
    resources: [
      {
        id: 1,
        title: "Organic Chemistry (8th Edition)",
        type: "Textbook",
        link: "#",
      },
      { id: 2, title: "ChemDraw Software", type: "Tool", link: "#" },
      {
        id: 3,
        title: "Royal Society of Chemistry",
        type: "Website",
        link: "https://www.rsc.org/",
      },
    ],
    announcements: [
      {
        id: 1,
        date: "2024-09-20",
        content:
          "Safety goggles must be worn at all times in the lab. No exceptions!",
      },
      {
        id: 2,
        date: "2024-10-05",
        content: "Optional review session for midterm this Saturday, 2-4 PM.",
      },
    ],
    discussions: [
      {
        id: 1,
        title: "Organic Synthesis in Pharmaceutical Industry",
        replies: 14,
      },
      {
        id: 2,
        title: "Green Chemistry: Sustainable Organic Reactions",
        replies: 11,
      },
    ],
  },
  {
    id: 6,
    title: "Microeconomics",
    code: "ECON201",
    instructor: "Dr. Diana Ross",
    progress: 65,
    department: "Economics",
    credits: 3,
    image: "/images/image6.png",
    description:
      "An examination of how individuals and firms make decisions and interact in markets.",
    modules: [
      { id: 1, title: "Introduction to Economics", completed: true },
      { id: 2, title: "Supply and Demand", completed: true },
      { id: 3, title: "Consumer Theory", completed: true },
      { id: 4, title: "Theory of the Firm", completed: false },
      { id: 5, title: "Market Structures", completed: false },
    ],
    assignments: [
      {
        id: 1,
        title: "Supply and Demand Analysis",
        dueDate: "2024-09-28",
        submitted: true,
      },
      {
        id: 2,
        title: "Consumer Behavior Case Study",
        dueDate: "2024-10-18",
        submitted: true,
      },
      {
        id: 3,
        title: "Market Structure Comparison",
        dueDate: "2024-11-08",
        submitted: false,
      },
    ],
    grades: [
      { id: 1, title: "Problem Set 1", grade: 92, weight: 15 },
      { id: 2, title: "Midterm Exam", grade: 84, weight: 30 },
      { id: 3, title: "Economic News Analysis", grade: 88, weight: 10 },
    ],
    resources: [
      {
        id: 1,
        title: "Principles of Microeconomics (9th Edition)",
        type: "Textbook",
        link: "#",
      },
      {
        id: 2,
        title: "FRED Economic Data",
        type: "Website",
        link: "https://fred.stlouisfed.org/",
      },
      { id: 3, title: "EconGraphs", type: "Tool", link: "#" },
    ],
    announcements: [
      {
        id: 1,
        date: "2024-09-12",
        content:
          "Economics Department Career Fair on October 1st. Don't miss it!",
      },
      {
        id: 2,
        date: "2024-09-28",
        content:
          "Guest lecture by Dr. James Lee on Behavioral Economics next week.",
      },
    ],
    discussions: [
      { id: 1, title: "Real-world Examples of Price Elasticity", replies: 20 },
      {
        id: 2,
        title: "Impact of COVID-19 on Microeconomic Trends",
        replies: 28,
      },
    ],
  },
];
