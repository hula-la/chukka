package com.ssafy.api.service;

import com.ssafy.api.request.section.SectionPostReq;
import com.ssafy.api.request.section.SectionUpdateReq;
import com.ssafy.api.response.section.SectionGetRes;
import com.ssafy.db.entity.Section;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface SectionService {

    // Create
    Section createSection(SectionPostReq sectionPostReq, boolean isFile);

    // Read
    // 현재 해당하는 강의의 섹션만 불러오기
    Page<SectionGetRes> getSectionByLecId(int lecId, Pageable pageable);

    Page<SectionGetRes> getAllSections(Pageable pageable);

    // Update
    // 소강의 내용 수정하기
     Section updateSection(int lecId, SectionUpdateReq sectionInfo);

    // Delete
    // 소강의 삭제하기
     boolean deleteBySecId(int secId);
}
