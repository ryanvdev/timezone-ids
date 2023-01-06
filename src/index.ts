import { TimeZoneId } from './types';
import { timeZoneIds } from './timezoneids';

export function isValidTimeZoneId(id: unknown): id is TimeZoneId {
    if (typeof id !== 'string') return false;

    return timeZoneIds.includes(id as any);
}

export { timeZoneIds };
export type { TimeZoneId };
