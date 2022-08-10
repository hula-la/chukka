package com.ssafy.db.repository;

import com.ssafy.db.entity.Game;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GameRepository extends JpaRepository<Game,Long> {
    @Override
    List<Game> findAll();
}
