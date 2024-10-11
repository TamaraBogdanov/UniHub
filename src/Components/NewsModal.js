import React from "react";
import { X } from "lucide-react";

function NewsModal({ news, onClose }) {
  if (!news) return null;

  return (
    <div className="news-modal-overlay">
      <div className="news-modal">
        <button className="close-button" onClick={onClose}>
          <X size={24} />
        </button>
        <img src={news.image} alt={news.title} className="modal-image" />
        <div className="modal-content">
          <h2>{news.title}</h2>
          <p className="modal-meta">
            {news.category} - {news.subcategory} | {news.date}
          </p>
          <p className="modal-author">By {news.author}</p>
          <p className="modal-publisher">Published by {news.publisher}</p>
          <div className="modal-body">{news.content}</div>
        </div>
      </div>
    </div>
  );
}

export default NewsModal;
