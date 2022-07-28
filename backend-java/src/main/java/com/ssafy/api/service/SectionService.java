package com.ssafy.api.service;

import com.ssafy.api.request.section.SectionPostReq;
import com.ssafy.db.entity.Lecture;
import com.ssafy.db.entity.Section;

import java.util.List;


public interface SectionService {

    // Create
    Section createSection(SectionPostReq sectionPostReq);

    // Read
    // 대강의별 소강의 불러오기
    List<Section> findByLectureOrderBySecId(Lecture lecture);

    // Update
    // 소강의 내용 수정하기
    //Section updateSection()''


}
