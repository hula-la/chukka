package com.ssafy.api.controller;

import com.ssafy.api.request.lecture.LectureNoticeReq;
import com.ssafy.api.request.lecture.NoticeUpdateReq;
import com.ssafy.api.response.lecture.LectureDetailRes;
import com.ssafy.api.response.lecture.LectureGetForListRes;
import com.ssafy.api.response.lecture.LectureGetForYouRes;
import com.ssafy.api.response.lecture.LectureNoticeRes;
import com.ssafy.api.response.user.UserYourRes;
import com.ssafy.api.service.EnrollService;
import com.ssafy.api.service.LectureService;

import com.ssafy.api.service.UserService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;

import com.ssafy.db.entity.User;
import io.swagger.annotations.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

/**
 * 강의 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "강의 API", tags = {"Lecture"})
@RestController
@RequestMapping("/lectures")
public class LectureController {

    @Autowired
    LectureService lectureService;

    @Autowired
    UserService userService;

    @Autowired
    EnrollService enrollService;

    // 전체 강의 목록 ====================================================================================================
    // 인기순
    @GetMapping("/popular")
    @ApiOperation(value = "인기순", notes = "전체 게시글 중 가장 인기 있는 게시글을 불러온다.", response = LectureGetForListRes.class)
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = LectureGetForListRes.class),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<BaseResponseBody> getMostPopularLecture(Pageable pageable) {
        List<LectureGetForListRes> popular = lectureService.getMostPopularLecture(pageable);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", popular));
    }

    //최신순
    @GetMapping("/latest")
    @ApiOperation(value = "최신순", notes = "전체 게시글 중 가장 최근의 게시글을 불러온다.", response = LectureGetForListRes.class)
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = LectureGetForListRes.class),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<BaseResponseBody> getMostLatestLecture(Pageable pageable) {
        Page<LectureGetForListRes> latest = lectureService.getMostLatestLectures(pageable);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", latest));
    }

    // 유저별
    @GetMapping("/forUsers")
    @ApiOperation(value = "유저별", notes = "유저에 맞춰 추천 강의를 제공한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = LectureGetForYouRes.class),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<BaseResponseBody> getUserCustomList(
            @ApiIgnore Authentication authentication, Pageable pageable) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        int userGender = userService.getUserByUserId(userId).getUserGender();

        // 연령대 구하기
        Date birth = userService.getUserByUserId(userId).getUserBirth();
        LocalDateTime today = LocalDateTime.now();
        int userYear = Integer.parseInt(birth.toString().substring(0,4));
        int ageGroup = ((today.getYear() - userYear  + 1) - (today.getYear() - userYear  + 1) % 10);
        System.out.println(ageGroup);
        List<LectureGetForListRes> forUser = lectureService.getLectureByYourBirthAndGender(userGender, ageGroup, pageable);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", LectureGetForYouRes.of(forUser, userGender, ageGroup)));
    }

    // 상세페이지
    @GetMapping("/{lecId}")
    @ApiOperation(value = "강의 상세페이지", notes = "<strong>강의 ID</strong>로 강의 상세페이지를 불러온다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<BaseResponseBody> lectureDetail(
            @ApiIgnore Authentication authentication,
            @PathVariable @ApiParam(value = "불러올 해당 강의 ID", required = true) int lecId) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        LectureDetailRes lecture = lectureService.getDetailLecture(lecId, userId);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", lecture));
    }

    // 공지사항 수정 =====================================================================================================
    // 강사 userType == 1 권한 주기
    @Transactional
    @PutMapping("/{lecId}")
    @ApiOperation(value = "공지사항", notes = "공지사항을 업데이트한다.")
    public ResponseEntity<BaseResponseBody> updateLecNotice(
            @ApiIgnore Authentication authentication,
            @PathVariable @ApiParam(value = "공지사항 수정할 강의 ID", required = true) int lecId,
            @RequestBody @ApiParam(value = "수정할 공지사항", required = true) LectureNoticeReq updateInfo) {

        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        String lecNotice = updateInfo.getLecNotice();
        lectureService.updateLecNotice(userId, lecId, lecNotice);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200,"Success", null));
    }
}



