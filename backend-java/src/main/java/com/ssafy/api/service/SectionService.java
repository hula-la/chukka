package com.ssafy.api.service;

import com.ssafy.api.request.section.SectionPostReq;
import com.ssafy.api.request.section.SectionUpdateReq;
import com.ssafy.api.response.section.SectionGetRes;
import com.ssafy.db.entity.Lecture;
import com.ssafy.db.entity.Section;

import java.util.List;


public interface SectionService {

    // Create
    Section createSection(SectionPostReq sectionPostReq);

    // Read
    // 현재 해당하는 강의의 섹션만 불러오기
    List<SectionGetRes> getSectionByLecId(int lecId);

    // Update
    // 소강의 내용 수정하기
     Section updateSection(int secId, SectionUpdateReq sectionUpdateReq);

    // Delete
    // 소강의 삭제하기
     Integer deleteBySecId(int secId);
}
