//package com.springboot.email.controller;
//
//import com.springboot.email.dto.EmailRequestDto;
//import com.springboot.email.service.MailSendService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RestController;
//
//import javax.validation.Valid;
//
//@RestController
//@RequiredArgsConstructor
//public class EmailController {
//    private final MailSendService mailService;
//
//    @PostMapping("/mailSend")
//    public String mailSend(@RequestBody @Valid EmailRequestDto emailDto) {
//        System.out.println("이메일 인증 이메일 :" + emailDto.getEmail());
//        return mailService.joinEmail(emailDto.getEmail());
//    }
//}