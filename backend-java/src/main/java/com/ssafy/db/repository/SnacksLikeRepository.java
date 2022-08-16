package com.ssafy.db.repository;

import com.ssafy.db.entity.SnacksLike;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SnacksLikeRepository extends JpaRepository<SnacksLike, Long> {

    Optional<SnacksLike> findByUser_UserIdAndSnacks_SnacksId(String userId, Long SnacksId);

}
