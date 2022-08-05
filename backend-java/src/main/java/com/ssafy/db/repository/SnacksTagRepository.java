package com.ssafy.db.repository;

import com.ssafy.db.entity.SnacksTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SnacksTagRepository extends JpaRepository<SnacksTag,Long> {

    @Query(value = "select s.snacks_tag_content from snacks_tag s" +
            "group by s.snacks_tag_content order by count(s.snacks_tag_id) desc" +
            "limit 10", nativeQuery = true)
    List<String> findSnacksPopularTags();

}
