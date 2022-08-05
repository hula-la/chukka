package com.ssafy.api.service;

import com.ssafy.api.request.snacks.SnacksUploadReq;
import com.ssafy.api.response.snacks.SnacksDto;
import com.ssafy.db.entity.Snacks;
import com.ssafy.db.entity.SnacksHeart;

import java.util.Optional;

public interface SnacksService {

    Snacks createSnacks(SnacksUploadReq snacksUploadReq);

//    좋아요 기능

    void likeSnacks(String userId, int snacksId);
    void unlikeSnacks(String userId, int snacksId);
    Optional<SnacksHeart> findHeartWithUserIdAndSnacksId(String userId, int snacksId);

// 페이지네이션 스낵스 목록
    Snacks uploadSnacks(SnacksDto snacksDto);

}
