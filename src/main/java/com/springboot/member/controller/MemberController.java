package com.springboot.member.controller;


import com.springboot.auth.service.AuthService;
import com.springboot.exception.BusinessLogicException;
import com.springboot.member.dto.MemberDto;
import com.springboot.member.dto.MemberRewardPictureDto;
import com.springboot.member.entity.Member;
import com.springboot.member.entity.MemberRewardPicture;
import com.springboot.member.mapper.MemberMapper;
import com.springboot.member.service.MemberService;
import com.springboot.picture.entity.RewardPicture;
import com.springboot.response.SingleResponseDto;
import com.springboot.stamp.entity.Stamp;
import com.springboot.utils.UriCreator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;

@RestController
@Slf4j
@Validated
@RequestMapping("/members")
public class MemberController {
    private final static String MEMBER_DEFAULT_URL = "/members";
    private final MemberService memberService;
    private final MemberMapper mapper;
    private final AuthService authService;


    public MemberController(MemberService memberService, MemberMapper mapper, AuthService authService) {
        this.memberService = memberService;
        this.mapper = mapper;
        this.authService = authService;
    }

    @PostMapping
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.Post requestBody){
        Member member = mapper.memberPostToMember(requestBody);

        member.setStamp(new Stamp());

        Member createdMember = memberService.createMember(member);
        URI location = UriCreator.createUri(MEMBER_DEFAULT_URL, createdMember.getMemberId());

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{member-id}")
    public ResponseEntity patchMember(
            @PathVariable("member-id") @Positive long memberId,
            @Valid @RequestBody MemberDto.Patch requestBody){
        requestBody.setMemberId(memberId);

        Member member = memberService.updateMember(mapper.memberPatchToMember(requestBody));
        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.memberToMemberResponse(member)), HttpStatus.OK);
    }

    @PatchMapping("/{member-id}/password")
    public ResponseEntity patchMemberPassword(
            @PathVariable("member-id") @Positive long memberId,
            @Valid @RequestBody MemberDto.Patch requestBody){
        requestBody.setMemberId(memberId);

        Member member = memberService.updateMemberPassword(mapper.memberPatchToMember(requestBody));
        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.memberToMemberResponse(member)), HttpStatus.OK);
    }

    @PatchMapping("/{member-id}/profile")
    public ResponseEntity setProfile(@PathVariable("member-id") @Positive long memberId,
                                     @RequestBody MemberDto.PatchProfile requestBody) {
        Member member = memberService.findMember(memberId);
        member.setProfileUrl(requestBody.getProfileUrl());

        return new ResponseEntity(HttpStatus.OK);
    }


    @GetMapping("/{member-id}")
    public ResponseEntity getMember(
            @PathVariable("member-id") @Positive long memberId, Authentication authentication) {
        Member member = memberService.findMember(memberId);

        String email = null;

        if (authentication != null) {
            email = (String) authentication.getPrincipal();

            // 로그아웃 상태 확인: 토큰이 Redis에서 이미 삭제된 경우
            boolean isLoggedOut = !authService.isTokenValid(email);
            if (isLoggedOut) {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
        }

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.memberToMemberResponseMyPage(member)), HttpStatus.OK);
    }



    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteMember(@PathVariable("member-id") @Positive long memberId){
         memberService.deleteMember(memberId);
        return new ResponseEntity(HttpStatus.OK);
    }

//    MemberRewardPicture memberRewardPicture = new MemberRewardPicture();
//        if (member.getStamp().getCount() % 5 == 0) {
//        int size = member.getMemberRewardPictures().size();
//        if (size == 0) {
//            RewardPicture rewardPicture = new RewardPicture();
//            rewardPicture.setRewardUrl("https://dream-high-picture-reward.s3.ap-northeast-2.amazonaws.com/KakaoTalk_20240821_154616011_02.jpg");
//            memberRewardPicture.setRewardPicture(rewardPicture);
//            memberRewardPicture.setMember(member);
//            member.addMemberRewardPicture(memberRewardPicture);
//        } else {
//            memberRewardPicture = member.getMemberRewardPictures().get(size - 1);
//            long pictureId = memberRewardPicture.getRewardPicture().getRewardPictureId() + 1;
//            MemberRewardPicture plusMemberRewardPicture = new MemberRewardPicture();
//            plusMemberRewardPicture.setMember(member);
//            plusMemberRewardPicture.setMemberRewardPictureId(pictureId);
//            member.addMemberRewardPicture(plusMemberRewardPicture);
//        }
//    }

}
