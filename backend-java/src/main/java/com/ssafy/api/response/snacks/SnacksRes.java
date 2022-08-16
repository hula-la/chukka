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
import java.util.stream.Collectors;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SnacksRes {
    @ApiModelProperty(name = "스낵스 Id", example = "14")
    private Long snacksId;
    @ApiModelProperty(name = "유저 닉네임", example = "your_nickname")
    private String userNickname;
    @ApiModelProperty(name = "유저 프로필", example = "www.chukkadance.com")
    private String userProfile;
    @ApiModelProperty(name = "제목", example = "스낵스 영상")
    private String snacksTitle;
    @ApiModelProperty(name = "좋아요수", example = "3")
    private Long snacksLikes;
    @ApiModelProperty(name = "날짜", example = "2022-09-12")
    private Date snacksRegdate;
    @ApiModelProperty(name = "태그", example = "춤,나연")
    private List<String> snacksTag;
    @ApiModelProperty(name = "좋아요 유무", example = "true")
    private boolean isLike;

    public static SnacksRes of(Snacks snacks, boolean isLike) {
        SnacksRes res = new SnacksRes();
        res.setSnacksId(snacks.getSnacksId());
        res.setUserNickname(snacks.getUser().getUserNickname());
        res.setUserProfile(snacks.getUser().getUserProfile());
        res.setSnacksTitle(snacks.getSnacksTitle());
        res.setSnacksLikes(snacks.getSnacksLikeCnt());
        res.setSnacksRegdate(snacks.getSnacksRegdate());
        res.setSnacksTag(snacks.getSnacksTags()
                .stream().map(s -> s.getSnacksTagContent()).collect(Collectors.toList()));
        res.isLike = isLike;
        return res;
    }

}
