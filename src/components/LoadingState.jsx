/**
 * @typedef {Object} LoadingStateProps
 * @property {string} [message="Loading images..."] - Optional loading message to display
 */

/**
 * LoadingState component - Displays a loading spinner with a message
 * 
 * Shows a centered loading screen with:
 * - Animated spinning loader
 * - Customizable loading message
 * 
 * @param {LoadingStateProps} props - Component props
 * @returns {JSX.Element} The loading state display component
 * 
 * @example
 * <LoadingState />
 * <LoadingState message="Fetching photos..." />
 */
export default function LoadingState({ message = "Loading images..." }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin mb-4"></div>
      <p className="text-gray-600">{message}</p>
    </div>
  );
}
