package com.ssafy.api.response.user;

import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 유저 로그인 API ([POST] /api/v1/auth) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("UserMyLectureResponse")
public class UserMyLectureRes{
	// 강의 썸네일, 강의명, 강사명 정도
	@ApiModelProperty(name="강의 아이디", example="1")
	int lecId;
	@ApiModelProperty(name="강의 썸네일", example="img/thumbnail.png")
	String lecThumb;
	@ApiModelProperty(name="강의명", example="Introduction of Advanced Dance")
	String lecTitle;
	@ApiModelProperty(name="강사명", example="Kim")
	String instructor;
	
	public static UserMyLectureRes of(int lecId, String lecThumb, String lecTitle, String instructor) {
		UserMyLectureRes res = new UserMyLectureRes();
		res.setLecId(lecId);
		res.setLecThumb(lecThumb);
		res.setLecTitle(lecTitle);
		res.setInstructor(instructor);
		return res;
	}
}
