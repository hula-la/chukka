package com.ssafy.api.controller;

import com.ssafy.api.request.lecture.LectureNoticeReq;
import com.ssafy.api.request.lecture.LecturePostReq;
import com.ssafy.api.request.lecture.LectureUpdateReq;
import com.ssafy.api.response.lecture.LectureNoticeRes;
import com.ssafy.api.response.lecture.LectureUpdateRes;
import com.ssafy.api.service.LectureService;

import com.ssafy.common.model.response.BaseResponseBody;
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

    // 강의 생성하기 =====================================================================================================
    @PostMapping("/")
    @ApiOperation(value = "강의 생성", notes = "제공받은 정보(pdf 등)을 통해 강의페이지를 생성한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success")
    })
    public ResponseEntity<? extends BaseResponseBody> createLecture(
            @RequestBody @ApiParam(value="강의 상세 정보", required = true) LecturePostReq lectureInfo) {
        Lecture lecture = lectureService.createLecture(lectureInfo);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200,"Success"));
    }

    // 전체 강의 목록 ====================================================================================================

    @GetMapping("/")
    @ApiOperation(value = "전체 강의 목록", notes = "전체 게시글을 불러온다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<List<Lecture>> lectureList() {
        return ResponseEntity.ok(lectureService.findAll());
    }

    // 강의 내용 수정 ====================================================================================================
    @PutMapping("/{lecId}")
    @ApiOperation(value = "강의 수정" , notes = "강의 ID를 통해 해당 강의 내용을 수정한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공")
    })
    public ResponseEntity<LectureUpdateRes> updateLecture(@RequestBody @ApiParam(value = "수정할 강의 내용", required = true) LectureUpdateReq lectureUpdateReq) {
        int lecId = lectureUpdateReq.getLecId();
        Lecture lecture = lectureService.updateLecture(lecId, lectureUpdateReq);
        return ResponseEntity.status(200).body(LectureUpdateRes.of(200,"Success", lecture));
    }


    // 공지사항 수정 =====================================================================================================

    @PutMapping("/")
    @ApiOperation(value = "공지사항", notes = "공지사항을 업데이트한다.")
    public ResponseEntity<LectureNoticeRes> updateLecNotice(@RequestBody @ApiParam(value = "수정할 공지사항", required = true) LectureNoticeReq updateInfo) {

        String lecNotice = updateInfo.getLecNotice();
        int lecId = updateInfo.getLecId();

        return ResponseEntity.status(200).body(LectureNoticeRes.of(200,"Success", lecId, lecNotice));
    }

    @DeleteMapping("/")
    @ApiOperation(value = "댓글 삭제", notes = "댓글을 삭제한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공")
    })
    public ResponseEntity<?> deleteByLecId(@RequestBody @ApiParam(value = "삭제할 강의 ID", required = true) int lecId) {

        return ResponseEntity.ok(lectureService.deleteByLecId(lecId));
    }
}



