package com.hoangthh.backend.infra.repository.mapper;

import com.hoangthh.backend.api.dto.request.ProductRequest;
import com.hoangthh.backend.core.domain.ProductCore;
import com.hoangthh.backend.infra.repository.db.entity.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
@RequiredArgsConstructor
public class ProductEntityMapper {
    private final VariantEntityMapper variantEntityMapper;
    private final AttributeEntityMapper attributeEntityMapper;
    public Product toEntity(ProductRequest request, Category category) {
        Product product = new Product();
        product.setName(request.getBasicInfo().getProductName());
        product.setDescription(request.getBasicInfo().getDescription());
        product.setCategory(category);
        product.setImageUrl(request.getBasicInfo().getImageUrl());
        return product;
    }

    public ProductCore toDomain(Product product) {


        List<Variant> variants = product.getVariants();
        Map<Long, Attribute> attributeMap = new LinkedHashMap<>();

        for (Variant variant : variants) {
            for (VariantAttribute va : variant.getVariantAttributes()) {
                AttributeValue av = va.getAttributeValue();
                Long attrId = av.getAttribute().getId();
                String attrName = av.getAttribute().getAttributeName();

                Attribute attribute = attributeMap.computeIfAbsent(attrId, id -> new Attribute(attrId, attrName, new ArrayList<>()));
                boolean alreadyExists = attribute.getAttributeValues().stream()
                        .anyMatch(v -> v.getId().equals(av.getId()));

                if (!alreadyExists) {
                    attribute.getAttributeValues().add(av);
                }
            }
        }
        List<Attribute> attributes = new ArrayList<>(attributeMap.values());
        return ProductCore.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .imageUrl(product.getImageUrl())
                .attributes(attributes.stream().map(attributeEntityMapper::toDomain).toList())
                .variants(product.getVariants().stream().map(variantEntityMapper::toDomain).toList())
                .build();
    }

}
