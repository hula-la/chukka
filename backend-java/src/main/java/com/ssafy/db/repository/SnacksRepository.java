package com.ssafy.db.repository;

import com.ssafy.db.entity.Snacks;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
<<<<<<< HEAD
public interface SnacksRepository extends JpaRepository<Snacks, Long> {
=======
public interface SnacksRepository extends JpaRepository<Snacks, Integer> {
>>>>>>> admin

    List<Snacks> findSnacksByUserUserIdOrderBySnacksIdDesc(String userId);

}
