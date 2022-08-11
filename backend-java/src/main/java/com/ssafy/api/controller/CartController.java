package com.ssafy.api.controller;

import com.ssafy.api.response.cart.CartLecGetRes;
import com.ssafy.api.request.cart.CartPostReq;

import com.ssafy.api.service.CartService;
import com.ssafy.api.service.LectureService;
import com.ssafy.api.service.UserService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.*;
import com.ssafy.db.repository.CartRepository;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;
import java.util.Optional;

@Api(value = "장바구니 API", tags = {"Cart"})
@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    CartService cartService;
    @Autowired
    CartRepository cartRepository;
    @Autowired
    LectureService lectureService;
    @Autowired
    UserService userService;


    // 장바구니 추가 ========================================================================================================
    @PostMapping("/")
    @ApiOperation(value = "장바구니 추가", notes = "<strong>아이디, 강의 아이디</strong>를 받아 회원의 장바구니에 추가한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = BaseResponseBody.class),
            @ApiResponse(code = 400, message = "Duplicated Item", response = BaseResponseBody.class)
    })
    public ResponseEntity<BaseResponseBody> insert(@ApiIgnore Authentication authentication,
            @RequestBody @ApiParam(value="회원 아이디, 강의 아이디", required = true) CartPostReq cartPostReq) {
        /* =========================      로그인 안 된 경우 에러 처리  ====================== */
//        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
//        String loginUserId = userDetails.getUsername();
//        User user = userService.getUserByUserId(loginUserId);
        /* ============================================================================ */
        Cart cart = cartService.findCartByUser(cartPostReq.getUserId());
        User user = userService.getUserByUserId(cartPostReq.getUserId());
        if(cart == null){
            cart = cartService.createCart(user);
        }
        CartItem findItem = cartService.findCartItem(cartPostReq.getLecId(), cart.getId());
        if(findItem == null){ // 중복되지 않았을 경우
            Lecture findLecture = lectureService.findLectureByLecId(cartPostReq.getLecId());
            if(findLecture != null){
                CartItem cartItem = cartService.createCartItem(cart, findLecture);
                if(cartItem != null ){
                    return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", null));
                }
            }
            return ResponseEntity.status(403).body(BaseResponseBody.of(403, "fail", null));
        }
        return ResponseEntity.status(400).body(BaseResponseBody.of(400, "Duplicated Item", null));

    }

    // 장바구니 목록 ========================================================================================================
    @GetMapping("/{userId}")
    @ApiOperation(value = "장바구니 목록", notes = "<strong>회원 아이디</strong>를 받아 회원의 장바구니 목록을 반환한다. ")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = BaseResponseBody.class)
    })
    public ResponseEntity<BaseResponseBody> listAll(@ApiIgnore Authentication authentication,
                                                   @PathVariable @ApiParam(value="회원 아이디", required = true) String userId) {
        /* =========================      로그인 안 된 경우 에러 처리  ====================== */
//        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
//        String loginUserId = userDetails.getUsername();
//        User user = userService.getUserByUserId(loginUserId);
        /* ============================================================================ */
        User user = userService.getUserByUserId(userId);


        Cart cart = cartService.findCartByUser(userId);
        if(cart ==null || cart.getCount()==0){
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", null));
        }
        List<CartLecGetRes> lectures = cartService.findCartItemsByCartId(userId);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", lectures));

    }

    // 장바구니 item 삭제 ========================================================================================================
    @DeleteMapping("/{cartItemId}")
    @ApiOperation(value = "장바구니 목록 삭제", notes = "<strong>장바구니 목록 id를 받아</strong> 장바구니 목록에서 강의를 삭제한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = BaseResponseBody.class)
    })
    public ResponseEntity<BaseResponseBody> delete(@ApiIgnore Authentication authentication,
            @PathVariable @ApiParam(value="장바구니 목록 아이디", required = true) int cartItemId) {
        /* =========================      로그인 안 된 경우 에러 처리  ====================== */
//        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
//        String loginUserId = userDetails.getUsername();
        /* ============================================================================ */
        try{
            cartService.deleteByCartItemId(cartItemId);
            Cart userCart = cartService.findCartByUser("user1");
            cartService.updateCart(userCart);
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", null));
        }catch (Exception e){
            return ResponseEntity.status(403).body(BaseResponseBody.of(403, "fail", null));
        }

    }
}
