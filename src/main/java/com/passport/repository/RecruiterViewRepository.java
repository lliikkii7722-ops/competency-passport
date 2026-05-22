package com.passport.repository;

import com.passport.model.RecruiterView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RecruiterViewRepository extends JpaRepository<RecruiterView, Long> {
    List<RecruiterView> findByUserId(Long userId);
    Optional<RecruiterView> findByAccessToken(String accessToken);
}