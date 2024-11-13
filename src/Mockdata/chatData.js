// src/mockData/chatData.js

import { faker } from "@faker-js/faker";

// Helper function to create formatted timestamps
const createTimestamp = (minutesAgo) => {
  const date = new Date();
  date.setMinutes(date.getMinutes() - minutesAgo);
  return date;
};

// Predefined messages for different roles
const studentMessages = {
  questions: [
    "Could you explain the concept of polymorphism in more detail?",
    "When is our next assignment due?",
    "I'm having trouble with the last practice question.",
    "Can we schedule a meeting to discuss my project?",
    "Is there any additional reading material for this topic?",
  ],
  responses: [
    "Thank you, that helps a lot!",
    "I'll work on implementing those changes.",
    "Could you clarify one more thing?",
    "I'll review those concepts before the next class.",
    "That makes much more sense now.",
  ],
};

const lecturerMessages = {
  responses: [
    "The assignment is due next Friday at 5 PM.",
    "Let's schedule a consultation during my office hours.",
    "I've shared additional resources on the course website.",
    "Make sure to review the slides from last week's lecture.",
    "That's a good question. In object-oriented programming...",
  ],
  announcements: [
    "Remember to submit your assignments through the online portal.",
    "I've posted the sample exam questions.",
    "Class will be held online tomorrow due to the conference.",
    "Office hours are extended this week for project consultations.",
    "The tutorial session has been rescheduled to 2 PM.",
  ],
};

const tutorMessages = {
  explanations: [
    "Let me break down this concept step by step...",
    "Here's an example that might help:",
    "Think of it this way...",
    "The key thing to remember is...",
    "Let's work through this problem together.",
  ],
  feedback: [
    "You're on the right track, but consider...",
    "That's a good approach. You might also want to...",
    "Try reviewing the section on...",
    "Your solution works, but can be optimized by...",
    "Make sure to test your code with different inputs.",
  ],
};

// Create realistic conversation threads
const createConversationThread = (participants, context) => {
  const thread = [];
  const { role, topic } = context;

  switch (role) {
    case "student":
      thread.push({
        id: faker.string.uuid(),
        senderId: participants.student,
        content:
          studentMessages.questions[
            Math.floor(Math.random() * studentMessages.questions.length)
          ],
        timestamp: createTimestamp(30),
        status: "read",
      });
      thread.push({
        id: faker.string.uuid(),
        senderId: participants.other,
        content:
          lecturerMessages.responses[
            Math.floor(Math.random() * lecturerMessages.responses.length)
          ],
        timestamp: createTimestamp(28),
        status: "read",
      });
      break;
    case "lecturer":
      thread.push({
        id: faker.string.uuid(),
        senderId: participants.lecturer,
        content:
          lecturerMessages.announcements[
            Math.floor(Math.random() * lecturerMessages.announcements.length)
          ],
        timestamp: createTimestamp(120),
        status: "read",
      });
      break;
    case "tutor":
      thread.push({
        id: faker.string.uuid(),
        senderId: participants.student,
        content: "I'm stuck on the recursive functions exercise.",
        timestamp: createTimestamp(45),
        status: "read",
      });
      thread.push({
        id: faker.string.uuid(),
        senderId: participants.tutor,
        content:
          tutorMessages.explanations[
            Math.floor(Math.random() * tutorMessages.explanations.length)
          ],
        timestamp: createTimestamp(43),
        status: "read",
      });
      break;
    default:
      break;
  }

  return thread;
};

// Create mock conversations with realistic threads
export const mockConversations = {
  students: [
    {
      id: "student1",
      name: "Sarah Johnson",
      role: "Student",
      avatar: faker.image.avatar(),
      course: "Computer Science",
      yearOfStudy: "3rd Year",
      lastSeen: "2 minutes ago",
      online: true,
      unreadCount: 2,
      messages: [
        {
          id: faker.string.uuid(),
          senderId: "student1",
          content:
            "Hi! I'm having trouble understanding the recursive tree traversal algorithm we covered in class.",
          timestamp: createTimestamp(120),
          status: "read",
        },
        {
          id: faker.string.uuid(),
          senderId: "currentUser",
          content:
            "Of course! Let's break it down. Which part specifically is giving you trouble?",
          timestamp: createTimestamp(118),
          status: "read",
        },
        {
          id: faker.string.uuid(),
          senderId: "student1",
          content:
            "I'm confused about how the call stack works during the recursion process.",
          timestamp: createTimestamp(115),
          status: "read",
        },
        {
          id: faker.string.uuid(),
          senderId: "currentUser",
          content:
            "Think of the call stack like a stack of plates. Each recursive call adds a new plate (function call) on top, and they get removed one by one as they complete.",
          timestamp: createTimestamp(113),
          status: "read",
        },
        {
          id: faker.string.uuid(),
          senderId: "student1",
          content:
            "That makes sense! Could you give me an example with a simple binary tree?",
          timestamp: createTimestamp(110),
          status: "read",
        },
      ],
    },
    {
      id: "student2",
      name: "Michael Chen",
      role: "Student",
      avatar: faker.image.avatar(),
      course: "Computer Science",
      yearOfStudy: "3rd Year",
      lastSeen: "1 hour ago",
      online: false,
      unreadCount: 0,
      messages: [
        {
          id: faker.string.uuid(),
          senderId: "student2",
          content: "Hey! Are you also working on the database assignment?",
          timestamp: createTimestamp(180),
          status: "read",
        },
        {
          id: faker.string.uuid(),
          senderId: "currentUser",
          content: "Yes, I just started working on the ER diagram part.",
          timestamp: createTimestamp(178),
          status: "read",
        },
        {
          id: faker.string.uuid(),
          senderId: "student2",
          content:
            "Great! I was wondering if you'd like to collaborate on brainstorming the entity relationships?",
          timestamp: createTimestamp(175),
          status: "read",
        },
      ],
    },
  ],
  lecturers: [
    {
      id: "lecturer1",
      name: "Dr. Smith",
      role: "Lecturer",
      avatar: faker.image.avatar(),
      course: "Computer Science",
      yearOfStudy: "3rd Year",
      lastSeen: "5 minutes ago",
      online: true,
      unreadCount: 1,
      messages: [
        {
          id: faker.string.uuid(),
          senderId: "lecturer1",
          content: "Hello, how can I help you today?",
          timestamp: createTimestamp(60),
          status: "read",
        },
        {
          id: faker.string.uuid(),
          senderId: "currentUser",
          content:
            "I'm having trouble understanding the recursive tree traversal algorithm we covered in class.",
          timestamp: createTimestamp(58),
          status: "read",
        },
      ],
    },
  ],
  tutors: [
    {
      id: "tutor1",
      name: "Mr. Johnson",
      role: "Tutor",
      avatar: faker.image.avatar(),
      course: "Computer Science",
      yearOfStudy: "3rd Year",
      lastSeen: "2 hours ago",
      online: false,
      unreadCount: 0,
      messages: [
        {
          id: faker.string.uuid(),
          senderId: "tutor1",
          content: "Hi! I'm currently working on the database assignment.",
          timestamp: createTimestamp(120),
          status: "read",
        },
      ],
    },
  ],
  consultants: [
    {
      id: "consultant1",
      name: "Dr. Smith",
      role: "Consultant",
      avatar: faker.image.avatar(),
      course: "Computer Science",
      yearOfStudy: "3rd Year",
      lastSeen: "5 minutes ago",
      online: true,
      unreadCount: 1,
      messages: [
        {
          id: faker.string.uuid(),
          senderId: "consultant1",
          content: "Hello, how can I help you today?",
          timestamp: createTimestamp(60),
          status: "read",
        },
        {
          id: faker.string.uuid(),
          senderId: "currentUser",
          content:
            "I'm having trouble understanding the recursive tree traversal algorithm we covered in class.",
          timestamp: createTimestamp(58),
          status: "read",
        },
      ],
    },
  ],
  groups: [
    {
      id: "group1",
      name: "Computer Science",
      role: "Group",
      avatar: faker.image.avatar(),
      course: "Computer Science",
      yearOfStudy: "3rd Year",
      lastSeen: "2 hours ago",
      online: false,
      unreadCount: 0,
      messages: [
        {
          id: faker.string.uuid(),
          senderId: "group1",
          content: "Hi! I'm currently working on the database assignment.",
          timestamp: createTimestamp(120),
          status: "read",
        },
        {
          id: faker.string.uuid(),
          senderId: "currentUser",
          content:
            "I'm having trouble understanding the recursive tree traversal algorithm we covered in class.",
          timestamp: createTimestamp(58),
          status: "read",
        },
        {
          id: faker.string.uuid(),
          senderId: "group1",
          content:
            "I'm having trouble understanding the recursive tree traversal algorithm we covered in class.",
          timestamp: createTimestamp(58),
          status: "read",
        },
      ],
    },
    {
      id: "group2",
      name: "Computer Science",
      role: "Group",
      avatar: faker.image.avatar(),
      course: "Computer Science",
      yearOfStudy: "3rd Year",
      lastSeen: "2 hours ago",
      online: false,
      unreadCount: 0,
      messages: [
        {
          id: faker.string.uuid(),
          senderId: "group2",
          content: "Hi! I'm currently working on the database assignment.",
          timestamp: createTimestamp(120),
          status: "read",
        },
        {
          id: faker.string.uuid(),
          senderId: "currentUser",
          content:
            "I'm having trouble understanding the recursive tree traversal algorithm we covered in class.",
          timestamp: createTimestamp(58),
          status: "read",
        },
      ],
    },
    {
      id: "group3",
      name: "Computer Science",
      role: "Group",
      avatar: faker.image.avatar(),
      course: "Computer Science",
      yearOfStudy: "3rd Year",
      lastSeen: "2 hours ago",
      online: false,
      unreadCount: 0,
      messages: [
        {
          id: faker.string.uuid(),
          senderId: "group3",
          content: "Hi! I'm currently working on the database assignment.",
          timestamp: createTimestamp(120),
          status: "read",
        },
        {
          id: faker.string.uuid(),
          senderId: "currentUser",
          content:
            "I'm having trouble understanding the recursive tree traversal algorithm we covered in class.",
          timestamp: createTimestamp(58),
          status: "read",
        },
      ],
    },
  ],
};

// Rest of the code remains the same
export const currentUser = {
  id: "currentUser",
  name: "Thabo Ndlovu",
  role: "Student",
  avatar: faker.image.avatar(),
  course: "Computer Science",
  yearOfStudy: "3rd Year",
};

export const messageStatuses = {
  SENT: "sent",
  DELIVERED: "delivered",
  READ: "read",
};

export const chatCategories = [
  { id: "all", label: "All Chats" },
  { id: "students", label: "Students" },
  { id: "lecturers", label: "Lecturers" },
  { id: "tutors", label: "Tutors" },
  { id: "consultants", label: "Consultants" },
  { id: "groups", label: "Groups" },
];
