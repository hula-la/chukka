package com.ssafy.api.controller;

import com.ssafy.api.request.cart.CartDelReq;
import com.ssafy.api.response.cart.CartLecGetRes;
import com.ssafy.api.request.cart.CartPostReq;

import com.ssafy.api.service.*;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.*;
import com.ssafy.db.repository.CartRepository;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;
import java.util.Optional;

@Api(value = "장바구니 API", tags = {"Cart"})
@RestController
@RequestMapping("/cart")
public class CartController  {

    @Autowired
    CartService cartService;
    @Autowired
    CartRepository cartRepository;
    @Autowired
    LectureService lectureService;
    @Autowired
    UserService userService;
    @Autowired
    EnrollService enrollService;



    // 장바구니 추가 ========================================================================================================
    @PostMapping("/{lecId}")
    @ApiOperation(value = "장바구니 추가", notes = "<strong>강의 아이디</strong>를 받아 회원의 장바구니에 추가한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = BaseResponseBody.class)
    })
    public ResponseEntity<BaseResponseBody> insert(@ApiIgnore Authentication authentication,
            @PathVariable @ApiParam(value="강의 아이디", required = true) int lecId) {
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        String loginUserId = userDetails.getUsername();
        User user = userService.getUserByUserId(loginUserId);
        Cart cart = cartService.findCartByUser(user.getUserId());
        System.out.println(user.getUserId());
        String msg = "";
        if(cart == null){ // 장바구니에 처음 담을 경우 cart 생성
            cart = cartService.createCart(user);
        }
        // 장바구니에 담겨있는지 확인
        CartItem findItem = cartService.findCartItem(lecId, cart.getId());
        if(findItem != null) {
            msg = "이미 장바구니에 담긴 강의 입니다.";
        }else {
            boolean isEnroll = enrollService.findByLecIdAnsUserId(lecId, user.getUserId());
            if (isEnroll) msg = "이미 수강 중인 강의입니다.";
            else {
                Lecture findLecture = lectureService.findLectureByLecId(lecId);
                if (findLecture == null) msg = "다시 시도해주시기 바랍니다.";
                else {
                    CartItem cartItem = cartService.createCartItem(cart, findLecture);
                    if (cartItem != null) {
                        msg = "장바구니에 담겼습니다.";
                    }
                }
            }
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, msg, null));
    }

    // 장바구니 목록 ========================================================================================================
    @GetMapping("/list")
    @ApiOperation(value = "장바구니 목록", notes = "회원의 장바구니 목록을 반환한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = BaseResponseBody.class)
    })
    public ResponseEntity<BaseResponseBody> listAll(@ApiIgnore Authentication authentication) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String loginUserId = userDetails.getUsername();
        User user = userService.getUserByUserId(loginUserId);


        Cart cart = cartService.findCartByUser(user.getUserId());
        if(cart ==null || cart.getCount()==0){
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", null));
        }
        List<CartLecGetRes> lectures = cartService.findCartItemsByCartId(user.getUserId());
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", lectures));

    }

    // 장바구니 item list 삭제 ========================================================================================================
    @PostMapping("/items")
    @ApiOperation(value = "장바구니 목록 리스트 삭제", notes = "<strong>장바구니 목록 id 리스트를 받아</strong> 장바구니 목록에서 강의들을 삭제한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = BaseResponseBody.class)
    })
    public ResponseEntity<BaseResponseBody> deleteList(@ApiIgnore Authentication authentication,
            @RequestBody @ApiParam(value="장바구니 목록 아이디 리스트", required = true) CartDelReq cartDelReq) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String loginUserId = userDetails.getUsername();
        User user = userService.getUserByUserId(loginUserId);
        try{
            Cart userCart = cartService.findCartByUser(user.getUserId());
            System.out.println("전 >> "+ userCart.getCount());
            Cart updated = cartService.deleteListByCartItemId(userCart,cartDelReq.getItemIds());
            System.out.println("후 >> "+updated.getCount());
            String msg="Success";
            if(updated == null){
                msg = "정보 업데이트 중 에러 발생";
            }
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, msg, null));
        }catch (Exception e){
            return ResponseEntity.status(403).body(BaseResponseBody.of(403, "fail", null));
        }
    }
    // 장바구니 item 삭제 ========================================================================================================
    @DeleteMapping("/{cartItemId}")
    @ApiOperation(value = "장바구니 목록 삭제", notes = "<strong>장바구니 목록 id를 받아</strong> 장바구니 목록에서 강의를 삭제한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = BaseResponseBody.class)
    })
    public ResponseEntity<BaseResponseBody> delete(@ApiIgnore Authentication authentication,
            @PathVariable @ApiParam(value="장바구니 목록 아이디", required = true) int cartItemId) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String loginUserId = userDetails.getUsername();
        User user = userService.getUserByUserId(loginUserId);
        try{
            Cart userCart = cartService.findCartByUser(user.getUserId());
            Cart updateCart = cartService.deleteByCartItemId(cartItemId, userCart);
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", updateCart.getCount()));
        }catch (Exception e){
            return ResponseEntity.status(403).body(BaseResponseBody.of(403, "fail", null));
        }
    }

    @GetMapping("/count")
    @ApiOperation(value = "장바구니 목록 개수", notes = "회원의 장바구니에 들어있는 강의 수를 반환한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success", response = BaseResponseBody.class)
    })
    public ResponseEntity<BaseResponseBody> getCount(@ApiIgnore Authentication authentication) {
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        String loginUserId = userDetails.getUsername();
        User user = userService.getUserByUserId(loginUserId);
        int count=0;
        try{
            Cart userCart = cartService.findCartByUser(user.getUserId());
            if(userCart != null){
                count = userCart.getCount();
            }
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success", count));
        }catch (Exception e){
            return ResponseEntity.status(403).body(BaseResponseBody.of(403, "fail", null));
        }

    }

}
