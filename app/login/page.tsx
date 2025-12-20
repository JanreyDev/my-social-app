"use client";
import { useState } from "react";
import Link from "next/link";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"; // install @heroicons/react

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            {/* Wrapper card */}
            <div className="flex bg-white shadow-lg rounded-lg overflow-hidden max-w-5xl w-full h-[500px]">

                {/* Left Column: Full Image */}
                <div className="w-1/2">
                    <img
                        src="/login-illustration.png"
                        alt="Login illustration"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Right Column: Heading + Form */}
                <div className="w-1/2 flex flex-col justify-center items-center p-10 bg-white">
                    <h1 className="text-3xl font-bold text-blue-600 mb-2">
                        Sign In To FriendBook
                    </h1>
                    <p className="text-gray-600 text-md mb-8">
                        Welcome back to FriendBook
                    </p>

                    <form className="w-full max-w-sm space-y-5">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-gray-900"
                                placeholder="you@example.com"
                            />
                        </div>

                        {/* Password with eye icon toggle */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="mt-1 w-full border border-gray-300 rounded-md p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-gray-900"
                                    placeholder="********"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-2 inset-y-0 flex items-center text-gray-500 hover:text-blue-600"
                                >
                                    {showPassword ? (
                                        <EyeSlashIcon className="h-5 w-5" />
                                    ) : (
                                        <EyeIcon className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                        >
                            Sign In
                        </button>
                    </form>

                    <p className="mt-6 text-sm text-gray-600">
                        Don’t have an account?{" "}
                        <Link href="/signup" className="text-blue-600 hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
