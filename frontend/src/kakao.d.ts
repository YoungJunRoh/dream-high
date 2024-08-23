interface Window {
  Kakao: Kakao;
}

interface Kakao {
  init(appKey?: string): void;
  isInitialized(): boolean;
  Share: {
    sendDefault(params: {
      objectType: string;
      content: {
        title: string;
        description: string;
        imageUrl: string;
        link: {
          mobileWebUrl: string;
          webUrl: string;
        };
      };
    }); void;
  };
}