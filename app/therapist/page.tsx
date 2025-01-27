"use client";
import { BiArrowBack } from "react-icons/bi";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useBooking } from "../context/BookingContext";
import { redirect } from "next/navigation";
import axiosInstance from "@/api/axiosInstance";

const Therapist = () => {
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTherapists, setSelectedTherapists] = useState<{ [key: number]: number }>({});
  const [therapistsByTreatment, setTherapistsByTreatment] = useState<{ [key: number]: any[] }>({});
  const { details, addDetail } = useBooking();

  const handleSelectTherapist = (treatmentId: number, therapistId: number) => {
    setSelectedTherapists((prev) => ({
      ...prev,
      [treatmentId]: therapistId,
    }));
  };

  const handleSubmit = () => {
    const allTherapiesSelected = details.every(
      (detail) => selectedTherapists[detail.treatment_id]
    );

    if (allTherapiesSelected) {
      console.log("Selected Therapists:", selectedTherapists);
      alert(`Selected Therapists: ${JSON.stringify(selectedTherapists)}`);
      redirect('/customer');
    } else {
      alert("Please select a therapist for each treatment before submitting.");
    }
  };

  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        setIsLoading(true);

        if (details && details.length > 0) {
          const fetchedTherapists: { [key: string]: any[] } = {};

          for (const detail of details) {
            const treatmentId = detail.treatment_id;

            const response = await axiosInstance.get(`/therapists/${treatmentId}`);
            fetchedTherapists[response.data?.data.therapist[0].id] = response.data?.data?.therapist[0].therapist || [];
          }

          setTherapistsByTreatment(fetchedTherapists);
        } else {
          console.error("Details data not available.");
        }
      } catch (error) {
        console.error("Error fetching therapist:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTherapists();
  }, [details]);

  return (
    <>
      <div className="text-center mt-5 mb-10">
        <h1 className="text-yellow-600 font-bold text-2xl">Select Therapist</h1>
      </div>

      <div className="bg-white shadow-xl border p-5 rounded-xl h-max">
        <div className="flex flex-col space-y-4 overflow-y-auto max-h-[500px]">
          {details.map((detail) => (
            <div key={detail.treatment_id} className="mb-4">
              <h4 className="font-bold text-xl text-gray-800">
                Therapist for {detail.treatment_id}
              </h4>
              <div className="flex space-x-5 overflow-x-auto mt-3">
                {therapistsByTreatment[detail.treatment_id]?.map((therapist) => (
                  <div
                    key={`${detail.treatment_id}-${therapist.id}`}
                    className={`min-w-[300px] p-4 border rounded-lg group hover:bg-yellow-600 cursor-pointer ${selectedTherapists[detail.treatment_id] === therapist.id ? "bg-yellow-600 border-yellow-600 text-white" : "bg-gray-50"}`}
                    onClick={() => handleSelectTherapist(detail.treatment_id, therapist.id)}
                  >
                    {/* <Image src={`${therapist.image ?? "http://localhost:300/default.jpg"}`} alt="Therapist" width={100} height={100} className="rounded-lg mx-auto mb-3" /> */}
                    <div className="flex justify-between">
                      <div>
                        <h5 className="font-semibold text-md text-start group-hover:text-white">{therapist.name}</h5>
                        <p className="text-sm text-start group-hover:text-white">Fee: IDR {therapist.price}</p>
                      </div>

                      <div className="bg-white rounded-md shadow-lg px-4 text-sm flex gap-2 items-center text-black">
                        <FaStar className="text-yellow-600"/> {therapist.rating} ({therapist.total_treatment})
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
