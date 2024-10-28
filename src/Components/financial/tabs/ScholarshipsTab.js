import React, { useState, useEffect } from "react";
import { Award, CheckCircle, Filter, Search } from "lucide-react";

function ScholarshipsTab({ financialInfo, saInfo, formatAmount }) {
  const [activeScholarships, setActiveScholarships] = useState([]);
  const [recommendedScholarships, setRecommendedScholarships] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    amount: "all",
    deadline: "all",
    matchScore: "all",
  });

  useEffect(() => {
    // Load active scholarships
    setActiveScholarships(financialInfo.scholarships);

    // Simulated recommended scholarships data
    setRecommendedScholarships([
      {
        id: 1,
        name: "Academic Excellence Scholarship",
        amount: 25000,
        deadline: "2024-06-30",
        criteria: ["Minimum GPA 3.5", "Full-time enrollment"],
        probabilityMatch: 95,
      },
      {
        id: 2,
        name: "Technology Innovation Grant",
        amount: 15000,
        deadline: "2024-07-15",
        criteria: ["Computer Science major", "Research proposal required"],
        probabilityMatch: 85,
      },
      {
        id: 3,
        name: "Leadership Development Award",
        amount: 20000,
        deadline: "2024-07-30",
        criteria: ["Demonstrated leadership", "Community involvement"],
        probabilityMatch: 78,
      },
    ]);
  }, [financialInfo.scholarships]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const filterScholarships = (scholarships) => {
    return scholarships.filter((scholarship) => {
      const matchesSearch = scholarship.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesAmount =
        filters.amount === "all"
          ? true
          : filters.amount === "high"
          ? scholarship.amount >= 20000
          : scholarship.amount < 20000;

      const matchesScore =
        filters.matchScore === "all"
          ? true
          : scholarship.probabilityMatch >= parseInt(filters.matchScore);

      return matchesSearch && matchesAmount && matchesScore;
    });
  };

  return (
    <div className="scholarships-tab">
      {/* Active Financial Aid Section */}
      <div className="active-aid-section">
        <h3>Active Financial Aid</h3>
        <div className="aid-cards">
          {/* NSFAS Card */}
          {saInfo.nsfasStatus === "Funded" && (
            <div className="aid-card nsfas">
              <div className="card-header">
                <h4>NSFAS Funding</h4>
                <span className="status-badge">Active</span>
              </div>
              <div className="funding-details">
                <div className="total-funding">
                  <span>Total Funding</span>
                  <span className="amount">
                    {formatAmount(
                      Object.values(saInfo.nsfasAllowances).reduce(
                        (a, b) => a + b,
                        0
                      )
                    )}
                  </span>
                </div>
                <div className="allowances-breakdown">
                  {Object.entries(saInfo.nsfasAllowances).map(
                    ([key, value]) => (
                      <div key={key} className="allowance-item">
                        <span>
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </span>
                        <span>{formatAmount(value)}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Active Scholarships Cards */}
          {activeScholarships.map((scholarship, index) => (
            <div key={index} className="aid-card scholarship">
              <div className="card-header">
                <h4>{scholarship.name}</h4>
                <span className="year-badge">{scholarship.year}</span>
              </div>
              <div className="scholarship-amount">
                <span>Award Amount</span>
                <span className="amount">
                  {formatAmount(scholarship.amount)}
                </span>
              </div>
              <div className="scholarship-status">
                <div className="status-indicator active">
                  <CheckCircle size={16} />
                  <span>Active</span>
                </div>
                <button className="details-button">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scholarship Recommendations Section */}
      <div className="scholarship-recommendations">
        <h3>Recommended Scholarships</h3>
        <div className="financial-section-header">
          <div className="registration-search-filters">
            <div className="registration-search-bar">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search scholarships..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <div className="registration-filters">
              <select
                value={filters.amount}
                onChange={(e) => handleFilterChange("amount", e.target.value)}
              >
                <option value="all">All Amounts</option>
                <option value="high">R20,000+</option>
                <option value="low">&lt; R20,000</option>
              </select>
              <select
                value={filters.matchScore}
                onChange={(e) =>
                  handleFilterChange("matchScore", e.target.value)
                }
              >
                <option value="all">All Matches</option>
                <option value="90">90%+ Match</option>
                <option value="80">80%+ Match</option>
                <option value="70">70%+ Match</option>
              </select>
            </div>
          </div>
        </div>

        <div className="recommendations-grid">
          {filterScholarships(recommendedScholarships).map((scholarship) => (
            <div key={scholarship.id} className="recommendation-card">
              <div className="card-header">
                <h4>{scholarship.name}</h4>
                <span
                  className="match-badge"
                  style={{
                    backgroundColor: `hsla(${scholarship.probabilityMatch}, 70%, 50%, 0.1)`,
                    color: `hsl(${scholarship.probabilityMatch}, 70%, 40%)`,
                  }}
                >
                  {scholarship.probabilityMatch}% Match
                </span>
              </div>
              <div className="scholarship-details">
                <div className="amount-deadline">
                  <span className="scholorship-amount">
                    {formatAmount(scholarship.amount)}
                  </span>
                  <span className="deadline">
                    Deadline:{" "}
                    {new Date(scholarship.deadline).toLocaleDateString()}
                  </span>
                </div>
                <div className="criteria-list">
                  <h5>Eligibility Criteria:</h5>
                  <ul>
                    {scholarship.criteria.map((criterion, index) => (
                      <li key={index}>{criterion}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="card-actions">
                <button className="apply-button">Apply Now</button>
                <button className="save-button">Save for Later</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ScholarshipsTab;
