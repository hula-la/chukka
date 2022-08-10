package com.ssafy.api.service;

import com.ssafy.db.entity.Game;
import com.ssafy.db.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("GameServiceImpl")
public class GameServiceImpl implements GameService{

    @Autowired
    GameRepository gameRepository;

    @Override
    public List<Game> findAll() {
        return gameRepository.findAll();
    }
}
