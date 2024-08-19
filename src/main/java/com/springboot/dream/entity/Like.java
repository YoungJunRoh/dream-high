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
    @JoinColumn(name = "DREAM_ID")
    private Dream dream;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "MEMBER_ID")
    //스위치
    private Member member;


//    public void setDream(Dream dream) {
//        this.dream = dream;
//        if (dream.getLikes().contains(this)) {
//            dream.setLike(this);
//        }
//    }
//
//    public void removeDream(Dream dream){
//        this.dream = null;
//        if (dream.getLikes().contains(this)){
//            dream.removeLike(this);
//        }
//    }



    public void removeMember(Member member){
        this.member = null;
    }
}
