package com.ssafy.db.repository;

import com.ssafy.db.entity.Game;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface GameRepository extends JpaRepository<Game,Long> {
    @Override
    List<Game> findAll();


    Optional<Game> findBySongId(Long songId);

}
