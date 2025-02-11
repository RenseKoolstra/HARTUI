const jsonObject = {};
document.getElementById("csvFile").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const text = e.target.result;
        const lines = text.split("\n").map(line => line.trim()).filter(line => line); // Remove empty lines
        if (lines.length < 2) return; // Ensure we have at least a header + one row

        const headers = lines[0].split("\t").map(header => header.trim());
        

        // Initialize keys with empty arrays
        headers.forEach(header => {
            jsonObject[header] = [];
        });

        // Process each row
        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split("\t").map(value => value.trim());
            
            // Add each value to its corresponding key
            headers.forEach((header, index) => {
                jsonObject[header].push(values[index] || ""); // Handle missing values
            });
        }

        document.getElementById("output").textContent = JSON.stringify(jsonObject, null, 2);
    };

    reader.readAsText(file);
});