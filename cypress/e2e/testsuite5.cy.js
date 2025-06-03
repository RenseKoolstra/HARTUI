const math = require('mathjs');
const chosenY = ['var 1', '(%^[&*)}'] 
describe('testsuite5', () => {
    let calc = {}
    before(() => {
        cy.fixture('calc.json').then((JsonData) => {
            //init 1 upload jsonobject with data
            calc = JsonData;
        }); 
    })
    beforeEach(() => {
        //init1 visit website.
        cy.visit('index.html');
        const filePath = 'cypress/fixtures/test-data/vechtdalService2_383.MaxxECU-Log'; // Make sure this file exists in cypress/fixtures
        cy.get('#csvFile').selectFile(filePath)
        .then(() => {
            cy.window().should((win) => {
                //init 3 upload jsonobject with y-variables
                expect(Object.keys(win.yParameters)).to.have.length.above(0);
            })
        })
        /*
        .then(() => {
            cy.window().then((win) => {
                cy.stub(win, 'prompt')
                .onCall(0).returns('var 1')
                .onCall(1).returns('(3.14 + Lambda [5] * MAP [20]^Lambda [5])/2')
                .onCall(2).returns('(%^[&*)}')
                .onCall(3).returns('0 - sqrt(var 1)')
            })
        })
        */
        .then(() => {
            cy.get('#createParameterButton').click()
            cy.get('#newParameterName').type('var 1')
            cy.get('#mathOperatorLB').click()
            cy.get('#newParameterEquation').type('3.14')
            cy.get('.mathOperator').contains('button', '+').click()
            cy.get('.calcUIparameter').contains('p','Lambda [5]').click()
            cy.get('.mathOperator').contains('button', '*').click()
            cy.get('.calcUIparameter').contains('p','MAP [20]').click()
            cy.get('.mathOperator').contains('button', '^').click()
            cy.get('.calcUIparameter').contains('p','Lambda [5]').click()
            cy.get('.mathOperator').contains('button', ')').click()
            cy.get('.mathOperator').contains('button', '/').click()
            cy.get('#newParameterEquation').type('2')
            cy.get('#submitNewParameter').click()
        })
        .then(() => {
            cy.get('#createParameterButton').click()
            cy.get('#newParameterName').type('(%^[&*)}')
            cy.get('#newParameterEquation').type('0 - sqrt(var 1)')
            cy.get('#submitNewParameter').click()
        })
        
        
    })

    it('var 1 visible and correct', () => {
        cy.get('.parameter p').eq(-2).should('contain', 'var 1')
        cy.window().should((win) => {
            expect(win.yParameters['var 1'].map((el) => math.round(el*1000)/1000)).to.deep.equal((calc['var 1'].map((el) => math.round(el*1000)/1000)));
        })
    })

    it('(%^[&*)} visible and correct', () => {
        cy.get('.parameter p').eq(-1).should('contain', '(%^[&*)}')
        cy.window().should((win) => {
            expect(win.yParameters['(%^[&*)}'].map((el) => math.round(el*1000)/1000)).to.deep.equal((calc['(%^[&*)}'].map((el) => math.round(el*1000)/1000)));
        })

    })
})
