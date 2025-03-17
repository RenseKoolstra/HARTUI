const simpleChart = document.querySelector("#simpleChart");
let myChart;    
const t =           [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const yValues1 =    [2, 5, 3, 5, 7, 3, 6, 3, 2, 6, 3]; 
const yValues2 =    [300, 500, 100, 600, 200, 600, 800, 900, 300, 600, 200]; 





displaygraph(t, [yValues1, yValues2], ['y1', 'y2'])

function displaygraph(tValues, yValues, parameter) {
   let dsets = [];
    if (myChart) {
        myChart.destroy();
        myChart = null; // Clear reference
    }
    let multiplescales = {
        'x': {
            title: {
                display: true,
                text: 'Time (s)'
            }
        }
    }
    let ylimits = {}


    for (i=0; i < yValues.length; i++) {
        dsets[i] = {
            label: parameter[i],
            data: yValues[i],
            //borderColor: 'blue',
            borderWidth: 2,
            fill: false,
            yAxisID: `y${i}`
        };
        multiplescales[`y${i}`] = 
            {
                title: {
                    display: true,
                    text: parameter[i]    
                },
                type: 'linear',
                offset: true,
                position: 'left',
                //stack: 'demo',
                min: Math.min(...yValues[i]) - i*(Math.max(...yValues[i]) - Math.min(...yValues[i])),
                max: Math.max(...yValues[i]) + (yValues.length -1 -i)*(Math.max(...yValues[i]) - Math.min(...yValues[i]))
            }
        ylimits[`y${i}`] = {
            min: Math.min(...yValues[i]) - i*(Math.max(...yValues[i]) - Math.min(...yValues[i])),  
            max: Math.max(...yValues[i]) + (yValues.length -1 -i)*(Math.max(...yValues[i]) - Math.min(...yValues[i]))
        }
    }
    console.log(ylimits)
    myChart = new Chart(simpleChart, {
        type: 'line',
        data: {
            labels: tValues,
            datasets: dsets,
            
        },
        options: {
            responsive: true,
            animation: false,
            
            scales : multiplescales,
            
            plugins: {
               
                zoom: {
                    limits: {
                        y0: {
                          "min": 2,
                          "max": 12
                        },
                        y1: {
                          "min": -700,
                          "max": 900
                        }
                      },
                    pan: {
                        enabled: true,
                        onPanStart({chart, point}) {
                            const area = chart.chartArea;
                            const w25 = area.width * 0.25;
                            const h25 = area.height * 0.25;
                            if (point.x < area.left + w25 || point.x > area.right - w25
                              || point.y < area.top + h25 || point.y > area.bottom - h25) {
                              return false; // abort
                            }
                        },
                        mode: 'xy', // Enable panning on the x-axis
                        threshold: 100, // Minimum distance to start panning (useful for touch devices)
                        speed: 0.3, // Adjust pan speed (lower = slower)
                    },
                    zoom: {
                        
                        wheel: {
                            enabled: true,
                            speed: 0.1
                        },
                        pinch: {
                            enabled: true, // Enable pinch zooming on touch devices
                            speed: 0.2
                        },
                        mode: 'xy', // Zoom in/out on the x-axis                        
                    }
                }
            }       
        },        
    });
}