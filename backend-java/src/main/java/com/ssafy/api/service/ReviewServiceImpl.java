package com.ssafy.api.service;

import com.ssafy.api.request.review.ReviewPostReq;
import com.ssafy.db.entity.Lecture;
import com.ssafy.db.entity.Review;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service("ReviewService")
public class ReviewServiceImpl implements ReviewService{

    @Autowired
    ReviewRepository reviewRepository;

    @Override
    public Review createReview(ReviewPostReq reviewPostReq) {
        Review review = new Review();
        review.setReviewId(reviewPostReq.getReviewId());
        return reviewRepository.save(review);
    }

    @Override
    public List<Review> findByLecIdOrderByReviewId(Lecture lecture) {
        return reviewRepository.findByLecIdOrderByReviewId(lecture);
    }

    @Override
    public Integer deleteReview(Lecture lecture, User user, int reviewId) {
        reviewRepository.deleteByReviewId(lecture, user, reviewId);
        return null;
    }
}
