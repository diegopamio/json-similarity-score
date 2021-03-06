// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
// eslint-disable-next-line import/no-extraneous-dependencies
import 'cypress-file-upload';

Cypress.Commands.add('drop', (containerName, fileName) => {
  const json = `acceptance/${fileName}`;
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(250); // Drag-dropping works in mysterious ways
  cy.contains(containerName).attachFile(json, { subjectType: 'drag-n-drop' });
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(250); // Drag-dropping works in mysterious ways
});
