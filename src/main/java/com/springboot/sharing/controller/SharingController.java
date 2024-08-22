package com.springboot.sharing.controller;

import com.springboot.dream.entity.Dream;
import com.springboot.dream.service.DreamService;
import com.springboot.exception.ExceptionCode;
import com.springboot.member.service.MemberService;
import com.springboot.sharing.dto.SharingDto;
import com.springboot.sharing.mapper.SharingMapper;
import com.springboot.sharing.service.SharingService;

import com.springboot.sharing.entity.Sharing;
import com.springboot.stamp.service.StampService;
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
@Validated
@Slf4j
public class SharingController {

    private final SharingService sharingService;
    SharingMapper sharingMapper;
    private final DreamService dreamService;
    private final StampService stampService;

    public SharingController(SharingService sharingService, SharingMapper sharingMapper, DreamService dreamService, StampService stampService) {
        this.sharingService = sharingService;
        this.sharingMapper = sharingMapper;
        this.dreamService = dreamService;
        this.stampService = stampService;
    }

    @PostMapping
    public ResponseEntity postSharing(@PathVariable Long dreamId,
                                      @Validated @RequestBody SharingDto.Post requestBody) {
//        Sharing newSharing = new Sharing();

        Dream dream = dreamService.findDream(dreamId);
        if (dream == null) {
            return ResponseEntity
                    .status(ExceptionCode.DREAM_NOT_FOUND.getStatus())
                    .build();
        }

        requestBody.setDreamId(dreamId);
        Sharing sharing = sharingMapper.sharingPostToSharing(requestBody);
        sharing.setDream(dream);

        Sharing createSharing = sharingService.logSharing(sharing);

        stampService.incrementStampCount(dream.getMember());

        return new ResponseEntity<>(HttpStatus.OK);
    }

}






