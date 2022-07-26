package com.ssafy.api.service;

import com.ssafy.api.response.lecture.LectureNoticeRes;
import com.ssafy.db.entity.Lecture;
import com.ssafy.db.repository.LectureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("LectureService")
public class LectureServiceImpl implements LectureService {
    @Autowired
    LectureRepository lectureRepository;

    @Override
    public List<Lecture> findAll() {
        return lectureRepository.findAll();
    }

    @Override
    public Lecture updateLecNotice(int lecId, String lecNotice) {
        lectureRepository.updatLecNotice(lecId, lecNotice);
        return null;

    }

}
