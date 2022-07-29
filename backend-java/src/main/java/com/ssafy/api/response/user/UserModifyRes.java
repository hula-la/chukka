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
@ApiModel("UserModifyResponse")
public class UserModifyRes extends BaseResponseBody{
	@ApiModelProperty(name="유저 Id", example="your_nickname")
	String userNickname;
	@ApiModelProperty(name="유저 Profile", example="img/profile.png")
	String userProfile;
	
	public static UserModifyRes of(Integer statusCode, String message, String userNickname, String userProfile) {
		UserModifyRes res = new UserModifyRes();
		res.setStatusCode(statusCode);
		res.setMessage(message);
		res.setUserNickname(userNickname);
		res.setUserProfile(userProfile);
		return res;
	}
}
