// src/components/Review.jsx
const Review = ({ review }) => {
    return (
      <div className="review-item">
        <p>{review.review}</p>
        <div className="rating">Rating: {review.rating} Stars</div>
      </div>
    );
  };
  
  export default Review;
  