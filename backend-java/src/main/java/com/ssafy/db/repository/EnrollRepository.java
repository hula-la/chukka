package com.ssafy.db.repository;

import com.ssafy.db.entity.Enroll;
import com.ssafy.db.entity.Lecture;
import com.ssafy.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EnrollRepository extends JpaRepository<Enroll, Integer> {
    Optional<Enroll> findByLecture_LecIdAndUser_UserId(int ledId, String userId);


    Enroll getEnrollByUser(User user);

    Enroll getEnrollByUserAndLecture(User user, Lecture lecture);

    Enroll findEnrollByUserUserId(String userId);
}
