package com.pol.gg.backend.controller;

import com.pol.gg.backend.dto.portfolio.ResumeRequest;
import com.pol.gg.backend.dto.portfolio.ResumeResponse;
import com.pol.gg.backend.service.ResumeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resumes")
@RequiredArgsConstructor
public class ResumeController {

    private final ResumeService resumeService;

    @GetMapping("/me")
    public ResponseEntity<List<ResumeResponse>> getMyResumes(Authentication authentication) {
        return ResponseEntity.ok(resumeService.getMyResumes(authentication.getName()));
    }

    @GetMapping("/me/default")
    public ResponseEntity<ResumeResponse> getDefaultResume(Authentication authentication) {
        ResumeResponse response = resumeService.getDefaultResume(authentication.getName());
        return response != null ? ResponseEntity.ok(response) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<ResumeResponse> createResume(
            @RequestBody ResumeRequest request,
            Authentication authentication) {
        return ResponseEntity.ok(resumeService.createResume(authentication.getName(), request));
    }

    @PutMapping("/{resumeId}")
    public ResponseEntity<ResumeResponse> updateResume(
            @PathVariable Long resumeId,
            @RequestBody ResumeRequest request,
            Authentication authentication) {
        return ResponseEntity.ok(resumeService.updateResume(resumeId, authentication.getName(), request));
    }

    @DeleteMapping("/{resumeId}")
    public ResponseEntity<Void> deleteResume(
            @PathVariable Long resumeId,
            Authentication authentication) {
        resumeService.deleteResume(resumeId, authentication.getName());
        return ResponseEntity.noContent().build();
    }
}
