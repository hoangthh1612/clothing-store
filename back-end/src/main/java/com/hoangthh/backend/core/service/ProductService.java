package com.hoangthh.backend.core.service;

import com.hoangthh.backend.core.domain.ProductCore;
import com.hoangthh.backend.core.exception.NotFoundException;
import com.hoangthh.backend.core.service.provider.ProductProvider;
import com.hoangthh.backend.infra.repository.db.ProductRepository;
import com.hoangthh.backend.infra.repository.db.entity.Product;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor

public class ProductService {
    private static final Logger log = LoggerFactory.getLogger(ProductService.class);
    private final ProductProvider productProvider;
    public List<ProductCore> findAll() {
        return productProvider.findAll();

    }

    //@Cacheable(value= "product_cache", key = "#id")
    public ProductCore getProductById(Long id) {
        try {

            return productProvider.findById(id).orElseThrow(() -> new NotFoundException("Product not found"));
        }
        catch (NotFoundException e) {
            throw new NotFoundException("Product not found");
        }
        catch (Exception e) {
            log.error("Fetching product failed", e);
            throw new RuntimeException("Fetching product failed", e);

        }
    }
}
