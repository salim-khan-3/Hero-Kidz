"use server";

import { collections, dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";

export const postUser = async (payload) => {
  try {
    const { email, password, name } = payload;

    if (!email || !password) {
      return { success: false, message: "Email and password are required" };
    }

    const usersCollection = await dbConnect(collections.USERS);

    const isExist = await usersCollection.findOne({ email });
    if (isExist) {
      return { success: false, message: "User already exists" };
    }

    const newUser = {
      provider: "credentials",
      name,
      email,
      password: await bcrypt.hash(password, 14),
      role: "user",
      createdAt: new Date(),
    };

    const result = await usersCollection.insertOne(newUser);

    return {
      success: true,
      acknowledged: result.acknowledged,
      insertedId: result.insertedId.toString(),
    };
  } catch (error) {
    console.error("postUser error:", error);
    return { success: false, message: "Server error" };
  }
};


export const loginUser = async (payload) => {
    const {email, password, name} = payload;
    if(!email || !password ) return null;
    const user = await dbConnect(collections.USERS).findOne({email});
    if(!user) return null;

    const isMatched = await bcrypt.compare(password, user.password);
    if(isMatched){
        return user;
    }else{
        return null;
    }
}