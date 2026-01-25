import Image from "next/image";
import { Star, ShoppingCart, Eye } from "lucide-react";
import Link from "next/link"; // যদি View Details page এ navigate করতে চাও
import AddToCartBtn from "../buttons/AddToCartBtn";

const ProductCard = ({ product }) => {
  const {title, image, price, ratings, reviews,sold, _id} = product;
  const discountedPrice =
    product.price - (product.price * product.discount) / 100;

  return (
    <div className="border rounded-xl shadow-sm hover:shadow-md transition p-4 bg-white flex flex-col justify-between">
      {/* Image */}
      <div className="relative w-full h-48 mb-3">
        <Image
          src={product.image}
          alt={product.title}
          fill
          unoptimized
          className="object-cover rounded-lg"
        />
        {product.discount > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            -{product.discount}%
          </span>
        )}
      </div>

      {/* Title */}
      <h2 className="font-semibold text-gray-800 line-clamp-2 mb-2">
        {product.title}
      </h2>

      {/* Rating & Sold */}
      <div className="flex items-center justify-between mt-2 text-sm text-gray-600 mb-3">
        <div className="flex items-center gap-1">
          <Star size={16} className="text-yellow-500 fill-yellow-500" />
          <span>{product.ratings}</span>
        </div>
        <span>{product.sold} sold</span>
      </div>

      {/* Price */}
      <div className="mt-1 mb-4">
        <span className="text-lg font-bold text-blue-900">
          ৳{discountedPrice}
        </span>
        {product.discount > 0 && (
          <span className="text-sm text-gray-400 line-through ml-2">
            ৳{product.price}
          </span>
        )}
      </div>

      {/* Buttons */}
      <div className="">
        {/* Add to Cart */}
        <AddToCartBtn product={{...product, _id:_id.toString()}}></AddToCartBtn>

        {/* View Details */}
        <Link
          href={`/products/${product._id}`} // product details page route
          className="flex-1 mt-4 flex items-center justify-center gap-2 border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-2 px-4 rounded-lg transition"
        >
          <Eye size={18} />
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
