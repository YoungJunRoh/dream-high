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

// 페이지네이션에 대한 인터페이스
interface PageInfo {
    page: number;
    size: number;
    totalPage: number;
    totalElements: number;
}

// getdreams 에 대한 인터페이스
export interface DreamData { // boardList에서 필요함.
    dreamId: number;
    memberId: number;
    content: string;
    dreamStatus: string;
    dreamSecret: string;
    createdAt: string;
    modifiedAt: string | null;
    viewCount: number;
    likeCount: number;
    dreamKeywords: DreamKeyword[];
    interpretationResponse: InterpretationResponse;
    comments: any[]; // 댓글이 있는 경우, 적절한 타입을 지정해 주세요
}

interface Data {
    config: {};
    data: DreamData;
    headers: {};
    request: {};
    status: number;
    statusText: string
}

interface Datas {
    config: {};
    data: DreamData[];
    pageInfo: PageInfo;
    headers: {};
    request: {};
    status: number;
    statusText: string
}

export interface PostApiResponse {
    data: DreamData;
}

export interface GetApiResponse {
    data: Data;
}

export interface GetsApiResponse {
    data: Datas;
}
