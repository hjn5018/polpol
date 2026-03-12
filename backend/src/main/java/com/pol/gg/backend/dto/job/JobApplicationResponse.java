package com.pol.gg.backend.dto.job;

import com.pol.gg.backend.domain.job.JobStatus;
import com.pol.gg.backend.domain.job.JobApplication;
import lombok.Getter;
import java.time.LocalDateTime;

@Getter
public class JobApplicationResponse {
    private Long id;
    private String companyName;
    private String position;
    private JobStatus status;
    private String location;
    private String salary;
    private LocalDateTime appliedAt;
    private String userName;

    public JobApplicationResponse(JobApplication application) {
        this.id = application.getId();
        this.companyName = application.getCompanyName();
        this.position = application.getPosition();
        this.status = application.getStatus();
        this.location = application.getLocation();
        this.salary = application.getSalary();
        this.appliedAt = application.getAppliedAt();
        this.userName = application.getUser().getName();
    }
}
