import fs from 'node:fs';
import path from 'node:path';
import xmlParser, { ElementCompact, Element } from 'xml-js';

const typeName = 'TimeZoneId';

const main = async () => {
    const xmlTimezones = xmlParser.xml2js(
        fs.readFileSync(path.join(__dirname, '../dataset/timezones.html'), {
            encoding: 'utf-8',
        }),
        {
            compact: false,
            ignoreComment: true,
            ignoreDoctype: true,
            ignoreCdata: true,
            ignoreInstruction: true,
            ignoreDeclaration: true,
        },
    ) as xmlParser.Element;

    if (!xmlTimezones.elements) {
        throw Error('1');
    }

    const table = xmlTimezones.elements[0];

    if (!table.elements) {
        throw new Error('table.elements === undefined');
    }

    const timezoneIds: string[] = [];

    for (const tr of table.elements) {
        if (!tr.elements) continue;
        const [timezoneIdElement] = tr.elements;

        if (!timezoneIdElement.elements) continue;

        const timezoneId = timezoneIdElement.elements[0].text;

        if (typeof timezoneId !== 'string') {
            throw new Error('timezoneId is not a string');
        }

        timezoneIds.push(timezoneId);
    }

    const uniqueTimezoneIds = Array.from(new Set([...timezoneIds]));

    uniqueTimezoneIds.sort();

    const timezoneidType = uniqueTimezoneIds.map((item) => `'${item}'`);

    const ftypes = [`export type ${typeName} = ${timezoneidType.join(' | ')};`].join(
        '\n',
    );

    const ftimezoneids = [
        `import { ${typeName} } from "./types";`,
        '',
        `export const timeZoneIds:Readonly<${typeName}[]> = Object.freeze([${timezoneidType.join(
            ', ',
        )}]);`,
    ].join('\n');

    fs.writeFileSync(path.join(__dirname, '../src/types.ts'), ftypes);

    fs.writeFileSync(path.join(__dirname, '../src/timezoneids.ts'), ftimezoneids);
    console.log('done!');
};

main();
