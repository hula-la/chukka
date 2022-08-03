package com.ssafy.api.service;

import com.ssafy.api.request.lecture.LecturePostReq;
import com.ssafy.api.request.lecture.LectureUpdateReq;

import com.ssafy.db.entity.Lecture;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

/**
 *	강의 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface LectureService {

    // Create ==========================================================================================================
    Lecture createLecture(LecturePostReq lecturePostReq);

    // Read ============================================================================================================
    // 전체 강의 중 가장 인기 있는 강의
//    Page<Lecture> getMostPopularLecture(Pageable pageable);

    // 전체 강의 조회
  	Page<Lecture> findAll(Pageable pageable);

    // 결제한 강의 조회

    // Update ==========================================================================================================
    // 강의 수정
    void updateLecture(int lecId, LectureUpdateReq lectureUpdateReq);
    // 공지사항 수정
    void updateLecNotice(int lecId, String lecNotice);

    // Delete ==========================================================================================================
    void delete(int lecId);

}
