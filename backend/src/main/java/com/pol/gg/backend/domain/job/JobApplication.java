package com.pol.gg.backend.domain.job;

import com.pol.gg.backend.domain.user.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "job_applications")
public class JobApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String companyName;

    @Column(nullable = false)
    private String position;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private JobStatus status;

    private String location;

    private String salary;

    @Column(nullable = false)
    private LocalDateTime appliedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Builder
    public JobApplication(String companyName, String position, JobStatus status, String location, String salary, LocalDateTime appliedAt, User user) {
        this.companyName = companyName;
        this.position = position;
        this.status = status != null ? status : JobStatus.APPLIED;
        this.location = location;
        this.salary = salary;
        this.appliedAt = appliedAt != null ? appliedAt : LocalDateTime.now();
        this.user = user;
    }

    public void updateStatus(JobStatus status) {
        this.status = status;
    }
}
