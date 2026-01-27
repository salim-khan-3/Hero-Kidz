// import { collections, dbConnect } from "@/lib/dbConnect";
// import { NextResponse } from "next/server";

// export async function POST(request) {
//   try {
//     const { email, productId, productTitle, price, image } =
//       await request.json();
//     const cartCollection = await dbConnect(collections.CARTS);
//     // একই ইউজার একই প্রোডাক্ট বারবার যোগ করছে কি না চেক করুন
//     const isExist = await cartCollection.findOne({ email, productId });

//     if (isExist) {
//       await cartCollection.updateOne(
//         { email, productId },
//         { $inc: { quantity: 1 } },
//       );
//     } else {
//       await cartCollection.insertOne({
//         email,
//         productId,
//         productTitle,
//         price,
//         image,
//         quantity: 1,
//         addedAt: new Date(),
//       });
//     }
//     return NextResponse.json({ message: "Added to cart successfully" }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ message: "Failed to add" }, { status: 500 });
//   }
// }



// // ✅ FIXED GET (FINAL)
// export async function GET(request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const email = searchParams.get("email");

//     if (!email) {
//       return NextResponse.json([], { status: 200 });
//     }

//     const cartCollection = await dbConnect(collections.CARTS);
//     const carts = await cartCollection.find({ email }).toArray();

//     // THIS IS THE MAGIC LINE
//     const formatted = carts.map(item => ({
//       ...item,
//       _id: item._id.toString(), // ✅ ObjectId → string
//     }));

//     return NextResponse.json(formatted, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ message: "Error" }, { status: 500 });
//   }
// }



// // // get data from cart collection
// // export async function GET(request) {
// //     const {searchParams} =  new URL(request.url);
// //     const email = searchParams.get("email");

// //     if(!email){
// //         return NextResponse.json([], {status: 400});
// //     }

// //     const cartCollection = await dbConnect(collections.CARTS);
// //     const cartItems = await cartCollection.find({email}).toArray()

// //     return NextResponse.json(cartItems)
    
// // }



// // export async function GET(request) {
// //   try {
// //     const { searchParams } = new URL(request.url);
// //     const email = searchParams.get("email");

// //     if (!email) {
// //       return NextResponse.json([], { status: 200 });
// //     }

// //     const cartCollection = await dbConnect(collections.CARTS);
// //     const carts = await cartCollection.find({ email }).toArray();

// //     // 🔥 FIX: _id → string
// //     const formatted = carts.map(item => ({
// //       ...item,
// //       _id: item._id.toString(),
// //     }));

// //     return NextResponse.json(formatted, { status: 200 });
// //   } catch (error) {
// //     return NextResponse.json({ message: "Error" }, { status: 500 });
// //   }
// // }





import { collections, dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, productId, productTitle, price, image } = await request.json();
    const cartCollection = await dbConnect(collections.CARTS);
    
    const isExist = await cartCollection.findOne({ email, productId });

    if (isExist) {
      await cartCollection.updateOne(
        { email, productId },
        { $inc: { quantity: 1 } }
      );
    } else {
      await cartCollection.insertOne({
        email, productId, productTitle, price, image,
        quantity: 1,
        addedAt: new Date(),
      });
    }
    return NextResponse.json({ message: "Added to cart successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to add" }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) return NextResponse.json([], { status: 200 });

    const cartCollection = await dbConnect(collections.CARTS);
    const carts = await cartCollection.find({ email }).toArray();

    const formatted = carts.map(item => ({
      ...item,
      _id: item._id.toString(),
    }));

    return NextResponse.json(formatted, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}