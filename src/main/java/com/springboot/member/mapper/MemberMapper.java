package com.springboot.member.mapper;

import com.springboot.dream.dto.DreamDto;
import com.springboot.dream.entity.Dream;
import com.springboot.member.dto.MemberDto;
import com.springboot.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {
    Member memberPostToMember(MemberDto.Post requestBody);
    Member memberPatchToMember(MemberDto.Patch requestBody);
    MemberDto.Response memberToMemberResponse(Member member);
    default MemberDto.Response memberToMemberResponseMyPage(Member member){
        MemberDto.Response response = new MemberDto.Response();

        List<DreamDto.ResponseThree> dreams = member.getDreams().stream()
                .limit(3)
                .map(dream -> dreamToDreamResponseThree(dream))
                .collect(Collectors.toList());
        response.setMemberId(member.getMemberId());
        response.setNickName(member.getNickName());
        response.setDreams(dreams);
        response.setEmail(member.getEmail());
        response.setMemberStatus(member.getMemberStatus());

        return response;
    }

    default DreamDto.ResponseThree dreamToDreamResponseThree(Dream dream){
        DreamDto.ResponseThree response = new DreamDto.ResponseThree();
        response.setDreamId(dream.getDreamId());
        response.setContent(dream.getContent());

        return response;
    }

//    List<MemberDto.Response> membersToMemberResponses(List<Member> members);
}