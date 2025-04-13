package com.hoangthh.backend.core.domain;

import com.hoangthh.backend.infra.repository.db.entity.Product;
import com.hoangthh.backend.infra.repository.db.entity.VariantAttribute;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VariantCore {
    private Long id;

    private Product product;

    private String sku;

    private double price;

    private int stock;

    private String imageUrl;

    private List<VariantAttributeCore> variantAttributes;
}


