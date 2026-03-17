package com.pol.gg.backend.repository;

import com.pol.gg.backend.domain.faq.FAQ;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FAQRepository extends JpaRepository<FAQ, Long> {
    List<FAQ> findAllByOrderBySortOrderAsc();
    List<FAQ> findByCategory(String category);
}
