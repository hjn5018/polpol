package com.pol.gg.backend.domain.portfolio;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ResumeRepository extends JpaRepository<Resume, Long> {
    List<Resume> findByUserStudentId(String studentId);
    Optional<Resume> findByUserStudentIdAndIsDefaultTrue(String studentId);
}
