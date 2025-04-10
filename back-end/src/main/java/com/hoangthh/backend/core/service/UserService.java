package com.hoangthh.backend.core.service;

import com.hoangthh.backend.core.domain.UserCore;
import com.hoangthh.backend.core.exception.NotFoundException;
import com.hoangthh.backend.core.service.provider.UserProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserProvider userProvider;

    public Boolean checkExistedUser(String username) {
        return userProvider.findByUsername(username).isPresent();
    }

    public UserCore getUserByUsername(String username) {
        return userProvider.findByUsername(username).orElseThrow(() -> new NotFoundException("User not found"));
    }
}
