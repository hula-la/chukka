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
    @Query(value = "select r.reviewId, r.user.userNickname, r.reviewRegdate, r.reviewScore, r.reviewContents " +
            "from Review r " +
            "where r.lecture.lecId = :lecId " +
            "order by r.reviewId")
    List<ReviewGetRes> findByLecId(int lecId);

    Optional<Integer> deleteByReviewId(int reviewId);

}
