export interface DataType {
  keywords: string;
  classcodes: string[];
  color: string;
  applicant: string;
  startTime: Date;
  endTime: Date;
  chinese: string;
  english: string;
  japan: string;
}

export const initData: DataType = {
  keywords: '海底撈',
  classcodes: [],
  color: '',
  applicant: '',
  startTime: new Date(),
  endTime: new Date(),
  chinese: '',
  english: '',
  japan: '',
};
