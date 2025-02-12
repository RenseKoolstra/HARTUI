//Global constants
const parameters = document.querySelector("#parameters");

//Read csv
document.getElementById("csvFile").addEventListener("change", async function(event) {
    const file = event.target.files[0];
    csvAsJson = await readCsv(file);
    displayParameters(csvAsJson);
    
});

async function readCsv(file)   {
    return new Promise((resolve, reject) => {
    if (!file) return;
    
    const reader = new FileReader();
    const csvAsJson = {}
    reader.onload = async function(e) {
        const text = e.target.result;
        const lines = text.split("\n").map(line => line.trim()).filter(line => line); // Remove empty lines
        if (lines.length < 2) return; // Ensure we have at least a header + one row

        const headers = lines[0].split("\t").map(header => header.trim());
        

        // Initialize keys with empty arrays
        headers.forEach(header => {
            csvAsJson[header] = [];
        });

        // Process each row
        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split("\t").map(value => value.trim());
            
            // Add each value to its corresponding key
            headers.forEach((header, index) => {
                csvAsJson[header].push(values[index] || ""); // Handle missing values
            });
        }
        resolve(csvAsJson)
    };
reader.onerror = (error) => reject(error);
reader.readAsText(file);
});

    
    

}

function displayParameters(csvAsJson) {
    if (JSON.stringify(csvAsJson) === '{}') {console.log('DisplayParamters returned'); return;} // check if jsonobject is empty. 

    for (const key in csvAsJson) {
        //for each key(parameter in the json object create a div with parameter class)
        const new_parameter = document.createElement("div");
        new_parameter.classList.add('parameter');


        //for each div with parameter class create a parameter label with the key as text and parameter_value as class. 
        const new_parameter_value = document.createElement("p");
        new_parameter_value.textContent = key;
        new_parameter_value.classList.add('parameter_value');
        new_parameter.appendChild(new_parameter_value);

        //for each div with parameter class add a checkbox with class parameter_checkbox.
        const new_parameter_checkbox = document.createElement("input");
        new_parameter_checkbox.setAttribute("type", "radio");
        new_parameter_checkbox.setAttribute("name", "y-variable");
        new_parameter_checkbox.classList.add('parameter_check');
        new_parameter.appendChild(new_parameter_checkbox);
        parameters.appendChild(new_parameter);
    }
}