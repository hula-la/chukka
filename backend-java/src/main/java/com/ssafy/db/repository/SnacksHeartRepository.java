package com.ssafy.db.repository;

import com.ssafy.db.entity.Snacks;
import com.ssafy.db.entity.SnacksHeart;
import com.ssafy.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SnacksHeartRepository extends JpaRepository<SnacksHeart, Long> {
//    Optional<SnacksHeart> findSnacksLikeByUserAndSnacks(User user, Snacks snacks);

    Optional<SnacksHeart> findByUser_UserIdAndSnacks_SnacksId(String userId, int SnacksId);
}
