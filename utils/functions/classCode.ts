import { CLASS_CODE } from '@/constant';

export function parseClassCode(classCodeWithBracket: string) {
  return classCodeWithBracket.slice(1, -1).split(',');
}

export function getClassCode(classCodeWithBracket: string) {
  return classCodeWithBracket
    .slice(1, -1)
    .split(',')
    .map((m) => CLASS_CODE.find((code) => code.value === m));
}
