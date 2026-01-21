"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Star, ShoppingCart } from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${productId}`);
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (productId) fetchProduct();
  }, [productId]);

  // Skeleton Loader
  if (loading) {
    return (
      <div className="animate-pulse p-4 max-w-4xl mx-auto space-y-4">
        <div className="w-full h-64 bg-gray-200 rounded-lg"></div>
        <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
        <div className="h-6 w-1/4 bg-gray-200 rounded"></div>
        <div className="h-4 w-full bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center mt-20">
        <p className="text-red-500 text-xl font-semibold">Product not found!</p>
        <Link href="/" className="text-blue-600 underline mt-4 block">Back to Home</Link>
      </div>
    );
  }

  // NaN Fix: Convert string to number safely
  const price = Number(product.price) || 0;
  const discount = Number(product.discount) || 0;
  const discountedPrice = price - (price * discount) / 100;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Image Section */}
{/* Image Section */}
<div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg">
 <Image
    src={product.image?.replace(".co.com", ".co") || "/placeholder.png"} // fix URL safely
    alt={product.title || "Product Image"}
    fill
    className="object-cover"
    unoptimized
  />
</div>

      {/* Title & Price Section */}
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          {product.title}
        </h1>

        <div className="flex items-center gap-4">
          <span className="text-2xl font-bold text-blue-900">
            ৳{discountedPrice.toLocaleString()} {/* কমা সেপারেটর যোগ করা হয়েছে */}
          </span>
          {discount > 0 && (
            <span className="text-gray-400 line-through text-lg">
              ৳{price.toLocaleString()}
            </span>
          )}
          {discount > 0 && (
            <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-bold">
              {discount}% OFF
            </span>
          )}
        </div>

        {/* Rating & Stats */}
        <div className="flex flex-wrap items-center gap-4 md:gap-6 text-gray-600 py-2">
          <div className="flex items-center gap-1">
            <Star size={20} className="text-yellow-500 fill-yellow-500" />
            <span className="font-medium">{product.ratings || 0}</span>
          </div>
          <span>{product.sold || 0} sold</span>
          <span>{product.reviews || 0} reviews</span>
        </div>
      </div>

      {/* Description */}
      <div className="text-gray-700 space-y-2 border-t pt-4">
        <h2 className="font-semibold text-lg underline decoration-blue-500 underline-offset-4">Description</h2>
        <p className="whitespace-pre-line leading-relaxed">{product.description}</p>
      </div>

      {/* Key Features */}
      {product.info && product.info.length > 0 && (
        <div className="text-gray-700 space-y-2">
          <h2 className="font-semibold text-lg">Key Features</h2>
          <ul className="list-disc list-inside space-y-1 bg-gray-50 p-4 rounded-lg">
            {product.info.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Q&A Section */}
      {product.qna && product.qna.length > 0 && (
        <div className="text-gray-700 space-y-4 pt-4">
          <h2 className="font-semibold text-lg font-bold">Questions & Answers</h2>
          {product.qna.map((q, idx) => (
            <div key={idx} className="border-l-4 border-blue-600 pl-4 py-2 bg-blue-50/50 rounded-r-lg">
              <p className="font-bold text-gray-900 font-medium italic">Q: {q.question}</p>
              <p className="mt-1 text-gray-700 font-medium">A: {q.answer}</p>
            </div>
          ))}
        </div>
      )}

      {/* Add to Cart Button */}
      <div className="flex flex-col md:flex-row gap-4 mt-8 sticky bottom-4 md:static">
        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2">
          <ShoppingCart size={20} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetailsPage;




// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import { Star, ShoppingCart, Eye } from "lucide-react";
// import { useParams } from "next/navigation";

// const ProductDetailsPage = () => {
//   const { productId } = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);


//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await fetch(`/api/products/${productId}`);
//         const data = await res.json();
//         console.log(data);
//         setProduct(data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [productId]);

//   // Skeleton Loader
//   if (loading) {
//     return (
//       <div className="animate-pulse p-4 max-w-4xl mx-auto space-y-4">
//         <div className="w-full h-64 bg-gray-200 rounded-lg"></div>
//         <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
//         <div className="h-6 w-1/4 bg-gray-200 rounded"></div>
//         <div className="h-4 w-full bg-gray-200 rounded"></div>
//         <div className="h-4 w-full bg-gray-200 rounded"></div>
//       </div>
//     );
//   }

//   if (!product) {
//     return (
//       <p className="text-center mt-10 text-red-500">
//         Product not found
//       </p>
//     );
//   }

//   const discountedPrice =
//     product.price - (product.price * product.discount) / 100;


//     console.log(typeof product.price, product.price);
// console.log(typeof product.discount, product.discount);


//   return (
//     <div className="max-w-4xl mx-auto p-6 space-y-6">
//       {/* Image */}
// <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg">
//   <Image
//     src={product.image?.replace(".co.com", ".co") || "/placeholder.png"} // fix URL safely
//     alt={product.title || "Product Image"}
//     fill
//     className="object-cover"
//     unoptimized
//   />
// </div>


//       {/* Title & Price */}
//       <div className="space-y-2">
//         <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
//           {product.title}
//         </h1>

//         <div className="flex items-center gap-4">
//           <span className="text-2xl font-bold text-blue-900">
//             ৳{discountedPrice}
//           </span>
//           {product.discount > 0 && (
//             <span className="text-gray-400 line-through">
//               ৳{product.price}
//             </span>
//           )}
//         </div>

//         {/* Rating & Sold */}
//         <div className="flex items-center gap-6 text-gray-600">
//           <div className="flex items-center gap-1">
//             <Star size={20} className="text-yellow-500 fill-yellow-500" />
//             <span>{product.ratings}</span>
//           </div>
//           <span>{product.sold} sold</span>
//           <span>{product.reviews} reviews</span>
//         </div>
//       </div>

//       {/* Description */}
//       <div className="text-gray-700 space-y-2">
//         <h2 className="font-semibold text-lg">Description</h2>
//         <p className="whitespace-pre-line">{product.description}</p>
//       </div>

//       {/* Info */}
//       {product.info && product.info.length > 0 && (
//         <div className="text-gray-700 space-y-2">
//           <h2 className="font-semibold text-lg">Key Features</h2>
//           <ul className="list-disc list-inside space-y-1">
//             {product.info.map((item, idx) => (
//               <li key={idx}>{item}</li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* QnA */}
//       {product.qna && product.qna.length > 0 && (
//         <div className="text-gray-700 space-y-2">
//           <h2 className="font-semibold text-lg">Q&A</h2>
//           {product.qna.map((q, idx) => (
//             <div key={idx} className="border-l-4 border-blue-600 pl-3 py-1">
//               <p className="font-semibold">{q.question}</p>
//               <p>{q.answer}</p>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Buttons */}
//       <div className="flex flex-col md:flex-row gap-4 mt-6">
//         <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition shadow flex items-center justify-center gap-2">
//           <ShoppingCart size={18} />
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProductDetailsPage;
