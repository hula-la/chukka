package com.ssafy.api.controller;

import com.ssafy.api.response.lecture.LectureGetForListRes;
import com.ssafy.api.service.GameService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Game;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Api(value = "게임 API", tags = {"Game"})
@RestController
@RequestMapping("/game")
public class GameController {

    @Autowired
    GameService gameService;

    @GetMapping("/game")
    @ApiOperation(value = "전체 음악 목록", notes = "전체 게임을 불러온다.", response = Game.class)
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = LectureGetForListRes.class),
    })
    public ResponseEntity<BaseResponseBody> getMostPopularLecture() {
        List<Game> gameList = gameService.findAll();

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", gameList));
    }
}
