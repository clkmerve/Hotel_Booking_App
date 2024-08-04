import React, { useState, useEffect } from 'react';
import { StarOutlined, StarFilled, DeleteOutlined } from '@ant-design/icons';
import { Form, Input, Button, message, Popconfirm } from 'antd';
import { useParams } from 'react-router-dom';
import { getCurrentUsername } from '../../services/AuthService'; // AuthService'den getCurrentUsername fonksiyonunu import et

const Review = () => {
  const { hotelId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const username = getCurrentUsername(); // Kullanıcı adını al

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/reviews/${hotelId}`);
        if (!response.ok) {
          throw new Error('Error fetching reviews');
        }
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [hotelId]);

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hotelId,
          username,
          reviewText,
          rating,
        }),
      });

      if (!response.ok) {
        throw new Error('Error adding review');
      }

      const newReview = await response.json();
      setReviews([...reviews, newReview]);
      setReviewText('');
      setRating(0);
      message.success('Review added successfully');
    } catch (error) {
      console.error('Error adding review:', error);
      message.error('Failed to add review');
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/reviews/${reviewId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error deleting review');
      }

      setReviews(reviews.filter(review => review._id !== reviewId));
      message.success('Review deleted successfully');
    } catch (error) {
      console.error('Error deleting review:', error);
      message.error('Failed to delete review');
    }
  };

  return (
    <div className='room_reviews mt-4'>
      <h4>Reviews ({reviews.length} reviews)</h4>
      <Form onFinish={handleSubmit}>
        <Form.Item>
          <Input.TextArea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder='Write your review here...'
            rows={4}
          />
        </Form.Item>
        <Form.Item>
          <div className='d-flex align-items-center gap-3 mb-4 rating_group'>
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} onClick={() => setRating(star)}>
                {star <= rating ? <StarFilled /> : <StarOutlined />}
              </span>
            ))}
          </div>
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Submit Review
          </Button>
        </Form.Item>
      </Form>
      <div className='reviews_list'>
        {reviews.map((review) => (
          <div key={review._id} className='review_item'>
            <p><strong>{review.username}</strong></p>
            <p>{review.reviewText}</p>
            <div className='d-flex align-items-center gap-1'>
              {[...Array(review.rating)].map((_, i) => (
                <StarFilled key={i} />
              ))}
              {[...Array(5 - review.rating)].map((_, i) => (
                <StarOutlined key={i} />
              ))}
            </div>
            {review.username === username && (
              <Popconfirm
                title="Are you sure to delete this review?"
                onConfirm={() => handleDeleteReview(review._id)}
                okText="Yes"
                cancelText="No"
              >
                <Button icon={<DeleteOutlined />} type="link" danger>
                  Delete
                </Button>
              </Popconfirm>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review;
