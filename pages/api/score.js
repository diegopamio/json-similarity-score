import { calculateScore } from '~/utils/score/calculateScore';

function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

/**
 * Endpoint that triggers the calculateScore function, checks that params are correct
 * (jsonA, jsonB and options are JSON objects)
 * @param req
 * @param res
 * @return {*|void|Promise<any>}
 */
export default (req, res) => {
  if (req.method === 'POST') {
    const { jsonA, jsonB, options } = req.body;
    const validParams = ['jsonA', 'jsonB', 'options'].map((json) => {
      res.statusCode = 422;
      if (!req.body[json]) {
        res.end(`Missing Param: Body must contain ${json}`);
        return false;
      }
      if (!isJson(req.body[json])) {
        res.end(`Could not parse ${json} param as a JSON object`);
        return false;
      }
      return true;
    });

    if (validParams.every((isValid) => isValid === true)) {
      res.statusCode = 200;
      return res.json(calculateScore(JSON.parse(jsonA), JSON.parse(jsonB), JSON.parse(options)));
    }
  } else {
    res.statusCode = 405;
    return res.end('Method not allowed');
  }
  return null;
};
