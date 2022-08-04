package com.ssafy.api.service;


import com.ssafy.api.request.lecture.LecturePostReq;
import com.ssafy.api.request.lecture.LectureUpdateReq;
import com.ssafy.api.response.lecture.LectureNoticeRes;
import com.ssafy.api.response.lecture.LecturePopularRes;
import com.ssafy.db.entity.Instructor;
import com.ssafy.db.entity.Lecture;
import com.ssafy.db.repository.InstructorRepository;
import com.ssafy.db.repository.LectureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * 유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("LectureService")
public class LectureServiceImpl implements LectureService {
    @Autowired
    LectureRepository lectureRepository;

    @Autowired
    InstructorRepository instructorRepository;

    @Override
    public Page<LecturePopularRes> getMostPopularLecture(Pageable pageable) {
        PageRequest pageRequest = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize());
        Page<LecturePopularRes> page = lectureRepository.getMostPopularLecture(pageRequest);
        return page;
    }

    @Override
    public Page<Lecture> findAll(Pageable pageable) {
        PageRequest pageRequest = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), pageable.getSort());
        Page<Lecture> page = lectureRepository.findAll(pageRequest);
        return page;
    }

    @Override
    public Lecture createLecture(LecturePostReq lecturePostReq) {
        Optional<Instructor> ins = instructorRepository.findById(lecturePostReq.getInsId());
        if (!ins.isPresent()) {
            return null;
        }
        Lecture lecture = Lecture.builder()
                .instructor(ins.get())
                .lecTitle(lecturePostReq.getLecTitle())
                .lecContents(lecturePostReq.getLecContents())
                .lecPrice(lecturePostReq.getLecPrice())
                .lecNotice(lecturePostReq.getLecNotice())
                .lecStartDate(lecturePostReq.getLecStartDate())
                .lecEndDate(lecturePostReq.getLecEndDate())
                .lecCategory(lecturePostReq.getLecCategory())
                .lecLevel(lecturePostReq.getLecLevel())
                .lecLimit(lecturePostReq.getLecLimit())
                .lecGenre(lecturePostReq.getLecGenre())
                .build();
        return lectureRepository.save(lecture);
    }

    @Override
    public Lecture updateLecture(int lecId, LectureUpdateReq lectureUpdateReq) {
        if (lectureRepository.findById(lecId).isPresent()) {
            Lecture lecture = Lecture.builder().lecId(lecId)
                    .lecTitle(lectureUpdateReq.getLecTitle())
                    .lecContents(lectureUpdateReq.getLecContents())
                    .lecPrice(lectureUpdateReq.getLecPrice())
                    .lecNotice(lectureUpdateReq.getLecNotice())
                    .lecStartDate(lectureUpdateReq.getLecStartDate())
                    .lecEndDate(lectureUpdateReq.getLecEndDate())
                    .lecCategory(lectureUpdateReq.getLecCategory())
                    .lecLevel(lectureUpdateReq.getLecLevel())
                    .lecLimit(lectureUpdateReq.getLecLimit())
                    .lecGenre(lectureUpdateReq.getLecGenre())
                    .build();
            return lectureRepository.save(lecture);

        }
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

    @Override
    public Lecture findLectureByLecId(int ledId) {
        return lectureRepository.findLectureByLecId(ledId);
    }
}
