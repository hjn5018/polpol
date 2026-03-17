package com.pol.gg.backend.domain.trade;

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
@Table(name = "trades")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Trade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String price;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id", nullable = false)
    private User author;

    private String imageUrl;

    @ElementCollection
    @CollectionTable(name = "trade_tags", joinColumns = @JoinColumn(name = "trade_id"))
    @Column(name = "tag")
    private List<String> tags = new ArrayList<>();

    @CreationTimestamp
    private LocalDateTime createdAt;

    @Builder
    public Trade(String title, String price, User author, String imageUrl, List<String> tags) {
        this.title = title;
        this.price = price;
        this.author = author;
        this.imageUrl = imageUrl;
        this.tags = tags != null ? tags : new ArrayList<>();
    }
}
