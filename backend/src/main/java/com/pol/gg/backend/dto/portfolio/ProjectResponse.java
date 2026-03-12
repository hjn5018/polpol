package com.pol.gg.backend.dto.portfolio;

import com.pol.gg.backend.domain.portfolio.Project;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ProjectResponse {
    private Long id;
    private String title;
    private String description;
    private String imageUrl;
    private String githubUrl;
    private String demoUrl;
    private LocalDateTime createdAt;

    public static ProjectResponse from(Project project) {
        ProjectResponse response = new ProjectResponse();
        response.setId(project.getId());
        response.setTitle(project.getTitle());
        response.setDescription(project.getDescription());
        response.setImageUrl(project.getImageUrl());
        response.setGithubUrl(project.getGithubUrl());
        response.setDemoUrl(project.getDemoUrl());
        response.setCreatedAt(project.getCreatedAt());
        return response;
    }
}
