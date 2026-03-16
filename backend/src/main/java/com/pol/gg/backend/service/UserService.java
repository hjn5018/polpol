package com.pol.gg.backend.service;

import com.pol.gg.backend.domain.user.User;
import com.pol.gg.backend.domain.user.UserRepository;
import com.pol.gg.backend.dto.user.UserUpdateDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public User updateNameAndProfile(String studentId, UserUpdateDto.NameRequest request) {
        User user = userRepository.findByStudentId(studentId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        
        user.updateName(request.getName());
        user.updateProfileImageUrl(request.getProfileImageUrl());
        return user;
    }

    @Transactional
    public void updatePassword(String studentId, UserUpdateDto.PasswordRequest request) {
        User user = userRepository.findByStudentId(studentId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid current password");
        }

        // Apply same validation as signup
        String passwordRegex = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$";
        if (!request.getNewPassword().matches(passwordRegex)) {
            throw new IllegalArgumentException("Password must be at least 8 characters and include letters, numbers, and special characters.");
        }

        user.updatePassword(passwordEncoder.encode(request.getNewPassword()));
    }
}
