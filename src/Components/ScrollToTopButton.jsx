import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button after scrolling down 200px
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      className="scrollToTopBtn"
      onClick={scrollToTop}
      style={{
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? "auto" : "none",
      }}
    >
      <FaArrowUp />
      <style jsx>{`
        .scrollToTopBtn {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: none;
            background-color: #1c4930;
            color: #fff;
            font-size: 24px;
            cursor: pointer;
            z-index: 1000;
            display: flex; 
            align-items: center; 
            justify-content: center;
            transition: opacity 0.4s ease, transform 0.3s ease;
        }

        .scrollToTopBtn:hover {
          background-color: #62853d;
        }
      `}</style>
    </button>
  );
}