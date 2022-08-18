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
@ApiModel("UserMyInstructorLectureResponse")
public class UserMyInsLectureRes {
	// 강의 썸네일, 강의명, 강사명, 수강생 수
	@ApiModelProperty(name="강의 아이디", example="1")
	int lecId;
	@ApiModelProperty(name="강의 썸네일", example="img/thumbnail.png")
	String lecThumb;
	@ApiModelProperty(name="강의명", example="Introduction of Advanced Dance")
	String lecTitle;
	@ApiModelProperty(name="수강생 수", example="1")
	int student;
	@ApiModelProperty(name = "라이브 여부", example = "true")
	boolean isLive;

	public static UserMyInsLectureRes of(Lecture lecture) {
		UserMyInsLectureRes res = new UserMyInsLectureRes();
		res.setLecId(lecture.getLecId());
		res.setLecThumb(lecture.getLecThumb());
		res.setLecTitle(lecture.getLecTitle());
		res.setStudent(lecture.getLecStudent());
		res.setLive(lecture.getLecCategory() == 0);
		return res;
	}
}
