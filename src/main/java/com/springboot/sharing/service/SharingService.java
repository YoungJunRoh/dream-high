package com.springboot.sharing.service;

import com.springboot.member.service.MemberService;
import com.springboot.sharing.entity.Sharing;
import com.springboot.sharing.repository.SharingRepository;
import org.springframework.stereotype.Service;

@Service
public class SharingService {


    private final SharingRepository sharingRepository;

    private final MemberService memberService;

    public SharingService(SharingRepository sharingRepository, MemberService memberService) {
        this.sharingRepository = sharingRepository;
        this.memberService = memberService;
    }

    //레포에 저장하기
    //
    public Sharing logSharing(Sharing sharing) {

        // 유효한 멤버인지 확인 > 드림의 멤버가 유효한 멤버인지
//        memberService.findVerifiedMember(sharing.getMember().getMemberId());
        Sharing saveSharing = sharingRepository.save(sharing);

        return saveSharing;
    }


}
