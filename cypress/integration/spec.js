// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

const passOnLast = () => {
  cy.wait(100).then(() => {
    // safely access the retry
    // even if this version of Cypress does not have it
    const retry = Cypress._.get(cy.state('runnable'), '_currentRetry', 1)
    const retries = Cypress._.get(cy.state('runnable'), '_retries', 1)

    if (retry === retries) {
      cy.log('Last retry!')
      expect(true).to.be.true
    } else {
      cy.log(`retry ${retry} of ${retries}`)
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
})
