package com.pol.gg.backend.dto.portfolio;

import lombok.Data;
import java.util.List;

@Data
public class ResumeRequest {
    private String title;
    private String about;
    private String skills;
    private String career;
    private List<ProjectRequest> projects;
    private boolean isDefault;
}
