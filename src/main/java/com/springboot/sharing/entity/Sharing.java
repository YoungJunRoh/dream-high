package com.springboot.sharing.entity;

import com.springboot.dream.entity.Dream;
import com.springboot.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "sharing")
@Getter
@Setter
@NoArgsConstructor
public class Sharing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sharingId;

    @Column(nullable = false)
    LocalDateTime sharingDate = LocalDateTime.now();


    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    Member member;


    @ManyToOne
    @JoinColumn(name = "dream_id", nullable = false)
    Dream dream;
}
