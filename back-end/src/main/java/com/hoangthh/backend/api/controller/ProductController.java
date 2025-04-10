package com.hoangthh.backend.api.controller;

import com.hoangthh.backend.api.dto.response.ProductDto;
import com.hoangthh.backend.core.domain.ProductCore;
import com.hoangthh.backend.core.service.ProductService;
import com.hoangthh.backend.infra.repository.db.entity.Product;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product")

@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @GetMapping("/getAll")
    public List<ProductCore> getProducts() {
        return productService.findAll();
    }

    @GetMapping("/getProductById/{id}")
    public ProductCore getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }
}
