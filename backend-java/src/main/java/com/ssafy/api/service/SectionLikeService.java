package com.ssafy.api.service;

import com.ssafy.db.entity.SectionLike;

import java.util.Optional;

public interface SectionLikeService {

    SectionLike pushLike(int secId, String userId, int likeId);

    Optional<Integer> countLikes(int secId);
}
