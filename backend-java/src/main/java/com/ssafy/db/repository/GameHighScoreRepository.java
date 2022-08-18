package com.ssafy.db.repository;

import com.ssafy.db.entity.Game;
import com.ssafy.db.entity.GameHighScore;
import com.ssafy.db.entity.User;
import org.kurento.client.internal.server.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository
public interface GameHighScoreRepository extends JpaRepository<GameHighScore,Long> {

    Optional<GameHighScore> findByUserAndGame_SongId(User user, Long songId);

    @Transactional
    @Modifying
    @Query(value = "UPDATE GameHighScore g SET g.score = :score where g.user_id = :userId and g.song_id = :songId",nativeQuery = true)
    int updateGameHighScore(@Param(value="userId") String userId, @Param(value="songid") Long songId, @Param(value="score") int score);

    Optional<GameHighScore> findGameHighScoreByUserAndGame_SongId(User user, Long songId);


}