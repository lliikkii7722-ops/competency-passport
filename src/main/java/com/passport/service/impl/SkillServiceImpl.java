package com.passport.service.impl;

import com.passport.dto.request.SkillRequest;
import com.passport.dto.response.SkillResponse;
import com.passport.model.Skill;
import com.passport.model.User;
import com.passport.repository.SkillRepository;
import com.passport.repository.UserRepository;
import com.passport.service.SkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SkillServiceImpl implements SkillService {

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional
    public SkillResponse addSkill(Long userId, SkillRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Skill skill = new Skill();
        skill.setUser(user);
        skill.setSkillName(request.getSkillName());
        skill.setCategory(request.getCategory());
        skill.setProficiencyLevel(request.getProficiencyLevel());
        skill.setSource(request.getSource());
        skill.setIsVerified(false);

        Skill saved = skillRepository.save(skill);
        return mapToResponse(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<SkillResponse> getUserSkills(Long userId) {
        return skillRepository.findByUserId(userId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public SkillResponse updateSkill(Long userId, Long skillId, SkillRequest request) {
        Skill skill = skillRepository.findById(skillId)
                .orElseThrow(() -> new RuntimeException("Skill not found"));

        if (!skill.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }

        if (request.getSkillName() != null) skill.setSkillName(request.getSkillName());
        if (request.getCategory() != null) skill.setCategory(request.getCategory());
        if (request.getProficiencyLevel() != null) skill.setProficiencyLevel(request.getProficiencyLevel());
        if (request.getSource() != null) skill.setSource(request.getSource());

        Skill updated = skillRepository.save(skill);
        return mapToResponse(updated);
    }

    @Override
    @Transactional
    public void deleteSkill(Long userId, Long skillId) {
        Skill skill = skillRepository.findById(skillId)
                .orElseThrow(() -> new RuntimeException("Skill not found"));

        if (!skill.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }

        skillRepository.delete(skill);
    }

    private SkillResponse mapToResponse(Skill s) {
        SkillResponse r = new SkillResponse();
        r.setId(s.getId());
        r.setSkillName(s.getSkillName());
        r.setCategory(s.getCategory());
        r.setProficiencyLevel(s.getProficiencyLevel());
        r.setSource(s.getSource());
        r.setIsVerified(s.getIsVerified());
        return r;
    }
}