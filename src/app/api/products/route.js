import { collections, dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
    
    const productCollection = await dbConnect(collections.PRODUCTS);
    const products = await productCollection.find({}).toArray();

    return NextResponse.json(products);
    
}