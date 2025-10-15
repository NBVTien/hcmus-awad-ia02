import { Masonry } from "masonic";
import { useEffect, useRef, useMemo } from "react";
import ImageCard from "../components/ImageCard";
import ErrorState from "../components/ErrorState";
import LoadingState from "../components/LoadingState";
import { useImages } from "../hooks/useImages";
import { Link } from "react-router";

/**
 * Main gallery page with infinite scroll
 * 
 * @returns {JSX.Element} The images gallery page 
 */
export default function ImagesPage() {
  // This ref is used to trigger loading more images when it comes into view
  const loadMoreRef = useRef(null);

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch
  } = useImages();

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50%' 
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // Flatten all pages into a single array
  const items = useMemo(() => {
    return data?.pages.flatMap(page => page) || [];
  }, [data?.pages]);

  if (isLoading) {
    return <LoadingState />;
  }

  if (isError) {
    return <ErrorState error={error} onRetry={refetch} />;
  }

  return (
    <div className="flex flex-col justify-center gap-4 p-4">
      <Link to='/'>
        <h1 className='bbh-sans text-5xl text-center'>gallary.</h1>
      </Link>

      <Masonry 
        items={items} 
        render={ImageCard}
        columnGutter={12}
        columnWidth={300}
      />
      <div ref={loadMoreRef} className="py-8 text-center">
        {isFetchingNextPage ? (
          <p className="text-gray-600 animate-pulse">Loading more images...</p>
        ) : hasNextPage ? (
          <button 
            onClick={() => fetchNextPage()}
            className="font-semibold px-6 py-2 border-2 border-black rounded-full hover:bg-black hover:text-white transition-all"
          >
            Load More
          </button>
        ) : (
          <p className="text-gray-500">No more images to load</p>
        )}
      </div>
    </div>
  );
}
