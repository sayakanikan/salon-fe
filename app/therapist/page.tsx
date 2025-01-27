"use client";
import { BiArrowBack } from "react-icons/bi";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useBooking } from "../context/BookingContext";
import { redirect } from "next/navigation";

const Therapist = () => {
  const [selectedTherapists, setSelectedTherapists] = useState<{ [key: number]: number }>({});
  const { details } = useBooking();

  const categories = [
    { id: 1, name: "Haircut" },
    { id: 2, name: "Facial" },
    { id: 3, name: "Nails" },
  ];

  const therapists = [
    { id: 1, category_id: 1, name: "Agus S.", image: "/therapist.jpg", price: 30000 },
    { id: 2, category_id: 1, name: "Agus A.", image: "/therapist.jpg", price: 45000 },
    { id: 3, category_id: 2, name: "Wawan K.", image: "/therapist.jpg", price: 30000 },
    { id: 4, category_id: 2, name: "Wawan T.", image: "/therapist.jpg", price: 30000 },
    { id: 5, category_id: 3, name: "Windah B.", image: "/therapist.jpg", price: 30000 },
    { id: 6, category_id: 3, name: "Brando W.", image: "/therapist.jpg", price: 30000 },
  ];

  const handleSelectTherapist = (categoryId: number, therapistId: number) => {
    setSelectedTherapists((prev) => ({
      ...prev,
      [categoryId]: therapistId,
    }));
  };

  const handleSubmit = () => {
    const allCategoriesSelected = categories.every((category) => selectedTherapists[category.id]);

    if (allCategoriesSelected) {
      console.log("Selected Therapists:", selectedTherapists);
      alert(`Selected Therapists: ${JSON.stringify(selectedTherapists)}`);
      redirect('/customer');
    } else {
      alert("Please select a therapist for each category before submitting.");
    }
  };

  return (
    <>
      <div className="text-center mt-5 mb-10">
        <h1 className="text-yellow-600 font-bold text-2xl">Select Therapist</h1>
      </div>

      <div className="bg-white shadow-xl border p-5 rounded-xl h-max">
        <div className="flex flex-col space-y-4 overflow-y-auto max-h-[500px]">
          {categories.map((category) => (
            <div key={category.id} className="mb-4">
              <h4 className="font-bold text-xl text-gray-800">Therapist for {category.name}</h4>
              <div className="flex space-x-5 overflow-x-auto mt-3">
                {therapists
                  .filter((therapist) => therapist.category_id === category.id)
                  .map((therapist) => (
                    <div
                      key={therapist.id}
                      className={`min-w-[300px] p-4 border rounded-lg group hover:bg-yellow-600 cursor-pointer ${selectedTherapists[category.id] === therapist.id ? "bg-yellow-600 border-yellow-600 text-white" : "bg-gray-50"}`}
                      onClick={() => handleSelectTherapist(category.id, therapist.id)}
                    >
                      <Image src={therapist.image} alt="Therapist" width={100} height={100} className="rounded-lg mx-auto mb-3" />
                      <div className="flex justify-between">
                        <div>
                          <h5 className="font-semibold text-md text-start group-hover:text-white">{therapist.name}</h5>
                          <p className="text-sm text-start group-hover:text-white">Fee: IDR {therapist.price.toLocaleString()}</p>
                        </div>

                        <div className="bg-white rounded-md shadow-lg px-4 text-sm flex gap-2 items-center text-black">
                          <FaStar className="text-yellow-600"/> 5.0 (87)
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-5 flex justify-between">
          <Link href="/date" className="flex items-center py-2 rounded-lg text-yellow-600 hover:text-yellow-600/90">
            <FiChevronLeft />
            Back
          </Link>
          <button
            onClick={handleSubmit}
            className="flex items-center px-6 py-2 bg-yellow-600 text-white rounded-lg"
          >
            Select
            <FiChevronRight />
          </button>
        </div>
      </div>
    </>
  );
};

export default Therapist;
