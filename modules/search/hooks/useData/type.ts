export interface DataType {
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
  classcodes: [],
  color: '',
  applicant: '',
  startTime: new Date(),
  endTime: new Date(),
  chinese: '',
  english: '',
  japan: '',
};
