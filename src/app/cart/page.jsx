"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import Swal from "sweetalert2";

const CartPage = () => {
  const { data: session } = useSession();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    if (session?.user?.email) {
      try {
        const res = await fetch(`/api/cart?email=${session.user.email}`);
        const data = await res.json();
        setCartItems(data);
      } catch (error) {
        console.error("Cart fetch error:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchCart();
  }, [session]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const res = await fetch(`/api/cart/${id}`, { method: "DELETE" });
      if (res.ok) {
        setCartItems(prev => prev.filter((item) => item._id !== id));
        window.dispatchEvent(new Event("cartUpdate"));
        Swal.fire("Deleted!", "Item removed.", "success");
      }
    }
  };

  const handleUpdateQuantity = async (id, currentQty, action) => {
    if (action === "dec" && currentQty <= 1) return;

    // Optimistic Update: সার্ভারে যাওয়ার আগেই UI আপডেট করে দেওয়া
    setCartItems(prev =>
      prev.map(item =>
        item._id === id
          ? { ...item, quantity: action === "inc" ? item.quantity + 1 : item.quantity - 1 }
          : item
      )
    );

    const res = await fetch(`/api/cart/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });

    if (!res.ok) {
      fetchCart(); // এরর হলে ডাটাবেজ থেকে আগের ডাটা ফিরিয়ে আনা
      Swal.fire("Error", "Could not update quantity", "error");
    }
  };

  if (loading) return <div className="text-center mt-20">Loading cart...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <div className="flex items-center gap-2 mb-8 border-b pb-4">
        <ShoppingBag className="text-blue-600" />
        <h1 className="text-2xl font-bold">Your Cart ({cartItems.length})</h1>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-xl">Your cart is empty!</div>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item._id} className="flex flex-col md:flex-row items-center gap-4 bg-white p-4 rounded-xl shadow-sm border">
              <div className="relative w-24 h-24 overflow-hidden rounded-lg">
                <Image src={item.image} alt={item.productTitle} fill className="object-cover" />
              </div>

              <div className="flex-1 text-center md:text-left">
                <h3 className="font-semibold">{item.productTitle}</h3>
                <p className="text-blue-600 font-bold">৳{item.price}</p>
              </div>

              <div className="flex items-center gap-3 bg-gray-100 px-3 py-1 rounded-full">
                <button onClick={() => handleUpdateQuantity(item._id, item.quantity, "dec")} className={item.quantity <= 1 ? "text-gray-300" : "hover:text-blue-600"}>
                  <Minus size={18} />
                </button>
                <span className="font-bold">{item.quantity}</span>
                <button onClick={() => handleUpdateQuantity(item._id, item.quantity, "inc")} className="hover:text-blue-600">
                  <Plus size={18} />
                </button>
              </div>

              <div className="flex items-center gap-6">
                <p className="font-bold">৳{item.price * item.quantity}</p>
                <button onClick={() => handleDelete(item._id)} className="text-red-500 hover:bg-red-50 p-2 rounded-full">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}

          <div className="mt-10 p-6 bg-blue-50 rounded-2xl flex justify-between items-center">
            <div>
              <p className="text-gray-600">Total Amount:</p>
              <h2 className="text-3xl font-extrabold text-blue-900">
                ৳ {cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}
              </h2>
            </div>
            <button className="bg-blue-600 text-white px-10 py-3 rounded-xl font-bold hover:bg-blue-700">
              Checkout Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;











// "use client";

// import { useSession } from "next-auth/react";
// import { useEffect, useState } from "react";
// import Image from "next/image";
// import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
// import Swal from "sweetalert2";

// const CartPage = () => {
//   const { data: session } = useSession();
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ১. ডেটা ফেচ করা
//   const fetchCart = async () => {
//     if (session?.user?.email) {
//       try {
//         const res = await fetch(`/api/cart?email=${session.user.email}`);
//         const data = await res.json();
//         setCartItems(data);
//       } catch (error) {
//         console.error("Cart fetch error:", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   useEffect(() => {
//     fetchCart();
//   }, [session]);

//   // ২. ডিলিট ফাংশন (API তৈরি না থাকলে করে নিতে হবে)
//   const handleDelete = async (id) => {
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "This item will be removed from your cart!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#ef4444",
//       confirmButtonText: "Yes, delete it!",
//     });

//     if (result.isConfirmed) {
//       const res = await fetch(`/api/cart/${id}`, { method: "DELETE" });
//       if (res.ok) {
//         setCartItems(cartItems.filter((item) => item._id !== id));
//         window.dispatchEvent(new Event("cartUpdate")); // Navbar আপডেট করার জন্য
//         Swal.fire("Deleted!", "Item has been removed.", "success");
//       }
//     }
//   };

// const handleUpdateQuantity = async (id, currentQty, action) => {
//   if (action === "dec" && currentQty <= 1) return;

//   // Optimistic UI
//   setCartItems(prev =>
//     prev.map(item =>
//       item._id === id
//         ? {
//             ...item,
//             quantity:
//               action === "inc"
//                 ? item.quantity + 1
//                 : item.quantity - 1,
//           }
//         : item
//     )
//   );

//   const res = await fetch(`/api/cart/${id}`, {
//     method: "PATCH",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ action }),
//   });

//   if (!res.ok) {
//     fetchCart();
//     Swal.fire("Error", "Could not update quantity", "error");
//   }
// };


//   if (loading)
//     return <div className="text-center mt-20 p-10">Loading cart...</div>;

//   return (
//     <div className="max-w-4xl mx-auto p-6 min-h-screen">
//       <div className="flex items-center gap-2 mb-8 border-b pb-4">
//         <ShoppingBag className="text-blue-600" />
//         <h1 className="text-2xl font-bold">
//           Your Shopping Cart ({cartItems.length})
//         </h1>
//       </div>

//       {cartItems.length === 0 ? (
//         <div className="text-center py-20 bg-gray-50 rounded-xl">
//           <p className="text-gray-500 text-lg">Your cart is empty!</p>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {cartItems.map((item) => (
//             <div
//               key={item._id}
//               className="flex flex-col md:flex-row items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100"
//             >
//               {/* Product Image */}
//               <div className="relative w-24 h-24 overflow-hidden rounded-lg">
//                 <Image
//                   src={item.image}
//                   alt={item.productTitle}
//                   fill
//                   className="object-cover"
//                 />
//               </div>

//               {/* Info */}
//               <div className="flex-1 text-center md:text-left">
//                 <h3 className="font-semibold text-gray-800 line-clamp-1">
//                   {item.productTitle}
//                 </h3>
//                 <p className="text-blue-600 font-bold mt-1">৳{item.price}</p>
//               </div>

//               {/* Quantity Controls */}
//               <div className="flex items-center gap-3 bg-gray-100 px-3 py-1 rounded-full">
//                 <button
//                   onClick={() =>
//                     handleUpdateQuantity(item._id, item.quantity, "dec")
//                   }
//                   className={`p-1 transition ${item.quantity <= 1 ? "text-gray-300 cursor-not-allowed" : "hover:text-blue-600"}`}
//                 >
//                   <Minus size={18} />
//                 </button>

//                 <span className="font-bold min-w-[20px] text-center">
//                   {item.quantity}
//                 </span>

//                 <button
//                   onClick={() =>
//                     handleUpdateQuantity(item._id, item.quantity, "inc")
//                   }
//                   className="p-1 hover:text-blue-600 transition"
//                 >
//                   <Plus size={18} />
//                 </button>
//               </div>

//               {/* Subtotal & Delete */}
//               <div className="flex items-center gap-6">
//                 <p className="font-bold text-gray-900">
//                   ৳{item.price * item.quantity}
//                 </p>
//                 <button
//                   onClick={() => handleDelete(item._id)}
//                   className="p-2 text-red-500 hover:bg-red-50 rounded-full transition"
//                 >
//                   <Trash2 size={20} />
//                 </button>
//               </div>
//             </div>
//           ))}

//           {/* Checkout Section */}
//           <div className="mt-10 p-6 bg-blue-50 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4">
//             <div>
//               <p className="text-gray-600">Total Amount:</p>
//               <h2 className="text-3xl font-extrabold text-blue-900">
//                 ৳
//                 {cartItems.reduce(
//                   (total, item) => total + item.price * item.quantity,
//                   0,
//                 )}
//               </h2>
//             </div>
//             <button className="bg-blue-600 text-white px-10 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
//               Checkout Now
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CartPage;
