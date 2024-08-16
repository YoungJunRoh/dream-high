package com.springboot.interpretation.entity;

import com.springboot.audit.Auditable;
import com.springboot.dream.entity.Dream;
import com.springboot.member.entity.Member;

import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotBlank;

public class Interpretation extends Auditable {

    @Id
    private Long answerId;


    @OneToOne
    @JoinColumn(name = "DREAM_ID")
    private Dream dream;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @NotBlank
    private String content;


    public void setDream(Dream dream) {
        this.dream = dream;
        if (dream.getAnswer() != this) {
            dream.setAnswer(this);
        }
    }

    public void addMember(Member member) {

        this.member = member;
        if (!member.getAnswers().contains(this)) {
            member.addAnswer(this);
        }
    }

    public void removeMember(Member member) {
        this.member = null;
        if (member.getAnswers().contains(this)){
            member.removeAnswer(this);
        }
    }
    
}
