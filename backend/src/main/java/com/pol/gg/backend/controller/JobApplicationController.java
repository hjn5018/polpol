package com.pol.gg.backend.controller;

import com.pol.gg.backend.dto.job.JobApplicationRequest;
import com.pol.gg.backend.dto.job.JobApplicationResponse;
import com.pol.gg.backend.service.JobApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/job-applications")
@RequiredArgsConstructor
public class JobApplicationController {

    private final JobApplicationService jobApplicationService;

    @PostMapping
    public ResponseEntity<JobApplicationResponse> create(@RequestBody JobApplicationRequest request, Authentication authentication) {
        return ResponseEntity.ok(jobApplicationService.create(request, authentication.getName()));
    }

    @GetMapping
    public ResponseEntity<List<JobApplicationResponse>> getAll() {
        return ResponseEntity.ok(jobApplicationService.getAll());
    }

    @GetMapping("/me")
    public ResponseEntity<List<JobApplicationResponse>> getMyApplications(Authentication authentication) {
        return ResponseEntity.ok(jobApplicationService.getMyApplications(authentication.getName()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id, Authentication authentication) {
        jobApplicationService.delete(id, authentication.getName());
        return ResponseEntity.noContent().build();
    }
}
