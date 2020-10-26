import { calculateScore } from '~/utils/score';

export default (req, res) => {
  if (req.method === 'POST') {
    res.statusCode = 200;
    res.json(calculateScore(JSON.parse(req.body.jsonA), JSON.parse(req.body.jsonB)));
  }
  res.statusCode = 405;
  res.end('Method not allowed');
};
