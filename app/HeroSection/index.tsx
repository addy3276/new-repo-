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

import { useEffect, useRef, useState } from "react";

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
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure video is properly muted for iOS
    video.muted = true;
    video.volume = 0;

    // Attempt to play video
    const playVideo = async () => {
      try {
        await video.play();
      } catch (error) {
        console.log("Autoplay failed, will play on interaction");
      }
    };

    if (video.readyState >= 3) {
      playVideo();
    } else {
      video.addEventListener("loadeddata", playVideo, { once: true });
    }
  }, []);

  return (
    <section className="hero-section relative w-full bg-black">
      <div className="relative w-full h-auto md:h-[600px] overflow-hidden">
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center z-20"></div>
        )}

        <video
          ref={videoRef}
          className="w-full h-auto md:min-w-full md:min-h-full md:object-contain opacity-80"
          autoPlay
          loop
          muted
          playsInline
          disableRemotePlayback
          preload="auto"
          webkit-playsinline="true"
          x-webkit-airplay="deny"
          onLoadedData={handleLoad}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Optional overlay content */}
        {showOverlay && isLoaded && (
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
