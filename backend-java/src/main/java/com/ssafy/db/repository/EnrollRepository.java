package com.ssafy.db.repository;

import com.ssafy.db.entity.CartItem;
import com.ssafy.db.entity.Enroll;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EnrollRepository extends JpaRepository<Enroll, Integer> {
    Optional<Enroll> findByLecture_LecId(int ledId);
}
