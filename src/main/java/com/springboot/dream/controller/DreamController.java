package com.springboot.dream.controller;

import com.springboot.dream.dto.DreamDto;
import com.springboot.dream.dto.OpenAiRequest;
import com.springboot.dream.dto.OpenAiResponse;
import com.springboot.dream.entity.Dream;
import com.springboot.dream.mapper.DreamMapper;
import com.springboot.dream.service.DreamService;

import com.springboot.response.MultiResponseDto;
import com.springboot.response.SingleResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/dreams")
@Validated
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
public class DreamController {

    private final DreamService dreamService;
    private final DreamMapper mapper;

    public DreamController(DreamService dreamService, DreamMapper mapper) {
        this.dreamService = dreamService;
        this.mapper = mapper;
    }


    @PostMapping
    public ResponseEntity postDream(@Valid @RequestBody DreamDto.Post dreamPost,
                                    Authentication authentication){
        String email = null;

        if (authentication != null) {
            email = (String) authentication.getPrincipal();
        }

        Dream dream = dreamService.createDream(mapper.dreamPostToDream(dreamPost), email);

        DreamDto.Response response = mapper.dreamToDreamResponseDto(dream);


        return new ResponseEntity<>(new SingleResponseDto<>(response) , HttpStatus.OK);
    }

    @PatchMapping("/{dream-id}")
    public ResponseEntity patchDream(@PathVariable("dream-id") @Positive long dreamId,
                                     @Valid @RequestBody DreamDto.Patch dreamPatchDto,
                                     Authentication authentication) {
        dreamPatchDto.setDreamId(dreamId);
        if (authentication == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        String email = (String) authentication.getPrincipal();
        Dream dream =
                dreamService.updateDream(mapper.dreamPatchDtoToDream(dreamPatchDto), email);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.dreamToDreamResponseDto(dream))
                , HttpStatus.OK);
    }

    @GetMapping("/{dream-id}")
    public ResponseEntity getDream(@PathVariable("dream-id") @Positive long dreamId,
                                   Authentication authentication){
        String email = null;
        if (authentication != null) {
            email = (String) authentication.getPrincipal();
            Dream dream = dreamService.findDream(dreamId, email);
            return new ResponseEntity(new SingleResponseDto<>(mapper.dreamToDreamResponseDto(dream)), HttpStatus.OK);
        }else {
            Dream dream = dreamService.findDream(dreamId);
            return new ResponseEntity(new SingleResponseDto<>(mapper.dreamToDreamResponseDto(dream)), HttpStatus.OK);
        }
    }

    @GetMapping
    public ResponseEntity getDreams(@RequestParam(required = false) String dreamKeyword,
                                    @Positive @RequestParam int page,
                                    @Positive @RequestParam int size){
        if(dreamKeyword == null || dreamKeyword.isEmpty()){
            Page<Dream> pageDreams = dreamService.findAllDreams(page - 1, size);
            List<Dream> dreamList = pageDreams.getContent();
            return new ResponseEntity<>(
                    new MultiResponseDto<>(mapper.dreamsToDreamResponseDtos(dreamList), pageDreams),
                    HttpStatus.OK);
        }else{
            Page<Dream> pageDreams = dreamService.findDreams(dreamKeyword, page - 1, size);
            List<Dream> dreamList = pageDreams.getContent();
            return new ResponseEntity<>(
                    new MultiResponseDto<>(mapper.dreamsToDreamResponseDtos(dreamList), pageDreams),
                    HttpStatus.OK);
        }
    }

    @DeleteMapping("/{dream-id}")
    public ResponseEntity deleteDream(@PathVariable("dream-id") @Positive long dreamId,
                                      Authentication authentication){
        if (authentication == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        String email = (String) authentication.getPrincipal();
        dreamService.deleteDream(dreamId, email);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }



}
