package com.ssafy.api.service;

import com.ssafy.db.entity.Cart;
import com.ssafy.db.entity.CartItem;
import com.ssafy.db.entity.Lecture;
import com.ssafy.db.entity.User;

import javax.transaction.Transactional;
import java.util.List;

public interface CartService {

    // 장바구니 생성(장바구니에 한번도 강의를 넣은적이 없을 때)
    Cart createCart(User user);

    //장바구니 목록 추가
    Cart createCartItem(Cart cart, Lecture lecture);

    //장바구니 조회
    Cart findCartByUser(String userId);

    //장바구니 목록 조회
    List<CartItem> findCartItemsByCartId(Cart cart);

    //장바구니 삭제
    void deleteCartItemById(int cartItemId);

    //장바구니 수정 ( 수량 업데이트 )
    Cart updateCart(int cartId, int cnt);


}
