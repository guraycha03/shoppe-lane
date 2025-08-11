import React, { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";


export default function ScrollButtons() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  return (
    <div className={`scroll-buttons ${visible ? "show" : ""}`}>
      <button
        className="scroll-btn"
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <i className="bi bi-arrow-up"></i>
      </button>
      <button
        className="scroll-btn"
        onClick={scrollToBottom}
        aria-label="Scroll to bottom"
      >
        <i className="bi bi-arrow-down"></i>
      </button>
    </div>
  );
}
