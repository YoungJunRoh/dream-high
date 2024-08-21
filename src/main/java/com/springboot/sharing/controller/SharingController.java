package com.springboot.sharing.controller;

import com.springboot.dream.entity.Dream;
import com.springboot.dream.service.DreamService;
import com.springboot.member.entity.Member;
import com.springboot.member.service.MemberService;
//import com.springboot.sharing.entity.Sharing;
import com.springboot.sharing.entity.Sharing;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/dreams/{dream-id}/sharing")
@Validated
@Slf4j
public class SharingController {

    private final SharingService sharingService;
    private final MemberService memberService;
    private final DreamService dreamService;

    public SharingController(SharingService sharingService, MemberService memberService, MemberService memberService1, DreamService dreamService) {
        this.sharingService = sharingService;

        this.memberService = memberService1;
        this.dreamService = dreamService;
    }

    @PostMapping
    public ResponseEntity<Void> postSharing(@PathVariable("dream-id") @Positive long dreamId,
                                            @RequestParam @Positive long memberId) {

        // 유효한 멤버인지 확인
        Member member = memberService.findVerifiedMember(memberId);

        // 유효한 드림인지 확인
        Dream dream = dreamService.findDream(dreamId);

        // Sharing 엔티티 생성
        Sharing sharing = new Sharing();
        sharing.setMember(member);
        sharing.setDream(dream);

        // 공유 요청 로그 남기기
        sharingService.logSharing(sharing);

        // 응답 처리
        return ResponseEntity.ok().build();
    }
}
