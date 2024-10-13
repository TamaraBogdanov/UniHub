import {
  Calendar,
  Music,
  Book,
  Trophy,
  Users,
  Globe,
  Zap,
  Coffee,
} from "lucide-react";

export const eventsMockData = [
  {
    id: 1,
    title: "Annual Tech Fest",
    category: "Technology",
    date: "2024-09-15",
    time: "10:00 AM - 6:00 PM",
    location: "University Stadium",
    description:
      "Join us for a day of cutting-edge technology showcases, workshops, and networking opportunities.",
    icon: <Zap size={24} color="#FF6B6B" />,
    image: "/images/online-learning.png",
    attendees: 500,
    featured: true,
  },
  {
    id: 2,
    title: "Global Culture Night",
    category: "Cultural",
    date: "2024-10-05",
    time: "7:00 PM - 11:00 PM",
    location: "Student Center",
    description:
      "Experience the diversity of our university community through food, music, and performances from around the world.",
    icon: <Globe size={24} color="#4ECDC4" />,
    image: "/images/online-learning.png",
    attendees: 300,
    featured: true,
  },
  {
    id: 3,
    title: "Career Fair 2024",
    category: "Career",
    date: "2024-11-10",
    time: "9:00 AM - 4:00 PM",
    location: "University Convention Center",
    description:
      "Connect with top employers and explore internship and job opportunities across various industries.",
    icon: <Users size={24} color="#45B7D1" />,
    image: "/images/online-learning.png",
    attendees: 1000,
    featured: true,
  },
  {
    id: 4,
    title: "Autumn Concert Series",
    category: "Music",
    date: "2024-09-20",
    time: "8:00 PM - 10:00 PM",
    location: "University Auditorium",
    description:
      "Enjoy a night of classical and contemporary music performed by our talented student musicians.",
    icon: <Music size={24} color="#FFA07A" />,
    image: "/images/online-learning.png",
    attendees: 200,
    featured: false,
  },
  {
    id: 5,
    title: "Entrepreneurship Workshop",
    category: "Business",
    date: "2024-10-15",
    time: "2:00 PM - 5:00 PM",
    location: "Business School, Room 101",
    description:
      "Learn from successful entrepreneurs and gain insights into starting your own business.",
    icon: <Coffee size={24} color="#C7B198" />,
    image: "/images/online-learning.png",
    attendees: 100,
    featured: false,
  },
  {
    id: 6,
    title: "Science Symposium",
    category: "Academic",
    date: "2024-11-05",
    time: "10:00 AM - 4:00 PM",
    location: "Science Building",
    description:
      "Explore groundbreaking research and attend talks by leading scientists in various fields.",
    icon: <Book size={24} color="#66CDAA" />,
    image: "/images/online-learning.png",
    attendees: 300,
    featured: false,
  },
  {
    id: 7,
    title: "Intramural Sports Tournament",
    category: "Sports",
    date: "2024-09-25",
    time: "9:00 AM - 6:00 PM",
    location: "University Sports Complex",
    description:
      "Compete in various sports and show your athletic prowess in this fun-filled tournament.",
    icon: <Trophy size={24} color="#FFD700" />,
    image: "/images/online-learning.png",
    attendees: 400,
    featured: false,
  },
  {
    id: 8,
    title: "Science Symposium",
    category: "Academic",
    date: "2024-11-05",
    time: "10:00 AM - 4:00 PM",
    location: "Science Building",
    description:
      "Explore groundbreaking research and attend talks by leading scientists in various fields.",
    icon: <Book size={24} color="#66CDAA" />,
    image: "/images/online-learning.png",
    attendees: 300,
    featured: false,
  },
  {
    id: 9,
    title: "Intramural Sports Tournament",
    category: "Sports",
    date: "2024-09-25",
    time: "9:00 AM - 6:00 PM",
    location: "University Sports Complex",
    description:
      "Compete in various sports and show your athletic prowess in this fun-filled tournament.",
    icon: <Trophy size={24} color="#FFD700" />,
    image: "/images/online-learning.png",
    attendees: 400,
    featured: false,
  },
  // Add more events as needed
];

export const eventCategories = [
  { name: "All", icon: <Calendar size={20} color="#6C5CE7" /> },
  { name: "Technology", icon: <Zap size={20} color="#FF6B6B" /> },
  { name: "Cultural", icon: <Globe size={20} color="#4ECDC4" /> },
  { name: "Career", icon: <Users size={20} color="#45B7D1" /> },
  { name: "Music", icon: <Music size={20} color="#FFA07A" /> },
  { name: "Business", icon: <Coffee size={20} color="#C7B198" /> },
  { name: "Academic", icon: <Book size={20} color="#66CDAA" /> },
  { name: "Sports", icon: <Trophy size={20} color="#FFD700" /> },
];