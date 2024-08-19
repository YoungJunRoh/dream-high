package com.springboot.share.entity;

import com.springboot.dream.entity.Dream;
import com.springboot.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Sharing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sharingId;

    @Column(nullable = false)
    LocalDateTime sharingDate = LocalDateTime.now();


    @OneToMany
    @JoinColumn(name = "MEMBER_ID")
    Member member;

    @OneToMany
    @JoinColumn(name = "DREAM_ID")
    Dream dream;
}
