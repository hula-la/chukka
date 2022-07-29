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
<<<<<<< HEAD
    private int pay_id;
=======
    private int payId;
>>>>>>> 14658720b448e7a95192d1f91a424c627f24a74c

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    @Temporal(TemporalType.DATE)
<<<<<<< HEAD
    private Date pay_date;

    private int pay_amount;
    private int pay_method;
=======
    private Date payDate;

    private int payAmount;
    private int payMethod;
>>>>>>> 14658720b448e7a95192d1f91a424c627f24a74c

    @OneToMany(mappedBy = "pay")
    private List<PayList> payLists = new ArrayList<>();

}
