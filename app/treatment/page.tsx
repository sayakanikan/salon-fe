"use client";
import { BiArrowBack } from "react-icons/bi";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiChevronLeft } from "react-icons/fi";

const Treatment = () => {
  const [selectedTreatments, setSelectedTreatments] = useState<{ [key: number]: number }>({});

  const categories = [
    { id: 1, name: "Haircut" },
    { id: 2, name: "Facial" },
    { id: 3, name: "Nails" },
  ];

  const treatments = [
    { id: 1, category_id: 1, name: "Premium Haircut", image: "/treatment.jpg", price: 30000 },
    { id: 2, category_id: 1, name: "Haircut & Treatment", image: "/treatment.jpg", price: 45000 },
    { id: 3, category_id: 2, name: "Facial", image: "/treatment.jpg", price: 30000 },
    { id: 4, category_id: 2, name: "Facial", image: "/treatment.jpg", price: 30000 },
    { id: 5, category_id: 3, name: "Nail Art", image: "/treatment.jpg", price: 30000 },
    { id: 6, category_id: 3, name: "Nail Art", image: "/treatment.jpg", price: 30000 },
  ];

  const handleSelectTreatment = (categoryId: number, treatmentId: number) => {
    setSelectedTreatments((prev) => ({
      ...prev,
      [categoryId]: treatmentId,
    }));
  };

  const handleSubmit = () => {
    const allCategoriesSelected = categories.every((category) => selectedTreatments[category.id]);

    if (allCategoriesSelected) {
      console.log("Selected Treatments:", selectedTreatments);
      alert(`Selected Treatments: ${JSON.stringify(selectedTreatments)}`);
    } else {
      alert("Please select a treatment for each category before submitting.");
    }
  };

  return (
    <>
      <div className="text-center mt-5 mb-10">
        <h1 className="text-yellow-600 font-bold text-2xl">Select Treatment</h1>
      </div>

      <div className="bg-white shadow-xl border p-5 rounded-xl h-max">
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
                      <Image src={treatment.image} alt="Treatment" width={100} height={100} className="rounded-full mx-auto" />
                      <h5 className="font-semibold text-lg text-center group-hover:text-white">{treatment.name}</h5>
                      <p className="text-sm text-center group-hover:text-white">Price: IDR {treatment.price.toLocaleString()}</p>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-5 flex justify-between">
          <Link href="/location" className="flex items-center px-6 py-2 border rounded-lg text-yellow-600 border-yellow-600">
            <FiChevronLeft className="mr-2" />
            Back
          </Link>
          <Link href="/date" className="flex items-center px-6 py-2 bg-yellow-600 text-white rounded-lg">
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
  );
};

export default Treatment;
