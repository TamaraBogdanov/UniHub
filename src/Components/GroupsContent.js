import React, { useState, useMemo } from "react";
import "../Styles/Groups.css";
import {
  Users,
  Search,
  SortAsc,
  ChevronDown,
  BookOpen,
  MessageSquare,
  Calendar,
  Clock,
  Plus,
  UserPlus,
  AlertCircle,
} from "lucide-react";

// Mock data for groups - in production this would come from your backend
const mockGroups = [
  {
    id: 1,
    name: "CS101 Study Group",
    courseCode: "CS101",
    type: "Study Group",
    memberCount: 15,
    maxMembers: 20,
    description: "Weekly study sessions for Computer Science fundamentals",
    lastActive: "2024-03-12",
    meetingTime: "Thursdays 3:00 PM",
    topics: ["Programming", "Algorithms", "Data Structures"],
    isJoined: true,
  },
  {
    id: 2,
    name: "Math Tutoring",
    courseCode: "MATH201",
    type: "Course Group",
    memberCount: 8,
    maxMembers: 10,
    description: "Peer tutoring group for Calculus I students",
    lastActive: "2024-03-13",
    meetingTime: "Tuesdays 4:00 PM",
    topics: ["Calculus", "Tutoring"],
    isJoined: false,
  },
  {
    id: 3,
    name: "History Discussion",
    courseCode: "HIST105",
    type: "Discussion Group",
    memberCount: 12,
    maxMembers: 15,
    description: "Deep dive discussions about Ancient Civilizations",
    lastActive: "2024-03-11",
    meetingTime: "Wednesdays 2:00 PM",
    topics: ["Ancient History", "Research"],
    isJoined: true,
  },
  {
    id: 4,
    name: "Psychology Research",
    courseCode: "PSYC101",
    type: "Project Group",
    memberCount: 6,
    maxMembers: 8,
    description: "Collaborative research project group",
    lastActive: "2024-03-10",
    meetingTime: "Mondays 1:00 PM",
    topics: ["Research", "Psychology"],
    isJoined: false,
  },
  {
    id: 5,
    name: "Chemistry Lab Partners",
    courseCode: "CHEM301",
    type: "Lab Group",
    memberCount: 4,
    maxMembers: 4,
    description: "Official lab group for Organic Chemistry",
    lastActive: "2024-03-09",
    meetingTime: "Fridays 10:00 AM",
    topics: ["Lab Work", "Chemistry"],
    isJoined: true,
  },
];

function GroupsContent() {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortType, setSortType] = useState("lastActive");
  const [showFilters, setShowFilters] = useState(false);
  const [setShowCreateModal] = useState(false);

  // Filter and sort groups
  const filteredGroups = useMemo(() => {
    let filtered = mockGroups;

    // Apply membership filter
    if (filter !== "all") {
      filtered = filtered.filter((group) =>
        filter === "joined" ? group.isJoined : !group.isJoined
      );
    }

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (group) =>
          group.name.toLowerCase().includes(query) ||
          group.courseCode.toLowerCase().includes(query) ||
          group.description.toLowerCase().includes(query) ||
          group.topics.some((topic) => topic.toLowerCase().includes(query))
      );
    }

    // Apply sorting
    return filtered.sort((a, b) => {
      switch (sortType) {
        case "lastActive":
          return new Date(b.lastActive) - new Date(a.lastActive);
        case "name":
          return a.name.localeCompare(b.name);
        case "members":
          return b.memberCount - a.memberCount;
        default:
          return 0;
      }
    });
  });

  const getAvailabilityColor = (group) => {
    const availability =
      (group.maxMembers - group.memberCount) / group.maxMembers;
    if (availability === 0) return "status-full";
    if (availability <= 0.2) return "status-almost-full";
    return "status-available";
  };

  const getAvailabilityText = (group) => {
    const spotsLeft = group.maxMembers - group.memberCount;
    if (spotsLeft === 0) return "Full";
    if (spotsLeft === 1) return "1 spot left";
    return `${spotsLeft} spots left`;
  };

  return (
    <div className="groups-content">
      <div className="groups-header">
        <div className="groups-header-left">
          <h1 className="groups-heading">Groups</h1>
          <p className="groups-subheading">
            Join study groups and course discussions
          </p>
        </div>

        <div className="header-right">
          <button className="create-group-button">
            <Plus />
            Create Group
          </button>
        </div>
      </div>

      <div className="groups-controls">
        <div className="search-sort-section">
          <div className="groups-search-box">
            <Search className="groups-search-icon" />
            <input
              type="text"
              placeholder="Search groups..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="control-buttons">
            <select
              className="groups-sort-select"
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
            >
              <option value="lastActive">Sort by Activity</option>
              <option value="name">Sort by Name</option>
              <option value="members">Sort by Members</option>
            </select>

            <button
              className="filter-toggle"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SortAsc />
              Filter
              <ChevronDown className={showFilters ? "rotate" : ""} />
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="filter-buttons">
            <button
              className={`filter-button ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              All Groups
            </button>
            <button
              className={`filter-button ${filter === "joined" ? "active" : ""}`}
              onClick={() => setFilter("joined")}
            >
              My Groups
            </button>
            <button
              className={`filter-button ${
                filter === "available" ? "active" : ""
              }`}
              onClick={() => setFilter("available")}
            >
              Available
            </button>
          </div>
        )}
      </div>

      <div className="groups-grid">
        {filteredGroups.map((group) => (
          <div key={group.id} className="group-card">
            <div className="group-content">
              <div className="group-header">
                <div className="group-course-info">
                  <BookOpen />
                  <span>{group.courseCode}</span>
                  <span className="dot">•</span>
                  <span>{group.type}</span>
                </div>

                <div
                  className={`availability-badge ${getAvailabilityColor(
                    group
                  )}`}
                >
                  {getAvailabilityText(group)}
                </div>
              </div>

              <h3 className="group-title">{group.name}</h3>
              <p className="group-description">{group.description}</p>

              <div className="group-stats">
                <div className="stat">
                  <Users size={16} />
                  <span>
                    {group.memberCount}/{group.maxMembers} Members
                  </span>
                </div>
                <div className="stat">
                  <Clock size={16} />
                  <span>{group.meetingTime}</span>
                </div>
              </div>

              <div className="group-topics">
                {group.topics.map((topic, index) => (
                  <span key={index} className="topic-tag">
                    {topic}
                  </span>
                ))}
              </div>

              <div className="group-footer">
                <div className="last-active">
                  <Calendar size={16} />
                  <span>
                    Last active{" "}
                    {new Date(group.lastActive).toLocaleDateString()}
                  </span>
                </div>

                <button
                  className={`group-join-button ${
                    group.isJoined ? "joined" : ""
                  }`}
                >
                  {group.isJoined ? (
                    <>
                      <MessageSquare size={16} />
                      Chat
                    </>
                  ) : (
                    <>
                      <UserPlus size={16} />
                      Join Group
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredGroups.length === 0 && (
          <div className="empty-state">
            <AlertCircle />
            <h3>No groups found</h3>
            <p>Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default GroupsContent;
