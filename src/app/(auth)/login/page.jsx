'use client';

import React from 'react';
import Link from 'next/link';

const LoginPage = () => {
    return (
<div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-slate-200/60 p-8 border border-slate-100">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Welcome Back</h1>
          <p className="text-slate-500 mt-2">Please enter your details to sign in.</p>
        </div>

        {/* Form */}
        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1 ml-1">Email Address</label>
            <input 
              type="email" 
              placeholder="name@company.com"
              className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1 ml-1">
              <label className="block text-sm font-medium text-slate-700">Password</label>
              <Link href="#" className="text-xs text-indigo-600 hover:underline">Forgot password?</Link>
            </div>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
              required
            />
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
            <span className="px-2 bg-white text-slate-500">Or sign in with</span>
          </div>
        </div>

        {/* Social Button */}
        <button className="w-full cursor-pointer flex items-center justify-center gap-3 bg-white border border-slate-200 py-3 rounded-xl hover:bg-slate-50 transition-all font-medium text-slate-700">
          <img src="https://www.svgrepo.com/show/475656/google_color.svg" className="w-5 h-5" alt="Google" />
          Google
        </button>

        {/* Footer */}
        <p className="text-center text-slate-600 mt-8 text-sm">
          Don't have an account?{' '}
          <Link href="/register" className="text-indigo-600 cursor-pointer font-bold hover:underline underline-offset-4">
            Register
          </Link>
        </p>
      </div>
    </div>
    );
};

export default LoginPage;