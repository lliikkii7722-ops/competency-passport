package com.passport.repository;

import com.passport.model.PeerBenchmark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PeerBenchmarkRepository extends JpaRepository<PeerBenchmark, Long> {
    Optional<PeerBenchmark> findByUserId(Long userId);
}