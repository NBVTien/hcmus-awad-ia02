import { Link } from "react-router";

/**
 * @typedef {Object} ErrorStateProps
 * @property {Error|null} [error] - Error object containing error details
 * @property {() => void} onRetry - Callback function to retry the failed operation
 */

/**
 * Displays an error message with retry and navigation options
 * 
 * @param {ErrorStateProps} props - Component props
 * @returns {JSX.Element} The error state display component
 * 
 * @example
 * <ErrorState 
 *   error={error} 
 *   onRetry={() => refetch()} 
 * />
 */
export default function ErrorState({ error, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <div className="max-w-md">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong.</h2>
        <p className="text-gray-700 mb-2">We couldn't load the images.</p>
        <p className="text-sm text-gray-500 mb-6">{error?.message || 'Unknown error occurred'}</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={onRetry}
            className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-all"
          >
            Try Again
          </button>
          <Link
            to="/"
            className="px-6 py-3 border-2 border-black rounded-full hover:bg-black hover:text-white transition-all"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
