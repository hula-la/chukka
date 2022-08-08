package com.ssafy.api.response.user;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Pay;
import com.ssafy.db.entity.PayList;
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
@ApiModel("UserMyPayResponse")
public class UserMyPayRes{
	// 결제 번호, 결제 날짜, 결제 강의 수, 결제 수단, 결제 강의 리스트
	@ApiModelProperty(name="주문목록 아이디", example="1")
	int paylistId;
	@ApiModelProperty(name="구매자 아이디", example="your_id")
	String userId;
	@ApiModelProperty(name="강의명", example="Introduction of Advanced Dance")
	int lecId;
	
	public static UserMyPayRes of(PayList paylist) {
		UserMyPayRes res = new UserMyPayRes();
		res.setPaylistId(paylist.getPaylistId());
		return res;
	}
}
