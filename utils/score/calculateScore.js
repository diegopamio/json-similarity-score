/* eslint-disable no-use-before-define */

import { SCORE_SETTINGS_VALUES, SCORING_SETTINGS_KEYS } from '~/utils/score/constants';
import { permute } from '~/utils/score/permute';

const { ARRAY_POSITION_MATCH, ELEMENT_WEIGHT } = SCORING_SETTINGS_KEYS;
const { FORCE_SAME_POSITION, MATCH_ANY_POSITION } = SCORE_SETTINGS_VALUES[ARRAY_POSITION_MATCH];
const { DESCENDANTS_COUNT, SIBLINGS_PROPORTION } = SCORE_SETTINGS_VALUES[ELEMENT_WEIGHT];

export const DEFAULT_OPTIONS = {
  [ARRAY_POSITION_MATCH]: FORCE_SAME_POSITION,
  [ELEMENT_WEIGHT]: DESCENDANTS_COUNT,
};

/**
 * Gets the union of two object keys, removing duplicates.
 * @param objA is one of the objects
 * @param objB is the other object
 * @return {string[]} is an array of keys, without duplicates
 */
const getUniqueKeys = (objA, objB) => Object
  .keys(objA)
  .concat(Object.keys(objB)
    .filter((item) => Object.keys(objA).indexOf(item) < 0));

/**
 * Evaluates two nodes and depending on the type of node, it redirects to the appropriate evaluator
 * @param valueOfA
 * @param valueOfB
 * @param options
 * @return {{[p: string]: *}}
 */
const evaluateNode = (valueOfA, valueOfB, options) => {
  const initialResult = { matched: 0, count: options.weight, children: [] };

  if (options[ARRAY_POSITION_MATCH] === MATCH_ANY_POSITION && [valueOfA, valueOfB].every(Array.isArray)) {
    return { ...initialResult, ...evaluateArrayNode(valueOfA, valueOfB, options) };
  } if ([valueOfA, valueOfB].every((object) => typeof object === 'object')) {
    return { ...initialResult, ...evaluateObjectNode(valueOfA, valueOfB, options) };
  }
  return { ...initialResult, ...evaluateLeaf(valueOfA, valueOfB, options) };
};

/**
 * A HoF that returns a reducer of keys for the given pair of objects, while scoring each key recursively thru
 * evaluateObjectNode()
 * @param objA is the "Left Object" to reduce.
 * @param objB is the "Right Object" to reduce.
 * @param options contains all the alternatives for the algorithm, pased dwon from the main scoring function.
 * @return {function(*, *): {metaData: {key: *}, children, count, matched}} a function that evaluates nodes and leaves
 * and accumulates matched and count of each branch, and adds one more result to the list of sibbling childrens of the
 * parent key.
 */
const getScoreReducer = (objA, objB, options) => (accumulatedResult, key) => {
  const valueOfA = objA[key];
  const valueOfB = objB[key];
  const result = evaluateNode(valueOfA, valueOfB, options);

  return {
    count: accumulatedResult.count + result.count,
    matched: accumulatedResult.matched + result.matched,
    children: [...accumulatedResult.children, { ...result, metaData: { ...result.metaData, key } }],
  };
};

/**
 * Determines if the pass element is a best match than the bestPermutationSoFar considering matched and count.
 * @param bestPermutationSoFar
 * @param currentElement
 * @return {*} either the currentElement or the previous best permutation so far.
 */
const bestPermutation = (bestPermutationSoFar, currentElement) => {
  if (currentElement.matched / currentElement.count >= bestPermutationSoFar.matched / bestPermutationSoFar.count) {
    return currentElement;
  }
  return bestPermutationSoFar;
};

/**
 * Finds all the matching score combinations of pairings between leftArray and rightArray elements by permuting the
 * right array and returning the evaluation of the two arrays.
 * @param leftArray
 * @param rightArray
 * @param options
 * @return {{children: *[], count: number, matched: number}[]}
 */
const permuteRight = (leftArray, rightArray, options) => permute(rightArray)
  .map((permutation) => evaluateObjectNode(leftArray, permutation, options));

/**
 * Finds the best matching score between two arrays by trying out all the possible combination of sorting, and returns
 * the best one.
 * @param objA
 * @param objB
 * @param options
 * @return {{children: *[], count: number, matched: number}}
 */
const evaluateArrayNode = (objA, objB, options) => {
  // ToDo: for the sake of clarity on the logs, the left should always be left.
  const longestArray = objA.length >= objB.length ? objA : objB;
  const shortestArray = objA.length < objB.length ? objA : objB;
  const expandedArray = shortestArray.concat(Array(longestArray.length - shortestArray.length));
  return permuteRight(longestArray, expandedArray, options).reduce(bestPermutation);
};

/**
 * Evaluates a node of the JSON tree (or the whole files at the top) by reducing their children to the amount of
 * matched and counted sub-items.
 * It adjusts the weight to the # of siblings in case the SIBLINGS_PROPORTION option is selected.
 * @param objA is the node on the "left" object to evaluate.
 * @param objB is the node on the "right" object to evaluate.
 * @param options contains all the alternatives for the algorithm, pased dwon from the main scoring function.
 * @return {{children: [], count: number, matched: number}}
 */
const evaluateObjectNode = (objA, objB, options) => {
  const keys = getUniqueKeys(objA, objB);
  const weightProportion = options[ELEMENT_WEIGHT] === SIBLINGS_PROPORTION
    ? keys.length
    : 1;
  const weight = (options.weight || 1) / weightProportion;
  return keys.reduce(
    getScoreReducer(objA, objB, { ...options, weight }), { matched: 0, count: 0, children: [] },
  );
};

/**
 * Evaluates two non-node values (that is, non `typeof objX === 'object'`) basically to determine the matching, and
 * stores metadata of the evaluation in the retuned object to be used by the logging analysis features.
 * @return {
 * {metaData: {typeOfA: ("undefined"|"object"|"boolean"|"number"|"string"|"function"|"symbol"|"bigint"),
 *  typeOfB: ("undefined"|"object"|"boolean"|"number"|"string"|"function"|"symbol"|"bigint"), valueOfB: *, valueOfA: *,
 *  key: *},
 *  matched: number
 *  }}
 * @param valueOfA
 * @param valueOfB
 * @param weight determines how much does a match adds to the score..
 */
const evaluateLeaf = (valueOfA, valueOfB, { weight }) => ({
  matched: valueOfA === valueOfB ? weight : 0,
  metaData: {
    valueOfA,
    valueOfB,
    typeOfA: typeof valueOfA,
    typeOfB: typeof valueOfB,
  },
});

/**
 * Calculates the overall score of two whole json objects.
 * @param fileA
 * @param fileB
 * @param options contains all the alternatives for the algorithm
 * @return {{scoreNumber: number, metaData: *}} returns both the score as a range of 0..1, and the metadata to visualize
 * the difference.
 */
export const calculateScore = (fileA, fileB, options = DEFAULT_OPTIONS) => {
  const result = evaluateObjectNode(fileA, fileB, options);
  return {
    scoreNumber: result.count > 0 ? result.matched / result.count : 1,
    metaData: {
      key: '/',
    },
    ...result,
  };
};
