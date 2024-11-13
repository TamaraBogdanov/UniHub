// src/components/chat/ChatPage.js
import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  MessageCircle,
  Plus,
  Paperclip,
  Smile,
  Send,
  Phone,
  Video,
  File,
  Filter,
  Check,
  CheckCheck,
  Clock,
  Mic,
  Trash,
  X,
  Sun,
  Moon,
} from "lucide-react";
import {
  mockConversations,
  currentUser,
  chatCategories,
} from "../../Mockdata/chatData";
import "../../Styles/Chat.css";

function ChatPage() {
  // State management
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedChat, setSelectedChat] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState("");
  const [conversations, setConversations] = useState(mockConversations);
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const [messageSearchQuery, setMessageSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchBar, setShowSearchBar] = useState(false);

  // Refs
  const messagesEndRef = useRef(null);
  const chatInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const recordingTimerRef = useRef(null);

  // Effect for auto-scrolling to bottom
  useEffect(() => {
    scrollToBottom();
  }, [selectedChat?.messages]);

  // Effect for marking messages as read
  useEffect(() => {
    if (selectedChat) {
      markMessagesAsRead();
    }
  });

  // Functions
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const markMessagesAsRead = () => {
    const category = Object.keys(conversations).find((key) =>
      conversations[key].some((conv) => conv.id === selectedChat.id)
    );

    if (category) {
      const updatedConversations = {
        ...conversations,
        [category]: conversations[category].map((conv) =>
          conv.id === selectedChat.id
            ? {
                ...conv,
                messages: conv.messages.map((msg) =>
                  msg.senderId !== currentUser.id && msg.status !== "read"
                    ? { ...msg, status: "read" }
                    : msg
                ),
              }
            : conv
        ),
      };
      setConversations(updatedConversations);
    }
  };

  const filteredConversations = () => {
    let filtered = [];
    if (selectedCategory === "all") {
      filtered = Object.values(conversations).flat();
    } else {
      filtered = conversations[selectedCategory] || [];
    }

    if (searchQuery) {
      filtered = filtered.filter((conv) =>
        conv.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return filtered;
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newMessage = {
        id: Date.now().toString(),
        senderId: currentUser.id,
        content: `File: ${file.name}`,
        type: "file",
        fileName: file.name,
        fileSize: `${(file.size / 1024).toFixed(2)} KB`,
        timestamp: new Date(),
        status: "sent",
      };
      sendMessage(newMessage);
    }
  };

  const toggleMessageSelection = (messageId) => {
    if (selectedMessages.includes(messageId)) {
      setSelectedMessages(selectedMessages.filter((id) => id !== messageId));
    } else {
      setSelectedMessages([...selectedMessages, messageId]);
    }
  };

  const handleTyping = (e) => {
    setMessage(e.target.value);
    if (!isTyping) {
      setIsTyping(true);
      simulateTypingIndicator();
    }
  };

  const simulateTypingIndicator = () => {
    if (selectedChat) {
      const updatedConversations = { ...conversations };
      const category = Object.keys(conversations).find((key) =>
        conversations[key].some((conv) => conv.id === selectedChat.id)
      );

      if (category) {
        updatedConversations[category] = conversations[category].map((conv) =>
          conv.id === selectedChat.id ? { ...conv, isTyping: true } : conv
        );
        setConversations(updatedConversations);

        setTimeout(() => {
          setIsTyping(false);
          const finalUpdate = { ...updatedConversations };
          finalUpdate[category] = finalUpdate[category].map((conv) =>
            conv.id === selectedChat.id ? { ...conv, isTyping: false } : conv
          );
          setConversations(finalUpdate);
        }, 2000);
      }
    }
  };

  const sendMessage = (newMessage) => {
    if (selectedChat) {
      const category = Object.keys(conversations).find((key) =>
        conversations[key].some((conv) => conv.id === selectedChat.id)
      );

      if (category) {
        // Add reply reference if replying to a message
        if (replyingTo) {
          newMessage.replyTo = {
            id: replyingTo.id,
            content: replyingTo.content,
            senderId: replyingTo.senderId,
          };
        }

        const updatedConversations = {
          ...conversations,
          [category]: conversations[category].map((conv) =>
            conv.id === selectedChat.id
              ? { ...conv, messages: [...conv.messages, newMessage] }
              : conv
          ),
        };
        setConversations(updatedConversations);

        // Clear reply state
        setReplyingTo(null);

        // Simulate message status updates
        simulateMessageStatus(newMessage.id);
      }
    }
  };

  const simulateMessageStatus = (messageId) => {
    // Simulate delivered status
    setTimeout(() => {
      updateMessageStatus(messageId, "delivered");
      // Simulate read status after delivery
      setTimeout(() => {
        updateMessageStatus(messageId, "read");
      }, 1000);
    }, 1000);
  };

  const handleSendMessage = () => {
    if (!message.trim() && !isRecording) return;

    const newMessage = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      content: isRecording ? "🎤 Voice message" : message,
      type: isRecording ? "voice" : "text",
      timestamp: new Date(),
      status: "sent",
    };

    sendMessage(newMessage);
    setMessage("");
    setIsRecording(false);
    setRecordingTime(0);

    // Simulate reply
    simulateReply();
  };

  const simulateReply = () => {
    setTimeout(() => {
      const replyMessage = {
        id: Date.now().toString(),
        senderId: selectedChat.id,
        content: "Thanks for your message! I'll get back to you soon.",
        type: "text",
        timestamp: new Date(),
        status: "sent",
      };
      sendMessage(replyMessage);
    }, 2000);
  };

  const updateMessageStatus = (messageId, status) => {
    if (selectedChat) {
      const category = Object.keys(conversations).find((key) =>
        conversations[key].some((conv) => conv.id === selectedChat.id)
      );

      if (category) {
        const updatedConversations = {
          ...conversations,
          [category]: conversations[category].map((conv) => ({
            ...conv,
            messages: conv.messages.map((msg) =>
              msg.id === messageId ? { ...msg, status } : msg
            ),
          })),
        };
        setConversations(updatedConversations);
      }
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    let seconds = 0;
    const timer = setInterval(() => {
      seconds++;
      setRecordingTime(seconds);
    }, 1000);
    recordingTimerRef.current = timer;
  };

  const stopRecording = () => {
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
    }
    setIsRecording(false);
    handleSendMessage();
  };

  const handleReply = (message) => {
    setReplyingTo(message);
    chatInputRef.current?.focus();
  };

  const deleteMessages = () => {
    if (selectedChat && selectedMessages.length > 0) {
      const category = Object.keys(conversations).find((key) =>
        conversations[key].some((conv) => conv.id === selectedChat.id)
      );

      if (category) {
        const updatedConversations = {
          ...conversations,
          [category]: conversations[category].map((conv) =>
            conv.id === selectedChat.id
              ? {
                  ...conv,
                  messages: conv.messages.filter(
                    (msg) => !selectedMessages.includes(msg.id)
                  ),
                }
              : conv
          ),
        };
        setConversations(updatedConversations);
        setSelectedMessages([]);
        setIsSelectionMode(false);
      }
    }
  };

  const searchMessages = (query) => {
    if (!query.trim() || !selectedChat) return;

    const results = selectedChat.messages.filter((msg) =>
      msg.content.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
  };

  // Message status icon component
  const MessageStatus = ({ status }) => {
    switch (status) {
      case "sent":
        return <Check size={16} className="message-status" />;
      case "delivered":
        return <CheckCheck size={16} className="message-status" />;
      case "read":
        return <CheckCheck size={16} className="message-status read" />;
      default:
        return <Clock size={16} className="message-status" />;
    }
  };

  return (
    <div className={`chat-container ${isDarkMode ? "dark-mode" : ""}`}>
      {/* Sidebar */}
      <div className="chat-sidebar">
        <div className="chat-sidebar-header">
          <div className="chat-user-profile">
            <div className="user-avatar">{currentUser.name.charAt(0)}</div>
            <div className="user-info">
              <h2>{currentUser.name}</h2>
              <p>{currentUser.role}</p>
            </div>
          </div>
          <button
            className="icon-button"
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        <div className="chat-search">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="chat-categories">
          {chatCategories.map((category) => (
            <button
              key={category.id}
              className={`chat-category-button ${
                selectedCategory === category.id ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="conversations-list">
          {filteredConversations().map((conversation) => (
            <div
              key={conversation.id}
              className={`conversation-item ${
                selectedChat?.id === conversation.id ? "active" : ""
              }`}
              onClick={() => setSelectedChat(conversation)}
            >
              <div className="conversation-avatar">
                {conversation.avatar ? (
                  <img src={conversation.avatar} alt={conversation.name} />
                ) : (
                  <div className="avatar-placeholder">
                    {conversation.name.charAt(0)}
                  </div>
                )}
                {conversation.online && <div className="online-indicator" />}
              </div>

              <div className="conversation-info">
                <div className="conversation-header">
                  <h3>{conversation.name}</h3>
                  <span className="last-seen">{conversation.lastSeen}</span>
                </div>
                <p className="last-message">
                  {conversation.isTyping ? (
                    <span className="typing-indicator">
                      <span className="typing-dot"></span>
                      <span className="typing-dot"></span>
                      <span className="typing-dot"></span>
                    </span>
                  ) : (
                    conversation.messages[conversation.messages.length - 1]
                      ?.content
                  )}
                </p>
              </div>

              {conversation.unreadCount > 0 && (
                <div className="unread-badge">{conversation.unreadCount}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      {selectedChat ? (
        <div className="chat-main">
          <div className="chat-main-header">
            {showSearchBar ? (
              <div className="message-search-bar">
                <input
                  type="text"
                  placeholder="Search in conversation..."
                  value={messageSearchQuery}
                  onChange={(e) => {
                    setMessageSearchQuery(e.target.value);
                    searchMessages(e.target.value);
                  }}
                />
                <button
                  className="icon-button"
                  onClick={() => {
                    setShowSearchBar(false);
                    setMessageSearchQuery("");
                    setSearchResults([]);
                  }}
                >
                  <X size={20} />
                </button>
              </div>
            ) : (
              <>
                <div className="chat-header-info">
                  {selectedChat.avatar ? (
                    <img
                      src={selectedChat.avatar}
                      alt={selectedChat.name}
                      className="chat-header-avatar"
                    />
                  ) : (
                    <div className="chat-header-avatar-placeholder">
                      {selectedChat.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h2>{selectedChat.name}</h2>
                    <span className="chat-status">
                      {selectedChat.isTyping
                        ? "Typing..."
                        : selectedChat.online
                        ? "Online"
                        : selectedChat.lastSeen}
                    </span>
                  </div>
                </div>

                <div className="chat-header-actions">
                  <button className="icon-button">
                    <Phone size={20} />
                  </button>
                  <button className="icon-button">
                    <Video size={20} />
                  </button>
                  <button
                    className="icon-button"
                    onClick={() => setShowSearchBar(true)}
                  >
                    <Search size={20} />
                  </button>
                  <button
                    className="icon-button"
                    onClick={() => setIsSelectionMode(!isSelectionMode)}
                  >
                    {isSelectionMode ? (
                      <Check size={20} />
                    ) : (
                      <Filter size={20} />
                    )}
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Selected Messages Bar */}
          {isSelectionMode && selectedMessages.length > 0 && (
            <div className="selected-messages-bar">
              <span className="selected-count">
                {selectedMessages.length} selected
              </span>
              <div className="selected-actions">
                <button className="icon-button" onClick={deleteMessages}>
                  <Trash size={20} />
                </button>
                <button
                  className="icon-button"
                  onClick={() => {
                    setIsSelectionMode(false);
                    setSelectedMessages([]);
                  }}
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          )}

          {/* Reply Container */}
          {replyingTo && (
            <div className="reply-container">
              <div className="reply-content">
                <small>Replying to {replyingTo.senderId}</small>
                <p>{replyingTo.content}</p>
              </div>
              <button
                className="icon-button"
                onClick={() => setReplyingTo(null)}
              >
                <X size={16} />
              </button>
            </div>
          )}

          {/* Messages Area */}
          <div className="chat-main-messages">
            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="search-results-overlay">
                <div className="search-results-count">
                  {searchResults.length} results found
                </div>
                {searchResults.map((result, index) => (
                  <div
                    key={result.id}
                    className="search-result-item"
                    onClick={() => {
                      const element = document.getElementById(
                        `message-${result.id}`
                      );
                      element?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    <span className="search-result-number">#{index + 1}</span>
                    <p>{result.content}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Messages */}
            {selectedChat.messages.map((msg) => (
              <div
                key={msg.id}
                id={`message-${msg.id}`}
                className={`message ${
                  msg.senderId === currentUser.id ? "sent" : "received"
                } ${isSelectionMode ? "selectable" : ""} ${
                  selectedMessages.includes(msg.id) ? "selected" : ""
                }`}
                onClick={() =>
                  isSelectionMode && toggleMessageSelection(msg.id)
                }
                onDoubleClick={() => !isSelectionMode && handleReply(msg)}
              >
                {/* Reply Reference */}
                {msg.replyTo && (
                  <div className="reply-reference">
                    <small>Reply to {msg.replyTo.senderId}</small>
                    <p>{msg.replyTo.content}</p>
                  </div>
                )}

                <div className="main-message-content">
                  {msg.type === "file" ? (
                    <div className="file-message">
                      <File size={20} />
                      <div className="file-info">
                        <span>{msg.fileName}</span>
                        <small>{msg.fileSize}</small>
                      </div>
                    </div>
                  ) : msg.type === "voice" ? (
                    <div className="voice-message">
                      <Mic size={20} />
                      <div className="voice-waveform" />
                      <span className="voice-duration">0:30</span>
                    </div>
                  ) : (
                    msg.content
                  )}

                  <div className="message-metadata">
                    <span className="main-message-time">
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    {msg.senderId === currentUser.id && (
                      <MessageStatus status={msg.status} />
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="main-chat-input">
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileUpload}
            />

            {/* Attachment Button */}
            <button
              className="icon-button"
              onClick={() => fileInputRef.current.click()}
            >
              <Paperclip size={20} />
            </button>

            {/* Voice Recording or Text Input */}
            {isRecording ? (
              <div className="recording-indicator">
                <Mic size={20} className="recording-icon" />
                <span>{recordingTime}s</span>
                <button className="icon-button" onClick={stopRecording}>
                  <X size={20} />
                </button>
              </div>
            ) : (
              <input
                ref={chatInputRef}
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={handleTyping}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
            )}

            {/* Emoji Picker */}
            <button
              className="icon-button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <Smile size={20} />
            </button>

            {/* Send or Record Button */}
            {message.trim() ? (
              <button className="main-send-button" onClick={handleSendMessage}>
                <Send size={20} />
              </button>
            ) : (
              <button
                className="main-send-button"
                onClick={isRecording ? stopRecording : startRecording}
              >
                <Mic size={20} />
              </button>
            )}
          </div>
        </div>
      ) : (
        // Empty State
        <div className="chat-placeholder">
          <MessageCircle size={48} />
          <h2>Select a conversation to start messaging</h2>
          <p>Choose from your existing conversations or start a new one</p>
          <button className="new-chat-button">
            <Plus size={20} />
            <span>Start New Chat</span>
          </button>
        </div>
      )}

      {/* Emoji Picker Overlay */}
      {showEmojiPicker && (
        <div
          className="emoji-picker-overlay"
          onClick={() => setShowEmojiPicker(false)}
        >
          <div className="emoji-picker" onClick={(e) => e.stopPropagation()}>
            {/* Add your emoji picker implementation here */}
            <div className="emoji-grid">
              {["😊", "😂", "🥰", "😎", "🤔", "👍", "❤️", "🎉"].map((emoji) => (
                <button
                  key={emoji}
                  className="emoji-button"
                  onClick={() => {
                    setMessage(message + emoji);
                    setShowEmojiPicker(false);
                  }}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatPage;
