package com.ssafy.api.request.snacks;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@ApiModel("SnacksUploadRequest")
public class SnacksUploadReq {

    @ApiModelProperty(name = "제목", example = "스낵스 영상")
    private String snacksTitle;
    @ApiModelProperty(name = "태그", example = "춤,나연")
    private String snacksTag;
    @ApiModelProperty(name = "비디오", example = "vid/snacks.mp4")
    private MultipartFile snacksVideo;

}
