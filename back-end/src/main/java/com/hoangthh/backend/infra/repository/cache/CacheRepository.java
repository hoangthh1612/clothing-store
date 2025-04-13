package com.hoangthh.backend.infra.repository.cache;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.time.Duration;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class CacheRepository {
    private final RedisTemplate<String, Object> redisTemplate;

    public void cacheObject(String key, Object value, Duration ttl) {
        redisTemplate.opsForValue().set(key, value, ttl);
    }

    public <T> Optional<T> getObject(String key, Class<T> clazz) {
        Object obj = redisTemplate.opsForValue().get(key);
        if (obj == null) return Optional.empty();
        return Optional.of(clazz.cast(obj));
    }

    public void delete(String key) {
        redisTemplate.delete(key);
    }
}
