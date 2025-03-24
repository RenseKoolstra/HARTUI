
const chosenY = [];
let expectedT;
let expectedYparameters;

describe('testsuite3a', () => {
    before(() => {
        cy.fixture('t.json').then((tData) => {
            //init 2 upload jsonobject with tdata
            expectedT = tData;
        });
        cy.fixture('yParameters.json').then((yData) => {
            //init 3 upload jsonobject with y-variables
            expectedYparameters = yData;
        });        
    }) 
    beforeEach(() => {
        //init1 visit website.
        cy.visit('index.html');
        //init2 upload csv
        const filePath = 'cypress/fixtures/test-data/vechtdalService2_383.MaxxECU-Log'; // Make sure this file exists in cypress/fixtures
        cy.get('#csvFile').selectFile(filePath)
        .then(() => {
            cy.window().should((win) => {
                //init 3 upload jsonobject with y-variables
                expect(Object.keys(win.yParameters)).to.have.length.above(0);
                const yvariables = Object.keys(win.yParameters);
                //init 4 select 3 random y-variables
                
                while (chosenY.length < 3) {
                    var newChosen = yvariables[Math.floor(Math.random()*yvariables.length)];
                    if (! chosenY.includes(newChosen)) {
                        chosenY.push(newChosen)
                    }             
                }
                console.log(chosenY)
            })
            
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
    
    it('graph displayed correctly', () => {
        cy.window().should((win) => {
            //3a myChart exist
            expect(win.myChart).to.exist
            //3b x axis is same as t array
            expect(JSON.stringify(win.myChart.data.labels)).to.equal(JSON.stringify(expectedT["time [s]"]))
            //3c y axis is same as y-variables
            expect(win.myChart.data.datasets).to.have.length(3)
            for (let i=0; i<3; i++) {
                expect(chosenY).to.include(win.myChart.data.datasets[i].label);
                expect(JSON.stringify(win.myChart.data.datasets[i].data)).to.equal(JSON.stringify(expectedYparameters[win.myChart.data.datasets[i].label]))
            }           
            
        })
    })
   
})     
