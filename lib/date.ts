import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat)

export function parseDate(date: string): Dayjs {
  return dayjs(date, 'YYYY-MM-DD', true);
}
