package com.ssafy.api.response.user;

import com.ssafy.common.model.response.BaseResponseBody;
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
@ApiModel("UserMySnacksListResponse")
public class UserMySnacksListRes{
	@ApiModelProperty(name="스낵스 정보")
	List<Snacks> snacksInfo;
	
	public static UserMySnacksListRes of(List<Snacks> snacksInfo) {
		UserMySnacksListRes res = new UserMySnacksListRes();
		res.setSnacksInfo(snacksInfo);
		return res;
	}
}
