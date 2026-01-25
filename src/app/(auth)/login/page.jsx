"use client";

import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Fa0, FaGoogle } from "react-icons/fa6";
import SocialLogin from "@/components/buttons/SocialLogin";

const LoginPage = () => {
  const router = useRouter();
  const params = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect:false,
      callbackUrl: params.get("callbackUrl") || "/",
    });
    console.log(result);
    if (!result.ok) {
      Swal.fire("error", "Email password not matched", "errpr");
    } else {
      Swal.fire("success", "Login successful", "success");
      router.push(params.get("callbackUrl") || "/");
    }
  };
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-slate-200/60 p-8 border border-slate-100">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Welcome Back</h1>
          <p className="text-slate-500 mt-2">
            Please enter your details to sign in.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="text-sm font-medium">Email Address</label>
            <input
              type="email"
              placeholder="name@company.com"
              className="w-full p-3 border rounded-xl"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-1 ml-1">
              <label className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <Link
                href="#"
                className="text-xs text-indigo-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            {/* Password */}
            <div>
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full p-3 border rounded-xl"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <button className="w-full bg-indigo-600 cursor-pointer hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98]">
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-slate-500">
              Or sign in with
            </span>
          </div>
        </div>

        {/* Social Button */}
        <SocialLogin></SocialLogin>

        {/* Footer */}
        <p className="text-center text-slate-600 mt-8 text-sm">
          Dont have an account?{" "}
          <Link
            href={`/register?callbackUrl=${params.get("callbackUrl") || "/"}`}
            className="text-indigo-600 cursor-pointer font-bold hover:underline underline-offset-4"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
