"use client";
import Link from "next/link";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useBooking } from "../context/BookingContext";
import { useRouter } from "next/navigation";
import axiosInstance from "@/api/axiosInstance";

const Customer = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customerData, setCustomerData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const { location_id, details, date, time, setBookingData } = useBooking();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setCustomerData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, phone } = customerData;

    if (!name || !email || !phone) {
      alert("Please fill out all fields before submitting.");
      return;
    }

    setBookingData({ name: name, email: email, phone: phone});
    
    try {
      setIsSubmitting(true);
      console.log("Data detail yang dikirim: " + details)
      const response = await axiosInstance.post("/appointments/save-booking", {
        location_id,
        name,
        email,
        phone,
        details,
        date,
        time
      });

      console.log("API Response:", response.data);
      alert("Booking appointment success!");

      setBookingData({ id: response.data.data.id });
      
      router.push('/booking');
    } catch (error: any) {
      console.error("Error during save booking:", error);
      alert(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="text-center mt-5 mb-10">
        <h1 className="text-yellow-600 font-bold text-2xl">Preview</h1>
      </div>

      <div className="bg-white w-full shadow-xl border p-5 rounded-xl h-max">
        <h4 className="font-bold text-lg mb-4">Customer Information</h4>
        <div className="flex flex-col space-y-4 overflow-y-auto max-h-[500px]">
          <form className="w-full mx-auto" onSubmit={handleSubmit}>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900">Name</label>
              <input
                type="text"
                value={customerData.name}
                onChange={handleChange}
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5"
                placeholder="Input Name"
                required
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900">Email</label>
              <input
                type="email"
                value={customerData.email}
                onChange={handleChange}
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5"
                placeholder="Input Email"
                required
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900">Phone</label>
              <input
                type="text"
                value={customerData.phone}
                onChange={handleChange}
                id="phone"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5"
                placeholder="Input Phone"
                required
              />
            </div>

            <div className="mt-5 flex justify-between">
              <Link href="/therapist" className="flex items-center py-2 rounded-lg text-yellow-600 hover:text-yellow-600/90">
                <FiChevronLeft />
                Back
              </Link>
              <button type="submit" className="flex items-center px-6 py-2 bg-yellow-600 text-white rounded-lg" disabled={isSubmitting}>
                {isSubmitting ? "Processing..." : "Submit Booking"}
                <FiChevronRight />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Customer;
