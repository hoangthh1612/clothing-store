package com.hoangthh.backend.core.service;

import com.hoangthh.backend.core.domain.ProductCore;
import com.hoangthh.backend.core.exception.NotFoundException;
import com.hoangthh.backend.core.service.provider.ProductProvider;
import com.hoangthh.backend.infra.repository.db.ProductRepository;
import com.hoangthh.backend.infra.repository.db.entity.Product;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor

public class ProductService {
    private final ProductProvider productProvider;
    public List<ProductCore> findAll() {
        return productProvider.findAll();

    }

    public ProductCore getProductById(Long id) {
        try {
            return productProvider.findById(id).orElseThrow(() -> new NotFoundException("Product not found"));
        }
        catch (NotFoundException e) {
            throw new NotFoundException("Product not found");
        }
        catch (Exception e) {
            throw new RuntimeException("Fetching product failed", e);
        }
    }
}
