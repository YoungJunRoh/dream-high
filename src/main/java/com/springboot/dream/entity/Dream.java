package com.springboot.dream.entity;

import com.springboot.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class Dream {
    @Id
    private int dreamId;

    private String content;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @Enumerated(value = EnumType.STRING)
    @Column(length = 20, nullable = false)
    private DreamStatus dreamStatus = DreamStatus.DREAM_ACTIVE;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
    
    @Column(nullable = false, name = "LAST_MODIFIED_AT")
    private LocalDateTime modifiedAt = LocalDateTime.now();

    @OneToMany(mappedBy = "dream")
    private List<Like> likes = new ArrayList<>();


    @OneToMany(mappedBy = "dream")
    private List<View> views = new ArrayList<>();

    public void setLike(Like like) {
        likes.add(like);
        if (like.getDream() != this) {
            like.setDream(this);
        }
    }


    public void removeLike(Like like) {
        this.likes.remove(like);
        if (like.getDream() == this){
            like.removeDream(this);
        }
    }

    public void setView(View view) {
        views.add(view);
        if (view.getDream() != this) {
            view.setDream(this);
        }
    }


    public void addMember(Member member) {
        this.member = member;
        if (!member.getDreams().contains(this)) {
            member.addDream(this);
        }

    }

    public void removeMember(Member member) {
        this.member = null;
        if (member.getDreams().contains(this)){
            member.removeDream(this);
        }
    }


    public enum DreamStatus {
        DREAM_ACTIVE("꿈 활성화"),
        DREAM_DEACTIVE("꿈 비활성화");

        @Getter
        private String status;

        DreamStatus(String status) {this.status = status;}
    }


}
