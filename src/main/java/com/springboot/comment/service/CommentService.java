package com.springboot.comment.service;

import com.springboot.comment.entity.Comment;
import com.springboot.comment.repository.CommentRepository;
import com.springboot.dream.entity.Dream;
import com.springboot.dream.service.DreamService;
import com.springboot.exception.BusinessLogicException;
import com.springboot.exception.ExceptionCode;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class CommentService {
    private final CommentRepository commentRepository;
    private final DreamService dreamService;

    public CommentService(CommentRepository commentRepository, DreamService dreamService) {
        this.commentRepository = commentRepository;
        this.dreamService = dreamService;
    }

    public Comment postComment(Comment comment){
        Dream findDream = dreamService.findDream(comment.getDream().getDreamId());
        if(findDream.getDreamStatus() == Dream.DreamStatus.DREAM_DEACTIVE || findDream.getDreamSecret() == Dream.DreamSecret.DREAM_PRIVATE){
             new BusinessLogicException(ExceptionCode.CANNOT_REGISTER_COMMENT);
        }else {
            comment.addDream(findDream);
        }
        return commentRepository.save(comment);
    }
}
