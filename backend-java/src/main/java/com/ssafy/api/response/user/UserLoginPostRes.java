package com.ssafy.api.response.user;

import com.ssafy.common.model.response.BaseResponseBody;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 유저 로그인 API ([POST] /api/v1/auth) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("UserLoginPostResponse")
public class UserLoginPostRes extends BaseResponseBody{
	@ApiModelProperty(name="JWT 인증 토큰", example="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN...")
	String accessToken;
<<<<<<< HEAD
=======
	@ApiModelProperty(name="JWT 리프레쉬 토큰", example="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN...")
	String refreshToken;
>>>>>>> 14658720b448e7a95192d1f91a424c627f24a74c
	@ApiModelProperty(name="유저 Id", example="your_nickname")
	String userNickname;
	@ApiModelProperty(name="유저 Profile", example="img/profile.png")
	String userProfile;
	
<<<<<<< HEAD
	public static UserLoginPostRes of(Integer statusCode, String message, String accessToken, String userNickname, String userProfile) {
=======
	public static UserLoginPostRes of(Integer statusCode, String message, String accessToken, String refreshToken, String userNickname, String userProfile) {
>>>>>>> 14658720b448e7a95192d1f91a424c627f24a74c
		UserLoginPostRes res = new UserLoginPostRes();
		res.setStatusCode(statusCode);
		res.setMessage(message);
		res.setAccessToken(accessToken);
<<<<<<< HEAD
=======
		res.setRefreshToken(refreshToken);
>>>>>>> 14658720b448e7a95192d1f91a424c627f24a74c
		res.setUserNickname(userNickname);
		res.setUserProfile(userProfile);
		return res;
	}
}
