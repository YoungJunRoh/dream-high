package com.springboot.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;

public class CommentDto {

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Post {
        private long dreamId;

        @NotNull(message = "Prompt must not be null")
        String content;

    }
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response{

        private long commentId;

        private long dreamId;

        @NotNull(message = "Prompt must not be null")
        String content;
    }


}
