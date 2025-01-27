"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/api/axiosInstance";
import { useBooking } from "@/app/context/BookingContext";

const Customer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [bookingData, setBookingData] = useState<BookingResponse>();
  const { id } = useBooking();

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get("/appointments/" + id);
        setBookingData(response.data?.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooking();
  }, []);

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
            <span className="font-semibold">{bookingData?.name}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Location</span>
            <span className="font-semibold">{bookingData?.location.name}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Phone No</span>
            <span className="font-semibold">{bookingData?.phone}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Treatment</span>
            <div className="flex flex-col">
              {bookingData?.details.map((detail) => (
                <span className="font-semibold">
                  {detail.treatment_name} ({detail.treatment_category})
                </span>
              ))}
            </div>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Therapist</span>
            <div className="flex flex-col">
              {bookingData?.details.map((detail) => (
                <span className="font-semibold">
                  {detail.therapist_name} ({detail.treatment_category})
                </span>
              ))}
            </div>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Date</span>
            <span className="font-semibold">{bookingData?.date}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Time</span>
            <span className="font-semibold">{bookingData?.time}</span>
          </div>
        </div>

        <p className="font-bold text-md mb-4">Payment Detail</p>

        <div className="border p-4 rounded-lg mb-5">
          <div className="flex flex-col gap-2 mb-2">
            {bookingData?.details.map((detail) => (
              <div className="flex justify-between">
                <span className="text-gray-600">
                  {detail.treatment_name} ({detail.treatment_category})
                </span>
                <span className="font-semibold">IDR {detail.treatment_price}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between mb-2">
            {bookingData?.details.map((detail) => (
              <div>
                <span className="text-gray-600">{detail.therapist_name}</span>
                <span className="font-semibold">IDR {detail.therapist_price}</span>
              </div>
            ))}
          </div>
          <hr className="my-2" />
          <div className="flex justify-between">
            <span className="font-bold">Total</span>
            <span className="font-bold text-yellow-600">Rp. {bookingData?.total_price}</span>
          </div>
        </div>

        <Link href="/" className="w-full flex justify-center bg-white text-yellow-600 border border-yellow-600 transition-all hover:bg-yellow-600 hover:text-white mt-3 py-2 rounded-lg font-semibold">
          Back to Home
        </Link>
      </div>
    </>
  );
};

export default Customer;
