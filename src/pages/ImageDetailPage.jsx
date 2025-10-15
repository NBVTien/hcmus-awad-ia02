import { useParams, Link } from "react-router";
import { useImageDetail } from "../hooks/useImageDetail";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import ImageInfoGrid from "../components/ImageInfoGrid";
import ImageActions from "../components/ImageActions";
import { ArrowLeft } from "lucide-react";

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
    <div className="min-h-screen p-4 sm:p-8">
      <Link 
        to="/photos" 
        className="fixed top-4 left-4 sm:top-8 sm:left-8 z-10 px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base border-2 border-black rounded-full hover:bg-black hover:text-white transition-all bg-white/90 backdrop-blur-sm flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Gallery
      </Link>
      
      <div className="max-w-5xl mx-auto pt-16 sm:pt-20">
        <div className="w-full border rounded-lg overflow-hidden shadow-2xl mb-8">
          <img 
            src={image.imageUrl} 
            alt={`Photo ${image.id} by ${image.author}`}
            className="w-full h-auto"
          />
        </div>

        <div className="mb-12">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Photo by {image.author}
            </h1>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              {image.description || `A stunning ${image.width}×${image.height} photograph captured by ${image.author}. This beautiful image showcases the photographer's unique perspective and artistic vision.`}
            </p>
          </div>
        </div>

        <div className="mb-12">
          <div className="border-t border-gray-200"></div>
        </div>
        

        <div className="mb-12">
          <ImageInfoGrid image={image} />
        </div>

        <div className="mb-12">
          <div className="border-t border-gray-200"></div>
        </div>

        <div>
          <ImageActions 
            imageUrl={image.imageUrl}
            originalUrl={image.originalUrl}
            downloadFilename={`photo-${image.id}-by-${image.author}.jpg`}
          />
        </div>
      </div>
    </div>
  );
}