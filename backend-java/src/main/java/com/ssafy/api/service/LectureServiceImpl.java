package com.ssafy.api.service;


import com.ssafy.api.request.lecture.LecturePostReq;
import com.ssafy.api.request.lecture.LectureUpdateReq;
import com.ssafy.api.response.lecture.LectureNoticeRes;
import com.ssafy.db.entity.Instructor;
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
    public Lecture createLecture(LecturePostReq lecturePostReq) {
        Lecture lecture = new Lecture();
        Instructor instructor = new Instructor();
        instructor.setInsId(lecturePostReq.getInsId());
        lecture.setInstructor(instructor);
        lecture.setThumbnail(lecturePostReq.getThumbnail());
        lecture.setLecTitle(lecturePostReq.getLecTitle());
        lecture.setLecContents(lecturePostReq.getLecContents());
        lecture.setLecPrice(lecture.getLecPrice());
        lecture.setLecNotice(lecturePostReq.getLecNotice());
        lecture.setLecStartDate(lecturePostReq.getLecStartDate());
        lecture.setLecEndDate(lecturePostReq.getLecEndDate());
        lecture.setLecCategory(lecturePostReq.getLecCategory());
        lecture.setLecLevel(lecturePostReq.getLecLevel());
        lecture.setLecLimit(lecturePostReq.getLecLimit());
        lecture.setLecGenre(lecturePostReq.getLecGenre());
        return lectureRepository.save(lecture);
    }

    @Override
    public void updateLecture(int lecId, LectureUpdateReq lectureUpdateReq) {

        int lecInfo = lecId;
        lectureRepository.updateLecture(lecInfo,
                lectureUpdateReq.getThumbnail(),
                lectureUpdateReq.getLecTitle(),
                lectureUpdateReq.getLecContents(),
                lectureUpdateReq.getLecPrice(),
                lectureUpdateReq.getLecNotice(),
                lectureUpdateReq.getLecStartDate(),
                lectureUpdateReq.getLecEndDate(),
                lectureUpdateReq.getLecCategory(),
                lectureUpdateReq.getLecLevel(),
                lectureUpdateReq.getLecLimit(),
                lectureUpdateReq.getLecGenre());
    }

    @Override
    public Lecture updateLecNotice(int lecId, String lecNotice) {
        lectureRepository.updateLecNotice(lecId, lecNotice);
        return null;

    }

    @Override
    public Integer deleteByLecId(int lecId) {
        lectureRepository.deleteByLecId(lecId);
        return null;
    }
}
