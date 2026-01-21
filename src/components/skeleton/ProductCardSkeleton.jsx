const ProductCardSkeleton = () => {
  return (
    <div className="border rounded-xl p-4 animate-pulse bg-white">
      <div className="h-48 bg-gray-200 rounded-lg mb-3"></div>

      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>

      <div className="flex justify-between mb-3">
        <div className="h-3 bg-gray-200 rounded w-20"></div>
        <div className="h-3 bg-gray-200 rounded w-16"></div>
      </div>

      <div className="h-5 bg-gray-200 rounded w-24"></div>
    </div>
  );
};

export default ProductCardSkeleton;
