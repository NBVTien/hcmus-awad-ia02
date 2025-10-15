import { Download, ExternalLink } from "lucide-react";

/**
 * @typedef {Object} ImageActionsProps
 * @property {string} imageUrl - URL for downloading the image
 * @property {string} originalUrl - URL to the original image page
 * @property {string} downloadFilename - Suggested filename for download
 */

/**
 * Image action buttons component
 * Provides download and view original functionality
 * 
 * @param {ImageActionsProps} props - Component props
 * @returns {JSX.Element} Action buttons for image operations
 * 
 * @example
 * <ImageActions 
 *   imageUrl="https://example.com/image.jpg"
 *   originalUrl="https://example.com/original"
 *   downloadFilename="photo-123-by-john-doe.jpg"
 * />
 */
export default function ImageActions({ imageUrl, originalUrl, downloadFilename }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <a 
        href={imageUrl} 
        download={downloadFilename}
        className="flex items-center justify-center gap-2 px-6 py-3 text-base bg-black text-white rounded-full hover:bg-gray-800 transition-all font-semibold"
      >
        <Download className="w-4 h-4" />
        Download Image
      </a>
      
      <a 
        href={originalUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 px-6 py-3 text-base border-2 border-black rounded-full hover:bg-black hover:text-white transition-all font-semibold"
      >
        <ExternalLink className="w-4 h-4" />
        View Original
      </a>
    </div>
  );
}