package com.pol.gg.backend.service;

import com.pol.gg.backend.domain.faq.FAQ;
import com.pol.gg.backend.repository.FAQRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FAQService {

    private final FAQRepository faqRepository;

    public List<FAQ> getAllFaqs() {
        return faqRepository.findAllByOrderByIdAsc();
    }

    @Transactional
    public FAQ createFAQ(FAQ faq) {
        return faqRepository.save(faq);
    }
}
