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

    public Cart createCart(User user){
        Cart cart = new Cart();
        cart.setUser(user);
        cart.setCount(0);
        cartRepository.save(cart);
        return cart;
    }

    public Cart updateCart(Cart cart){
        cart.setCount(cart.getCount()-1);
        Cart updatedCart = cartRepository.save(cart);
        return updatedCart;
    }

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

    @Override
    public Cart findCartByUser(String userId) {
        Optional<Cart> cart = cartRepository.findByUser_UserId(userId);
        if(cart.isPresent()) {
            return cart.get();
        }
        return null;
    }

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

    @Override
    public void deleteByCartItemId(int cartItemId) {
        cartItemRepository.deleteById(cartItemId);
    }

    @Override
    public Cart updateCart(int cartId, int cnt) {
        return null;
    }

    @Override
    public CartItem findCartItem(int lecId, int cartId) {
        Optional<CartItem> cartItem = cartItemRepository.findByLecture_LecIdAndCart_Id(lecId, cartId);

        if(cartItem.isPresent()) {
            return cartItem.get();
        }
        return null;
    }


}
