import React from "react";
import { ExternalLink, Book, Globe } from "lucide-react";

const getResourceIcon = (type) => {
  switch (type) {
    case "Book":
    case "Textbook":
      return <Book size={16} />;
    case "Website":
      return <Globe size={16} />;
    case "Website":
    case "Interactive Tool":
      return <Globe size={16} />;
    default:
      return <ExternalLink size={16} />;
  }
};

function CourseResources({ resources }) {
  return (
    <div className="course-resources">
      <h2>Course Resources</h2>
      <ul className="resource-list">
        {resources.map((resource) => (
          <li key={resource.id} className="resource-item">
            <div className="resource-icon">
              {getResourceIcon(resource.type)}
            </div>
            <div className="resource-info">
              <h3>{resource.title}</h3>
              <p>{resource.type}</p>
            </div>
            <a
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="resource-link"
            >
              Access <ExternalLink size={14} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseResources;
