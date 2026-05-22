package com.passport.service.impl;

import com.passport.dto.request.ProjectRequest;
import com.passport.dto.response.ProjectResponse;
import com.passport.model.Project;
import com.passport.model.User;
import com.passport.repository.ProjectRepository;
import com.passport.repository.UserRepository;
import com.passport.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectServiceImpl implements ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional
    public ProjectResponse addProject(Long userId, ProjectRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Project project = new Project();
        project.setUser(user);
        project.setTitle(request.getTitle());
        project.setDescription(request.getDescription());
        project.setTechnologies(request.getTechnologies());
        project.setGithubUrl(request.getGithubUrl());
        project.setDemoVideoUrl(request.getDemoVideoUrl());
        project.setLiveUrl(request.getLiveUrl());
        project.setIsFeatured(request.getIsFeatured() != null ? request.getIsFeatured() : false);

        Project saved = projectRepository.save(project);
        return mapToResponse(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProjectResponse> getUserProjects(Long userId) {
        return projectRepository.findByUserId(userId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ProjectResponse updateProject(Long userId, Long projectId, ProjectRequest request) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        if (!project.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }

        if (request.getTitle() != null) project.setTitle(request.getTitle());
        if (request.getDescription() != null) project.setDescription(request.getDescription());
        if (request.getTechnologies() != null) project.setTechnologies(request.getTechnologies());
        if (request.getGithubUrl() != null) project.setGithubUrl(request.getGithubUrl());
        if (request.getDemoVideoUrl() != null) project.setDemoVideoUrl(request.getDemoVideoUrl());
        if (request.getLiveUrl() != null) project.setLiveUrl(request.getLiveUrl());
        if (request.getIsFeatured() != null) project.setIsFeatured(request.getIsFeatured());

        Project updated = projectRepository.save(project);
        return mapToResponse(updated);
    }

    @Override
    @Transactional
    public void deleteProject(Long userId, Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        if (!project.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }

        projectRepository.delete(project);
    }

    private ProjectResponse mapToResponse(Project p) {
        ProjectResponse r = new ProjectResponse();
        r.setId(p.getId());
        r.setTitle(p.getTitle());
        r.setDescription(p.getDescription());
        r.setTechnologies(p.getTechnologies());
        r.setGithubUrl(p.getGithubUrl());
        r.setDemoVideoUrl(p.getDemoVideoUrl());
        r.setLiveUrl(p.getLiveUrl());
        r.setStarsCount(p.getStarsCount());
        r.setForksCount(p.getForksCount());
        r.setLanguageBreakdown(p.getLanguageBreakdown());
        r.setReadmeSummary(p.getReadmeSummary());
        r.setIsFeatured(p.getIsFeatured());
        return r;
    }
}