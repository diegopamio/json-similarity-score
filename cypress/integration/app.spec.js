describe('The scoring app', () => {
  describe('Title', () => {
    it('exists', () => {
      // act
      cy.visit('/');

      // assert
      cy.contains('JSON Similarity Score');
    });
  });
});
