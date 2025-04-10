package com.hoangthh.backend.api.controller;

import com.hoangthh.backend.api.dto.request.AuthRequest;
import com.hoangthh.backend.api.dto.request.RefreshRequest;
import com.hoangthh.backend.api.dto.request.RegisterRequest;
import com.hoangthh.backend.api.dto.response.AuthResponse;
import com.hoangthh.backend.api.dto.response.RegisterResponse;
import com.hoangthh.backend.api.mapper.AuthMapper;
import com.hoangthh.backend.core.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;
    private final AuthMapper authMapper;
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(authMapper.toDomain(request)));
    }


    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.login(authMapper.toDomain(request)));
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refresh(@RequestBody RefreshRequest request) {
        String refreshToken = request.getRefreshToken();
        String newAccessToken = authService.refresh(refreshToken);
        return ResponseEntity.ok(AuthResponse.builder()
                .refreshToken(refreshToken)
                .accessToken(newAccessToken)
                .build());
    }


}
