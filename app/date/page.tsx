"use client";
import Link from "next/link";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FiCalendar, FiChevronRight, FiChevronLeft } from "react-icons/fi";

const DatePicker: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const timeSlots = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"];

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
          <Calendar className="rounded-xl p-3" onChange={setDate} value={date} tileDisabled={({ date }) => date < new Date(new Date().setHours(0, 0, 0, 0))} />
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
            <button className="flex items-center bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-600/70">
              Next
              <FiChevronRight />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DatePicker;
