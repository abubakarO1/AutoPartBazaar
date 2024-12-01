import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Import Swiper styles

const ProductImageSection = ({ product, currentImage, setCurrentImage, swiperRef }) => {
  return (
    <div className="md:w-3/4 lg:w-2/3 xl:w-2/3 mx-auto"> {/* Increased width for the main image section */}
      <div className="relative">
        <Swiper
          spaceBetween={10} // Space between slides
          slidesPerView={1} // Only 1 image visible at a time
          loop={true} // Loop images infinitely
          navigation={false} // Remove navigation arrows
          pagination={{ clickable: true }} // Enable clickable pagination
          className="rounded-lg"
          onSlideChange={(swiper) => {
            setCurrentImage(swiper.slides[swiper.activeIndex].querySelector('img').src);
          }}
          ref={swiperRef}
        >
          {/* Main Image as the first slide */}
          <SwiperSlide>
            <div className="w-full h-[600px] mx-auto flex justify-center items-center"> {/* Increased height */}
              <img
                src={currentImage}
                alt="Main product image"
                className="w-full h-full object-contain rounded-lg shadow-lg" // Ensure object-contain to maintain aspect ratio
              />
            </div>
          </SwiperSlide>

          {/* Additional Images */}
          {product.additionalImages.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="w-full h-[600px] mx-auto flex justify-center items-center"> {/* Increased height */}
                <img
                  src={image}
                  alt={`Product image ${index + 1}`}
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Image Thumbnails (Mini Preview) */}
      <div className="mt-4">
        <div className="flex space-x-2 overflow-x-auto pb-4 scrollbar-hidden">
          {[product.image, ...product.additionalImages].map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className={`w-24 h-24 object-cover rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                currentImage === image ? "border-2 border-yellow-500" : "border-2 border-transparent"
              }`}
              onClick={() => setCurrentImage(image)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductImageSection;
