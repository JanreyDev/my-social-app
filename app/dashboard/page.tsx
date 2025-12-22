// app/dashboard/page.tsx
import Image from "next/image";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"; // install @heroicons/react

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="flex items-center justify-between bg-white shadow px-6 py-4">
                {/* Left: Site name */}
                <h1 className="text-2xl font-bold text-blue-600">FriendBook</h1>

                {/* Center: Search bar */}
                <div className="flex items-center justify-center flex-1">
                    <div className="relative w-80"> {/* fixed width, centered */}
                        <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full border border-gray-300 rounded-md pl-10 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-gray-900"
                        />
                    </div>
                </div>

                {/* Right: Perfectly rounded thumbnail */}
                <div className="flex items-center">
                    <Image
                        src="/Avatar.png" // <-- your avatar file
                        alt="User avatar"
                        width={48}
                        height={48}
                        className="rounded-full border border-gray-300 object-cover"
                    />
                </div>
            </header>

            {/* Main content */}
            <main className="p-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                    Welcome to your dashboard
                </h2>
                <p className="text-gray-600">
                    This is a simple profile dashboard layout. You can add posts, friends,
                    or other features here.
                </p>
            </main>
        </div>
    );
}
