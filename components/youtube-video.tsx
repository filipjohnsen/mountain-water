"use client";
import YTPlayer, { LiteYouTubeProps } from "react-lite-youtube-embed";

type Props = Omit<LiteYouTubeProps, "wrapperClass" | "playerClass"> & {
  className?: string;
  thumbnail?: string;
};

export const YouTubePlayer = ({ className, thumbnail, ...props }: Props) => {
  return (
    <YTPlayer
      {...props}
      wrapperClass={`group rounded-lg overflow-hidden [background-size:cover] [background-repeat:no-repeat] [background-position:center] w-full h-full ${className}`}
      playerClass="absolute rounded-md group-[.active]:hidden inset-0 bg-black/20 group-hover:bg-black/40 transition-colors before:content-[''] group/active:hidden before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:z-10 before:bg-[#FF0000] before:rounded-2xl before:w-[100px] before:aspect-video after:content-[''] after:w-5 after:h-5 after:bg-white after:[clip-path:polygon(100%_50%,0_0,0_100%)] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:z-10"
      iframeClass="w-full h-full absolute inset-0 z-100 rounded-md overflow-hidden"
      thumbnail={thumbnail}
      activatedClass="active"
      params="rel=0"
      webp
    />
  );
};
