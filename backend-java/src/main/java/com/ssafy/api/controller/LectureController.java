package com.ssafy.api.controller;

import com.ssafy.api.request.lecture.LectureNoticeReq;
import com.ssafy.api.response.lecture.LectureDetailRes;
import com.ssafy.api.response.lecture.LectureGetForListRes;
import com.ssafy.api.response.lecture.LectureNoticeRes;
import com.ssafy.api.service.LectureService;

import com.ssafy.common.model.response.BaseResponseBody;

import io.swagger.annotations.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
//    @GetMapping("/")
//    @ApiOperation(value = "전체 강의 목록", notes = "전체 게시글을 불러온다.")
//    @ApiResponses({
//            @ApiResponse(code = 200, message = "성공"),
//            @ApiResponse(code = 500, message = "서버 오류")
//    })
//    public ResponseEntity<Page<Lecture>> lectureList(Pageable pageable) {
//        return ResponseEntity.ok(lectureService.findAll(pageable));
//    }

    // 상세페이지
    @GetMapping("/{lecId}")
    @ApiOperation(value = "강의 상세페이지", notes = "<strong>강의 ID</strong>로 강의 상세페이지를 불러온다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<BaseResponseBody> lectureDetail( @PathVariable @ApiParam(value = "불러올 해당 강의 ID", required = true) int lecId) {
        Optional<LectureDetailRes> lecture = lectureService.getDetailLecture(lecId);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", lecture));
    }

    // 공지사항 수정 =====================================================================================================
    // 강사 userType == 1 권한 주기
    @PutMapping("/{lecId}")
    @ApiOperation(value = "공지사항", notes = "공지사항을 업데이트한다.")
    public ResponseEntity<BaseResponseBody> updateLecNotice(@RequestBody @ApiParam(value = "수정할 공지사항", required = true) LectureNoticeReq updateInfo) {

        String lecNotice = updateInfo.getLecNotice();
        int lecId = updateInfo.getLecId();
        lectureService.updateLecNotice(lecId, lecNotice);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200,"Success", null));
    }
}



