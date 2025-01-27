import Link from "next/link";

const Register = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center p-4">
      <div className="text-center mb-10">
        <h1 className="text-yellow-600 font-bold text-2xl">Register</h1>
        <h1 className="text-yellow-600 font-bold text-2xl">Salonku Booking Online</h1>
      </div>

      <form className="w-full mx-auto">
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">Name</label>
          <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5" required />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">Email</label>
          <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5" required />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">Password</label>
          <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5" required />
        </div>
        <button type="submit" className="text-white bg-yellow-600 hover:bg-yellow-600/90 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center">
          Register Account
        </button>
      </form>
    </div>
  );
};

export default Register;
