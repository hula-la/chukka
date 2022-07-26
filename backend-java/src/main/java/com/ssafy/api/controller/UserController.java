package com.ssafy.api.controller;

import com.ssafy.api.request.user.UserModifyReq;
import com.ssafy.api.request.user.UserPasswordModifyReq;
import com.ssafy.api.response.user.UserYourRes;
import com.ssafy.common.util.MailUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
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
import springfox.documentation.annotations.ApiIgnore;

import java.util.Random;

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

	/**
	 * profile (사진파일) 저장하는 코드 짜기
	 * Optional 부분 .get 메서드 쓴 곳 수정 (.get()은 null을 반환하지 않고 Exception을 유발함)
	**/


	// 회원 가입 ========================================================================================================
	@PostMapping("/signup/")
	@ApiOperation(value = "회원 가입", notes = "<strong>아이디, 패스워드, 이름, 핸드폰 번호, 이메일, 성별, 나이, 닉네임, 그리고 프로필</strong>을 통해 회원가입한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "Success")
	})
	public ResponseEntity<? extends BaseResponseBody> register(
			@RequestBody @ApiParam(value="회원가입 정보", required = true) UserRegisterPostReq registerInfo) {
		//임의로 리턴된 User 인스턴스. 현재 코드는 회원 가입 성공 여부만 판단하기 때문에 굳이 Insert 된 유저 정보를 응답하지 않음.
		User user = userService.createUser(registerInfo);
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
	}

	// 아이디 중복 검사 ===================================================================================================
	@GetMapping("/checkid/{userId}")
	@ApiOperation(value = "아이디 중복 검사", notes = "<strong>아이디</strong>를 통해 중복된 아이디인지 검사한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "Success"),
			@ApiResponse(code = 401, message = "Invalid")
	})
	public ResponseEntity<? extends BaseResponseBody> checkId(
			@PathVariable @ApiParam(value="유저 아이디", required = true) String userId) {
		User user = userService.getUserByUserId(userId);
		if(user == null) {
			return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
		}
		return ResponseEntity.status(200).body(BaseResponseBody.of(401, "Invalid"));
	}

	// 닉네임 중복 검사 ===================================================================================================
	@GetMapping("/checkNick/{userNickname}")
	@ApiOperation(value = "닉네임 중복 검사", notes = "<strong>닉네임</strong>을 통해 중복된 닉네임인지 검사한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "Success"),
			@ApiResponse(code = 401, message = "Invalid")
	})
	public ResponseEntity<? extends BaseResponseBody> checkNickname(
			@PathVariable @ApiParam(value="유저 닉네임", required = true) String userNickname) {
		User user = userService.getUserByUserNickname(userNickname);
		if(user == null) {
			return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
		}
		return ResponseEntity.status(200).body(BaseResponseBody.of(401, "Invalid"));
	}

	// 로그인 ===========================================================================================================
	@PostMapping("/login/")
	@ApiOperation(value = "로그인", notes = "<strong>아이디와 패스워드</strong>를 통해 로그인한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "Success", response = UserLoginPostRes.class),
			@ApiResponse(code = 401, message = "Invalid User", response = BaseResponseBody.class)
	})
	public ResponseEntity<? extends BaseResponseBody> login(@RequestBody @ApiParam(value="로그인 정보", required = true) UserLoginPostReq loginInfo) {
		String userId = loginInfo.getUserId();
		String password = loginInfo.getUserPw();
		User user = userService.getUserByUserId(userId);
		if(user == null) {
			return ResponseEntity.status(401).body(UserLoginPostRes.of(401, "Invalid User", null, null, null));
		}
		// 로그인 요청한 유저로부터 입력된 패스워드와 디비에 저장된 유저의 암호화된 패스워드가 같은지 확인.(유효한 패스워드인지 여부 확인)
		if(passwordEncoder.matches(password, user.getUserPw())) {
			// 유효한 패스워드가 맞는 경우
			String accessToken = JwtTokenUtil.getToken(userId);
			// accessToken DB에 넣기
			Integer res = userService.updateUserToken(userId, accessToken);
			// 로그인 성공으로 응답.(액세스 토큰을 포함하여 응답값 전달)
			return ResponseEntity.ok(UserLoginPostRes.of(200, "Success", accessToken, user.getUserNickname(), user.getUserProfile()));
		}
		// 유효하지 않는 패스워드인 경우, 로그인 실패로 응답.
		return ResponseEntity.status(200).body(BaseResponseBody.of(401, "Invalid User"));
	}

	// 수정 필요 ********************************************************************************************************
	// 로그아웃 =========================================================================================================
//	@PostMapping("/logout/")
//	@ApiOperation(value = "로그아웃", notes = "로그아웃한다.")
//	@ApiResponses({
//			@ApiResponse(code = 200, message = "Success", response = UserLoginPostRes.class),
//			@ApiResponse(code = 401, message = "Invalid Password", response = BaseResponseBody.class)
//	})
//	public ResponseEntity<UserLoginPostRes> logout(@RequestBody @ApiParam(value="로그인 정보", required = true) UserLoginPostReq loginInfo) {
//		String userId = loginInfo.getUserId();
//		String password = loginInfo.getUserPw();
//
//		User user = userService.getUserByUserId(userId);
//		// 로그인 요청한 유저로부터 입력된 패스워드 와 디비에 저장된 유저의 암호화된 패스워드가 같은지 확인.(유효한 패스워드인지 여부 확인)
//		if(passwordEncoder.matches(password, user.getUserPw())) {
//			// 유효한 패스워드가 맞는 경우
//			String accessToken = JwtTokenUtil.getToken(userId);
//			// accessToken DB에 넣기
//			Integer res = userService.updateUserToken(userId, accessToken);
//			// 로그인 성공으로 응답.(액세스 토큰을 포함하여 응답값 전달)
//			return ResponseEntity.ok(UserLoginPostRes.of(200, "Success", accessToken, user.getUserNickname(), user.getUserProfile()));
//		}
//		// 유효하지 않는 패스워드인 경우, 로그인 실패로 응답.
//		return ResponseEntity.status(401).body(UserLoginPostRes.of(401, "Invalid Password", null, null, null));
//	}

	// 회원 정보 조회 ====================================================================================================
	@PostMapping("/")
	@ApiOperation(value = "회원 정보 조회", notes = "<strong>회원 닉네임</strong>을 통해 로그인한 회원과 접근하려는 회원을 비교하여 알맞은 정보를 응답한다.")
    @ApiResponses({
        @ApiResponse(code = 200, message = "MySuccess", response = UserMyRes.class),
		@ApiResponse(code = 201, message = "YourSuccess", response = UserYourRes.class),
        @ApiResponse(code = 401, message = "Invalid Nickname", response = BaseResponseBody.class)
    })
	public ResponseEntity<?> getUserInfo(@ApiIgnore Authentication authentication, @RequestBody @ApiParam(value="회원 닉네임", required = true) String userNickname) {
		/**
		 * 요청 헤더 액세스 토큰이 포함된 경우에만 실행되는 인증 처리이후, 리턴되는 인증 정보 객체(authentication) 통해서 요청한 유저 식별.
		 * 액세스 토큰이 없이 요청하는 경우, 403 에러({"error": "Forbidden", "message": "Access Denied"}) 발생.
		 */
		// 로그인
		User user = userService.getUserByUserNickname(userNickname);
		if(user == null) {
			return ResponseEntity.status(401).body(new BaseResponseBody(401, "Invalid Nickname"));
		}
		if(authentication != null) {
			SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
			String loginUserId = userDetails.getUsername();
			User loginUser = userService.getUserByUserId(loginUserId);
			if(user.getUserId().equals(loginUserId)) {
				return ResponseEntity.status(200).body(UserMyRes.of(200, "MySuccess", loginUser));
			} else {
				return ResponseEntity.status(200).body(UserYourRes.of(201, "YourSuccess", user));
			}
		// 비로그인
		} else {
			return ResponseEntity.status(200).body(UserYourRes.of(201, "YourSuccess", user));
		}
	}

	// 회원 정보 수정 ====================================================================================================
	@PutMapping("/")
	@ApiOperation(value = "회원 정보 수정", notes = "회원 정보를 수정하고 수정된 회원 정보를 반환한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "Success", response = UserMyRes.class)
	})
	public ResponseEntity<UserMyRes> modifyProfile(@ApiIgnore Authentication authentication, @RequestBody @ApiParam(value="수정 회원 정보", required = true) UserModifyReq modifyInfo) {
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String loginUserId = userDetails.getUsername();
		User user = userService.updateUser(loginUserId, modifyInfo);
		return ResponseEntity.status(200).body(UserMyRes.of(200, "Success", user));
	}

	// 비밀번호 수정 ====================================================================================================
	@PutMapping("/password")
	@ApiOperation(value = "비밀번호 수정", notes = "현재 비밀번호를 확인하고 맞다면 새 비밀번호로 수정한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "Success", response = BaseResponseBody.class),
			@ApiResponse(code = 401, message = "Invalid Password", response = BaseResponseBody.class)
	})
	public ResponseEntity<? extends BaseResponseBody> modifyPw(@ApiIgnore Authentication authentication, @RequestBody @ApiParam(value="비밀번호 정보", required = true) UserPasswordModifyReq pwInfo) {
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String loginUserId = userDetails.getUsername();
		User user = userService.getUserByUserId(loginUserId);
		if(passwordEncoder.matches(pwInfo.getNowPassword(), user.getUserPw())) {
			userService.updatePw(loginUserId, pwInfo.getNewPassword());
			return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
		}
		return ResponseEntity.status(401).body(BaseResponseBody.of(401, "Invalid Password"));
	}

	// 비밀번호 찾기 ====================================================================================================
	@PostMapping("/password")
	@ApiOperation(value = "비밀번호 찾기", notes = "랜덤한 비밀번호를 생성한 후 회원의 비밀번호를 랜덤 비밀번호로 수정하고 해당 정보를 회원 이메일로 전송한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "Success", response = BaseResponseBody.class),
			@ApiResponse(code = 401, message = "Invalid Email", response = BaseResponseBody.class)
	})
	public ResponseEntity<? extends BaseResponseBody> searchPw(@ApiIgnore Authentication authentication, @RequestBody @ApiParam(value="회원 이메일", required = true) String userEmail) {
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String loginUserId = userDetails.getUsername();
		User user = userService.getUserByUserId(loginUserId);
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
			userService.updatePw(loginUserId, newPw);
			// 메일 보내기
			MailUtil mail = new MailUtil();
			mail.setTitle("[CHUKKA] 비밀번호 변경 안내입니다.");
			mail.setContent("변경된 비밀번호는 다음과 같습니다 : " + newPw);
			mail.setAddress(userEmail);
			userService.sendPw(mail);
			return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
		}
		return ResponseEntity.status(401).body(BaseResponseBody.of(401, "Invalid Email"));
	}

}
