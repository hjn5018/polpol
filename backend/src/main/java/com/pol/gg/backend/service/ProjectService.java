package com.pol.gg.backend.service;

import com.pol.gg.backend.domain.portfolio.Resume;
import com.pol.gg.backend.domain.portfolio.ResumeRepository;
import com.pol.gg.backend.domain.portfolio.Project;
import com.pol.gg.backend.domain.portfolio.ProjectRepository;
import com.pol.gg.backend.dto.portfolio.ProjectRequest;
import com.pol.gg.backend.dto.portfolio.ProjectResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final ResumeRepository resumeRepository;

    @Transactional(readOnly = true)
    public List<ProjectResponse> getProjects(String studentId) {
        return projectRepository.findByResumeUserStudentId(studentId).stream()
                .map(ProjectResponse::from)
                .collect(Collectors.toList());
    }

    @Transactional
    public ProjectResponse createProject(Long resumeId, String studentId, ProjectRequest request) {
        Resume resume = resumeRepository.findById(resumeId)
                .orElseThrow(() -> new IllegalArgumentException("Resume not found"));

        if (!resume.getUser().getStudentId().equals(studentId)) {
            throw new IllegalArgumentException("You don't have permission to add project to this resume");
        }

        Project project = new Project(
                resume,
                request.getTitle(),
                request.getDescription(),
                request.getImageUrl(),
                request.getGithubUrl(),
                request.getDemoUrl()
        );

        return ProjectResponse.from(projectRepository.save(project));
    }

    @Transactional
    public ProjectResponse updateProject(Long projectId, String studentId, ProjectRequest request) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("Project not found"));

        if (!project.getResume().getUser().getStudentId().equals(studentId)) {
            throw new IllegalArgumentException("You don't have permission to update this project");
        }

        project.update(
                request.getTitle(),
                request.getDescription(),
                request.getImageUrl(),
                request.getGithubUrl(),
                request.getDemoUrl()
        );

        return ProjectResponse.from(projectRepository.save(project));
    }

    @Transactional
    public void deleteProject(Long projectId, String studentId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("Project not found"));

        if (!project.getResume().getUser().getStudentId().equals(studentId)) {
            throw new IllegalArgumentException("You don't have permission to delete this project");
        }

        projectRepository.delete(project);
    }
}
