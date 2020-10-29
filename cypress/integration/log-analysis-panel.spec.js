const comparisonAnalysisText = 'Comparison Analysis';
let panel;
let analysisTree;

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
          cy.contains('.MuiCardHeader-root', comparisonAnalysisText).find('button')
            .should('have.css', 'transform', 'matrix(1, 0, 0, 1, 0, 0)');
        });
        describe('when clicked', () => {
          let panelHeader;
          beforeEach(() => {
            panelHeader = cy.contains('.MuiCardHeader-root', comparisonAnalysisText);
            panelHeader.find('button').click();
          });
          it('should be facing up', () => {
            // assert
            panelHeader.find('button')
              .should('have.css', 'transform', 'matrix(-1, 1.22465e-16, -1.22465e-16, -1, 0, 0)');
          });
          it('should make the analysis log panel visible', () => {
            // assert
            cy.contains('PARTIALLY EQUAL').should('be.visible');
          });
          describe('the analysis tree', () => {
            beforeEach(() => {
              analysisTree = panel.find(/^\/$/);
            });
            it('should be visible', () => {
              analysisTree.should('be.visible');
            });
          });
        });
      });
      describe('the root element', () => {
        beforeEach(() => {
          analysisTree = panel.find(/^\/$/);
        });
        describe('when clicked', () => {
          beforeEach(() => {
            analysisTree.click();
          });
          it('should show its child nodes', async () => {
            // assert
            analysisTree.contains('breweries');
          });
        });
      });
    });
  });
});
