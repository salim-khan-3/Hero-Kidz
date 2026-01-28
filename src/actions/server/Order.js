"use server";

import { transporter } from "@/lib/email";
import { generateInvoiceEmail } from "@/lib/OrderInvoice";
import { getServerSession } from "next-auth";
import { dbConnect, collections } from "@/lib/dbConnect";
import { getCartItems, clearCart } from "./cart";
import { authOptions } from "@/lib/authOptions";

export const createOrder = async (payload) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return { success: false, message: "User not authenticated" };
    }

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

    if (result.insertedId) {
      await clearCart();

      // ✅ Send email to user
      const emailHtml = generateInvoiceEmail({
        name: session.user.name,
        orderId: result.insertedId.toString(),
        items: cart,
        total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
      });

      // Order.js moddhe email segment-ti evabe likhun:
      try {
        await transporter.sendMail({
          from: `"Hero Kidz" <${process.env.SMTP_USER}>`,
          to: session.user.email,
          subject: `Order Confirmation - ${result.insertedId}`,
          html: emailHtml,
        });
      } catch (mailError) {
        console.error("Email Sending Failed:", mailError);
        // Order success kintu mail jayni, emon scenario handle korte paren
      }

      return { success: true, message: "Order placed successfully" };
    }

    return { success: false, message: "Failed to save order" };
  } catch (error) {
    console.error("Order Error:", error);
    return { success: false, message: "Something went wrong" };
  }
};

// "use server";

// import { transporter } from "@/lib/email";
// import { generateInvoiceEmail } from "@/lib//OrderInvoice";

// export const createOrder = async (payload) => {
//   try {
//     const session = await getServerSession(authOptions);

//     if (!session?.user) {
//       return { success: false, message: "User not authenticated" };
//     }

//     const orderCollection = await dbConnect(collections.ORDER);
//     const cart = await getCartItems();

//     if (!cart || cart.length === 0) {
//       return { success: false, message: "Cart is empty" };
//     }

//     const newOrder = {
//       userEmail: session.user.email,
//       createdAt: new Date().toISOString(),
//       items: cart,
//       status: "pending",
//       ...payload,
//     };

//     const result = await orderCollection.insertOne(newOrder);

//     if (result.insertedId) {
//       await clearCart();

//       // Send email to user
//       const emailHtml = generateInvoiceEmail({
//         name: session.user.name,
//         orderId: result.insertedId.toString(),
//         items: cart,
//         total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
//       });

//       await transporter.sendMail({
//         from: `"Your Store" <${process.env.SMTP_USER}>`,
//         to: session.user.email,
//         subject: `Order Confirmation - ${result.insertedId}`,
//         html: emailHtml,
//       });

//       return { success: true, message: "Order placed successfully" };
//     }

//     return { success: false, message: "Failed to save order" };

//   } catch (error) {
//     console.error("Order Error:", error);
//     return { success: false, message: "Something went wrong" };
//   }
// };

// "use server";

// import { authOptions } from "@/lib/authOptions";
// import { getServerSession } from "next-auth";
// import { clearCart, getCartItems } from "./cart";
// import { dbConnect, collections } from "@/lib/dbConnect";

// export const createOrder = async (payload) => {
//   try {
//     const session = await getServerSession(authOptions);

//     if (!session?.user) {
//       return { success: false, message: "User not authenticated" };
//     }

//     const orderCollection = await dbConnect(collections.ORDER);
//     const cart = await getCartItems();

//     if (!cart || cart.length === 0) {
//       return { success: false, message: "Cart is empty" };
//     }

//     const newOrder = {
//       userEmail: session.user.email,
//       createdAt: new Date().toISOString(),
//       items: cart,
//       status: "pending",
//       ...payload,
//     };

//     const result = await orderCollection.insertOne(newOrder);

//     if (result.insertedId) {
//       await clearCart();
//       return { success: true, message: "Order placed successfully" };
//     }

//        await transporter.sendMail({
//         from: `"Your Store" <${process.env.SMTP_USER}>`,
//         to: session.user.email,
//         subject: `Order Confirmation - ${result.insertedId}`,
//         html: emailHtml,
//       });

//     return { success: false, message: "Failed to save order" };

//   } catch (error) {
//     console.error("Order Error:", error);
//     return { success: false, message: "Something went wrong" };
//   }
// };
