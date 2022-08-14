package com.ssafy.api.response.snacks;

import com.ssafy.db.entity.Snacks;
import com.ssafy.db.entity.SnacksReply;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SnacksReplyRes {
    @ApiModelProperty(name = "스낵스 댓글 Id", example = "1")
    private int replyId;
    @ApiModelProperty(name = "유저 아이디", example = "your_nickname")
    private String userNickname;
    @ApiModelProperty(name = "내용", example = "reply_contents")
    private String contents;
    @ApiModelProperty(name = "스낵스 아이디", example = "1")
    private Long snacksId;
    @ApiModelProperty(name = "댓글 작성일", example = "2022-09-12")
    private Date replyRegdate;

    public static SnacksReplyRes of(SnacksReply reply) {
        SnacksReplyRes res = new SnacksReplyRes();
        res.setReplyId(reply.getReplyId());
        res.setUserNickname(reply.getUser().getUserNickname());
        res.setContents(reply.getContents());
        res.setSnacksId(reply.getSnacks().getSnacksId());
        res.setReplyRegdate(reply.getReplyRegdate());
        return res;
    }
}
