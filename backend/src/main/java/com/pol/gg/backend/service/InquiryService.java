package com.pol.gg.backend.service;

import com.pol.gg.backend.domain.inquiry.Inquiry;
import com.pol.gg.backend.domain.inquiry.InquiryStatus;
import com.pol.gg.backend.domain.user.User;
import com.pol.gg.backend.domain.user.UserRepository;
import com.pol.gg.backend.dto.inquiry.InquiryDto;
import com.pol.gg.backend.repository.InquiryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InquiryService {

    private final InquiryRepository inquiryRepository;
    private final UserRepository userRepository;

    @Transactional
    public InquiryDto.Response createInquiry(String studentId, InquiryDto.CreateRequest request) {
        User user = userRepository.findByStudentId(studentId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Inquiry inquiry = Inquiry.builder()
                .user(user)
                .title(request.getTitle())
                .content(request.getContent())
                .status(InquiryStatus.OPEN)
                .build();

        Inquiry savedInquiry = inquiryRepository.save(inquiry);
        return convertToResponse(savedInquiry);
    }

    @Transactional(readOnly = true)
    public List<InquiryDto.Response> getMyInquiries(String studentId) {
        User user = userRepository.findByStudentId(studentId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        
        return inquiryRepository.findAllByUserOrderByCreatedAtDesc(user).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<InquiryDto.Response> getAllInquiries() {
        return inquiryRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public void updateStatus(Long id, InquiryStatus status) {
        Inquiry inquiry = inquiryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Inquiry not found"));
        inquiry.updateStatus(status);
    }

    private InquiryDto.Response convertToResponse(Inquiry inquiry) {
        InquiryDto.Response response = new InquiryDto.Response();
        response.setId(inquiry.getId());
        response.setTitle(inquiry.getTitle());
        response.setContent(inquiry.getContent());
        response.setStatus(inquiry.getStatus());
        response.setCreatedAt(inquiry.getCreatedAt());
        response.setUserName(inquiry.getUser().getName());
        response.setStudentId(inquiry.getUser().getStudentId());
        return response;
    }
}
