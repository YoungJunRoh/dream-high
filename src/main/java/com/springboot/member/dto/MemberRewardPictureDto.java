package com.springboot.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class MemberRewardPictureDto {
    @Getter
    @AllArgsConstructor
    public static class Post{
        long profileNum;
    }

    @AllArgsConstructor
    @Getter
    @NoArgsConstructor
    @Setter
    public static class Response{

        private long memberId;
        private long rewardPictureId;
        private String rewardUrl;

    }

}
