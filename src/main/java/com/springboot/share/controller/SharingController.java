//package com.springboot.share.controller;
//
//import com.springboot.dream.dto.DreamDto;
//import com.springboot.member.service.MemberService;
//import com.springboot.share.SharingService;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.http.ResponseEntity;
//import org.springframework.validation.annotation.Validated;
//import org.springframework.web.bind.annotation.*;
//
//import javax.validation.Valid;
//import javax.validation.constraints.Positive;
//
//@RestController
//@RequestMapping("/dreams/{dream-id}/sharing")
//@Validated
//@Slf4j
//public class SharingController {
//
//    private final SharingService sharingService;
//    private final MemberService memberService;
//
//    public SharingController(SharingService sharingService, MemberService memberService) {
//        this.sharingService = sharingService;
//        this.memberService = memberService;
//    }
//
//    @PostMapping
//    public ResponseEntity postSharing(@PathVariable("dream-id") @Positive long dreamId,
//                                      @Valid @RequestBody DreamDto.Response response){
//
//        // 유효한 멤버인지 확인 > 드림의 멤버가 유효한 멤버인지
//       memberService.findVerifiedMember(response.getMemberId());
//
//
//        // 드림 결과 링크를 가져옴
//        String dreamResultLink = sharingService.getDreamResultLink(dreamId);
//
//        if (dreamResultLink == null) {
//            return ResponseEntity.status(404).body("Dream not found.");
//        }
//
//        // 공유 요청 로그 남기기
//        sharingService.logSharing(dreamId, dreamPatchDto, dreamResultLink);
//
//        // JavaScript API로 넘기기 (예: 프론트엔드로 데이터 전달)
//        String jsApiResponse = sharingService.forwardToJsApi(dreamResultLink);
//
//        // 필요한 경우 응답 처리
//        return ResponseEntity.ok(jsApiResponse);
//    }
//
//
//}
