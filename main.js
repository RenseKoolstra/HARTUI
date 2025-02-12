//Global constants
const csvAsJson = {};

//Read csv
document.getElementById("csvFile").addEventListener("change", async function(event) {
    const file = event.target.files[0];
    await readCsv(file);
    
});

async function readCsv(file)   {
    if (!file) return;

    const reader = new FileReader();
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
    };

    reader.readAsText(file);
}

function displayParameters() {
    if (JSON.stringify(csvAsJson) === '{}') return; // check if jsonobject is empty. 
    for (const key in csvAsJson) {
        
    }
}