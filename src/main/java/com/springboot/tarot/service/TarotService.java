package com.springboot.tarot.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.springboot.dream.dto.OpenAiRequest;
import com.springboot.dream.dto.OpenAiResponse;
import com.springboot.dream.entity.Dream;
import com.springboot.tarot.dto.TarotDto;
import com.springboot.tarot.entity.Tarot;
import com.springboot.tarot.entity.TarotCategory;
import com.springboot.tarot.repository.TarotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Transactional
@Service
public class TarotService {
    @Value("${openai.model}")
    private String model;

    @Value("${openai.api.url}")
    private String apiURL;

    @Autowired
    private RestTemplate template;

    @Autowired
    private TarotRepository tarotRepository;

    private final ObjectMapper objectMapper = new ObjectMapper();


    @Transactional
    public TarotDto.Response playTarot(TarotCategory category) {
        // 카테고리랑 랜덤카드 3개 뽑아서 GPT에 건네줌 > 결과 리턴
        //랜덤 숫자 만들어서 그걸로 findById()에 넣어서 카드 3개 출력

        // 랜덤으로 타로 카드 3장 뽑기
        Tarot firstCard = drawRandomTarotCard();
        Tarot secondCard = drawRandomTarotCard();
        Tarot thirdCard = drawRandomTarotCard();

        // 카드의 의미를 GPT에 전달하여 해석을 받음
        Map<String, Object> chatResponse = responseChatGpt(category.getCategoryName());

        // 응답 데이터를 Response DTO에 담아 반환
        TarotDto.Response response = new TarotDto.Response();
        response.setCategory(category.getCategoryName());
        response.setFirstCardMeaning(firstCard.getMeaning());
        response.setSecondCardMeaning(secondCard.getMeaning());
        response.setThirdCardMeaning(thirdCard.getMeaning());
        response.setResult((String) chatResponse.get("result"));

        return response;
    }

    private Tarot drawRandomTarotCard() {
        Random random = new Random();
        long randomId = random.nextInt((int) tarotRepository.count()) + 1;
        Optional<Tarot> tarotCard = tarotRepository.findById(randomId);
        return tarotCard.orElseThrow(() -> new IllegalArgumentException("Invalid Tarot ID: " + randomId));
    }


    private Map<String, Object> responseChatGpt(String content) {
        String systemPrompt = "너는 타로술사야. 그리고 고양이 냥체를 해줘. 이모티콘도 써야 해. 긍정적으로 말해줘." +
                "응답을 줄 때는 category, firstCardMeaning, secondCardMeaning, thirdCardMeaning, result의 json으로 주는데 json이라고 표시는 하지마. " +
                "TF-8 인코딩을 지켜줘.  category는 입력된 대로 출력해주고, firstCardMeaning와\n" +
                "secondCardMeaning,\n" + "thirdCardMeaning\n에 각각 카드의 의미를 의미담아서 줘. " +
                "category의 내용에 따른  (예를 들어 category가 연애면 연애타로를 봐주는거지) " +
                "firstCardMeaning와 secondCardMeaning와 thirdCardMeaning의 각각 의미를 합쳐서 " +
                "그에 따른 타로 해석을 result에 담아줘(3줄에서 10줄 사이로 해줘). " +
                "해석 내용은 result에 넣어줘";


        OpenAiRequest request = new OpenAiRequest("gpt-4o", systemPrompt, content);
        OpenAiResponse response = template.postForObject(apiURL, request, OpenAiResponse.class);

        if (response != null && response.getChoices() != null && !response.getChoices().isEmpty()) {
            String responseContent = response.getChoices().get(0).getMessage().getContent();
             return  parseResponse(responseContent);
        }
        return null;
    }

    private Map<String, Object> parseResponse(String content) {
        Map<String, Object> responseMap = new HashMap<>();
        try {
            JsonNode rootNode = objectMapper.readTree(content);
            responseMap.put("tarotCategory", rootNode.path("category").asText());
            responseMap.put("firstCardMeaning", rootNode.path("firstCardMeaning").asText());
            responseMap.put("secondCardMeaning", rootNode.path("secondCardMeaning").asText());
            responseMap.put("thirdCardMeaning", rootNode.path("thirdCardMeaning").asText());
            responseMap.put("result", rootNode.path("result").asText());
        } catch (Exception e) {
            responseMap.put("error", "Failed to parse response");
            e.printStackTrace();
        }
        return responseMap;
    }
    }


