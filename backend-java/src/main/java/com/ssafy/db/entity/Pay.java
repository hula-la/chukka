package com.ssafy.db.entity;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;



@Data
@Entity
@Getter @Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class Pay{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pay_id")
    private int payId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User user;

    @Temporal(TemporalType.DATE)
    private Date payDate;

    private int payAmount;
    private String payMethod;
    private String payUid;

    @OneToMany(mappedBy = "pay")
    private List<PayList> payLists = new ArrayList<>();

}
