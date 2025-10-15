import { useInfiniteQuery } from "@tanstack/react-query";

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
 * @typedef {Object} FetchImagesParams
 * @property {number} [pageParam=1] - Page number to fetch
 */

/** Number of images to fetch per page */
const PAGE_SIZE = 20;

/**
 * Fetches a page of images from the Picsum Photos API
 * @param {FetchImagesParams} params - Parameters for fetching images
 * @returns {Promise<ImageData[]>} Array of image data objects
 * @throws {Error} When the API request fails
 */
const fetchImages = async ({ pageParam = 1 }) => {
  const response = await fetch(`https://picsum.photos/v2/list?page=${pageParam}&limit=${PAGE_SIZE}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch images: ${response.status} ${response.statusText}`);
  }
  const data = await response.json();

  // Abstract to ImageData to handle gracefully when API data changes
  return data.map((item) => ({
    id: item.id,
    author: item.author,
    width: item.width,
    height: item.height,
    imageUrl: `${item.download_url}`,
    originalUrl: item.url
  }));
};

/**
 * Custom hook for fetching images with infinite scroll support
 * Uses TanStack Query's useInfiniteQuery for data fetching and caching
 * 
 * @returns {import('@tanstack/react-query').UseInfiniteQueryResult<ImageData[], Error>} 
 * Infinite query result with image data and pagination controls
 * 
 * @example
 * const { data, fetchNextPage, hasNextPage } = useImages();
 * const allImages = data?.pages.flatMap(page => page) || [];
 */
export const useImages = () => {
  return useInfiniteQuery({
    queryKey: ['images'],
    queryFn: fetchImages,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // If we got less than a page, we've reached the end
      if (lastPage.length < PAGE_SIZE) return undefined;
      return allPages.length + 1;
    },
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
  });
};
