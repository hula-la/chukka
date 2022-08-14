package com.ssafy.api.response.user;

import com.ssafy.db.entity.Lecture;
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
	@ApiModelProperty(name="강의 유형", example="1")
	int lecCategory;
	@ApiModelProperty(name="강사이름", example="Kim")
	String instructor;
	
	public static UserMyLectureRes of(Lecture lecture) {
		UserMyLectureRes res = new UserMyLectureRes();
		res.setLecId(lecture.getLecId());
		res.setLecThumb(lecture.getLecThumb());
		res.setLecTitle(lecture.getLecTitle());
		res.setLecCategory(lecture.getLecCategory());
		res.setInstructor(lecture.getInstructor().getInsName());
		return res;
	}
}
