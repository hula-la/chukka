package com.ssafy.api.response.admin;

import com.ssafy.db.entity.Lecture;
import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

/**
 * 유저 로그인 API ([POST] /api/v1/auth) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("LectureResponse")
public class LectureRes {

	@ApiModelProperty(name="강의 아이디")
	int lecId;
	@ApiModelProperty(name="강사 이름")
	String insId;
	@ApiModelProperty(name="강의 제목")
	String lecTitle;
	@ApiModelProperty(name="강의 내용")
	String lecContents;
	@ApiModelProperty(name="강의 가격")
	int lecPrice;
	@ApiModelProperty(name="강의 공지사항")
	String lecNotice;
	@ApiModelProperty(name="강의 시작일")
	Date lecStartDate;
	@ApiModelProperty(name="강의 종료일")
	Date lecEndDate;
	@ApiModelProperty(name="강의 카테고리 (0 : 라이브 1 : 녹화)")
	int lecCategory;
	@ApiModelProperty(name="강의 난이도")
	int lecLevel;
	@ApiModelProperty(name="수강생 인원제한")
	int lecLimit;
	@ApiModelProperty(name="현재수강인원")
	int lecStudent;
	@ApiModelProperty(name="강의 장르")
	String lecGenre;
	@ApiModelProperty(name="강의 썸네일")
	String lecThumb;


	public static LectureRes of(Lecture lecture) {
		LectureRes res = new LectureRes();
		res.setLecId(lecture.getLecId());
		res.setInsId(lecture.getInstructor().getInsId());
		res.setLecTitle(lecture.getLecTitle());
		res.setLecContents(lecture.getLecContents());
		res.setLecPrice(lecture.getLecPrice());
		res.setLecNotice(lecture.getLecNotice());
		res.setLecStartDate(lecture.getLecStartDate());
		res.setLecEndDate(lecture.getLecEndDate());
		res.setLecCategory(lecture.getLecCategory());
		res.setLecLevel(lecture.getLecLevel());
		res.setLecLimit(lecture.getLecLimit());
		res.setLecStudent(lecture.getLecStudent());
		res.setLecGenre(lecture.getLecGenre());
		res.setLecThumb(lecture.getLecThumb());
		return res;
	}
}
