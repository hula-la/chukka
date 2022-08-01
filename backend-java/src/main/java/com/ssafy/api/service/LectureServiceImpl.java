package com.ssafy.api.service;


import com.ssafy.api.request.lecture.LecturePostReq;
import com.ssafy.api.request.lecture.LectureUpdateReq;
import com.ssafy.api.response.lecture.LectureNoticeRes;
import com.ssafy.db.entity.Lecture;
import com.ssafy.db.repository.LectureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * 유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("LectureService")
public class LectureServiceImpl implements LectureService {
    @Autowired
    LectureRepository lectureRepository;

    @Override
    public Page<Lecture> findAll(Pageable pageable) {
        PageRequest pageRequest = PageRequest.of(0, 10, Sort.by(Sort.Direction.DESC, "lecStudent"));
        Page<Lecture> page = lectureRepository.findAll(pageRequest);
        return page;
    }

    @Override
    public Lecture createLecture(LecturePostReq lecturePostReq) {
        Lecture lecture = new Lecture();
        lecture.setLecId(lecturePostReq.getLecId());
        return lectureRepository.save(lecture);
    }

    @Override
    public Lecture updateLecture(int lecId, LectureUpdateReq lectureUpdateReq) {

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
        return null;
    }

    @Override
    public void updateLecNotice(int lecId, String lecNotice) {
        lectureRepository.updateLecNotice(lecId, lecNotice);
    }

    @Override
    public void delete(int lecId) {
        lectureRepository.deleteById(lecId);
    }
}
