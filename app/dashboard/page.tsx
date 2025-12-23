"use client";

import Image from "next/image";
import {
    MagnifyingGlassIcon,
    ChevronDownIcon,
    UserIcon,
    ComputerDesktopIcon,
    ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

export default function Dashboard() {
    const [open, setOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [accent, setAccent] = useState("#2563eb");
    const [showThemeOptions, setShowThemeOptions] = useState(false);

    // ✅ Redirect if not logged in
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/login"; // block access if no token
        }
    }, []);

    // Load saved theme preference
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        const savedAccent = localStorage.getItem("accent");

        if (savedTheme === "dark") {
            document.documentElement.classList.add("dark");
            setDarkMode(true);
        }
        if (savedAccent) {
            document.documentElement.style.setProperty("--accent", savedAccent);
            setAccent(savedAccent);
        }
    }, []);

    const toggleTheme = () => {
        const html = document.documentElement;
        html.classList.toggle("dark");
        const isDark = html.classList.contains("dark");
        setDarkMode(isDark);
        localStorage.setItem("theme", isDark ? "dark" : "light");
    };

    const handleLogout = async () => {
        const token = localStorage.getItem("token"); // get token saved at login

        if (!token) {
            console.error("No token found");
            window.location.href = "/login";
            return;
        }

        try {
            await fetch("http://localhost:8000/api/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // attach token
                },
            });

            // Clear token and redirect
            localStorage.removeItem("token");
            window.location.href = "/login";
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Header stays full width */}
            <header className="flex items-center justify-between bg-background shadow px-[30px] py-4">
                <h1 className="text-2xl font-bold text-accent">FriendBook</h1>

                {/* Center: Search bar */}
                <div className="flex items-center justify-center flex-1">
                    <div className="relative w-80">
                        <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-muted" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full rounded-md pl-10 p-2
                 border border-muted
                 bg-background text-foreground placeholder-muted
                 focus:outline-none focus:ring-0 focus:border-accent"
                        />
                    </div>
                </div>

                {/* Right: Toggle + Profile */}
                <div className="flex items-center gap-4 relative">
                    {/* Toggle pill */}
                    <button
                        onClick={toggleTheme}
                        className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${darkMode ? "bg-gray-800" : "bg-yellow-400"
                            }`}
                    >
                        <span
                            className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow flex items-center justify-center transition-transform duration-300 ${darkMode ? "translate-x-0" : "translate-x-6"
                                }`}
                        >
                            {darkMode ? "🌙" : "☀️"}
                        </span>
                    </button>

                    {/* Profile dropdown */}
                    <div>
                        <button
                            onClick={() => setOpen(!open)}
                            className="flex items-center gap-2 p-2 rounded hover:bg-card"
                        >
                            <Image
                                src="/Avatar.png"
                                alt="User avatar"
                                width={40}
                                height={40}
                                className="rounded-full border border-gray-300 object-cover"
                            />
                            <span className="font-medium text-foreground">Janrey</span>
                            <ChevronDownIcon className="w-4 h-4 text-muted" />
                        </button>

                        {open && (
                            <div className="absolute right-0 mt-2 w-56 bg-card shadow-lg rounded p-3 flex flex-col gap-2">
                                {/* Profile */}
                                <button className="group flex items-center gap-2 w-full p-2 rounded text-foreground hover:bg-accent hover:text-white transition-colors duration-200">
                                    <UserIcon className="w-5 h-5 text-foreground group-hover:text-white" />
                                    <span>Profile</span>
                                </button>

                                {/* Theme (click to reveal color picker) */}
                                <button
                                    onClick={() => setShowThemeOptions(!showThemeOptions)}
                                    className="group flex items-center justify-between w-full p-2 rounded text-foreground hover:bg-accent hover:text-white transition-colors duration-200"
                                >
                                    <div className="flex items-center gap-2">
                                        <ComputerDesktopIcon className="w-5 h-5 text-foreground group-hover:text-white" />
                                        <span>Theme</span>
                                    </div>
                                    <ChevronDownIcon
                                        className={`w-4 h-4 text-muted transition-transform duration-200 ${showThemeOptions ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>

                                {showThemeOptions && (
                                    <div className="flex items-center gap-2 p-2">
                                        <input
                                            type="color"
                                            value={accent}
                                            onChange={(e) => {
                                                const newColor = e.target.value;
                                                setAccent(newColor);
                                                document.documentElement.style.setProperty("--accent", newColor);
                                                localStorage.setItem("accent", newColor);
                                            }}
                                            className="w-8 h-8 cursor-pointer border-none bg-transparent"
                                        />
                                        <span className="text-sm text-muted">Pick accent color</span>
                                    </div>
                                )}

                                {/* Logout */}
                                <button
                                    onClick={handleLogout}
                                    className="group flex items-center gap-2 w-full p-2 rounded text-foreground hover:bg-accent hover:text-white transition-colors duration-200"
                                >
                                    <ArrowRightOnRectangleIcon className="w-5 h-5 text-foreground group-hover:text-white" />
                                    <span>Logout</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Main content constrained to 1440px + 30px padding */}
            <div className="flex justify-center">
                <div className="w-full max-w-[1440px] px-[30px]">
                    <main className="py-6">
                        <h2 className="text-xl font-semibold mb-4">Welcome to your dashboard</h2>
                        <p>
                            This is a simple profile dashboard layout. You can add posts, friends,
                            or other features here.
                        </p>
                    </main>
                </div>
            </div>
        </div>
    );
}
