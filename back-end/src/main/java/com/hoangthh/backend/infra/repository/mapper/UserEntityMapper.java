package com.hoangthh.backend.infra.repository.mapper;

import com.hoangthh.backend.core.domain.RegisterRequestCore;
import com.hoangthh.backend.core.domain.UserCore;
import com.hoangthh.backend.infra.repository.db.entity.User;
import com.hoangthh.backend.infra.repository.db.enums.UserRole;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class UserEntityMapper {

    public Optional<UserCore> toOptionalDomain(Optional<User> entity) {
        if (entity.isPresent()) {
            User user = entity.get();
            return Optional.of(
                    UserCore.builder()
                            .id(user.getId())
                            .email(user.getEmail())
                            .password(user.getPassword())
                            .username(user.getUsername())
                            .fullName(user.getFullName())
                            .role(user.getRole())
                    .build()
            );
        }
        return Optional.empty();
    }
//    public User toEntity(RegisterRequestCore request) {
//        User entity = new User();
//        entity.setUsername(request.getUsername());
//        entity.setPassword(passwordEncoder.encode(request.getPassword()));
//        entity.setEmail(request.getEmail());
//        entity.setRole(UserRole.valueOf(request.getRole()));
//        return entity;
//    }

}
