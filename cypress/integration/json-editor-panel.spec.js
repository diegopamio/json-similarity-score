const editJsonHeaderTitle = 'Edit JSONs';

describe('the Edit JSONs panel', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should exist', () => {
    cy.contains(editJsonHeaderTitle);
  });
  describe('when clicked', () => {
    it('should show two JSON edition panels', () => {
      cy.contains('.MuiCardHeader-root', editJsonHeaderTitle).find('button').click();
      // assert
      cy.contains('.MuiCardHeader-root', editJsonHeaderTitle).siblings().contains('1');
    });
  });
  describe('when both files are added', () => {
    beforeEach(() => {
      cy.contains('.MuiCardHeader-root', editJsonHeaderTitle).find('button').click();
    });
    it('should show the content of both', () => {
      // arrange
      const fileNameA = 'BreweriesMaster.json';
      const fileNameB = 'BreweriesSample4.json';

      // act
      cy.drop('File A', fileNameA);
      cy.drop('File B', fileNameB);

      // assert
      cy.get('#Left > .ace_scroller > .ace_content').contains('"state-bird": "Western Meadowloark"');
      cy.get('#Right > .ace_scroller > .ace_content').contains('"name": "Salmon Fly Honey Rye",');
    });
  });
  ['A', 'B'].forEach((letter) => {
    describe(`when a file ${letter} is added`, () => {
      beforeEach(() => {
        cy.contains('.MuiCardHeader-root', editJsonHeaderTitle).find('button').click();
      });

      it('should show the file\'s content', () => {
      // arrange
        const fileName = 'BreweriesMaster.json';

        // act
        cy.drop(`File ${letter}`, fileName);

        // assert
        cy.get(`#${letter === 'A' ? 'Left' : 'Right'} > .ace_scroller > .ace_content`).contains('MT');
      });
    });
    describe(`when file ${letter} is overriten`, () => {
      beforeEach(() => {
        cy.contains('.MuiCardHeader-root', editJsonHeaderTitle).find('button').click();
      });

      it('should update the file\'s content', () => {
      // arrange
        const fileName = 'BreweriesMaster.json';
        const updatedFile = 'BreweriesSample4.json';

        // act
        cy.drop(`File ${letter}`, fileName);
        cy.drop(`File ${letter}`, updatedFile);

        // assert
        cy.get(`#${letter === 'A' ? 'Left' : 'Right'} > .ace_scroller > .ace_content`)
          .contains('"name": "Salmon Fly Honey Rye",');
      });
    });
  });
  describe('when the file content is changed', () => {
    beforeEach(() => {
      cy.contains('.MuiCardHeader-root', editJsonHeaderTitle).find('button').click();
    });
    it('should update the calculation when re-comparing', () => {
      // arrange
      const fileName = 'BreweriesMaster.json';

      cy.drop('File A', fileName);
      cy.drop('File B', fileName);
      cy.contains('Compare').click();
      cy.contains('100.0%');

      // act
      cy.get('.ace_text-input')
        .first().focus().type('{rightarrow}"newKey": "newValue", ');
      cy.contains('Compare').click();

      // assert
      cy.contains('97.2%');
    });
  });
});
