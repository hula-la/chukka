package com.ssafy.api.service;

import com.ssafy.api.request.section.SectionPostReq;
import com.ssafy.api.request.section.SectionUpdateReq;
import com.ssafy.db.entity.Instructor;
import com.ssafy.db.entity.Lecture;
import com.ssafy.db.entity.Section;
import com.ssafy.db.repository.InstructorRepository;
import com.ssafy.db.repository.LectureRepository;
import com.ssafy.db.repository.SectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service("SectionService")
public class SectionServiceImpl implements SectionService{

    @Autowired
    SectionRepository sectionRepository;
    @Autowired
    LectureRepository lectureRepository;
    @Autowired
    InstructorRepository instructorRepository;

    @Override
    public Section createSection(SectionPostReq sectionPostReq) {
        Section section = new Section();
        section.setSecId(sectionPostReq.getSecId());
        Optional<Instructor> ins = instructorRepository.findById(sectionPostReq.getInsId());
        if(ins.isPresent()) {
            section.setInstructor(ins.get());
        }
        section.setLecture(lectureRepository.findByLecId(sectionPostReq.getLecId()));
        section.setSecTitle(sectionPostReq.getSecTitle());
        return sectionRepository.save(section);
    }

    @Override
    public List<Section> getSectionsByLectureId(int lecId) {
        return sectionRepository.findByLecture_LecIdOrderBySecId(lecId);
    }

    @Override
    public Section updateSection(int secId, SectionPostReq sectionInfo) {
        Optional<Instructor> ins = instructorRepository.findById(sectionInfo.getInsId());
        Instructor instructor = null;
        if(ins.isPresent()) {
            instructor = ins.get();
        }
        sectionRepository.updateSection(secId, instructor, sectionInfo.getSecTitle());
        return null;
    }

    @Override
    public Integer deleteBySecId(int secId) {
        sectionRepository.deleteBySecId(secId);
        return null;
    }
}
