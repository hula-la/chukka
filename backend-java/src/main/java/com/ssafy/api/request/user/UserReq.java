package com.ssafy.api.request.user;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserRequest")
public class UserReq {

    @ApiModelProperty(name="유저 ID", example="your_id")
    String userId;
    @ApiModelProperty(name="유저 Token", example="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN...")
    String token;

}
