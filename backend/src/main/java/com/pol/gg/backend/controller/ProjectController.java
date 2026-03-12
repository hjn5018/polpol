package com.pol.gg.backend.controller;

import com.pol.gg.backend.dto.portfolio.ProjectRequest;
import com.pol.gg.backend.dto.portfolio.ProjectResponse;
import com.pol.gg.backend.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    @GetMapping("/user/{studentId}")
    public ResponseEntity<List<ProjectResponse>> getProjects(@PathVariable String studentId) {
        return ResponseEntity.ok(projectService.getProjects(studentId));
    }

    @GetMapping("/me")
    public ResponseEntity<List<ProjectResponse>> getMyProjects(Authentication authentication) {
        return ResponseEntity.ok(projectService.getProjects(authentication.getName()));
    }

    @PostMapping
    public ResponseEntity<ProjectResponse> createProject(
            @RequestParam Long resumeId,
            @RequestBody ProjectRequest request,
            Authentication authentication) {
        return ResponseEntity.ok(projectService.createProject(resumeId, authentication.getName(), request));
    }

    @PutMapping("/{projectId}")
    public ResponseEntity<ProjectResponse> updateProject(
            @PathVariable Long projectId,
            @RequestBody ProjectRequest request,
            Authentication authentication) {
        return ResponseEntity.ok(projectService.updateProject(projectId, authentication.getName(), request));
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<Void> deleteProject(
            @PathVariable Long projectId,
            Authentication authentication) {
        projectService.deleteProject(projectId, authentication.getName());
        return ResponseEntity.noContent().build();
    }
}
