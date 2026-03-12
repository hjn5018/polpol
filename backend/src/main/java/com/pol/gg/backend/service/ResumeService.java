package com.pol.gg.backend.service;

import com.pol.gg.backend.domain.portfolio.Resume;
import com.pol.gg.backend.domain.portfolio.ResumeRepository;
import com.pol.gg.backend.domain.portfolio.Project;
import com.pol.gg.backend.domain.portfolio.ProjectRepository;
import com.pol.gg.backend.domain.user.User;
import com.pol.gg.backend.domain.user.UserRepository;
import com.pol.gg.backend.dto.portfolio.ResumeRequest;
import com.pol.gg.backend.dto.portfolio.ResumeResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ResumeService {

    private final ResumeRepository resumeRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<ResumeResponse> getMyResumes(String studentId) {
        return resumeRepository.findByUserStudentId(studentId).stream()
                .map(ResumeResponse::from)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ResumeResponse getDefaultResume(String studentId) {
        Resume resume = resumeRepository.findByUserStudentIdAndIsDefaultTrue(studentId)
                .orElseGet(() -> {
                    List<Resume> resumes = resumeRepository.findByUserStudentId(studentId);
                    if (resumes.isEmpty()) {
                        return null;
                    }
                    return resumes.get(0);
                });
        return resume != null ? ResumeResponse.from(resume) : null;
    }

    @Transactional
    public ResumeResponse createResume(String studentId, ResumeRequest request) {
        User user = userRepository.findByStudentId(studentId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (request.isDefault()) {
            resetDefault(studentId);
        }

        Resume resume = Resume.builder()
                .user(user)
                .title(request.getTitle())
                .about(request.getAbout())
                .skills(request.getSkills())
                .career(request.getCareer())
                .isDefault(request.isDefault())
                .build();

        Resume savedResume = resumeRepository.save(resume);

        if (request.getProjects() != null) {
            request.getProjects().forEach(projectRequest -> {
                Project project = new Project(
                        savedResume,
                        projectRequest.getTitle(),
                        projectRequest.getDescription(),
                        projectRequest.getImageUrl(),
                        projectRequest.getGithubUrl(),
                        projectRequest.getDemoUrl()
                );
                projectRepository.save(project);
            });
        }

        return ResumeResponse.from(savedResume);
    }

    @Transactional
    public ResumeResponse updateResume(Long resumeId, String studentId, ResumeRequest request) {
        Resume resume = resumeRepository.findById(resumeId)
                .orElseThrow(() -> new IllegalArgumentException("Resume not found"));

        if (!resume.getUser().getStudentId().equals(studentId)) {
            throw new IllegalArgumentException("Permission denied");
        }

        if (request.isDefault() && !resume.isDefault()) {
            resetDefault(studentId);
        }

        resume.update(request.getTitle(), request.getAbout(), request.getSkills(), request.getCareer(), request.isDefault());

        // Update projects: Simple way is to delete existing and recreate as per request
        // Or more complex diffing. For now, let's keep it simple if the user provides full list.
        if (request.getProjects() != null) {
            projectRepository.deleteAll(resume.getProjects());
            resume.getProjects().clear();
            
            request.getProjects().forEach(projectRequest -> {
                Project project = new Project(
                        resume,
                        projectRequest.getTitle(),
                        projectRequest.getDescription(),
                        projectRequest.getImageUrl(),
                        projectRequest.getGithubUrl(),
                        projectRequest.getDemoUrl()
                );
                projectRepository.save(project);
            });
        }

        return ResumeResponse.from(resumeRepository.save(resume));
    }

    @Transactional
    public void deleteResume(Long resumeId, String studentId) {
        Resume resume = resumeRepository.findById(resumeId)
                .orElseThrow(() -> new IllegalArgumentException("Resume not found"));

        if (!resume.getUser().getStudentId().equals(studentId)) {
            throw new IllegalArgumentException("Permission denied");
        }

        resumeRepository.delete(resume);
    }

    private void resetDefault(String studentId) {
        resumeRepository.findByUserStudentIdAndIsDefaultTrue(studentId)
                .ifPresent(r -> r.setDefault(false));
    }
}
