package com.ssafy.api.response.SectionLike;

import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("SectionLikeResponse")
public class SectionLikeRes extends BaseResponseBody {

    @ApiModelProperty(value = "좋아요 ID", example = "1, 2")
    private int likeId;
    @ApiModelProperty(value = "유저 ID", example = "1, 2")
    private String userId;
    @ApiModelProperty(value = "섹션 ID", example = "1, 2")
    private int secId;

    public static SectionLikeRes of(int likeId, String userId, int secId) {
        SectionLikeRes res = new SectionLikeRes();
        res.setLikeId(likeId);
        res.setUserId(userId);
        res.setSecId(secId);
        return res;
    }
}
