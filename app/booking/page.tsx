"use client";
import Link from "next/link";
import { useBooking } from "../context/BookingContext";

const Customer = () => {
  const { location_id, name, phone, email, details, date, time } = useBooking();
  return (
    <>
      <div className="text-center mt-5 mb-10">
        <h1 className="text-yellow-600 font-bold text-2xl">Salonku</h1>
        <h1 className="text-yellow-600 font-bold text-2xl">Booking Online</h1>
      </div>

      <div className="bg-white w-full shadow-xl border p-5 rounded-xl max-h-[600px] overflow-y-auto">
        <h4 className="font-bold text-xl text-center mb-4">Review</h4>
        <p className="font-bold text-md mb-4">Order Details</p>

        <div className="p-4 border rounded-lg mb-5">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Customer</span>
            <span className="font-semibold">{name}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Location</span>
            <span className="font-semibold">{location_id}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Phone No</span>
            <span className="font-semibold">{phone}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Treatment</span>
            <div className="flex flex-col">
              {details.map(detail => (
                <span className="font-semibold">{detail.treatment_id} (Category A)</span>
              ))}
            </div>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Therapist</span>
            <div className="flex flex-col">
              {details.map(detail => (
                <span className="font-semibold">{detail.therapist_id} (Category A)</span>
              ))}
            </div>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Date</span>
            <span className="font-semibold">{date}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Time</span>
            <span className="font-semibold">{time}</span>
          </div>
        </div>

        <p className="font-bold text-md mb-4">Payment Detail</p>

        <div className="border p-4 rounded-lg mb-5">
          <div className="flex flex-col gap-2 mb-2">
            {details.map((detail) => (
              <div className="flex justify-between">
                <span className="text-gray-600">{detail.treatment_id} (Category 1)</span>
                <span className="font-semibold">IDR 120.000</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Service</span>
            <span className="font-semibold">IDR 80.000</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between">
            <span className="font-bold">Total</span>
            <span className="font-bold text-yellow-600">Rp. 270.000</span>
          </div>
        </div>

        <button className="w-full bg-yellow-600 text-white py-2 rounded-lg font-semibold">Submit</button>
        <Link href="/" className="w-full flex justify-center bg-white text-yellow-600 border border-yellow-600 transition-all hover:bg-yellow-600 hover:text-white mt-3 py-2 rounded-lg font-semibold">
          Cancel Booking
        </Link>
      </div>
    </>
  );
};

export default Customer;
