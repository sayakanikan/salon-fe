"use client"
import React, { createContext, useContext, useState, ReactNode } from "react";

interface BookingContextProps extends BookingRequest {
  setBookingData: (data: Partial<BookingRequest>) => void;
  addDetail: (detail: BookingDetail) => void;
}

const BookingContext = createContext<BookingContextProps | undefined>(undefined);

const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [bookingData, setBookingDataState] = useState<BookingRequest>({
    id: 0,
    location_id: 0,
    name: "-",
    email: "-",
    phone: "-",
    details: [],
    date: "-",
    time: "-",
  });

  const setBookingData = (data: Partial<BookingRequest>) => {
    setBookingDataState((prev) => ({ ...prev, ...data }));
  };

  const addDetail = (detail: BookingDetail) => {
    setBookingDataState((prev) => ({
      ...prev,
      details: [...prev.details, detail],
    }));
  };

  return (
    <BookingContext.Provider value={{ ...bookingData, setBookingData, addDetail }}>
      {children}
    </BookingContext.Provider>
  );
};

const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};

export { BookingProvider, useBooking };
