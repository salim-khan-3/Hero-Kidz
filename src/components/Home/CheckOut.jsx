"use client";
import { createOrder } from "@/actions/server/Order";
import { useSession } from "next-auth/react";
import React, { useMemo, useState } from "react";
import Swal from "sweetalert2";

const CheckOut = ({ cartItems = [] }) => {
  const session = useSession();
  const totalItems = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
  }, [cartItems]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const payload = {
      name: form.name.value,
      email: form.email.value,
      contact: form.phone.value,
      address: form.address.value,
      instruction: form.instruction.value,
    };

    const result = await createOrder(payload);
    if (result.success) {
       Swal.fire("success", "Order added successfull", "success");
    } else {
      Swal.fire("error", "Something went wrong", "error");
    }
  };

  if (session.status == "loading") {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Form */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex items-center gap-5">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={session?.data?.user?.name}
                  // onChange={handleChange}
                  className="w-full p-3 border rounded-md"
                  placeholder="Enter your full name"
                  required
                  readOnly
                />
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={session?.data?.user?.email}
                  // onChange={handleChange}
                  className="w-full p-3 border rounded-md"
                  placeholder="example@mail.com"
                  required
                  readOnly
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Delivery Information
              </label>
              <textarea
                name="address"
                rows="4"
                className="w-full p-3 border rounded-md"
                placeholder="Address, City, Area..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Special Instruction
              </label>
              <textarea
                name="instruction"
                rows="3"
                className="w-full p-3 border rounded-md"
                placeholder="Any specific note for delivery"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Contact No.
              </label>
              <input
                type="text"
                name="phone"
                className="w-full p-3 border rounded-md"
                placeholder="+8801xxxxxxxxx"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-800"
            >
              Place Order
            </button>
          </form>
        </div>

        {/* Right Side: Order Summary (unchanged) */}
        {/* Price Calculations */}
        <div className="mt-6 border-t pt-4 space-y-2">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal ({totalItems} items)</span>
            <span>৳{totalPrice}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Shipping Fee</span>
            <span className="text-green-600">Free</span>
          </div>

          {/* Grand Total */}
          <div className="flex justify-between items-center border-t-2 border-dashed pt-4 mt-4">
            <p className="text-lg font-bold text-gray-900">Total Amount</p>
            <p className="text-2xl font-bold text-blue-600">৳{totalPrice}</p>
          </div>
        </div>

        {/* Secure Checkout Note */}
        <p className="text-[10px] text-gray-400 mt-4 text-center uppercase tracking-wider font-medium">
          Secure Checkout • 100% Authentic Products
        </p>
      </div>
    </div>
  );
};

export default CheckOut;
