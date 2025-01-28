"use client";
import axiosInstance from "@/api/axiosInstance";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Register = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, email, password } = userData;

    if (!name || !email || !password) {
      alert("Please fill out all fields before submitting.");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await axiosInstance.post("/register", {
        name,
        email,
        password,
      });

      console.log("API Response:", response.data);
      alert("Registration successful!");
      
      router.push('/login');
    } catch (error: any) {
      console.error("Error during registration:", error);
      alert(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-4">
      <div className="text-center mb-10">
        <h1 className="text-yellow-600 font-bold text-2xl">Register</h1>
        <h1 className="text-yellow-600 font-bold text-2xl">Salonku Booking Online</h1>
      </div>

      <form className="w-full mx-auto" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">Name</label>
          <input
            type="text"
            value={userData.name}
            onChange={handleChange}
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5"
            required
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">Email</label>
          <input
            type="email"
            value={userData.email}
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
            value={userData.password}
            onChange={handleChange}
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5"
            required
          />
        </div>
        <div className="flex justify-end mb-5">
          <p className="ms-2 text-sm font-medium text-gray-900">
            Already have account?
            <Link href="/login" className="text-yellow-600 hover:text-yellow-700 hover:underline">
              {" "}
              Login
            </Link>
          </p>
        </div>
        <button type="submit" className="text-white bg-yellow-600 hover:bg-yellow-600/90 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center" disabled={isSubmitting}>
          {isSubmitting ? "Registring..." : "Register Account"}
        </button>
      </form>
    </div>
  );
};

export default Register;
