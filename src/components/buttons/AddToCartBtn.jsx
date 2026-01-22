import { ShoppingCart } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";


const AddToCartBtn = ({ product }) => {
    const isLoggedIn = false;
    const router = useRouter();
    const path = usePathname();

  const addToCart = () => {
    if(isLoggedIn) alert(product._id);
    else{
        router.push(`/login?callbackUrl=${path}`);
    }

  };

  return (
    <button
      onClick={addToCart}
      type="button"
      className="flex-1 cursor-pointer flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition shadow"
    >
      <ShoppingCart size={18} />
      Add to Cart
    </button>
  );
};

export default AddToCartBtn;
