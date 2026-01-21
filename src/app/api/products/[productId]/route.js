// import { collections, dbConnect } from "@/lib/dbConnect";
// import { ObjectId } from "mongodb";
// // import dbConnect from "@/lib/dbConnect";
// // import collections from "@/lib/collections";

// export async function GET(request, context) {
//   try {
//     const { params } = context;
//     const { productId } = params; // if warning appears, try: const { productId } = await params;

//     const productCollection = await dbConnect(collections.PRODUCTS);

//     const product = await productCollection.findOne({
//       _id: new ObjectId(productId),
//     });

//     if (!product) {
//       return new Response(JSON.stringify({ message: "Product not found" }), {
//         status: 404,
//       });
//     }

//     return new Response(JSON.stringify(product), { status: 200 });
//   } catch (err) {
//     console.error(err);
//     return new Response(JSON.stringify({ message: "Server Error" }), {
//       status: 500,
//     });
//   }
// }



import { collections, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function GET(request, context) {
  try {
    const { productId } = await context.params; 

    const productCollection = await dbConnect(collections.PRODUCTS);

    const product = await productCollection.findOne({
      _id: new ObjectId(productId),
    });

    if (!product) {
      return new Response(
        JSON.stringify({ message: "Product not found" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(product), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ message: "Server Error" }),
      { status: 500 }
    );
  }
}
