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

    Page<Section> findAll(Pageable pageable);
    // 소강의 수정하기
    @Modifying(clearAutomatically = true)
    @Query(value = "update Section sec " +
            "set sec.secId = :secId," +
            "sec.Instructor = :instructor," +
            "sec.secTitle = :secTitle," +
            "sec.secContents = :secContents " +
            "where sec.secId = :secId", nativeQuery = true)
    Optional<Integer> updateSection(int secId, Instructor instructor, String secTitle, String secContents);

}
