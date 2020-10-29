import { calculateScore } from '../calculateScore';
import complexJSON from '~/cypress/fixtures/acceptance/BreweriesMaster.json';
import BreweriesSample4 from '~/cypress/fixtures/acceptance/BreweriesSample4.json';

const TEST_PRECISION = 15;
const key0 = 'value1';
const key1 = 'value1';
const key2 = 'value2';
const key3 = 'value3';
const key4 = 'value4';
const key5 = 'value5';

const simpleJSON = {
  key1,
};

describe('score', () => {
  describe('scoreNumber', () => {
    describe('when the jsons are the same object', () => {
      it('should return 1', () => {
        // arrange
        const jsonA = {
          stringKey: 'StringValue',
          numericKey: 3,
        };

        const jsonB = jsonA;

        // act
        const scoreResult = calculateScore(jsonA, jsonB);

        // assert
        expect(scoreResult.scoreNumber).toEqual(1);
      });
    });

    describe('when one of the json is empty', () => {
      describe.each([
        ['and the other too', {}, {}, 1],
        ['against any other json', {}, simpleJSON, 0],
        ['when is the second one', complexJSON, {}, 0],
      ])('when %s', (title, fileA, fileB, expected) => {
        it(`should return ${expected.toFixed(TEST_PRECISION)} as score`, () => {
          // act
          const result = calculateScore(fileA, fileB);

          // assert
          expect(result.scoreNumber.toFixed(TEST_PRECISION)).toEqual(expected.toFixed(TEST_PRECISION));
        });
      });
    });

    describe('when the JSON are flat ones (only one level)', () => {
      describe.each([
        ['with same 4 keys but half of values different', {
          key1, key2, key3, key4,
        }, {
          key1, key2, key3: 'other value', key4: 42,
        }, 0.5],
        ['with 3 out of 5 identical keys, and the others with different value', {
          key1, key2, key3, key4, key5,
        }, {
          key1, key2, key3: 'anotherValue', key4: 'yetAnotherValue', key5,
        }, 3 / 5],
        ['with 2 identical keys, one key with different value and one additional key in each', {
          key1, key2, key3, key4,
        }, {
          key0, key2, key3, Key4: 'altValue', key5,
        }, 2 / 7],
      ])('when %s', (title, fileA, fileB, expected) => {
        it(`should return ${expected.toFixed(TEST_PRECISION)} as score`, () => {
          // act
          const result = calculateScore(fileA, fileB);

          // assert
          expect(result.scoreNumber.toFixed(TEST_PRECISION)).toEqual(expected.toFixed(TEST_PRECISION));
        });
      });
    });
    describe('when there are nested JSON', () => {
      describe.each([
        ['two out of three root keys flat and equal, the remaining one has one equal and one different key',
          { key1, key2, nestedKey: { key3, key4 } },
          { key1, key2, nestedKey: { key3, key4: 'altValue' } },
          3 / 4],
        ['three root keys are flat, two equal and one different, the fourth one has one equal and one different key',
          {
            key1, key2, keyDifferent: 'value1', nestedKey: { key3, key4 },
          },
          {
            key1, key2, keyDifferent: 'value2', nestedKey: { key3, key4: 'altValue' },
          },
          3 / 5],
      ])('when %s', (title, fileA, fileB, expected) => {
        it(`should return ${expected.toFixed(TEST_PRECISION)} as score`, () => {
          // act
          const result = calculateScore(fileA, fileB, { weighted: false });

          // assert
          expect(result.scoreNumber.toFixed(TEST_PRECISION)).toEqual(expected.toFixed(TEST_PRECISION));
        });
      });
    });
    describe('when there are many nesting levels', () => {
      it('should compute to the very last one', async () => {
        // arrange
        const fileA = complexJSON;
        const fileB = BreweriesSample4;

        // act
        const result = calculateScore(fileA, fileB);

        // assert
        expect(result.scoreNumber.toFixed(TEST_PRECISION)).toEqual((5 / 14).toFixed(TEST_PRECISION));
      });
    });
  });
  describe('the metaData information', () => {
    describe('when both JSON objects are empty', () => {
      it('should include the "root" key metadata information', () => {
        // act
        const result = calculateScore({}, {});

        // assert
        expect(result.metaData.key).toEqual('/');
        expect(result.count).toEqual(0);
        expect(result.matched).toEqual(0);
        expect(result.children).toEqual([]);
      });
    });
    describe('when there are many nesting levels', () => {
      it('should provide multilevel metaData information '
        + 'with aggregation of both matched and count at each level', async () => {
        // arrange
        const fileA = complexJSON;
        const fileB = BreweriesSample4;

        // act
        const result = calculateScore(fileA, fileB);

        // assert
        expect(result.children).toEqual([
          {
            count: 1,
            matched: 1,
            metaData: {
              key: 'state',
              typeOfA: 'string',
              typeOfB: 'string',
              valueOfA: 'MT',
              valueOfB: 'MT',
            },
          },
          {
            count: 1,
            matched: 0,
            metaData: {
              key: 'state-bird',
              typeOfA: 'string',
              typeOfB: 'undefined',
              valueOfA: 'Western Meadowloark',
            },
          },
          {
            count: 1,
            matched: 0,
            metaData: {
              key: 'state-fish',
              typeOfA: 'string',
              typeOfB: 'undefined',
              valueOfA: 'Cutthroat Trout',
            },
          },
          {
            children: [
              {
                children: [
                  {
                    count: 1,
                    matched: 1,
                    metaData: {
                      key: 'name',
                      typeOfA: 'string',
                      typeOfB: 'string',
                      valueOfA: 'Madison River Brewing',
                      valueOfB: 'Madison River Brewing',
                    },
                  },
                  {
                    count: 1,
                    matched: 0,
                    metaData: {
                      key: 'location',
                      typeOfA: 'object',
                      typeOfB: 'undefined',
                      valueOfA: {
                        address: '20900 Frontage Rd Building B',
                        city: 'Belgrade',
                        state: 'MT',
                        'zip-code': '59714',
                      },
                    },
                  },
                  {
                    count: 1,
                    matched: 1,
                    metaData: {
                      key: 'food-available',
                      typeOfA: 'boolean',
                      typeOfB: 'boolean',
                      valueOfA: false,
                      valueOfB: false,
                    },
                  },
                  {
                    count: 1,
                    matched: 0,
                    metaData: {
                      key: 'beers',
                      typeOfA: 'object',
                      typeOfB: 'undefined',
                      valueOfA: [
                        {
                          'alcohol-by-volume': 0.04,
                          color: 'Gold',
                          'international-bitterness-units': 12,
                          name: 'Salmon Fly Honey Rye',
                        },
                        {
                          'alcohol-by-volume': 0.055,
                          color: 'Copper',
                          'international-bitterness-units': 35,
                          name: 'Copper John Scotch Ale',
                        },
                        {
                          'alcohol-by-volume': 0.065,
                          color: 'Amber',
                          'international-bitterness-units': 108,
                          name: 'Dropper IPA',
                        },
                      ],
                    },
                  },
                  {
                    count: 1,
                    matched: 0,
                    metaData: {
                      key: 'beer-list',
                      typeOfA: 'undefined',
                      typeOfB: 'object',
                      valueOfB: [
                        {
                          'alcohol-by-volume': 0.04,
                          'international-bitterness-units': 12,
                          name: 'Salmon Fly Honey Rye',
                        },
                        {
                          'alcohol-by-volume': 0.055,
                          color: 'Copper',
                          'international-bitterness-units': 35,
                          name: 'Copper John Scotch Ale',
                        },
                        {
                          'alcohol-by-volume': 0.065,
                          color: 'Amber',
                          'international-bitterness-units': 108,
                          name: 'Dropper IPA',
                        },
                      ],
                    },
                  },
                ],
                count: 5,
                matched: 2,
                metaData: {
                  key: '0',
                },
              },
              {
                children: [
                  {
                    count: 1,
                    matched: 1,
                    metaData: {
                      key: 'name',
                      typeOfA: 'string',
                      typeOfB: 'string',
                      valueOfA: 'Bozeman Brewing',
                      valueOfB: 'Bozeman Brewing',
                    },
                  },
                  {
                    count: 1,
                    matched: 0,
                    metaData: {
                      key: 'location',
                      typeOfA: 'object',
                      typeOfB: 'undefined',
                      valueOfA: {
                        address: '504 N. Broadway',
                        city: 'Bozeman',
                        state: 'MT',
                        'zip-code': '59715',
                      },
                    },
                  },
                  {
                    count: 1,
                    matched: 1,
                    metaData: {
                      key: 'food-available',
                      typeOfA: 'boolean',
                      typeOfB: 'boolean',
                      valueOfA: true,
                      valueOfB: true,
                    },
                  },
                  {
                    count: 1,
                    matched: 0,
                    metaData: {
                      key: 'beers',
                      typeOfA: 'object',
                      typeOfB: 'undefined',
                      valueOfA: [
                        {
                          'alcohol-by-volume': 0.054,
                          color: 'Amber',
                          'international-bitterness-units': 29,
                          name: 'Bozone Amber Ale',
                        },
                        {
                          'alcohol-by-volume': 0.06,
                          color: 'Dark',
                          'international-bitterness-units': 52,
                          name: 'Plum Street Porter',
                        },
                      ],
                    },
                  },
                  {
                    count: 1,
                    matched: 0,
                    metaData: {
                      key: 'address',
                      typeOfA: 'undefined',
                      typeOfB: 'object',
                      valueOfB: {
                        city: 'Bozeman',
                        streetaddress: '504 N. Broadway',
                        'zip-code': '59715',
                      },
                    },
                  },
                  {
                    count: 1,
                    matched: 0,
                    metaData: {
                      key: 'beer-list',
                      typeOfA: 'undefined',
                      typeOfB: 'object',
                      valueOfB: [
                        {
                          'alcohol-by-volume': 0.054,
                          color: 'Amber',
                          'international-bitterness-units': 29,
                          name: 'Bozone Amber Ale',
                        },
                        {
                          'alcohol-by-volume': 0.06,
                          color: 'Dark',
                          'international-bitterness-units': 52,
                          name: 'Plum Street Porter',
                        },
                      ],
                    },
                  },
                ],
                count: 6,
                matched: 2,
                metaData: {
                  key: '1',
                },
              },
            ],
            count: 11,
            matched: 4,
            metaData: {
              key: 'breweries',
            },
          },
        ]);
      });
    });
  });
});
