"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");

    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    router.push("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const tokenCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));

    if (token && tokenCookie) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <>
      <div className="text-center mt-5">
        <h1 className="text-yellow-600 font-bold text-2xl">SALONKU</h1>
        <h2 className="text-yellow-600 font-bold text-xl">BOOKING ONLINE</h2>
      </div>

      <div className="bg-yellow-600 p-6 pb-8 rounded-lg my-5">
        <h1 className="text-2xl font-semibold text-white">
          Hello <span className="font-bold">There,</span>
        </h1>
        <p className="text-white mt-2 mb-7">Let's take care of your beauty</p>
        <div className="flex justify-between">
          <Link href="/location" className="bg-white text-yellow-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-100">
            Book Now
          </Link>
          {isAuthenticated && (
            <button onClick={handleLogout} className="bg-white border-red-500 border-2 text-red-500 font-bold py-2 px-6 rounded-lg hover:bg-red-600 hover:text-white hover:border-red-600">
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Static Feed Section */}
      <div className="my-5">
        <h3 className="text-gray-700 font-bold text-lg">Feed for you</h3>
        <div className="flex space-x-5 overflow-x-auto mt-3">
          <div className="min-w-[250px] bg-white rounded-lg shadow-md">
            <Image src="/salon.jpg" alt="Beauty Routine" width={300} height={200} className="rounded-t-lg" />
            <div className="p-3">
              <h4 className="font-bold text-gray-800">5 Advice for your beauty routine</h4>
              <p className="text-gray-600 text-sm mt-2">Lorem ipsum dolor sit amet consectetur. At augue scelerisque rutrum id. Tellus adipiscing massa ac in tristique interdum at.</p>
            </div>
          </div>
          <div className="min-w-[250px] bg-white rounded-lg shadow-md">
            <Image src="/hair-treatment.jpg" alt="Beauty Routine" width={300} height={200} className="rounded-t-lg" />
            <div className="p-3">
              <h4 className="font-bold text-gray-800">Best product for your hair treatment</h4>
              <p className="text-gray-600 text-sm mt-2">Lorem ipsum dolor sit amet consectetur. At augue scelerisque rutrum id. Tellus adipiscing massa ac in tristique interdum at.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
