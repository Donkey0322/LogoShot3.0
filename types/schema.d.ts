/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/Image_Search/image": {
    post: operations["post_image_search"];
  };
  "/account": {
    delete: operations["delete_account"];
  };
  "/account/firebase": {
    delete: operations["delete_firebase_account"];
  };
  "/account/history": {
    get: operations["get_history"];
  };
  "/account/login": {
    post: operations["post_login"];
  };
  "/account/signup": {
    post: operations["post_signup"];
  };
  "/favorite/folder": {
    get: operations["get_favorite_folder"];
    put: operations["put_favorite_folder"];
    post: operations["post_favorite_folder"];
    delete: operations["delete_favorite_folder"];
  };
  "/favorite/folder/{folderId}/file": {
    get: operations["get_favorite_file"];
    post: operations["post_favorite_file"];
    delete: operations["delete_favorite_file"];
    parameters: {
      path: {
        folderId: number;
      };
    };
  };
  "/search/result/{resultId}": {
    get: operations["get_result"];
    parameters: {
      path: {
        resultId: number;
      };
    };
  };
  "/search/text": {
    post: operations["post_text_search"];
  };
}

export interface definitions {
  LoginRequest: {
    /**
     * @description 帳號 / 信箱
     * @example a0909182197@gmail.com
     */
    email: string;
    password: string;
  };
  FormattedLoginResponse: {
    data?: definitions["LoginResponse"];
    error?: string;
    success?: boolean;
  };
  LoginResponse: {
    userId?: string;
    email?: string;
  };
  SignupRequest: {
    /**
     * @description 帳號 / 信箱
     * @example a0909182197@gmail.com
     */
    email: string;
    password: string;
  };
  DeleteFirebaseAccountRequest: {
    /**
     * @description 帳號 / 信箱
     * @example a0909182197@gmail.com
     */
    email: string;
    password: string;
  };
  DeleteAccountRequest: {
    userId: string;
    userType: string;
  };
  DeleteFavoriteFolder: {
    folderId?: number;
  };
  AddFavoriteFolderRequest: {
    /** @description User ID */
    userId: string;
    /**
     * @description User Type
     * @example apple
     * @enum {string}
     */
    userType: "apple" | "general" | "facebook" | "firebase";
    folderName?: string;
  };
  RenameFavoriteFolder: {
    folderId?: number;
    folderName?: string;
  };
  FormattedFavoriteFolderResponse: {
    data?: definitions["FavoriteFolderResponse"];
    error?: string;
    success?: boolean;
  };
  FavoriteFolderResponse: {
    fileId?: number;
    fileName?: string;
  };
  FormattedReadFavoriteFolderResponse: {
    data?: definitions["ReadFavoriteFolderResponse"][];
    error?: string;
    success?: boolean;
  };
  ReadFavoriteFolderResponse: {
    fileId?: number;
    fileName?: string;
  };
  DeleteFavoriteFile: {
    esId?: string;
  };
  AddFavoriteFile: {
    esId?: string;
  };
  TextSearchRequest: {
    keywords?: string;
    isSound?: boolean;
    isShape?: boolean;
    classcodes?: number[];
    color?: string;
    applicant?: string;
    /** Format: date */
    startTime?: string;
    /** Format: date */
    endTime?: string;
    chinese?: string;
    english?: string;
    japan?: string;
  };
  FormattedTextSearchResponse: {
    data?: definitions["TextSearchResponse"];
    error?: string;
    success?: boolean;
  };
  TextSearchResponse: {
    results?: string[][];
  };
  ImageSearchRequest: {
    base64_img?: string;
    indicatorX?: number;
    indicatorY?: number;
  };
  FormattedImageSearchResponse: {
    data?: definitions["ImageSearchResponse"];
    error?: string;
    success?: boolean;
  };
  ImageSearchResponse: {
    results?: string[][];
  };
}

export interface responses {
  /** When a mask can't be parsed */
  ParseError: unknown;
  /** When any error occurs on mask */
  MaskError: unknown;
}

export interface operations {
  post_image_search: {
    parameters: {
      body: {
        payload: definitions["ImageSearchRequest"];
      };
      header: {
        /** An optional fields mask */
        "X-Fields"?: string;
      };
    };
    responses: {
      /** Success */
      200: {
        schema: definitions["FormattedImageSearchResponse"];
      };
    };
  };
  delete_account: {
    parameters: {
      body: {
        payload: definitions["DeleteAccountRequest"];
      };
    };
    responses: {
      /** Success */
      200: unknown;
    };
  };
  delete_firebase_account: {
    parameters: {
      body: {
        payload: definitions["DeleteFirebaseAccountRequest"];
      };
    };
    responses: {
      /** Success */
      200: unknown;
    };
  };
  get_history: {
    parameters: {
      query: {
        /** User ID */
        userId: string;
        /** User Type */
        userType: "apple" | "general" | "facebook" | "firebase";
        /** TODO: what is this for? */
        isImageSearch: boolean;
      };
    };
    responses: {
      /** Success */
      200: unknown;
    };
  };
  post_login: {
    parameters: {
      body: {
        payload: definitions["LoginRequest"];
      };
      header: {
        /** An optional fields mask */
        "X-Fields"?: string;
      };
    };
    responses: {
      /** Success */
      200: {
        schema: definitions["FormattedLoginResponse"];
      };
    };
  };
  post_signup: {
    parameters: {
      body: {
        payload: definitions["SignupRequest"];
      };
      header: {
        /** An optional fields mask */
        "X-Fields"?: string;
      };
    };
    responses: {
      /** Success */
      200: {
        schema: definitions["FormattedLoginResponse"];
      };
    };
  };
  get_favorite_folder: {
    parameters: {
      query: {
        /** User ID */
        userId: string;
        /** User Type */
        userType: "apple" | "general" | "facebook" | "firebase";
      };
      header: {
        /** An optional fields mask */
        "X-Fields"?: string;
      };
    };
    responses: {
      /** Success */
      200: {
        schema: definitions["FormattedReadFavoriteFolderResponse"];
      };
    };
  };
  put_favorite_folder: {
    parameters: {
      body: {
        payload: definitions["RenameFavoriteFolder"];
      };
      header: {
        /** An optional fields mask */
        "X-Fields"?: string;
      };
    };
    responses: {
      /** Success */
      200: {
        schema: definitions["FormattedFavoriteFolderResponse"];
      };
    };
  };
  post_favorite_folder: {
    parameters: {
      body: {
        payload: definitions["AddFavoriteFolderRequest"];
      };
      header: {
        /** An optional fields mask */
        "X-Fields"?: string;
      };
    };
    responses: {
      /** Success */
      200: {
        schema: definitions["FormattedFavoriteFolderResponse"];
      };
    };
  };
  delete_favorite_folder: {
    parameters: {
      body: {
        payload: definitions["DeleteFavoriteFolder"];
      };
    };
    responses: {
      /** Success */
      200: unknown;
    };
  };
  get_favorite_file: {
    parameters: {
      path: {
        folderId: number;
      };
    };
    responses: {
      /** Success */
      200: unknown;
    };
  };
  post_favorite_file: {
    parameters: {
      path: {
        folderId: number;
      };
      body: {
        payload: definitions["AddFavoriteFile"];
      };
    };
    responses: {
      /** Success */
      200: unknown;
    };
  };
  delete_favorite_file: {
    parameters: {
      path: {
        folderId: number;
      };
      body: {
        payload: definitions["DeleteFavoriteFile"];
      };
    };
    responses: {
      /** Success */
      200: unknown;
    };
  };
  get_result: {
    parameters: {
      path: {
        resultId: number;
      };
    };
    responses: {
      /** Success */
      200: unknown;
    };
  };
  post_text_search: {
    parameters: {
      body: {
        payload: definitions["TextSearchRequest"];
      };
      header: {
        /** An optional fields mask */
        "X-Fields"?: string;
      };
    };
    responses: {
      /** Success */
      200: {
        schema: definitions["FormattedTextSearchResponse"];
      };
    };
  };
}

export interface external {}
