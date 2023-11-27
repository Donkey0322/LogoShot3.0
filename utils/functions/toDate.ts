import { format } from 'date-fns';

export default function toDateString(date?: Date) {
  if (!date) return undefined;
  else return format(date, 'yyyy/MM/dd');
}
