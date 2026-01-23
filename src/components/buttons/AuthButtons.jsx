"use client"

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const AuthButtons = () => {
  const session = useSession();
  return (
    <div>
      {session.status === "authenticated" ? (
        <>
          <button onClick={()=> signOut()} className="">Sign Out</button>
        </>
      ) : (
        <>
          <Link className="cursor-pointer" href={"/login"}>
            <button className="bg-blue-600 hidden md:block hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg active:scale-95">
              Login
            </button>
          </Link>
        </>
      )}
    </div>
  );
};

export default AuthButtons;
