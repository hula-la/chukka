package com.ssafy.api.response.user;

import com.ssafy.common.model.response.BaseResponseBody;
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
@ApiModel("UserMyLectureListResponse")
public class UserMyLectureListRes{
	// 강의 썸네일, 강의명, 강사명 정도
	@ApiModelProperty(name="강의 정보", example="{lecThumb, lecTitle, instructor}")
	List<UserMyLectureRes> lectureInfo;
	
	public static UserMyLectureListRes of(List<UserMyLectureRes> lectureInfo) {
		UserMyLectureListRes res = new UserMyLectureListRes();
		res.setLectureInfo(lectureInfo);
		return res;
	}
}
