package com.pol.gg.backend.controller;

import com.pol.gg.backend.domain.job.JobPosting;
import com.pol.gg.backend.domain.job.JobPostingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/job-postings")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class JobPostingController {

    private final JobPostingRepository jobPostingRepository;

    @GetMapping
    public List<JobPosting> getAllPostings() {
        return jobPostingRepository.findAll();
    }

    @GetMapping("/type/{type}")
    public List<JobPosting> getPostingsByType(@PathVariable String type) {
        return jobPostingRepository.findByType(type);
    }
}
