import { CLASS_CODE } from '@/constant';

export function getClassCode(classCodeWithBracket: string[]) {
  return classCodeWithBracket.map((m) => CLASS_CODE.find((code) => code.value === m));
}
