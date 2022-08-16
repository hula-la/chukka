package com.ssafy.db.repository;

import com.ssafy.db.entity.Pay;
import com.ssafy.db.entity.PayList;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PayListRepository extends JpaRepository<PayList, Integer> {

    List<PayList> findPayListsByPay_PayId(int payId, Pageable pageable);

    List<PayList> findPayListsByUserUserId(String userId);


}
