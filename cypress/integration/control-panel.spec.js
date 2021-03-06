describe('control pannel', () => {
  beforeEach(() => {
    cy.visit('/');
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
      context.only('when an invalid file is dropped into', () => {
        it('should show an error toss at the bottom', () => {
          // arrange
          const fileName = 'non-json-file.png';

          // act
          cy.drop(dropzoneName, fileName);

          // assert
          cy.contains('File type not supported');
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
        cy.contains('N/A');
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
        cy.contains('100.0%');
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
        cy.contains('35.7%');
      });
    });
    ['A', 'B'].map((fileLetter) => describe(`when the File ${fileLetter} is not valid JSONs`, () => {
      it('should shown an error message', () => {
        // arrange
        const goodFile = 'BreweriesMaster.json';
        const brokenFile = 'BreweriesMaster-broken.txt';
        cy.drop('File A', goodFile);
        cy.drop('File B', goodFile);
        cy.drop(`File ${fileLetter}`, brokenFile);
        // act
        cy.contains('Compare').click();

        // assert
        cy.contains(`Could not parse json${fileLetter} param as a JSON object`);
      });
    }));
  });
});
