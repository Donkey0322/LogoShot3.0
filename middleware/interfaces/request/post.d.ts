export interface LogInRequest {
  email: string;
  password: string;
}
export interface SignUpRequest extends LogInRequest {}

interface search {
  userId: string | number;
  userType: string;
  searchKeywords: string;
  targetClasscodes: Array;
  targetColor: string;
  targetApplicant: string;
  targetStartTime: string;
  targetEndTime: string;
  targetDraftC: string;
  targetDraftE: string;
  targetDraftJ: string;
}

export interface ImageSearchRequest extends search {
  image: string;
  imageWidth: number;
  imageHeight: number;
  indicatorX: number;
  indicatorY: number;
  isOldImage: boolean;
}
export interface TextSearchRequest extends search {
  isSimShape: boolean;
  isSimSound: boolean;
}
export interface AddFavoriteFileRequest {}
export interface AddFavoriteRequest {}
