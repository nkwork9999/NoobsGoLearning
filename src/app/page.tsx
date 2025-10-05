// app/page.tsx

"use client";

import React, { useState } from "react";
import { Sidebar, TopicContent, CodeEditor } from "./components";
import { content } from "./data";

export default function App() {
  const [currentCategory, setCurrentCategory] = useState("basics");
  const [currentTopic, setCurrentTopic] = useState("project");
  const [code, setCode] = useState(content.basics.topics.project.content.code);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const category = content[currentCategory];
  const topic = category.topics[currentTopic];

  const handleTopicChange = (categoryKey: string, topicKey: string) => {
    setCurrentCategory(categoryKey);
    setCurrentTopic(topicKey);
    setCode(content[categoryKey].topics[topicKey].content.code);
    setOutput("");
    setIsSidebarOpen(false); // Close menu after topic selection on mobile
  };

  const runCode = () => {
    setIsRunning(true);
    setOutput("Running...");
    setTimeout(() => {
      setOutput(topic.content.output);
      setIsRunning(false);
    }, 800);
  };

  const formatCode = () => {
    const lines = code.split("\n");
    let indentLevel = 0;
    const formatted: string[] = [];

    for (let line of lines) {
      const trimmed = line.trim();
      if (!trimmed) {
        formatted.push("");
        continue;
      }
      if (trimmed.startsWith("}")) {
        indentLevel = Math.max(0, indentLevel - 1);
      }
      formatted.push("    ".repeat(indentLevel) + trimmed);
      if (trimmed.endsWith("{")) {
        indentLevel++;
      }
    }
    setCode(formatted.join("\n"));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        color: "#e5e7eb",
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <header
        style={{
          background:
            "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          padding: "clamp(16px, 5vw, 32px) clamp(12px, 3vw, 24px)",
          textAlign: "center",
          position: "relative",
        }}
      >
        {/* Mobile menu button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          style={{
            position: "absolute",
            left: "16px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "rgba(99, 102, 241, 0.2)",
            border: "1px solid rgba(99, 102, 241, 0.3)",
            borderRadius: "8px",
            padding: "8px 12px",
            color: "#e5e7eb",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "600",
            display: "none",
            fontFamily: "inherit",
          }}
          className="mobile-menu-btn"
        >
          ☰ Menu
        </button>

        <h1
          style={{
            fontSize: "clamp(1.5rem, 5vw, 2.5rem)",
            fontWeight: "800",
            background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "8px",
            letterSpacing: "-0.02em",
          }}
        >
          Go Patterns & Practices
        </h1>
        <p
          style={{
            color: "#9ca3af",
            fontSize: "clamp(0.875rem, 2.5vw, 1.1rem)",
          }}
        >
          Comprehensive Go Language Learning Platform
        </p>
      </header>

      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "clamp(12px, 3vw, 24px)",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "24px",
        }}
        className="main-container"
      >
        {/* Sidebar (mobile responsive) */}
        <div
          style={{
            position: "fixed",
            left: isSidebarOpen ? "0" : "-100%",
            top: "0",
            height: "100vh",
            width: "280px",
            background: "rgba(17, 24, 39, 0.98)",
            backdropFilter: "blur(20px)",
            zIndex: 1000,
            transition: "left 0.3s ease",
            overflowY: "auto",
            padding: "80px 0 24px 0",
          }}
          className="mobile-sidebar"
        >
          <Sidebar
            content={content}
            currentCategory={currentCategory}
            currentTopic={currentTopic}
            onTopicChange={handleTopicChange}
          />
        </div>

        {/* Desktop sidebar */}
        <aside className="desktop-sidebar">
          <Sidebar
            content={content}
            currentCategory={currentCategory}
            currentTopic={currentTopic}
            onTopicChange={handleTopicChange}
          />
        </aside>

        {/* Overlay (mobile) */}
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0, 0, 0, 0.7)",
              zIndex: 999,
            }}
            className="overlay"
          />
        )}

        <main>
          <div
            style={{
              background: "rgba(17, 24, 39, 0.6)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "16px",
              overflow: "hidden",
            }}
          >
            <TopicContent topic={topic} />
            <CodeEditor
              code={code}
              output={output}
              isRunning={isRunning}
              onCodeChange={setCode}
              onRun={runCode}
              onFormat={formatCode}
              onClearOutput={() => setOutput("")}
            />
          </div>
        </main>
      </div>

      <style jsx>{`
        @media (min-width: 768px) {
          .main-container {
            grid-template-columns: 280px 1fr !important;
          }
          .mobile-sidebar {
            display: none !important;
          }
          .desktop-sidebar {
            display: block !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }

        @media (max-width: 767px) {
          .mobile-menu-btn {
            display: block !important;
          }
          .desktop-sidebar {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
