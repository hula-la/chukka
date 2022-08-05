package com.ssafy.api.controller;

import com.ssafy.api.request.lecture.LectureNoticeReq;
import com.ssafy.api.response.lecture.LectureGetRes;
import com.ssafy.api.response.lecture.LectureNoticeRes;
import com.ssafy.api.service.LectureService;

import com.ssafy.common.model.response.BaseResponseBody;

import io.swagger.annotations.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * 강의 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "강의 API", tags = {"Lecture"})
@RestController
@RequestMapping("/lectures")
public class LectureController {

    @Autowired
    LectureService lectureService;

    // 전체 강의 목록 ====================================================================================================
    // 인기순
    @GetMapping("/")
    @ApiOperation(value = "인기순", notes = "전체 게시글을 불러온다.", response = LectureGetRes.class)
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = LectureGetRes.class),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<BaseResponseBody> getMostPopularLecture(Pageable pageable) {
        Page<LectureGetRes> popular = lectureService.getMostPopularLecture(pageable);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", popular));
    }

    // 최신순
//    @GetMapping("/")
//    @ApiOperation(value = "전체 강의 목록", notes = "전체 게시글을 불러온다.")
//    @ApiResponses({
//            @ApiResponse(code = 200, message = "성공"),
//            @ApiResponse(code = 500, message = "서버 오류")
//    })
//    public ResponseEntity<Page<Lecture>> lectureList(Pageable pageable) {
//        return ResponseEntity.ok(lectureService.findAll(pageable));
//    }

    //유저별

    // 공지사항 수정 =====================================================================================================
    // 강사 userType == 1 권한 주기
    @PutMapping("/")
    @ApiOperation(value = "공지사항", notes = "공지사항을 업데이트한다.")
    public ResponseEntity<BaseResponseBody> updateLecNotice(@RequestBody @ApiParam(value = "수정할 공지사항", required = true) LectureNoticeReq updateInfo) {

        String lecNotice = updateInfo.getLecNotice();
        int lecId = updateInfo.getLecId();

        return ResponseEntity.status(200).body(BaseResponseBody.of(200,"Success", LectureNoticeRes.of(lecId, lecNotice)));
    }
}



