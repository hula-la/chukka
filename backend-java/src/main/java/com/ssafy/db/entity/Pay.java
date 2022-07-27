package com.ssafy.db.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Getter
@Setter
public class Pay{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pay_id")
    private int payId;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    @Temporal(TemporalType.DATE)
    private Date payDate;

    private int payAmount;
    private int payMethod;

    @OneToMany(mappedBy = "pay")
    private List<PayList> payLists = new ArrayList<>();

}
