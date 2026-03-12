package com.pol.gg.backend.controller;

import com.pol.gg.backend.dto.portfolio.PortfolioRequest;
import com.pol.gg.backend.dto.portfolio.PortfolioResponse;
import com.pol.gg.backend.service.PortfolioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/portfolios")
@RequiredArgsConstructor
public class PortfolioController {

    private final PortfolioService portfolioService;

    @GetMapping("/me")
    public ResponseEntity<PortfolioResponse> getMyPortfolio(Authentication authentication) {
        return ResponseEntity.ok(portfolioService.getPortfolio(authentication.getName()));
    }

    @PutMapping("/me")
    public ResponseEntity<PortfolioResponse> updateMyPortfolio(
            @RequestBody PortfolioRequest request,
            Authentication authentication) {
        return ResponseEntity.ok(portfolioService.updatePortfolio(authentication.getName(), request));
    }

    @GetMapping("/{studentId}")
    public ResponseEntity<PortfolioResponse> getPortfolio(@PathVariable String studentId) {
        return ResponseEntity.ok(portfolioService.getPortfolio(studentId));
    }
}
