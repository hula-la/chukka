package com.ssafy.api.request.cart;


import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CartPostReq {

    @ApiModelProperty(name="회원 id", example = "your_id")
    String userId;
    @ApiModelProperty(name="강의 id", example = "1")
    int lecId;


}
