package com.ssafy.api.service;

import com.ssafy.api.request.lecture.LecturePostReq;
import com.ssafy.api.response.cart.CartLecGetRes;
import com.ssafy.api.response.lecture.LecturePostRes;
import com.ssafy.db.entity.Cart;
import com.ssafy.db.entity.CartItem;
import com.ssafy.db.entity.Lecture;
import com.ssafy.db.entity.User;

import javax.transaction.Transactional;
import java.util.List;

public interface CartService {

    // 장바구니 생성(장바구니에 한번도 강의를 넣은적이 없을 때)
    Cart createCart(User user);

    // 장바구니 수량 변경
    Cart updateCart(Cart cart);

    //장바구니 목록 추가
    CartItem createCartItem(Cart cart, Lecture lecture);

    //장바구니 조회
    Cart findCartByUser(String userId);

    //장바구니 목록 조회
    List<CartLecGetRes> findCartItemsByCartId(String cartId);

    //장바구니 삭제
    Cart deleteByCartItemId(int cartItemId, Cart cart);

    //장바구니 여러개 삭제
    Cart deleteListByCartItemId(Cart cart, List<Integer> cartItemIds);

    // 장바구니 중복 확인
    CartItem findCartItem(int lecId, int cartId);


}
