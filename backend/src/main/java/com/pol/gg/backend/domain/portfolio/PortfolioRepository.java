package com.pol.gg.backend.domain.portfolio;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface PortfolioRepository extends JpaRepository<Portfolio, Long> {
    Optional<Portfolio> findByUserStudentId(String studentId);
}
