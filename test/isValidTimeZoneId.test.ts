import { TimeZoneId, isValidTimeZoneId, timeZoneIds } from '../lib';

describe('isValidTimeZoneId', () => {
    test('should be true', () => {
        const timezone: TimeZoneId = 'Africa/Abidjan';
        expect(isValidTimeZoneId(timezone)).toBe(true);
    });

    test('should be false', () => {
        const timezone: string = 'Invalid TimeZone...';
        expect(isValidTimeZoneId(timezone)).toBe(false);
    });
});

describe('timeZoneIds', () => {
    test('should be true', () => {
        expect(Object.isFrozen(timeZoneIds)).toBe(true);
    });

    test('should be true', () => {
        expect(timeZoneIds.length > 100).toBe(true);
    });

    test('should be true', () => {
        expect(timeZoneIds.includes('Pacific/Tongatapu')).toBe(true);
    });
});
