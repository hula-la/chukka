package com.ssafy.api.service;

import com.ssafy.api.request.snacks.SnacksReplyPostReq;
import com.ssafy.api.request.snacks.SnacksUploadReq;
import com.ssafy.db.entity.*;
import com.ssafy.db.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SnacksServiceImpl implements SnacksService{

    private final SnacksLikeRepository snacksLikeRepository;
    private final SnacksRepository snacksRepository;
    private final SnacksTagRepository snacksTagRepository;
    private final SnacksReplyRepository snacksReplyRepository;
    private final UserRepository userRepository;
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    @Value("${cloud.aws.region.static}")
    private String region;
    private String PATH = "https://" + bucket + ".s3." + region + ".amazonaws.com/";



//    public Snacks createSnacks(SnacksUploadReq snacksUploadReq) {
//
//    }

    @Override
    public Page<Snacks> findAll(Pageable pageable) {
        return null;
    }

    @Override
    public Snacks getCertainSnacks(Long snacksId) {
        Optional<Snacks> snacks = snacksRepository.findBySnacksId(snacksId);
        if(snacks.isPresent()) {
            return snacks.get();
        }
        return null;
    }

    @Override
    public String likeSnacks(User user, Long snacksId) {
        Optional<SnacksLike> like = snacksLikeRepository.findByUser_UserIdAndSnacks_SnacksId(user.getUserId(), snacksId);
        Optional<Snacks> snacks = snacksRepository.findBySnacksId(snacksId);
        // 스낵스 유무 판별
        if(!snacks.isPresent()) {
            return "Invalid Snacks";
        }
        // 이미 좋아요를 누른 스낵스의 경우 좋아요 취소
       if (like.isPresent()){
           SnacksLike snacksLike = SnacksLike.builder().snacksLikeId(like.get().getSnacksLikeId()).build();
           snacksLikeRepository.delete(snacksLike);
           snacksRepository.dislikeSnacks(snacksId);
           return "dislike";
       }
       long miliseconds = System.currentTimeMillis();
       Date date = new Date(miliseconds);
       SnacksLike snacksLike = SnacksLike.builder()
               .user(user)
               .snacks(snacksRepository.findBySnacksId(snacksId).get())
               .likeSnacksReg(date)
               .build();
       snacksLikeRepository.save(snacksLike);
       snacksRepository.likeSnacks(snacksId);
       return "like";
    }

    @Override
    public SnacksReply createReply(SnacksReplyPostReq replyInfo, User user) {
        Optional<Snacks> snacks = snacksRepository.findBySnacksId(replyInfo.getSnacksId());
        long miliseconds = System.currentTimeMillis();
        Date date = new Date(miliseconds);
        if(snacks.isPresent()) {
            SnacksReply reply = SnacksReply.builder()
                        .user(user)
                        .snacks(snacks.get())
                        .replyRegdate(date)
                        .contents(replyInfo.getContents())
                        .build();
            return snacksReplyRepository.save(reply);
        }
        return null;
    }

    public Snacks uploadSnacks(SnacksUploadReq snacksInfo, User user){
        long miliseconds = System.currentTimeMillis();
        Date date = new Date(miliseconds);
        Snacks snacks = Snacks.builder()
                .snacksTitle(snacksInfo.getSnacksTitle())
                .snacksRegdate(date)
                .user(user)
                .build();
        Snacks snack = snacksRepository.save(snacks);
        Snacks snackss = Snacks.builder()
                .snacksTitle(snack.getSnacksTitle())
                .snacksId(snack.getSnacksId())
                .snacksRegdate(snack.getSnacksRegdate())
                .user(user)
                .snacksContents(PATH + snack.getSnacksId())
                .build();
        snacksRepository.save(snackss);
        // 태그 추가
        uploadTags(snacksInfo, snackss);
        return snackss;
    }

    @Override
    public List<String> getPopularTags() {
        return snacksTagRepository.findSnacksPopularTags();
    }

    public void uploadTags(SnacksUploadReq snacksInfo, Snacks snack){
        long miliseconds = System.currentTimeMillis();
        Date date = new Date(miliseconds);
        String[] snacksTags = snacksInfo.getSnacksTag().split(",");
        for (String tag:snacksTags) {
            SnacksTag snacksTag = SnacksTag.builder()
                    .snacks(snack)
                    .snacksTagContent(tag)
                    .snacksRegdate(date)
                    .build();
            snacksTagRepository.save(snacksTag);
        }

    }
}
