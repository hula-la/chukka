package com.ssafy.api.service;

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


@Service("CartService")
public class CartServiceImpl implements CartService{

    @Autowired
    CartRepository cartRepository;
    CartItemRepository cartItemRepository;

    public Cart createCart(User user){
        Cart cart = new Cart();
        cart.setUser(user);
        cart.setCount(0);
        cartRepository.save(cart);
        return cart;
    }

    public Cart createCartItem(Cart cart, Lecture lecture){
        CartItem cartItem = new CartItem();
        cartItem.setCart(cart);
        cartItem.setLecture(lecture);
        // cart에 add 안해도 되는지
        System.out.println(cartItem.toString());
        cartItemRepository.save(cartItem);
        return cart;
    }

    @Override
    public Cart findCartByUser(String userId) {
        return cartRepository.findCartByUser_UserId(userId);
    }

    @Override
    public List<CartItem> findCartItemsByCartId(Cart cart) {
        List<CartItem> cartItems = cartItemRepository.findCartItemsByCartId(cart);
        return cartItems;
    }

    @Override
    public void deleteCartItemById(int cartItemId) {
        cartItemRepository.deleteCartItemByCartItemId(cartItemId);
    }

    @Override
    public Cart updateCart(int cartId, int cnt) {
        return null;
    }


}
