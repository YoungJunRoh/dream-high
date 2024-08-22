package com.springboot.member.controller;


import com.springboot.member.dto.MemberDto;
import com.springboot.member.dto.MemberRewardPictureDto;
import com.springboot.member.entity.Member;
import com.springboot.member.entity.MemberRewardPicture;
import com.springboot.member.mapper.MemberMapper;
import com.springboot.member.service.MemberService;
import com.springboot.response.SingleResponseDto;
import com.springboot.stamp.entity.Stamp;
import com.springboot.utils.UriCreator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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


    public MemberController(MemberService memberService, MemberMapper mapper) {
        this.memberService = memberService;
        this.mapper = mapper;
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

    @GetMapping("/{member-id}")
    public ResponseEntity geMember(
            @PathVariable("member-id") @Positive long memberId) {
        Member member = memberService.findMember(memberId);

        if (member.getStamp().getCount() % 5 == 0) {
            int size = member.getMemberRewardPictures().size();
            if (size == 0) {
                MemberRewardPicture memberRewardPicture = new MemberRewardPicture();
                memberRewardPicture.setMemberRewardPictureId(1L);
                memberRewardPicture.setMember(member);
            } else {
                MemberRewardPicture memberRewardPicture = member.getMemberRewardPictures().get(size - 1);
                long pictureId = memberRewardPicture.getRewardPicture().getRewardPictureId() + 1;
                MemberRewardPicture plusMemberRewardPicture = new MemberRewardPicture();
                plusMemberRewardPicture.setMember(member);
                plusMemberRewardPicture.setMemberRewardPictureId(pictureId);

                return new ResponseEntity<>(
                        new SingleResponseDto<>(mapper.memberRewardPictureToMemberRewardPictureResponseDto(memberRewardPicture))
                        , HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.memberToMemberResponseMyPage(member)), HttpStatus.OK);
    }

    @PostMapping("/{member-id}/profile")
    public ResponseEntity setProfile(@PathVariable("member-id") @Positive long memberId,
                                     @RequestBody MemberRewardPictureDto.Post requestBody) {
        Member member = memberService.findMember(memberId);
        member.setProfileNum(requestBody.getProfileNum());

        return new ResponseEntity(HttpStatus.OK);
    }

    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteMember(@PathVariable("member-id") @Positive long memberId){
         memberService.deleteMember(memberId);
        return new ResponseEntity(HttpStatus.OK);
    }

}
