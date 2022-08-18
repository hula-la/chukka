package com.ssafy.api.service;

import com.ssafy.api.response.admin.UserRes;
import com.ssafy.api.response.game.GameRes;
import com.ssafy.api.response.snacks.SnacksRes;
import com.ssafy.db.entity.Game;
import com.ssafy.db.entity.GameHighScore;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.GameHighScoreRepository;
import com.ssafy.db.repository.GameRepository;
import com.ssafy.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service("GameService")
public class GameServiceImpl implements GameService{

    @Autowired
    GameRepository gameRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    GameHighScoreRepository gameHighScoreRepository;

    @Override
    public List<GameRes> findAll(User user) {
        List<Game> gameList = gameRepository.findAll();
        List<GameRes> games = new ArrayList<GameRes>();
        for (Game g: gameList){
            Optional<GameHighScore> highScore = gameHighScoreRepository.findGameHighScoreByUserAndGame_SongId(user, g.getSongId());
            GameRes gr = GameRes.of(g, highScore.isPresent()?highScore.get().getScore():0);
            games.add(gr);
        }

        return games;
    }

    public GameRes findBySongId(User user, Long songId) {
        Optional<Game> game = gameRepository.findBySongId(songId);
        Optional<GameHighScore> highScore = gameHighScoreRepository.findGameHighScoreByUserAndGame_SongId(user, songId);
        if(game.isPresent()) {
            return GameRes.of(game.get(), highScore.isPresent()?highScore.get().getScore():0);
        }
        return null;
    }

    @Transactional
    public GameHighScore updateHighScore(User user, Long songId, int score) {
        Optional<GameHighScore> gameHighScoreOpt = gameHighScoreRepository.findByUserAndGame_SongId(user,songId);


        GameHighScore gameHighScore;

        if(!gameHighScoreOpt.isPresent()) {    // 2)
            gameHighScore = GameHighScore.builder()
                    .game(gameRepository.findBySongId(songId).get())
                    .user(user)
                    .score(score)
                    .build();

            gameHighScoreRepository.save(gameHighScore);
            return gameHighScore;
        }

        gameHighScore = gameHighScoreOpt.get();    // 3)
//       신기록 갱신
        if (score>gameHighScore.getScore()){
            gameHighScore.setScore(score);
            gameHighScoreRepository.updateGameHighScore(user.getUserId(),songId,score);
        }

        return gameHighScore;
    }

    public int updateGameExp(User user, int exp){
        return userRepository.updateGameExp(user.getUserId(), exp);
    }
}