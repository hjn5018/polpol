package com.pol.gg.backend.service;

import com.pol.gg.backend.domain.portfolio.Resume;
import com.pol.gg.backend.domain.portfolio.ResumeRepository;
import com.pol.gg.backend.domain.user.User;
import com.pol.gg.backend.domain.user.UserRepository;
import com.pol.gg.backend.dto.portfolio.PortfolioRequest;
import com.pol.gg.backend.dto.portfolio.PortfolioResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PortfolioService {

    private final ResumeRepository resumeRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public PortfolioResponse getPortfolio(String studentId) {
        // Find default resume first
        return resumeRepository.findByUserStudentIdAndIsDefaultTrue(studentId)
                .map(resume -> {
                    PortfolioResponse response = new PortfolioResponse();
                    response.setAbout(resume.getAbout());
                    response.setSkills(resume.getSkills());
                    response.setCareer(resume.getCareer());
                    return response;
                })
                .orElseGet(() -> {
                    // If no default resume, try to find any resume
                    List<Resume> resumes = resumeRepository.findByUserStudentId(studentId);
                    if (!resumes.isEmpty()) {
                        Resume resume = resumes.get(0);
                        PortfolioResponse response = new PortfolioResponse();
                        response.setAbout(resume.getAbout());
                        response.setSkills(resume.getSkills());
                        response.setCareer(resume.getCareer());
                        return response;
                    }
                    return new PortfolioResponse(); // Return empty if no resume at all
                });
    }

    @Transactional
    public PortfolioResponse updatePortfolio(String studentId, PortfolioRequest request) {
        // In the new system, direct portfolio update might be restricted or redirected to resume update.
        // For compatibility with current UI, update the default resume if exists.
        Resume resume = resumeRepository.findByUserStudentIdAndIsDefaultTrue(studentId)
                .orElseGet(() -> {
                    List<Resume> resumes = resumeRepository.findByUserStudentId(studentId);
                    if (!resumes.isEmpty()) return resumes.get(0);
                    
                    User user = userRepository.findByStudentId(studentId)
                            .orElseThrow(() -> new IllegalArgumentException("User not found"));
                    return resumeRepository.save(Resume.builder()
                            .user(user)
                            .title("Default Resume")
                            .isDefault(true)
                            .build());
                });

        resume.update(resume.getTitle(), request.getAbout(), request.getSkills(), request.getCareer(), resume.isDefault());
        resumeRepository.save(resume);
        
        PortfolioResponse response = new PortfolioResponse();
        response.setAbout(resume.getAbout());
        response.setSkills(resume.getSkills());
        response.setCareer(resume.getCareer());
        return response;
    }
}
