package com.ssafy.api.service;

import com.ssafy.api.request.SectionLike.SectionLikeReq;
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
    public SectionLike pushLike(SectionLikeReq sectionLikeGetReq) {
        Optional<User> user = userRepository.findById(sectionLikeGetReq.getUserId());
        Optional<Section> sec = sectionRepository.findById(sectionLikeGetReq.getSecId());
        // 유저가 없을때 or 섹션이 존재하지 않을 때
        if (!sec.isPresent() || !user.isPresent()) {
            return null;
        }
        // 좋아요를 안 눌렀을 없을경우
        // 위의 두 정보를 가지고 있을때 취소되게 만들어야 함
        int likeId = sectionLikeGetReq.getLikeId();
        if (sec.isPresent() && user.isPresent()) {
            if (likeId < 0) {
                likeId = 0;
            }
        }

        if ( likeId == 0) {
            SectionLike like = SectionLike.builder()
                    .likeId(sectionLikeGetReq.getSecId())
                    .user(user.get())
                    .section(sec.get())
                    .build();
            return sectionLikeRepository.save(like);
        }
        // 이미 좋아요를 한 경우
        sectionLikeRepository.deleteById(likeId);
        return null;
    }

    @Override
    public Optional<Integer> countLikes(int secId) {
        return Optional.empty();
    }
}
