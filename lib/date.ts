import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat)

export function parseDate(date: string): Dayjs {
  console.log(date);
  return dayjs(date, 'YYYY-MM-DD', true);
}
