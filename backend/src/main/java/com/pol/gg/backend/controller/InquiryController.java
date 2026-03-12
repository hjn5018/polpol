package com.pol.gg.backend.controller;

import com.pol.gg.backend.domain.inquiry.InquiryStatus;
import com.pol.gg.backend.dto.inquiry.InquiryDto;
import com.pol.gg.backend.service.InquiryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inquiries")
@RequiredArgsConstructor
public class InquiryController {

    private final InquiryService inquiryService;

    @PostMapping
    public ResponseEntity<InquiryDto.Response> createInquiry(
            Authentication authentication,
            @RequestBody InquiryDto.CreateRequest request) {
        return ResponseEntity.ok(inquiryService.createInquiry(authentication.getName(), request));
    }

    @GetMapping("/me")
    public ResponseEntity<List<InquiryDto.Response>> getMyInquiries(Authentication authentication) {
        return ResponseEntity.ok(inquiryService.getMyInquiries(authentication.getName()));
    }

    @GetMapping("/admin")
    public ResponseEntity<List<InquiryDto.Response>> getAllInquiries() {
        return ResponseEntity.ok(inquiryService.getAllInquiries());
    }

    @PatchMapping("/admin/{id}/status")
    public ResponseEntity<Void> updateStatus(
            @PathVariable Long id,
            @RequestParam InquiryStatus status) {
        inquiryService.updateStatus(id, status);
        return ResponseEntity.ok().build();
    }
}
