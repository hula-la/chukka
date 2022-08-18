package com.ssafy.api.request.cart;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class CartDelReq {

    @ApiModelProperty(name = "장바구니 item 아이디 리스트", example = "[1,2,3]")
    List<Integer> itemIds;

}
