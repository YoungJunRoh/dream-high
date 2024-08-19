package com.springboot.comment.controller;


import com.springboot.comment.dto.CommentDto;
import com.springboot.comment.entity.Comment;
import com.springboot.comment.mapper.CommentMapper;
import com.springboot.comment.service.CommentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/")
@Validated
@Slf4j
public class CommentController {

    private final CommentMapper mapper;
    private final CommentService commentService;

    public CommentController(CommentMapper mapper, CommentService commentService) {
        this.mapper = mapper;
        this.commentService = commentService;
    }

    @PostMapping("/dreams/{dream-id}/comments")
    public ResponseEntity postComment(@PathVariable("dream-id") @Positive long dreamId,
                                      @RequestBody CommentDto.Post commentPostDto){
        commentPostDto.setDreamId(dreamId);
        Comment comment = commentService.postComment(mapper.commentPostDtoToComment(commentPostDto));

        return new ResponseEntity(HttpStatus.OK);
    }


}
