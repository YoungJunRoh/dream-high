package com.springboot.comment.mapper;


import com.springboot.comment.dto.CommentDto;
import com.springboot.comment.entity.Comment;
import com.springboot.dream.entity.Dream;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CommentMapper {
    default Comment commentPostDtoToComment(CommentDto.Post requestBody){
        Dream dream = new Dream();
        dream.setDreamId(requestBody.getDreamId());
        Comment comment = new Comment();
        comment.setContent(requestBody.getContent());
        comment.setDream(dream);
        return comment;
    }



}
