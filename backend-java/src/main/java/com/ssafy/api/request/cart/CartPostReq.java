package com.ssafy.api.request.cart;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CartPostReq {

    @ApiModelProperty(name = "회원 아이디", example = "user1")
    String userId;
    @ApiModelProperty(name = "강의 아이디", example = "1")
    int lecId;

}
