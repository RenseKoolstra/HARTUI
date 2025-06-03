const { color } = require("chart.js/helpers");

describe('testsuite1', () => {
    beforeEach(() => {
        //init1 visit website.
        cy.visit('index.html');
    })

    //1a: site exist.
    it('site exist', () => {
         // Verify that the site loaded by checking the title or an element
        cy.title().should('not.be.empty')
    
        // Alternatively, check if the body or a key element is visible
        cy.get('body').should('be.visible')
    });
    //1b: title exist.
    it('check title', () => {
        cy.title().should('eq', 'HARTUI');
    });

    //1c: Header exist with correct label.
    it('check header', () => {
        cy.get('header').should('be.visible')
        cy.get('header h1').should('contain', 'Welcome to HartUI')
    })

    //1d: Left and right <div> exist.
    it('check body', () => {
        cy.get('#leftbox').should('be.visible')
        cy.get('#rightbox').should('be.visible')
    })

    //1e: upload csv textbox exist.

    it('check data csv textbox', () => {
        cy.get('.choosecsv #csvFile').should(($csv) => {
            expect($csv).to.exist;
            expect($csv).to.have.attr('type', 'file')
        }) 
    })
    it('check gps csv textbox', () => {
        cy.get('.choosecsv #gpsFile').should(($gps) => {
            expect($gps).to.exist;
            expect($gps).to.have.attr('type', 'file')
        }) 
    })
    /*1f: change display dropdownbox exist with options:
        - fully stacked
        - semi stacked
        - not stacked
    */
    it('check displayoptions', () => {
        const expectedOptions = ["not stacked", "semi stacked", "fully stacked"];
        cy.get('#DisplayOptions').should('be.visible')
        cy.get('#DisplayOptions option').should(($options) => {
            const actualOptions = $options.map((_, el) => Cypress.$(el).text()).get();
            expect(actualOptions).to.have.members(expectedOptions);
        }) 
    }) 
    //1g: light dark emoji exist with sun for light and moon for dark. 
    it('check lightdark emoji', () => {
        cy.window().then((win) => {
            if (win.prefersDarkScheme === false) {
                cy.get('#lightdarkemoji').should('contain', '☀️');
            } else {
                cy.get('#lightdarkemoji').should('contain', '🌙');
            }
        })
    })
    
    //1h: light dark mode switches when clicked on emoji.
    it('lightdark mode switch', () => {
        
        cy.window().then((win) => {
            const isDarkMode = win.matchMedia && win.matchMedia('(prefers-color-scheme: dark)').matches;
            var colorScheme = win.document.documentElement.style.getPropertyValue('color-scheme')
            cy.get("#lightdarkemoji").then(($lightdarkemoji) => {
                if (isDarkMode) {
                    $lightdarkemoji.click();
                    colorScheme = win.document.documentElement.style.getPropertyValue('color-scheme')
                    expect(colorScheme).to.equal('light')
                    expect($lightdarkemoji.text()).to.equal('☀️');
                    $lightdarkemoji.click();
                    colorScheme = win.document.documentElement.style.getPropertyValue('color-scheme')
                    expect(colorScheme).to.equal('dark')
                    expect($lightdarkemoji.text()).to.equal('🌙');  
                }  else {
                    $lightdarkemoji.click();
                    colorScheme = win.document.documentElement.style.getPropertyValue('color-scheme')
                    expect(colorScheme).to.equal('dark')
                    expect($lightdarkemoji.text()).to.equal('🌙');
                    $lightdarkemoji.click();
                    colorScheme = win.document.documentElement.style.getPropertyValue('color-scheme')
                    expect(colorScheme).to.equal('light')
                    expect($lightdarkemoji.text()).to.equal('☀️');
                }
            })
        });
    })
});