package com.springboot.member.mapper;

import com.springboot.dream.dto.DreamDto;
import com.springboot.dream.entity.Dream;
import com.springboot.member.dto.MemberDto;
import com.springboot.member.dto.MemberRewardPictureDto;
import com.springboot.member.entity.Member;
import com.springboot.member.entity.MemberRewardPicture;
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
        List<MemberRewardPictureDto.Response> pictures = member.getMemberRewardPictures().stream()
                        .map(memberRewardPicture -> memberRewardPictureToMemberRewardPictureResponseDto(memberRewardPicture))
                        .collect(Collectors.toList());
        response.setMemberId(member.getMemberId());
        response.setNickName(member.getNickName());
        response.setDreams(dreams);
        response.setEmail(member.getEmail());
        response.setMemberStatus(member.getMemberStatus());
        response.setStampCount(member.getStamp().getCount());

        return response;
    }

    default DreamDto.ResponseThree dreamToDreamResponseThree(Dream dream){
        DreamDto.ResponseThree response = new DreamDto.ResponseThree();
        response.setDreamId(dream.getDreamId());
        response.setContent(dream.getContent());
        response.setViewCount(dream.getViewCount());

        return response;
    }

    default MemberRewardPictureDto.Response memberRewardPictureToMemberRewardPictureResponseDto(MemberRewardPicture memberRewardPicture){
        MemberRewardPictureDto.Response response = new MemberRewardPictureDto.Response();
        response.setMemberId(memberRewardPicture.getMember().getMemberId());
        response.setRewardPictureId(memberRewardPicture.getMemberRewardPictureId());
        response.setRewardUrl(memberRewardPicture.getRewardPicture().getRewardUrl());

        return response;
    }
    List<MemberRewardPictureDto.Response> memberRewardPictureToMemberRewardPictureResponseDtos(List<MemberRewardPicture> memberRewardPictures);

//    List<MemberDto.Response> membersToMemberResponses(List<Member> members);
}