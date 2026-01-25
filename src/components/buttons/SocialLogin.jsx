import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React from "react";
import { FaGoogle } from "react-icons/fa6";
import Swal from "sweetalert2";

const SocialLogin = () => {
    const params = useSearchParams();
    console.log(params.get("callbackUrl") || "/");
    const handleGoogleSingIn = async() => {
        const result= await signIn("google",{
            // redirect: false,
            callbackUrl: params.get("callbackUrl") || "/"
        });
        console.log(result);
        if(result.ok){
            Swal.fire("success","Login Successful","success");
        }else{
            Swal.fire("error","Login Failed","error");
        }
    }
  return (
    <div>
      <button
        onClick={handleGoogleSingIn}
        className="w-full cursor-pointer flex items-center justify-center gap-3 bg-white border border-slate-200 py-3 rounded-xl hover:bg-slate-50 transition-all font-medium text-slate-700"
      >
        <FaGoogle className="w-5 h-5" />
        Google
      </button>
    </div>
  );
};

export default SocialLogin;
