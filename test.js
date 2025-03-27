math = require('mathjs')

let Object1 = { 
    'key[1]': [3, 5, 2, 6], 
    'key[2]': [5, 6, 2, 6], 
    'key[3]': [3, 6, 7, 2]
};

let userInput = 'key[1] + key[1]';
const scope = {};

// Dynamically add matching keys to scope
for (let key in Object1) {
    if (userInput.includes(key)) {
        console.log("Found key:", key);
        Object.assign(scope, { [key]: Object1[key] });
    }
}

console.log("Scope:", scope); // Check the extracted values

try {
    const result = math.evaluate(userInput, scope);
    console.log("Result:", result);
} catch (error) {
    console.error("Invalid input:", error.message);
}