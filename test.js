const { equal } = require('mathjs')

math = require('mathjs')

const var1 = 5
const var2 = 4
const var3 = [3, 4, 5]
const var4 = [4, 5, 6]
const Object1 = { 
    'key [1]': [3, 5, 2, 6], 
    'key [2]': [5, 6, 2, 6], 
    'key [3]': [3, 6, 7, 2]
};
const result = []



equation = '(key [1] + key [2])/key [3]^key [2]'
try {
    for (i = 0; i<4; i++) {
        let j = 0
        let scope = {}
        let current_equation = equation
        
        for (key in Object1) {
            if (equation.includes(key)) {
                j++
                current_equation = current_equation.replace(new RegExp(key, 'g'), `var${j}_${i}`)
                Object.assign(scope, {[`var${j}_${i}`]: Object1[key][i]});
            }  
        }
        //console.log(current_equation)
        //console.log(scope)
        result.push(math.evaluate(current_equation, scope));
    }
    console.log("Result:", result);
} catch (error) {
    console.error("Invalid input:", error.message);
} 
