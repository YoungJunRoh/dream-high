package com.springboot.email.controller;



import com.springboot.email.service.EmailService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
public class EmailController {

    private final EmailService emailService;

    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/send-verification")
    public String sendVerificationEmail(@RequestParam String email) {
        emailService.sendVerificationEmail(email);
        return "Verification email sent.";
    }

    @PostMapping("/send-password-reset")
    public String sendPasswordResetEmail(@RequestParam String email) {

        String resetToken = java.util.UUID.randomUUID().toString();
        emailService.sendPasswordResetEmail(email, resetToken);
        return "Password reset email sent.";
    }
}
