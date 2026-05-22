package com.passport.service;

import com.passport.dto.request.ProjectRequest;
import com.passport.dto.response.ProjectResponse;

import java.util.List;

public interface ProjectService {
    ProjectResponse addProject(Long userId, ProjectRequest request);
    List<ProjectResponse> getUserProjects(Long userId);
    ProjectResponse updateProject(Long userId, Long projectId, ProjectRequest request);
    void deleteProject(Long userId, Long projectId);
}