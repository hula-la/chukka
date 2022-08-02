package com.ssafy.api.response.admin;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 * 유저 로그인 API ([POST] /api/v1/auth) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("UserListResponse")
public class UserListRes{
	@ApiModelProperty(name="유저 목록")
	List<UserRes> userList;

	public static UserListRes of(List<UserRes> userList) {
		UserListRes res = new UserListRes();
		res.setUserList(userList);
		return res;
	}
}
