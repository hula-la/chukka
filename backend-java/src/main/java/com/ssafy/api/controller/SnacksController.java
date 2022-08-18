package com.ssafy.api.controller;

import com.ssafy.api.request.snacks.SnacksReplyPostReq;
import com.ssafy.api.request.snacks.SnacksUploadReq;
import com.ssafy.api.response.snacks.SnacksReplyRes;
import com.ssafy.api.response.snacks.SnacksRes;
import com.ssafy.api.service.SnacksService;
import com.ssafy.api.service.UserService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.common.util.S3Uploader;
import com.ssafy.db.entity.Snacks;
import com.ssafy.db.entity.User;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

@Api(value = "스낵스 API", tags = {"Snacks"})
@RestController
@RequestMapping("/snacks")
public class SnacksController {

    @Autowired
    SnacksService snacksService;
    @Autowired
    UserService userService;
    @Autowired
    S3Uploader s3Uploader;

    // 스낵스 태그 조건 조회 =======================================================================================================
    @PostMapping("/")
    @ApiOperation(value = "스낵스 태그 조건 조회 ", notes = "해당 태그를 검색하여 스낵스 목록을 페이징 방식으로 조회한다." +
            "<br>태그는 params에 담아 문자열 리스트로 요청하며, 태그1 or 태그2 로 연산한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = SnacksRes.class)
    })
    public ResponseEntity<BaseResponseBody> getSnacks(
            @ApiIgnore Authentication authentication,
            @RequestBody @ApiParam(value="검색할 태그 리스트") List<String> tags,
            @ApiParam(value="페이지 정보") Pageable pageable){
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String loginUserId = userDetails.getUsername();
        Slice<SnacksRes> slice = null;
        if (tags.size() == 0) {
            slice = snacksService.findAll(pageable, loginUserId);
        } else {
            slice = snacksService.searchTag(tags, loginUserId, pageable);
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", slice));
    }

    // 스낵스 업로드 =====================================================================================================
    @PostMapping("/upload")
    @ApiOperation(value = "스낵스 업로드", notes = "<strong>제목, 영상 파일, 그리고 태그</strong>를 받아 스낵스 영상을 업로드한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = BaseResponseBody.class),
            @ApiResponse(code = 401, message = "Invalid User", response = BaseResponseBody.class)
    })
    public ResponseEntity<BaseResponseBody> uploadSnacks(
            @ApiIgnore Authentication authentication,
            @RequestPart @ApiParam(value="스낵스 정보") SnacksUploadReq snacksInfo,
            @RequestPart @ApiParam(value="스낵스 영상 파일") MultipartFile file) throws IOException {
        // 로그인 유저 판별
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String loginUserId = userDetails.getUsername();
        User user = userService.getUserByUserId(loginUserId);
        if(user == null) {
            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "Invalid User", null));
        }
        Snacks snacks = snacksService.uploadSnacks(snacksInfo, user);
        // 스낵스 영상 파일 업로드
        if(file != null) {
            s3Uploader.uploadFiles(file, "vid/snacks", String.valueOf(snacks.getSnacksId()));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", null));
    }

    // 특정 스낵스 삭제 ======================================================================================================
    @DeleteMapping("/{snacksId}")
    @ApiOperation(value = "특정 스낵스 삭제", notes = "<strong>스낵스 아이디</strong>를 통해 특정 스낵스를 삭제합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = BaseResponseBody.class)
    })
    public ResponseEntity<BaseResponseBody> deleteSnacks(@PathVariable @ApiParam(value = "스낵스 아이디") Long snacksId) {
        boolean isDeleted = snacksService.deleteSnacks(snacksId);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", isDeleted));
    }

    // 특정 스낵스 조회 ==================================================================================================
    @GetMapping("/detail/{snacksId}")
    @ApiOperation(value = "특정 스낵스 조회", notes = "<strong>스낵스 아이디</strong>를 통해 특정 스낵스를 조회합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = SnacksRes.class)
    })
    public ResponseEntity<BaseResponseBody> getSnacksById(
            @ApiIgnore Authentication authentication,
            @PathVariable @ApiParam(value="스낵스 아이디") Long snacksId){
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String loginUserId = userDetails.getUsername();
        SnacksRes snacks = snacksService.getCertainSnacks(snacksId, loginUserId);
        if(snacks == null) {
            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "Invalid Snacks", null));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", snacks));
    }

    // 스낵스 댓글 조회 ==================================================================================================
    @GetMapping("/{snacksId}/reply")
    @ApiOperation(value = "스낵스 댓글 조회", notes = "<strong>스낵스 아이디</strong>를 받아 스낵스 댓글을 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = SnacksReplyRes.class),
            @ApiResponse(code = 401, message = "Invalid Snacks", response = BaseResponseBody.class)
    })
    public ResponseEntity<BaseResponseBody> getComment(
            @ApiIgnore Authentication authentication,
            @PathVariable @ApiParam(value = "스낵스 아이디") Long snacksId) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String loginUserId = userDetails.getUsername();
        if(snacksService.getCertainSnacks(snacksId, loginUserId) == null) {
            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "Invalid Snacks", null));
        }
        List<SnacksReplyRes> list = snacksService.getReplybySnacksId(snacksId);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", list));
    }

    // 스낵스 댓글 추가 ==================================================================================================
    @PostMapping("/comments")
    @ApiOperation(value = "스낵스 댓글 추가", notes = "<strong>스낵스 아이디와 댓글 내용</strong>을 받아 스낵스 댓글에 추가한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = BaseResponseBody.class),
            @ApiResponse(code = 401, message = "Invalid User", response = BaseResponseBody.class)
    })
    public ResponseEntity<BaseResponseBody> registerComment(
            @ApiIgnore Authentication authentication,
            @RequestBody @ApiParam(value="스낵스 댓글 정보") SnacksReplyPostReq replyInfo) {
        // 로그인 유저 판별
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String loginUserId = userDetails.getUsername();
        User user = userService.getUserByUserId(loginUserId);
        if(user == null) {
            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "Invalid User", null));
        }
        snacksService.createReply(replyInfo, user);
        List<SnacksReplyRes> list = snacksService.getReplybySnacksId(replyInfo.getSnacksId());
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", list));
    }

    // 스낵스 좋아요 및 취소 ==============================================================================================
    @PutMapping("/{snacksId}/like")
    @ApiOperation(value = "스낵스 좋아요", notes = "스낵스에 좋아요를 누르거나 좋아요를 취소합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "[like, dislike]", response = BaseResponseBody.class),
            @ApiResponse(code = 401, message = "Invalid User", response = BaseResponseBody.class),
            @ApiResponse(code = 403, message = "Invalid Snacks", response = BaseResponseBody.class)
    })
    public ResponseEntity<BaseResponseBody> snacksLike(
            @ApiIgnore Authentication authentication,
            @PathVariable @ApiParam(value="스낵스 아이디") Long snacksId) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String loginUserId = userDetails.getUsername();
        User user = userService.getUserByUserId(loginUserId);
        if(user == null) {
            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "Invalid User", null));
        }
        String msg = snacksService.likeSnacks(user, snacksId);
        if (msg.equals("Invalid Snacks")) {
            return ResponseEntity.status(403).body(BaseResponseBody.of(403, "Invalid Snacks", null));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, msg, null));
    }

    // 특정 유저 스낵스 목록 조회
    @GetMapping("/{userNickname}")
    @ApiOperation(value = "특정 회원 스낵스 목록 조회", notes = "<strong>유저 닉네임</strong>을 통해 해당 유저가 업로드한 스낵스의 목록을 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = String.class),
            @ApiResponse(code = 401, message = "Invalid User", response = BaseResponseBody.class)
    })
    public ResponseEntity<BaseResponseBody> getCertainUserSnacks(
            @PathVariable @ApiParam(value="유저 닉네임") String userNickname,
            @ApiIgnore Authentication authentication,
            @ApiParam(value="페이지 정보") Pageable pageable) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String loginUserId = userDetails.getUsername();
        User user = userService.getUserByUserNickname(userNickname);
        Slice<SnacksRes> slice = snacksService.findCertainUserSnacks(pageable, user.getUserId(), loginUserId);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", slice));
    }

    // 인기 태그 조회 ====================================================================================================
    @GetMapping("/tag/popular")
    @ApiOperation(value = "인기 태그 조회", notes = "최근 가장 인기 있는 태그 상위 10개를 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = String.class),
            @ApiResponse(code = 401, message = "Invalid User", response = BaseResponseBody.class)
    })
    public ResponseEntity<BaseResponseBody> getPopularTagList() {
        List<String> tags = snacksService.getPopularTags();
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", tags));
    }

}
