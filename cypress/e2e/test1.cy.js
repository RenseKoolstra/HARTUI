describe('testsuite 1', () =>{
    let expectedJson;
    before(() => {
        cy.fixture('csvAsJson.json').then((data) => {
            expectedJson = data;
        }); // load testdata
    }) 
    
    beforeEach(() => {
            cy.visit('index.html'); // before each test visit the site. 
      });

    it('check title', () => {
        cy.title().should('eq', 'HARTUI');
    });
    it('upload csv', () => {
        const filePath = 'cypress/fixtures/test-data/vechtdalService2_383.MaxxECU-Log'; // Make sure this file exists in cypress/fixtures
        cy.get('#csvFile').selectFile(filePath).then(() => {
            cy.window().should((win) => {
                expect(win.csvAsJson).to.exist;
                expect(win.csvAsJson).to.deep.equal(expectedJson);                   
                            
            });            
        });               
    }); 
    
    it('checkParameters', () => {
        const keys = Object.keys(expectedJson);
        const filePath = 'cypress/fixtures/test-data/vechtdalService2_383.MaxxECU-Log'; // Make sure this file exists in cypress/fixtures
        cy.get('#csvFile').selectFile(filePath)
        cy.get('.parameter_value').each(($el, index) => {
            expect($el.text()).to.equal(keys[index]); 
        })      
    });

});