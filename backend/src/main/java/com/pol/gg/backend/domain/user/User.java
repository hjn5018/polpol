package com.pol.gg.backend.domain.user;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "users")
public class User {
    
    public void updateName(String name) {
        this.name = name;
    }
    
    public void updateProfileImageUrl(String profileImageUrl) {
        this.profileImageUrl = profileImageUrl;
    }
    
    public void updatePassword(String password) {
        this.password = password;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 10)
    private String studentId;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, length = 50)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Column(nullable = false, length = 100)
    private String department;

    @Column(nullable = false)
    private Double mannerTemperature;
    
    @Column
    private String profileImageUrl;

    @Builder
    public User(String studentId, String email, String password, String name, String department, Role role, Double mannerTemperature, String profileImageUrl) {
        this.studentId = studentId;
        this.email = email;
        this.password = password;
        this.name = name;
        this.department = department;
        this.role = role != null ? role : Role.STUDENT;
        this.mannerTemperature = mannerTemperature != null ? mannerTemperature : 36.5;
        this.profileImageUrl = profileImageUrl;
    }
}
