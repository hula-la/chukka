package com.ssafy.api.controller;

import com.ssafy.api.request.instructor.InstructorPostReq;
import com.ssafy.api.request.lecture.LecturePostReq;
import com.ssafy.api.request.lecture.LectureUpdateReq;
import com.ssafy.api.request.lecture.LiveLecturePostReq;
import com.ssafy.api.request.section.SectionPostReq;
import com.ssafy.api.request.section.SectionUpdateReq;
import com.ssafy.api.response.admin.InstructorRes;
import com.ssafy.api.response.admin.LectureListRes;
import com.ssafy.api.response.admin.LectureRes;
import com.ssafy.api.response.admin.UserListRes;
import com.ssafy.api.response.section.SectionGetRes;
import com.ssafy.api.service.InstructorService;
import com.ssafy.api.service.LectureService;
import com.ssafy.api.service.SectionService;
import com.ssafy.api.service.UserService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.common.util.S3Uploader;
import com.ssafy.db.entity.Lecture;
import com.ssafy.db.entity.Section;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

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
	SectionService sectionService;
	@Autowired
	InstructorService instructorService;
	@Autowired
	S3Uploader s3Uploader;

	// 회원 목록 조회 ====================================================================================================
	@GetMapping("/accounts/")
	@ApiOperation(value = "회원 목록 조회", notes = "모든 회원 목록을 반환한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "Success", response = UserListRes.class)
	})
	public ResponseEntity<BaseResponseBody> getUsers() {
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", UserListRes.of(userService.getUsers())));
	}

	// 회원 권한 수정 ========================================================================================================
	@PutMapping("/accounts/{userId}/{userType}")
	@ApiOperation(value = "강사 권한 수정", notes = "<strong>유저 아이디와 수정할 권한</strong>을 받아 해당 권한의 사용자로 수정한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "Success", response = UserListRes.class)
	})
	public ResponseEntity<BaseResponseBody> registerInstructor(
			@PathVariable String userId,
			@PathVariable int userType) {
		userService.createInstructor(userId, userType);
		if(userType == 1) {
			instructorService.createInstructor(userId);
		} else {
			instructorService.deleteInstructor(userId);
		}
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", UserListRes.of(userService.getUsers())));
	}

	// 회원 검색 ========================================================================================================
	@GetMapping("/accounts/{category}/{keyword}")
	@ApiOperation(value = "회원 검색", notes = "<strong>검색 범위와 검색어</strong>를 통해 조건에 만족하는 회원 목록을 반환한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "Success", response = UserListRes.class)
	})
	public ResponseEntity<BaseResponseBody> getCertainUsers(
			@PathVariable @ApiParam(value="검색 범위", required = true, example = "[userId, userName, userNickname, userPhone, userEmail]") String category,
			@PathVariable @ApiParam(value="검색어", required = true) String keyword) {
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", UserListRes.of(userService.getCertainUsers(category, keyword))));
	}

	// 특정 회원 탈퇴 ====================================================================================================
	@DeleteMapping("/accounts/{userId}")
	@ApiOperation(value = "회원 강제 탈퇴", notes = "<strong>유저 아이디</strong>를 통해 해당 유저의 계정을 삭제한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "Success", response = UserListRes.class),
			@ApiResponse(code = 401, message = "Invalid Id", response = BaseResponseBody.class)
	})
	public ResponseEntity<BaseResponseBody> quitCertainUser(
			@PathVariable @ApiParam(value="유저 아이디", required = true) String userId) {
		if(userService.getUserByUserId(userId) == null) {
			return ResponseEntity.status(200).body(BaseResponseBody.of(401, "Invalid Id", null));
		}
		userService.quit(userId);
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", UserListRes.of(userService.getUsers())));
	}

	// 전체 강의 목록 조회 ================================================================================================
	@GetMapping("/lectures/")
	@ApiOperation(value = "강의 목록 조회", notes = "모든 강의 목록을 반환한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "Success", response = LectureRes.class)
	})
	public ResponseEntity<BaseResponseBody> getLectures() {
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", lectureService.findAll()));
	}

	// 전체 섹션 목록 조회 ================================================================================================
	@GetMapping("/sections/{lecId}")
	@ApiOperation(value = "섹션 목록 조회", notes = "<strong>강의 아이디</strong>를 통해 특정 강의의 모든 섹션 목록을 반환한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "Success", response = SectionGetRes.class)
	})
	public ResponseEntity<BaseResponseBody> getSections(
			@PathVariable @ApiParam(value="강의 아이디", required = true) int lecId, Pageable pageable) {
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", sectionService.getAllSections(pageable)));
	}

	// 라이브 강의 추가 ========================================================================================================
	@PostMapping("/lectures/live")
	@ApiOperation(value = "라이브 강의 추가", notes = "<strong>강사 아이디, 강의 제목, 강의 내용, 수강료, 공지사항, 강의 일정, 강의 요일/시간, 강의 시작일, 강의 종료일, 카테고리, 난이도, 제한인원, 그리고 춤 장르</strong>를 받아 강의를 추가한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "Success", response = LectureRes.class)
	})
	public ResponseEntity<BaseResponseBody> registerLecture(
			@RequestPart @ApiParam(value="강의 정보", required = true) LiveLecturePostReq liveInfo,
			@RequestPart @ApiParam(value = "강의 썸네일 이미지 파일") MultipartFile lecThumb) throws IOException {
		Lecture lecture = lectureService.createLiveLecture(liveInfo, lecThumb != null);
		if(lecThumb != null) {
			s3Uploader.uploadFiles(lecThumb, "img/lecture/thumb", Integer.toString(lecture.getLecId()));
		}
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", lectureService.findAll()));
	}

	// 녹화 강의 추가 ========================================================================================================
	@PostMapping("/lectures/record")
	@ApiOperation(value = "녹화 강의 추가", notes = "<strong>강사 아이디, 강의 제목, 강의 내용, 수강료, 카테고리, 난이도, 그리고 춤 장르</strong>를 받아 강의를 추가한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "Success", response = LectureRes.class)
	})
	public ResponseEntity<BaseResponseBody> registerLecture(
			@RequestPart @ApiParam(value="강의 정보", required = true) LecturePostReq lectureInfo,
			@RequestPart @ApiParam(value = "강의 썸네일 이미지 파일") MultipartFile lecThumb) throws IOException {
		Lecture lecture = lectureService.createLecture(lectureInfo, lecThumb != null);
		if(lecThumb != null) {
			s3Uploader.uploadFiles(lecThumb, "img/lecture/thumb", Integer.toString(lecture.getLecId()));
		}
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", lectureService.findAll()));
	}

	// 섹션 추가 ========================================================================================================
	@PostMapping("/sections/{lecId}")
	@ApiOperation(value = "섹션 추가", notes = "<strong>강의 아이디, 강사 아이디, 섹션 제목, 그리고 섹션 내용</strong>을 통해 섹션을 추가한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "Success", response = SectionGetRes.class)
	})
	public ResponseEntity<BaseResponseBody> registerSection(
			@PathVariable @ApiParam(value="강의 아이디", required = true) int lecId,
			@RequestPart @ApiParam(value="강의 정보", required = true) SectionPostReq sectionInfo,
			@RequestPart @ApiParam(value = "강의 영상 파일") MultipartFile contents,
			Pageable pageable) throws IOException {
		Section section = sectionService.createSection(sectionInfo, contents != null);
		if(contents != null) {
			s3Uploader.uploadFiles(contents, "vid/section/contents", Integer.toString(section.getSecId()));
		}
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", sectionService.getSectionByLecId(lecId, pageable)));
	}

	// 강의 수정 ========================================================================================================
//	@PutMapping("/lectures/")
//	@ApiOperation(value = "강의 수정", notes = "<strong>강사 아이디, 썸네일, 강의 제목, 강의 내용, 수강료, 공지사항, 강의 시작일, 강의 종료일, 카테고리(라이브 / 녹화), 난이도, 제한인원, 그리고 장르</strong>를 받아 특정 강의의 정보를 수정한다.")
//	@ApiResponses({
//			@ApiResponse(code = 200, message = "Success", response = LectureListRes.class)
//	})
//	public ResponseEntity<BaseResponseBody> modifyLecture(
//			@RequestPart @ApiParam(value = "수정할 강의 내용", required = true) LectureUpdateReq lectureInfo,
//			HttpServletRequest req) throws IOException {
//		lectureService.updateLecture(lectureInfo.getLecId(), lectureInfo);
//		MultipartFile thumbnail = lectureInfo.getLecThumb();
//		if(thumbnail != null) {
//			s3Uploader.uploadFiles(thumbnail, "img/lecture/thumbnail", req.getServletContext().getRealPath("/img/"), Integer.toString(lectureInfo.getLecId()));
//		}
//		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", LectureListRes.off(lectureService.findAll())));
//	}

//	// 섹션 수정 ========================================================================================================
//	@PutMapping("/sections/{lecId}")
//	@ApiOperation(value = "섹션 수정", notes = "<strong>강의 아이디, 강사 아이디, 섹션 제목, 그리고 섹션 내용</strong>을 통해 섹션을 수정한다.")
//	@ApiResponses({
//			@ApiResponse(code = 200, message = "Success", response = SectionGetRes.class)
//	})
//	public ResponseEntity<BaseResponseBody> modifySection(
//			@PathVariable @ApiParam(value="강의 아이디", required = true) int lecId,
//			@RequestPart @ApiParam(value = "수정할 섹션 내용", required = true) SectionUpdateReq sectionInfo,
//			@RequestPart @ApiParam(value = "수정할 섹션 영상 파일") MultipartFile contents,
//			HttpServletRequest req) throws IOException {
//		Section section = sectionService.updateSection(lecId, sectionInfo);
//		if(contents != null) {
//			s3Uploader.uploadFiles(contents, "vid/section/contents", req.getServletContext().getRealPath("/img/"), Integer.toString(section.getSecId()));
//		}
//		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", sectionService.getSectionByLecId(lecId)));
//	}

	// 강의 삭제 ========================================================================================================
	@DeleteMapping("/lectures/{lecId}")
	@ApiOperation(value = "강의 삭제", notes = "<strong>강의 아이디</strong>를 받아 해당 강의를 삭제한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "Success", response = LectureListRes.class)
	})
	public ResponseEntity<BaseResponseBody> deleteLecture(
			@PathVariable @ApiParam(value = "강의 Id", required = true) int lecId) {
		lectureService.delete(lecId);
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", lectureService.findAll()));
	}

	// 섹션 삭제 ========================================================================================================
	@DeleteMapping("/sections/{lecId}/{sectionId}")
	@ApiOperation(value = "섹션 삭제", notes = "<strong>강의 아이디와 섹션 아이디</strong>를 받아 해당 섹션을 삭제한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "Success", response = SectionGetRes.class)
	})
	public ResponseEntity<BaseResponseBody> deleteSection(
			@PathVariable @ApiParam(value="강의 아이디", required = true) int lecId,
			@PathVariable @ApiParam(value = "섹션 Id", required = true) int sectionId,
			Pageable pageable) {
		sectionService.deleteBySecId(sectionId);
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success",  sectionService.getSectionByLecId(lecId, pageable)));
	}

	// 강사 목록 조회 ====================================================================================================
	@GetMapping("/instructors/")
	@ApiOperation(value = "강사 목록 조회", notes = "강사로 정보가 등록된 모든 강사의 목록을 반환한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "Success", response = InstructorRes.class)
	})
	public ResponseEntity<BaseResponseBody> getInstructors(){
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", instructorService.findAll()));
	}

	// 강사 정보 수정 ====================================================================================================
	@PutMapping("/instructors/")
	@ApiOperation(value = "강사 정보 수정", notes = "<strong>강사 아이디, 이름, 이메일, 그리고 소개</strong>를 받아 특정 강사의 정보를 수정한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "Success", response = BaseResponseBody.class)
	})
	public ResponseEntity<BaseResponseBody> modifyInstructorInfo(
			@RequestBody @ApiParam(value = "수정할 강사 정보", required = true) InstructorPostReq insInfo) {
		instructorService.updateInstructor(insInfo);
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", instructorService.findAll()));
	}

	// 강사 프로필 수정 ====================================================================================================
	@PutMapping("/instructors/{insId}")
	@ApiOperation(value = "강사 정보 수정", notes = "<strong>강사 아이디와 프로필 이미지 파일</strong>을 받아 특정 강사의 정보를 수정한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "Success", response = BaseResponseBody.class)
	})
	public ResponseEntity<BaseResponseBody> modifyInstructorProfile(
			@PathVariable @ApiParam(value="강사 아이디", required = true) String insId,
			@RequestPart @ApiParam(value = "수정할 강사 정보", required = true) MultipartFile profile) throws IOException {
		if(profile != null) {
			s3Uploader.uploadFiles(profile, "img/instructor/profile", insId);
		}
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", instructorService.findAll()));
	}

	// 강사 삭제 ====================================================================================================
	@DeleteMapping("/instructors/{insId}")
	@ApiOperation(value = "강사 삭제", notes = "<strong>강사 아이디</strong>를 통해 해당 강사의 정보를 삭제한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "Success", response = InstructorRes.class)
	})
	public ResponseEntity<BaseResponseBody> deleteInstructor(
			@PathVariable @ApiParam(value="강사 아이디", required = true) String insId) {
		instructorService.deleteInstructor(insId);
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", instructorService.findAll()));
	}

}
