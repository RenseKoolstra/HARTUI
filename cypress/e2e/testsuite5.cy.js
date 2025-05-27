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
        .then(() => {
            cy.window().then((win) => {
                cy.stub(win, 'prompt')
                .onCall(0).returns('var 1')
                .onCall(1).returns('(3.14 + Lambda [5] * MAP [20]^Lambda [5])/2')
                .onCall(2).returns('(%^[&*)}')
                .onCall(3).returns('0 - sqrt(var 1)')
            })
        })
        .then(() => {
            cy.get('#createParameterButton').click()
        })
        
        
    })

    it('var 1 visible and correct', () => {
        cy.get('.parameter p').last().should('contain', 'var 1')
        cy.window().should((win) => {
            expect(win.yParameters['var 1'].map((el) => math.round(el*1000)/1000)).to.deep.equal((calc['var 1'].map((el) => math.round(el*1000)/1000)));
        })
    })

    it('(%^[&*)} visible and correct', () => {
        cy.get('#createParameterButton').click()
        .then(() => {
            cy.window().should((win) => {
                expect(win.yParameters['(%^[&*)}'].map((el) => math.round(el*1000)/1000)).to.deep.equal((calc['(%^[&*)}'].map((el) => math.round(el*1000)/1000)));
            })
        })

    })

    it('compare ss', () => {
        cy.get('#createParameterButton').click()
        cy.window().should((win) => {
            //init 3 upload jsonobject with y-variables
            expect(Object.keys(win.yParameters)).to.have.length.above(0);
        })
        .then(() => {
            cy.get('.parameter').each(($el, index) => {
                cy.wrap($el)
                .find('p')
                .invoke('text')
                .then((text) => {
                    if (chosenY.includes(text)) {
                        cy.wrap($el)
                        .find('input[type="checkbox"]').click()
                    } 
                });
            })             
        })

        cy.get('#DisplayOptions').select('not stacked')
        cy.get('#simpleChart').screenshot('comparecalc')
        cy.matchImageSnapshot('comparecalc');
          
    })


})
