"use server"; // ETA OBOSSHOI DITE HOBE

import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { getCartItems } from "./cart";
import { dbConnect, collections } from "@/lib/dbConnect";

export const createOrder = async (payload) => {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return { success: false, message: "User not authenticated" };
    }

    // Database connection function-er bhitore call korun
    const orderCollection = await dbConnect(collections.ORDER);
    const cart = await getCartItems();

    if (!cart || cart.length === 0) {
      return { success: false, message: "Cart is empty" };
    }

    const newOrder = {
      userEmail: session.user.email,
      createdAt: new Date().toISOString(),
      items: cart,
      status: "pending",
      ...payload,
    };

    const result = await orderCollection.insertOne(newOrder);

    // Mongodb result check
    if (result.insertedId) {
      return { success: true, message: "Order placed successfully!" };
    }
    
    return { success: false, message: "Failed to save order" };

  } catch (error) {
    console.error("Order Error:", error);
    return { success: false, message: "Something went wrong" };
  }
};

// "use server";

// import { authOptions } from "@/lib/authOptions";
// import { getServerSession } from "next-auth";
// import { dbConnect, collections } from "@/lib/dbConnect";

// export async function createOrder(formData) {
//   const session = await getServerSession(authOptions);
//   const user = session?.user;

//   if (!user) return { success: false };

//   const orderCollection = await dbConnect(collections.ORDER);

//   await orderCollection.insertOne({
//     userId: user.id,
//     name: formData.get("name"),
//     email: formData.get("email"),
//     address: formData.get("address"),
//     instruction: formData.get("instruction"),
//     phone: formData.get("phone"),
//     createdAt: new Date(),
//   });

//   return { success: true };
// }
