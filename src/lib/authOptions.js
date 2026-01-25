// import { loginUser } from "@/actions/server/auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import { collections, dbConnect } from "./dbConnect";
// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {},
//       async authorize(credentials, req) {
//         const user = await loginUser(credentials);
//         return user;
//       },
//     }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],
//   callbacks: {
//     async signIn(user, account, profile, email, credentials) {
//       console.log(user, account, profile, email, credentials);

//       const isExist = await dbConnect(collections.USERS).findOne({
//         email: user.email,
//         providers: account.provider,
//       });
//       if (isExist) {
//         return true;
//       }

//       const newUser = {
//         provider: accout?.provider,
//         name: user.name,
//         email: user.email,
//         image: user.image,
//         role: "user"
//       };
//       const result = await dbConnect(collections.USERS).insertOne(newUser)
//         return result.acknowledged;
//     }


//   },
// };



import { loginUser } from "@/actions/server/auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { collections, dbConnect } from "./dbConnect";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        const user = await loginUser(credentials);
        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    // এখানে আর্গুমেন্টগুলো অবজেক্ট হিসেবে নিতে হয়: { user, account, profile }
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        try {
          const userCollection = await dbConnect(collections.USERS);
          
          // ১. চেক করা হচ্ছে এই ইমেইল দিয়ে আগে থেকেই ইউজার আছে কি না
          const isExist = await userCollection.findOne({
            email: user.email,
          });

          // ২. যদি ইউজার না থাকে, তবেই নতুন ইউজার ইনসার্ট হবে
          if (!isExist) {
            const newUser = {
              name: user.name,
              email: user.email,
              image: user.image,
              provider: account.provider, // এখানে 'accout' টাইপো ছিল
              role: "user",
              createdAt: new Date(),
            };
            await userCollection.insertOne(newUser);
          }
          
          return true; // লগইন সফল করার জন্য true রিটার্ন করতে হবে
        } catch (error) {
          console.error("Error saving user to DB:", error);
          return false; // কোনো এরর হলে লগইন আটকে দিবে
        }
      }
      
      // Credentials লগইন এর জন্য
      return true;
    },
    
    // সেশন এ রোল বা আইডি এড করার জন্য (অপশনাল কিন্তু জরুরি)
    async session({ session, token }) {
      if(token){
        session.role = token?.role;
        session.email = token?.email;
      }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if(user){
        token.role = user?.role;
        token.email = user?.email;
      }
      return token;
    },
  },
};