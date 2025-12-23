"use client";
import { useState } from "react";
import Link from "next/link";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { registerUser } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await registerUser(form);
            setMessage("Registration successful 🎉 Redirecting...");
            console.log("Success:", result);

            // Redirect after short delay so user sees success message
            setTimeout(() => router.push("/dashboard"), 1500);
        } catch (err: any) {
            console.error("Error:", err.response?.data || err.message);

            if (err.response?.data?.errors) {
                const errors = err.response.data.errors;
                const allMessages = Object.values(errors).flat();
                setMessage(allMessages.join(" | "));
            } else {
                setMessage("Registration failed ❌ " + (err.response?.data?.message || err.message));
            }
        }
    };

    // ✅ The return for rendering should be here
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="flex bg-white shadow-lg rounded-lg overflow-hidden max-w-5xl w-full h-[600px]">
                {/* Left Column: Heading + Form */}
                <div className="w-1/2 flex flex-col justify-center items-center p-10 bg-white">
                    <h1 className="text-3xl font-bold text-blue-600 mb-2">
                        Sign Up to FriendBook
                    </h1>
                    <p className="text-gray-600 text-md mb-8">
                        A place where you can find a friend
                    </p>

                    <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-5">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-gray-900"
                                placeholder="Your name"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-gray-900"
                                placeholder="you@example.com"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
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
                            Create Account
                        </button>
                    </form>

                    {/* Show messages */}
                    {message && (
                        <div
                            className={`mt-4 p-3 rounded-lg text-center font-semibold ${message.includes("successful")
                                ? "bg-green-100 text-green-700 animate-bounce"
                                : "bg-red-100 text-red-700"
                                }`}
                        >
                            {message}
                        </div>
                    )}

                    <p className="mt-6 text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link href="/login" className="text-blue-600 hover:underline">
                            Login
                        </Link>
                    </p>
                </div>

                {/* Right Column: Illustration */}
                <div className="w-1/2">
                    <img
                        src="/signup-illustration.png"
                        alt="Sign up illustration"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
}
