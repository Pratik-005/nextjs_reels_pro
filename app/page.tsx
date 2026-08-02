"use client";

import React, { useEffect, useState } from "react";
import { IVideo } from "@/models/Video";
import { apiClient } from "@/lib/api-client";
import VideoFeed from "./components/VideoFeed";

export default function Home() {
  const [videos, setVideos] = useState<IVideo[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await apiClient.getVideos();
        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <main className="w-full">
      <div className="text-center mb-12 animate-fade-in-up">
        <div className="inline-block relative">
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
          <h1 className="relative text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent tracking-tight">
            ImageKit ReelsPro
          </h1>
        </div>
        <p className="text-lg md:text-xl text-base-content/70 mt-2 max-w-2xl mx-auto">
          Discover, upload, and share stunning short videos with premium playback performance.
        </p>
      </div>

      <div className="divider opacity-50 mb-12"></div>
      
      <VideoFeed videos={videos} />
    </main>
  );
}