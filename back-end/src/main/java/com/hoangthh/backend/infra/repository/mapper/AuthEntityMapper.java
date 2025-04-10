package com.hoangthh.backend.infra.repository.mapper;

import com.hoangthh.backend.core.domain.RegisterRequestCore;
import com.hoangthh.backend.infra.repository.db.entity.User;
import com.hoangthh.backend.infra.repository.db.enums.UserRole;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AuthEntityMapper {
    public User toEntity(RegisterRequestCore request) {
        User entity = new User();
        entity.setUsername(request.getUsername());
        entity.setPassword(request.getPassword());
        entity.setEmail(request.getEmail());
        entity.setRole(UserRole.valueOf(request.getRole()));
        return entity;
    }
}
