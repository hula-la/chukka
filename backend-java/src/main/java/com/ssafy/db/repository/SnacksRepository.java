package com.ssafy.db.repository;

import com.ssafy.db.entity.Snacks;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.awt.print.Pageable;
import java.util.List;
import java.util.Optional;

@Repository
public interface SnacksRepository extends JpaRepository<Snacks, Long> {
    Optional<Snacks> findBySnacksId(Long snacksId);
    List<Snacks> findSnacksByUserUserIdOrderBySnacksIdDesc(String userId);
    @Query(value = "update Snacks s set s.snacksLikeCnt = s.snacksLikeCnt + 1 where s.snacksId = :snacksId")
    Snacks likeSnacks(Long snacksId);
    @Query(value = "update Snacks s set s.snacksLikeCnt = s.snacksLikeCnt - 1 where s.snacksId = :snacksId")
    Snacks dislikeSnacks(Long snacksId);

}
