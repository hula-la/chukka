package com.ssafy.db.repository;

import com.ssafy.db.entity.Pay;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PayRepository extends JpaRepository<Pay, Integer> {

    @Query(value = "SELECT p.payId, p.payDate, p.payAmount, p.payMethod, p.payLists FROM Pay p join fetch p.payLists where p.user.userId = :userId", nativeQuery = true)
    List<Pay> findPaylistUsingFetchJoin(String userId);

}
