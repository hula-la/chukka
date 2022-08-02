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
@ApiModel("UserReAuthResponse")
public class UserReAuthRes{
	@ApiModelProperty(name="재발급 JWT 인증 토큰", example="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN...")
	String accessToken;

	public static UserReAuthRes of(String accessToken) {
		UserReAuthRes res = new UserReAuthRes();
		res.setAccessToken(accessToken);
		return res;
	}
}
