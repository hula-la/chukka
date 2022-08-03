package com.ssafy.api.controller;

import com.ssafy.api.request.cart.CartPostReq;

import com.ssafy.api.service.CartService;
import com.ssafy.api.service.LectureService;
import com.ssafy.api.service.UserService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.*;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api(value = "장바구니 API", tags = {"Cart"})
@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    CartService cartService;

    @Autowired
    LectureService lectureService;
    @Autowired
    UserService userService;


    // 장바구니 추가 ========================================================================================================
    @PostMapping("/")
    @ApiOperation(value = "장바구니 추가", notes = "<strong>아이디, 강의 아이디</strong>를 받아 회원의 장바구니에 추가한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = BaseResponseBody.class)
    })
    public ResponseEntity<BaseResponseBody> insert(
            @RequestBody @ApiParam(value="회원 아이디, 강의 아이디", required = true) CartPostReq cartPostReq) {

        // userId가 유효한 userId 인지 확인해야함 (로그인 했는지 확인)
        Cart cart = cartService.findCartByUser(cartPostReq.getUserId());
        User user = userService.getUserByUserId(cartPostReq.getUserId());
        if(cart == null){
            cart = cartService.createCart(user);
        }

        Lecture lecture = lectureService.findLectureByLecId(cartPostReq.getLecId());
        cartService.createCartItem(cart, lecture);


        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", null));
    }




}
