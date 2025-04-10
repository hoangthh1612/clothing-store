package com.hoangthh.backend.core.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductCore {
    private Long id;
    private String name;
    private String description;
    private String imageUrl;
    private List<AttributeCore> attributes;
    private List<VariantCore> variants;

}
