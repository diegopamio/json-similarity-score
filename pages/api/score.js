export default (req, res) => {
  if (req.method === 'POST') {
    res.statusCode = 200;
    res.json({ score: 1 });
  }
  res.statusCode = 405;
  res.end('Method not allowed');
};
