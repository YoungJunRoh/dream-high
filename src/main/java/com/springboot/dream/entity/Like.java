package com.springboot.dream.entity;

import com.springboot.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "LIKES")
public class Like {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long likeId;


    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "QUESTION_ID")
    private Dream dream;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "MEMBER_ID")
    //스위치
    private Member member;


    public void setQuestion(Dream dream) {
        this.question = question;
        if (question.getLikes().contains(this)) {
            question.setLike(this);
        }
    }

    public void removeQuestion(Question question){
        this.question = null;
        if (question.getLikes().contains(this)){
            question.removeLike(this);
        }
    }



    public void removeMember(Member member){
        this.member = null;
    }
}
