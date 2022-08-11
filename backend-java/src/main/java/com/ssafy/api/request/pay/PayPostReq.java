package com.ssafy.api.request.pay;


import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Data
@Getter
@Setter
public class PayPostReq {

    @ApiModelProperty(name = "회원 id", example = "user1")
    String userId;
    @ApiModelProperty(name = "결제 금액", example = "9000")
    int payAmount;
    @ApiModelProperty(name = "결제 수단", example = "card")
    String payMethod;
    @ApiModelProperty(name = "결제 uid", example = "imp_375730708354")
    String PayUid;
    @ApiModelProperty(name = "주문번호", example = "2208090002")
    String merchantUid;
    @ApiModelProperty(name = "결제 강의 id lis", example = "2208090002")
    List<Integer> payLecList = new ArrayList<>();

}
