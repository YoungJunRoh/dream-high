package com.springboot.stamp.entity;

import com.springboot.audit.Auditable;
import com.springboot.member.entity.Member;

import javax.persistence.*;

public class Stamp extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long stampId;

    @Column(nullable = false)
    private int stampCount;

    @OneToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;


}
