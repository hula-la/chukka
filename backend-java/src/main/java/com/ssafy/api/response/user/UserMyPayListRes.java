package com.ssafy.api.response.user;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Pay;
import com.ssafy.db.entity.Snacks;
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
@ApiModel("UserMyPayListResponse")
public class UserMyPayListRes extends BaseResponseBody{
	@ApiModelProperty(name="결제 정보")
	List<Pay> payInfo;
	
	public static UserMyPayListRes of(List<Pay> payInfo) {
		UserMyPayListRes res = new UserMyPayListRes();
		res.setPayInfo(payInfo);
		return res;
	}
}
