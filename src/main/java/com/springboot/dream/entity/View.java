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
public class View  {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long viewId;


    @ManyToOne
    @JoinColumn(name = "DREAM_ID")
    private Dream dream;



    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    //스위치
    private Member member;


    public void setDream(Dream dream){
        this.dream = dream;
        if (dream.getViews().contains(this)){
            dream.setView(this);
        }
    }
}
