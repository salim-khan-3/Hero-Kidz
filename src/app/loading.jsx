"use client"
export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      {/* Outer Spinner */}
      <div className="relative flex items-center justify-center">
        <div className="w-20 h-20 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        
        {/* Inner Pulsing Logo or Icon */}
        <div className="absolute">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg animate-pulse"></div>
        </div>
      </div>

      {/* Loading Text */}
      <div className="mt-8 text-center">
        <h2 className="text-xl font-semibold text-gray-800 animate-pulse">
          Loading Content...
        </h2>
        <p className="text-gray-500 text-sm mt-2">
          Please wait while we prepare everything for you.
        </p>
      </div>

      {/* Skeleton Loading Bars (Optional) */}
      <div className="mt-10 space-y-3 w-64">
        <div className="h-2 bg-gray-200 rounded-full w-full animate-pulse"></div>
        <div className="h-2 bg-gray-200 rounded-full w-3/4 animate-pulse mx-auto"></div>
      </div>
    </div>
  );
}