'use client'
import { BiArrowBack } from "react-icons/bi";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";
import { HiArrowRight } from "react-icons/hi2";
import React, { useState } from 'react';
import Link from "next/link";
import { FiChevronLeft } from "react-icons/fi";

const Location = () => {
  const [selectedLocation, setSelectedLocation] = useState<Number>()

  const locations = [
    { id: 1, name: "Majapahit - Semarang", address: "Jl. Majapahit Raya No.12, Blok 10..." },
    { id: 2, name: "Pleburan - Semarang", address: "Jl. Pleburan Raya No.12, Blok 10..." },
    { id: 3, name: "Pleburan - Semarang", address: "Jl. Pleburan Raya No.12, Blok 10..." },
    { id: 4, name: "Pleburan - Semarang", address: "Jl. Pleburan Raya No.12, Blok 10..." }
  ];

  const handleSelectLocation = (id:Number) => {
    setSelectedLocation(id);
  };

  const handleSubmit = () => {
    if (selectedLocation) {
      console.log("Selected Location ID:", selectedLocation);
      alert(`Location ID ${selectedLocation} submitted successfully!`);
    } else {
      alert("Please select a location before submitting.");
    }
  };

  return (
    <>
      <div className="text-center mt-5 mb-10">
        <h1 className="text-yellow-600 font-bold text-2xl">Select Location</h1>
      </div>

      <div className="bg-white shadow-xl border p-5 rounded-xl h-max">
        <div className="flex flex-col space-y-4 overflow-y-auto max-h-[600px]">
          {locations.map((location) => (
            <div
              key={location.id}
              className={`flex items-center p-4 rounded-lg group hover:bg-yellow-600 cursor-pointer transition duration-300 ${
                selectedLocation === location.id ? "bg-yellow-600" : "bg-gray-100"
              }`}
              onClick={() => handleSelectLocation(location.id)}
            >
              <div
                className={`text-xl transition duration-300 group-hover:text-white ${
                  selectedLocation === location.id ? "text-white" : "text-yellow-600"
                }`}
              >
                <FaMapMarkerAlt />
              </div>
              <div className="ml-4 flex-1">
                <h2
                  className={`font-bold text-lg transition duration-300 group-hover:text-white ${
                    selectedLocation === location.id ? "text-white" : "text-gray-900"
                  }`}
                >
                  {location.name}
                </h2>
                <p
                  className={`text-sm transition duration-300 group-hover:text-white ${
                    selectedLocation === location.id ? "text-white" : "text-gray-500"
                  }`}
                >
                  {location.address}
                </p>
              </div>
              <div
                className={`text-xl transition duration-300 group-hover:text-white ${
                  selectedLocation === location.id ? "text-white" : "text-gray-400"
                }`}
              >
                <FaBookmark />
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-5 flex justify-between">
          <Link href="/" className="flex items-center px-6 py-2 border rounded-lg text-yellow-600 border-yellow-600">
            <FiChevronLeft className="mr-2" />
            Back
          </Link>
          <Link 
            href="/treatment"
            className="flex items-center px-6 py-2 bg-yellow-600 text-white rounded-lg"
          >
            Select
          </Link>
          {/* <button
            onClick={handleSubmit}
            className="flex items-center px-6 py-2 bg-yellow-600 text-white rounded-lg"
          >
            Select
            <FiChevronRight className="ml-2" />
          </button> */}
        </div>
      </div>
    </>
  )
}

export default Location;