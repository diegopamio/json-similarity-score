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
});
