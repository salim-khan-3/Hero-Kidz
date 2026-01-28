import { getCartItems } from "@/actions/server/cart";
import CartItemCard from "@/components/Cards/CartItemCard";
import { ShoppingBag } from "lucide-react";
import React from "react";

const CartPage = async () => {
  const cartItems = await getCartItems();
  return (
    <div>
      <div className="flex items-center w-7xl px-8 mx-auto gap-2 mb-8 border-b pb-4">
      </div>
      <CartItemCard cartItems={cartItems}></CartItemCard>
    </div>
  );
};

export default CartPage;