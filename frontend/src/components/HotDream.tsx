import React from "react";

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
  
  type DreamResponse = {
    data: DreamData;
  };

  type JsonString = {
    json:string;
  }

const HotDream:React.FC<JsonString> = ({ json }) => {
    const parsedData: DreamResponse = JSON.parse(json);

    return (
        <section>
            <span>{parsedData.data.content}</span>
        </section>
    );
}

export default HotDream;