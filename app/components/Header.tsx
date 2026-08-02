"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Home, User, LogOut, Upload, LogIn } from "lucide-react";
import { useNotification } from "./Notification";

export default function Header() {
    
    const { data: session } = useSession();

    const { showNotification } = useNotification();

    const handleSignOut = async () => {
        try {
            await signOut();
            showNotification("Signed out successfully", "success");
        } catch {
            showNotification("Failed to sign out", "error");
        }
    };

    return (
        <div className="navbar bg-base-100/60 backdrop-blur-xl glass sticky top-0 z-50 border-b border-base-content/5 shadow-sm transition-all duration-300">
            <div className="container mx-auto px-4 flex items-center justify-between w-full">
                <div className="flex-1">
                    <Link
                        href="/"
                        className="btn btn-ghost text-2xl gap-2 normal-case font-extrabold hover:bg-transparent hover:scale-105 transition-transform duration-300 group"
                        prefetch={true}
                        onClick={() =>
                            showNotification("Welcome to ImageKit ReelsPro", "info")
                        }
                    >
                        <div className="p-2 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                            <Home className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                        </div>
                        <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-pulse">ReelsPro</span>
                    </Link>
                </div>
                <div className="flex-none gap-2">
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-circle avatar hover:ring-2 hover:ring-primary/50 transition-all duration-300"
                        >
                            <div className="w-10 rounded-full bg-base-300/50 flex items-center justify-center">
                                <User className="w-5 h-5 text-base-content/70" />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="dropdown-content menu p-3 shadow-2xl bg-base-100/90 backdrop-blur-xl border border-base-content/10 rounded-2xl w-72 mt-4 gap-2 z-50 origin-top-right transition-all duration-200"
                        >
                            {session ? (
                                <>
                                    <li className="mb-2 pointer-events-none">
                                        <div className="flex flex-col items-start gap-1 p-3 bg-base-200/50 rounded-xl">
                                            <span className="text-xs font-semibold text-primary uppercase tracking-wider">Signed in as</span>
                                            <span className="text-sm font-medium opacity-90 break-all w-full">
                                                {session.user?.email}
                                            </span>
                                        </div>
                                    </li>

                                    <li>
                                        <Link
                                            href="/upload"
                                            className="flex items-center gap-3 px-4 py-3 hover:bg-primary/10 hover:text-primary rounded-xl transition-colors font-medium"
                                            onClick={() =>
                                                showNotification("Welcome to Studio", "info")
                                            }
                                        >
                                            <Upload className="w-4 h-4" />
                                            Upload Reel
                                        </Link>
                                    </li>

                                    <div className="divider my-0 h-px bg-base-content/10"></div>

                                    <li>
                                        <button
                                            onClick={handleSignOut}
                                            className="flex items-center gap-3 px-4 py-3 text-error hover:bg-error/10 rounded-xl w-full text-left font-medium transition-colors"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            Sign Out
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <li>
                                    <Link
                                        href="/login"
                                        className="flex items-center gap-3 px-4 py-3 bg-primary/10 text-primary hover:bg-primary hover:text-primary-content rounded-xl transition-colors font-medium shadow-sm"
                                        onClick={() =>
                                            showNotification("Please sign in to continue", "info")
                                        }
                                    >
                                        <LogIn className="w-4 h-4" />
                                        Sign In
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}