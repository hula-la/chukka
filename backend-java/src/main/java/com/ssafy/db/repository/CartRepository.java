package com.ssafy.db.repository;


import com.ssafy.db.entity.Cart;
import com.ssafy.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Integer> {

    Optional<Cart> findByUser_UserId(String userId);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(value="update Cart c set c.count = c.count + :cnt where c.id = :cartId")
    Optional<Cart> updateCartCnt(int cartId, int cnt);

}
