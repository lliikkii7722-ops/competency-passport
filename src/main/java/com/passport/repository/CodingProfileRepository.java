package com.passport.repository;

import com.passport.model.CodingProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CodingProfileRepository extends JpaRepository<CodingProfile, Long> {
    List<CodingProfile> findByUserId(Long userId);
    Optional<CodingProfile> findByUserIdAndPlatform(Long userId, String platform);
}