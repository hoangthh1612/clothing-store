package com.hoangthh.backend.core.service;

import com.hoangthh.backend.api.dto.response.AuthResponse;
import com.hoangthh.backend.core.domain.AuthRequestCore;
import com.hoangthh.backend.core.domain.RegisterRequestCore;
import com.hoangthh.backend.core.exception.WrongCredentialsException;
import com.hoangthh.backend.core.service.provider.UserProvider;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private static final Logger log = LoggerFactory.getLogger(AuthService.class);
    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final UserProvider userProvider;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    public String register(RegisterRequestCore request) {
        if(userService.checkExistedUser(request.getUsername())) {
            return "Username already exists";
        }
        try {
            String bcryptPassword = passwordEncoder.encode(request.getPassword());
            request.setPassword(bcryptPassword);
            userProvider.save(request);
            return "Registration successful";
        }
        catch(RuntimeException e) {
            throw new RuntimeException("Could not register");
        }

    }

    public AuthResponse login(AuthRequestCore request) {
        // check username
        /*
        * 1. determine type of AuthenticationToken
        * 2. Find a AuthenticationProvider(DaoAuthenticationProvider if using username and password)
        * 3. Call UserDetailsService.loadUserByUsername(username)
        * 4. Check password using PasswordEncoder.matches()
        * 5. Return a authenticated Authentication
        * */
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

        if(authentication.isAuthenticated()) {
            String accessToken = jwtService.generateRefreshToken(request.getUsername());
            String refreshToken = jwtService.generateRefreshToken(request.getUsername());
            return AuthResponse.builder()
                    .username(request.getUsername())
                    .accessToken(accessToken)
                    .refreshToken(refreshToken)
                    .build();
            //return res;
        }
        else throw new WrongCredentialsException("Wrong credentials");
    }
    public String refresh(String refreshToken) {
        System.out.println("Refresh token: " + refreshToken);
        String username = jwtService.extractUsername(refreshToken);
        log.info("username: {}", username);

        if(jwtService.isTokenValid(refreshToken, username)) {
            throw new WrongCredentialsException("Wrong credentials");
        }
        return jwtService.generateAccessToken(username);

    }

}
