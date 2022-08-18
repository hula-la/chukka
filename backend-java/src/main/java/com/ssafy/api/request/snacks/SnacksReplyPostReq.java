package com.ssafy.api.request.snacks;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@ApiModel("SnacksReplyPostReqeust")
public class SnacksReplyPostReq {

    @ApiModelProperty(name = "스낵스 아이디", example = "1")
    private Long snacksId;
    @ApiModelProperty(name = "내용", example = "reply_contents")
    private String contents;

}
