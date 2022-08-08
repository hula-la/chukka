package com.ssafy.db.repository;

import com.ssafy.api.response.Review.ReviewGetRes;
import com.ssafy.db.entity.Lecture;
import com.ssafy.db.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Integer> {

    // 리뷰 조회하기 - 강의 id 기반
    List<Review> findByLecture_LecId(int lecId);

    Optional<Integer> deleteByReviewId(int reviewId);

}
