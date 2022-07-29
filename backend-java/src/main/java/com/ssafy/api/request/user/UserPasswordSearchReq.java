package com.ssafy.api.request.user;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 유저 로그인 API ([POST] /api/v1/auth/login) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("UserPasswordSearchRequest")
public class UserPasswordSearchReq {
	@ApiModelProperty(name="유저 Id", example="your_id")
	String userId;
	@ApiModelProperty(name="유저 Email", example="abcd@ssafy.com")
	String userEmail;
}
