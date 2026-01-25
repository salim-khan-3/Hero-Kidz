
// import { authOptions } from "@/lib/authOptions";
import { authOptions } from "@/lib/authOptions";
import NextAuth from "next-auth";
// import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
