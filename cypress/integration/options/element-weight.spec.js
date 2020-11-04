const OptionalHeaderTitle = 'Options';
// ToDo: Add simpler yet more evident tests for the difference in the algorithm.
describe('the Array Order option', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.contains('.MuiCardHeader-root', OptionalHeaderTitle).find('button').click();
    cy.contains('Depth Weight').click();
  });
  it('should have an explanation section', () => {
    cy.contains('Explanation');
  });
  it('should have a "Select Option" section', () => {
    cy.contains('Select Option');
  });
  it('should have two options', () => {
    cy.contains('.MuiCard-root', OptionalHeaderTitle).find('input[type="radio"]').should('have.length', 2);
  });
  describe('when selecting descendant count', () => {
    it('should return a higher score', () => {
      // arrange
      const fileNameA = 'BreweriesMaster.json';
      const fileNameB = 'BreweriesSample4.json';
      cy.drop('File A', fileNameA);
      cy.drop('File B', fileNameB);
      // act
      cy.contains('Descendants Count').click();
      cy.contains('Compare').click();
      // assert
      cy.contains('35.7%');
    });
  });
  describe('when selecting siblings proportion', () => {
    it('should return a lower score', () => {
      // arrange
      const fileNameA = 'BreweriesMaster.json';
      const fileNameB = 'BreweriesSample4.json';
      cy.drop('File A', fileNameA);
      cy.drop('File B', fileNameB);
      // act
      cy.contains('Siblings Proportion').click();
      cy.contains('Compare').click();
      // assert
      cy.contains('34.2%');
    });
  });
});
