package com.ssafy.api.response.user;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Pay;
import com.ssafy.db.entity.PayList;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("UserMyPayResponse")
public class UserMyPayRes{
	// 결제 번호, 결제 날짜, 결제 강의 수, 결제 수단, 결제 강의 리스트
	@ApiModelProperty(name="주문 아이디", example="1")
	int payId;
	@ApiModelProperty(name="구매자 아이디", example="your_id")
	String userId;
	@ApiModelProperty(name="주문날짜", example="2022-01-01")
	Date payDate;
	@ApiModelProperty(name="주문 금액", example="10000")
	int payAmount;
	@ApiModelProperty(name="결제 수단", example="1")
	String payMethod;
	@ApiModelProperty(name="주문 목록")
	List<UserPayListRes> payLists;

}
