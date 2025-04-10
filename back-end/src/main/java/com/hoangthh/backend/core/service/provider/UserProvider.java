package com.hoangthh.backend.core.service.provider;

import com.hoangthh.backend.core.domain.RegisterRequestCore;
import com.hoangthh.backend.core.domain.UserCore;

import java.util.Optional;

public interface UserProvider {
    public void save(RegisterRequestCore request);
    public Optional<UserCore> findByUsername(String username);
}
