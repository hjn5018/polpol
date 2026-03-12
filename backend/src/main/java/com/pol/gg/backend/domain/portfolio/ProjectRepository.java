package com.pol.gg.backend.domain.portfolio;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByResumeUserStudentId(String studentId);
    List<Project> findByResumeId(Long resumeId);
}
