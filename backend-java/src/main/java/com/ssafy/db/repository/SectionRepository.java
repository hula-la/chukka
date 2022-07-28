package com.ssafy.db.repository;

import com.ssafy.db.entity.Lecture;
import com.ssafy.db.entity.Section;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface SectionRepository extends JpaRepository<Section, String> {

    // 소강의 불러오기
    List<Section> findByLectureOrderBySecId(Lecture lecture);

    // 소강의 수정하기
    @Modifying(clearAutomatically = true)
    @Query(value = "update Section sec " +
            "set sec.secId = :secId," +
            "sec.secTitle = :secTitle," +
            "sec.secContents = :secContents " +
            "where sec.lecture = :lecture " +
            "and sec.secId = :secId", nativeQuery = true)
    Optional<Integer> updateSection(int secId, String secTitle, String secContents, Lecture lecture);

    // 소강의 삭제하기
    Optional<Integer> deleteBySecId(int secId);
}
