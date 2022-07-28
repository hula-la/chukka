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
public class UserMyPayRes extends BaseResponseBody{
	// 결제 번호, 결제 날짜, 결제 강의 수, 결제 수단, 결제 강의 리스트
	@ApiModelProperty(name="강의 아이디", example="1")
	int payId;
	@ApiModelProperty(name="강의 썸네일", example="img/thumbnail.png")
	Date payDate;
	@ApiModelProperty(name="강의명", example="Introduction of Advanced Dance")
	int payAmount;
	@ApiModelProperty(name="강사명", example="Kim")
	int payMethod;
	@ApiModelProperty(name="강사명", example="Kim")
	List<PayList> payList;
	
	public static UserMyPayRes of(Integer statusCode, String message, Pay pay) {
		UserMyPayRes res = new UserMyPayRes();
		res.setStatusCode(statusCode);
		res.setMessage(message);
		res.setPayId(pay.getPayId());
		res.setPayDate(pay.getPayDate());
		res.setPayAmount(pay.getPayAmount());
		res.setPayMethod(pay.getPayMethod());
		res.setPayList(pay.getPayLists());
		return res;
	}
}
