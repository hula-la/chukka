package com.ssafy.api.request.user;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.*;
import java.util.Date;

/**
 * 유저 회원가입 API ([POST] /api/v1/users) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("UserRegisterPostRequest")
public class UserRegisterPostReq {

	@NotBlank(message="아이디는 필수값입니다.")
	@Pattern(regexp = "(?=[a-zA-Z]+[0-9a-zA-Z]).{4,16}", message = "아이디는 4~16자 영문 대소문자 또는 숫자를 사용하세요. 첫글자는 알파벳이어야 합니다.")
	@ApiModelProperty(name="유저 ID", example="your_id")
	String userId;
	@NotBlank(message="비밀번호는 필수값입니다.")
	@Pattern(regexp = "(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\\W)(?=\\S+$).{8,16}", message = "비밀번호는 8~16자 영문 대문자, 소문자, 숫자, 그리고 특수문자를 모두 사용하세요.")
	@ApiModelProperty(name="유저 Password", example="your_password")
	String userPw;
	@NotBlank(message="이름은 필수값입니다.")
	@Size(min = 2, message = "이름은 두 글자 이상이어야 합니다.")
	@ApiModelProperty(name="유저 Name", example="your_name")
	String userName;
	@NotBlank(message="핸드폰 번호는 필수값입니다.")
	@Pattern(regexp = "01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})", message = "올바른 형식이 아닙니다. (올바른 형식 : 010-0000-0000)")
	@ApiModelProperty(name="유저 Phone", example="010-1234-5678")
	String userPhone;
	@NotBlank(message="이메일은 필수값입니다.")
	@Email(message = "이메일 형식이 맞지 않습니다.")
	@ApiModelProperty(name="유저 Email", example="abcd@ssafy.com")
	String userEmail;
	@Min(value = 0)
	@Max(value = 1)
	@ApiModelProperty(name="유저 Gender", example="1")
	int userGender;

	@ApiModelProperty(name="유저 프로필", example="img/profile.png")
	String userProfile;

	@NotNull
	@Past(message = "올바른 생년월일이 아닙니다.")
	@ApiModelProperty(name="유저 생년월일", example="2022-01-01")
	Date userBirth;
	@NotBlank(message="닉네임은 필수값입니다.")
	@Size(min = 2, max = 16,message = "닉네임은 두 글자 이상 열여섯 글자 이하이어야 합니다.")
	@ApiModelProperty(name="유저 Nickname", example="your_nickname")
	String userNickname;

}
