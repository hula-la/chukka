package com.ssafy.api.service;

import com.ssafy.api.request.review.ReviewPostReq;
import com.ssafy.api.response.Review.ReviewGetRes;
import com.ssafy.db.entity.Lecture;
import com.ssafy.db.entity.Review;
import com.ssafy.db.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ReviewService {
    // 리뷰 작성하기
    Review createReview(int lecId, String userId, ReviewPostReq reviewPostReq);
    // 강의별 전체 리뷰조회하기
    Page<ReviewGetRes> findByLecId(int lecId, Pageable pageable);
    // 리뷰 삭제하기
    Integer deleteByReviewId(int reviewId);
}
