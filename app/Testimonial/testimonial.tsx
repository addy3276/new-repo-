import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import VideoModal from "../VideoModal";

export default function TestimonialCard({
  company,
  quote,
  name,
  role,
  profileImage,
  link,
  linkType = "google",
  screenshotImage,
  animationDelay = 0,
}) {
  const [showVideo, setShowVideo] = useState(false);

  const icons = {
    google: "https://telecrm.in/assets/images/testimonial/google-icon.svg",
    video:
      "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='red' viewBox='0 0 24 24'%3e%3cpath d='M8 5v14l11-7z'/%3e%3c/svg%3e",
  };

  const tooltips = {
    google: "View on Google",
    video: "Play Video",
  };

  const handleLinkClick = () => {
    if (linkType === "video") {
      setShowVideo(true);
    } else {
      window.open(link, "_blank");
    }
  };

  return (
    <>
      <motion.div
        className="bg-white shadow-lg rounded-2xl p-6 h-fit relative"
        initial={{ opacity: 0, y: 50 }}
        animate={{
          opacity: [0, 1, 1, 0],
          y: [50, 0, -200, -400],
        }}
        transition={{
          duration: 45,
          delay: animationDelay,
          times: [0, 0.1, 0.8, 1],
          repeat: Infinity,
          repeatDelay: 2,
          ease: "linear",
        }}
        whileHover={{ scale: 1.05 }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-4 bg-gray-200 rounded-full"></div>

        <h2 className="font-bold text-lg mb-4">{company}</h2>

        {quote && <p className="text-gray-600 mb-4 leading-relaxed">{quote}</p>}

        {screenshotImage && (
          <div className="mb-4">
            <img
              src={screenshotImage}
              alt={`Screenshot from ${name}`}
              className="rounded-lg border max-h-60 object-contain"
            />
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={profileImage}
              alt={`Profile picture of ${name}`}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-sm">{name}</h3>
              <p className="text-xs text-gray-500">{role}</p>
            </div>
          </div>

          {link && (
            <button
              onClick={handleLinkClick}
              className="flex items-center gap-2 p-2 border rounded-lg hover:bg-gray-100 transition-colors"
            >
              <img src={icons[linkType]} alt="link" className="w-5 h-5" />
              <span className="text-sm text-gray-700 font-medium">
                {tooltips[linkType]}
              </span>
            </button>
          )}
        </div>
      </motion.div>

      {showVideo && (
        <VideoModal embedLink={link} onClose={() => setShowVideo(false)} />
      )}
    </>
  );
}
