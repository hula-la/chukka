package com.ssafy.api.service;

import com.ssafy.api.request.pay.PayPostReq;
import com.ssafy.api.response.pay.PayLecGetRes;
import com.ssafy.db.entity.Pay;

import java.util.List;

public interface PayService {

    // 주문번호 생성
    String makeMerchantUid();

    // 결제 정보, 결제 상세 정보 저장
    Pay createPay(PayPostReq payPostReq);

    // 아이디별 결제 정보 조회
    List<PayLecGetRes> findPayListsByUserUserId(String userId);

}
