package com.ssafy.api.service;

import com.ssafy.api.request.snacks.SnacksUploadReq;
import com.ssafy.api.response.snacks.SnacksDto;
import com.ssafy.db.entity.Snacks;
import com.ssafy.db.entity.SnacksHeart;
import com.ssafy.db.entity.SnacksTag;
import com.ssafy.db.repository.SnacksHeartRepository;
import com.ssafy.db.repository.SnacksRepository;
import com.ssafy.db.repository.SnacksTagRepository;
import com.ssafy.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SnacksServiceImpl implements SnacksService{

    private final SnacksHeartRepository snacksHeartRepository;

    private final SnacksRepository snacksRepository;
    private final SnacksTagRepository snacksTagRepository;

    private final UserRepository userRepository;


//    public Snacks createSnacks(SnacksUploadReq snacksUploadReq) {
//
//    }

    @Override
    public Snacks createSnacks(SnacksUploadReq snacksUploadReq) {
        return null;
    }

    @Override
    public void likeSnacks(String userId, int snacksId) {
        Optional<SnacksHeart> heartOpt = findHeartWithUserIdAndSnacksId(userId, snacksId);

        // 이미 좋아요 된 캠페인일 경우 409 에러러
       if (heartOpt.isPresent()){
           return;
       }

       long miliseconds = System.currentTimeMillis();
       Date date = new Date(miliseconds);

       SnacksHeart snacksHeart = SnacksHeart.builder()
               .user(userRepository.findByUserId(userId).get())
               .snacks(snacksRepository.findBySnacksId(snacksId).get())
               .likeSnacksReg(date)
               .build();
       snacksHeartRepository.save(snacksHeart);
    }

    @Override
    public void unlikeSnacks(String userId, int snacksId) {
        Optional<SnacksHeart> heartOpt = findHeartWithUserIdAndSnacksId(userId, snacksId);

        if (!heartOpt.isPresent()) {
            return;
        }

        snacksHeartRepository.delete(heartOpt.get());
    }


    public Optional<SnacksHeart> findHeartWithUserIdAndSnacksId(String userId, int snacksId) {
        return snacksHeartRepository.findByUser_UserIdAndSnacks_SnacksId(userId,snacksId);

    }

    public Snacks uploadSnacks(SnacksDto snacksDto){
        long miliseconds = System.currentTimeMillis();
        Date date = new Date(miliseconds);

        Snacks snacks = Snacks.builder()
                .snacksTitle(snacksDto.getSnacksTitle())
                .snacksContents(snacksDto.getSnacksContents())
                .snacksRegdate(date)
                .user(userRepository.findByUserId(snacksDto.getUserId()).get())
                .build();

        snacksRepository.save(snacks);

        uploadTags(snacksDto);

        return snacks;

    }

    public void uploadTags(SnacksDto snacksDto){
        String[] snacksTags = snacksDto.getSnacksTag().split(",");

        for (String tag:snacksTags) {
            SnacksTag snacksTag = SnacksTag.builder()
                    .snacks(snacksRepository.findBySnacksId(snacksDto.getSnacksId()).get())
                    .snacksTagContent(tag)
                    .build();
            snacksTagRepository.save(snacksTag);
        }

    }
}
