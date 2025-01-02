"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const registerSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = registerSchema.safeParse({ email, password });
    if (!result.success) {
      toast.error(result.error.errors[0]?.message || "Invalid input");
      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Account created successfully!");
      router.push("/login");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Something went wrong, please try again!");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-end">
      <div className="bg-customGreen w-[50%] h-screen overflow-hidden relative">
        <Image
          src="/loginPicture.jpeg"
          layout="fill"
          objectFit="cover"
          alt="dining room"
        />
      </div>

      <div className="bg-customGreen w-1/2 h-screen flex flex-col relative overflow-hidden">
        <div className="bg-[url('/gold.jpeg')] bg-cover bg-center w-1/2 h-5"></div>
        <h1 className="mt-10 text-center text-3xl text-yellow-600">
          Create an account
        </h1>
        <p className="text-center text-yellow-700">
          Enter your email below to create your account
        </p>
        <div className="w-[60%] border-b mx-auto mt-5 border-yellow-500"></div>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <label
              htmlFor="email"
              className="block text-sm text-yellow-500 mx-5 font-medium"
            >
              Email
            </label>
            <div className="px-5">
              <input
                type="email"
                id="email"
                name="email"
                className="mt-2 w-full p-2 border border-yellow-700 bg-customGreen rounded-md focus:bg-customGreen focus:text-yellow-500 focus:border-gray-500 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <label
              htmlFor="password"
              className="block text-sm text-yellow-500 mx-5 font-medium"
            >
              Password
            </label>
            <div className="px-5">
              <input
                type="password"
                id="password"
                name="password"
                className="mt-2 w-full p-2 border border-yellow-700 bg-customGreen rounded-md focus:bg-customGreen focus:text-yellow-500 focus:border-gray-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mt-9 flex justify-center">
            <button
              type="submit"
              className="btn mt-3 h-11 w-[40%] bg-[url('/gold.jpeg')] bg-cover bg-center text-[#001C17] font-semibold border-black border-2"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </div>
        </form>
        <div>
          <p className="mt-4 text-center text-sm text-yellow-700">
            Have an account?{" "}
            <Link href="/login" className="text-yellow-500">
              Login
            </Link>
          </p>
        </div>
        <div className="absolute bottom-0 right-0 bg-[url('/gold.jpeg')] bg-cover bg-center w-1/2 h-5"></div>
      </div>
    </div>
  );
};

export default Register;
