const ProductRatingSection = ({ userRating, handleRatingChange, userReview, handleReviewChange, handleSubmitReview }) => {
    return (
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-white">Give your rating:</h3>
        <div className="flex items-center mt-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`cursor-pointer text-2xl ${star <= userRating ? "text-yellow-500" : "text-gray-400"}`}
              onClick={() => handleRatingChange(star)}
            >
              &#9733;
            </span>
          ))}
        </div>
        <textarea
          value={userReview}
          onChange={handleReviewChange}
          placeholder="Write a review..."
          rows="4"
          className="mt-4 w-full p-2 border border-gray-300 rounded-lg bg-gray-800 text-gray-100"
        />
        <button
          onClick={handleSubmitReview}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg shadow hover:bg-blue-700"
        >
          Submit Review
        </button>
      </div>
    );
  };
  
  export default ProductRatingSection;
  