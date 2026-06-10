"use client";

import { useState } from "react";
import API from "../../services/api";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

export default function RegisterPage() {

  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleRegister = async () => {

    try {

      await API.post("users/users/", formData);

      alert("Registration Successful");

    } catch (error) {

      console.log(error.response?.data);

      alert("Registration Failed");

    }
  };

  const handleGoogleRegister = async () => {

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

    alert("Google Registration Successful");

    router.push("/user/home");

  } catch (error) {

    console.log(error);

    alert("Google Registration Failed");

  }

};

  return (

    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-96">

        <h1 className="text-4xl font-bold text-center mb-6 text-black">
          Register
        </h1>

        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full border border-gray-300 p-3 mb-4 rounded-lg text-slate-900"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border border-gray-300 p-3 mb-4 rounded-lg text-slate-900"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border border-gray-300 p-3 mb-4 rounded-lg text-slate-900"
          onChange={handleChange}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
        >
          Register
        </button>

         <button
          onClick={handleGoogleRegister}
          className="w-full mt-4 border border-gray-300 py-3 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-100 text-slate-900"
        >
          <FcGoogle size={22} />
          Continue with Google
        </button>

        <p className="text-center mt-4 text-gray-600">
          Already have an account?
          <span
            onClick={() => router.push("/login")}
            className="text-cyan-600 font-bold cursor-pointer ml-2"
          >
            Login
          </span>
        </p>

      </div>

    </div>
  );
}
