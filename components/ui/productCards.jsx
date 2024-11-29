import Image from "next/image";

const ProductCard = ({ image, title, description, price }) => {
  return (
    <div className="bg-black border-2 border-gray-500 rounded-2xl p-5 cursor-pointer hover:-translate-y-2 transition-all relative">
      
      <div className="w-5/6 h-[210px] overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-2 mb-4">
        <Image
          src={image}
          alt={title}
          className="h-full w-full object-contain"
          width={300}
          height={210}
        />
      </div>
      
      <div>
        <h3 className="text-lg font-extrabold text-gray-200">{title}</h3>
        <p className="text-gray-300 text-sm mt-2">{description}</p>
        
        {/* Price */}
        <h4 className="text-lg text-gray-300 font-bold mt-4">Rs {price}</h4>
        
        {/* Add to Cart Button */}
        <button className="mt-4 px-6 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-all">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
