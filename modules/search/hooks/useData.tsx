import { useEffect, useState } from "react";

export interface ImageDataType {
  searchKeywords: string;
  targetClasscodes: string[];
  targetColor: string;
  targetApplicant: string;
  targetStartTime: Date;
  targetEndTime: Date;
  targetDraftC: string;
  targetDraftE: string;
  targetDraftJ: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  indicatorX: number;
  indicatorY: number;
  isOldImage: boolean;
}

export default function useData(mode: "image" | "text" = "image") {
  const [data, setData] = useState<ImageDataType>({
    searchKeywords: "",
    targetClasscodes: [],
    targetColor: "",
    targetApplicant: "",
    targetStartTime: new Date(),
    targetEndTime: new Date(),
    targetDraftC: "",
    targetDraftE: "",
    targetDraftJ: "",
    image: "",
    imageWidth: 0,
    imageHeight: 0,
    indicatorX: 0,
    indicatorY: 0,
    isOldImage: true,
  });
  const [advance, setAdvance] = useState(false);
  useEffect(() => {
    if (!advance) {
      setData((prev) => ({
        ...prev,
        targetDraftC: "",
        targetDraftE: "",
        targetDraftJ: "",
      }));
    }
  }, [advance]);

  const handleDataChange =
    (name: keyof typeof data) => (value?: (typeof data)[keyof typeof data]) => {
      setData((prev) => ({ ...prev, [name]: value }));
    };

  const setIndicator = (x: number, y: number) => {
    setData((prev) => ({
      ...prev,
      indicatorX: x,
      indicatorY: y,
    }));
  };

  return { data, handleDataChange, setIndicator, advance, setAdvance };
}
