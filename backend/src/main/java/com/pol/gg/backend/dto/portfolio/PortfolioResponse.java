package com.pol.gg.backend.dto.portfolio;

import com.pol.gg.backend.domain.portfolio.Portfolio;
import lombok.Data;

@Data
public class PortfolioResponse {
    private Long id;
    private String studentId;
    private String name;
    private String about;
    private String skills;
    private String career;

    public static PortfolioResponse from(Portfolio portfolio) {
        PortfolioResponse response = new PortfolioResponse();
        response.setId(portfolio.getId());
        response.setStudentId(portfolio.getUser().getStudentId());
        response.setName(portfolio.getUser().getName());
        response.setAbout(portfolio.getAbout());
        response.setSkills(portfolio.getSkills());
        response.setCareer(portfolio.getCareer());
        return response;
    }
}
