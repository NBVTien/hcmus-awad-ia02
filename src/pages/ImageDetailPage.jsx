import { useParams, Link } from "react-router";
import { useImageDetail } from "../hooks/useImageDetail";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";

/**
 * Displays a single image in detail view
 * Fetches image data from the Picsum API based on the image ID from URL params
 * 
 * @returns {JSX.Element} The image detail page
 * 
 * @example
 * <Route path="/photos/:id" element={<ImageDetailPage />} />
 */
export default function ImageDetailPage() {
  const { id } = useParams();
  const { data: image, isLoading, isError, error, refetch } = useImageDetail(id);

  if (isLoading) {
    return <LoadingState message="Loading image details..." />;
  }

  if (isError) {
    return <ErrorState error={error} onRetry={refetch} />;
  }

  if (!image) {
    return <ErrorState error={new Error("Image not found")} onRetry={refetch} />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 gap-4 sm:gap-8">
      <Link 
        to="/photos" 
        className="absolute top-4 left-4 sm:top-8 sm:left-8 px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base border-2 border-black rounded-full hover:bg-black hover:text-white transition-all"
      >
        ← Back to Gallery
      </Link>
      
      <div className="text-center mt-12 sm:mt-0">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 px-4">Photo by {image.author}</h1>
      </div>
      
      <div className="max-w-4xl w-full border rounded-lg overflow-hidden shadow-2xl">
        <img 
          src={image.imageUrl} 
          alt={`Photo ${image.id} by ${image.author}`}
          className="w-full h-auto"
        />
      </div>

      <div className="bg-gray-100 p-4 sm:p-6 rounded-lg max-w-4xl w-full space-y-4">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold mb-2">Image Details:</h2>
          <div className="space-y-2 text-gray-700 text-sm sm:text-base">
            <p><span className="font-semibold">Dimensions:</span> {image.width} x {image.height} pixels</p>
            <p><span className="font-semibold">Author:</span> {image.author}</p>
          </div>
        </div>
        
        <div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a 
              href={image.imageUrl} 
              download={`photo-${image.id}-by-${image.author}.jpg`}
              className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-black text-white rounded-full hover:bg-gray-800 transition-all font-semibold text-center"
            >
              Download Image
            </a>
            <a 
              href={image.originalUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base border-2 border-black rounded-full hover:bg-black hover:text-white transition-all font-semibold text-center"
            >
              View Original
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}