package com.ssafy.api.service;


import com.ssafy.api.request.lecture.LecturePostReq;
import com.ssafy.api.request.lecture.LectureUpdateReq;
import com.ssafy.api.response.admin.LectureRes;
import com.ssafy.api.response.lecture.LectureGetForDetailRes;
import com.ssafy.api.response.lecture.LectureGetForListRes;
import com.ssafy.db.entity.Instructor;
import com.ssafy.db.entity.Lecture;
import com.ssafy.db.repository.InstructorRepository;
import com.ssafy.db.repository.LectureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

    // 인기순
    @Override
    public Page<LectureGetForListRes> getMostPopularLecture(Pageable pageable) {
        PageRequest pageRequest = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize());
        Page<Lecture> page = lectureRepository.getMostPopularLecture(pageRequest);
        Page<LectureGetForListRes> dtoPage = page.map(m -> new LectureGetForListRes());
        return dtoPage;
    }

    // 최신순
    @Override
    public Page<LectureGetForListRes> getLecturesByMostLatest(Pageable pageable) {
        PageRequest pageRequest = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize());
        Page<Lecture> page = lectureRepository.getLecturesByMostLatest(pageRequest);
        Page<LectureGetForListRes> dtoPage = page.map(m -> new LectureGetForListRes());
        return dtoPage;
    }

    // 전부다
    @Override
    public Page<LectureGetForListRes> findAll(Pageable pageable) {
        PageRequest pageRequest = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), pageable.getSort());
        Page<Lecture> page = lectureRepository.findAll(pageRequest);
        Page<LectureGetForListRes> dtoPage = page.map(m -> new LectureGetForListRes());
        return dtoPage;
    }

    // 상세 페이지
//    @Override
//    public Lecture getDetailLecture(int lecId) {
//        Optional<Instructor> ins = instructorRepository.findById();
//        Optional<LectureGetForDetailRes> lecture = lectureRepository.findById(lecId);
//        if (lecture.isPresent()) {
//            return lecture.get();
//        }
//        return null;
//    }

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
