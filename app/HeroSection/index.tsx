// "use client";

// interface HeroProps {
//   videoSrc?: string;
//   title?: string;
//   subtitle?: string;
//   showOverlay?: boolean;
// }

// export default function HeroSection({
//   videoSrc = "/3195394-hd_1280_720_25fps.mp4",
//   title = "",
//   subtitle = "",
//   showOverlay = true,
// }: HeroProps) {
//   return (
//     <section className="hero-section relative w-full bg-black">
//       <div className="relative w-full h-auto md:h-[600px] overflow-hidden">
//         <video
//           className="w-full h-auto md:min-w-full md:min-h-full md:object-contain opacity-80"
//           autoPlay
//           loop
//           muted
//           playsInline
//         >
//           <source src={videoSrc} type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>

//         {/* Optional overlay content */}
//         {showOverlay && (
//           <div className="absolute inset-0 z-10 flex items-center justify-center">
//             <div className="text-center text-white px-4">
//               <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
//                 {title}
//               </h1>
//               <p className="text-lg md:text-xl mb-6">{subtitle}</p>
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }
"use client";

import { useEffect, useRef } from "react";

interface HeroProps {
  videoSrc?: string;
  title?: string;
  subtitle?: string;
  showOverlay?: boolean;
}

export default function HeroSection({
  videoSrc = "/3195394-hd_1280_720_25fps.mp4",
  title = "",
  subtitle = "",
  showOverlay = true,
}: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasInteracted = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure all iOS-specific attributes are set
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    video.muted = true;
    video.volume = 0;

    const attemptPlay = () => {
      if (hasInteracted.current) return;

      const playPromise = video.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Video autoplay started successfully");
          })
          .catch((error) => {
            console.log("Autoplay failed, will play on interaction");
            // Add interaction listeners
            addInteractionListeners();
          });
      }
    };

    const addInteractionListeners = () => {
      const playVideo = () => {
        if (!hasInteracted.current) {
          hasInteracted.current = true;
          video.play();
          // Remove listeners after first interaction
          document.removeEventListener("click", playVideo);
          document.removeEventListener("touchstart", playVideo);
          document.removeEventListener("scroll", playVideo);
        }
      };

      document.addEventListener("click", playVideo, { once: true });
      document.addEventListener("touchstart", playVideo, { once: true });
      document.addEventListener("scroll", playVideo, { once: true });
    };

    // Wait for video to be ready
    if (video.readyState >= 3) {
      attemptPlay();
    } else {
      video.addEventListener("loadeddata", attemptPlay, { once: true });
    }

    // Fallback: try again after a short delay
    const timeoutId = setTimeout(attemptPlay, 1000);

    return () => {
      clearTimeout(timeoutId);
      video.removeEventListener("loadeddata", attemptPlay);
    };
  }, []);

  return (
    <section className="hero-section relative w-full bg-black">
      <div className="relative w-full h-auto md:h-[600px] overflow-hidden">
        <video
          ref={videoRef}
          className="w-full h-auto md:min-w-full md:min-h-full md:object-contain opacity-80"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          // iOS-specific attributes
          webkit-playsinline="true"
          x-webkit-airplay="deny"
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {showOverlay && (
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
                {title}
              </h1>
              <p className="text-lg md:text-xl mb-6">{subtitle}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
