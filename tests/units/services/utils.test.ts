import {filterTextItems, filterFiles, firstFilterTextItems} from "services/utils";
import {Lang} from "../../../src/constants";

const combinedVars = {
    lang: Lang.EN,
};

describe('filterTextItems', () => {
    test('string', () => {
        const description = 'test';

        const result = filterTextItems(
            description,
            combinedVars,
            {resolveConditions: true},
        );

        expect(result).toBe(description);
    });

    test('string[]', () => {
        const description = [
            'line1',
            'line2'
        ];

        const result = filterTextItems(
            description,
            combinedVars,
            {resolveConditions: true},
        );

        expect(result).toEqual(description);
    });

    test('filter[]', () => {
        const description = [{
            text: 'line1',
            when: `lang == "${Lang.EN}"`,
        }, {
            text: 'line2',
            when: `lang == "${Lang.RU}"`,
        }, {
            text: [
                'line3',
                'line4',
            ]
        }];

        const result = filterTextItems(
            description,
            combinedVars,
            {resolveConditions: true},
        );

        expect(result).toEqual(['line1', 'line3', 'line4']);
    });
});

describe('firstFilterTextItems', () => {
    test('string', () => {
        const title = 'line1';

        const result = firstFilterTextItems(
            title,
            combinedVars,
            {resolveConditions: true},
        );

        expect(result).toEqual('line1');
    });

    test('string[]', () => {
        const title = ['line1', 'line2'];

        const result = firstFilterTextItems(
            title,
            combinedVars,
            {resolveConditions: true},
        );

        expect(result).toEqual('line1');
    });

    test('TextItem[]', () => {
        const title = [{
            text: 'line1',
            when: `lang == "${Lang.EN}"`,
        }, {
            text: 'line2',
            when: `lang == "${Lang.RU}"`,
        }];

        const result = firstFilterTextItems(
            title,
            combinedVars,
            {resolveConditions: true},
        );

        expect(result).toEqual('line1');
    });
});

describe('filterFiles', () => {
    test('filter[]', () => {
        const links = [{
            title: 'line1',
            when: `lang == "${Lang.EN}"`,
        }, {
            title: 'line2',
            when: `lang == "${Lang.RU}"`,
        }, {
            title: [
                'line3',
                'line4',
            ]
        }];

        const result = filterFiles(links, 'links', combinedVars, {resolveConditions: true});

        expect(result).toEqual([{
            title: 'line1',
        }, {
            title: [
                'line3',
                'line4',
            ]
        }]);
    });
});
