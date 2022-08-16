package com.ssafy.api.response.instructor;

import com.ssafy.db.entity.Instructor;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("InstructorGetResponse")
public class InstructorGetRes {

    @ApiModelProperty(value = "강사 ID")
    private String insId;
    @ApiModelProperty(value = "강사 ID")
    private String insName;
    @ApiModelProperty(value = "강사 ID")
    private String insEmail;
    @ApiModelProperty(value = "강사 ID")
    private String insIntroduce;
    @ApiModelProperty(value = "강사 ID")
    private String insProfile;

    public static InstructorGetRes of(Instructor instructor) {
        InstructorGetRes res = new InstructorGetRes();
        res.setInsId(instructor.getInsId());
        res.setInsName(instructor.getInsName());
        res.setInsEmail(instructor.getInsEmail());
        res.setInsIntroduce(instructor.getInsIntroduce());
        res.setInsProfile(res.getInsProfile());
        return res;
    }
}
