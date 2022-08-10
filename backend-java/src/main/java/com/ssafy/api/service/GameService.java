package com.ssafy.api.service;

import com.ssafy.db.entity.Game;
import org.springframework.stereotype.Service;

import java.util.List;

public interface GameService {
    List<Game> findAll();
}
