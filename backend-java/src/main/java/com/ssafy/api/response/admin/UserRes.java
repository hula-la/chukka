package com.ssafy.api.response.admin;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

/**
 * 유저 로그인 API ([POST] /api/v1/auth) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("UserResponse")
public class UserRes{

	@ApiModelProperty(name="유저 아이디")
	String userId;
	@ApiModelProperty(name="유저 이름")
	String userName;
	@ApiModelProperty(name="유저 닉네임")
	String userNickname;
	@ApiModelProperty(name="유저 핸드폰 번호")
	String userPhone;
	@ApiModelProperty(name="유저 이메일")
	String userEmail;
	@ApiModelProperty(name="유저 성별")
	int userGender;
	@ApiModelProperty(name="유저 생년월일")
	Date userBirth;
	@ApiModelProperty(name="유저 타입")
	int userType;
	@ApiModelProperty(name="https://chukka/img/profile/user_id")
	String userProfile;

	public static UserRes of(User user) {
		UserRes res = new UserRes();
		res.setUserId(user.getUserId());
		res.setUserName(user.getUserName());
		res.setUserNickname(user.getUserNickname());
		res.setUserPhone(user.getUserPhone());
		res.setUserEmail(user.getUserEmail());
		res.setUserGender(user.getUserGender());
		res.setUserBirth(user.getUserBirth());
		res.setUserType(user.getUserType());
		res.setUserProfile(user.getUserProfile());
		return res;
	}
}
