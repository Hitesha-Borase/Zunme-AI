import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Sparkles,
  Copy,
  Bookmark,
  RefreshCw,
  Paperclip,
  Check,
  Bot,
  User as UserIcon,
  HelpCircle,
  TrendingUp,
  FileText,
  Code
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import './ChatPage.css';

export const ChatPage: React.FC = () => {
  const {
    activeMessages,
    isAiResponding,
    sendMessage,
    saveToLibrary,
    showToast,
    user
  } = useApp();

  const [inputMessage, setInputMessage] = useState('');
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);
  const scrollEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const hasSentInitialPrompt = useRef(false);

  // Check if routed with a prompt from Landing Page
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initialPrompt = params.get('prompt');
    if (initialPrompt && !hasSentInitialPrompt.current) {
      hasSentInitialPrompt.current = true;
      sendMessage(initialPrompt);
      // Clean query param from URL without reload
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, [sendMessage]);

  // Auto scroll to bottom when messages update
  useEffect(() => {
    scrollEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeMessages, isAiResponding]);

  const handleSend = () => {
    if (!inputMessage.trim() || isAiResponding) return;
    sendMessage(inputMessage.trim());
    setInputMessage('');
    if (textareaRef.current) {
      textareaRef.current.style.height = '48px';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCopyMessage = (msgId: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedMsgId(msgId);
    showToast('Copied answer to clipboard', 'info');
    setTimeout(() => setCopiedMsgId(null), 2000);
  };

  const handleSaveToLibrary = (content: string) => {
    const firstLine = content.split('\n')[0].replace(/[#*`]/g, '').trim() || 'AI Conversation Extract';
    saveToLibrary({
      title: firstLine.slice(0, 48),
      contentType: 'TEXT',
      previewText: content.slice(0, 140) + '...',
      content,
      tags: ['AI Chat', 'Notes']
    });
  };

  const handlePromptCardClick = (promptText: string) => {
    sendMessage(promptText);
  };

  return (
    <div className="chat-workspace">
      {/* Chat Top Info Bar */}
      <div className="chat-header-bar">
        <div className="chat-model-info">
          <div className="model-badge">
            <Sparkles size={13} />
            <span>Zunme Core 4o</span>
          </div>
          <span style={{ fontSize: '12px', color: 'var(--color-text-tertiary)' }}>
            Context Window: 128k
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="badge badge-success">Online & Ready</span>
        </div>
      </div>

      {/* Chat Messages Canvas */}
      <div className="chat-canvas">
        <div className="chat-scroll-inner">
          {activeMessages.length === 0 ? (
            <div className="chat-empty-state">
              <div className="empty-state-icon">
                <Bot size={32} />
              </div>
              <h2 className="empty-state-title">Welcome to Zunme AI Assistant</h2>
              <p className="empty-state-desc">
                What would you like to work on today? Ask a question, request a strategic plan, or choose a prompt to get started.
              </p>

              <div className="starter-prompts-grid">
                <div
                  className="starter-prompt-card"
                  onClick={() =>
                    handlePromptCardClick(
                      'Can you propose a 4-step go-to-market plan for an AI productivity tool designed for creators?'
                    )
                  }
                >
                  <div className="flex items-center gap-2">
                    <TrendingUp size={15} color="var(--color-primary)" />
                    <strong>Creator GTM Strategy</strong>
                  </div>
                  <span>4-step framework for early adopter traction</span>
                </div>

                <div
                  className="starter-prompt-card"
                  onClick={() =>
                    handlePromptCardClick(
                      'Draft a high-converting product announcement email for a new eco-friendly water bottle brand.'
                    )
                  }
                >
                  <div className="flex items-center gap-2">
                    <FileText size={15} color="var(--color-primary)" />
                    <strong>Product Launch Email</strong>
                  </div>
                  <span>Persuasive copy with subject line and CTA</span>
                </div>

                <div
                  className="starter-prompt-card"
                  onClick={() =>
                    handlePromptCardClick(
                      'What are the main best practices for organizing shared design tokens in a React + TypeScript project?'
                    )
                  }
                >
                  <div className="flex items-center gap-2">
                    <Code size={15} color="var(--color-primary)" />
                    <strong>Frontend Architecture</strong>
                  </div>
                  <span>Type-safe CSS tokens & component primitives</span>
                </div>

                <div
                  className="starter-prompt-card"
                  onClick={() =>
                    handlePromptCardClick(
                      'Explain the difference between retrieval-augmented generation (RAG) and model fine-tuning with practical examples.'
                    )
                  }
                >
                  <div className="flex items-center gap-2">
                    <HelpCircle size={15} color="var(--color-primary)" />
                    <strong>RAG vs Fine-Tuning</strong>
                  </div>
                  <span>Practical trade-offs and implementation cost</span>
                </div>
              </div>
            </div>
          ) : (
            activeMessages.map((msg) => (
              <div
                key={msg.id}
                className={`chat-message-row ${msg.role === 'user' ? 'user' : 'ai'}`}
              >
                <div className={`chat-avatar ${msg.role === 'user' ? 'user-av' : 'ai-av'}`}>
                  {msg.role === 'user' ? (
                    user ? user.fullName.charAt(0).toUpperCase() : <UserIcon size={16} />
                  ) : (
                    <Bot size={17} />
                  )}
                </div>

                <div className="chat-bubble-content">
                  {msg.role === 'user' ? (
                    <div className="user-bubble">{msg.content}</div>
                  ) : (
                    <>
                      <div className="ai-bubble">
                        <RichMessageRenderer content={msg.content} />
                      </div>

                      <div className="ai-message-toolbar">
                        <button
                          className="btn btn-ghost btn-sm"
                          onClick={() => handleCopyMessage(msg.id, msg.content)}
                          title="Copy Answer"
                        >
                          {copiedMsgId === msg.id ? (
                            <>
                              <Check size={13} color="var(--color-success)" />
                              <span style={{ color: 'var(--color-success)' }}>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy size={13} />
                              <span>Copy</span>
                            </>
                          )}
                        </button>

                        <button
                          className="btn btn-ghost btn-sm"
                          onClick={() => handleSaveToLibrary(msg.content)}
                          title="Save this response to My Library"
                        >
                          <Bookmark size={13} />
                          <span>Save to Library</span>
                        </button>

                        <button
                          className="btn btn-ghost btn-sm"
                          onClick={() => sendMessage('Can you expand further on this topic?')}
                          title="Generate follow-up"
                        >
                          <RefreshCw size={13} />
                          <span>Follow-up</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))
          )}

          {/* Typing Indicator */}
          {isAiResponding && (
            <div className="chat-message-row ai">
              <div className="chat-avatar ai-av">
                <Bot size={17} />
              </div>
              <div className="typing-indicator-row">
                <span style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginRight: '4px' }}>
                  Zunme AI is generating
                </span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            </div>
          )}

          <div ref={scrollEndRef} />
        </div>
      </div>

      {/* Chat Input Bar */}
      <div className="chat-input-container">
        <div className="chat-input-box">
          <textarea
            ref={textareaRef}
            className="chat-textarea"
            placeholder="Ask anything or describe what you want to create... (Press Enter to send)"
            value={inputMessage}
            onChange={(e) => {
              setInputMessage(e.target.value);
              // auto resize
              e.target.style.height = 'auto';
              e.target.style.height = Math.min(e.target.scrollHeight, 180) + 'px';
            }}
            onKeyDown={handleKeyDown}
            disabled={isAiResponding}
            rows={1}
          />

          <div className="chat-input-actions">
            <div className="input-hints flex items-center gap-3">
              <span>Enter ↵ to send</span>
              <span>Shift+Enter for newline</span>
              <button
                className="btn-ghost btn-sm"
                onClick={() => showToast('File attachments are scheduled for Phase 3', 'info')}
                title="Attach files (Phase 3)"
                style={{ padding: '2px 6px', color: 'var(--color-text-tertiary)' }}
              >
                <Paperclip size={14} />
              </button>
            </div>

            <div className="input-btns-right">
              <button
                className="btn btn-primary btn-sm"
                onClick={handleSend}
                disabled={!inputMessage.trim() || isAiResponding}
                style={{ borderRadius: 'var(--radius-full)', padding: '6px 14px' }}
              >
                <span>Send</span>
                <Send size={13} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple Markdown Renderer for safe, clean display
const RichMessageRenderer: React.FC<{ content: string }> = ({ content }) => {
  const sections = content.split('\n\n');

  return (
    <div>
      {sections.map((section, idx) => {
        // Code Block
        if (section.startsWith('```')) {
          const lines = section.split('\n');
          const lang = lines[0].replace('```', '') || 'code';
          const codeText = lines.slice(1, -1).join('\n');
          return (
            <div key={idx} className="ai-code-block">
              <div className="code-header">
                <span>{lang}</span>
                <button
                  className="btn-ghost btn-sm"
                  style={{ color: '#94A3B8', padding: '2px 6px' }}
                  onClick={() => navigator.clipboard.writeText(codeText)}
                >
                  <Copy size={11} /> Copy
                </button>
              </div>
              <div className="code-body">{codeText}</div>
            </div>
          );
        }

        // Headings
        if (section.startsWith('### ')) {
          return <h3 key={idx}>{section.replace('### ', '')}</h3>;
        }
        if (section.startsWith('## ')) {
          return <h2 key={idx} style={{ fontSize: '16px', fontWeight: 700, margin: '14px 0 6px' }}>{section.replace('## ', '')}</h2>;
        }

        // Unordered list
        if (section.includes('\n- ') || section.startsWith('- ')) {
          const items = section.split('\n').filter((l) => l.trim().startsWith('- '));
          return (
            <ul key={idx}>
              {items.map((item, i) => (
                <li key={i}>{item.replace('- ', '')}</li>
              ))}
            </ul>
          );
        }

        // Numbered list
        if (/^\d+\.\s/.test(section.trim())) {
          const items = section.split('\n').filter((l) => /^\d+\.\s/.test(l.trim()));
          return (
            <ol key={idx}>
              {items.map((item, i) => (
                <li key={i}>{item.replace(/^\d+\.\s/, '')}</li>
              ))}
            </ol>
          );
        }

        // Normal paragraph
        return (
          <p key={idx} style={{ marginBottom: '8px' }}>
            {section}
          </p>
        );
      })}
    </div>
  );
};
