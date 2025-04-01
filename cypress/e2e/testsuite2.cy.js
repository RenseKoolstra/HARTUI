describe('testsuite2', () => {
    let expectedJson;
    let expectedT;
    let expectedYparameters
    before(() => {
        cy.fixture('csvAsJson.json').then((JsonData) => {
            //init 1 upload jsonobject with data
            expectedJson = JsonData;
        }); 
        cy.fixture('t.json').then((tData) => {
            //init 2 upload jsonobject with tdata
            expectedT = tData;
        });
        
    }) 
    //init 4 visit website.
    beforeEach(() => {
        cy.visit('index.html'); // before each test visit the site.
        
    });

  
    it('everything there when csv uploaded', () => {
        cy.fixture('yParameters.json').then((yData) => {
            //init 3 upload jsonobject with y-variables
            expectedYparameters = yData;
            //init 4 upload csv at the website.
            const filePath = 'cypress/fixtures/test-data/vechtdalService2_383.MaxxECU-Log'; // Make sure this file exists in cypress/fixtures
            const keys = Object.keys(expectedYparameters);
            cy.get('#csvFile').selectFile(filePath)
            .then(() => {
                cy.window().should((win) => {
                    //2a csv is turned into json.
                    expect(win.csvAsJson).to.exist;
                    expect(win.csvAsJson).to.deep.equal(expectedJson);   
                    //2b t array exist equal to dt from testdata.
                    expect(win.t).to.exist; 
                    expect(win.t).to.deep.equal(expectedT);
                    //2c object with y-variables exist equal to data from testdata.
                    expect(win.yParameters).to.exist;
                    expect(win.yParameters).to.deep.equal(expectedYparameters);               
                });
            })
            .then(() => {
                cy.get('.parameter').each(($el, index) => {
                    //2d label created for all y-variables.
                    cy.wrap($el)
                    .find('p')
                    .invoke('text')
                    .then((text) => {
                        expect(text).to.equal(keys[index]);
                    });
                    //2e checkbox created for all y-variables.
                    cy.wrap($el)
                    .find('input[type="checkbox"]')
                    .should('exist');
                })             
            })
            .then(() => {
                cy.get('#createParameterButton').should('be.visible')
            })       
        }); 
    })    
})