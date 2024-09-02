import React, { useState } from "react";
import "../Styles/Resources.css";
import {
  Search,
  Book,
  Video,
  FileText,
  Link,
  Star,
  ExternalLink,
} from "lucide-react";

// More mock-data for demo purposes - using real data in the near future - for actual resources
const initialResources = [
  {
    id: 1,
    title: "Introduction to Computer Science",
    type: "e-book",
    category: "Computer Science",
    url: "#",
    favorite: false,
  },
  {
    id: 2,
    title: "Calculus: Early Transcendentals",
    type: "e-book",
    category: "Mathematics",
    url: "#",
    favorite: false,
  },
  {
    id: 3,
    title: "Physics Fundamentals",
    type: "video",
    category: "Physics",
    url: "#",
    favorite: false,
  },
  {
    id: 4,
    title: "Essay Writing Guide",
    type: "pdf",
    category: "Academic Skills",
    url: "#",
    favorite: false,
  },
  {
    id: 5,
    title: "Online Graphing Calculator",
    type: "tool",
    category: "Mathematics",
    url: "#",
    favorite: false,
  },
  {
    id: 6,
    title: "Chemistry Lab Safety",
    type: "video",
    category: "Chemistry",
    url: "#",
    favorite: false,
  },
  {
    id: 7,
    title: "Research Methods in Psychology",
    type: "e-book",
    category: "Psychology",
    url: "#",
    favorite: false,
  },
  {
    id: 8,
    title: "Statistics Tutorial",
    type: "pdf",
    category: "Mathematics",
    url: "#",
    favorite: false,
  },
  {
    id: 9,
    title: "Programming in Python",
    type: "video",
    category: "Computer Science",
    url: "#",
    favorite: false,
  },
  {
    id: 10,
    title: "Academic Writing Center",
    type: "tool",
    category: "Academic Skills",
    url: "#",
    favorite: false,
  },
];

// Helper function to get unique categories
const categories = [
  ...new Set(initialResources.map((resource) => resource.category)),
];

function ResourcesContent() {
  // State variables
  const [resources, setResources] = useState(initialResources);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  // Event handlers for search and filter
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Toggle favorite function for each resource - doesn't really function as of yet
  const toggleFavorite = (id) => {
    setResources(
      resources.map((resource) =>
        resource.id === id
          ? { ...resource, favorite: !resource.favorite }
          : resource
      )
    );
  };

  // Filter resources based on selected category and type
  const filteredResources = resources.filter(
    (resource) =>
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "All" || resource.category === selectedCategory) &&
      (selectedType === "All" || resource.type === selectedType)
  );

  // Helper function to get icon based on resource type
  const getIconForType = (type) => {
    switch (type) {
      case "e-book":
        return <Book size={20} />;
      case "video":
        return <Video size={20} />;
      case "pdf":
        return <FileText size={20} />;
      case "tool":
        return <Link size={20} />;
      default:
        return <FileText size={20} />;
    }
  };

  return (
    <div className="resources-content">
      <h2>Academic Resources</h2>

      <div className="search-bar">
        <Search size={20} />
        <input
          type="text"
          placeholder="Search resources..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Filters */}
      <div className="filters">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          {/* Add options for each category */}
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="All">All Types</option>
          <option value="e-book">E-Books</option>
          <option value="video">Videos</option>
          <option value="pdf">PDFs</option>
          <option value="tool">Online Tools</option>
        </select>
      </div>

      {/* Resources grid */}
      <div className="resources-grid">
        {/* Added resource cards */}
        {filteredResources.map((resource) => (
          <div key={resource.id} className="resource-card">
            {/* Added icon based on resource type */}
            <div className="resource-icon">{getIconForType(resource.type)}</div>
            <div className="resource-info">
              <h3>{resource.title}</h3>
              <p>{resource.category}</p>
            </div>
            <div className="resource-actions">
              <button
                onClick={() => toggleFavorite(resource.id)}
                className={`favorite-btn ${resource.favorite ? "active" : ""}`}
              >
                <Star size={20} />
              </button>
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="access-btn"
              >
                <ExternalLink size={20} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResourcesContent;
