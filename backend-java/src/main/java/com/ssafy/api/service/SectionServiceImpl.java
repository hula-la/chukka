package com.ssafy.api.service;

import com.ssafy.api.request.section.SectionPostReq;
import com.ssafy.db.entity.Lecture;
import com.ssafy.db.entity.Section;
import com.ssafy.db.repository.SectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("SectionService")
public class SectionServiceImpl implements SectionService{

    @Autowired
    SectionRepository sectionRepository;

    @Override
    public Section createSection(SectionPostReq sectionPostReq) {
        Section section = new Section();
        section.setSecId(sectionPostReq.getSecId());
        return sectionRepository.save(section);
    }

    @Override
    public List<Section> findByLectureOrderBySecId(Lecture lecture) {
        return sectionRepository.findByLectureOrderBySecId(lecture);
    }
}
