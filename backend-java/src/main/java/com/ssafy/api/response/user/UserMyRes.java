package com.ssafy.api.response.user;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.User;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;
/**
 * 회원 본인 정보 조회 API ([GET] /api/v1/users/me) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("UserMyResponse")
public class UserMyRes{

	@ApiModelProperty(name="User ID", example="your_id")
	String userId;
	@ApiModelProperty(name="User Name", example="your_name")
	String userName;
	@ApiModelProperty(name="User Phone", example="010-1234-5678")
	String userPhone;
	@ApiModelProperty(name="User Email", example="abcd@ssafy.com")
	String userEmail;
	@ApiModelProperty(name="User Profile", example="https://chukka/user/profile/user_id")
	String userProfile;
	@ApiModelProperty(name="User Gender", example="1")
	private int userGender;
	@ApiModelProperty(name="User Point", example="500")
	private int userPoint;
	@ApiModelProperty(name="User 생년월일", example="2022-01-01")
	private String userBirth;
	@ApiModelProperty(name="User Nickname", example="your_nickname")
	private String userNickname;
	@ApiModelProperty(name="User Lecture Level", example="500")
	private int userLvLec;
	@ApiModelProperty(name="User Snacks Level", example="500")
	private int userLvSnacks;
	@ApiModelProperty(name="User Game Level", example="500")
	private int userLvGame;

	public static UserMyRes of(User user) {
		UserMyRes res = new UserMyRes();
		res.setUserId(user.getUserId());
		res.setUserName(user.getUserName());
		res.setUserPhone(user.getUserPhone());
		res.setUserEmail(user.getUserEmail());
		res.setUserGender(user.getUserGender());
		res.setUserPoint(user.getUserPoint());
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		res.setUserBirth(sdf.format(user.getUserBirth()));
		res.setUserNickname(user.getUserNickname());
		res.setUserLvLec(user.getUserLvLec());
		res.setUserLvSnacks(user.getUserLvSnacks());
		res.setUserLvGame(user.getUserLvGame());
		res.setUserProfile(user.getUserProfile());
		return res;
	}
}
