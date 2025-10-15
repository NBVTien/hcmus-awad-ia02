import { Link } from "react-router";

/**
 * 404 Not Found page component
 * Displays when user navigates to a route that doesn't exist
 * 
 * @returns {JSX.Element} The 404 not found page
 * 
 * @example
 * <Route path="*" element={<NotFoundPage />} />
 */
export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <div className="max-w-md">
        <h1 className="bbh-sans text-9xl font-bold text-gray-800 mb-4">404</h1>
        
        <h2 className="text-3xl font-semibold text-gray-700 mb-4">
          Page Not Found
        </h2>
        
        <p className="text-gray-600 mb-8">
          Oops! The page you're looking for doesn't exist. 
          It might have been moved or deleted.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/"
            className="font-semibold px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-all"
          >
            Go Home
          </Link>
          
          <Link 
            to="/photos"
            className="font-semibold px-6 py-3 border-2 border-black text-black rounded-full hover:bg-black hover:text-white transition-all"
          >
            Browse Gallery
          </Link>
        </div>
      </div>
    </div>
  );
}