"use server"

import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

const { dbConnect, collections } = require("@/lib/dbConnect")
// const { collectMeta } = require("next/dist/build/utils")

const cartCollection = await dbConnect(collections.CARTS);


export const handleAddToCart = async ({product,inc = true}) => {
    const user = await getServerSession(authOptions) || {};
    const query = { email: user?.email, productId: product?._id}
    const isAdded = await cartCollection.findOne(query); 

    if(isAdded){
        const updatedData = {
            $inc:{
                quantity: inc? 1 : -1,
            }
        }
        const result = await cartCollection.updateOne(query,updatedData)
        return {success:Boolean(result.modifiedCount)};
    }else{
        const newData = {
            productId: product?._id,
            email: user?.email,
            title: product?.title,
            image: product?.image,
            price: product.price - (product.price * product.discount) / 100,
            quantity: 1,
        }

        const result = await cartCollection.insertOne(newData);
        return {success: result.acknowledged}
    }
}