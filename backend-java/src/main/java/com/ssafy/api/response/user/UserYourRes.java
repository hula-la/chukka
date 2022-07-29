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
public class UserYourRes extends BaseResponseBody {
	@ApiModelProperty(name="User ID")
	String userId;
	@ApiModelProperty(name="User Name")
	String userName;
	@ApiModelProperty(name="User Phone")
	String userPhone;
	@ApiModelProperty(name="User Email")
	String userEmail;

	public static UserYourRes of(Integer statusCode, String message, User user) {
		UserYourRes res = new UserYourRes();
		res.setStatusCode(statusCode);
		res.setMessage(message);
		res.setUserId(user.getUserId());
		res.setUserName(user.getUserName());
		res.setUserPhone(user.getUserPhone());
		res.setUserEmail(user.getUserEmail());
		return res;
	}
}
