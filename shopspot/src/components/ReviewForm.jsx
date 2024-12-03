// src/components/ReviewForm.jsx
import { useState } from 'react';

const ReviewForm = ({ addReview }) => {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (review.trim()) {
      addReview({ review, rating });
      setReview('');
      setRating(1);
    }
  };

  return (
    <div className="review-form-container">
      <h2>Submit Your Review</h2>
      <form onSubmit={handleSubmit} className="review-form">
        <textarea
          placeholder="Write your review..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required
        />
        <div>
          <label htmlFor="rating">Rating:</label>
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
        </div>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default ReviewForm;
