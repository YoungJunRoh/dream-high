package com.springboot.sharing.service;

import com.springboot.dream.entity.Dream;
import com.springboot.dream.service.DreamService;
import com.springboot.exception.BusinessLogicException;
import com.springboot.exception.ExceptionCode;
import com.springboot.member.entity.Member;
import com.springboot.member.service.MemberService;
import com.springboot.sharing.entity.Sharing;
import com.springboot.sharing.repository.SharingRepository;
import com.springboot.stamp.service.StampService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class SharingService {


    private final SharingRepository sharingRepository;

    private final MemberService memberService;
    private final DreamService dreamService;
    private final StampService stampService;

    public SharingService(SharingRepository sharingRepository, MemberService memberService, DreamService dreamService, StampService stampService) {
        this.sharingRepository = sharingRepository;
        this.memberService = memberService;
        this.dreamService = dreamService;
        this.stampService = stampService;
    }

    //레포에 저장하기
    //
    public Sharing logSharing(Sharing sharing, String email) {

        Dream dream = dreamService.findVerifiedDream(sharing.getDream().getDreamId());
        sharing.setDream(dream);

        // 유효한 멤버인지 확인 > 드림의 멤버가 유효한 멤버인지
        Member member = memberService.findVerifiedMember(email);
        sharing.setMember(member);

        Sharing saveSharing = sharingRepository.save(sharing);

        stampService.incrementStampCount(dream.getMember());

        return saveSharing;
    }


}
