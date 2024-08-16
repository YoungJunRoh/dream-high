package com.springboot.dream.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class Dream {
    @Id
    private int dreamId;

    private String content;

    @Enumerated(value = EnumType.STRING)
    @Column(length = 20, nullable = false)
    private DreamStatus dreamStatus = DreamStatus.DREAM_ACTIVE;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = false, name = "LAST_MODIFIED_AT")
    private LocalDateTime modifiedAt = LocalDateTime.now();

    public enum DreamStatus {
        DREAM_ACTIVE("꿈 활성화"),
        DREAM_DEACTIVE("꿈 비활성화");

        @Getter
        private String status;

        DreamStatus(String status) {this.status = status;}
    }


}
