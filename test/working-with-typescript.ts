import { TimeZoneId, isValidTimeZoneId } from '../lib';

const main = async () => {
    const timezoneId: string = 'Africa/Accra';

    if (isValidTimeZoneId(timezoneId)) {
        console.log('Valid TimeZoneId: ', timezoneId);
    } else {
        console.log('Invalid TimeZoneId: ', timezoneId);
    }
};
