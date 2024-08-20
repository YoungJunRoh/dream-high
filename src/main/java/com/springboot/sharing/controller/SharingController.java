package com.springboot.sharing.controller;

import com.springboot.dream.dto.DreamDto;
import com.springboot.member.service.MemberService;
import com.springboot.response.SingleResponseDto;
import com.springboot.sharing.SharingService;
//import com.springboot.sharing.entity.Sharing;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/dreams/{dream-id}/sharing")
@Validated
@Slf4j
public class SharingController {

    private final SharingService sharingService;


    public SharingController(SharingService sharingService, MemberService memberService) {
        this.sharingService = sharingService;

    }

    @PostMapping
    public ResponseEntity postSharing(@PathVariable("dream-id") @Positive long dreamId,
                                      @Valid @RequestBody Sharing sharing) {


        // 공유 요청 로그 남기기
        //sharing을 하나 새로 만드는 느낌
        sharingService.logSharing(sharing);

        // 필요한 경우 응답 처리
        return new ResponseEntity<>(
                HttpStatus.OK);
    }


}
