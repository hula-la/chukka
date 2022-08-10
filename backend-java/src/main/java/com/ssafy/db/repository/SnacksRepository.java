package com.ssafy.db.repository;

import com.ssafy.db.entity.Snacks;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.awt.print.Pageable;
import java.util.List;
import java.util.Optional;

@Repository
public interface SnacksRepository extends JpaRepository<Snacks, Long> {
    Optional<Snacks> findBySnacksId(Long snacksId);
    List<Snacks> findSnacksByUserUserIdOrderBySnacksIdDesc(String userId);
    @Transactional
    @Modifying
    @Query(value = "update Snacks s set s.snacksLikeCnt = s.snacksLikeCnt + 1 where s.snacksId = :snacksId")
    int likeSnacks(Long snacksId);
    @Transactional
    @Modifying
    @Query(value = "update Snacks s set s.snacksLikeCnt = s.snacksLikeCnt - 1 where s.snacksId = :snacksId")
    int dislikeSnacks(Long snacksId);

}
