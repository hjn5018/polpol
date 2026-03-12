package com.pol.gg.backend.domain.job;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {
    List<JobApplication> findByUserIdOrderByAppliedAtDesc(Long userId);
    List<JobApplication> findAllByOrderByAppliedAtDesc();
}
