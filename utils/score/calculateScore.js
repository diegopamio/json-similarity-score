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
 * A HoF that returns a function that evaluates if the type of the given key is an object (Object/Array)
 * @param key is the key to look foor in the object
 * @return {function(*): boolean} is the function that returns true if the key inside the object is of type `object`
 */
const isNode = (key) => (object) => typeof object[key] === 'object';
/**
 * Determines if the given key is an object (Object/Array) in all the objects.
 * @param key is the key to compare in each object.
 * @param objects is the array of objects to compare.
 * @return {boolean} whether ALL the objects contain objects in the key.
 */
const bothContainSubElements = (key, objects) => objects.every(isNode(key));

// const isLeaf = (key) => (object) => typeof object[key] !== 'object';
// const sameType = (key, objects) => objects.every(isLeaf(key));

/**
 * A HoF that returns a reducer of keys for the given pair of objects, while scoring each key recursively thru
 * recursivelyScore()
 * @param objA is the "Left Object" to reduce.
 * @param objB is the "Right Object" to reduce.
 * @return {function(*=, *=): (*|{})}
 */
const getScoreReducer = (objA, objB) => (accumulatedResult, key) => {
  let result = { count: 1, matched: 0 };

  if (bothContainSubElements(key, [objA, objB])) {
    // eslint-disable-next-line no-use-before-define
    result = recursivelyScore(objA[key], objB[key], key);
  } else if (typeof objA[key] === typeof objB[key]) {
    result.matched = objA[key] === objB[key] ? 1 : 0;
  }
  return {
    count: accumulatedResult.count + result.count,
    matched: accumulatedResult.matched + result.matched,
  };
};

const recursivelyScore = (objA, objB) => {
  const keys = getUniqueKeys(objA, objB);
  return keys.reduce(
    getScoreReducer(objA, objB), { matched: 0, count: 0 },
  );
};

/**
 * Calculates the overal score of two whole json objects.
 * @param fileA
 * @param fileB
 * @return {{scoreNumber: number, log: *}}
 */
export const calculateScore = (fileA, fileB) => {
  const result = recursivelyScore(fileA, fileB);
  return {
    scoreNumber: result.count > 0 ? result.matched / result.count : 1,
  };
};
