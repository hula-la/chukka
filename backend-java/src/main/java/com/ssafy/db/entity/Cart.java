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
public class Cart{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cartId")
    private int id;

    @OneToOne
    @JoinColumn(name = "userId")
    private User user;

    private int count;

    @OneToMany(mappedBy = "cartItemId", fetch = FetchType.LAZY)
    private List<CartItem> cartItems = new ArrayList<>();


    private void addCartItem(CartItem cartItem){
        cartItems.add(cartItem);
    }

}
