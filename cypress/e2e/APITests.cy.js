/// <reference types="cypress" />

describe('API tests', () => {
    let token, expires;

    it('Autorization', () => {
        cy.request({
            method: 'POST',
            url: 'https://demoqa.com/Account/v1/Authorized',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: {
                "userName": "Julia",
                "password": "Ch22111990!"
              }
        }).then(response => {
            expect(response.status).to.be.equal(200)
        })
    });

    it('Generate token', () => {
        cy.request({
            method: 'POST',
            url: 'https://demoqa.com/Account/v1/GenerateToken',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: {
                "userName": "Julia",
                "password": "Ch22111990!"
              }
        }).then(response => {
            expect(response.status).to.be.equal(200);
            token = response.body.token;
            expires = response.body.expires;
            console.log(token);
        })
    });

    it('Login to the site', () => {
        cy.setCookie('userName', 'Julia')
        cy.setCookie('token', token)
        cy.setCookie('expires', expires)
        cy.visit('https://demoqa.com/books')
    });

});


