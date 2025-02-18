describe('testsuite 1', () =>{
    let expectedJson;
    let expectedT;
    let expectedYparameters
    before(() => {
        cy.fixture('csvAsJson.json').then((JsonData) => {
            expectedJson = JsonData;
        }); 
        cy.fixture('t.json').then((tData) => {
            expectedT = tData;
        });
        cy.fixture('yParameters.json').then((yData) => {
            expectedYparameters = yData;
        });
    }) 
    
    beforeEach(() => {
            cy.visit('index.html'); // before each test visit the site. 
      });

    it('check title', () => {
        cy.title().should('eq', 'HARTUI');
    });
    it('uploadCSV', () => {
        const filePath = 'cypress/fixtures/test-data/vechtdalService2_383.MaxxECU-Log'; // Make sure this file exists in cypress/fixtures
        const keys = Object.keys(expectedYparameters);
        cy.get('#csvFile').selectFile(filePath)
        .then(() => {
            cy.window().should((win) => {
                expect(win.csvAsJson).to.exist;
                expect(win.csvAsJson).to.deep.equal(expectedJson);   
                expect(win.t).to.exist; 
                expect(win.t).to.deep.equal(expectedT);
                expect(win.yParameters).to.exist;
                expect(win.yParameters).to.deep.equal(expectedYparameters);               
            });
        })
        .then(() => {
            cy.get('.parameter').each(($el, index) => {
                cy.wrap($el)
                .find('p')
                .invoke('text')
                .then((text) => {
                    expect(text).to.equal(keys[index]);
                });
                cy.wrap($el)
                .find('input[type="radio"]')
                .should('exist');
            })             
        })              
    }); 
});



