package com.ssafy.db.repository;

import com.ssafy.db.entity.SnacksReply;
import com.ssafy.db.entity.SnacksTag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SnacksReplyRepository extends JpaRepository<SnacksReply,Long> {

    List<SnacksReply> findBySnacks_SnacksId(Long snacksId);

}
