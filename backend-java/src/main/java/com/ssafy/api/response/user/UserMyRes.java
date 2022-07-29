package com.ssafy.api.response.user;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.User;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 회원 본인 정보 조회 API ([GET] /api/v1/users/me) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("UserMyResponse")
public class UserMyRes extends BaseResponseBody {
	@ApiModelProperty(name="User ID")
	String userId;
	@ApiModelProperty(name="User Name")
	String userName;
	@ApiModelProperty(name="User Phone")
	String userPhone;
	@ApiModelProperty(name="User Email")
	String userEmail;
	@ApiModelProperty(name="User Gender")
	private int userGender;
	@ApiModelProperty(name="User Point")
	private int userPoint;
	@ApiModelProperty(name="User Age")
	private int userAge;
	@ApiModelProperty(name="User Nickname")
	private String userNickname;
	@ApiModelProperty(name="User Profile")
	private String userProfile;
	@ApiModelProperty(name="User Lecture Level")
	private int user_lv_lec;
	@ApiModelProperty(name="User Snacks Level")
	private int user_lv_snacks;
	@ApiModelProperty(name="User Game Level")
	private int user_lv_game;

	public static UserMyRes of(Integer statusCode, String message, User user) {
		UserMyRes res = new UserMyRes();
		res.setStatusCode(statusCode);
		res.setMessage(message);
		res.setUserId(user.getUserId());
		res.setUserName(user.getUserName());
		res.setUserPhone(user.getUserPhone());
		res.setUserEmail(user.getUserEmail());
		return res;
	}
}
