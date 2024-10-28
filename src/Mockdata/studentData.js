export const studentData = {
  // Personal Information
  personalInfo: {
    studentNumber: "219001234",
    name: "Thabo Ndlovu",
    dateOfBirth: "1999-05-15",
    idNumber: "9905150123456",
    gender: "Male",
    profilePic: "/images/profile.png",
    nationality: "South African",
    email: "thabo.ndlovu@university.ac.za",
    phoneNumber: "+27 73 123 4567",
    address: {
      street: "123 Mandela Street",
      suburb: "Soweto",
      city: "Johannesburg",
      province: "Gauteng",
      postalCode: "2019",
    },
    emergencyContact: {
      name: "Nomsa Ndlovu",
      relationship: "Mother",
      phoneNumber: "+27 82 987 6543",
    },
  },

  // Academic Information
  academicInfo: {
    faculty: "Science and Technology",
    programme: "BSc Computer Science",
    yearOfStudy: 3,
    enrollmentDate: "2022-01-15",
    expectedGraduationDate: "2024-12-15",
    academicStatus: "Good Standing",
    gpa: 3.7,
    creditsEarned: 180,
    creditsRequired: 360,
    recentAchievements: [
      "Dean's List - 2023",
      "First Prize in Hackathon 2023",
      "Academic Excellence Award in Mathematics",
    ],
    upcomingDeadlines: [
      { date: "2024-05-20", description: "Final Project Submission" },
      { date: "2024-06-01", description: "Exam Registration Deadline" },
      { date: "2024-07-15", description: "Internship Application Due" },
    ],
  },

  // Modules (Current and Past)
  modules: [
    {
      code: "CSC3022F",
      name: "Database Systems",
      credits: 18,
      lecturer: "Dr. Sipho Mkhize",
      description: "Introduction to database design and implementation.",
      year: 2024,
      semester: 1,
      status: "In Progress",
      assessments: [
        { name: "Assignment 1", weight: 20, grade: 85 },
        { name: "Midterm Exam", weight: 30, grade: null },
        { name: "Final Project", weight: 20, grade: null },
        { name: "Final Exam", weight: 30, grade: null },
      ],
    },
    {
      code: "CSC3023S",
      name: "Computer Networks",
      credits: 18,
      lecturer: "Prof. Amina Fakude",
      description: "Fundamentals of computer networking and protocols.",
      year: 2024,
      semester: 2,
      status: "Upcoming",
      assessments: [
        { name: "Assignment 1", weight: 20, grade: 85 },
        { name: "Midterm Exam", weight: 30, grade: null },
        { name: "Final Project", weight: 20, grade: null },
        { name: "Final Exam", weight: 30, grade: null },
      ],
    },
    {
      code: "MAM2083F",
      name: "Linear Algebra",
      credits: 16,
      lecturer: "Dr. John Smith",
      description: "Study of linear equations, matrices, and vector spaces.",
      year: 2023,
      semester: 1,
      status: "Completed",
      assessments: [
        { name: "Assignment 1", weight: 20, grade: 85 },
        { name: "Midterm Exam", weight: 30, grade: null },
        { name: "Final Project", weight: 20, grade: null },
        { name: "Final Exam", weight: 30, grade: null },
      ],
    },
    // Add more modules as needed
  ],

  // Transcript
  transcript: [
    {
      year: 2022,
      semester: 1,
      moduleCode: "CSC1015F",
      moduleName: "Computer Science 1",
      credits: 18,
      grade: 75,
    },
    {
      year: 2022,
      semester: 1,
      moduleCode: "MAM1000W",
      moduleName: "Mathematics 1",
      credits: 36,
      grade: 80,
    },
    {
      year: 2022,
      semester: 2,
      moduleCode: "CSC1016S",
      moduleName: "Computer Science 2",
      credits: 18,
      grade: 82,
    },
    {
      year: 2022,
      semester: 2,
      moduleCode: "STA1000S",
      moduleName: "Statistics 1",
      credits: 18,
      grade: 73,
    },
    {
      year: 2023,
      semester: 1,
      moduleCode: "CSC2001F",
      moduleName: "Computer Science 2",
      credits: 18,
      grade: 79,
    },
    {
      year: 2023,
      semester: 1,
      moduleCode: "MAM2083F",
      moduleName: "Linear Algebra",
      credits: 16,
      grade: 78,
    },
    {
      year: 2023,
      semester: 2,
      moduleCode: "CSC2002S",
      moduleName: "Database Systems",
      credits: 18,
      grade: 85,
    },
    {
      year: 2023,
      semester: 2,
      moduleCode: "CSC2003S",
      moduleName: "Algorithms & Data Structures",
      credits: 18,
      grade: 88,
    },
  ],

  // Degree Progress
  degreeProgress: {
    overall: 65,
    coreModules: { completed: 12, total: 20 },
    electiveModules: { completed: 4, total: 8 },
    credits: { earned: 180, required: 360 },
  },

  // Financial Information
  financialInfo: {
    accountBalance: 15000,
    tuitionFees: 55000,
    accommodation: 45000,
    mealPlan: 15000,
    scholarships: [{ name: "Merit Scholarship", amount: 20000, year: 2024 }],
    transactions: [
      { date: "2024-01-15", description: "Tuition Payment", amount: -25000 },
      { date: "2024-02-01", description: "Merit Scholarship", amount: 20000 },
      { date: "2024-03-01", description: "Late Payment Fee", amount: -500 },
    ],
    paymentPlan: {
      totalAmount: 95000,
      installments: [
        { dueDate: "2024-01-15", amount: 25000, status: "Paid" },
        { dueDate: "2024-03-15", amount: 25000, status: "Overdue" },
        { dueDate: "2024-05-15", amount: 25000, status: "Upcoming" },
        { dueDate: "2024-07-15", amount: 20000, status: "Upcoming" },
      ],
    },
  },

  // Registration Information
  registrationInfo: {
    registrationStatus: "Open",
    registrationPeriod: { start: "2024-07-01", end: "2024-07-15" },
    holds: [],
    advisorName: "Dr. Lerato Molefe",
    advisorEmail: "lerato.molefe@university.ac.za",
    selectedCourses: [
      {
        code: "CSC3023S",
        name: "Computer Networks",
        credits: 18,
        schedule: "MWF 10:00-11:00",
      },
      {
        code: "CSC3028F",
        name: "Computer Graphics",
        credits: 18,
        schedule: "TTH 14:00-15:30",
      },
    ],
    alternativeCourses: [
      {
        code: "CSC3026F",
        name: "Database Systems",
        credits: 18,
        schedule: "MWF 13:00-14:00",
      },
    ],
  },

  // Forms and Requests
  formsAndRequests: {
    availableForms: [
      {
        id: 1,
        name: "Transcript Request",
        category: "Academic",
        description: "Request an official transcript of your academic record.",
      },
      {
        id: 2,
        name: "Change of Major",
        category: "Academic",
        description: "Submit a request to change your current major.",
      },
      {
        id: 3,
        name: "Leave of Absence",
        category: "Administrative",
        description: "Request a temporary leave of absence from your studies.",
      },
      {
        id: 4,
        name: "Financial Aid Appeal",
        category: "Financial",
        description: "Appeal your current financial aid decision.",
      },
    ],
    submittedRequests: [
      {
        id: 101,
        name: "Transcript Request",
        status: "Completed",
        submittedDate: "2024-03-15",
        completedDate: "2024-03-18",
      },
      {
        id: 102,
        name: "Change of Major",
        status: "In Progress",
        submittedDate: "2024-04-01",
        completedDate: null,
      },
    ],
  },

  // Additional South African-specific information
  saInfo: {
    nsfasStatus: "Funded",
    nsfasAllowances: {
      tuition: 60000,
      accommodation: 45000,
      books: 5000,
      meals: 15000,
    },
    indigenousLanguageCourse: {
      code: "XHO1000F",
      name: "Introduction to isiXhosa",
      status: "Completed",
      grade: 85,
    },
    sportsAchievements: [
      { name: "University Rugby Team Captain", year: 2023 },
      { name: "Inter-University Athletics Bronze Medal", year: 2022 },
    ],
    culturalAchievements: [
      { name: "Lead Role in University Theater Production", year: 2023 },
      { name: "First Prize in Campus Art Exhibition", year: 2022 },
    ],
  },
};
