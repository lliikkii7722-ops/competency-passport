package com.passport.controller;

import com.passport.dto.request.ProjectRequest;
import com.passport.dto.response.ProjectResponse;
import com.passport.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/projects")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @PostMapping
    public ResponseEntity<ProjectResponse> addProject(
            @RequestAttribute("userId") Long userId,
            @RequestBody ProjectRequest request) {
        return ResponseEntity.ok(projectService.addProject(userId, request));
    }

    @GetMapping
    public ResponseEntity<List<ProjectResponse>> getMyProjects(
            @RequestAttribute("userId") Long userId) {
        return ResponseEntity.ok(projectService.getUserProjects(userId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProjectResponse> updateProject(
            @RequestAttribute("userId") Long userId,
            @PathVariable Long id,
            @RequestBody ProjectRequest request) {
        return ResponseEntity.ok(projectService.updateProject(userId, id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(
            @RequestAttribute("userId") Long userId,
            @PathVariable Long id) {
        projectService.deleteProject(userId, id);
        return ResponseEntity.ok().build();
    }
}