const optionsHeaderTitle = 'Options';

describe('the Options panel', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should exist', () => {
    cy.contains(optionsHeaderTitle);
  });
  describe('when clicked', () => {
    it('should show three options to configure', () => {
      cy.contains('.MuiCardHeader-root', optionsHeaderTitle).find('button').click();
      // assert
      cy.contains('Array Order');
      cy.contains('Depth Weight');
    });
    it('should have the first option as selected', () => {
      cy.contains('.MuiCardHeader-root', optionsHeaderTitle).find('button').click();
      // assert
      cy.contains('Array Order').should('have.class', 'Mui-selected');
    });
  });
});
