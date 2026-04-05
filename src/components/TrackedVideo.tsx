"use client";

import { trackEvent } from "@/lib/analytics";

export default function TrackedVideo({
  videoName,
  ...props
}: {
  videoName: string;
} & React.VideoHTMLAttributes<HTMLVideoElement>) {
  return (
    <video
      onPlay={() => trackEvent("video_play", { video_name: videoName })}
      onPause={() => trackEvent("video_pause", { video_name: videoName })}
      {...props}
    />
  );
}
