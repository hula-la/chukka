package com.ssafy.api.response.user;

import com.ssafy.db.entity.PayList;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 유저 로그인 API ([POST] /api/v1/auth) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("UserPayListResponse")
public class UserPayListRes {
	@ApiModelProperty(name="주문 목록 아이디", example="1")
	int paylistId;
	@ApiModelProperty(name="강의 아이디", example="1")
	int lecId;
	@ApiModelProperty(name="강의 아이디2", example="1")
	int lecId2;


	public static UserPayListRes of(PayList payList) {
		UserPayListRes res = new UserPayListRes();
		res.setPaylistId(payList.getPaylistId());
		res.setLecId(payList.getLecture().getLecId());
		return res;
	}
}
