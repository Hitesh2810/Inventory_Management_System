"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { FaWarehouse } from "react-icons/fa";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
export default function LoginPage() {

  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "user") {
      router.push("/user/home");
    } else if (role === "admin") {
      router.push("/admin/dashboard");
    }
  }, [router]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "http://127.0.0.1:8000/api/users/login/",
        formData
      );

      if (res.data.role !== "user") {
        toast.error("Please login using the admin portal.");
        router.push("/admin");
        return;
      }

      localStorage.setItem("role", "user");
      localStorage.setItem("username", res.data.username);
      localStorage.setItem(
        "ims_user_activity",
        JSON.stringify([
          {
            id: Date.now(),
            activity: "Logged In",
            createdAt: new Date().toISOString(),
          },
        ])
      );

      toast.success("Login Successful");
      router.push("/user/home");

    } catch {

      toast.error("Invalid Credentials");

    }
  };

  const handleGoogleLogin = async () => {

    try {

      const result = await signInWithPopup(
        auth,
        provider
      );

      const user = result.user;

      localStorage.setItem(
        "username",
        user.displayName
      );

      localStorage.setItem(
        "email",
        user.email
      );

      localStorage.setItem(
        "role",
        "user"
      );

      localStorage.setItem(
        "ims_user_activity",
        JSON.stringify([
          {
            id: Date.now(),
            activity: "Logged In",
            createdAt: new Date().toISOString(),
          },
        ])
      );

      toast.success(
        "Google Login Successful"
      );

      router.push("/user/home");

    } catch (error) {

      console.log(error);

      toast.error(
        "Google Login Failed"
      );

    }

  };

  return (
    <div className="min-h-screen flex">

      <Toaster />

      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-cyan-500 to-blue-700 text-white flex-col justify-center items-center p-16">

        <FaWarehouse size={90} />

        <h1 className="text-5xl font-bold mt-8">
          Inventory Management
        </h1>

        <p className="mt-6 text-xl text-center leading-9">
          Manage products, orders, suppliers,
          reports, stock and sales professionally.
        </p>

      </div>

      <div className="w-full lg:w-1/2 flex justify-center items-center bg-gray-100">

        <form
          onSubmit={handleLogin}
          className="bg-white shadow-2xl rounded-3xl p-10 w-[420px]"
        >

          <h1 className="text-4xl font-bold text-center text-gray-700 mb-3">
            Welcome Back
          </h1>

          <p className="text-center text-gray-500 mb-8">
            Login to continue
          </p>

          <input
            type="text"
            name="username"
            placeholder="Enter Username"
            onChange={handleChange}
            className="w-full border border-gray-300 p-4 rounded-xl mb-5 outline-none text-slate-900"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={handleChange}
            className="w-full border border-gray-300 p-4 rounded-xl mb-5 outline-none text-slate-900"
            required
          />

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-4 rounded-xl font-bold transition"
          >
            Login
          </button>

          <div className="flex items-center my-6">
            <div className="flex-1 border-t"></div>
            <p className="px-4 text-gray-400">OR</p>
            <div className="flex-1 border-t"></div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full border py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-100 transition text-slate-900"
          >
            <FcGoogle size={25} />
            Continue with Google
          </button>

          <p className="text-center mt-8 text-gray-500">
            Don&apos;t have an account?
            <span
              onClick={() => router.push("/register")}
              className="text-cyan-600 font-bold cursor-pointer ml-2"
            >
              Register
            </span>
          </p>

        </form>

      </div>

    </div>
  );
}
