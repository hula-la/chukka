package com.ssafy.api.controller;

import com.ssafy.api.request.user.UserModifyReq;
import com.ssafy.api.response.user.UserModifyRes;
import com.ssafy.api.response.user.UserYourRes;
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

	// 회원 가입 ========================================================================================================
	@PostMapping("/signup/")
	@ApiOperation(value = "회원 가입", notes = "<strong>아이디와 패스워드</strong>를 통해 회원가입 한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "Success")
	})
	public ResponseEntity<? extends BaseResponseBody> register(
			@RequestBody @ApiParam(value="회원가입 정보", required = true) UserRegisterPostReq registerInfo) {

		//임의로 리턴된 User 인스턴스. 현재 코드는 회원 가입 성공 여부만 판단하기 때문에 굳이 Insert 된 유저 정보를 응답하지 않음.
		User user = userService.createUser(registerInfo);

		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
	}

	// 로그인 ===========================================================================================================
	@PostMapping("/login/")
	@ApiOperation(value = "로그인", notes = "<strong>아이디와 패스워드</strong>를 통해 로그인 한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "Success", response = UserLoginPostRes.class),
			@ApiResponse(code = 401, message = "Invalid Password", response = BaseResponseBody.class)
	})
	public ResponseEntity<UserLoginPostRes> login(@RequestBody @ApiParam(value="로그인 정보", required = true) UserLoginPostReq loginInfo) {
		String userId = loginInfo.getUserId();
		String password = loginInfo.getUserPw();

		User user = userService.getUserByUserId(userId);
		// 로그인 요청한 유저로부터 입력된 패스워드 와 디비에 저장된 유저의 암호화된 패스워드가 같은지 확인.(유효한 패스워드인지 여부 확인)
		if(passwordEncoder.matches(password, user.getUserPw())) {
			// 유효한 패스워드가 맞는 경우
			String accessToken = JwtTokenUtil.getToken(userId);
			// accessToken DB에 넣기
			Integer res = userService.updateUserToken(userId, accessToken);
			// 로그인 성공으로 응답.(액세스 토큰을 포함하여 응답값 전달)
			return ResponseEntity.ok(UserLoginPostRes.of(200, "Success", accessToken, user.getUserNickname(), user.getUserProfile()));
		}
		// 유효하지 않는 패스워드인 경우, 로그인 실패로 응답.
		return ResponseEntity.status(401).body(UserLoginPostRes.of(401, "Invalid Password", null, null, null));
	}

	// 회원 정보 조회 ====================================================================================================
	@PostMapping("/")
	@ApiOperation(value = "회원 정보 조회", notes = "로그인한 회원과 접근하려는 회원을 비교하여 알맞은 정보를 응답한다.")
    @ApiResponses({
        @ApiResponse(code = 200, message = "Success"),
        @ApiResponse(code = 401, message = "No Such User"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<?> getUserInfo(@ApiIgnore Authentication authentication, @RequestBody @ApiParam(value="회원 닉네임", required = true) String userNickname) {
		/**
		 * 요청 헤더 액세스 토큰이 포함된 경우에만 실행되는 인증 처리이후, 리턴되는 인증 정보 객체(authentication) 통해서 요청한 유저 식별.
		 * 액세스 토큰이 없이 요청하는 경우, 403 에러({"error": "Forbidden", "message": "Access Denied"}) 발생.
		 */
		// 로그인
		User user = userService.getUserByUserNickname(userNickname);
		if(user == null) {
			return ResponseEntity.status(401).body(new BaseResponseBody(401, "No Such User"));
		}
		if(authentication != null) {
			SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
			String loginUserId = userDetails.getUsername();
			User loginUser = userService.getUserByUserId(loginUserId);
			if(user.getUserId().equals(loginUser.getUserId())) {
				return ResponseEntity.status(200).body(UserMyRes.of(200, "Success", loginUser));
			} else {
				return ResponseEntity.status(200).body(UserYourRes.of(200, "Success", user));
			}
		// 비로그인
		} else {
			return ResponseEntity.status(200).body(UserYourRes.of(200, "Success", user));
		}
	}

	// 회원 정보 수정 ====================================================================================================
	@PutMapping("/")
	@ApiOperation(value = "회원 정보 수정", notes = "회원 정보를 수정 한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "Success", response = UserLoginPostRes.class),
			@ApiResponse(code = 401, message = "인증 실패", response = BaseResponseBody.class),
			@ApiResponse(code = 404, message = "사용자 없음", response = BaseResponseBody.class),
			@ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
	})
	public ResponseEntity<UserModifyRes> modifyProfile(@ApiIgnore Authentication authentication, @RequestBody @ApiParam(value="수정 회원 정보", required = true) UserModifyReq modifyInfo) {
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String loginUserId = userDetails.getUsername();
		Integer res = userService.updateUser(loginUserId, modifyInfo);
		return ResponseEntity.status(200).body(UserModifyRes.of(200, "Success", null, null));
	}

}
