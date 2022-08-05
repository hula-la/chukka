package com.ssafy.api.response.snacks;

import com.ssafy.api.response.admin.UserRes;
import com.ssafy.db.entity.Snacks;
import com.ssafy.db.entity.SnacksTag;
import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SnacksRes {
    @ApiModelProperty(name = "스낵스 Id", example = "14")
    private Long snacksId;
    @ApiModelProperty(name = "유저 아이디", example = "0")
    private String userId;
    @ApiModelProperty(name = "제목", example = "스낵스 영상")
    private String snacksTitle;
    @ApiModelProperty(name = "좋아요수", example = "3")
    private int snacksLikes;
    @ApiModelProperty(name = "날짜", example = "2022-09-12")
    private Date snacksRegdate;
    @ApiModelProperty(name = "태그", example = "춤,나연")
    private List<String> snacksTag;

    public static SnacksRes of(Snacks snacks) {
        SnacksRes res = new SnacksRes();
        res.setSnacksId(snacks.getSnacksId());
        res.setUserId(snacks.getUser().getUserId());
        res.setSnacksTitle(snacks.getSnacksTitle());
        res.setSnacksLikes(snacks.getSnacksLikes().size());
        res.setSnacksRegdate(snacks.getSnacksRegdate());
        List<SnacksTag> tagList = snacks.getSnacksTags();
        List<String> tags = new ArrayList<>();
        for (int i = 0; i < tagList.size(); i++) {
            tags.add(tagList.get(i).getSnacksTagContent());
        }
        res.setSnacksTag(tags);
        return res;
    }
}
