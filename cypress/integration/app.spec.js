describe('the scoring app', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('title', () => {
    it('exists', () => {
      // assert
      cy.contains('JSON Similarity Score');
    });
  });
});
