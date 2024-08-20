package com.springboot.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists"),
    COMMENT_NOT_FOUND(404, "Comment not found"),
    COFFEE_CODE_EXISTS(409, "Coffee Code exists"),
    DREAM_NOT_FOUND(404, "Dream not found"),
    CANNOT_REGISTER_COMMENT(403, "Comment do not register"),
    NOT_YOUR_DREAM(501, "Not your Dream"),
    DREAM_IS_PRIVATE(404, "This is private"),
    NOT_YOUR_COMMENT(403, "Not your Comment"),
    CANNOT_LIKE(403, "Can not Like"),
    CANNOT_CHANGE_MEMBER_STATUS(403, "MemberStatus cannot change" );

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}