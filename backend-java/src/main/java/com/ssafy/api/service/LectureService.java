package com.ssafy.api.service;

<<<<<<< HEAD
import com.ssafy.api.request.lecture.LecturePostReq;
import com.ssafy.api.request.lecture.LectureUpdateReq;
=======
>>>>>>> 14658720b448e7a95192d1f91a424c627f24a74c
import com.ssafy.db.entity.Lecture;

import java.util.List;

/**
 *	강의 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface LectureService {

<<<<<<< HEAD
    // Create ==========================================================================================================
    Lecture createLecture(LecturePostReq lecturePostReq);

    // Read ============================================================================================================
    // 전체 강의 조회
  	List<Lecture> findAll();

    // 결제한 강의 조회

    // Update ==========================================================================================================
    // 강의 수정
    Lecture updateLecture(int lecId, LectureUpdateReq lectureUpdateReq);
    // 공지사항 수정
    Lecture updateLecNotice(int lecId, String lecNotice);

    // Delete ==========================================================================================================
    Integer deleteByLecId(int lecId);
=======
    // Read
  	List<Lecture> findAll();

    // Update
    Lecture updateLecNotice(int lecId, String lecNotice);

>>>>>>> 14658720b448e7a95192d1f91a424c627f24a74c
}
