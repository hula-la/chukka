package com.ssafy.api.controller;


import com.ssafy.api.request.user.UserModifyReq;
import com.ssafy.api.response.snacks.SnacksDto;
import com.ssafy.api.response.user.UserMyRes;
import com.ssafy.api.service.SnacksService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.common.util.S3Uploader;
import com.ssafy.db.entity.Snacks;
import com.ssafy.db.entity.User;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@Api(value = "스낵스 API", tags = {"Snacks"})
@RestController
@RequestMapping("/snacks")
public class SnacksController {

    @Autowired
    SnacksService snacksService;

    @Autowired
    S3Uploader s3Uploader;

//    @GetMapping("/")
//    @ApiOperation(value = "스낵스 조회", notes = "<strong>스낵스</strong> 목록을 페이징 방식으로 조회합니다.")
//    @ApiResponses({
//            @ApiResponse(code = 200, message = "MySuccess"),
//            @ApiResponse(code = 300, message = "MySuccess")
//    })
//    public ResponseEntity<BaseResponseBody> getSnacks(@RequestBody @ApiParam(value="스낵스 아이디")Pageable pageable){
//        Page<Snacks> page = snacksService.findAll(pageable);
//        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", page));
//
//    }
///members?page=0&size=3&sort=id,desc&sort=username,desc
//    page : 현재 페이지,0부터 시작
//    size : 조회할 데이터 수
//    sort : 정렬 조건, sort 파라미터 추가 가능


//    @GetMapping("/{snacksId}")
//    @ApiOperation(value = "특정 스낵스 조회", notes = "<strong>스낵스 아이디</strong>를 통해 특정 스낵스를 조회합니다.")
//    @ApiResponses({
//            @ApiResponse(code = 200, message = "Success", response = BaseResponseBody.class),
//            @ApiResponse(code = 401, message = "Invalid", response = BaseResponseBody.class)
//    })
//    public ResponseEntity<BaseResponseBody> getSnacksById(@PathVariable @ApiParam(value="스낵스 아이디")Long snacksId){
//        Optional<Snacks> page = snacksRepository.findById(snacksId);
//        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", "sd"));
//    }

//    @PostMapping("/{snacksId}")
//    public Page<Snacks> getSnacks(@RequestBody @ApiParam(value="스낵스 아이디")Pageable pageable){
//        return page;
//    }
//
//    @PostMapping("/{snacksId}/comments")
//    public Page<Snacks> getSnacks(@RequestBody @ApiParam(value="스낵스 아이디")Pageable pageable){
//        return page;
//    }
//
    @PutMapping("/upload")
    @ApiOperation(value = "스낵스 업로드", notes = "스낵스 영상을 업로드합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = UserMyRes.class)
    })
    public ResponseEntity<BaseResponseBody> uploadSnacks(@RequestBody @ApiParam(value="스낵스 아이디") SnacksDto snacksDto, HttpServletRequest req) throws IOException {
        Snacks snacks = snacksService.uploadSnacks(snacksDto);
        // 프로필 이미지 파일 업로드
        MultipartFile file = snacksDto.getSnacksVideo();
        if(!file.isEmpty()) {
            s3Uploader.uploadFiles(file, "video/snacks", req.getServletContext().getRealPath("/video/snacks/"), String.valueOf(snacks.getSnacksId()));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", snacksDto));
    }

    @PutMapping("/{snacksId}/like")
    @ApiOperation(value = "스낵스 좋아요", notes = "스낵스에 좋아요를 합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = SnacksDto.class),
//            @ApiResponse(code = 401, message = "Invalid", response = SnacksHeartDto.class)
    })
    public ResponseEntity<BaseResponseBody> snacksLike(@RequestBody @ApiParam(value="유저 아이디")String userId,
                                                       @PathVariable @ApiParam(value="스낵스 아이디") int snacksId){

        snacksService.likeSnacks(userId,snacksId);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", snacksId));
    }

    @PutMapping("/{snacksId}/unlike")
    @ApiOperation(value = "스낵스 좋아요 취소", notes = "스낵스에 좋아요 취소를 합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = SnacksDto.class),
//            @ApiResponse(code = 401, message = "Invalid", response = BaseResponseBody.class)
    })
    public ResponseEntity<BaseResponseBody> snacksUnlike(@RequestBody @ApiParam(value="유저 아이디")String userId,
                                                         @PathVariable @ApiParam(value="스낵스 아이디") int snacksId){
        snacksService.unlikeSnacks(userId,snacksId);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", snacksId));
    }
//
//    @PostMapping("/{snacksId}/tag/popular")
//    public Page<Snacks> getSnacks(@RequestBody @ApiParam(value="스낵스 아이디")Pageable pageable){
//        return page;
//    }

}
