package com.pol.gg.backend.dto.inquiry;

import com.pol.gg.backend.domain.inquiry.InquiryStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

public class InquiryDto {

    @Getter
    @Setter
    public static class CreateRequest {
        private String title;
        private String content;
    }

    @Getter
    @Setter
    public static class Response {
        private Long id;
        private String title;
        private String content;
        private InquiryStatus status;
        private LocalDateTime createdAt;
        private String userName;
        private String studentId;
    }
}
