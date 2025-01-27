import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";
import { FiChevronLeft } from "react-icons/fi";

const Customer = () => {
  return (
    <>
      <div className="text-center mt-5 mb-10">
        <h1 className="text-yellow-600 font-bold text-2xl">Preview</h1>
      </div>

      <div className="bg-white w-full shadow-xl border p-5 rounded-xl h-max">
        <h4 className="font-bold text-lg mb-4">Customer Information</h4>
        <div className="flex flex-col space-y-4 overflow-y-auto max-h-[500px]">
          <form className="w-full mx-auto">
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900">Name</label>
              <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5" placeholder="Input Name" required />
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900">Email</label>
              <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5" placeholder="Input Email" required />
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900">Phone</label>
              <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5" placeholder="Input Phone" required />
            </div>
          </form>
        </div>

        <div className="mt-5 flex justify-between">
          <Link href="/therapist" className="flex items-center px-6 py-2 border rounded-lg text-yellow-600 border-yellow-600">
            <FiChevronLeft className="mr-2" />
            Back
          </Link>
          <Link href="/booking" className="flex items-center px-6 py-2 bg-yellow-600 text-white rounded-lg">
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

export default Customer;
