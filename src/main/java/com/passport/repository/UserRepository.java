package com.passport.repository;

import com.passport.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByLinkedinId(String linkedinId);
    Optional<User> findByPublicSlug(String publicSlug);
    boolean existsByEmail(String email);
}