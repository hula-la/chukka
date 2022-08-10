package com.ssafy.api.service;

import com.ssafy.api.request.pay.PayPostReq;
import com.ssafy.api.response.cart.CartLecGetRes;
import com.ssafy.api.response.pay.PayLecGetRes;
import com.ssafy.api.response.snacks.SnacksRes;
import com.ssafy.db.entity.Lecture;
import com.ssafy.db.entity.Pay;
import com.ssafy.db.entity.PayList;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.LectureRepository;
import com.ssafy.db.repository.PayListRepository;
import com.ssafy.db.repository.PayRepository;
import com.ssafy.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class PayServiceImpl implements PayService {

    @Autowired
    PayRepository payRepository;
    @Autowired
    PayListRepository payListRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    LectureRepository lectureRepository;

    /* 주문번호 생성 */
    @Override
    public String makeMerchantUid() {
        String merchantUid="";
        Date now = new Date();
        SimpleDateFormat format = new SimpleDateFormat("yyMMdd");
        String today = format.format(now);

        Optional<Pay> lastPay = payRepository.findTopByPayDateOrderByPayIdDesc(now);
        if(lastPay.isPresent()){
            Pay pay = lastPay.get();
            int newPayId = pay.getPayId()+1;
            merchantUid += today;
            merchantUid += String.format("%04d", newPayId);
            System.out.println(merchantUid);
        }else{ // 오늘 첫 주문
            merchantUid += today;
            merchantUid += String.format("%04d", 1);
            System.out.println(merchantUid);
        }
        return merchantUid;
    }

    @Override
    public Pay createPay(PayPostReq payPostReq) {
        Optional<User> user =  userRepository.findByUserId(payPostReq.getUserId());
        if(user.isPresent()){
            Pay pay = Pay.builder()
                    .payMethod(payPostReq.getPayMethod())
                    .payAmount(payPostReq.getPayAmount())
                    .payDate(new Date())
                    .payUid(payPostReq.getPayUid())
                    .user(user.get()).build();
            System.out.println(pay);
            payRepository.save(pay);

            List<PayList> payLists = new ArrayList<>();

            /* 결제 상세 정보 저장 */
            for(int i = 0 ; i < payPostReq.getPayLecList().size(); i++){
                PayList payList = PayList.builder()
                        .pay(pay)
                        .lecture(lectureRepository.findLectureByLecId(payPostReq.getPayLecList().get(i)))
                        .merchant_uid(payPostReq.getMerchantUid())
                        .user(user.get())
                        .build();

                payLists.add(payList);
            }
            payListRepository.saveAll(payLists);
            return pay;
        }
        return null;
    }

    @Override
    public List<PayLecGetRes> findPayListsByUserUserId(String userId) {

        List<PayList> payLists = payListRepository.findPayListsByUserUserId(userId);
        List<PayLecGetRes> payLecGetRes= new ArrayList<>();

        for(PayList payList : payLists){
            PayLecGetRes res = PayLecGetRes.of(payList);
            payLecGetRes.add(res);
        }
        return  payLecGetRes;
    }


}
