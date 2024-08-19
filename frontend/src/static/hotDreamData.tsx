// hotDreamData의 타입을 정의합니다.
type DreamKeyword = {
    dreamKeywordId: number;
    name: string;
  };
  
  type Interpretation = {
    interpretationId: number;
    content: string;
    summary: string;
    advice: string;
    dream_id: number;
    created_at: string;
  };
  
  type Comment = {
    commentId: number;
    content: string;
    memberId: number;
    dreamId: number;
    commentStatus: string;
    createdAt: string;
    modifiedAt: string;
  };
  
  type DreamData = {
    dreamId: number;
    content: string;
    createdAt: string;
    modifiedAt: string;
    memberId: number;
    dreamStatus: string;
    secret: string;
    viewCount: number;
    likeCount: number;
    dreamKeyword: DreamKeyword[];
    interpretation: Interpretation[];
    comments: Comment[];
  };
  
  // hotDreamData 배열을 정의합니다.
  const hotDreamDatas: { data: DreamData }[] = [
    {
      data: {
        dreamId: 1,
        content: "나 절벽에서 떨어졌어. 그러다 똥을 밟았어. 그게 돼지똥이었어. 정말 최악이야. 오늘 기분이 참 이상해, 이거 해몽을 좀 해줘",
        createdAt: "2024-08-12T15:30:00Z",
        modifiedAt: "2024-08-12T15:30:00Z",
        memberId: 1,
        dreamStatus: "DREAM_ACTIVE",
        secret: "Secret",
        viewCount: 1,
        likeCount: 1,
        dreamKeyword: [
          {
            dreamKeywordId: 1,
            name: "Sad",
          },
          {
            dreamKeywordId: 2,
            name: "Ocean",
          },
        ],
        interpretation: [
          {
            interpretationId: 1,
            content: "절벽에서 떨어지는 꿈은 대개 불안감이나 두려움을 나타내는 경우가 많아. 이는 현재 생활에서 직면하고 있는 문제나 도전이 너무 커서 통제할 수 없다고 느끼는 상황을 의미할 수 있다냥. 절벽에서 떨어지는 건 자신의 상황이 예상보다 더 심각해질까 봐 걱정하는 마음을 반영할 수 있어. 그러나 이런 꿈은 때때로 새로운 시작이나 변화의 기회를 암시하기도 해. 단순히 두려움을 넘어서 새로운 가능성을 찾아보라는 메시지일 수 있다옹.",
            summary: "현재 직면한 문제나 도전에 대한 두려움이나 불안감을 나타낼 수 있다냥. 예상보다 상황이 심각해질까 걱정하는 마음이 반영될 수 있다옹. 새로운 시작이나 변화의 기회를 암시할 수도 있다냥.",
            advice: "두려움을 넘어서 새로운 가능성을 모색하고, 문제를 해결할 방법을 찾아보는 게 좋다옹.",
            dream_id: 1,
            created_at: "2024-08-12T15:45:00Z",
          },
        ],
        comments: [
          {
            commentId: 1,
            content: "This is an interesting dream!",
            memberId: 1,
            dreamId: 1,
            commentStatus: "COMMENT_ACTIVE",
            createdAt: "2024-08-13T10:15:00",
            modifiedAt: "2024-08-13T10:15:00",
          },
          {
            commentId: 2,
            content: "I had a similar dream last week!",
            memberId: 1,
            dreamId: 1,
            commentStatus: "COMMENT_ACTIVE",
            createdAt: "2024-08-12T14:30:00",
            modifiedAt: "2024-08-13T09:00:00",
          },
        ],
      },
    },
  ];
  
  export default hotDreamDatas;
  