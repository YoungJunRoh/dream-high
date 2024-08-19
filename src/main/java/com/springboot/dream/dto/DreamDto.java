package com.springboot.dream.dto;

import com.springboot.dream.entity.Dream;
import com.springboot.interpretation.dto.InterpretationResponseDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import java.util.List;


public class DreamDto {
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Post {
        @NotNull(message = "Prompt must not be null")
        String prompt;
    }

    @Getter
    public static class Patch{

        private long dreamId;

        Dream.DreamSecret dreamSecret;

        public void setDreamId(long dreamId){
            this.dreamId = dreamId;
        }

    }


    @AllArgsConstructor
    @Getter
    @Setter
    @NoArgsConstructor
    public static class Response {
        private long dreamId;
        private long memberId;
        private String content;
        private Dream.DreamStatus dreamStatus;
        private Dream.DreamSecret dreamSecret;
        private List<DreamKeywordResponseDto> dreamKeywords;
        private InterpretationResponseDto interpretationResponse;

        public String getDreamStatus() {
            return dreamStatus.getStatus();
        }
    }
}
