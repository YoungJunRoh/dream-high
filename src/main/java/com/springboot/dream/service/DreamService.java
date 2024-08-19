package com.springboot.dream.service;


import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.springboot.dream.dto.OpenAiRequest;
import com.springboot.dream.dto.OpenAiResponse;
import com.springboot.dream.entity.Dream;
import com.springboot.dream.entity.DreamKeyword;
import com.springboot.dream.repository.DreamRepository;
import com.springboot.exception.BusinessLogicException;
import com.springboot.exception.ExceptionCode;
import com.springboot.interpretation.entity.Interpretation;
import com.springboot.interpretation.entity.Interpretation_Mood_Keyword;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Transactional
@Service
public class DreamService {

    @Value("${openai.model}")
    private String model;

    @Value("${openai.api.url}")
    private String apiURL;

    @Autowired
    private RestTemplate template;

    private final ObjectMapper objectMapper = new ObjectMapper();

    private final DreamRepository dreamRepository;

    public DreamService(DreamRepository dreamRepository) {
        this.dreamRepository = dreamRepository;
    }

    public Dream createDream(Dream dream){

        Map<String, Object> chatResponse = responseChatGpt(dream.getContent());

        chatResponse.get("dream_keyword"); // List<String>

        List<DreamKeyword> dreamKeywords = new ArrayList<>();
        List<String> dreamString = (List<String>) chatResponse.get("dream_keyword");
        for(String keyword : dreamString){
            DreamKeyword dreamKeyword = new DreamKeyword();
            dreamKeyword.setName(keyword);
            dreamKeyword.setDream(dream);
            dreamKeywords.add(dreamKeyword);
        }
        dream.setDreamKeywords(dreamKeywords);
        Interpretation interpretation = new Interpretation();
        interpretation.setSummary((String) chatResponse.get("summary"));
        interpretation.setAdvice((String)chatResponse.get("advice"));
        Interpretation_Mood_Keyword keyword = new Interpretation_Mood_Keyword();
        keyword.setName((String)chatResponse.get("interpretation_mood_keyword"));
        interpretation.setKeyword(keyword);
        dream.setInterpretation(interpretation);

        Dream saveDream = dreamRepository.save(dream);

        return saveDream;
//        String systemPrompt = "너는 꿈 해몽가야. 그리고 고양이 냥체를 해줘. 응답을 줄 때는 summary, advice, interpretation_mood_keyword의 json으로 주는데 json이라고 표시는 하지마. UTF-8 인코딩을 지켜줘. 해몽 내용 3줄은 summary에 1줄 조언은 advice에 해몽 분위기 키워드는 1개를 interpretation_mood_keyword에 담아야 해";
//
//        OpenAiRequest request = new OpenAiRequest("gpt-4o", systemPrompt, dreamContent);
//        OpenAiResponse response = template.postForObject(apiURL, request, OpenAiResponse.class);
//
//        if (response != null && response.getChoices() != null && !response.getChoices().isEmpty()) {
//            String content = response.getChoices().get(0).getMessage().getContent();
//            Map<String, String> responseMap = parseResponse(content);
//
//            String summary = responseMap.get("summary");
//            String advice = responseMap.get("advice");
//
//            Interpretation interpretation = new Interpretation();
//            Interpretation_Mood_Keyword keyword = new Interpretation_Mood_Keyword();
//
//            keyword.setInterpretation(interpretation);
//            keyword.setName(responseMap.get("interpretation_mood_keyword"));
//
//            interpretation.setDream(dream);
//            interpretation.setAdvice(advice);
//            interpretation.setSummary(summary);
//            interpretation.setKeyword(keyword);
//
//            dream.setInterpretation(interpretation);
//            Dream saveDream = dreamRepository.save(dream);
//            return saveDream;
//        }
//        else{
//            return dream;
//        }
    }
    public Dream updateDream(Dream dream){
        Dream findDream = findDream(dream.getDreamId());

        Optional.ofNullable(dream.getDreamSecret())
                .ifPresent(dreamSecret -> findDream.setDreamSecret(dreamSecret));

        return dreamRepository.save(findDream);
    }

    public Dream findDream(long dreamId) {
        return findVerifiedDream(dreamId);
    }

    private Dream findVerifiedDream(long dreamId) {
        Optional<Dream> optionalOrder = dreamRepository.findById(dreamId);
        Dream findOrder =
                optionalOrder.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.DREAM_NOT_FOUND));
        return findOrder;
    }



    private Map<String, Object> parseResponse(String content) {
        Map<String, Object> responseMap = new HashMap<>();
        try {
            JsonNode rootNode = objectMapper.readTree(content);
            String summary = rootNode.path("summary").asText();
            String advice = rootNode.path("advice").asText();
            String interpretationMoodKeyword = rootNode.path("interpretation_mood_keyword").asText();

            // dream_keyword 디버깅
            List<String> dreamKeywords = new ArrayList<>();
            JsonNode dreamKeywordNode = rootNode.path("dream_keyword");
            if (dreamKeywordNode.isArray()) {
                for (JsonNode keywordNode : dreamKeywordNode) {
                    dreamKeywords.add(keywordNode.asText());
                    System.out.println("Parsed keyword: " + keywordNode.asText());
                }
            } else {
                System.out.println("dream_keyword is not an array or is missing.");
            }

            responseMap.put("summary", summary);
            responseMap.put("advice", advice);
            responseMap.put("interpretation_mood_keyword", interpretationMoodKeyword);
            responseMap.put("dream_keyword", dreamKeywords);
        } catch (Exception e) {
            responseMap.put("error", "Failed to parse response");
            e.printStackTrace();
        }
        return responseMap;
    }

    private Map<String, Object>responseChatGpt(String content){

        String systemPrompt = "너는 꿈 해몽가야. 그리고 고양이 냥체를 해줘. 이모티콘도 써야 해. 긍정적으로 말해줘.응답을 줄 때는 dream_keyword, summary, advice, interpretation_mood_keyword의 json으로 주는데 json이라고 표시는 하지마. UTF-8 인코딩을 지켜줘. 꿈 키워드는 2개 배열로 주는데 하나는 감정 하나는 사물 관련해서 dream_keyword에 담아서 줘 해몽 내용 3줄은 summary에 1줄 조언은 advice에 해몽 분위기 키워드(희망\n" +
                "성취\n" +
                "치유\n" +
                "기회\n" +
                "성장\n" +
                "평화\n" +
                "행복\n" +
                "새로운 시작\n" +
                "사랑\n" +
                "보호\n" +
                "조화\n" +
                "번영\n" +
                "용기\n" +
                "지혜\n" +
                "기쁨\n" +
                "행운)에서 1개를 interpretation_mood_keyword에 담아야 해";
        OpenAiRequest request = new OpenAiRequest("gpt-4o", systemPrompt, content);
        OpenAiResponse response = template.postForObject(apiURL, request, OpenAiResponse.class);

        if (response != null && response.getChoices() != null && !response.getChoices().isEmpty()) {
            String responseContent = response.getChoices().get(0).getMessage().getContent();
            Map<String, Object> responseMap = parseResponse(responseContent);
            return responseMap;
        }
        return null;
    }

}
