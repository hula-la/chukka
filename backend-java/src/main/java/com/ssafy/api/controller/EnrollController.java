package com.ssafy.api.controller;

import com.ssafy.api.request.enroll.EnrollPostReq;
import com.ssafy.api.request.pay.PayPostReq;
import com.ssafy.api.service.EnrollService;
import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@Api(value = "수강 API", tags = {"Enroll"})
@RestController
@RequestMapping("/enroll")
public class EnrollController {
    @Autowired
    EnrollService enrollService;

    /* 수강 정보 저장 */
    @PostMapping("/")
    @ApiOperation(value = "수강 정보 저장", notes = "결제 완료 후, 결제된 강의를 회원의 수강 테이블에 저장합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = BaseResponseBody.class)
    })
    public ResponseEntity<BaseResponseBody> createPay(@RequestBody EnrollPostReq enrollPostReq) {
        try{
            System.out.println(enrollPostReq.getUserId());
            System.out.println(enrollPostReq.getLecIds());
            enrollService.createEnroll(enrollPostReq.getUserId(), enrollPostReq.getLecIds());
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", null));
        }catch (Exception e){
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, "fail", null));
        }
    }

}
