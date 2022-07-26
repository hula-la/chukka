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
@ApiModel("UserModifyRequest")
public class UserModifyReq {
	@ApiModelProperty(name="유저 Name", example="your_name")
	String userName;
	@ApiModelProperty(name="유저 Phone", example="your_phone")
	String userPhone;
	@ApiModelProperty(name="유저 Email", example="your_email")
	String userEmail;
	@ApiModelProperty(name="유저 Gender", example="your_gender")
	String userGender;
	@ApiModelProperty(name="유저 Age", example="your_age")
	String userAge;
	@ApiModelProperty(name="유저 Nickname", example="your_nickname")
	String userNickname;
	@ApiModelProperty(name="유저 Profile", example="your_profile")
	String userProfile;
}
