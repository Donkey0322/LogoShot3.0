import api from "@/libs/api";

export const textSearch = api.path("/search/text").method("post").create();
