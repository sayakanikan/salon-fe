"use client";
import axiosInstance from "@/api/axiosInstance";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password } = loginData;

    if (!email || !password) {
      alert("Please fill out all fields before submitting.");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await axiosInstance.post("/login", {
        email,
        password,
      });

      console.log("Login Response:", response.data);

      if (response.data?.data.token) {
        document.cookie = `token=${response.data.data.token}; path=/; max-age=${7 * 24 * 60 * 60}; samesite=strict`;
        localStorage.setItem("token", response.data.data.token);;
  
        alert("Login successful!");
        console.log("tes");
        router.push("/");
      } else {
        throw new Error("Token not found in response");
      }
    } catch (error: any) {
      console.error("Error during login:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-4">
      <div className="text-center mb-10">
        <h1 className="text-yellow-600 font-bold text-2xl">Login</h1>
        <h1 className="text-yellow-600 font-bold text-2xl">Salonku Booking Online</h1>
      </div>

      <form className="w-full mx-auto" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">Email</label>
          <input
            type="email"
            value={loginData.email}
            onChange={handleChange}
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5"
            required
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">Password</label>
          <input
            type="password"
            value={loginData.password}
            onChange={handleChange}
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5"
            required
          />
        </div>
        <div className="flex justify-end mb-5">
          <p className="ms-2 text-sm font-medium text-gray-900">
            Don't have account?
            <Link href="/register" className="text-yellow-600 hover:text-yellow-700 hover:underline">
              {" "}
              Register here
            </Link>
          </p>
        </div>
        <button type="submit" className="text-white bg-yellow-600 hover:bg-yellow-600/90 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
