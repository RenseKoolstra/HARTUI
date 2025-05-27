const fs = require("fs");
const math = require('mathjs');

fs.readFile("cypress/fixtures/yParameters.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }
    try {
    //get yparameters and save as object. extract RPM and batteryVoltage as arrays.
      const yParameters = JSON.parse(data);
      const MAP = yParameters['MAP [20]'];
      const Lambda = yParameters['Lambda [5]'];
      const calc = {}

    //get calculation 1: var 1 = (3.14 + Lambda [5] * MAP [20]^Lanbda [5])/2
      const part1 = MAP.map((el, index) => math.pow(el, Lambda[index])) //MAP [20]^Lanbda [5]
      const part2 = Lambda.map((el, index) => el * part1[index])  //Lambda [5] * MAP [20]^Lanbda [5]
      const part3 = part2.map((el) => 3.14 + el) //(3.14 + Lambda [5] * MAP [20]^Lanbda [5])
      const res1 = part3.map((el) => el/2) //(3.14 + Lambda [5] * MAP [20]^Lanbda [5])/2
      Object.assign(calc, {'var 1': res1})

      //get calculation 2: (%^[&*)}: 0 - sqrt(var1)
      const part4 = res1.map((el) => math.pow(el, 0.5));
      const res2 = part4.map((el) => 0 - el);
      Object.assign(calc, {'(%^[&*)}': res2})

      //safe in json file
      fs.writeFileSync('cypress/fixtures/calc.json', JSON.stringify(calc), 'utf8');
    } catch (error) {
      console.error("Invalid JSON format:", error);
    }
  });

  
 