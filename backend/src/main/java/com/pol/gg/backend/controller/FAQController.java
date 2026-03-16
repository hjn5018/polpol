package com.pol.gg.backend.controller;

import com.pol.gg.backend.domain.faq.FAQ;
import com.pol.gg.backend.service.FAQService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/faqs")
@RequiredArgsConstructor
public class FAQController {

    private final FAQService faqService;

    @GetMapping
    public ResponseEntity<List<FAQ>> getAllFaqs() {
        return ResponseEntity.ok(faqService.getAllFaqs());
    }
}
