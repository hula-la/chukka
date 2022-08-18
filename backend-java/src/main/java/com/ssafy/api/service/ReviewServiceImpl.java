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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
    public Review createReview(int lecId, String userId, ReviewPostReq reviewPostReq) {
        Optional<Lecture> lec = lectureRepository.findById(lecId);
        Optional<User> user = userRepository.findById(userId);
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
    public Page<ReviewGetRes> findByLecId(int lecId, Pageable pageable) {
        PageRequest pageRequest = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize());
        Lecture lec = lectureRepository.findLectureByLecId(lecId);
        Page<Review> page = reviewRepository.findByLecture(lec, pageRequest);
        Page<ReviewGetRes> dtoPage = page
                .map(m -> ReviewGetRes.of(
                        m.getReviewId(),
                        m.getUser().getUserNickname(),
                        m.getReviewRegdate(),
                        m.getReviewScore(),
                        m.getReviewContents()
                ));
        return dtoPage;
    }

    // 리뷰 삭제
    @Override
    public Integer deleteByReviewId(int reviewId) {
        reviewRepository.deleteByReviewId(reviewId);
        return null;
    }
}
