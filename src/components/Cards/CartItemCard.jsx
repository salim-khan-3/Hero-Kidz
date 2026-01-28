"use client";

import Image from "next/image";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import Swal from "sweetalert2";
import { decreaseItemsDB, deleteCartItem, IncreaseItemsDB } from "@/actions/server/cart";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import Link from "next/link";

const CartItemCard = ({ cartItems }) => {
  const [items, setItems] = useState(cartItems);
  const [loading,setLoading] = useState(false);
  const router = useRouter();

  const quantityCount = useMemo(() => {
    return items.reduce((acc, item) => acc + item.quantity, 0);
  }, [items]);

  //   console.log(pp);
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This item will be removed from your cart.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626", // red
      cancelButtonColor: "#6b7280", // gray
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      const res = await deleteCartItem(id);

      if (res.success) {
        Swal.fire({
          title: "Deleted!",
          text: "Item has been removed from your cart.",
          icon: "success",
          timer: 1200,
          showConfirmButton: false,
        });

        setItems((prev) => prev.filter((item) => item._id !== id));

      } else {
        Swal.fire("Error", "Could not delete item", "error");
      }
    }
  };

  const updateQty = (id, qty) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, quantity: qty } : item,
      ),
    );
  };

  const onIncrease = async (item) => {
    setLoading(true)
    const result = await IncreaseItemsDB(item._id, item.quantity);

    if (result.success) {
      Swal.fire("Success", "Quantity increased", "success");
      updateQty(item._id, item.quantity + 1);
    }
       setLoading(false)
  };

const onDecrease = async (item) => {
       setLoading(true)
  if (item.quantity <= 1) return;

  // optimistic update
  updateQty(item._id, item.quantity - 1);

  try {
    const result = await decreaseItemsDB(item._id, item.quantity);

    if (result.success) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Quantity decreased",
        showConfirmButton: false,
        timer: 1000,
      });
    } else {
      updateQty(item._id, item.quantity);
      Swal.fire("Error", "Failed to decrease quantity", "error");
    }
  } catch (error) {
    updateQty(item._id, item.quantity);
    Swal.fire("Error", "Something went wrong", "error");
  }
     setLoading(false)
};


  return (

<div className="max-w-6xl mx-auto p-6 min-h-screen flex flex-col lg:flex-row gap-6">
  {/* Left Side - Cart Items */}
  <div className="flex-1 space-y-4">
    {items.map((item) => (
      <div
        key={item._id}
        className="flex flex-col md:flex-row items-center gap-4 bg-white p-4 rounded-xl shadow-sm border"
      >
        <div className="relative w-24 h-24 overflow-hidden rounded-lg">
          <Image
            src={item.image}
            alt={item.productTitle || "Product image"}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1 text-center md:text-left">
          <h3 className="font-semibold">{item.productTitle}</h3>
          <p className="text-blue-600 font-bold">৳{item.price}</p>
        </div>

        <div className="flex items-center gap-3 bg-gray-100 px-3 py-1 rounded-full">
          <button
            onClick={() => onDecrease(item)}
            disabled={item.quantity === 1 || loading}
            className={
              item.quantity <= 1
                ? "text-gray-300 cursor-not-allowed"
                : "hover:text-blue-600"
            }
          >
            <Minus size={18} />
          </button>

          <span className="font-bold">{item.quantity}</span>
          <button
            onClick={() => onIncrease(item)}
            className="hover:text-blue-600"
            disabled={item.quantity === 10 || loading}
          >
            <Plus size={18} />
          </button>
        </div>

        <div className="flex items-center gap-6">
          <p className="font-bold">৳{item.price * item.quantity}</p>
          <button
            onClick={() => handleDelete(item._id)}
            className="text-red-500 hover:bg-red-50 p-2 rounded-full"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    ))}
  </div>

  {/* Right Side - Summary */}
  <div className="w-full lg:w-1/3 bg-blue-50 p-6 rounded-2xl flex flex-col gap-6 h-fit">
    <h2 className="text-2xl font-bold text-blue-900">Summary</h2>
    <div className="flex justify-between">
      <span className="text-gray-600">Total Items:</span>
      <span className="font-bold">{items.length}</span>
    </div>
    <div className="flex justify-between">
      <span className="text-gray-600">Total Quantity:</span>
      <span className="font-bold">{quantityCount}</span>
    </div>
    <div className="flex justify-between">
      <span className="text-gray-600">Total Amount:</span>
      <span className="font-bold text-blue-900">
        ৳{items.reduce((total, item) => total + item.price * item.quantity, 0)}
      </span>
    </div>
    <Link href={"/checkout"} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 mt-4">
      Checkout Now
    </Link>
  </div>
</div>

  );
};

export default CartItemCard;







