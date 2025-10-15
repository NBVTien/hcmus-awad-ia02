import { useQuery } from "@tanstack/react-query";

/**
 * @typedef {Object} ImageData
 * @property {string} id - Unique identifier for the image
 * @property {string} author - Author/photographer name
 * @property {number} width - Image width in pixels
 * @property {number} height - Image height in pixels
 * @property {string} imageUrl - URL to the image download
 * @property {string} originalUrl - Original URL from the API
 */

/**
 * Fetches detailed information about a specific image from the Picsum Photos API
 * 
 * @param {string} id - The unique identifier of the image to fetch
 * @returns {Promise<ImageData>} Image data object
 * @throws {Error} When the API request fails
 */
const fetchImageDetail = async (id) => {
  const response = await fetch(`https://picsum.photos/id/${id}/info`);
  if (!response.ok) {
    throw new Error(`Failed to fetch image details: ${response.status} ${response.statusText}`);
  }
  const item = await response.json();
  // Map to ImageData structure for consistency
  return {
    id: item.id,
    author: item.author,
    width: item.width,
    height: item.height,
    imageUrl: item.download_url,
    originalUrl: item.url
  };
};

/**
 * Custom hook for fetching detailed information about a specific image
 * Uses TanStack Query for data fetching, caching, and state management
 * Returns data in the ImageData format for consistency with the image list
 * 
 * @param {string} id - The unique identifier of the image to fetch
 * @returns {import('@tanstack/react-query').UseQueryResult<ImageData, Error>}
 * Query result with image data and loading/error states
 * 
 * @example
 * const { data: image, isLoading, isError } = useImageDetail("123");
 * // image.imageUrl - URL to download the image
 * // image.originalUrl - Original Picsum page URL
 */
export const useImageDetail = (id) => {
  return useQuery({
    queryKey: ['image', id],
    queryFn: () => fetchImageDetail(id),
    enabled: !!id, // Only run query if id is provided
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};
