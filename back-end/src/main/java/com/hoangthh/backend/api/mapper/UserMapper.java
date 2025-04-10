package com.hoangthh.backend.api.mapper;

import com.hoangthh.backend.api.dto.response.UserDto;
import com.hoangthh.backend.core.domain.UserCore;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserDto toDto(UserCore user) {
        return UserDto.builder()
                .id(user.getId())
                .email(user.getEmail())
                .password(user.getPassword())
                .username(user.getUsername())
                .fullName(user.getFullName())
                .role(user.getRole())
                .build();
    }
}
