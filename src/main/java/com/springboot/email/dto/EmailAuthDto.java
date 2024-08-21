package com.springboot.email.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmailAuthDto {
    private String email;
    private String code;

}
