// 개별 키워드에 대한 인터페이스
interface DreamKeyword {
    dreamKeywordId: number;
    name: string;
    dreamId: number;
}

// 해석의 키워드에 대한 인터페이스
interface InterpretationKeyword {
    interpretationMoodKeywordId: number;
    name: string;
}

// 해석 응답에 대한 인터페이스
interface InterpretationResponse {
    interpretationId: number;
    content: string;
    summary: string;
    advice: string;
    keyword: InterpretationKeyword;
}

// 꿈 데이터에 대한 인터페이스
interface DreamData {
    dreamId: number;
    memberId: number;
    content: string;
    dreamStatus: string;
    dreamSecret: string;
    createdAt: string;
    modifiedAt: string | null;
    dreamKeywords: DreamKeyword[];
    interpretationResponse: InterpretationResponse;
    comments: any[]; // 댓글이 있는 경우, 적절한 타입을 지정해 주세요
}

// 페이지네이션에 대한 인터페이스
interface PageInfo {
    page:number;
    size:number;
    totalPage:number;
    totalElements:number;
}

// getdreams 에 대한 인터페이스
interface GetDreams {
    dreamId: number;
    memberId: number;
    content: string;
    dreamStatus: string;
    dreamSecret: string;
    createdAt: string;
    modifiedAt: string | null;
    dreamKeywords: DreamKeyword[];
    interpretationResponse: InterpretationResponse;
    comments: any[]; // 댓글이 있는 경우, 적절한 타입을 지정해 주세요
}

export interface PostDreamResponse {
    data: DreamData;
}

export interface GetDreamResponse {
    data: DreamData;
}

export interface GetDreamsResponse {
    data: GetDreams[];
    pageInfo: PageInfo;
}