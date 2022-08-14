package com.ssafy.api.controller;

import com.ssafy.api.request.pay.PayPostReq;
import com.ssafy.api.response.pay.PayLecGetRes;
import com.ssafy.api.service.PayService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Pay;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value = "결제 API", tags = {"Pay"})
@RestController
@RequestMapping("/pay")
public class PayController {

    @Autowired
    PayService payService;

    /* 주문 번호 생성 */
    @GetMapping("/merchant")
    @ApiOperation(value = "주문번호 생성", notes = "현재 날짜와 결제 정보 id 값으로 현재 결제에 대한 주문번호 생성(yymmdd+4자리수)")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = BaseResponseBody.class)
    })
    public ResponseEntity<BaseResponseBody> makeMerchantId() {
        try{
            String merchantUid = payService.makeMerchantUid();
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", merchantUid));
        }catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.status(403).body(BaseResponseBody.of(403, "fail", null));
        }
    }

    /* 결제 정보 저장 */
    @PostMapping("/")
    @ApiOperation(value = "결제 정보 저장", notes = "결제 완료 후, 결제 정보를 저장합니다.(user_id, pay_amount, pay_method, pay_uid)")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = BaseResponseBody.class)
    })
    public ResponseEntity<BaseResponseBody> createPay(@RequestBody PayPostReq payPostReq) {
        System.out.println(payPostReq.toString());
        try{
            if(payService.createPay(payPostReq)!=null){
                return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", null));
            }else{
                return ResponseEntity.status(403).body(BaseResponseBody.of(403, "fail", null));
            }
        }catch (Exception e){
            return ResponseEntity.status(403).body(BaseResponseBody.of(500, "fail", null));
        }
    }

    /* 결제 정보 조회 */
    @GetMapping("/{userId}")
    @ApiOperation(value = "결제 정보 조회", notes = "사용자의 결제 목록을 반환합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = BaseResponseBody.class)
    })
    public ResponseEntity<BaseResponseBody> getPayList(@PathVariable String userId) {

        try{
            List<PayLecGetRes> payLecGetRes = payService.findPayListsByUserUserId(userId);
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", payLecGetRes));
        }catch (Exception e){
            return ResponseEntity.status(403).body(BaseResponseBody.of(500, "fail", null));
        }

    }

}
