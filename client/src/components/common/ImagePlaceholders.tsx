export function ImagePlaceholder() {
    return (
      <div className="animate-pulse">
        <div className="bg-gray-200 rounded-lg w-full h-full"></div>
      </div>
    );
  }
  
export function ImagePlaceholderList({ count }: { count: number }) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: count }).map((_, index) => (
          <ImagePlaceholder key={index} />
        ))}
      </div>
    );
}