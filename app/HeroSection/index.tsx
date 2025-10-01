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

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force mute and attempt to play
    video.muted = true;
    video.playsInline = true;

    const playVideo = async () => {
      try {
        await video.play();
      } catch (error) {
        console.log("Autoplay failed, waiting for user interaction");

        // Fallback: play on first user interaction
        const playOnInteraction = () => {
          video.play();
          document.removeEventListener("click", playOnInteraction);
          document.removeEventListener("scroll", playOnInteraction);
          document.removeEventListener("touchstart", playOnInteraction);
        };

        document.addEventListener("click", playOnInteraction);
        document.addEventListener("scroll", playOnInteraction);
        document.addEventListener("touchstart", playOnInteraction);
      }
    };

    playVideo();
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
          webkit-playsinline="true"
          x5-playsinline="true"
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Optional overlay content */}
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
