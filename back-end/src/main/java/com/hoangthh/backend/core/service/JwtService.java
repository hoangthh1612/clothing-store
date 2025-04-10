package com.hoangthh.backend.core.service;

import com.hoangthh.backend.core.domain.UserCore;
import com.hoangthh.backend.infra.repository.mapper.UserEntityMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class JwtService {
    private final CustomUserDetailsService customUserDetailsService;
    private final UserEntityMapper userEntityMapper;
    private final UserService userService;
    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.expiration}")
    private long expirationTime;
    private final static long accessTokenValiditySeconds = 15 * 60 * 1000;
    private final static long refreshTokenValiditySeconds = 60 * 60 * 1000;

    private SecretKey getSigningKey() {
        //byte[] keyBytes = Base64.getDecoder().decode(secretKey);
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public UserCore getUser(String username) {
        return userService.getUserByUsername(username);
    }

    public String generateAccessToken(String username) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, username, accessTokenValiditySeconds);
    }
    public String generateRefreshToken(String username) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, username, refreshTokenValiditySeconds);
    }

    public String createToken(Map<String, Object> claims, String username, long validity) {
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);

        UserCore user = getUser(username);
        claims.put("userId", user.getId());
        return Jwts.builder()
                .claims(claims)
                .subject(userDetails.getUsername())
                .issuer(userDetails.getAuthorities().iterator().next().getAuthority())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + validity))
                .signWith(getSigningKey()).compact();
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);

    }


    public boolean validateToken(String token, UserDetails userDetails) {
        final String userName = extractUsername(token);
        return (userName.equals(userDetails.getUsername()) && isTokenExpired(token));
    }
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        Claims claims = Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
        return claimsResolver.apply(claims);
    }

    public boolean isTokenValid(String token, String username) {
        return extractUsername(token).equals(username) && isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return !extractClaim(token, Claims::getExpiration).before(new Date());
    }
}
