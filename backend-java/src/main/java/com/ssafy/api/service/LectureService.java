package com.ssafy.api.service;

import com.ssafy.api.request.lecture.LecturePostReq;
import com.ssafy.db.entity.Lecture;

import java.util.List;

/**
 *	강의 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface LectureService {

    // Create
    Lecture createLecture(LecturePostReq lecturePostReq);

    // Read
  	List<Lecture> findAll();

    // Update
    Lecture updateLecNotice(int lecId, String lecNotice);

}
