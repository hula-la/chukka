package com.ssafy.db.repository;

import com.ssafy.db.entity.Pay;
import com.ssafy.db.entity.Snacks;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface PayRepository extends JpaRepository<Pay, String> {

    @Query("SELECT p.payMethod, p.payId, p.payDate, p.payLists, p.payAmount FROM Pay p join fetch p.payLists where p.user.userId = :userId")
    List<Pay> findAllWithPaylistUsingFetchJoin(String userId, Pageable pageable);

}
