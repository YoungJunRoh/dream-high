package com.springboot.sharing.controller;

import com.springboot.dream.entity.Dream;
import com.springboot.dream.service.DreamService;
import com.springboot.exception.ExceptionCode;
import com.springboot.member.service.MemberService;
import com.springboot.sharing.dto.SharingDto;
import com.springboot.sharing.mapper.SharingMapper;
import com.springboot.sharing.repository.SharingRepository;
import com.springboot.sharing.service.SharingService;

import com.springboot.sharing.entity.Sharing;
import com.springboot.utils.UriCreator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;

@RestController
@RequestMapping("/dreams/{dreamId}/sharing")
public class SharingController {

  private final SharingService sharingService;
SharingMapper sharingMapper;

    public SharingController(SharingService sharingService, SharingMapper sharingMapper) {
        this.sharingService = sharingService;
        this.sharingMapper = sharingMapper;
    }

    @PostMapping
    public ResponseEntity postSharing(@PathVariable Long dreamId,
                                                 @Validated @RequestBody SharingDto.Post requestBody) {
//        Sharing newSharing = new Sharing();
        requestBody.setDreamId(dreamId);
        Sharing sharing = sharingMapper.sharingPostToSharing(requestBody);
        Sharing createShare = sharingService.logSharing(sharing);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}






