package com.ssafy.api.controller;

import com.ssafy.api.request.user.UserModifyReq;
import com.ssafy.api.response.snacks.SnacksRes;
import com.ssafy.api.response.user.UserYourRes;
import com.ssafy.common.util.S3Uploader;
import org.springframework.beans.factory.annotation.Autowired;

import com.ssafy.api.request.user.*;
import com.ssafy.api.response.user.*;
import com.ssafy.common.util.MailUtil;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.ssafy.api.request.user.UserLoginPostReq;
import com.ssafy.api.request.user.UserRegisterPostReq;
import com.ssafy.api.response.user.UserLoginPostRes;
import com.ssafy.api.response.user.UserMyRes;

import com.ssafy.api.service.UserService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.common.util.JwtTokenUtil;
import com.ssafy.db.entity.User;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.stream.Collectors;

/**
 * 유저 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "유저 API", tags = {"User"})
@RestController
@RequestMapping("/accounts")
public class UserController {
	
	@Autowired
	UserService userService;
	@Autowired
	PasswordEncoder passwordEncoder;
	@Autowired
	S3Uploader s3Uploader;

	// 회원 가입 ========================================================================================================
	@PostMapping("/signup/")
	@ApiOperation(value = "회원 가입", notes = "<strong>아이디, 패스워드, 이름, 핸드폰 번호, 이메일, 성별, 나이, 그리고 닉네임</strong>을 통해 회원가입한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "Success", response = BaseResponseBody.class),
			@ApiResponse(code = 401, message = "Invalid", response = BaseResponseBody.class),
			@ApiResponse(code = 403, message = "Invalid User", response = BaseResponseBody.class)
	})
	public ResponseEntity<BaseResponseBody> register(
			@Validated @RequestBody @ApiParam(value="회원가입 정보", required = true) UserRegisterPostReq registerInfo,
			BindingResult bindingResult) {
		// 유효성 검사
		if (bindingResult.hasErrors()) {
			List<String> errors = bindingResult.getAllErrors().stream().map(e -> e.getDefaultMessage()).collect(Collectors.toList());
			return ResponseEntity.status(401).body(BaseResponseBody.of(401, "Invalid", errors));
		}
		// 해당 아이디 유저 있는지 확인
		if (userService.getUserByUserId(registerInfo.getUserId()) != null) {
			return ResponseEntity.status(403).body(BaseResponseBody.of(403, "Invalid User", null));
		}
		userService.createUser(registerInfo);
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", null));
	}

	// 아이디 중복 검사 ===================================================================================================
	@GetMapping("/checkid/{userId}")
	@ApiOperation(value = "아이디 중복 검사", notes = "<strong>아이디</strong>를 통해 중복된 아이디인지 검사한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "Success", response = BaseResponseBody.class),
			@ApiResponse(code = 401, message = "Invalid", response = BaseResponseBody.class)
	})
	public ResponseEntity<BaseResponseBody> checkId(
			@PathVariable @ApiParam(value="유저 아이디", required = true) String userId) {
		User user = userService.getUserByUserId(userId);
		if(user == null) {
			return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", null));
		}
		return ResponseEntity.status(200).body(BaseResponseBody.of(401, "Invalid", null));
	}

	// 닉네임 중복 검사 ===================================================================================================
	@GetMapping("/checkNick/{userNickname}")
	@ApiOperation(value = "닉네임 중복 검사", notes = "<strong>닉네임</strong>을 통해 중복된 닉네임인지 검사한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "Success", response = BaseResponseBody.class),
			@ApiResponse(code = 401, message = "Invalid", response = BaseResponseBody.class)
	})
	public ResponseEntity<BaseResponseBody> checkNickname(
			@PathVariable @ApiParam(value="유저 닉네임", required = true) String userNickname) {
		User user = userService.getUserByUserNickname(userNickname);
		if(user == null) {
			return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", null));
		}
		return ResponseEntity.status(401).body(BaseResponseBody.of(401, "Invalid", null));
	}

	// 로그인 ===========================================================================================================
	@PostMapping("/login/")
	@ApiOperation(value = "로그인", notes = "<strong>아이디와 패스워드</strong>를 통해 로그인한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "Success", response = UserLoginPostRes.class),
			@ApiResponse(code = 401, message = "Invalid User", response = BaseResponseBody.class)
	})
	public ResponseEntity<BaseResponseBody> login(
			@RequestBody @ApiParam(value="로그인 정보", required = true) UserLoginPostReq loginInfo) {
		String userId = loginInfo.getUserId();
		String password = loginInfo.getUserPw();
		User user = userService.getUserByUserId(userId);
		if(user == null) {
			return ResponseEntity.status(401).body(BaseResponseBody.of(401, "Invalid User", null));
		}
		// 로그인 요청한 유저로부터 입력된 패스워드와 디비에 저장된 유저의 암호화된 패스워드가 같은지 확인.(유효한 패스워드인지 여부 확인)
		if(passwordEncoder.matches(password, user.getUserPw())) {
			// 유효한 패스워드가 맞는 경우
			String accessToken = JwtTokenUtil.getToken(userId);
			String refreshToken = JwtTokenUtil.getRefreshToken(userId, 5);
			// refreshToken DB에 넣기
			userService.updateUserRefreshToken(userId, refreshToken);
			// 로그인 성공으로 응답.(액세스 토큰을 포함하여 응답값 전달)
			return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", UserLoginPostRes.of(accessToken, refreshToken, user.getUserNickname(), user.getUserType(), user.getUserId())));
		}
		// 유효하지 않는 패스워드인 경우, 로그인 실패로 응답.
		return ResponseEntity.status(401).body(BaseResponseBody.of(401, "Invalid User", null));
	}

	// 로그아웃 =========================================================================================================
	@PostMapping("/logout/")
	@ApiOperation(value = "로그아웃", notes = "로그아웃한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "Success", response = BaseResponseBody.class),
	})
	public ResponseEntity<BaseResponseBody> logout(
			@RequestBody @ApiParam(value="회원 아이디", required = true) String userId) {
		userService.logout(userId);
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", null));
	}

	// 회원 정보 조회 ====================================================================================================
	@PostMapping("/")
	@ApiOperation(value = "회원 정보 조회", notes = "<strong>회원 닉네임</strong>을 통해 로그인한 회원과 접근하려는 회원을 비교하여 알맞은 정보를 응답한다.")
    @ApiResponses({
        @ApiResponse(code = 200, message = "MySuccess", response = UserMyRes.class),
		@ApiResponse(code = 201, message = "YourSuccess", response = UserYourRes.class),
        @ApiResponse(code = 404, message = "Invalid Nickname", response = BaseResponseBody.class),
		@ApiResponse(code = 403, message = "Invalid User", response = BaseResponseBody.class)
    })
	public ResponseEntity<BaseResponseBody> getUserInfo(
			@ApiIgnore Authentication authentication,
			@RequestBody @ApiParam(value="회원 닉네임", required = true) Map<String, String> data) {
		/**
		 * 요청 헤더 액세스 토큰이 포함된 경우에만 실행되는 인증 처리이후, 리턴되는 인증 정보 객체(authentication) 통해서 요청한 유저 식별.
		 * 액세스 토큰이 없이 요청하는 경우, 403 에러({"error": "Forbidden", "message": "Access Denied"}) 발생.
		 */
		User user = userService.getUserByUserNickname(data.get("userNickname"));
		// 해당 닉네임의 유저 없음
		if(user == null) {
			return ResponseEntity.status(404).body(new BaseResponseBody(404, "Invalid Nickname", null));
		}
		// 토큰에 문제가 있을 때
		if(authentication == null) {
			return ResponseEntity.status(403).body(BaseResponseBody.of(403, "Invalid User", null));
		}
		// 비로그인 시
		if(authentication.getPrincipal().equals("1")) {
			return ResponseEntity.status(201).body(BaseResponseBody.of(201, "YourSuccess", UserYourRes.of(user)));
		}
		// 정상 로그인 유저가 정상 닉네임 유저를 찾아갈 때
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String loginUserId = userDetails.getUsername();
		User loginUser = userService.getUserByUserId(loginUserId);
		if(user.getUserId().equals(loginUserId)) {
			return ResponseEntity.status(200).body(BaseResponseBody.of(200, "MySuccess", UserMyRes.of(loginUser)));
		} else {
			return ResponseEntity.status(201).body(BaseResponseBody.of(201, "YourSuccess", UserYourRes.of(user)));
		}
	}

	// 회원 정보 수정 ====================================================================================================
	@PutMapping("/")
	@ApiOperation(value = "회원 정보 수정", notes = "회원 정보를 수정하고 수정된 회원 정보를 반환한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "Success", response = UserMyRes.class)
	})
	public ResponseEntity<BaseResponseBody> modifyProfile(
			@ApiIgnore Authentication authentication,
			@RequestPart @ApiParam(value="수정 회원 정보", required = true) UserModifyReq modifyInfo,
			@RequestPart(required = false) @ApiParam(value="수정 회원 프로필 파일") MultipartFile file) throws IOException {
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String loginUserId = userDetails.getUsername();
		User user = userService.updateUser(loginUserId, modifyInfo, file != null, modifyInfo.getIsProfile().equals("true"));
		if(file != null) {
			s3Uploader.uploadFiles(file, "img/profile", user.getUserId());
		}
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", UserMyRes.of(user)));
	}

	// 비밀번호 수정 ====================================================================================================
	@PutMapping("/password")
	@ApiOperation(value = "비밀번호 수정", notes = "현재 비밀번호를 확인하고 맞다면 새 비밀번호로 수정한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "Success", response = BaseResponseBody.class),
			@ApiResponse(code = 401, message = "Invalid Password", response = BaseResponseBody.class)
	})
	public ResponseEntity<BaseResponseBody> modifyPw(
			@ApiIgnore Authentication authentication,
			@RequestBody @ApiParam(value="비밀번호 정보", required = true) UserPasswordModifyReq pwInfo) {
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String loginUserId = userDetails.getUsername();
		User user = userService.getUserByUserId(loginUserId);
		if(passwordEncoder.matches(pwInfo.getNowPassword(), user.getUserPw())) {
			userService.updatePw(loginUserId, pwInfo.getNewPassword());
			return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", null));
		}
		return ResponseEntity.status(401).body(BaseResponseBody.of(401, "Invalid Password", null));
	}

	// 비밀번호 찾기 ====================================================================================================
	@PostMapping("/password")
	@ApiOperation(value = "비밀번호 찾기", notes = "랜덤한 비밀번호를 생성한 후 회원의 비밀번호를 랜덤 비밀번호로 수정하고 해당 정보를 회원 이메일로 전송한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "Success", response = BaseResponseBody.class),
			@ApiResponse(code = 401, message = "Invalid Email", response = BaseResponseBody.class)
	})
	public ResponseEntity<BaseResponseBody> searchPw(
			@RequestBody @ApiParam(value="회원 아이디 및 이메일", required = true) UserPasswordSearchReq info) throws MessagingException {
		String userId = info.getUserId();
		String userEmail = info.getUserEmail();
		User user = userService.getUserByUserId(userId);
		if(user.getUserEmail().equals(userEmail)) {
			// 랜덤 비밀번호 생성 (newPw)
			int leftLimit = 48; // numeral '0'
			int rightLimit = 122; // letter 'z'
			int targetStringLength = 15;
			Random random = new Random();
			String newPw = random.ints(leftLimit,rightLimit + 1)
					.filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
					.limit(targetStringLength)
					.collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
					.toString();
			// 회원 비밀번호 변경
			userService.updatePw(userId, newPw);
			// 메일 보내기
			MailUtil mail = new MailUtil();
			mail.setTitle("[CHUKKA] 비밀번호 변경 안내입니다.");
			mail.setContent("변경된 비밀번호는 다음과 같습니다 : " + newPw);
			mail.setAddress(userEmail);
			userService.sendPw(mail);
			return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", null));
		}
		return ResponseEntity.status(401).body(BaseResponseBody.of(401, "Invalid Email", null));
	}

	// 수정 필요 ********************************************************************************************************
	// - 라이브 / 녹화 강의 모두 가져오기 ***********************************************************************************
	// 마이페이지 수강 목록 ================================================================================================
	@GetMapping("/mylectures/")
	@ApiOperation(value = "나의 수강 목록", notes = "<strong>토큰</strong>을 통해 회원의 수강 강의 목록을 반환한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "Success", response = UserMyLectureListRes.class)
	})
	public ResponseEntity<BaseResponseBody> getMyLecture(
			@ApiIgnore Authentication authentication) {
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String loginUserId = userDetails.getUsername();
		List<UserMyLectureRes> list = userService.getLecturesByUserId(loginUserId);
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", UserMyLectureListRes.of(list)));
	}

	// 마이페이지 스낵스 목록 ==============================================================================================
	@GetMapping("/mysnacks/")
	@ApiOperation(value = "나의 스낵스 목록", notes = "<strong>토큰</strong>을 통해 회원의 업로드 스낵스 목록을 반환한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "Success", response = SnacksRes.class)
	})
	public ResponseEntity<BaseResponseBody> getMySnacks(
			@ApiIgnore Authentication authentication) {
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String loginUserId = userDetails.getUsername();
		List<SnacksRes> list = userService.getSnacksByUserId(loginUserId);
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", list));
	}

	// 마이페이지 결제 목록 ================================================================================================
	@GetMapping("/myorders/")
	@ApiOperation(value = "나의 결제 목록", notes = "<strong>토큰</strong>을 통해 회원의 결제 목록을 반환한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "Success", response = UserMyPayRes.class)
	})
	public ResponseEntity<BaseResponseBody> getMyOrders(
			@ApiIgnore Authentication authentication) {
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String loginUserId = userDetails.getUsername();
		List<UserMyPayRes> list = userService.getPaysByUserId(loginUserId);
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", list));

	}

	// 강사 강의 목록 ====================================================================================================
	@GetMapping("/myteach/")
	@ApiOperation(value = "강사 강의 목록", notes = "<strong>토큰</strong>을 통해 강사의 강의 목록을 반환한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "Success", response = UserMyPayRes.class)
	})
	public ResponseEntity<BaseResponseBody> getMyInsLecture(
			@ApiIgnore Authentication authentication) {
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String loginUserId = userDetails.getUsername();
		List<UserMyInsLectureRes> list = userService.getLecturesByInstructorId(loginUserId);
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", list));
	}

	// 회원 탈퇴 ========================================================================================================
	@PostMapping("/quit/")
	@ApiOperation(value = "회원 탈퇴", notes = "<strong>비밀번호</strong>를 받아 확인한 후 현재 로그인한 회원의 계정을 삭제한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "Success", response = BaseResponseBody.class),
			@ApiResponse(code = 401, message = "Invalid Password", response = BaseResponseBody.class)
	})
	public ResponseEntity<BaseResponseBody> quit(
			@ApiIgnore Authentication authentication,
			@RequestBody @ApiParam(value="비밀번호 정보", required = true) String password) {
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String loginUserId = userDetails.getUsername();
		User user = userService.getUserByUserId(loginUserId);
		if(passwordEncoder.matches(password, user.getUserPw())) {
			userService.quit(loginUserId);
			return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", null));
		}
		return ResponseEntity.status(401).body(BaseResponseBody.of(401, "Invalid Password", null));
	}

	// 리프레시 토큰으로 어세스 토큰 발급 ===================================================================================
	@PostMapping("/refresh/")
	@ApiOperation(value = "토큰 재발급", notes = "<strong>리프레시 토큰</strong>을 통해 어세스 토큰을 재발급한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "Success", response = UserReAuthRes.class),
			@ApiResponse(code = 401, message = "Invalid Token", response = BaseResponseBody.class)
	})
	public ResponseEntity<? extends BaseResponseBody> reauth(
			@RequestBody @ApiParam(value="유저 아이디", required = true) Map<String, String> data,
			HttpServletRequest req) {
		String refreshToken = req.getHeader("refresh-token");
		String userId = data.get("userId");
		User user = userService.getUserByRefreshToken(refreshToken);
		if(user.getUserId().equals(userId)) {
			String accessToken = JwtTokenUtil.getToken(userId);
			return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", UserReAuthRes.of(accessToken)));
		}
		return ResponseEntity.status(200).body(BaseResponseBody.of(401, "Invalid Token", null));
	}
}
