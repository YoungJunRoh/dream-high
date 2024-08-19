package com.springboot.dream.mapper;

import com.springboot.dream.dto.DreamDto;
import com.springboot.dream.dto.DreamKeywordResponseDto;
import com.springboot.dream.entity.Dream;
import com.springboot.dream.entity.DreamKeyword;
import com.springboot.interpretation.dto.InterpretationResponseDto;
import com.springboot.interpretation.dto.Interpretation_Mood_Keyword_ResponseDto;
import com.springboot.interpretation.entity.Interpretation;
import com.springboot.interpretation.entity.Interpretation_Mood_Keyword;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface DreamMapper {

    Dream dreamPatchDtoToDream(DreamDto.Patch dreamPatchDto);
//    default Dream dreamPatchToDream(DreamDto.Patch requestBody){
//        Dream dream = new Dream();
//
//        dream.setDreamId(requestBody.getDreamId());
//        dream.setDreamSecret(requestBody.getDreamSecret());
//
//        return dream;
//    }

    default Dream dreamPostToDream(DreamDto.Post requestBody){
        Dream dream = new Dream();
        dream.setContent(requestBody.getPrompt());
        return dream;
    }
    default DreamDto.Response dreamToDreamResponseDto(Dream dream){
        DreamDto.Response response = new DreamDto.Response();
        response.setContent(dream.getContent());
        response.setDreamId(dream.getDreamId());
        response.setDreamStatus(dream.getDreamStatus());
        response.setDreamSecret(dream.getDreamSecret());
        response.setDreamKeywords(dreamKeywordListToResponseDtos(dream.getDreamKeywords()));

        response.setInterpretationResponse(interpretationToResponseDto(dream.getInterpretation()));

        return response;
    }
    default List<DreamKeywordResponseDto> dreamKeywordListToResponseDtos(List<DreamKeyword> dreamKeywords){
        List<DreamKeywordResponseDto> responseDtos = new ArrayList<>();

        return dreamKeywords.stream()
                .map(dreamKeyword -> dreamKeywordToResponseDto(dreamKeyword)).collect(Collectors.toList());
    }

    default DreamKeywordResponseDto dreamKeywordToResponseDto(DreamKeyword dreamKeyword){
        DreamKeywordResponseDto response = new DreamKeywordResponseDto();
        response.setDreamKeywordId(dreamKeyword.getDreamKeywordId());
        response.setName(dreamKeyword.getName());
        response.setDreamId(dreamKeyword.getDream().getDreamId());

        return response;
    }

    default InterpretationResponseDto interpretationToResponseDto (Interpretation interpretation){
        InterpretationResponseDto interpretationResponseDto = new InterpretationResponseDto();
        Dream dream = interpretation.getDream();
        interpretationResponseDto.setInterpretationId(dream.getInterpretation().getInterpretationId());
        interpretationResponseDto.setSummary(dream.getInterpretation().getSummary());
        interpretationResponseDto.setAdvice(dream.getInterpretation().getAdvice());
        interpretationResponseDto.setKeyword(moodKeywordToResponseDto(dream.getInterpretation().getKeyword()));

        return interpretationResponseDto;
    }

    default Interpretation_Mood_Keyword_ResponseDto moodKeywordToResponseDto(Interpretation_Mood_Keyword moodKeyword){
        Interpretation_Mood_Keyword_ResponseDto responseDto = new Interpretation_Mood_Keyword_ResponseDto();
        Interpretation interpretation = moodKeyword.getInterpretation();
        responseDto.setInterpretationMoodKeywordId(interpretation.getKeyword().getMoodKeywordId());
        responseDto.setName(interpretation.getKeyword().getName());

        return responseDto;
    }


}
