package com.ssafy.api.request.enroll;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class EnrollPostReq {

    @ApiModelProperty(name = "회원 아이디", example = "user1")
    String userId;
    @ApiModelProperty(name = "강의 아이디", example = "[1,2,3]")
    List<Integer> lecIds;

}
