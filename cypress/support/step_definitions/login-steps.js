import {
  Before,
  Given,
  When,
  And,
  Then,
} from "cypress-cucumber-preprocessor/steps";
import loginPage from "../userInterface/loginPage";

let stub;

Before(() => {
  cy.log("Executing before step");
  stub = cy.stub();
});

Given("I access the WebdriverUniversity Login Portal page", () => {
  cy.visit("/Login-Portal/index.html");
});

When("I enter a username {word}", (userName) => {
  cy.get(loginPage.usernameInput).type(userName);
});

And("I enter a password {word}", (password) => {
  cy.get(loginPage.passwordInput).type(password);
});

And("I click on the login button", () => {
  cy.get().click();
  cy.on("window:alert", stub);
});

Then(
  "I should be presented with the following message {word} {word}",
  (message, message2) => {
    const expectedMessage = message + " " + message2;
    expect(stub.getCall(0)).to.be.calledWith(expectedMessage);
  }
);
