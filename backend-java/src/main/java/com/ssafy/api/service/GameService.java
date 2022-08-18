package com.ssafy.api.service;

import com.ssafy.api.response.game.GameRes;
import com.ssafy.db.entity.Game;
import com.ssafy.db.entity.GameHighScore;
import com.ssafy.db.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

public interface GameService {
    List<GameRes> findAll(User user);

    GameRes findBySongId(User user,Long songId);

    GameHighScore updateHighScore(User user, Long songId, int score);

    int updateGameExp(User user, int exp);
}
