package com.hoangthh.backend.infra.repository.service;

import com.hoangthh.backend.core.domain.RegisterRequestCore;
import com.hoangthh.backend.core.domain.UserCore;
import com.hoangthh.backend.core.service.provider.UserProvider;
import com.hoangthh.backend.infra.repository.db.UserRepository;
import com.hoangthh.backend.infra.repository.mapper.AuthEntityMapper;
import com.hoangthh.backend.infra.repository.mapper.UserEntityMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserProviderImpl implements UserProvider {
    private final UserRepository userRepository;
    private final UserEntityMapper userEntityMapper;
    private final AuthEntityMapper authEntityMapper;
    @Override
    public void save(RegisterRequestCore request) {
        userRepository.save(authEntityMapper.toEntity(request));
    }

    @Override
    public Optional<UserCore> findByUsername(String username) {
        return userEntityMapper.toOptionalDomain(userRepository.findByUsername(username));
    }
}
