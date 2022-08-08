package com.ssafy.api.service;

import com.ssafy.api.request.lecture.LecturePostReq;
import com.ssafy.api.request.lecture.LectureUpdateReq;
import com.ssafy.api.request.lecture.LiveLecturePostReq;
import com.ssafy.api.request.lecture.LiveLectureUpdateReq;
import com.ssafy.api.response.lecture.LectureGetForListRes;
import com.ssafy.api.response.admin.LectureRes;
import com.ssafy.db.entity.Lecture;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

/**
 *	강의 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface LectureService {

    // Create ==========================================================================================================
    Lecture createLecture(int lecCategory, LecturePostReq lecturePostReq, LiveLecturePostReq liveLecturePostReq);

    // Read ============================================================================================================
    // 인기 있는 강의순
    Page<LectureGetForListRes> getMostPopularLecture(Pageable pageable);

    // 최신 순의 강의
    Page<LectureGetForListRes> getMostLatestLectures(Pageable pageable);

    // 전체 강의 조회
  	Page<LectureGetForListRes> findAll(Pageable pageable);

    List<LectureRes> findAll();

//    Lecture getDetailLecture(int lecId);

    // 결제한 강의 조회

    // Update ==========================================================================================================
    // 강의 수정
    Lecture updateLecture(int lecId, LectureUpdateReq lectureUpdateReq, LiveLectureUpdateReq liveLectureUpdateReq);
    // 공지사항 수정
    void updateLecNotice(int lecId, String lecNotice);

    // Delete ==========================================================================================================
    void delete(int lecId);

    Lecture findLectureByLecId(int ledId);

}
