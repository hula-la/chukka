package com.ssafy.db.repository;

import com.ssafy.db.entity.Lecture;
import com.ssafy.db.entity.Review;
import com.ssafy.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, String> {

    // 리뷰 조회하기 - 강의 id 기반
    @Modifying
    @Query(value = "select * from Review r where r.lecture = :lecture order by r.reviewId", nativeQuery = true)
    List<Review> findByLecIdOrderByReviewId(Lecture reviewList);

    @Modifying
    @Query(value = "delete from Review r where r.lecture = :lecture and r.user = :user and r.reviewId = :reviewId", nativeQuery = true)
    Optional<Integer> deleteByReviewId(Lecture lecture, User user, int lecId);
}
