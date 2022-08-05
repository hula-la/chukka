package com.ssafy.db.repository;

import com.ssafy.db.entity.Snacks;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.awt.print.Pageable;
import java.util.List;
import java.util.Optional;

@Repository
public interface SnacksRepository extends JpaRepository<Snacks, Long> {
//    Page<Snacks> findAll(Pageable pageable);

    Optional<Snacks> findBySnacksId(int snacksId);

    List<Snacks> findSnacksByUserUserIdOrderBySnacksIdDesc(String userId);

}
