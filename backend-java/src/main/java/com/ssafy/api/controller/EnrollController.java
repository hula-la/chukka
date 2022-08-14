package com.ssafy.api.controller;

import com.ssafy.api.request.enroll.EnrollPostReq;
import com.ssafy.api.request.pay.PayPostReq;
import com.ssafy.api.service.EnrollService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Enroll;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;


@Api(value = "수강 API", tags = {"Enroll"})
@RestController
@RequestMapping("/enroll")
public class EnrollController {
    @Autowired
    EnrollService enrollService;

    /* 수강 정보 저장 */
    /* 수정 필요 -> 이미 수강한 강의는 저장하지 않도록 */
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

    // enroll 테이블에 강의 결제했는지 확인해주는 url
    @GetMapping("/{lecId}")
    @ApiOperation(value = "결제 여부 확인", notes = "유저가 해당하는 강의를 결제했는지 확인한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success")
    })
    public ResponseEntity<BaseResponseBody> checkPayed(
            Authentication authentication,
            @PathVariable @ApiParam(value = "해당강의 ID", required = true) int lecId) {

        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String userId = userDetails.getUsername();
        Enroll enroll = enrollService.getEnrollByUserAndLecture(userId, lecId);

        if (enroll != null) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Payed", true));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "PayedYet", false));
    }
}
