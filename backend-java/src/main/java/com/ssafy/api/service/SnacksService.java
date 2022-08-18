package com.ssafy.api.service;

import com.ssafy.api.request.snacks.SnacksReplyPostReq;
import com.ssafy.api.request.snacks.SnacksUploadReq;
import com.ssafy.api.response.snacks.SnacksReplyRes;
import com.ssafy.api.response.snacks.SnacksRes;
import com.ssafy.db.entity.Snacks;
import com.ssafy.db.entity.SnacksLike;
import com.ssafy.db.entity.SnacksReply;
import com.ssafy.db.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

import java.util.List;
import java.util.Optional;

public interface SnacksService {

    Slice<SnacksRes> findAll(Pageable pageable, String userId);
    Slice<SnacksRes> findCertainUserSnacks(Pageable pageable, String userId, String loginUserId);
    SnacksRes getCertainSnacks(Long snacksId, String userId);
    // 좋아요 기능
    String likeSnacks(User user, Long snacksId);
    // 댓글 기능
    SnacksReply createReply(SnacksReplyPostReq replyInfo, User user);
    Snacks uploadSnacks(SnacksUploadReq snacksInfo, User user);
    List<String> getPopularTags();
    List<SnacksReplyRes> getReplybySnacksId(Long snacksId);
    Slice<SnacksRes> searchTag(List<String> tags, String userId, Pageable pageable);
    boolean deleteSnacks(Long snacksId);

}
