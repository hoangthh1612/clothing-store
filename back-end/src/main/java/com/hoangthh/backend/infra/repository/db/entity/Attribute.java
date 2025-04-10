package com.hoangthh.backend.infra.repository.db.entity;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "attributes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Attribute {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false, unique = true)
    private String attributeName;

    @OneToMany(mappedBy = "attribute", cascade=CascadeType.ALL, orphanRemoval=true)
    private List<AttributeValue> attributeValues;

}
