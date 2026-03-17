package com.pol.gg.backend.global.initializer;

import com.pol.gg.backend.domain.faq.FAQ;
import com.pol.gg.backend.repository.FAQRepository;
import com.pol.gg.backend.domain.job.JobApplication;
import com.pol.gg.backend.domain.job.JobApplicationRepository;
import com.pol.gg.backend.domain.job.JobPosting;
import com.pol.gg.backend.domain.job.JobPostingRepository;
import com.pol.gg.backend.domain.job.JobStatus;
import com.pol.gg.backend.domain.post.Post;
import com.pol.gg.backend.domain.post.PostRepository;
import com.pol.gg.backend.domain.user.User;
import com.pol.gg.backend.domain.user.Role;
import com.pol.gg.backend.domain.user.UserRepository;
import com.pol.gg.backend.domain.trade.Trade;
import com.pol.gg.backend.domain.trade.TradeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Arrays;

@Component
@Profile("dev")
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final JobPostingRepository jobPostingRepository;
    private final JobApplicationRepository jobApplicationRepository;
    private final FAQRepository faqRepository;
    private final TradeRepository tradeRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        System.out.println("Initializing Comprehensive Dummy Data for DEV environment...");

        // 1. Users
        User chulsoo = createUser("chulsoo", "김철수", "20240001", "AI융합소프트웨어과");
        User younghee = createUser("younghee", "이영희", "20240002", "AI융합소프트웨어과");
        User jimin = createUser("jimin", "박지민", "20240003", "컴퓨터공학과");
        User haewon = createUser("haewon", "오해원", "20240004", "AI융합소프트웨어과");
        User admin = createUser("admin", "중앙학생회", "ADMIN001", "학생회");
        
        userRepository.saveAll(Arrays.asList(chulsoo, younghee, jimin, haewon, admin));

        // 2. Community Posts
        postRepository.save(Post.builder()
                .category("질문")
                .title("이거 리액트 쿼리 캐시 처리가 이상해요 도와주세요.jpg")
                .content("코드 보시는 대로 캐시가 예기치 않게 만료됩니다...")
                .author(haewon)
                .department("AI융합소프트웨어과")
                .tags(Arrays.asList("시험공부", "AI", "꿀팁"))
                .imageUrl("https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60")
                .build());

        postRepository.save(Post.builder()
                .category("잡담")
                .title("오늘 점심 메뉴 돈까스 진짜 맛있네요 ㅋㅋㅋ")
                .content("역시 폴리텍 식당 돈까스는 최고네요!")
                .author(chulsoo)
                .department("AI융합소프트웨어과")
                .tags(Arrays.asList("학식", "질문"))
                .imageUrl("https://images.unsplash.com/photo-1593504049359-74330189a345?w=800&auto=format&fit=crop&q=60")
                .build());

        postRepository.save(Post.builder()
                .category("공지")
                .title("전공 심화 과정 신청 안내 및 규정")
                .content("심화 과정 신청 기간은 다음주 월요일부터입니다.")
                .author(admin)
                .department("AI융합소프트웨어과")
                .build());

        // 3. Council Notices
        postRepository.save(Post.builder()
                .category("공지")
                .title("봄 축제 관련 공지")
                .content("올해도 어김없이 찾아온 봄 축제!")
                .author(admin)
                .department("학생회")
                .tags(Arrays.asList("축제", "중요"))
                .imageUrl("https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&auto=format&fit=crop&q=60")
                .build());

        // 4. Trades (Flea Market)
        tradeRepository.save(Trade.builder()
                .title("맥북 에어 M1")
                .price("800,000원")
                .author(jimin)
                .tags(Arrays.asList("전자기기", "애플", "급처"))
                .imageUrl("https://images.unsplash.com/photo-1611186871348-b1ec696e5237?w=800&auto=format&fit=crop&q=60")
                .build());

        tradeRepository.save(Trade.builder()
                .title("미적분학 교과서")
                .price("20,000원")
                .author(younghee)
                .tags(Arrays.asList("전공서적", "수학"))
                .build());

        // 5. Corporate Recruitment (Job Postings)
        jobPostingRepository.save(JobPosting.builder()
                .type("CORPORATE")
                .title("신입 프론트엔드 개발자 구인")
                .company("에이비씨 테크")
                .author(chulsoo)
                .tags(Arrays.asList("React", "TypeScript", "초보가능"))
                .build());

        jobPostingRepository.save(JobPosting.builder()
                .type("CORPORATE")
                .title("백엔드 개발자 (Spring Boot)")
                .company("클라우드 시스템")
                .author(younghee)
                .tags(Arrays.asList("Java", "Spring", "경력무관"))
                .build());

        // 6. Project Recruitment
        jobPostingRepository.save(JobPosting.builder()
                .type("PROJECT")
                .title("AI 기반 캠퍼스 가이드 서비스 팀원 모집")
                .author(jimin)
                .tags(Arrays.asList("AI", "Next.js", "PyTorch"))
                .build());

        jobPostingRepository.save(JobPosting.builder()
                .type("PROJECT")
                .title("메카트로닉스 경진대회 하드웨어 개발자 1명")
                .author(chulsoo)
                .imageUrl("https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=60")
                .tags(Arrays.asList("H/W", "Robot"))
                .build());

        // 7. Job Applications
        jobApplicationRepository.save(JobApplication.builder()
                .companyName("테크 코프")
                .position("프론트엔드 개발 인턴")
                .status(JobStatus.INTERVIEWING)
                .user(chulsoo)
                .appliedAt(LocalDateTime.now().minusDays(2))
                .build());

        // 8. FAQ
        faqRepository.save(FAQ.builder()
                .category("일반")
                .question("POLPOL은 어떤 서비스인가요?")
                .answer("POLPOL은 학생들의 포트폴리오 관리와 기업의 채용을 연결해주는 올인원 플랫폼입니다.")
                .sortOrder(1)
                .build());

        System.out.println("Comprehensive Dummy Data Initialization Completed!");
    }

    private User createUser(String id, String name, String studentId, String dept) {
        return User.builder()
                .email(id + "@office.kopo.ac.kr")
                .password(passwordEncoder.encode("1234"))
                .name(name)
                .studentId(studentId)
                .department(dept)
                .role(Role.STUDENT)
                .build();
    }
}
