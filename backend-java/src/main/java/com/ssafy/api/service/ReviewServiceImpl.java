package com.ssafy.api.service;

import com.ssafy.api.request.review.ReviewPostReq;
import com.ssafy.api.response.Review.ReviewGetRes;
import com.ssafy.db.entity.Instructor;
import com.ssafy.db.entity.Lecture;
import com.ssafy.db.entity.Review;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.LectureRepository;
import com.ssafy.db.repository.ReviewRepository;
import com.ssafy.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service("ReviewService")
public class ReviewServiceImpl implements ReviewService{

    @Autowired
    ReviewRepository reviewRepository;

    @Autowired
    LectureRepository lectureRepository;

    @Autowired
    UserRepository userRepository;

    // 리뷰 생성
    @Override
    public Review createReview(ReviewPostReq reviewPostReq) {
        Optional<Lecture> lec = lectureRepository.findById(reviewPostReq.getLecId());
        Optional<User> user = userRepository.findById(reviewPostReq.getUserId());
        if ( !lec.isPresent() || !user.isPresent()) {
            return null;
        }
        Review review = Review.builder()
                .lecture(lec.get())
                .user(user.get())
                .reviewScore(reviewPostReq.getReviewScore())
                .reviewContents(reviewPostReq.getReviewContents())
                .build();
        return reviewRepository.save(review);
    }

    // 리뷰 조회
    @Override
    public List<ReviewGetRes> findByLecId(int lecId) {
        List<Review> review = reviewRepository.findByLecture_LecId(lecId);
        List<ReviewGetRes> reviews = new ArrayList<>();
        for (int i = 0; i < review.size(); i++) {
            reviews.add(ReviewGetRes.of(review.get(i)));
        }
        return reviews;
    }

    // 리뷰 삭제
    @Override
    public Integer deleteByReviewId(int reviewId) {
        reviewRepository.deleteByReviewId(reviewId);
        return null;
    }
}
