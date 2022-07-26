package com.ssafy.api.controller;

import com.ssafy.api.request.lecture.LectureNoticeReq;
import com.ssafy.api.response.lecture.LectureNoticeRes;
import com.ssafy.api.service.LectureService;
import com.ssafy.db.entity.Lecture;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 강의 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "강의 API", tags = {"Lecture"})
@RestController
@RequestMapping("/lectures")
public class LectureController {

    @Autowired
    LectureService lectureService;

    // 전체 강의 목록 =============================================================================
//    @GetMapping("/")
//    @ApiOperation(value = "전체 강의 목록", notes = "전체 게시글을 불러온다.")
//    @ApiResponses({
//            @ApiResponse(code = 200, message = "성공"),
//            @ApiResponse(code = 500, message = "서버 오류")
//    })
//    public ResponseEntity<List<Lecture>> lectureList() {
//        return ResponseEntity.ok(lectureService.findAll());
//    }

    @PutMapping("/")
    @ApiOperation(value = "공지사항", notes = "공지사항을 업데이트한다.")
    public ResponseEntity<LectureNoticeRes> updateLecNotice(@RequestBody @ApiParam(value = "수정할 공지사항", required = true) LectureNoticeReq updateInfo) {

        String lecNotice = updateInfo.getLecNotice();
        int lecId = updateInfo.getLecId();

        return ResponseEntity.status(200).body(LectureNoticeRes.of(200,"Success", lecId, lecNotice));
    }

}



