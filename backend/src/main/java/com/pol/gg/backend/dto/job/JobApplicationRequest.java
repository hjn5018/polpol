package com.pol.gg.backend.dto.job;

import com.pol.gg.backend.domain.job.JobStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JobApplicationRequest {
    private String companyName;
    private String position;
    private JobStatus status;
    private String location;
    private String salary;
}
