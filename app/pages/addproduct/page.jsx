// "use client"; // Ensure this is client-side rendering for this page

// import React, { useState } from "react";

// const AddProductPage = () => {
//   const [product, setProduct] = useState({
//     productId: "",
//     name: "",
//     price: "",
//     originalPrice: "",
//     category: "",
//     make: "",
//     city: "",
//     sale: false,
//     freeShipping: false,
//     image: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setProduct((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   // Validate form data
//   const validateForm = () => {
//     const { productId, name, price, category } = product;
//     if (!productId || !name || !price || !category) {
//       return "Please fill in all required fields.";
//     }
//     return null;
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const validationError = validateForm();
//     if (validationError) {
//       setError(validationError);
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch("/api/addproduct", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(product),
//       });

//       if (response.ok) {
//         alert("Product added successfully!");
//         setProduct({
//           productId: "",
//           name: "",
//           price: "",
//           originalPrice: "",
//           category: "",
//           make: "",
//           city: "",
//           sale: false,
//           freeShipping: false,
//           image: "",
//         });
//       } else {
//         const errorData = await response.json();
//         setError(errorData.error || "Failed to add product.");
//       }
//     } catch (error) {
//       console.error("Error adding product:", error);
//       setError("An error occurred while adding the product.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="min-h-screen flex items-start justify-start p-12"
//       style={{
//         backgroundImage: `url('/images/car1.jpg')`,
//         backgroundRepeat: "no-repeat",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       <form
//         onSubmit={handleSubmit}
//         className="space-y-6 text-white w-full max-w-md bg-opacity-70 bg-black p-6 rounded shadow-lg"
//       >
//         <h1 className="text-3xl font-bold text-gradient mb-6">Add Product</h1>

//         {/* Error Message */}
//         {error && (
//           <div className="mb-4 text-red-500 text-lg font-semibold">{error}</div>
//         )}

//         {/* Product ID */}
//         <div>
//           <label className="block mb-2 text-lg font-medium text-gradient">Product ID</label>
//           <input
//             type="text"
//             name="productId"
//             value={product.productId}
//             onChange={handleChange}
//             className="w-full p-2 bg-transparent border border-gray-500 rounded text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
//             placeholder="Enter product ID"
//             required
//           />
//         </div>

//         {/* Product Name */}
//         <div>
//           <label className="block mb-2 text-lg font-medium text-gradient">Product Name</label>
//           <input
//             type="text"
//             name="name"
//             value={product.name}
//             onChange={handleChange}
//             className="w-full p-2 bg-transparent border border-gray-500 rounded text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
//             placeholder="Enter product name"
//             required
//           />
//         </div>

//         {/* Price */}
//         <div>
//           <label className="block mb-2 text-lg font-medium text-gradient">Price</label>
//           <input
//             type="number"
//             name="price"
//             value={product.price}
//             onChange={handleChange}
//             className="w-full p-2 bg-transparent border border-gray-500 rounded text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
//             placeholder="Enter price"
//             required
//           />
//         </div>

//         {/* Original Price */}
//         <div>
//           <label className="block mb-2 text-lg font-medium text-gradient">Original Price (Optional)</label>
//           <input
//             type="number"
//             name="originalPrice"
//             value={product.originalPrice}
//             onChange={handleChange}
//             className="w-full p-2 bg-transparent border border-gray-500 rounded text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
//             placeholder="Enter original price"
//           />
//         </div>

//         {/* Category */}
//         <div>
//           <label className="block mb-2 text-lg font-medium text-gradient">Category</label>
//           <select
//             name="category"
//             value={product.category}
//             onChange={handleChange}
//             className="w-full p-2 bg-transparent border border-gray-500 rounded text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
//             required
//           >
//             <option value="" className="text-black">
//               Select Category
//             </option>
//             <option value="Engine" className="text-black">Engine</option>
//             <option value="Filters" className="text-black">Filters</option>
//             <option value="Brakes" className="text-black">Brakes</option>
//             <option value="Electrical" className="text-black">Electrical</option>
//           </select>
//         </div>

//         {/* Make */}
//         <div>
//           <label className="block mb-2 text-lg font-medium text-gradient">Make</label>
//           <input
//             type="text"
//             name="make"
//             value={product.make}
//             onChange={handleChange}
//             className="w-full p-2 bg-transparent border border-gray-500 rounded text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
//             placeholder="Enter make"
//           />
//         </div>

//         {/* City */}
//         <div>
//           <label className="block mb-2 text-lg font-medium text-gradient">City</label>
//           <input
//             type="text"
//             name="city"
//             value={product.city}
//             onChange={handleChange}
//             className="w-full p-2 bg-transparent border border-gray-500 rounded text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
//             placeholder="Enter city"
//           />
//         </div>

//         {/* Sale */}
//         <div>
//           <label className="block mb-2 text-lg font-medium flex items-center text-gradient">
//             <input
//               type="checkbox"
//               name="sale"
//               checked={product.sale}
//               onChange={handleChange}
//               className="mr-2"
//             />
//             On Sale
//           </label>
//         </div>

//         {/* Free Shipping */}
//         <div>
//           <label className="block mb-2 text-lg font-medium flex items-center text-gradient">
//             <input
//               type="checkbox"
//               name="freeShipping"
//               checked={product.freeShipping}
//               onChange={handleChange}
//               className="mr-2"
//             />
//             Free Shipping
//           </label>
//         </div>

//         {/* Image URL */}
//         <div>
//           <label className="block mb-2 text-lg font-medium text-gradient">Image URL</label>
//           <input
//             type="text"
//             name="image"
//             value={product.image}
//             onChange={handleChange}
//             className="w-full p-2 bg-transparent border border-gray-500 rounded text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
//             placeholder="Enter image URL"
//           />
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full p-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition-all"
//           disabled={loading}
//         >
//           {loading ? "Adding Product..." : "Add Product"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddProductPage;

// AddProductForm.jsx (for adding a product)
"use client"; // Ensure this is client-side rendering for this page

import React, { useState } from "react";

const AddProductForm = () => {
  const [product, setProduct] = useState({
    productId: "",
    name: "",
    price: "",
    originalPrice: "",
    category: "",
    make: "",
    city: "",
    sale: false,
    freeShipping: false,
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Validate form data
  const validateForm = () => {
    const { productId, name, price, category } = product;
    if (!productId || !name || !price || !category) {
      return "Please fill in all required fields.";
    }
    return null;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Create a new FormData object to handle both product data and image file
      const formDataToSend = new FormData();
      // Append form data
      Object.keys(product).forEach((key) => {
        if (key !== "image") {
          formDataToSend.append(key, product[key]);
        }
      });
      
      // Append the image file if present
      if (product.image) {
        formDataToSend.append("image", product.image);
      }

      // Step 2: Send the product data (including image) to the API
      const response = await fetch("/api/addproduct", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        alert("Product added successfully!");
        setProduct({
          productId: "",
          name: "",
          price: "",
          originalPrice: "",
          category: "",
          make: "",
          city: "",
          sale: false,
          freeShipping: false,
          image: null,
        });
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to add product.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      setError("An error occurred while adding the product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-start justify-start p-12"
      style={{
        backgroundImage: `url('/images/car1.jpg')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-6 text-white w-full max-w-md bg-opacity-70 bg-black p-6 rounded shadow-lg"
      >
        <h1 className="text-3xl font-bold text-gradient mb-6">Add Product</h1>

        {/* Error Message */}
        {error && (
          <div className="mb-4 text-red-500 text-lg font-semibold">{error}</div>
        )}

        {/* Product ID */}
        <div>
          <label className="block mb-2 text-lg font-medium text-gradient">
            Product ID
          </label>
          <input
            type="text"
            name="productId"
            value={product.productId}
            onChange={handleChange}
            className="w-full p-2 bg-transparent border border-gray-500 rounded text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Enter product ID"
            required
          />
        </div>

        {/* Product Name */}
        <div>
          <label className="block mb-2 text-lg font-medium text-gradient">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="w-full p-2 bg-transparent border border-gray-500 rounded text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Enter product name"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block mb-2 text-lg font-medium text-gradient">Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="w-full p-2 bg-transparent border border-gray-500 rounded text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Enter price"
            required
          />
        </div>

        {/* Original Price */}
        <div>
          <label className="block mb-2 text-lg font-medium text-gradient">
            Original Price (Optional)
          </label>
          <input
            type="number"
            name="originalPrice"
            value={product.originalPrice}
            onChange={handleChange}
            className="w-full p-2 bg-transparent border border-gray-500 rounded text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Enter original price"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-2 text-lg font-medium text-gradient">Category</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="w-full p-2 bg-transparent border border-gray-500 rounded text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          >
            <option value="" className="text-black">
              Select Category
            </option>
            <option value="Engine" className="text-black">Engine</option>
            <option value="Filters" className="text-black">Filters</option>
            <option value="Brakes" className="text-black">Brakes</option>
            <option value="Electrical" className="text-black">Electrical</option>
          </select>
        </div>

        {/* Make */}
        <div>
          <label className="block mb-2 text-lg font-medium text-gradient">Make</label>
          <input
            type="text"
            name="make"
            value={product.make}
            onChange={handleChange}
            className="w-full p-2 bg-transparent border border-gray-500 rounded text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Enter make"
          />
        </div>

        {/* City */}
        <div>
          <label className="block mb-2 text-lg font-medium text-gradient">City</label>
          <input
            type="text"
            name="city"
            value={product.city}
            onChange={handleChange}
            className="w-full p-2 bg-transparent border border-gray-500 rounded text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Enter city"
          />
        </div>

        {/* Sale */}
        <div>
          <label className="block mb-2 text-lg font-medium flex items-center text-gradient">
            <input
              type="checkbox"
              name="sale"
              checked={product.sale}
              onChange={handleChange}
              className="mr-2"
            />
            On Sale
          </label>
        </div>

        {/* Free Shipping */}
        <div>
          <label className="block mb-2 text-lg font-medium flex items-center text-gradient">
            <input
              type="checkbox"
              name="freeShipping"
              checked={product.freeShipping}
              onChange={handleChange}
              className="mr-2"
            />
            Free Shipping
          </label>
        </div>

        {/* Product Image */}
        <div>
          <label className="block mb-2 text-lg font-medium text-gradient">Product Image</label>
          <input
            type="file"
            name="image"
            onChange={(e) => setProduct({ ...product, image: e.target.files[0] })}
            className="w-full p-2 bg-transparent border border-gray-500 rounded text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition-all"
          disabled={loading}
        >
          {loading ? "Adding Product..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;





