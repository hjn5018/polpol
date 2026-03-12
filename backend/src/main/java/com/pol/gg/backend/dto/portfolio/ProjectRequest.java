package com.pol.gg.backend.dto.portfolio;

import lombok.Data;

@Data
public class ProjectRequest {
    private String title;
    private String description;
    private String imageUrl;
    private String githubUrl;
    private String demoUrl;
}
