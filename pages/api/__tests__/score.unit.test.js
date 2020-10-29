import score from '../score';

describe('score endpoint', () => {
  describe('when called with a GET method', () => {
    it('should answer 405', async () => {
      // arrange
      const req = {
        method: 'GET',
      };
      const res = { end: jest.fn() };
      // act
      score(req, res);

      // assert
      expect(res.statusCode).toEqual(405);
      expect(res.end).toHaveBeenCalledWith('Method not allowed');
    });
  });
  describe('when called with a POST method', () => {
    const emptyBody = {
      jsonA: '{}',
      jsonB: '{}',
    };

    const res = { end: jest.fn(), json: jest.fn() };
    const req = {
      method: 'POST',
      body: emptyBody,
    };
    beforeEach(() => {
      req.body = emptyBody;
    });

    it('should answer 200 ok', async () => {
      // act
      score(req, res);

      // assert
      expect(res.statusCode).toEqual(200);
    });
    it('should return a json object with the basic keys', async () => {
      // act
      score(req, res);

      // assert
      expect(res.json).toHaveBeenCalledWith({
        children: [],
        count: 0,
        matched: 0,
        metaData: {
          key: '/',
        },
        scoreNumber: 1,
      });
    });
    describe.each([
      'jsonA',
      'jsonB',
    ])('when param %s is not present', (json) => {
      it('should return a 422 explaining the missing param', async () => {
        // arrange
        req.body[json] = undefined;
        // act
        score(req, res);

        // assert
        expect(res.statusCode).toEqual(422);
        expect(res.end).toHaveBeenCalledWith(`Missing Param: Body must contain ${json}`);
      });
    });
    describe.each([
      'jsonA',
      'jsonB',
    ])('when param %s is not JSON-formatted', (json) => {
      it('should return a 422 explaining the missing param', async () => {
        // arrange
        req.body[json] = 'some non-json string';
        // act
        score(req, res);

        // assert
        expect(res.statusCode).toEqual(422);
        expect(res.end).toHaveBeenCalledWith(`Could not parse ${json} param as a JSON object`);
      });
    });
  });
});
