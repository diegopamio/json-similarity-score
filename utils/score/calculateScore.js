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

/**
 * Evaluates two non-node values (that is, non `typeof objX === 'object'`) basically to determine the matching, and
 * stores metadata of the evaluation in the retuned object to be used by the logging analysis features.
 * @param objA
 * @param objB
 * @param key
 * @return {
 * {metaData: {typeOfA: ("undefined"|"object"|"boolean"|"number"|"string"|"function"|"symbol"|"bigint"),
 *  typeOfB: ("undefined"|"object"|"boolean"|"number"|"string"|"function"|"symbol"|"bigint"), valueOfB: *, valueOfA: *,
 *  key: *},
 *  matched: number
 *  }}
 */
const evaluateLeaf = (objA, objB, key) => {
  const valueOfA = objA[key];
  const valueOfB = objB[key];
  return {
    matched: objA[key] === objB[key] ? 1 : 0,
    metaData: {
      key,
      valueOfA,
      valueOfB,
      typeOfA: typeof valueOfA,
      typeOfB: typeof valueOfB,
    },
  };
};

/**
 * A HoF that returns a reducer of keys for the given pair of objects, while scoring each key recursively thru
 * evaluateNode()
 * @param objA is the "Left Object" to reduce.
 * @param objB is the "Right Object" to reduce.
 * @return {function(*=, *=): (*|{})} a function that evaluates nodes and leaves and accumulates matched and count of
 * each branch, and adds one more result to the list of sibbling childrens of the parent key.
 */
const getScoreReducer = (objA, objB) => (accumulatedResult, key) => {
  let result = { count: 1, matched: 0, metaData: { key } };

  if (bothContainSubElements(key, [objA, objB])) {
    // eslint-disable-next-line no-use-before-define
    result = { ...result, ...evaluateNode(objA[key], objB[key]) };
  } else {
    result = { ...result, ...evaluateLeaf(objA, objB, key) };
  }

  return {
    count: accumulatedResult.count + result.count,
    matched: accumulatedResult.matched + result.matched,
    children: [...accumulatedResult.children, result],
  };
};

/**
 * Evaluates a node of the JSON tree (or the whole files at the top) by reducing their childrens to the ammount of
 * matched and counted sub-items.
 * @param objA is the node on the "left" object to evaluate.
 * @param objB is the node on the "right" object to evaluate.
 * @return {{children: [], count: number, matched: number}}
 */
const evaluateNode = (objA, objB) => {
  const keys = getUniqueKeys(objA, objB);
  return keys.reduce(
    getScoreReducer(objA, objB), { matched: 0, count: 0, children: [] },
  );
};

/**
 * Calculates the overall score of two whole json objects.
 * @param fileA
 * @param fileB
 * @return {{scoreNumber: number, metaData: *}} returns both the score as a range of 0..1, and the metadata to visualize
 * the difference.
 */
export const calculateScore = (fileA, fileB) => {
  const result = evaluateNode(fileA, fileB);
  return {
    scoreNumber: result.count > 0 ? result.matched / result.count : 1,
    metaData: {
      key: '/',
    },
    ...result,
  };
};
