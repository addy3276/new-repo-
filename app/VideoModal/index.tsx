"use client";
import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function VideoModal({ embedLink, onClose }) {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = originalStyle;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-md"
      onClick={onClose}
    >
      {/* Perfect center using CSS Grid */}
      <div className="h-full w-full grid place-items-center p-4">
        <div className="relative w-full max-w-6xl">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute -top-12 right-0 text-white hover:text-gray-300 text-3xl font-light drop-shadow-lg"
          >
            × Close
          </button>

          {/* Video Wrapper */}
          <div
            className="relative w-full bg-black rounded-lg overflow-hidden shadow-2xl"
            style={{
              aspectRatio: "16/9",
              maxHeight: "calc(100vh - 8rem)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={embedLink}
              className="absolute inset-0 w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              title="Video"
            />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
