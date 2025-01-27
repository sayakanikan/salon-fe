import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";
import { FiChevronLeft } from "react-icons/fi";

const Customer = () => {
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
            <span className="text-gray-600">ID Trans</span>
            <span className="font-semibold">A2023060600001</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Customer</span>
            <span className="font-semibold">Lilya Amanda</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Location</span>
            <span className="font-semibold">Cabang 1</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Phone No</span>
            <span className="font-semibold">+62 812 3231 231</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Treatment</span>
            <span className="font-semibold">Lorem Ipsum 1 (Category A)</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600"></span>
            <span className="font-semibold">Lorem Ipsum 2 (Category B)</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Therapist</span>
            <span className="font-semibold">Natalia Kennedy Nasution</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Date</span>
            <span className="font-semibold">Sunday, 18 June 2023</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600"></span>
            <span className="font-semibold">08:00</span>
          </div>
        </div>

        <p className="font-bold text-md mb-4">Payment Detail</p>

        <div className="border p-4 rounded-lg mb-5">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Lorem Ipsum (Category 1)</span>
            <span className="font-semibold">IDR 120.000</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Lorem Ipsum (Category 1)</span>
            <span className="font-semibold">IDR 70.000</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Service</span>
            <span className="font-semibold">IDR 80.000</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between">
            <span className="font-bold">Total</span>
            <span className="font-bold text-yellow-600">Rp. 270.000</span>
          </div>
        </div>

        <button className="w-full bg-yellow-600 text-white py-2 rounded-lg font-semibold">
          Submit
        </button>
      </div>
    </>
  );
};

export default Customer;
