package com.hoangthh.backend.api.controller.cms;

import com.hoangthh.backend.api.dto.request.AttributeRequest;
import com.hoangthh.backend.api.dto.response.AttributeDto;
import com.hoangthh.backend.api.mapper.AttributeMapper;
import com.hoangthh.backend.core.service.AttributeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cms-attribute")
@RequiredArgsConstructor
public class CmsAttributeController {

    private final AttributeService attributeService;
    private final AttributeMapper attributeMapper;
    @PostMapping("/create")
    public ResponseEntity<String> createAttribute(@RequestBody AttributeRequest request) {

        return ResponseEntity.ok(attributeService.createAttribute(request));
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<AttributeDto>> getAllAttributes() {
        return ResponseEntity.ok(attributeService.getAllAttributes().stream().map(AttributeMapper::toDto).toList());
    }
}
