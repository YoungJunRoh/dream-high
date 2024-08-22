package com.springboot.member.service;

import com.springboot.auth.utils.JwtAuthorityUtils;
import com.springboot.dream.entity.Dream;
import com.springboot.exception.BusinessLogicException;
import com.springboot.exception.ExceptionCode;
import com.springboot.helper.event.MemberRegistrationApplicationEvent;
import com.springboot.member.entity.Member;
import com.springboot.member.repository.MemberRepository;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static com.springboot.member.entity.Member.MemberStatus.MEMBER_ACTIVE;
import static com.springboot.member.entity.Member.MemberStatus.MEMBER_QUIT;

@Service
public class MemberService {


    private final MemberRepository memberRepository;
    private final ApplicationEventPublisher publisher;
    private final PasswordEncoder passwordEncoder;
    private final JwtAuthorityUtils authorityUtils;

    public MemberService(MemberRepository memberRepository, ApplicationEventPublisher publisher, PasswordEncoder passwordEncoder, JwtAuthorityUtils authorityUtils) {
        this.memberRepository = memberRepository;
        this.publisher = publisher;
        this.passwordEncoder = passwordEncoder;
        this.authorityUtils = authorityUtils;
    }

    public Member createMember(Member member) {
        // TODO should business logic
        // throw new BusinessLogicException(ExceptionCode.NOT_IMPLEMENTATION);
        verifyExistsEmail(member.getEmail());

        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

        Member savedMember = memberRepository.save(member);

        publisher.publishEvent(new MemberRegistrationApplicationEvent(this, savedMember));
        return savedMember;
    }

    public Member updateMember(Member member) {
        // TODO should business logic
        //throw new BusinessLogicException(ExceptionCode.NOT_IMPLEMENTATION);
        Member findMember = findVerifiedMember(member.getMemberId());

//    if (member.getName() != null){
//        findMember.setName(member.getName());
//    }
//    if (member.getPhone() != null){
//        findMember.setPhone(member.getPhone());
//    }
        Optional.ofNullable(member.getNickName())
                .ifPresent(name -> findMember.setNickName(name));


        Optional.ofNullable(member.getMemberStatus())
                .ifPresent(memberStatus -> findMember.setMemberStatus(memberStatus));

        findMember.setModifiedAt(LocalDateTime.now());
        return memberRepository.save(findMember);
    }

    public Member findMember(long memberId) {
        // TODO should business logic
        //throw new BusinessLogicException(ExceptionCode.NOT_IMPLEMENTATION);
        return findVerifiedMember(memberId);
    }



    public Page<Member> findMembers(int page, int size) {
        // TODO should business logic
        //throw new BusinessLogicException(ExceptionCode.NOT_IMPLEMENTATION);
        return memberRepository.findAll(PageRequest.of(page, size, Sort.by("memberId").descending()));

    }

    public void deleteMember(long memberId) {
        // TODO should business logic
        Member findMember = findVerifiedMember(memberId);

        findMember.setMemberStatus(MEMBER_QUIT);

        for(Dream dream : findMember.getDreams()){
            dream.setDreamStatus(Dream.DreamStatus.DREAM_DEACTIVE);
        }

        memberRepository.save(findMember);
        //throw new BusinessLogicException(ExceptionCode.NOT_IMPLEMENTATION);
    }

    public void quitMember(long memberId) {
        Member findMember = findVerifiedMember(memberId);

        if (findMember.getMemberStatus() != MEMBER_ACTIVE) {
            throw new BusinessLogicException(ExceptionCode.CANNOT_CHANGE_MEMBER_STATUS);
        }

        findMember.setMemberStatus(Member.MemberStatus.MEMBER_QUIT);

        findMember.setModifiedAt(LocalDateTime.now());
        memberRepository.save(findMember);



    }


    public void sleepMember(long memberId) {
        Member findMember = findVerifiedMember(memberId);

        if (findMember.getMemberStatus() != MEMBER_ACTIVE) {
            throw new BusinessLogicException(ExceptionCode.CANNOT_CHANGE_MEMBER_STATUS);
        }

        findMember.setMemberStatus(Member.MemberStatus.MEMBER_SLEEP);
        findMember.setModifiedAt(LocalDateTime.now());
        memberRepository.save(findMember);
    }


    public Member findVerifiedMember(Long memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        return optionalMember.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    private void verifyExistsEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isPresent()) throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
    }

    @Transactional(readOnly = true)
    public Member findVerifiedMember(String email){
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        Member findMember = optionalMember.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findMember;
    }
}