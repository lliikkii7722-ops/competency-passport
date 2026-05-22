package com.passport.repository;

import com.passport.model.SkillGapAnalysis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SkillGapAnalysisRepository extends JpaRepository<SkillGapAnalysis, Long> {
    List<SkillGapAnalysis> findByUserIdOrderByAnalysisDateDesc(Long userId);
}