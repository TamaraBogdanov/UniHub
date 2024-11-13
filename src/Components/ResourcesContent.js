import React, { useState, useMemo } from "react";
import "../Styles/Resources.css";
import { courses } from "../Mockdata/mockData";
import {
  Search,
  Book,
  Video,
  FileText,
  Link,
  Download,
  ExternalLink,
  BookOpen,
  Play,
  Filter,
  Grid,
  List,
  ChevronDown,
  Plus,
  Star,
  Clock,
  Calendar,
  AlertCircle,
} from "lucide-react";

// Mock data for resources
const mockResources = [
  {
    id: 1,
    title: "Introduction to Python Programming",
    type: "video",
    courseCode: "CS101",
    description: "A comprehensive guide to Python basics",
    url: "https://example.com/python-intro",
    duration: "45:30",
    creator: "Dr. John Doe",
    dateAdded: "2024-03-01",
    thumbnail: "/images/python-thumbnail.jpg",
    views: 1250,
    rating: 4.5,
    isRequired: true,
    tags: ["Programming", "Python", "Beginners"],
    relatedTopics: ["Variables", "Control Flow", "Functions"],
  },
  {
    id: 2,
    title: "Calculus Textbook - Chapter 3",
    type: "document",
    courseCode: "MATH201",
    description: "Derivatives and their applications in calculus I chapter 3",
    url: "https://example.com/calculus-ch3",
    pages: 45,
    author: "Prof. Jane Smith",
    dateAdded: "2024-03-05",
    fileSize: "2.5 MB",
    fileType: "PDF",
    isRequired: true,
    tags: ["Calculus", "Mathematics", "Derivatives"],
    chapters: ["3.1 Derivative Rules", "3.2 Applications", "3.3 Optimization"],
  },
  {
    id: 3,
    title: "Ancient Rome Virtual Tour",
    type: "interactive",
    courseCode: "HIST105",
    description: "Explore ancient Roman architecture through a virtual tour",
    url: "https://example.com/rome-tour",
    duration: "60:00",
    creator: "Historical Society",
    dateAdded: "2024-03-10",
    requirements: "WebGL enabled browser",
    isRequired: false,
    tags: ["History", "Rome", "Architecture"],
    features: ["3D Models", "Audio Guide", "Interactive Map"],
  },
  {
    id: 4,
    title: "Advanced Chemical Reactions Lab Guide",
    type: "document",
    courseCode: "CHEM301",
    description:
      "Comprehensive laboratory procedures and safety guidelines for advanced chemical experiments",
    url: "https://example.com/chem-lab-guide",
    pages: 32,
    author: "Prof. Charlie Brown",
    dateAdded: "2024-03-08",
    fileSize: "4.2 MB",
    fileType: "PDF",
    isRequired: true,
    tags: ["Chemistry", "Lab Safety", "Procedures"],
    chapters: ["Safety Protocols", "Equipment Guide", "Experiment Procedures"],
  },
  {
    id: 5,
    title: "Psychology Research Methods Tutorial",
    type: "video",
    courseCode: "PSYC101",
    description:
      "Step-by-step guide to conducting psychological research and data analysis",
    url: "https://example.com/psych-research",
    duration: "32:15",
    creator: "Dr. Alice Williams",
    dateAdded: "2024-03-12",
    thumbnail: "/images/psych-thumbnail.jpg",
    views: 856,
    rating: 4.8,
    isRequired: false,
    tags: ["Psychology", "Research", "Methodology"],
    relatedTopics: ["Data Collection", "Analysis Methods", "Research Ethics"],
  },
  {
    id: 6,
    title: "Economic Models Simulator",
    type: "interactive",
    courseCode: "ECON201",
    description:
      "Interactive tool for exploring various economic models and market behaviors",
    url: "https://example.com/econ-simulator",
    creator: "Economics Department",
    dateAdded: "2024-03-15",
    requirements: "Modern browser with JavaScript enabled",
    rating: 4.6,
    isRequired: true,
    tags: ["Economics", "Simulation", "Market Analysis"],
    features: ["Real-time Graphs", "Custom Scenarios", "Data Export"],
  },
  {
    id: 7,
    title: "Mathematics Formula Quick Reference",
    type: "document",
    courseCode: "MATH201",
    description:
      "Comprehensive collection of essential formulas and theorems for Calculus I",
    url: "https://example.com/math-formulas",
    pages: 15,
    author: "Prof. Jane Smith",
    dateAdded: "2024-03-18",
    fileSize: "1.8 MB",
    fileType: "PDF",
    isRequired: false,
    tags: ["Mathematics", "Formulas", "Reference"],
    chapters: ["Derivatives", "Integrals", "Series"],
  },
  {
    id: 8,
    title: "Programming Best Practices Workshop",
    type: "video",
    courseCode: "CS101",
    description:
      "Live recorded workshop covering coding standards and best practices in Python",
    url: "https://example.com/coding-workshop",
    duration: "1:15:30",
    creator: "Dr. John Doe",
    dateAdded: "2024-03-20",
    thumbnail: "/images/workshop-thumbnail.jpg",
    views: 1423,
    rating: 4.7,
    isRequired: true,
    tags: ["Programming", "Python", "Best Practices"],
    relatedTopics: ["Code Organization", "Documentation", "Testing"],
  },
  {
    id: 9,
    title: "Historical Maps Interactive Timeline",
    type: "interactive",
    courseCode: "HIST105",
    description:
      "Interactive timeline featuring historical maps and geographical changes through centuries",
    url: "https://example.com/history-maps",
    creator: "Digital History Lab",
    dateAdded: "2024-03-22",
    requirements: "WebGL enabled browser",
    rating: 4.9,
    isRequired: false,
    tags: ["History", "Geography", "Maps"],
    features: ["Time Travel", "Map Overlays", "Population Data"],
  },
];

// Resource type configurations
const resourceTypes = {
  all: {
    label: "All Resources",
    icon: BookOpen,
    color: "#3b82f6",
  },
  video: {
    label: "Videos",
    icon: Video,
    color: "#6366f1",
  },
  document: {
    label: "Documents",
    icon: FileText,
    color: "#f59e0b",
  },
  interactive: {
    label: "Interactive",
    icon: Play,
    color: "#10b981",
  },
  link: {
    label: "Links",
    icon: Link,
    color: "#6366f1",
  },
};

function ResourcesContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("date"); // date, name, rating
  const [showRequired, setShowRequired] = useState(false);

  // Filter and sort resources
  const filteredResources = useMemo(() => {
    let filtered = mockResources;

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (resource) =>
          resource.title.toLowerCase().includes(query) ||
          resource.description.toLowerCase().includes(query) ||
          resource.courseCode.toLowerCase().includes(query) ||
          resource.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Apply type filter
    if (selectedType !== "all") {
      filtered = filtered.filter((resource) => resource.type === selectedType);
    }

    // Apply course filter
    if (selectedCourse !== "all") {
      filtered = filtered.filter(
        (resource) => resource.courseCode === selectedCourse
      );
    }

    // Apply required filter
    if (showRequired) {
      filtered = filtered.filter((resource) => resource.isRequired);
    }

    // Apply sorting
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.dateAdded) - new Date(a.dateAdded);
        case "name":
          return a.title.localeCompare(b.title);
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
      }
    });
  });

  // Get resource type icon and color
  const getResourceTypeInfo = (type) => {
    return resourceTypes[type] || resourceTypes.link;
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="resources-content">
      {/* Header */}
      <div className="resources-header">
        <div className="resources-header-left">
          <h1 className="resources-heading">Learning Resources</h1>
          <p className="resources-subheading">
            Access course materials and study guides
          </p>
        </div>

        <div className="resources-header-right">
          <button className="resources-view-toggle">
            {viewMode === "grid" ? (
              <List size={20} onClick={() => setViewMode("list")} />
            ) : (
              <Grid size={20} onClick={() => setViewMode("grid")} />
            )}
          </button>
          <button className="resources-add-button">
            <Plus size={20} />
            Add Resource
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="resources-controls">
        <div className="resources-search">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="resources-search-input"
          />
        </div>

        <div className="resources-filters">
          <button
            className="filter-toggle"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={20} />
            Filters
            <ChevronDown
              size={16}
              className={showFilters ? "rotate-180" : ""}
            />
          </button>

          <select
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="date">Newest First</option>
            <option value="name">Name</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {/* Expanded Filters */}
      {showFilters && (
        <div className="expanded-filters">
          <div className="filter-section">
            <h3>Type</h3>
            <div className="filter-options">
              {Object.entries(resourceTypes).map(([type, info]) => (
                <button
                  key={type}
                  className={`filter-button ${
                    selectedType === type ? "active" : ""
                  }`}
                  onClick={() => setSelectedType(type)}
                >
                  <info.icon size={16} style={{ color: info.color }} />
                  {info.label}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>Course</h3>
            <div className="filter-options">
              <button
                className={`filter-button ${
                  selectedCourse === "all" ? "active" : ""
                }`}
                onClick={() => setSelectedCourse("all")}
              >
                All Courses
              </button>
              {courses.map((course) => (
                <button
                  key={course.code}
                  className={`filter-button ${
                    selectedCourse === course.code ? "active" : ""
                  }`}
                  onClick={() => setSelectedCourse(course.code)}
                >
                  {course.code}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <label className="filter-checkbox">
              <input
                type="checkbox"
                checked={showRequired}
                onChange={(e) => setShowRequired(e.target.checked)}
              />
              Show Required Resources Only
            </label>
          </div>
        </div>
      )}

      {/* Resources Grid/List */}
      <div className={`resources-grid ${viewMode}`}>
        {filteredResources.map((resource) => {
          const typeInfo = getResourceTypeInfo(resource.type);

          return (
            <div key={resource.id} className="resource-card">
              <div className="resource-card-header">
                <div
                  className="resource-type-badge"
                  style={{
                    backgroundColor: `${typeInfo.color}15`,
                    color: typeInfo.color,
                  }}
                >
                  <typeInfo.icon size={16} />
                  {typeInfo.label}
                </div>
                {resource.isRequired && (
                  <div className="required-badge">
                    <AlertCircle size={14} />
                    Required
                  </div>
                )}
              </div>

              <h3 className="resource-title">{resource.title}</h3>
              <p className="resource-description">{resource.description}</p>

              <div className="resource-meta">
                <div className="resource-course">{resource.courseCode}</div>
                {resource.duration && (
                  <div className="resource-duration">
                    <Clock size={14} />
                    {resource.duration}
                  </div>
                )}
                {resource.pages && (
                  <div className="resource-pages">
                    <Book size={14} />
                    {resource.pages} pages
                  </div>
                )}
              </div>

              <div className="resource-tags">
                {resource.tags.map((tag, index) => (
                  <span key={index} className="resource-tag">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="resource-footer">
                <div className="resource-date">
                  <Calendar size={14} />
                  {formatDate(resource.dateAdded)}
                </div>
                {resource.rating && (
                  <div className="resource-rating">
                    <Star size={14} />
                    {resource.rating.toFixed(1)}
                  </div>
                )}
              </div>

              <div className="resource-actions">
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resource-action-button primary"
                >
                  {resource.type === "video" ? (
                    <>
                      <Play size={16} /> Watch Now
                    </>
                  ) : resource.type === "document" ? (
                    <>
                      <Download size={16} /> Download
                    </>
                  ) : (
                    <>
                      <ExternalLink size={16} /> Open
                    </>
                  )}
                </a>
                <button className="resource-action-button secondary">
                  <BookOpen size={16} />
                  Details
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredResources.length === 0 && (
        <div className="empty-state">
          <Book size={48} />
          <h3>No resources found</h3>
          <p>Try adjusting your filters or search terms</p>
        </div>
      )}
    </div>
  );
}

export default ResourcesContent;
