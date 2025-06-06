


const chosenY = ['Intake air temp [17]', 'RPM [61]', 'Oil Pressure [804]'] 
//let SSfullysctacked;
describe('testsuite4', () => {
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
        })
    })
    it('sreenshot fully stacked', () => {
        cy.get('#DisplayOptions').select('fully stacked')
        cy.get('body').matchImageSnapshot('fully stacked');
    })
    it('sreenshot semi stacked', () => {
        cy.get('#DisplayOptions').select('semi stacked')
        cy.get('body').matchImageSnapshot('semi stacked');
    }) 
    it('sreenshot not stacked', () => {
        cy.get('#DisplayOptions').select('not stacked')
        cy.get('body').matchImageSnapshot('not stacked');
    })    
})