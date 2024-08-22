describe("template spec", () => {
  it("passes", () => {
    Cypress.on("uncaught:exception", (err, runnable) => {
      if (err.message.includes("NEXT_REDIRECT")) {
        return false; // prevents Cypress from failing the test
      }
      // other cases if needed
      return true;
    });
    cy.visit("/");
    cy.get('[data-id = "login_button"]').click();
    cy.get('[data-id="password_input"]').type("1234");
    cy.get('[data-id="email_input"]').type("fuad.mohamed@aait.edu.et");
    cy.get("#login_submit").click();
    cy.wait(5000).then(() => {
      cy.get("#bookmark_1").click();
      cy.get("#myjob_tab").click();
      cy.wait(3000).then(() => {
        cy.get("#home_tab").click();
        cy.get("#bookmark_1").click();
      });
    });
  });
});
