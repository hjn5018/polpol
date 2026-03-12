package com.pol.gg.backend.dto.portfolio;

import com.pol.gg.backend.domain.portfolio.Resume;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class ResumeResponse {
    private Long id;
    private String title;
    private String about;
    private String skills;
    private String career;
    private List<ProjectResponse> projects;
    private boolean isDefault;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static ResumeResponse from(Resume resume) {
        ResumeResponse response = new ResumeResponse();
        response.setId(resume.getId());
        response.setTitle(resume.getTitle());
        response.setAbout(resume.getAbout());
        response.setSkills(resume.getSkills());
        response.setCareer(resume.getCareer());
        response.setProjects(resume.getProjects().stream()
                .map(ProjectResponse::from)
                .collect(Collectors.toList()));
        response.setDefault(resume.isDefault());
        response.setCreatedAt(resume.getCreatedAt());
        response.setUpdatedAt(resume.getUpdatedAt());
        return response;
    }
}
