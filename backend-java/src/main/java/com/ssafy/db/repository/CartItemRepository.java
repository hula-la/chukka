package com.ssafy.db.repository;

import com.ssafy.db.entity.Cart;
import com.ssafy.db.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartItemRepository  extends JpaRepository<CartItem, Integer> {

    List<CartItem> findCartItemsByCartId(Cart cart);
    void deleteCartItemByCartItemId(int cartItemId);


}
