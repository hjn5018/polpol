package com.pol.gg.backend.dto.user;

import lombok.Data;

public class UserUpdateDto {
    @Data
    public static class NameRequest {
        private String name;
        private String profileImageUrl;
    }

    @Data
    public static class PasswordRequest {
        private String currentPassword;
        private String newPassword;
    }
}
