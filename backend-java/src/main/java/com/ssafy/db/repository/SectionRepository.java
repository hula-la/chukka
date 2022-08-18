package com.ssafy.db.repository;

import com.ssafy.api.response.section.SectionGetRes;
import com.ssafy.db.entity.Instructor;
import com.ssafy.db.entity.Lecture;
import com.ssafy.db.entity.Section;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface SectionRepository extends JpaRepository<Section, Integer> {

    // 현재 해당하는 강의의 섹션들을 불러오기
    Page<Section> findAllByLecture(Lecture lecture, Pageable pageable);

    // 섹션 전부 조회
    Page<Section> findAll(Pageable pageable);

    List<Section> findAllByLecture_LecId(int lecId);

}
