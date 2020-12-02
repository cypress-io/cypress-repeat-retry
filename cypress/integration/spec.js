// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

const passOnLast = () => {
  cy.wait(100).then(() => {
    // safely access the retry
    // even if this version of Cypress does not have it
    const attempt = Cypress._.get(cy.state('runnable'), '_currentRetry', 0)
    const attempts = Cypress._.get(cy.state('runnable'), '_retries', 0)
    debugger

    if (attempt === attempts) {
      cy.log('Last attempt!')
      expect(true).to.be.true
    } else {
      cy.log(`attempt ${attempt + 1} of ${attempts + 1}`)
        .then(() => {
          expect(true).to.be.false
        })
    }
  })
}

describe('repeat and retry', () => {
  it('passes on the last', () => {
    passOnLast()
  })

  it('with visit', () => {
    cy.visit('/')
    passOnLast()
  })

  it('using custom command', () => {
    cy.browse()
    passOnLast()
  })

  // disable retries in this test but repeat this test again and again
  Cypress._.times(100, (k) => {
    it(`finds and types ${k + 1} of 100`, { retries: 0 }, () => {
      cy.visit('/commands/actions')
      cy.get('.action-email')
        .should('be.enabled')
        .type('fake@email.com')
        .should('have.value', 'fake@email.com')
    })
  })
})
