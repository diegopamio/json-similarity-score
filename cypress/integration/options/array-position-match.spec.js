const OptionalHeaderTitle = 'Options';

describe('the Array Order option', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.contains('.MuiCardHeader-root', OptionalHeaderTitle).find('button').click();
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
  describe('when selecting disregard array index', () => {
    it('should consider equal arrays that has different order', () => {
      // arrange
      const fileNameA = 'BreweriesSample4swap.json';
      const fileNameB = 'BreweriesSample4.json';
      cy.drop('File A', fileNameA);
      cy.drop('File B', fileNameB);
      // act
      cy.contains('Disregard Array Index').click();
      cy.contains('Compare').click();
      // assert
      cy.contains('100.0%');
    });
  });
  describe('when selecting to force equal index', () => {
    it('should return a lower score', () => {
      // arrange
      const fileNameA = 'BreweriesSample4swap.json';
      const fileNameB = 'BreweriesSample4.json';
      cy.drop('File A', fileNameA);
      cy.drop('File B', fileNameB);
      // act
      cy.contains('Force equal Index').click();
      cy.contains('Compare').click();
      // assert
      cy.contains('40.7%');
    });
  });
});
