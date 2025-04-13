package com.hoangthh.backend.infra.repository.service;

import com.hoangthh.backend.api.dto.request.ProductRequest;
import com.hoangthh.backend.api.dto.request.VariantAttributeRequest;
import com.hoangthh.backend.api.dto.request.VariantRequest;
import com.hoangthh.backend.core.domain.ProductCore;
import com.hoangthh.backend.core.service.provider.ProductProvider;
import com.hoangthh.backend.infra.repository.cache.CacheRepository;
import com.hoangthh.backend.infra.repository.db.AttributeValueRepository;
import com.hoangthh.backend.infra.repository.db.CategoryRepository;
import com.hoangthh.backend.infra.repository.db.ProductRepository;
import com.hoangthh.backend.infra.repository.db.entity.*;
import com.hoangthh.backend.infra.repository.mapper.ProductEntityMapper;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class ProductProviderImpl implements ProductProvider {
    private static final Logger log = LoggerFactory.getLogger(ProductProviderImpl.class);
    private final ProductRepository productRepository;
    private final ProductEntityMapper productEntityMapper;
    private final CategoryRepository categoryRepository;
    private final AttributeValueRepository attributeValueRepository;
    private final CacheRepository cacheRepository;
    private static final String PRODUCT_CACHE_PREFIX = "product:";

    @Override
    public void save(ProductRequest request) {
        Category category = categoryRepository.findByCategoryName(request.getBasicInfo().getCategoryName());

        Product newProduct = new Product();
        newProduct.setName(request.getBasicInfo().getProductName());
        newProduct.setDescription(request.getBasicInfo().getDescription());
        newProduct.setCategory(category);
        newProduct.setImageUrl(request.getBasicInfo().getImageUrl());
        List<Variant> variants = new ArrayList<>();
        for(VariantRequest variantRequest : request.getSaleInfo().getVariants()) {
            Variant variant = new Variant();
            variant.setPrice(variantRequest.getPrice());
            variant.setStock(variantRequest.getStock());
            StringBuilder sku = new StringBuilder(request.getBasicInfo().getProductName());

            for(VariantAttributeRequest value: variantRequest.getVariantAttributes()) {
                sku.append(value.getValueName());
            }
            variant.setImageUrl(variantRequest.getImageUrl());
            variant.setSku(sku.toString());
            variant.setProduct(newProduct);
            List<VariantAttribute> variantAttributes = new ArrayList<>();
            for(VariantAttributeRequest value: variantRequest.getVariantAttributes()) {
                VariantAttribute variantAttribute = new VariantAttribute();
                variantAttribute.setAttributeValue(getAttributeValue(value.getId()));
                variantAttribute.setVariant(variant);
                variantAttributes.add(variantAttribute);
            }
            variant.setVariantAttributes(variantAttributes);
            variants.add(variant);

        }
        newProduct.setVariants(variants);
        productRepository.save(newProduct);
    }

    @Override
    public List<ProductCore> findAll() {
        List<Product> product = productRepository.findAll();
        return product.stream().map(productEntityMapper::toDomain).toList();
    }

    @Override
    public Optional<ProductCore> findById(Long id) {
        String key = PRODUCT_CACHE_PREFIX + id;
        Optional<ProductCore> product = cacheRepository.getObject(key, ProductCore.class);
        if(product.isPresent()) {
            return product;
        }
        log.info("Cache miss");
        Optional<ProductCore> core = productRepository.findById(id).map(productEntityMapper::toDomain);
        if(core.isPresent()) {
            cacheRepository.cacheObject(key, core.get(), Duration.ofMinutes(5));
            log.info("set product cache successfully");
        }
        log.info("Get product by id from db: {}", id);
        return core;
    }

    private AttributeValue getAttributeValue(Long id) {
        return attributeValueRepository.findById(id).orElseThrow(() -> new RuntimeException("Attribute not found"));
    }
}
