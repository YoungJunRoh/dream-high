package com.springboot.member.entity;

import com.springboot.comment.entity.Comment;
import com.springboot.dream.entity.Dream;
import com.springboot.interpretation.entity.Interpretation;
import com.springboot.stamp.entity.Stamp;
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
    private String password;

    @Column(nullable = false, length = 100)
    private String nickName;

    @Enumerated(EnumType.STRING)
    @Column(length = 20, nullable = false)
    private MemberStatus memberStatus = MemberStatus.MEMBER_ACTIVE;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = false, name = "LAST_MODIFIED_AT")
    private LocalDateTime modifiedAt = LocalDateTime.now();

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.PERSIST)
    private List<Dream> dreams = new ArrayList<>();

    @OneToOne(mappedBy = "member", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private Stamp stamp;

    @OneToMany(mappedBy = "member", cascade = CascadeType.PERSIST)
    private List<Comment> comments = new ArrayList<>();

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
            dream.setMember(this);
        }
    }

    public void addComment(Comment comment){
        comments.add(comment);
        if(comment.getMember() != this){
            comment.setMember(this);
        }

    }
    public void setStamp(Stamp stamp) {
        this.stamp = stamp;
        if (stamp.getMember() != this) {
            stamp.setMember(this);
        }
    }

//    public void removeDream(Dream dream) {
//        this.dreams.remove(dream);
//        if (dream.getMember() == this){
//            dream.removeMember(this);
//        }
//    }
//
//    public void  addInterpretation(Interpretation interpretation){
//        interpretations.add(interpretation);
//        if(interpretation.getMember() != this){
//            interpretation.addMember(this);
//        }
//    }
//
//    public void removeInterpretation(Interpretation interpretation) {
//        this.interpretations.remove(interpretation);
//        if (interpretation.getMember() == this){
//            interpretation.removeMember(this);
//        }
//    }


//    @Getter
//    @Setter
//    @Entity
//    @NoArgsConstructor
//    public static class Role{
//        private Long roleId;
//
//        private String roleName;
//
//        @OneToMany(mappedBy = "member", cascade = CascadeType.MERGE)
//        Member member;
//    }

}
