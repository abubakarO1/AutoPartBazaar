import Footer from "@/components/ui/footer";
import Navbar from "@/components/ui/navbar";
import Link from "next/link"; // Import Link from next

export default function ViewSavedModels() {
  const savedModels = [
    {
      id: 1,
      name: "Saved Model 1",
      image: "/images/savedmodel.jpg",
    },
    {
      id: 2,
      name: "Saved Model 2",
      image: "/images/savedmodel2.jpg",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black text-gray-300">
        {/* Hero Section */}
        <div className="text-center py-10">
          <h1 className="text-4xl font-bold text-red-500">View Saved Models</h1>
          <p className="mt-4 text-gray-400">
            Explore your customized car models saved for future modifications.
          </p>
        </div>

        {/* Saved Models */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-20">
          {savedModels.map((model) => (
            <Link key={model.id} href="/pages/productdetail" passHref>
              <div className="relative cursor-pointer group">
                <img
                  src={model.image}
                  alt={model.name}
                  className="rounded-lg w-full object-cover transition-transform transform group-hover:scale-105 group-hover:shadow-xl"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-xl font-semibold text-red-500">
                    {model.name}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
