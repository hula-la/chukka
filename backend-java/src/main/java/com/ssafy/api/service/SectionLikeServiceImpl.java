package com.ssafy.api.service;

import com.ssafy.db.entity.Section;
import com.ssafy.db.entity.SectionLike;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.SectionLikeRepository;
import com.ssafy.db.repository.SectionRepository;
import com.ssafy.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service("SectionLikeService")
public class SectionLikeServiceImpl implements SectionLikeService{

    @Autowired
    SectionLikeRepository sectionLikeRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    SectionRepository sectionRepository;

    @Override
    public SectionLike pushLike(int secId, String userId, int likeId) {
        Optional<User> user = userRepository.findById(userId);
        Optional<Section> sec = sectionRepository.findById(secId);
        // 유저가 없을때 or 섹션이 존재하지 않을 때
        if (!sec.isPresent() || !user.isPresent()) {
            return null;
        }

        // 좋아요를 이미 눌렀을 경우
        if(sectionLikeRepository.findBySectionAndUser(sec.get(), user.get()) != null) {
            sectionLikeRepository.delete(SectionLike.builder().likeId(likeId).build());
            return null;
        // 좋아요가 안눌러져있을경우
        } else {
            SectionLike like = SectionLike.builder()
                    .user(user.get())
                    .section(sec.get())
                    .build();
            return sectionLikeRepository.save(like);
        }
    }

    @Override
    public Optional<Integer> countLikes(int secId) {
        return Optional.empty();
    }
}
