"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { useNotification } from "./Notification";
import { apiClient } from "@/lib/api-client";
import ImageKitFileUploader from "./FileUpload";

interface VideoFormData {
    title: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
}

export default function VideoUploadForm() {

    const [loading, setLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const { showNotification } = useNotification();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<VideoFormData>({
        defaultValues: {
            title: "",
            description: "",
            videoUrl: "",
            thumbnailUrl: "",
        },
    });

    const handleUploadSuccess = (response: any) => {
        setValue("videoUrl", response.filePath);
        setValue("thumbnailUrl", response.thumbnailUrl || response.filePath);
        showNotification("Video uploaded successfully!", "success");
    };

    const handleUploadProgress = (progress: number) => {
        setUploadProgress(progress);
    };
    
    const onSubmit = async (data: VideoFormData) => {
        if (!data.videoUrl) {
            showNotification("Please upload a video first", "error");
            return;
        }
        setLoading(true);
        try {
            await apiClient.createVideo(data);
            showNotification("Video published successfully!", "success");
            setValue("title", "");
            setValue("description", "");
            setValue("videoUrl", "");
            setValue("thumbnailUrl", "");
            setUploadProgress(0);
        } catch (error) {
            showNotification(
                error instanceof Error ? error.message : "Failed to publish video",
                "error"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-base-100/50 backdrop-blur-md glass p-8 rounded-2xl shadow-xl border border-base-200/50">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Upload New Reel</h2>

            <div className="form-control hover:scale-[1.01] transition-transform duration-300">
                <label className="label font-medium opacity-80">Title</label>
                <input
                    type="text"
                    className={`input input-bordered focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all ${errors.title ? "input-error" : ""}`}
                    placeholder="Enter an engaging title..."
                    {...register("title", { required: "Title is required" })}
                />
                {errors.title && (
                    <span className="text-error text-sm mt-1">
                        {errors.title.message}
                    </span>
                )}
            </div>

            <div className="form-control hover:scale-[1.01] transition-transform duration-300">
                <label className="label font-medium opacity-80">Description</label>
                <textarea
                    className={`textarea textarea-bordered h-24 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all ${errors.description ? "textarea-error" : ""}`}
                    placeholder="Tell your audience what this reel is about..."
                    {...register("description", { required: "Description is required" })}
                />
                {errors.description && (
                    <span className="text-error text-sm mt-1">
                        {errors.description.message}
                    </span>
                )}
            </div>

            <div className="form-control p-4 bg-base-200/30 rounded-xl border border-base-content/5 hover:border-primary/30 transition-colors duration-300">
                <label className="label font-medium opacity-80 mb-2">Upload Video</label>
                <ImageKitFileUploader
                    onSuccess={handleUploadSuccess}
                    onProgress={handleUploadProgress}
                />
                {uploadProgress > 0 && (
                    <div className="w-full bg-base-300 rounded-full h-3 mt-4 overflow-hidden border border-base-content/10">
                        <div
                            className="bg-gradient-to-r from-primary to-secondary h-full rounded-full transition-all duration-300 relative"
                            style={{ width: `${uploadProgress}%` }}
                        >
                            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                        </div>
                    </div>
                )}
            </div>

            <button
                type="submit"
                className="btn btn-primary btn-block mt-8 hover:scale-[1.02] transition-transform duration-300 shadow-lg shadow-primary/30"
                disabled={loading || !uploadProgress}
            >
                {loading ? (
                    <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Publishing Reel...
                    </>
                ) : (
                    "Publish Reel"
                )}
            </button>
        </form>
    );
}