package com.hoangthh.backend.api.controller.cms;

import com.hoangthh.backend.api.dto.request.ProductRequest;
import com.hoangthh.backend.core.service.ProductService;

import com.hoangthh.backend.core.service.cms.CmsProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/cms-product")

@RequiredArgsConstructor
public class CmsProductController {

    private final CmsProductService cmsProductService;

    @PostMapping("/create-product")
    public ResponseEntity<String> createProduct(@RequestBody ProductRequest request) {
        return ResponseEntity.ok(cmsProductService.createProduct(request));

    }

}
