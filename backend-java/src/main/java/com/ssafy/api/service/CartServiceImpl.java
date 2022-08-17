package com.ssafy.api.service;

import com.ssafy.api.controller.CartController;
import com.ssafy.api.request.lecture.LecturePostReq;
import com.ssafy.api.response.cart.CartLecGetRes;
import com.ssafy.api.response.lecture.LecturePostRes;
import com.ssafy.db.entity.Cart;
import com.ssafy.db.entity.CartItem;
import com.ssafy.db.entity.Lecture;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.CartItemRepository;
import com.ssafy.db.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service("CartService")
public class CartServiceImpl implements CartService{

    @Autowired
    CartRepository cartRepository;
    @Autowired
    CartItemRepository cartItemRepository;

    /* 사용자 장바구니 생성*/
    public Cart createCart(User user){
        Cart cart = new Cart();
        cart.setUser(user);
        cart.setCount(0);
        cartRepository.save(cart);
        return cart;
    }

    /* 장바구니의 수량 변경*/
    public Cart updateCart(Cart cart){
        System.out.println("===== 수량 변경=========");
        cart.setCount(cart.getCount()-1);
        System.out.println(">>"+cart.getCount());
        Cart updatedCart = cartRepository.save(cart);
        cartRepository.flush();
        return updatedCart;
    }

    /* 장바구니 강의 생성 */
    public CartItem createCartItem(Cart cart, Lecture lecture) {

        CartItem cartItem = new CartItem();
        cartItem.setCart(cart);
        cartItem.setLecture(lecture);
        // cart에 add ?
        cartItemRepository.save(cartItem);
        cart.setCount(cart.getCount() + 1);
        cartRepository.save(cart);
        return cartItem;

    }

    /* 사용자의 장바구니 정보 반환*/
    @Override
    public Cart findCartByUser(String userId) {
        Optional<Cart> cart = cartRepository.findByUser_UserId(userId);
        if(cart.isPresent()) {
            return cart.get();
        }
        return null;
    }

    /* 사용자의 장바구니 강의 list 반환*/
    @Override
    public List<CartLecGetRes> findCartItemsByCartId(String userId) {
        Optional<Cart> findCart = cartRepository.findByUser_UserId(userId);
        if(findCart.isPresent()){
            Cart cart = findCart.get();
            List<CartItem> cartItems = cartItemRepository.findAllByCart_Id(cart.getId());
            List<CartLecGetRes> cartLecGetRes = new ArrayList<>();
            for(CartItem item : cartItems){
                cartLecGetRes.add(new CartLecGetRes(item.getLecture(), item.getCartItemId()));
            }

            return cartLecGetRes;
        }

        return null;
    }

    /* 장바구니 강의 삭제*/
    @Override
    public Cart deleteByCartItemId(int cartItemId, Cart cart) {
        cartItemRepository.deleteById(cartItemId);
        cart.setCount(cart.getCount()-1);
        Cart updatedCart = cartRepository.save(cart);
        cartRepository.flush();
        return updatedCart;
    }

    /* 장바구니 강의 list 삭제*/
    @Override
    public Cart deleteListByCartItemId(Cart cart, List<Integer> cartItemIds) {
        for(int itemId : cartItemIds){
            cartItemRepository.deleteById(itemId);
        }
        cart.setCount(cart.getCount()-cartItemIds.size());
        Cart updatedCart = cartRepository.save(cart);
        cartRepository.flush();
        return updatedCart;
    }

    /* 장바구니 item 조회*/
    @Override
    public CartItem findCartItem(int lecId, int cartId) {
        Optional<CartItem> cartItem = cartItemRepository.findByLecture_LecIdAndCart_Id(lecId, cartId);

        if(cartItem.isPresent()) {
            return cartItem.get();
        }
        return null;
    }


}
