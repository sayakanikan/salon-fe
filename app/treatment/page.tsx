"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useBooking } from "../context/BookingContext";
import { redirect } from "next/navigation";
import axiosInstance from "@/api/axiosInstance";

const Treatment = () => {
  const [selectedTreatments, setSelectedTreatments] = useState<{ [key: number]: number }>({});
  const [treatments, setTreatments] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const { addDetail, location_id } = useBooking();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);

  const handleSelectTreatment = (categoryId: number, treatmentId: number) => {
    setSelectedTreatments((prev) => ({
      ...prev,
      [categoryId]: treatmentId,
    }));

    addDetail({ treatment_id: treatmentId, therapist_id: 0 });
  };

  const handleSubmit = () => {
    setIsLoadingButton(true);
    if (selectedTreatments[1] != null) {
      console.log("Selected Treatments:", selectedTreatments);
      redirect("/date");
    } else {
      alert("Please select at least one treatment before submitting.");
    }
    setIsLoadingButton(false);
  };

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setIsLoading(true);
        console.log(location_id);
        const response = await axiosInstance.get("/treatments/" + location_id);
        console.log(response.data.data);
        setTreatments(response.data?.data.treatment);
        setCategories(response.data?.data.category);
      } catch (error) {
        console.error("Error fetching treatment:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocations();
  }, []);

  return (
    <>
      <div className="text-center mt-5 mb-10">
        <h1 className="text-yellow-600 font-bold text-2xl">Select Treatment</h1>
      </div>

      <div className="bg-white shadow-xl border p-5 rounded-xl h-max">
        {isLoading ? (
          <div className="flex justify-center items-center h-60">
            <div role="status">
              <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin fill-yellow-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col space-y-4 overflow-y-auto max-h-[500px]">
            {categories.map((category) => (
              <div key={category.id} className="mb-4">
                <h4 className="font-bold text-xl text-gray-800">{category.name}</h4>
                <div className="flex space-x-5 overflow-x-auto mt-3">
                  {treatments
                    .filter((treatment) => treatment.category_id === category.id)
                    .map((treatment) => (
                      <div
                        key={treatment.id}
                        className={`min-w-[250px] p-4 border rounded-lg group hover:bg-yellow-600 cursor-pointer ${selectedTreatments[category.id] === treatment.id ? "bg-yellow-600 border-yellow-600 text-white" : "bg-gray-50"}`}
                        onClick={() => handleSelectTreatment(category.id, treatment.id)}
                      >
                        <h5 className="font-semibold text-lg text-center group-hover:text-white">{treatment.name}</h5>
                        <p className="text-sm text-center group-hover:text-white">Price: IDR {treatment.price.toLocaleString()}</p>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Buttons */}
        <div className="mt-5 flex justify-between">
          <Link href="/location" className="flex items-center py-2 rounded-lg text-yellow-600 hover:text-yellow-600/90">
            <FiChevronLeft />
            Back
          </Link>
          <button onClick={handleSubmit} className="flex items-center px-6 py-2 bg-yellow-600 text-white rounded-lg" disabled={isLoadingButton}>
            Select
            <FiChevronRight />
          </button>
        </div>
      </div>
    </>
  );
};

export default Treatment;
