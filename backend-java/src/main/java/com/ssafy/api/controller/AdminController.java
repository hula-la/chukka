package com.ssafy.api.controller;

import com.ssafy.api.request.instructor.InstructorPostReq;
import com.ssafy.api.request.lecture.LecturePostReq;
import com.ssafy.api.request.lecture.LectureUpdateReq;
import com.ssafy.api.response.admin.LectureListRes;
import com.ssafy.api.response.admin.UserListRes;
import com.ssafy.api.service.InstructorService;
import com.ssafy.api.service.LectureService;
import com.ssafy.api.service.UserService;
import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import retrofit2.http.Path;

/**
 * 관리자 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "관리자 API", tags = {"Admin"})
@RestController
@RequestMapping("/admin")
public class AdminController {
	
	@Autowired
	UserService userService;
	@Autowired
	LectureService lectureService;
	@Autowired
	InstructorService instructorService;

	// 회원 목록 조회 ====================================================================================================
	@GetMapping("/accounts/")
	@ApiOperation(value = "회원 목록 조회", notes = "모든 회원 목록을 반환한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "Success", response = BaseResponseBody.class)
	})
	public ResponseEntity<BaseResponseBody> getUsers(@PathVariable Pageable pageable) {
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", UserListRes.of(userService.getUsers(pageable))));
	}

	// 강사 권한 수정 ========================================================================================================
	@PutMapping("/accounts/{userId}")
	@ApiOperation(value = "강사 권한 수정", notes = "<strong>유저 아이디</strong>를 받아 강사로 등록한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "Success", response = BaseResponseBody.class)
	})
	public ResponseEntity<BaseResponseBody> registerInstructor(@PathVariable String userId) {
		userService.createInstructor(userId);
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", null));
	}

	// 회원 검색 ========================================================================================================
	@GetMapping("/accounts/{category}/{keyword}")
	@ApiOperation(value = "회원 검색", notes = "<strong>검색 범위와 검색어</strong>를 통해 조건에 만족하는 회원 목록을 반환한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "Success", response = UserListRes.class)
	})
	public ResponseEntity<BaseResponseBody> getCertainUsers(@PathVariable @ApiParam(value="검색 범위", required = true, example = "[userId, userName, userNickname, userPhone, userEmail]") String category,
													   @PathVariable @ApiParam(value="검색어", required = true) String keyword) {
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", UserListRes.of(userService.getCertainUsers(category, keyword))));
	}

	// 특정 회원 탈퇴 ====================================================================================================
	@PostMapping("/accounts/{userId}")
	@ApiOperation(value = "회원 강제 탈퇴", notes = "<strong>유저 아이디</strong>를 통해 해당 유저의 계정을 삭제한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "Success", response = BaseResponseBody.class),
			@ApiResponse(code = 401, message = "Invalid Id", response = BaseResponseBody.class)
	})
	public ResponseEntity<BaseResponseBody> quitCertainUser(@RequestBody @ApiParam(value="유저 아이디", required = true) String userId) {
		if(userService.getUserByUserId(userId) == null) {
			return ResponseEntity.status(200).body(BaseResponseBody.of(401, "Invalid Id", null));
		}
		userService.quit(userId);
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", null));
	}

	// 수정 필요 ********************************************************************************************************
	// - Pageable *****************************************************************************************************
	// 전체 강의 목록 조회 ================================================================================================
	@GetMapping("/lectures/")
	@ApiOperation(value = "강의 목록 조회", notes = "모든 강의 목록을 반환한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "Success", response = LectureListRes.class)
	})
	public ResponseEntity<BaseResponseBody> getLectures(@PathVariable Pageable pageable) {
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", LectureListRes.of(lectureService.findAll())));
	}

	// 강의 추가 ========================================================================================================
	@PostMapping("/lectures/")
	@ApiOperation(value = "강의 추가", notes = "<strong>강사 아이디, 썸네일, 강의 제목, 강의 내용, 수강료, 공지사항, 강의 시작일, 강의 종료일, 카테고리(라이브 / 녹화), 난이도, 제한인원, 그리고 장르</strong>를 받아 강의를 추가한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "Success", response = BaseResponseBody.class)
	})
	public ResponseEntity<BaseResponseBody> registerLecture(@RequestBody @ApiParam(value="강의 정보", required = true) LecturePostReq lectureInfo) {
		lectureService.createLecture(lectureInfo);
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", null));
	}

	// 강의 수정 ========================================================================================================
	@PutMapping("/lectures/")
	@ApiOperation(value = "강의 수정", notes = "<strong>강사 아이디, 썸네일, 강의 제목, 강의 내용, 수강료, 공지사항, 강의 시작일, 강의 종료일, 카테고리(라이브 / 녹화), 난이도, 제한인원, 그리고 장르</strong>를 받아 특정 강의의 정보를 수정한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "Success", response = BaseResponseBody.class)
	})
	public ResponseEntity<BaseResponseBody> modifyLecture(@RequestBody @ApiParam(value = "수정할 강의 내용", required = true) LectureUpdateReq lectureInfo) {
		lectureService.updateLecture(lectureInfo.getLecId(), lectureInfo);
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", null));
	}

	// 강의 삭제 ========================================================================================================
	@DeleteMapping("/lectures/{lecId}")
	@ApiOperation(value = "강의 삭제", notes = "<strong>강의 아이디</strong>를 받아 해당 강의를 삭제한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "Success", response = BaseResponseBody.class)
	})
	public ResponseEntity<BaseResponseBody> deleteLecture(@PathVariable @ApiParam(value = "강의 Id", required = true) int lecId) {
		lectureService.deleteByLecId(lecId);
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", null));
	}

	// 강사 정보 추가 ====================================================================================================
	@PostMapping("/instructors/")
	@ApiOperation(value = "강사 정보 추가", notes = "<strong>강사 아이디, 이름, 이메일, 프로필, 그리고 소개</strong>를 받아 강사를 추가한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "Success", response = BaseResponseBody.class)
	})
	public ResponseEntity<BaseResponseBody> registerInstructorInfo(@RequestBody @ApiParam(value="강사 정보", required = true) InstructorPostReq insInfo) {
		instructorService.createInstructor(insInfo);
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", null));
	}

	// 강사 정보 수정 ====================================================================================================
	@PutMapping("/instructors/")
	@ApiOperation(value = "강사 정보 수정", notes = "<strong>강사 아이디, 이름, 이메일, 프로필, 그리고 소개</strong>를 받아 특정 강사의 정보를 수정한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "Success", response = BaseResponseBody.class)
	})
	public ResponseEntity<BaseResponseBody> modifyInstructorInfo(@RequestBody @ApiParam(value = "수정할 강의 내용", required = true) InstructorPostReq insInfo) {
		instructorService.updateInstructor(insInfo);
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", null));
	}

}
