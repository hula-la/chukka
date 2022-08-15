package com.ssafy.db.repository;

import com.ssafy.api.request.lecture.LecturePostReq;
import com.ssafy.api.response.lecture.LecturePostRes;
import com.ssafy.db.entity.Cart;
import com.ssafy.db.entity.CartItem;
import com.ssafy.db.entity.Lecture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface CartItemRepository  extends JpaRepository<CartItem, Integer> {

    List<CartItem> findAllByCart_Id(int cartId);

//    select * from lecture l left join cart_item on cart_id = 15;
//    @Query(value = "select l.* from lecture l  join  (select lec_id from cart_item where cart_id = :cartId) c on l.lec_id = c.lec_id;", nativeQuery = true)
//    List<LecturePostRes> findLecByCart_Id(int cartId);

    void deleteById(int cartItemId);
    Optional<CartItem> findByLecture_LecIdAndCart_Id(int lecId, int cartId);

    CartItem findByLecture_LecIdAndCart_User_UserId(int lecId, String userId);

}
