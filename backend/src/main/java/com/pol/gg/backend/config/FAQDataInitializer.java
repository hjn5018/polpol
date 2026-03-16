package com.pol.gg.backend.config;

import com.pol.gg.backend.domain.faq.FAQ;
import com.pol.gg.backend.repository.FAQRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class FAQDataInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(FAQDataInitializer.class);
    private final FAQRepository faqRepository;

    @Override
    @Transactional
    public void run(String... args) {
        log.info("Starting FAQ data initialization check...");
        long count = faqRepository.count();
        log.info("Current FAQ count: {}", count);
        if (count == 0) {
            log.info("Seeding initial FAQ data...");
            faqRepository.save(FAQ.builder()
                    .category("일반")
                    .question("POLPOL은 어떤 서비스인가요?")
                    .answer("POLPOL은 학생들의 포트폴리오 관리와 기업의 채용을 연결해주는 올인원 플랫폼입니다.")
                    .build());
            
            faqRepository.save(FAQ.builder()
                    .category("일반")
                    .question("회원가입은 어떻게 하나요?")
                    .answer("우측 상단의 로그인 버튼을 클릭하신 후, 회원가입 페이지에서 학교 이메일 인증을 통해 가입하실 수 있습니다.")
                    .build());

            faqRepository.save(FAQ.builder()
                    .category("포트폴리오 및 이력서")
                    .question("포트폴리오는 어떻게 등록하나요?")
                    .answer("마이페이지 -> 내 포트폴리오 메뉴에서 새로운 포트폴리오를 작성하고 업로드할 수 있습니다.")
                    .build());

            faqRepository.save(FAQ.builder()
                    .category("포트폴리오 및 이력서")
                    .question("PDF 형식으로도 제출 가능한가요?")
                    .answer("네, 이미지와 PDF 형식을 모두 지원하며 개별 프로젝트 단위로 파일을 첨부할 수 있습니다.")
                    .build());

            faqRepository.save(FAQ.builder()
                    .category("지원 현황")
                    .question("지원 결과는 언제 알 수 있나요?")
                    .answer("기업 담당자가 서류 검토를 완료하면 실시간 알림과 마이페이지를 통해 결과를 확인하실 수 있습니다.")
                    .build());
            
            faqRepository.save(FAQ.builder()
                    .category("지원 현황")
                    .question("지원을 취소할 수 있나요?")
                    .answer("담당자가 확인하기 전까지는 지원 현황 페이지에서 취소가 가능합니다.")
                    .build());
        }
    }
}
