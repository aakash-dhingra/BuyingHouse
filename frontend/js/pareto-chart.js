document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/qualityassurances/defects-vendor-wise', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const defectData = await response.json();

        // Debugging output to check defect data fetched from the backend
        console.log('Defects Pareto Data:', defectData);

        displayParetoChart(defectData);
    } catch (error) {
        console.error('Error fetching defect data for Pareto chart:', error);
    }
});

function displayParetoChart(defectData) {
    const ctx = document.getElementById('paretoChart').getContext('2d');

    // Transform data to create Pareto chart
    const labels = [];
    const defectCounts = [];
    const cumulativeCounts = [];
    let cumulativeSum = 0;

    defectData.forEach(data => {
        labels.push(data.defect_name);
        defectCounts.push(data.defect_count);
        cumulativeSum += data.defect_count;
        cumulativeCounts.push(cumulativeSum);
    });

    const totalDefects = cumulativeCounts[cumulativeCounts.length - 1];
    const cumulativePercentages = cumulativeCounts.map(count => (count / totalDefects) * 100);

    const paretoChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Defect Count',
                    data: defectCounts,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Cumulative Percentage',
                    data: cumulativePercentages,
                    type: 'line',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    fill: false,
                    yAxisID: 'y-axis-2'
                }
            ]
        },
        options: {
            scales: {
                yAxes: [
                    {
                        id: 'y-axis-1',
                        type: 'linear',
                        position: 'left',
                        ticks: {
                            beginAtZero: true
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Defect Count'
                        }
                    },
                    {
                        id: 'y-axis-2',
                        type: 'linear',
                        position: 'right',
                        ticks: {
                            beginAtZero: true,
                            max: 100
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Cumulative Percentage'
                        }
                    }
                ]
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });
}
