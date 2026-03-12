package com.pol.gg.backend.service;

import com.pol.gg.backend.domain.job.JobApplication;
import com.pol.gg.backend.domain.job.JobApplicationRepository;
import com.pol.gg.backend.domain.job.JobStatus;
import com.pol.gg.backend.domain.user.User;
import com.pol.gg.backend.domain.user.UserRepository;
import com.pol.gg.backend.dto.job.JobApplicationRequest;
import com.pol.gg.backend.dto.job.JobApplicationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class JobApplicationService {

    private final JobApplicationRepository jobApplicationRepository;
    private final UserRepository userRepository;

    @Transactional
    public JobApplicationResponse create(JobApplicationRequest request, String studentId) {
        User user = userRepository.findByStudentId(studentId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        JobApplication application = JobApplication.builder()
                .companyName(request.getCompanyName())
                .position(request.getPosition())
                .status(request.getStatus())
                .location(request.getLocation())
                .salary(request.getSalary())
                .user(user)
                .build();

        return new JobApplicationResponse(jobApplicationRepository.save(application));
    }

    public List<JobApplicationResponse> getAll() {
        return jobApplicationRepository.findAllByOrderByAppliedAtDesc().stream()
                .map(JobApplicationResponse::new)
                .collect(Collectors.toList());
    }

    public List<JobApplicationResponse> getMyApplications(String studentId) {
        User user = userRepository.findByStudentId(studentId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        
        return jobApplicationRepository.findByUserIdOrderByAppliedAtDesc(user.getId()).stream()
                .map(JobApplicationResponse::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public void delete(Long id, String studentId) {
        JobApplication application = jobApplicationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Application not found"));
        
        if (!application.getUser().getStudentId().equals(studentId)) {
            throw new IllegalArgumentException("UnAuthorized access");
        }

        jobApplicationRepository.delete(application);
    }
}
