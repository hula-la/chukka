package com.ssafy.db.repository;

import com.ssafy.db.entity.SectionLike;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SectionLikeRepository extends JpaRepository<SectionLike, Integer> {

    // 좋아요 카운트
    Optional<Integer> countBySection_SecId(int secId);
}
