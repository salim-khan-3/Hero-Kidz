"use server"; // ETA OBOSSHOI DITE HOBE

import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { clearCart, getCartItems } from "./cart";
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
    if (Boolean(result.insertedId)) {
      const result = await clearCart()
    }
    
    return { success: false, message: "Failed to save order" };

  } catch (error) {
    console.error("Order Error:", error);
    return { success: false, message: "Something went wrong" };
  }
};

