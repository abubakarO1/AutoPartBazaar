const ProductDetailsSection = ({ product, stars }) => {
    return (
      <div className="md:w-1/3 lg:w-2/5 text-gray-100">
        <h1 className="text-2xl font-semibold">{product.name}</h1>
        <p className="text-sm mt-1">Category: {product.category}</p>
        <p className="text-sm">Make: {product.make}</p>
        <p className="text-sm">City: {product.city}</p>
  
        <div className="flex items-center mt-4">
          {Array.from({ length: stars.fullStars }).map((_, i) => (
            <span key={`full-${i}`} className="text-yellow-500">&#9733;</span>
          ))}
          {stars.halfStar && <span className="text-yellow-500">&#9734;</span>}
          {Array.from({ length: stars.emptyStars }).map((_, i) => (
            <span key={`empty-${i}`} className="text-gray-400">&#9734;</span>
          ))}
          <span className="ml-2 text-gray-400">({product.totalRatings} ratings)</span>
        </div>
  
        <div className="flex items-center mt-4">
          <span className="text-2xl font-semibold text-red-600">${product.price}</span>
          {product.sale && (
            <span className="ml-2 text-gray-500 line-through">${product.originalPrice}</span>
          )}
        </div>
  
        <p className="mt-4">{product.description}</p>
  
        <ul className="mt-4 space-y-2 text-gray-300">
          <li>
            <span className="font-semibold">Sale:</span> {product.sale ? "Yes" : "No"}
          </li>
          <li>
            <span className="font-semibold">Free Shipping:</span>{" "}
            {product.freeShipping ? "Yes" : "No"}
          </li>
        </ul>
  
        <div className="mt-6 flex gap-4">
          <button className="bg-black text-white px-6 py-2 rounded-lg shadow hover:bg-gray-800">
            Add to Cart
          </button>
          <button className="bg-red-600 text-white px-6 py-2 rounded-lg shadow hover:bg-red-700">
            Buy Now
          </button>
        </div>
      </div>
    );
  };
  
  export default ProductDetailsSection;
  