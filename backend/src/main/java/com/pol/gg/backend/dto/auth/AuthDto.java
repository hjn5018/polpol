package com.pol.gg.backend.dto.auth;

import lombok.Data;

public class AuthDto {
    @Data
    public static class EmailRequest {
        private String email;
    }

    @Data
    public static class EmailVerifyRequest {
        private String email;
        private String code;
    }

    @Data
    public static class SignupRequest {
        private String studentId;
        private String email;
        private String password;
        private String name;
        private String department;
        private String profileImageUrl;
    }

    @Data
    public static class LoginRequest {
        private String studentId;
        private String password;
    }

    @Data
    public static class TokenResponse {
        private String accessToken;
    }
}
