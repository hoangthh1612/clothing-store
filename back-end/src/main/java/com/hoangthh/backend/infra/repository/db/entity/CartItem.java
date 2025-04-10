package com.hoangthh.backend.infra.repository.db.entity;

import jakarta.persistence.*;
import lombok.*;
//import jakarta.validation.constraints.Min;
import java.util.UUID;

@Entity
@Table(name = "cart_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "cart_id", nullable = false)
    private Cart cart;

    @ManyToOne
    @JoinColumn(name = "variant_id", nullable = false)
    private Variant variant;

    //@Min(1)
    @Column(nullable = false)
    private int quantity;

    @Column(nullable = false)
    private double price;
}
