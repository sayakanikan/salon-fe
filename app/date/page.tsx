"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import { FiCalendar, FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { useBooking } from "../context/BookingContext";
import axiosInstance from "@/api/axiosInstance";
import { useRouter } from "next/navigation";

const Calendar = dynamic(() => import("react-calendar"), { ssr: false });

const DatePicker: React.FC = () => {
  const router = useRouter();
  const { location_id, details, setBookingData } = useBooking();
  const [date, setDate] = useState<Date | null>(null);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const timeSlots = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"];

  useEffect(() => {
    console.log(details);
    setBookingData({ date: "", time: ""});
    setDate(new Date());
  }, []);

  const handleSubmit = async () => {
    setIsLoadingButton(true);
    if (!date || !selectedTime) {
      alert("Please select a date and time.");
      return;
    }

    const requestData = {
      location_id: location_id,
      date: date.toISOString().split('T')[0],
      time: selectedTime
    };
    console.log(requestData);
  
    try {
      const response = await axiosInstance.post('/appointments/check-slots', requestData);
  
      if (response.data.data == true) {
        setBookingData({ date: date.toISOString().split('T')[0], time: selectedTime });
        router.push('/therapist');
      } else {
        alert(response.data.message || "Time slot is not available");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingButton(false);
    }
  };

  return (
    <>
      <div className="text-center mt-5 mb-10">
        <h1 className="text-yellow-600 font-bold text-2xl">Select Date & Time</h1>
      </div>

      <div className="bg-white shadow-xl border p-5 rounded-xl h-max">
        <div className="flex flex-col space-y-4 overflow-y-auto max-h-[550px]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium">Set Appointment</span>
            <FiCalendar size={20} />
          </div>
          {date && (
            <Calendar
              className="rounded-xl p-3"
              onChange={setDate}
              value={date}
              tileDisabled={({ date }) => date < new Date(new Date().setHours(0, 0, 0, 0))}
              locale="id" // Tetapkan locale Indonesia untuk konsistensi
            />
          )}
          <div className="mt-4">
            <h2 className="text-md font-medium mb-2">Slot Available</h2>
            <div className="grid grid-cols-3 gap-2 overflow-y-auto max-h-40">
              {timeSlots.map((slot) => (
                <button key={slot} className={`p-2 text-sm rounded-lg ${selectedTime === slot ? "bg-yellow-600 text-white" : "bg-gray-200 hover:bg-yellow-100"}`} onClick={() => setSelectedTime(slot)}>
                  {slot}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-6 flex justify-between">
            <Link href="/treatment" className="flex items-center text-yellow-600">
              <FiChevronLeft />
              Back
            </Link>
            <button onClick={handleSubmit} className="flex items-center bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-600/70" disabled={isLoadingButton}>
              Select
              <FiChevronRight />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DatePicker;
