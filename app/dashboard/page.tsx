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

    // Load saved theme preference
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            document.documentElement.classList.add("dark");
            setDarkMode(true);
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
        await fetch("/api/logout", { method: "POST" });
        window.location.href = "/login";
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Header */}
            <header className="flex items-center justify-between bg-background shadow px-6 py-4">
                {/* Left: Site name */}
                <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">FriendBook</h1>

                {/* Center: Search bar */}
                <div className="flex items-center justify-center flex-1">
                    <div className="relative w-80">
                        <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-300" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full border border-gray-300 dark:border-gray-700 rounded-md pl-10 p-2 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 
                         placeholder-gray-400 text-foreground bg-background"
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
                            className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <Image
                                src="/Avatar.png"
                                alt="User avatar"
                                width={40}
                                height={40}
                                className="rounded-full border border-gray-300 object-cover"
                            />
                            <span className="font-medium text-foreground">Janrey</span>
                            <ChevronDownIcon className="w-4 h-4 text-gray-500 dark:text-gray-300" />
                        </button>

                        {open && (
                            <div className="absolute right-0 mt-2 w-48 bg-background shadow-lg rounded p-2">
                                {/* Profile */}
                                <button className="group flex items-center gap-2 w-full p-2 rounded text-black dark:text-gray-100 hover:bg-blue-600 hover:text-white transition-colors duration-200">
                                    <UserIcon className="w-5 h-5 text-black dark:text-gray-100 group-hover:text-white" />
                                    <span>Profile</span>
                                </button>

                                {/* Theme */}
                                <button
                                    onClick={toggleTheme}
                                    className="group flex items-center gap-2 w-full p-2 rounded text-black dark:text-gray-100 hover:bg-blue-600 hover:text-white transition-colors duration-200"
                                >
                                    <ComputerDesktopIcon className="w-5 h-5 text-black dark:text-gray-100 group-hover:text-white" />
                                    <span>Theme</span>
                                </button>

                                {/* Logout */}
                                <button
                                    onClick={handleLogout}
                                    className="group flex items-center gap-2 w-full p-2 rounded text-black dark:text-gray-100 hover:bg-blue-600 hover:text-white transition-colors duration-200"
                                >
                                    <ArrowRightOnRectangleIcon className="w-5 h-5 text-black dark:text-gray-100 group-hover:text-white" />
                                    <span>Logout</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <div className="p-4 bg-background text-foreground">
                Dark mode test
            </div>


            {/* Main content */}
            <main className="p-6">
                <h2 className="text-xl font-semibold mb-4">Welcome to your dashboard</h2>
                <p>
                    This is a simple profile dashboard layout. You can add posts, friends,
                    or other features here.
                </p>
            </main>
        </div>
    );
}

