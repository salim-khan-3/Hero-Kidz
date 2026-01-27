"use client"

import { handleAddToCart } from "@/actions/server/cart";
import { ShoppingCart } from "lucide-react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Swal from "sweetalert2";


const AddToCartBtn = ({ product }) => {
    const {data: session, status} = useSession();
    const router = useRouter();
    const path = usePathname();

 const isLogin = status === "authenticated";


  const addToCart = async() => {
    // if(status === "authenticated"){
    // Swal.fire({
    //     title: "Success!",
    //     text: `${product?.title} added to cart!`,
    //     icon: "success",
    //     timer: 2000,
    //     showConfirmButton: false
    //   });
    //   console.log("Product ID:", product._id);
    //   console.log("User Email:", session.user.email);
    // }else {
    //   Swal.fire({
    //     title: "Login Required",
    //     text: "Please login to add items to your cart.",
    //     icon: "info",
    //     confirmButtonText: "Login Now",
    //     showCancelButton: true,
    //   }).then((result) => {
    //     if(result.isConfirmed){
    //       router.push(`/login?callbackUrl=${path}`);
    //     }
    //   })
    // }

if(isLogin) {
  const result = await handleAddToCart({product, inc:true});
  if(result.success) {
  }else{
    
    Swal.fire("opps", "something went wrong", "error")
  }
}else{
  router.push(`/login?callbackUrl=${path}`);
}
  };

//   const addToCart = async () => {
//   if (status === "authenticated") {
//     // API কল করা হচ্ছে
//     const res = await fetch("/api/cart", {
//       method: "POST",
//       body: JSON.stringify({
//         email: session.user.email,
//         productId: product._id,
//         productTitle: product.title,
//         price: product.price,
//         image: product.image
//       }),
//       headers: { "Content-Type": "application/json" }
//     });

//     if (res.ok) {
//       Swal.fire({ title: "Added!", icon: "success", timer: 1000 });
//       // এখানে আপনি চাইলে উইন্ডো রিলোড বা স্টেট আপডেট করতে পারেন কার্ট কাউন্ট দেখানোর জন্য
//       window.dispatchEvent(new Event("cartUpdate"));
//     }
//   } else {
//     router.push(`/login?callbackUrl=${path}`);
//   }
// };



  return (
    <button
      onClick={addToCart}
      type="button"
      disabled= {status === "loading"}
      className="flex-1 w-full cursor-pointer flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition shadow"
    >
      <ShoppingCart size={18} />
      {status === "loading" ? "checking..." : "Add to Cart"}
      
    </button>
  );
};

export default AddToCartBtn;
