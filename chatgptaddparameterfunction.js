document.getElementById('NewParameterButton').addEventListener('click', createNewParameter);

function createNewParameter() {
    // Ask for new parameter label
    let newParamLabel = prompt("Enter the new parameter label (e.g., 'KE [J]'):").trim();
    if (!newParamLabel) return alert("No label entered. Operation cancelled.");
    
    // Ask for the equation
    let equation = prompt("Enter the equation using existing parameters (e.g., '0.5 * mass * speed^2'):").trim();
    if (!equation) return alert("No equation entered. Operation cancelled.");
    
    // Ensure all arrays have the same length
    let keys = Object.keys(yParameters);
    if (keys.length === 0 || !t['time [ms]']) return alert("No existing parameters found.");

    let dataLength = t['time [ms]'].length;

    // Validate equation: replace parameter names with array indexing
    let safeEquation = equation;
    let usedKeys = [];
    
    keys.forEach(key => {
        if (equation.includes(key)) {
            usedKeys.push(key);
            // Convert key references to array indexing
            safeEquation = safeEquation.replace(new RegExp(`\\b${escapeRegex(key)}\\b`, 'g'), `yParameters["${key}"][i]`);
        }
    });

    // Ensure all referenced keys exist
    if (usedKeys.some(key => !yParameters[key])) {
        return alert("Error: Some referenced parameters do not exist.");
    }

    try {
        // Compute new values
        let newData = Array.from({ length: dataLength }, (_, i) => {
            return eval(safeEquation); // Calculate each point
        });

        // Add the new parameter
        yParameters[newParamLabel] = newData;
        alert(`Parameter '${newParamLabel}' added successfully!`);
    } catch (error) {
        alert(`Error in equation: ${error.message}`);
    }
}

// Helper function to escape regex special characters in parameter names
function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}