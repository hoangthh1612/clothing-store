package com.hoangthh.backend.api.mapper;

import com.hoangthh.backend.api.dto.request.AuthRequest;
import com.hoangthh.backend.api.dto.request.RegisterRequest;
import com.hoangthh.backend.core.domain.AuthRequestCore;
import com.hoangthh.backend.core.domain.RegisterRequestCore;
import org.springframework.stereotype.Component;

@Component
public class AuthMapper {

    public RegisterRequestCore toDomain(RegisterRequest request) {
        return RegisterRequestCore.builder()
                .username(request.getUsername())
                .password(request.getPassword())
                .email(request.getEmail())
                .role(request.getRole() != null? request.getRole() : "USER")
                .build();
    }

    public AuthRequestCore toDomain(AuthRequest request) {
        return AuthRequestCore.builder()
                .username(request.getUsername())
                .password(request.getPassword())
                .build();
    }
}
