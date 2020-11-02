const comparisonAnalysisText = ' Analysis';
let panel;

describe('The comparison analysis panel', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  describe('before comparing', () => {
    it('should not be visible', () => {
      // assert
      cy.contains(comparisonAnalysisText).should('not.exist');
    });
  });
  describe('after running a comparison', () => {
    beforeEach(() => {
      const fileNameA = 'BreweriesMaster.json';
      const fileNameB = 'BreweriesSample4.json';
      cy.drop('File A', fileNameA);
      cy.drop('File B', fileNameB);
      // act
      cy.contains('Compare').click();
      panel = cy.contains(comparisonAnalysisText);
    });
    it('should be visible', () => {
      // assert
      panel.should('be.visible');
    });
    describe('the panel content', () => {
      it('should be collapsed', () => {
        cy.contains('PARTIALLY EQUAL').should('not.be.visible');
      });
      describe('the collapse/expand button', () => {
        it('should exist', () => {
          // assert
          cy.contains('.MuiCardHeader-root', comparisonAnalysisText).find('button').should('be.visible');
        });
        it('should be facing down', () => {
          // assert
          cy.contains('.MuiCardHeader-root', comparisonAnalysisText)
            .find('button[aria-expanded=false]');
        });
        describe('when clicked', () => {
          let panelHeader;
          beforeEach(() => {
            panelHeader = cy.contains('.MuiCardHeader-root', comparisonAnalysisText);
            panelHeader.find('button').click();
          });
          it('should be facing up', () => {
            // assert
            panelHeader.get('button[aria-expanded=true]');
          });
          it('should make the analysis log panel visible', () => {
            // assert
            cy.contains('PARTIALLY EQUAL').should('be.visible');
          });
          describe('the analysis tree', () => {
            it('should be visible', () => {
              cy.contains('is PARTIALLY EQUAL (5 / 14)').should('be.visible');
            });
          });
        });
      });
      describe('the root element', () => {
        describe('when clicked', () => {
          it('should show its child nodes', () => {
            // arrange
            cy.contains('.MuiCardHeader-root', comparisonAnalysisText).find('button').click();

            // act
            cy.contains('is PARTIALLY EQUAL').click();

            // assert
            cy.contains('breweries');
          });
        });
      });
      describe('each child node', () => {
        describe('when partially equal', () => {
          it('should show the quotient ', () => {
            // arrange
            cy.contains('.MuiCardHeader-root', comparisonAnalysisText).find('button').click();

            // act
            cy.contains('is PARTIALLY EQUAL').click();

            // assert
            cy.contains('(5 / 14)');
          });
        });
        describe('when comparing arrays', () => {
          it('should pretty format the array as "Array of ## items"', () => {
            // arrange
            cy.contains('.MuiCardHeader-root', comparisonAnalysisText).find('button').click();
            cy.contains('is PARTIALLY EQUAL').click();
            cy.contains('breweries').click();

            // act
            cy.contains('Item 0').click();

            // act

            // assert
            cy.contains('Array of 3');
          });
        });
      });
    });
  });
});
