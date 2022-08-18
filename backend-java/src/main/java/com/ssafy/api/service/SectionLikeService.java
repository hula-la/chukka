package com.ssafy.api.service;

import com.ssafy.api.request.SectionLike.SectionLikeReq;
import com.ssafy.db.entity.SectionLike;

import java.util.Optional;

public interface SectionLikeService {

    SectionLike pushLike(SectionLikeReq sectionLikeGetReq);

    Optional<Integer> countLikes(int secId);
}
