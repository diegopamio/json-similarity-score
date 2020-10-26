import { calculateScore } from '../calculateScore';
import complexJSON from '~/cypress/fixtures/acceptance/BreweriesMaster.json';

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
  });
});
