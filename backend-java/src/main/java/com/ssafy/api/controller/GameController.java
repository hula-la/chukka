package com.ssafy.api.controller;

import com.ssafy.api.response.game.GameRes;
import com.ssafy.api.response.lecture.LectureGetForListRes;
import com.ssafy.api.response.user.UserMyRes;
import com.ssafy.api.response.user.UserYourRes;
import com.ssafy.api.service.GameService;
import com.ssafy.api.service.UserService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Game;
import com.ssafy.db.entity.GameHighScore;
import com.ssafy.db.entity.User;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;
import java.util.Map;

@Api(value = "게임 API", tags = {"Game"})
@RestController
@RequestMapping("/game")
public class GameController {

    @Autowired
    GameService gameService;
    UserService userService;

    @GetMapping("/game")
    @ApiOperation(value = "전체 음악 목록", notes = "전체 게임을 불러온다.", response = GameRes.class)
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = GameRes.class),
    })
    public ResponseEntity<BaseResponseBody> getGames() {
        List<GameRes> gameList = gameService.findAll();

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", gameList));
    }

    @PostMapping("/game/score")
    @ApiOperation(value = "게임 최고점수 업데이트", notes = "기존의 점수 기록이 없으면 등록하고, 기록이 있으면 현재 score가 저장되어 있는 socre보다 더 높을 때 갱신한다.", response = Integer.class)
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = Integer.class),
    })
    public ResponseEntity<BaseResponseBody> updateGameHighScore(
            @ApiIgnore Authentication authentication,
            @RequestParam @ApiParam(value="노래 아이디", required = true) Long songId,
            @RequestParam @ApiParam(value="점수", required = true) int score
    ) {

        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String loginUserId = userDetails.getUsername();
        User user = userService.getUserByUserId(loginUserId);

        GameHighScore gameHighScore = gameService.updateHighScore(user,songId,score);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", gameHighScore.getScore()));
    }

    @GetMapping("/game/{songId}")
    @ApiOperation(value = "특정 게임정보 조회", notes = "songId를 입력받으면 해당 게임의 상세 정보를 조회한다.", response = GameRes.class)
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = GameRes.class),
    })
    public ResponseEntity<BaseResponseBody> getGameById(
            @PathVariable @ApiParam(value="노래 아이디", required = true) Long songId
    ) {

        GameRes game = gameService.findBySongId(songId);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", game));
    }

    @PostMapping("/game/exp")
    @ApiOperation(value = "게임 경험치 상승", notes = "게임을 하면 사용자의 경험치가 상승합니다.", response = GameRes.class)
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = GameRes.class),
    })
    public ResponseEntity<BaseResponseBody> updateGameExp(
            @ApiIgnore Authentication authentication
    ) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String loginUserId = userDetails.getUsername();
        User user = userService.getUserByUserId(loginUserId);

        int exp = 10;

        int isUpdated = gameService.updateGameExp(user,exp);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", isUpdated));
    }
}
