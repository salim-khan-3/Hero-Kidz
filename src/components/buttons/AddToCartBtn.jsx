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
 

if (isLogin) {
  const result = await handleAddToCart({ product, inc: true });

  if (result.success) {
    Swal.fire({
      title: "Added!",
      text: `${product?.title} added to cart`,
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
  } else {
    Swal.fire("Oops!", "Something went wrong", "error");
  }
}
else{
  router.push(`/login?callbackUrl=${path}`);
}
  };


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
