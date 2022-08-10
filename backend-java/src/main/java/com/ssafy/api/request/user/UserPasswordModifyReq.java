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
@ApiModel("UserPasswordModifyRequest")
public class UserPasswordModifyReq {
	@ApiModelProperty(name="현재 Password", example="now_password")
	String nowPassword;
	@ApiModelProperty(name="새 Password", example="new_password")
	String newPassword;
}
