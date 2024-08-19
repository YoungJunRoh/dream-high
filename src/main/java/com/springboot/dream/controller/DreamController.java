package com.springboot.dream.controller;

import com.springboot.dream.dto.DreamDto;
import com.springboot.dream.dto.OpenAiRequest;
import com.springboot.dream.dto.OpenAiResponse;
import com.springboot.dream.entity.Dream;
import com.springboot.dream.mapper.DreamMapper;
import com.springboot.dream.service.DreamService;
import com.springboot.response.SingleResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.Map;

@RestController
@RequestMapping("/dream")
@Validated
@Slf4j
public class DreamController {

    private final DreamService dreamService;
    private final DreamMapper mapper;

    public DreamController(DreamService dreamService, DreamMapper mapper) {
        this.dreamService = dreamService;
        this.mapper = mapper;
    }

    @PostMapping()
    public ResponseEntity postDream(@Valid @RequestBody DreamDto.Post dreamPost){

        Dream dream = dreamService.createDream(mapper.dreamPostToDream(dreamPost));

        DreamDto.Response response = mapper.dreamToDreamResponseDto(dream);


        return new ResponseEntity<>(new SingleResponseDto<>(response) , HttpStatus.OK);
    }

    @PatchMapping("/{dream-id}")
    public ResponseEntity patchDream(@PathVariable("dream-id") @Positive long dreamId,
                                     @Valid @RequestBody DreamDto.Patch dreamPatchDto) {
        dreamPatchDto.setDreamId(dreamId);
        Dream dream =
                dreamService.updateDream(mapper.dreamPatchDtoToDream(dreamPatchDto));

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.dreamToDreamResponseDto(dream))
                , HttpStatus.OK);
    }

    @GetMapping("/{dream-id}")
    public ResponseEntity getDream(@PathVariable("dream-id") @Positive long dreamId){
        Dream dream = dreamService.findDream(dreamId);
        return new ResponseEntity(new SingleResponseDto<>(mapper.dreamToDreamResponseDto(dream)), HttpStatus.OK);
    }


}
