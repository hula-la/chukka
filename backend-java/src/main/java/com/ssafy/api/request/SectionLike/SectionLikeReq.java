package com.ssafy.api.request.SectionLike;

import com.ssafy.db.entity.Section;
import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("SectionLikeRequest")
public class SectionLikeReq {

    @ApiModelProperty(value = "좋아요 ID", example = "1, 2")
    private int likeId;
    @ApiModelProperty(value = "유저 ID", example = "1, 2")
    private String userId;
    @ApiModelProperty(value = "섹션 ID", example = "1, 2")
    private int secId;
}
