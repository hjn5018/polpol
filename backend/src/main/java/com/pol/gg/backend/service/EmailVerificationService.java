package com.pol.gg.backend.service;

import com.pol.gg.backend.domain.user.EmailVerification;
import com.pol.gg.backend.domain.user.EmailVerificationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Random;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailVerificationService {

    private final EmailVerificationRepository emailVerificationRepository;
    private final JavaMailSender javaMailSender;
    
    // 5 minutes expiry
    private static final long EXPIRE_MINUTES = 5L;

    @Transactional(noRollbackFor = MailException.class)
    public void sendVerificationCode(String email) {
        if (email == null || !email.endsWith("@office.kopo.ac.kr")) {
            throw new IllegalArgumentException("Only @office.kopo.ac.kr emails are allowed.");
        }

        String code = generateCode();
        LocalDateTime expiryDate = LocalDateTime.now().plusMinutes(EXPIRE_MINUTES);

        log.info("Generating verification code for {}: [{}]", email, code);
        System.out.println("DEBUG: Verification code for " + email + " is [" + code + "]");

        EmailVerification verification = emailVerificationRepository.findById(email)
                .orElse(new EmailVerification(email, code, expiryDate));

        verification.updateCode(code, expiryDate);
        emailVerificationRepository.save(verification);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("폴폴(polpol) 가입 인증 메일");
        message.setText("인증 코드는 [" + code + "] 입니다. 5분 내에 입력해주세요.");
        javaMailSender.send(message);
    }

    public boolean verifyCode(String email, String code) {
        EmailVerification verification = emailVerificationRepository.findById(email)
                .orElseThrow(() -> new IllegalArgumentException("Verification request not found."));

        if (verification.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Verification code expired.");
        }

        if (verification.getCode().equals(code)) {
            emailVerificationRepository.delete(verification);
            return true;
        }

        return false;
    }

    private String generateCode() {
        Random random = new Random();
        StringBuilder code = new StringBuilder();
        for (int i = 0; i < 6; i++) {
            code.append(random.nextInt(10));
        }
        return code.toString();
    }
}
