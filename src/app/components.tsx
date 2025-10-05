// app/components.tsx

"use client";

import React from "react";

// ===== Sidebar Component =====
interface SidebarProps {
  content: any;
  currentCategory: string;
  currentTopic: string;
  onTopicChange: (categoryKey: string, topicKey: string) => void;
}

export function Sidebar({
  content,
  currentCategory,
  currentTopic,
  onTopicChange,
}: SidebarProps) {
  return (
    <aside
      style={{
        background: "rgba(17, 24, 39, 0.6)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "16px",
        padding: "24px 16px",
        height: "fit-content",
        position: "sticky",
        top: "24px",
      }}
    >
      {Object.entries(content).map(([catKey, catData]: [string, any]) => (
        <div key={catKey} style={{ marginBottom: "24px" }}>
          <h2
            style={{
              fontSize: "0.875rem",
              fontWeight: "600",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "#9ca3af",
              marginBottom: "12px",
              paddingLeft: "12px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span>{catData.icon}</span>
            <span>{catData.title}</span>
          </h2>
          <nav>
            {Object.entries(catData.topics).map(
              ([topKey, topData]: [string, any]) => (
                <button
                  key={topKey}
                  onClick={() => onTopicChange(catKey, topKey)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "10px 14px",
                    margin: "4px 0",
                    background:
                      currentCategory === catKey && currentTopic === topKey
                        ? "linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.2))"
                        : "transparent",
                    border: "none",
                    borderLeft:
                      currentCategory === catKey && currentTopic === topKey
                        ? "3px solid #6366f1"
                        : "3px solid transparent",
                    borderRadius: "8px",
                    color:
                      currentCategory === catKey && currentTopic === topKey
                        ? "#e5e7eb"
                        : "#9ca3af",
                    cursor: "pointer",
                    fontSize: "0.85rem",
                    fontWeight:
                      currentCategory === catKey && currentTopic === topKey
                        ? "600"
                        : "400",
                    transition: "all 0.2s",
                    fontFamily: "inherit",
                  }}
                  onMouseEnter={(e) => {
                    if (
                      !(currentCategory === catKey && currentTopic === topKey)
                    ) {
                      e.currentTarget.style.background =
                        "rgba(255, 255, 255, 0.05)";
                      e.currentTarget.style.color = "#e5e7eb";
                      e.currentTarget.style.transform = "translateX(4px)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (
                      !(currentCategory === catKey && currentTopic === topKey)
                    ) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "#9ca3af";
                      e.currentTarget.style.transform = "translateX(0)";
                    }
                  }}
                >
                  {topData.title}
                </button>
              )
            )}
          </nav>
        </div>
      ))}
    </aside>
  );
}

// ===== TopicContent Component =====
interface TopicContentProps {
  topic: any;
}

const getLevelColor = (level: string): string => {
  switch (level) {
    case "Beginner":
      return "#10b981";
    case "Intermediate":
      return "#f59e0b";
    case "Advanced":
      return "#ef4444";
    default:
      return "#6366f1";
  }
};

export function TopicContent({ topic }: TopicContentProps) {
  return (
    <div
      style={{
        background:
          "linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1))",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        padding: "24px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "16px",
        }}
      >
        <div>
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "700",
              marginBottom: "8px",
            }}
          >
            {topic.title}
          </h2>
          <p
            style={{
              color: "#9ca3af",
              fontSize: "1rem",
              marginBottom: "12px",
            }}
          >
            {topic.description}
          </p>
          <span
            style={{
              display: "inline-block",
              padding: "4px 12px",
              background: `${getLevelColor(topic.level)}20`,
              color: getLevelColor(topic.level),
              borderRadius: "12px",
              fontSize: "0.8rem",
              fontWeight: "600",
            }}
          >
            {topic.level}
          </span>
        </div>
      </div>

      <div
        style={{
          background: "rgba(0, 0, 0, 0.2)",
          padding: "20px",
          borderRadius: "12px",
          marginTop: "16px",
        }}
      >
        <p
          style={{
            fontSize: "0.95rem",
            lineHeight: "1.6",
            marginBottom: "16px",
          }}
        >
          {topic.content.overview}
        </p>
        <h3
          style={{
            fontSize: "0.9rem",
            fontWeight: "600",
            marginBottom: "12px",
            color: "#6366f1",
          }}
        >
          Key Points
        </h3>
        <ul style={{ paddingLeft: "20px", color: "#d1d5db" }}>
          {topic.content.keyPoints.map((point: string, i: number) => (
            <li key={i} style={{ marginBottom: "8px", fontSize: "0.9rem" }}>
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ===== CodeEditor Component =====
interface CodeEditorProps {
  code: string;
  output: string;
  isRunning: boolean;
  onCodeChange: (code: string) => void;
  onRun: () => void;
  onFormat: () => void;
  onClearOutput: () => void;
}

export function CodeEditor({
  code,
  output,
  isRunning,
  onCodeChange,
  onRun,
  onFormat,
  onClearOutput,
}: CodeEditorProps) {
  return (
    <div style={{ padding: "24px" }}>
      <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
        <button
          onClick={onFormat}
          style={{
            padding: "10px 20px",
            background: "rgba(255, 255, 255, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "8px",
            color: "#e5e7eb",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "600",
            transition: "all 0.2s",
            fontFamily: "inherit",
          }}
        >
          ✨ Format
        </button>
        <button
          onClick={onRun}
          disabled={isRunning}
          style={{
            padding: "10px 24px",
            background: isRunning
              ? "#4f46e5"
              : "linear-gradient(135deg, #6366f1, #a855f7)",
            border: "none",
            borderRadius: "8px",
            color: "white",
            cursor: isRunning ? "not-allowed" : "pointer",
            fontSize: "14px",
            fontWeight: "600",
            transition: "all 0.2s",
            opacity: isRunning ? 0.7 : 1,
            fontFamily: "inherit",
          }}
        >
          ▶ Run
        </button>
      </div>

      <textarea
        value={code}
        onChange={(e) => onCodeChange(e.target.value)}
        spellCheck={false}
        style={{
          width: "100%",
          minHeight: "400px",
          padding: "20px",
          background: "#1a1a1a",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "12px",
          color: "#e5e7eb",
          fontSize: "14px",
          fontFamily: '"Monaco", "Menlo", monospace',
          lineHeight: "1.6",
          resize: "vertical",
          outline: "none",
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "#6366f1")}
        onBlur={(e) =>
          (e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)")
        }
      />

      <div style={{ marginTop: "20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "12px",
          }}
        >
          <h3
            style={{
              fontSize: "0.875rem",
              fontWeight: "600",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "#6366f1",
            }}
          >
            Output
          </h3>
          <button
            onClick={onClearOutput}
            style={{
              padding: "6px 14px",
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "6px",
              color: "#9ca3af",
              cursor: "pointer",
              fontSize: "12px",
              fontFamily: "inherit",
            }}
          >
            Clear
          </button>
        </div>
        <div
          style={{
            padding: "20px",
            background: "#1a1a1a",
            border:
              output && !isRunning
                ? "1px solid rgba(34, 197, 94, 0.3)"
                : "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "12px",
            minHeight: "150px",
            fontFamily: '"Courier New", monospace',
            fontSize: "14px",
            lineHeight: "1.6",
            whiteSpace: "pre-wrap",
            color: isRunning ? "#fbbf24" : "#10b981",
          }}
        >
          {output || "Click the Run button to execute code..."}
        </div>
      </div>
    </div>
  );
}
