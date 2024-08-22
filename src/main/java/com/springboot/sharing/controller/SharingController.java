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
import org.springframework.security.core.Authentication;
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


    public SharingController(SharingService sharingService, SharingMapper sharingMapper, DreamService dreamService, StampService stampService) {
        this.sharingService = sharingService;
        this.sharingMapper = sharingMapper;
    }

    @PostMapping
    public ResponseEntity postSharing(@PathVariable("dreamId") Long dreamId,

                                      Authentication authentication) {

//        Sharing newSharing = new Sharing();
        if (authentication == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        SharingDto.Post requestBody = new SharingDto.Post(dreamId);


        Sharing sharing = sharingMapper.sharingPostToSharing(requestBody);

        Sharing createSharing = sharingService.logSharing(sharing, authentication.getName());

        return new ResponseEntity<>(HttpStatus.OK);
    }

}






