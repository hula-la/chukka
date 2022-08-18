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
public class UserLoginPostRes{
	@ApiModelProperty(name="JWT 인증 토큰", example="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN...")
	String accessToken;
	@ApiModelProperty(name="JWT 리프레쉬 토큰", example="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN...")
	String refreshToken;
	@ApiModelProperty(name="유저 Nickname", example="your_nickname")
	String userNickname;
	@ApiModelProperty(name="유저 Type", example="0")
	int userType;
	@ApiModelProperty(name="유저 Id", example="your_id")
	String userId;

	public static UserLoginPostRes of(String accessToken, String refreshToken, String userNickname, int userType, String userId) {
		UserLoginPostRes res = new UserLoginPostRes();
		res.setAccessToken(accessToken);
		res.setRefreshToken(refreshToken);
		res.setUserNickname(userNickname);
		res.setUserType(userType);
		res.setUserId(userId);
		return res;
	}
}
