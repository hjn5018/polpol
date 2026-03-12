package com.pol.gg.backend.domain.user;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class EmailVerification {

    @Id
    private String email;

    private String code;

    private LocalDateTime expiryDate;

    public void updateCode(String code, LocalDateTime expiryDate) {
        this.code = code;
        this.expiryDate = expiryDate;
    }
}
