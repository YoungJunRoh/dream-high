package com.springboot.member.entity;

import com.springboot.dream.entity.Dream;
import com.springboot.interpretation.entity.Interpretation;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(nullable = false, updatable = false, unique = true)
    private String email;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(length = 13, nullable = false, unique = true)
    private String phone;

    @Enumerated(EnumType.STRING)
    @Column(length = 20, nullable = false)
    private MemberStatus memberStatus = MemberStatus.MEMBER_ACTIVE;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = false, name = "LAST_MODIFIED_AT")
    private LocalDateTime modifiedAt = LocalDateTime.now();


    @OneToMany(mappedBy = "member", cascade = CascadeType.MERGE)
    private List<Dream> dreams = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.MERGE)
    private List<Interpretation> interpretations = new ArrayList<>();




    // TODO 추가 된 부분
    public enum MemberStatus {
        MEMBER_ACTIVE("활동중"),
        MEMBER_SLEEP("휴면 상태"),
        MEMBER_QUIT("탈퇴 상태");

        @Getter
        private String status;

        MemberStatus(String status) {
            this.status = status;
        }
    }

    public void addDream(Dream dream){
        dreams.add(dream);
        if(dream.getMember() != this){
            dream.addMember(this);
        }
  }
    public void removeDream(Dream dream) {
        this.dreams.remove(dream);
        if (dream.getMember() == this){
            dream.removeMember(this);
        }
    }

    public void  addInterpretation(Interpretation interpretation){
        interpretations.add(interpretation);
        if(interpretation.getMember() != this){
            interpretation.addMember(this);
        }
    }

    public void removeInterpretation(Interpretation interpretation) {
        this.interpretations.remove(interpretation);
        if (interpretation.getMember() == this){
            interpretation.removeMember(this);
        }
    }


}
