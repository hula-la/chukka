package com.ssafy.api.service;

import com.ssafy.api.request.review.ReviewPostReq;
import com.ssafy.db.entity.Lecture;
import com.ssafy.db.entity.Review;
import com.ssafy.db.entity.User;

import java.util.List;

public interface ReviewService {
    // 리뷰 작성하기
    Review createReview(ReviewPostReq reviewPostReq);
    // 강의별 전체 리뷰조회하기
    List<Review> findByLectureOrderByReviewId(Lecture lecture);
    // 리뷰 삭제하기
    Integer deleteByReviewId(int reviewId);
}
