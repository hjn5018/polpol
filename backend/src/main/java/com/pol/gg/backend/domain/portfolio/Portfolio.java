package com.pol.gg.backend.domain.portfolio;

import com.pol.gg.backend.domain.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Portfolio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_student_id")
    private User user;

    @Column(columnDefinition = "TEXT")
    private String about;

    @Column(columnDefinition = "TEXT")
    private String skills; // JSON or comma-separated

    @Column(columnDefinition = "TEXT")
    private String career; // JSON or text

    public Portfolio(User user) {
        this.user = user;
    }

    public void update(String about, String skills, String career) {
        this.about = about;
        this.skills = skills;
        this.career = career;
    }
}
