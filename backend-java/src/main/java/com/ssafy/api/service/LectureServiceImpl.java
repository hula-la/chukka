package com.ssafy.api.service;


import com.ssafy.api.request.lecture.*;
import com.ssafy.api.response.admin.LectureRes;
import com.ssafy.api.response.lecture.LectureDetailRes;
import com.ssafy.api.response.lecture.LectureGetForListRes;
import com.ssafy.db.entity.Instructor;
import com.ssafy.db.entity.Lecture;
import com.ssafy.db.repository.InstructorRepository;
import com.ssafy.db.repository.LectureRepository;
import javassist.runtime.Desc;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * 유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("LectureService")
public class LectureServiceImpl implements LectureService {
    @Autowired
    LectureRepository lectureRepository;

    @Autowired
    InstructorRepository instructorRepository;

    // 인기순
    @Override
    public List<LectureGetForListRes> getMostPopularLecture(Pageable pageable) {
        PageRequest pageRequest = PageRequest.of(0, 2);
        List<Lecture> page = lectureRepository.getMostPopularLecture(pageRequest);
        List<LectureGetForListRes> dtoPage = page.stream()
                .map(m -> new LectureGetForListRes(
                        m.getLecThumb(),
                        m.getLecTitle(),
                        m.getLecCategory(),
                        m.getLecLevel(),
                        m.getLecGenre()
                )).collect(Collectors.toList());
        return dtoPage;
    }
    //findAllByLecEndDateGreaterThanOrderByLecId
    // 최신순
    @Override
    public Page<LectureGetForListRes> getMostLatestLectures(Pageable pageable) {
        PageRequest pageRequest = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("lecId").descending());
        Page<Lecture> page = lectureRepository.findAll(pageRequest);
        Page<LectureGetForListRes> dtoPage = page
                .map(m -> LectureGetForListRes.of(
                        m.getLecThumb(),
                        m.getLecTitle(),
                        m.getLecCategory(),
                        m.getLecLevel(),
                        m.getLecGenre()
                ));
        return dtoPage;

    }

    // 전부다
    @Override
    public Page<LectureGetForListRes> findAll(Pageable pageable) {
        PageRequest pageRequest = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), pageable.getSort());
        Page<Lecture> page = lectureRepository.findAll(pageRequest);
        Page<LectureGetForListRes> dtoPage = page
                .map(m -> LectureGetForListRes.of(
                        m.getLecThumb(),
                        m.getLecTitle(),
                        m.getLecCategory(),
                        m.getLecLevel(),
                        m.getLecGenre()
                ));
        return dtoPage;
    }

    // 상세 페이지
    @Override
    public Optional<LectureDetailRes> getDetailLecture(int lecId) {
        Optional<Lecture> lecture = lectureRepository.findById(lecId);
        if (!lecture.isPresent()) {
            return null;
        }
        Optional<LectureDetailRes> dto = lecture
                .map(m -> LectureDetailRes.of(
                        m.getLecId(),
                        m.getLecTitle(),
                        m.getLecLevel(),
                        m.getLecGenre(),
                        m.getLecCategory(),
                        m.getInstructor().getInsName(),
                        m.getInstructor().getInsEmail(),
                        m.getInstructor().getInsIntroduce(),
                        m.getInstructor().getInsProfile(),
                        m.getLecPrice(),
                        m.getLecContents()
                ));
        return dto;
    }

    @Override
    public List<LectureRes> findAll() {
        List<Lecture> lectures = lectureRepository.findAll();
        List<LectureRes> list = new ArrayList<>();
        for (int i = 0; i < lectures.size(); i++) {
            list.add(LectureRes.of(lectures.get(i)));
        }
        return list;
    }

    @Override
    public Lecture createLecture(LecturePostReq lecturePostReq) {
        // 녹화 강의일때
        Optional<Instructor> ins = instructorRepository.findByInsId(lecturePostReq.getInsId());
        if (!ins.isPresent()) {
            return null;
        }
        Lecture lecture = Lecture.builder()
                .instructor(ins.get())
                .lecThumb((lecturePostReq.getLecThumb()))
                .lecTitle(lecturePostReq.getLecTitle())
                .lecContents(lecturePostReq.getLecContents())
                .lecPrice(lecturePostReq.getLecPrice())
                .lecCategory(lecturePostReq.getLecCategory())
                .lecLevel(lecturePostReq.getLecLevel())
                .lecGenre(lecturePostReq.getLecGenre())
                .build();
        return lectureRepository.save(lecture);
    }

    @Override
    public Lecture createLiveLecture(LiveLecturePostReq liveLecturePostReq) {
        Optional<Instructor> ins = instructorRepository.findByInsId(liveLecturePostReq.getInsId());
        if (!ins.isPresent()) {
            return null;
        }
        Lecture lecture = Lecture.builder()
                .instructor(ins.get())
                .lecThumb((liveLecturePostReq.getLecThumb()))
                .lecTitle(liveLecturePostReq.getLecTitle())
                .lecContents(liveLecturePostReq.getLecContents())
                .lecPrice(liveLecturePostReq.getLecPrice())
                .lecCategory(liveLecturePostReq.getLecCategory())
                .lecLevel(liveLecturePostReq.getLecLevel())
                .lecGenre(liveLecturePostReq.getLecGenre())
                .lecNotice(liveLecturePostReq.getLecNotice())
                .lecSchedule(liveLecturePostReq.getLecSchedule())
                .dayAndTime(liveLecturePostReq.getDayAndTime())
                .lecStartDate(liveLecturePostReq.getLecStartDate())
                .lecEndDate(liveLecturePostReq.getLecEndDate())
                .lecStudent(liveLecturePostReq.getLecStudent())
                .lecLimit(liveLecturePostReq.getLecLimit())
                .build();
        return lectureRepository.save(lecture);
    }

    @Override
    public Lecture updateLecture(LectureUpdateReq lectureUpdateReq) {
        if (lectureRepository.findById(lectureUpdateReq.getLecId()).isPresent()) {
            Optional<Instructor> ins = instructorRepository.findByInsId(lectureUpdateReq.getInsId());
            if (!ins.isPresent()) {
                return null;
            }
            Lecture lecture = Lecture.builder()
                    .lecId(lectureUpdateReq.getLecId())
                    .instructor(ins.get())
                    .lecThumb(lectureUpdateReq.getLecThumb())
                    .lecTitle(lectureUpdateReq.getLecTitle())
                    .lecContents(lectureUpdateReq.getLecContents())
                    .lecPrice(lectureUpdateReq.getLecPrice())
                    .lecLevel(lectureUpdateReq.getLecLevel())
                    .lecGenre(lectureUpdateReq.getLecGenre())
                    .build();
            return lectureRepository.save(lecture);
        }
        return null;
    }

    @Override
    public Lecture updateLiveLecture(LiveLectureUpdateReq liveLectureUpdateReq) {
        if (lectureRepository.findById(liveLectureUpdateReq.getInsId()).isPresent()) {
            Optional<Instructor> ins = instructorRepository.findByInsId(liveLectureUpdateReq.getInsId());
            if (!ins.isPresent()) {
                return null;
            }
            Lecture lecture = Lecture.builder()
                    .lecId(liveLectureUpdateReq.getLecId())
                    .instructor(ins.get())
                    .lecThumb(liveLectureUpdateReq.getLecThumb())
                    .lecTitle(liveLectureUpdateReq.getLecTitle())
                    .lecContents(liveLectureUpdateReq.getLecContents())
                    .lecPrice(liveLectureUpdateReq.getLecPrice())
                    .lecLevel(liveLectureUpdateReq.getLecLevel())
                    .lecGenre(liveLectureUpdateReq.getLecGenre())
                    .lecNotice(liveLectureUpdateReq.getLecNotice())
                    .lecSchedule(liveLectureUpdateReq.getLecSchedule())
                    .dayAndTime(liveLectureUpdateReq.getDayAndTime())
                    .lecStartDate(liveLectureUpdateReq.getLecStartDate())
                    .lecEndDate(liveLectureUpdateReq.getLecEndDate())
                    .lecStudent(liveLectureUpdateReq.getLecStudent())
                    .lecLimit(liveLectureUpdateReq.getLecLimit())
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
        Lecture lecture = lectureRepository.findLectureByLecId(lecId);
        lectureRepository.delete(lecture);
    }

    @Override
    public Lecture findLectureByLecId(int ledId) {
        return lectureRepository.findLectureByLecId(ledId);
    }
}
