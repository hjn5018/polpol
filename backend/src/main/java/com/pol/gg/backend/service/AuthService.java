package com.pol.gg.backend.service;

import com.pol.gg.backend.domain.user.Role;
import com.pol.gg.backend.domain.user.User;
import com.pol.gg.backend.domain.user.UserRepository;
import com.pol.gg.backend.dto.auth.AuthDto;
import com.pol.gg.backend.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @Transactional
    public void signup(AuthDto.SignupRequest request) {
        if (userRepository.existsByStudentId(request.getStudentId())) {
            throw new IllegalArgumentException("Student ID already exists.");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already exists.");
        }

        // Password complexity validation
        String password = request.getPassword();
        String passwordRegex = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$";
        if (!password.matches(passwordRegex)) {
            throw new IllegalArgumentException("Password must be at least 8 characters and include letters, numbers, and special characters.");
        }

        User user = User.builder()
                .studentId(request.getStudentId())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .name(request.getName())
                .department(request.getDepartment())
                .profileImageUrl(request.getProfileImageUrl())
                .role(Role.STUDENT)
                .build();

        userRepository.save(user);
    }

    @Transactional(readOnly = true)
    public AuthDto.TokenResponse login(AuthDto.LoginRequest request) {
        User user = userRepository.findByStudentId(request.getStudentId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid student ID or password."));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid student ID or password.");
        }

        Authentication auth = new UsernamePasswordAuthenticationToken(
                user.getStudentId(),
                null,
                List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()))
        );

        String token = jwtTokenProvider.generateToken(auth);

        AuthDto.TokenResponse response = new AuthDto.TokenResponse();
        response.setAccessToken(token);
        return response;
    }
}
