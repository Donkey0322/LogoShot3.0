/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/login": {
    post: operations["login_login_post"];
  };
  "/apple_login": {
    post: operations["login_apple_login_post"];
  };
  "/signin": {
    post: operations["add_account_signin_post"];
  };
  "/apple_signin": {
    post: operations["add_apple_account_apple_signin_post"];
  };
  "/account": {
    get: operations["get_user_info_account_get"];
  };
  "/account/edit-info": {
    patch: operations["edit_account_account_edit_info_patch"];
  };
  "/favorite": {
    post: operations["new_folder_favorite_post"];
  };
  "/favorite/{folder_id}": {
    put: operations["edit_folder_favorite__folder_id__put"];
    post: operations["add_logo_favorite__folder_id__post"];
    delete: operations["edit_folder_favorite__folder_id__delete"];
  };
  "/favorite/all": {
    get: operations["read_all_folders_favorite_all_get"];
  };
  "/favorite/folder/{folder_id}": {
    get: operations["read_folder_favorite_folder__folder_id__get"];
    delete: operations["delete_favorite_logo_favorite_folder__folder_id__delete"];
  };
  "/search/text": {
    post: operations["text_search_search_text_post"];
  };
  "/search/image": {
    post: operations["image_search_search_image_post"];
  };
  "/search/text_history": {
    get: operations["text_history_search_text_history_get"];
  };
  "/search/image_history": {
    get: operations["image_history_search_image_history_get"];
  };
  "/search/history_detail/{detail_id}": {
    get: operations["image_history_search_history_detail__detail_id__get"];
  };
  "/search/logo_detail/{appl_no}": {
    get: operations["logo_detail_search_logo_detail__appl_no__get"];
  };
}

export interface components {
  schemas: {
    /** AddAccountInput */
    AddAccountInput: {
      /** Username */
      username: string;
      /** Password */
      password: string;
      /** Email */
      email: string;
    };
    /** AddAppleAccountInput */
    AddAppleAccountInput: {
      /** Name */
      name: string;
      /** Token */
      token: string;
      /** Email */
      email: string;
    };
    /** AppleLoginInput */
    AppleLoginInput: {
      /** Email */
      email: string;
      /** Token */
      token: string;
    };
    /** AppleLoginOutput */
    AppleLoginOutput: {
      /** Username */
      username?: string;
      /** Name */
      name: string;
      /** Token */
      token: string;
    };
    /** EditFoldererInput */
    EditFoldererInput: {
      /** New Name */
      new_name: string;
    };
    /** EditUserInput */
    EditUserInput: {
      /** Image Data */
      image_data?: string;
      /** Old Password */
      old_password?: string;
      /** New Password */
      new_password?: string;
    };
    /** Folder */
    Folder: {
      /** Id */
      id: number;
      /** Folder Name */
      folder_name: string;
    };
    /** GetUserInfoOutput */
    GetUserInfoOutput: {
      /** Id */
      id: number;
      /** Username */
      username: string;
      /** Email */
      email: string;
      /** Photo */
      photo: string;
    };
    /** HTTPValidationError */
    HTTPValidationError: {
      /** Detail */
      detail?: components["schemas"]["ValidationError"][];
    };
    /** History */
    History: {
      /** Id */
      id: number;
      /**
       * Search Time
       * Format: date-time
       */
      search_time: string;
      /** Search Key Words */
      search_key_words: string;
      /** Image Path */
      image_path: string;
      /** Target Class Codes */
      target_class_codes: string;
      /** Target Color */
      target_color: string;
      /** Target Applicant */
      target_applicant: string;
    };
    /** HistoryDetail */
    HistoryDetail: {
      /** Id */
      id: number;
      /** User Id */
      user_id: number;
      /**
       * Search Time
       * Format: date-time
       */
      search_time: string;
      /** Search Key Words */
      search_key_words: string;
      /** Is Image Search */
      is_image_search: boolean;
      /** Is Sim Sound */
      is_sim_sound: boolean;
      /** Is Sim Shape */
      is_sim_shape: boolean;
      /** Target Draft C */
      target_draft_c: string;
      /** Target Draft E */
      target_draft_e: string;
      /** Target Draft J */
      target_draft_j: string;
      /** Target Class Codes */
      target_class_codes: string;
      /** Target Color */
      target_color: string;
      /** Target Applicant */
      target_applicant: string;
      /**
       * Target Start Time
       * Format: date
       */
      target_start_time: string;
      /**
       * Target End Time
       * Format: date
       */
      target_end_time: string;
      /** Image Path */
      image_path: string;
    };
    /** ImageSearchInput */
    ImageSearchInput: {
      /** Image Data */
      image_data: string;
      /**
       * Target Start Time
       * Format: date
       */
      target_start_time?: string;
      /**
       * Target End Time
       * Format: date
       */
      target_end_time?: string;
    };
    /** LoginInput */
    LoginInput: {
      /** Username */
      username: string;
      /** Password */
      password: string;
    };
    /** LoginOutput */
    LoginOutput: {
      /** Username */
      username: string;
      /** Token */
      token: string;
    };
    /** Logo */
    Logo: {
      /** Appl No */
      appl_no: string;
      /** Tmark Name */
      tmark_name: string;
      /** Tmark Image Url */
      tmark_image_url: string;
    };
    /** LogoDetail */
    LogoDetail: {
      /** Appl No */
      appl_no: string;
      /**
       * Appl Date
       * Format: date
       */
      appl_date: string;
      /** Tmark Name */
      tmark_name: string;
      /** Tmark Class Desc */
      tmark_class_desc: string;
      /** Tmark Image Url */
      tmark_image_url: string;
      /** Tmark Type Desc */
      tmark_type_desc: string;
      /** Tmark Color Desc */
      tmark_color_desc: string;
      /** Tmark Draft C */
      tmark_draft_c: string;
      /** Tmark Draft E */
      tmark_draft_e: string;
      /** Tmark Draft J */
      tmark_draft_j: string;
      /** Tmark Sign */
      tmark_sign: string;
      /** Word Description */
      word_description: string;
      /**
       * Receive Date
       * Format: date
       */
      receive_date: string;
      /** Cns Components */
      CNS_COMPONENTS: unknown[];
      /** Applicant Chinese Name */
      applicant_chinese_name: string;
      /** Applicant English Name */
      applicant_english_name: string;
      /** Applicant Japanese Name */
      applicant_japanese_name: string;
      /** Applicant Address */
      applicant_address: string;
      /** Applicant Country Code */
      applicant_country_code: string;
      /** Applicant Chinese Country Name */
      applicant_chinese_country_name: string;
    };
    /** TextSearchInput */
    TextSearchInput: {
      /** Search Key Words */
      search_key_words: string;
      /** Is Sim Sound */
      is_sim_sound: boolean;
      /** Is Sim Shape */
      is_sim_shape: boolean;
      /**
       * Target Draft C
       * @default
       */
      target_draft_c?: string;
      /**
       * Target Draft E
       * @default
       */
      target_draft_e?: string;
      /**
       * Target Draft J
       * @default
       */
      target_draft_j?: string;
      /**
       * Target Class Codes
       * @default []
       */
      target_class_codes?: unknown[];
      /**
       * Target Color
       * @default
       */
      target_color?: string;
      /**
       * Target Applicant
       * @default
       */
      target_applicant?: string;
      /**
       * Target Start Time
       * @default
       */
      target_start_time?: string;
      /**
       * Target End Time
       * @default
       */
      target_end_time?: string;
    };
    /** ValidationError */
    ValidationError: {
      /** Location */
      loc: (Partial<string> & Partial<number>)[];
      /** Message */
      msg: string;
      /** Error Type */
      type: string;
    };
  };
}

export interface operations {
  login_login_post: {
    parameters: {
      header: {
        "auth-token"?: string;
      };
    };
    responses: {
      /** Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["LoginOutput"];
        };
      };
      /** Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["LoginInput"];
      };
    };
  };
  login_apple_login_post: {
    parameters: {
      header: {
        "auth-token"?: string;
      };
    };
    responses: {
      /** Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["AppleLoginOutput"];
        };
      };
      /** Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["AppleLoginInput"];
      };
    };
  };
  add_account_signin_post: {
    parameters: {
      header: {
        "auth-token"?: string;
      };
    };
    responses: {
      /** Successful Response */
      200: {
        content: {
          "application/json": number;
        };
      };
      /** Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["AddAccountInput"];
      };
    };
  };
  add_apple_account_apple_signin_post: {
    parameters: {
      header: {
        "auth-token"?: string;
      };
    };
    responses: {
      /** Successful Response */
      200: {
        content: {
          "application/json": number;
        };
      };
      /** Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["AddAppleAccountInput"];
      };
    };
  };
  get_user_info_account_get: {
    parameters: {
      header: {
        "auth-token"?: string;
      };
    };
    responses: {
      /** Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["GetUserInfoOutput"];
        };
      };
      /** Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  edit_account_account_edit_info_patch: {
    parameters: {
      header: {
        "auth-token"?: string;
      };
    };
    responses: {
      /** Successful Response */
      200: {
        content: {
          "application/json": unknown;
        };
      };
      /** Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["EditUserInput"];
      };
    };
  };
  new_folder_favorite_post: {
    parameters: {
      query: {
        folder_name: string;
      };
      header: {
        "auth-token"?: string;
      };
    };
    responses: {
      /** Successful Response */
      200: {
        content: {
          "application/json": unknown;
        };
      };
      /** Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  edit_folder_favorite__folder_id__put: {
    parameters: {
      path: {
        folder_id: number;
      };
      header: {
        "auth-token"?: string;
      };
    };
    responses: {
      /** Successful Response */
      200: {
        content: {
          "application/json": unknown;
        };
      };
      /** Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["EditFoldererInput"];
      };
    };
  };
  add_logo_favorite__folder_id__post: {
    parameters: {
      path: {
        folder_id: number;
      };
      query: {
        appl_no: string;
      };
      header: {
        "auth-token"?: string;
      };
    };
    responses: {
      /** Successful Response */
      200: {
        content: {
          "application/json": unknown;
        };
      };
      /** Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  edit_folder_favorite__folder_id__delete: {
    parameters: {
      path: {
        folder_id: number;
      };
      header: {
        "auth-token"?: string;
      };
    };
    responses: {
      /** Successful Response */
      200: {
        content: {
          "application/json": unknown;
        };
      };
      /** Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  read_all_folders_favorite_all_get: {
    parameters: {
      header: {
        "auth-token"?: string;
      };
    };
    responses: {
      /** Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["Folder"][];
        };
      };
      /** Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  read_folder_favorite_folder__folder_id__get: {
    parameters: {
      path: {
        folder_id: number;
      };
      header: {
        "auth-token"?: string;
      };
    };
    responses: {
      /** Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["Logo"][];
        };
      };
      /** Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  delete_favorite_logo_favorite_folder__folder_id__delete: {
    parameters: {
      path: {
        folder_id: number;
      };
      query: {
        appl_no: string;
      };
      header: {
        "auth-token"?: string;
      };
    };
    responses: {
      /** Successful Response */
      200: {
        content: {
          "application/json": unknown;
        };
      };
      /** Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  text_search_search_text_post: {
    parameters: {
      header: {
        "auth-token"?: string;
      };
    };
    responses: {
      /** Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["Logo"][];
        };
      };
      /** Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["TextSearchInput"];
      };
    };
  };
  image_search_search_image_post: {
    parameters: {
      header: {
        "auth-token"?: string;
      };
    };
    responses: {
      /** Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["Logo"][];
        };
      };
      /** Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["ImageSearchInput"];
      };
    };
  };
  text_history_search_text_history_get: {
    parameters: {
      header: {
        "auth-token"?: string;
      };
    };
    responses: {
      /** Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["History"][];
        };
      };
      /** Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  image_history_search_image_history_get: {
    parameters: {
      header: {
        "auth-token"?: string;
      };
    };
    responses: {
      /** Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["History"][];
        };
      };
      /** Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  image_history_search_history_detail__detail_id__get: {
    parameters: {
      path: {
        detail_id: number;
      };
      header: {
        "auth-token"?: string;
      };
    };
    responses: {
      /** Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["HistoryDetail"];
        };
      };
      /** Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  logo_detail_search_logo_detail__appl_no__get: {
    parameters: {
      path: {
        appl_no: string;
      };
      header: {
        "auth-token"?: string;
      };
    };
    responses: {
      /** Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["LogoDetail"];
        };
      };
      /** Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
}

export interface external {}
