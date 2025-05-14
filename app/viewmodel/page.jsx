
// "use client";

// import React, { useState } from "react";
// import Navbar from "@/components/ui/navbar";
// import Footer from "@/components/ui/footer";

// const CarSearch = () => {
//   const [selectedMake, setSelectedMake] = useState("");
//   const [selectedModel, setSelectedModel] = useState("");
//   const [selectedYear, setSelectedYear] = useState("");

//   const carModels = {
//     Toyota: ["Corolla", "Yaris"],
//     Honda: ["City", "Civic"],
//     Suzuki: ["Cultus", "WagonR", "Alto"],
//   };

//   const years = ["2021", "2022", "2023", "2024"];

//   const handleShowModel = () => {
//     console.log("Selected Car:", { selectedMake, selectedModel, selectedYear });
//     // You can add further functionality here
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="flex justify-center items-center min-h-screen bg-#2A2A2A text-gray-300 px-4">
//         <div className="w-full max-w-2xl bg-#2A2A2A p-10 rounded-lg shadow-xl text-center">
//           <h2 className="text-3xl font-bold text-gray-100 mb-8">Search for Cars</h2>

//           {/* Select Make */}
//           <div className="mb-6">
//             <label className="block text-lg font-medium text-gray-100 mb-2">Select Make</label>
//             <select
//               value={selectedMake}
//               onChange={(e) => {
//                 setSelectedMake(e.target.value);
//                 setSelectedModel("");
//                 setSelectedYear("");
//               }}
//               className="w-full border border-gray-500 bg-gray-900 text-gray-100 rounded-lg px-4 py-3 text-lg focus:ring-4 focus:ring-red-500"
//             >
//               <option value="">Choose Make</option>
//               {Object.keys(carModels).map((make) => (
//                 <option key={make} value={make}>
//                   {make}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Select Model */}
//           {selectedMake && (
//             <div className="mb-6">
//               <label className="block text-lg font-medium text-gray-100 mb-2">Select Car</label>
//               <select
//                 value={selectedModel}
//                 onChange={(e) => setSelectedModel(e.target.value)}
//                 className="w-full border border-gray-500 bg-gray-900 text-gray-100 rounded-lg px-4 py-3 text-lg focus:ring-4 focus:ring-red-500"
//               >
//                 <option value="">Choose Model</option>
//                 {carModels[selectedMake].map((model) => (
//                   <option key={model} value={model}>
//                     {model}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           )}

//           {/* Select Year */}
//           {selectedModel && (
//             <div className="mb-6">
//               <label className="block text-lg font-medium text-gray-100 mb-2">Select Model</label>
//               <select
//                 value={selectedYear}
//                 onChange={(e) => setSelectedYear(e.target.value)}
//                 className="w-full border border-gray-500 bg-gray-900 text-gray-100 rounded-lg px-4 py-3 text-lg focus:ring-4 focus:ring-red-500"
//               >
//                 <option value="">Choose Year</option>
//                 {years.map((year) => (
//                   <option key={year} value={year}>
//                     {year}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           )}

//           {/* Show Model Button */}
//           {selectedYear && (
//             <button
//               onClick={handleShowModel}
//               className="mt-4 w-full bg-red-500 text-white py-3 text-lg rounded-lg hover:bg-red-700 transition-all"
//             >
//               Show Model
//             </button>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default CarSearch;

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";

const CarSearch = () => {
  const router = useRouter();
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedCar, setSelectedCar] = useState(""); 
  const [selectedYear, setSelectedYear] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const carModels = {
    Toyota: ["Corolla", "Yaris"],
    Honda: ["City", "Civic"],
    BMW: ["i8", "e46"],
  };

  const years = ["2021", "2022", "2023", "2024"];

  const handleShowModel = async () => {
    setError(null);
    setLoading(true);

    if (!selectedMake || !selectedCar || !selectedYear) {
      setError("⚠️ Please select all fields before searching.");
      setLoading(false);
      return;
    }

    try {
      // 👇 Custom route override for BMW 2021
      if (selectedMake === "BMW" && selectedYear === "2021") {
        router.push("/pages/garage1");
        return;
      }
    
      const apiUrl = `/api/getCarModel?make=${selectedMake}&car=${selectedCar}&model=${selectedYear}`;    
      console.log("🔍 Fetching Model:", apiUrl);

      const res = await fetch(apiUrl);
      if (!res.ok) throw new Error("Failed to fetch data");

      const data = await res.json();
      console.log("✅ API Response:", data);

      if (data.success && data.modelUrl) {
        router.push(`/pages/garage?modelUrl=${encodeURIComponent(data.modelUrl)}`);
      } else {
        setError("❌ Model not found. Please try again.");
      }
    } catch (error) {
      setError("❌ Error fetching car model. Please check your connection.");
      console.error("❌ Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-gray-300 px-4">
        <div className="w-full max-w-2xl bg-gray-800 p-10 rounded-lg shadow-xl text-center">
          <h2 className="text-3xl font-bold text-gray-100 mb-8">Search for Cars</h2>

          {/* Select Make */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-100 mb-2">Select Make</label>
            <select
              value={selectedMake}
              onChange={(e) => {
                setSelectedMake(e.target.value);
                setSelectedCar("");
                setSelectedYear("");
                setError(null);
              }}
              className="w-full border border-gray-500 bg-gray-900 text-gray-100 rounded-lg px-4 py-3 text-lg focus:ring-4 focus:ring-red-500"
            >
              <option value="">Choose Make</option>
              {Object.keys(carModels).map((make) => (
                <option key={make} value={make}>
                  {make}
                </option>
              ))}
            </select>
          </div>

          {/* Select Model */}
          {selectedMake && (
            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-100 mb-2">Select Model</label>
              <select
                value={selectedCar}
                onChange={(e) => {
                  setSelectedCar(e.target.value);
                  setSelectedYear("");
                  setError(null);
                }}
                className="w-full border border-gray-500 bg-gray-900 text-gray-100 rounded-lg px-4 py-3 text-lg focus:ring-4 focus:ring-red-500"
              >
                <option value="">Choose Model</option>
                {carModels[selectedMake].map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Select Year */}
          {selectedCar && (
            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-100 mb-2">Select Year</label>
              <select
                value={selectedYear}
                onChange={(e) => {
                  setSelectedYear(e.target.value);
                  setError(null);
                }}
                className="w-full border border-gray-500 bg-gray-900 text-gray-100 rounded-lg px-4 py-3 text-lg focus:ring-4 focus:ring-red-500"
              >
                <option value="">Choose Year</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Show Model Button */}
          {selectedYear && (
            <button
              onClick={handleShowModel}
              className={`mt-4 w-full py-3 text-lg rounded-lg transition-all ${
                loading ? "bg-gray-600 cursor-not-allowed" : "bg-red-500 hover:bg-red-700"
              } text-white`}
              disabled={loading}
            >
              {loading ? "Loading..." : "Show Model"}
            </button>
          )}

          {/* Error Message */}
          {error && <p className="mt-4 text-red-500 font-semibold">{error}</p>}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CarSearch;
