package com.ssafy.api.service;

import com.ssafy.api.request.section.SectionPostReq;
import com.ssafy.api.request.section.SectionUpdateReq;
import com.ssafy.api.response.section.SectionGetRes;
import com.ssafy.db.entity.Lecture;
import com.ssafy.db.entity.Section;
import com.ssafy.db.repository.SectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
    public List<SectionGetRes> getSectionByLecId(int lecId) {
        List<Section> list = sectionRepository.findAll();
        List<SectionGetRes> sections = new ArrayList<>();
        for (int i = 0; i < list.size(); i++) {
            sections.add(SectionGetRes.of(list.get(i)));
        }
        return sections;
    }

    @Override
    public Section updateSection(int secId, SectionUpdateReq sectionUpdateReq) {
        sectionRepository.updateSection(secId, sectionUpdateReq.getInstructor(), sectionUpdateReq.getSecTitle(), sectionUpdateReq.getSecContents());
        return null;
    }

    @Override
    public Integer deleteBySecId(int secId) {
        Section section = sectionRepository.findById(secId);
        sectionRepository.delete(section);
        return null;
    }
}
