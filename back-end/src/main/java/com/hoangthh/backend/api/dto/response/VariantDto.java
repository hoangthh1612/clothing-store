package com.hoangthh.backend.api.dto.response;

import com.hoangthh.backend.infra.repository.db.entity.Product;
import com.hoangthh.backend.infra.repository.db.entity.VariantAttribute;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder

public class VariantDto {
    private Long id;

    private Product product;

    private String sku;

    private double price;

    private int stock;

    private String imageUrl;

    private List<VariantAttribute> variantAttributes;

}
