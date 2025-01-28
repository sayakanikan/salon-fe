"use client";
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
  const { details, setDetails } = useBooking();

  const handleSelectTherapist = (treatmentId: number, therapistId: number) => {
    setSelectedTherapists((prev) => ({
      ...prev,
      [treatmentId]: therapistId,
    }));
  };

  const handleSubmit = () => {
    setIsLoadingButton(true);
    const allTherapiesSelected = details.every((detail) => selectedTherapists[detail.treatment_id]);

    if (allTherapiesSelected) {
      console.log("Selected Therapists:", selectedTherapists);
      const updatedDetails = details.map((detail) => ({
        treatment_id: detail.treatment_id,
        treatment_name: "",
        therapist_id: selectedTherapists[detail.treatment_id],
      }));

      setDetails(updatedDetails);
      redirect("/customer");
    } else {
      alert("Please select a therapist for each treatment before submitting.");
    }
    setIsLoadingButton(false);
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
            detail.treatment_name = response.data?.data.therapist[0].name;
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
            {details.map((detail) => (
              <div key={detail.treatment_id} className="mb-4">
                <h4 className="font-bold text-xl text-gray-800">Therapist for {detail.treatment_name}</h4>
                <div className="flex space-x-5 overflow-x-auto mt-3">
                  {therapistsByTreatment[detail.treatment_id]?.map((therapist) => (
                    <div
                      key={`${detail.treatment_id}-${therapist.id}`}
                      className={`min-w-[300px] p-4 border rounded-lg group hover:bg-yellow-600 cursor-pointer ${selectedTherapists[detail.treatment_id] === therapist.id ? "bg-yellow-600 border-yellow-600 text-white" : "bg-gray-50"}`}
                      onClick={() => handleSelectTherapist(detail.treatment_id, therapist.id)}
                    >
                      <Image src={`${therapist.image ?? "/default.jpg"}`} alt="Therapist" width={100} height={100} className="rounded-full mx-auto mb-3" />
                      <div className="flex justify-between">
                        <div>
                          <h5 className="font-semibold text-md text-start group-hover:text-white">{therapist.name}</h5>
                          <p className="text-sm text-start group-hover:text-white">Fee: IDR {therapist.fee.toLocaleString()}</p>
                        </div>

                        <div className="bg-white rounded-md shadow-lg px-4 text-sm flex gap-2 items-center text-black">
                          <FaStar className="text-yellow-600" /> {therapist.rating} ({therapist.total_treatment.toLocaleString()})
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Buttons */}
        <div className="mt-5 flex justify-between">
          <Link href="/date" className="flex items-center py-2 rounded-lg text-yellow-600 hover:text-yellow-600/90">
            <FiChevronLeft />
            Back
          </Link>
          <button onClick={handleSubmit} className="flex items-center px-6 py-2 bg-yellow-600 text-white rounded-lg" disabled={isLoadingButton}>
            {isLoadingButton ? "Processing..." : "Select"}
            <FiChevronRight />
          </button>
        </div>
      </div>
    </>
  );
};

export default Therapist;
