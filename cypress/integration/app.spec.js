describe('The scoring app', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  describe('title', () => {
    it('exists', () => {
      // assert
      cy.contains('JSON Similarity Score');
    });
  });
  describe('upload buttons', () => {
    ['File A', 'File B'].forEach((dropzoneName) => describe(dropzoneName, () => {
      it('exists', () => {
        cy.contains(dropzoneName);
      });
      context('when a file is dropped into', () => {
        it('shows the uploaded file name', () => {
          // arrange
          const fileName = 'BreweriesMaster.json';

          // act
          cy.drop(dropzoneName, fileName);

          // assert
          cy.contains(dropzoneName).parent().parent().contains(fileName);
        });
      });
    }));
  });
  describe('"Compare" button', () => {
    it('should exists', () => {
      // assert
      cy.contains('Compare');
    });
    context('when both files are not loaded', () => {
      it('should be disabled', () => {
        cy.contains('Compare').should('be.disabled');
      });
    });
    context('when left file is not loaded', () => {
      it('should be disabled', () => {
        // arrange
        const fileName = 'BreweriesMaster.json';
        cy.drop('File B', fileName);
        // assert
        cy.contains('Compare').should('be.disabled');
      });
    });
    context('when right file is not loaded', () => {
      it('should be disabled', () => {
        // arrange
        const fileName = 'BreweriesMaster.json';
        cy.drop('File B', fileName);

        // assert
        cy.contains('Compare').should('be.disabled');
      });
    });
    context('when both files are loaded', () => {
      it('should be enabled', () => {
        // arrange
        const fileName = 'BreweriesMaster.json';
        cy.drop('File A', fileName);
        cy.drop('File B', fileName);
        // assert
        cy.contains('Compare').should('not.be.disabled');
      });
    });
  });
  describe('score', () => {
    context('before comparing', () => {
      it('should show "N/A" as result', () => {
        // assert
        cy.contains('Score: N/A');
      });
    });
    context('when the files are the same', () => {
      it('should score 1', () => {
        // arrange
        const fileName = 'BreweriesMaster.json';
        cy.drop('File A', fileName);
        cy.drop('File B', fileName);
        // act
        cy.contains('Compare').click();

        // assert
        cy.contains('Score: 100.00%');
      });
    });
    context('when the files are different', () => {
      it('should show the score as a percentage', () => {
        // arrange
        const fileNameA = 'BreweriesMaster.json';
        const fileNameB = 'BreweriesSample4.json';
        cy.drop('File A', fileNameA);
        cy.drop('File B', fileNameB);
        // act
        cy.contains('Compare').click();

        // assert
        cy.contains('Score: 35.71%');
      });
    });
  });
});
