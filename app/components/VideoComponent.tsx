import Link from "next/link";
import { Video } from '@imagekit/next';
import { IVideo } from "@/models/Video";


export default function VideoComponent({ video }: { video: IVideo }) {
    return (
        <div className="card glass bg-base-100/50 hover:bg-base-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden group rounded-2xl border border-base-200/50">
            <figure className="relative pt-2 px-2">
                <Link href={`/videos/${video._id}`} className="relative w-full block rounded-xl overflow-hidden shadow-inner">
                    <div
                        className="w-full relative transition-transform duration-700 group-hover:scale-[1.03]"
                        style={{ aspectRatio: "9/16" }}
                    >
                        <Video
                            className="w-full h-full object-cover"
                            src={video.videoUrl}
                            controls={video.controls}
                            transformation={[
                                {
                                    height: "1920",
                                    width: "1080",
                                },
                            ]}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                </Link>
            </figure>

            <div className="card-body p-5">
                <Link
                    href={`/videos/${video._id}`}
                    className="hover:text-primary transition-colors duration-300"
                >
                    <h2 className="card-title text-base sm:text-lg font-bold line-clamp-1">{video.title}</h2>
                </Link>

                <p className="text-sm text-base-content/60 line-clamp-2 mt-1">
                    {video.description || "No description provided."}
                </p>
                <div className="card-actions justify-end mt-2">
                    <button className="btn btn-primary btn-sm btn-circle opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0" aria-label="Play video">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </button>
                </div>
            </div>
        </div>
    );
}