package com.pol.gg.backend.domain.job;

import com.pol.gg.backend.domain.user.User;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "job_postings")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class JobPosting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String type; // 'CORPORATE' or 'PROJECT'

    @Column(nullable = false)
    private String title;

    private String company; // Only for Corporate

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id")
    private User author;

    private String imageUrl;

    @ElementCollection
    @CollectionTable(name = "job_posting_tags", joinColumns = @JoinColumn(name = "job_posting_id"))
    @Column(name = "tag")
    private List<String> tags = new ArrayList<>();

    private int commentsCount;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @Builder
    public JobPosting(String type, String title, String company, User author, String imageUrl, List<String> tags) {
        this.type = type;
        this.title = title;
        this.company = company;
        this.author = author;
        this.imageUrl = imageUrl;
        this.tags = tags != null ? tags : new ArrayList<>();
        this.commentsCount = 0;
    }
}
