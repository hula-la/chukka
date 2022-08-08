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
@ApiModel("UserYourResponse")
public class UserYourRes{

	@ApiModelProperty(name="User ID")
	String userId;
	@ApiModelProperty(name="User Name", example="your_name")
	String userName;
	@ApiModelProperty(name="User Phone")
	String userPhone;
	@ApiModelProperty(name="User Email")
	String userEmail;
	@ApiModelProperty(name="User Profile", example="https://chukka/user/profile/user_id")
	String userProfile;
	@ApiModelProperty(name="User Gender", example="1")
	int userGender;
	@ApiModelProperty(name="User Nickname", example="your_nickname")
	String userNickname;
	@ApiModelProperty(name="User Lecture Level", example="500")
	private int userLvLec;
	@ApiModelProperty(name="User Snacks Level", example="500")
	private int userLvSnacks;
	@ApiModelProperty(name="User Game Level", example="500")
	private int userLvGame;

	public static UserYourRes of(User user) {
		UserYourRes res = new UserYourRes();
		res.setUserId(user.getUserId());
		res.setUserName(user.getUserName());
		res.setUserPhone(user.getUserPhone());
		res.setUserEmail(user.getUserEmail());
		res.setUserName(user.getUserName());
		res.setUserGender(user.getUserGender());
		res.setUserNickname(user.getUserNickname());
		res.setUserLvLec(user.getUserLvLec());
		res.setUserLvSnacks(user.getUserLvSnacks());
		res.setUserLvGame(user.getUserLvGame());
		res.setUserProfile(user.getUserProfile());
		return res;
	}
}
