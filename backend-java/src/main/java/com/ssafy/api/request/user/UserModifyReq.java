package com.ssafy.api.request.user;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

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
	@ApiModelProperty(name="유저 생년월일", example="2022-01-01")
	Date userBirth;
	@ApiModelProperty(name="수정 전 유저 Profile 유무", example="true")
	String isProfile;
}
