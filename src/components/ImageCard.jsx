import { Link } from 'react-router';
import { memo } from 'react';
import UserInfo from './UserInfo';

/**
 * @typedef {Object} ImageCardData
 * @property {string} id - Unique identifier for the image
 * @property {string} author - Name of the photographer/author
 * @property {string} imageUrl - URL of the image to display
 * @property {number} width - Original width of the image in pixels
 * @property {number} height - Original height of the image in pixels
 */

/**
 * @typedef {Object} ImageCardProps
 * @property {ImageCardData} data - Image data object
 */

/**
 * Memoized image card component for masonry layout
 * 
 * @param {ImageCardProps} props - Component props
 * @returns {JSX.Element} A memoized image card component
 */
const ImageCard = memo(({ data: { id, author, imageUrl, width, height } }) => {
  // Calculate aspect ratio to reserve space
  const aspectRatio = (height / width) * 100;
  
  return (
    <Link to={`/photos/${id}`} className="block group">
      <div className="overflow-hidden transition-shadow cursor-pointer">
        <div className="relative bg-gray-200" style={{ paddingBottom: `${aspectRatio}%` }}>
          {/* Loading placeholder */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />

          <img
            src={imageUrl}
            alt={`Photo by ${author}`}
            className="absolute inset-0 w-full h-full object-cover transition duration-300 group-hover:blur-sm opacity-0"
            loading="lazy"
            // Fade in image when loaded
            onLoad={(e) => {
              e.currentTarget.style.opacity = '1';
              const placeholder = e.currentTarget.previousElementSibling;
              if (placeholder) placeholder.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/40 z-10">
            <span className="text-white text-xl font-semibold">Enter</span>
          </div>
        </div>
        <div className="py-2">
          <UserInfo name={author} />
        </div>
      </div>
    </Link>
  );
});

export default ImageCard;