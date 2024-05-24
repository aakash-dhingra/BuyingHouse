// document.addEventListener('DOMContentLoaded', async () => {
//     try {
//         const acceptanceRejectionResponse = await fetch('/qa-dashboard/acceptance-rejection-by-sub-brand', {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });
//         const acceptanceRejectionData = await acceptanceRejectionResponse.json();
        
//         // Log the response data for debugging
//         console.log('Acceptance Rejection Data:', JSON.stringify(acceptanceRejectionData, null, 2));
        
//         displayAcceptanceRejectionChart(acceptanceRejectionData);

//         // const defectsByVendorResponse = await fetch('/qa-dashboard/defects-by-vendor', {
//         //     method: 'GET',
//         //     headers: {
//         //         'Content-Type': 'application/json'
//         //     }
//         // });
//         // const defectsByVendorData = await defectsByVendorResponse.json();
        
//         const response = await fetch('/qualityassurances/vendor-quality-stats', {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });

//         const stats = await response.json();
//         console.log('Vendor Quality Stats:', stats);
//          // Check if the response is an array
//          if (Array.isArray(stats)) {
//             displayStats(stats);
//         } else {
//             console.error('Expected an array but got:', stats);
//         }


//         // // Log the response data for debugging
//         // console.log('Defects By Vendor Data:', JSON.stringify(defectsByVendorData, null, 2));
        
//         // displayDefectsByVendorChart(stats);

//         const acceptanceByQualityTypeResponse = await fetch('/qa-dashboard/acceptance-by-quality-type', {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });
//         const acceptanceByQualityTypeData = await acceptanceByQualityTypeResponse.json();
//         displayAcceptanceByQualityTypeChart(acceptanceByQualityTypeData);


//         const approvalRejectionResponse = await fetch('/qualityassurances/approval-rejection-stats', {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });
//         const approvalRejectionData = await approvalRejectionResponse.json();
//         displayApprovalRejectionChart(approvalRejectionData);

        
//     } catch (error) {
//         console.error('Error fetching data for charts:', error);
//     }
// });

// function displayApprovalRejectionChart(data) {
//     const ctx = document.getElementById('approvalRejectionChart').getContext('2d');

//     const labels = data.map(d => d.status.charAt(0).toUpperCase() + d.status.slice(1));
//     const counts = data.map(d => d.count);

//     const approvalRejectionChart = new Chart(ctx, {
//         type: 'bar',
//         data: {
//             labels: labels,
//             datasets: [{
//                 label: ['Number of Samples'],
//                 data: counts,
//                 // backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
//                 // borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
//                 backgroundColor: ['#4caf50', '#f44336'],
//                 borderColor: ['#388e3c','#d32f2f'],
//                 borderWidth: 1
//             }]
//         },
//         options: {
//             scales: {
//                 yAxes: [{
//                     ticks: {
//                         beginAtZero: true
//                     },
//                     scaleLabel: {
//                         display: true,
//                         labelString: 'Number of Samples'
//                     }
//                 }]
//             },
//             responsive: true,
//             // maintainAspectRatio: false
//         }
//     });
// }

// function displayAcceptanceRejectionChart(data) {
//     if (!data || !Array.isArray(data)) {
//         console.error('Invalid data format for acceptance rejection chart:', data);
//         return;
//     }

//     // Log individual items for debugging
//     data.forEach((item, index) => {
//         console.log(`Item ${index}:`, JSON.stringify(item, null, 2));
//     });

//     const labels = data.map(item => item.SubBrand?.name || 'Unknown');
//     const acceptedCounts = data.map(item => parseInt(item.accepted_count || 0, 10));
//     const rejectedCounts = data.map(item => parseInt(item.rejected_count || 0, 10));

//     console.log('Labels:', labels);
//     console.log('Accepted Counts:', acceptedCounts);
//     console.log('Rejected Counts:', rejectedCounts);

//     const ctx = document.getElementById('acceptanceRejectionBySubBrand').getContext('2d');
//     new Chart(ctx, {
//         type: 'bar',
//         data: {
//             labels: labels,
//             datasets: [
//                 {
//                     label: 'Accepted',
//                     data: acceptedCounts,
//                     backgroundColor: '#4caf50',
//                     borderColor: '#388e3c',
//                     borderWidth: 1
//                 },
//                 {
//                     label: 'Rejected',
//                     data: rejectedCounts,
//                     backgroundColor: '#f44336',
//                     borderColor: '#d32f2f',
//                     borderWidth: 1
//                 }
//             ]
//         },
//         options: {
//             responsive: true,
//             scales: {
//                 y: {
//                     beginAtZero: true
//                 }
//             }
//         }
//     });
// }

// function displayDefectsByVendorChart(data) {
//     if (!data || !Array.isArray(data)) {
//         console.error('Invalid data format for defects by vendor chart:', data);
//         return;
//     }

//     // Log individual items for debugging
//     data.forEach((item, index) => {
//         console.log(`Item ${index}:`, JSON.stringify(item, null, 2));
//     });

//     const labels = [...new Set(data.map(item => item.QualityAssurance.ClothSample.Vendor?.name || 'Unknown'))];
//     const defectCounts = labels.map(label => {
//         return data.filter(item => item.QualityAssurance.ClothSample.Vendor?.name === label)
//             .reduce((sum, item) => sum + parseInt(item.defect_count || 0, 10), 0);
//     });

//     console.log('Labels:', labels);
//     console.log('Defect Counts:', defectCounts);

//     const ctx = document.getElementById('defectsByVendor').getContext('2d');
//     new Chart(ctx, {
//         type: 'bar',
//         data: {
//             labels: labels,
//             datasets: [{
//                 label: 'Defects',
//                 data: defectCounts,
//                 backgroundColor: '#ff9800',
//                 borderColor: '#f57c00',
//                 borderWidth: 1
//             }]
//         },
//         options: {
//             responsive: true,
//             scales: {
//                 y: {
//                     beginAtZero: true
//                 }
//             }
//         }
//     });
// }

// function displayStats(stats) {
//     const tableBody = document.querySelector('#vendorStatsTable tbody');
//     tableBody.innerHTML = '';

//     stats.forEach(stat => {
//         const row = document.createElement('tr');
//         row.innerHTML = `
//             <td>${stat.vendor_name}</td>
//             <td>${stat.approved_count}</td>
//             <td>${stat.rejected_count}</td>
//         `;
//         tableBody.appendChild(row);
//     });
// }


// function displayAcceptanceByQualityTypeChart(data) {
//     if (!data || !Array.isArray(data)) {
//         console.error('Invalid data format for acceptance by quality type chart:', data);
//         return;
//     }

//     // Log individual items for debugging
//     data.forEach((item, index) => {
//         console.log(`Item ${index}:`, JSON.stringify(item, null, 2));
//     });

//     const labels = data.map(item => item.quality_type);
//     const acceptanceRates = data.map(item => {
//         const acceptedSamples = parseInt(item.accepted_samples || 0, 10);
//         const totalSamples = parseInt(item.total_samples || 1, 10);
//         return (acceptedSamples / totalSamples) * 100;
//     });

//     console.log('Labels:', labels);
//     console.log('Acceptance Rates:', acceptanceRates);

//     const ctx = document.getElementById('acceptanceByQualityType').getContext('2d');
//     new Chart(ctx, {
//         type: 'bar',
//         data: {
//             labels: labels,
//             datasets: [{
//                 label: 'Acceptance Rate (%)',
//                 data: acceptanceRates,
//                 backgroundColor: '#4caf50',
//                 borderColor: '#388e3c',
//                 borderWidth: 1
//             }]
//         },
//         options: {
//             responsive: true,
//             scales: {
//                 y: {
//                     beginAtZero: true,
//                     max: 100
//                 }
//             }
//         }
//     });
// }



document.addEventListener('DOMContentLoaded', async () => {
    let currentPage = 0;

    const fetchPaginatedData = async (page) => {
        try {
            const offset = page * 3;
            const response = await fetch(`/qualityassurances/vendor-quality-stats-paginated?offset=${offset}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const stats = await response.json();
            console.log('Vendor Quality Stats (Paginated):', stats);

            // Check if the response is an array
            if (Array.isArray(stats)) {
                displayStats(stats);
                updatePageInfo(page, stats.length);
            } else {
                console.error('Expected an array but got:', stats);
            }
        } catch (error) {
            console.error('Error fetching paginated vendor quality stats:', error);
        }
    };

    const updatePageInfo = (page, dataLength) => {
        document.getElementById('pageInfo').textContent = `Page ${page + 1}`;
        document.getElementById('prevPage').disabled = page === 0;
        document.getElementById('nextPage').disabled = dataLength < 3;
    };

    document.getElementById('prevPage').addEventListener('click', () => {
        if (currentPage > 0) {
            currentPage -= 1;
            fetchPaginatedData(currentPage);
        }
    });

    document.getElementById('nextPage').addEventListener('click', () => {
        currentPage += 1;
        fetchPaginatedData(currentPage);
    });

    // Initial data fetch
    fetchPaginatedData(currentPage);

    try {
        const acceptanceRejectionResponse = await fetch('/qa-dashboard/acceptance-rejection-by-sub-brand', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const acceptanceRejectionData = await acceptanceRejectionResponse.json();
        
        console.log('Acceptance Rejection Data:', JSON.stringify(acceptanceRejectionData, null, 2));
        displayAcceptanceRejectionChart(acceptanceRejectionData);

        // const defectsByVendorResponse = await fetch('/qa-dashboard/defects-by-vendor', {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // });
        // const defectsByVendorData = await defectsByVendorResponse.json();
        // console.log('Defects By Vendor Data:', JSON.stringify(defectsByVendorData, null, 2));
        // displayDefectsByVendorChart(defectsByVendorData);

        const acceptanceByQualityTypeResponse = await fetch('/qa-dashboard/acceptance-by-quality-type', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const acceptanceByQualityTypeData = await acceptanceByQualityTypeResponse.json();
        console.log('Acceptance By Quality Type Data:', JSON.stringify(acceptanceByQualityTypeData, null, 2));
        displayAcceptanceByQualityTypeChart(acceptanceByQualityTypeData);

        const approvalRejectionResponse = await fetch('/qualityassurances/approval-rejection-stats', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const approvalRejectionData = await approvalRejectionResponse.json();
        console.log('Approval Rejection Data:', JSON.stringify(approvalRejectionData, null, 2));
        displayApprovalRejectionChart(approvalRejectionData);
    } catch (error) {
        console.error('Error fetching data for charts:', error);
    }
});

function displayStats(stats) {
    const tableBody = document.querySelector('#vendorStatsTable tbody');
    tableBody.innerHTML = '';

    stats.forEach(stat => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${stat.vendor_name}</td>
            <td>${stat.approved_count}</td>
            <td>${stat.rejected_count}</td>
        `;
        tableBody.appendChild(row);
    });
}

function displayApprovalRejectionChart(data) {
    const ctx = document.getElementById('approvalRejectionChart').getContext('2d');

    const labels = data.map(d => d.status.charAt(0).toUpperCase() + d.status.slice(1));
    const counts = data.map(d => d.count);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Number of Samples',
                data: counts,
                backgroundColor: ['#4caf50', '#f44336'],
                borderColor: ['#388e3c','#d32f2f'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            responsive: true,
            // maintainAspectRatio: false
        }
    });
}

function displayAcceptanceRejectionChart(data) {
    if (!data || !Array.isArray(data)) {
        console.error('Invalid data format for acceptance rejection chart:', data);
        return;
    }

    const labels = data.map(item => item.SubBrand?.name || 'Unknown');
    const acceptedCounts = data.map(item => parseInt(item.accepted_count || 0, 10));
    const rejectedCounts = data.map(item => parseInt(item.rejected_count || 0, 10));

    const ctx = document.getElementById('acceptanceRejectionBySubBrand').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Accepted',
                    data: acceptedCounts,
                    backgroundColor: '#4caf50',
                    borderColor: '#388e3c',
                    borderWidth: 1
                },
                {
                    label: 'Rejected',
                    data: rejectedCounts,
                    backgroundColor: '#f44336',
                    borderColor: '#d32f2f',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function displayDefectsByVendorChart(data) {
    if (!data || !Array.isArray(data)) {
        console.error('Invalid data format for defects by vendor chart:', data);
        return;
    }

    const labels = [...new Set(data.map(item => item.QualityAssurance.ClothSample.Vendor?.name || 'Unknown'))];
    const defectCounts = labels.map(label => {
        return data.filter(item => item.QualityAssurance.ClothSample.Vendor?.name === label)
            .reduce((sum, item) => sum + parseInt(item.defect_count || 0, 10), 0);
    });

    const ctx = document.getElementById('defectsByVendor').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Defects',
                data: defectCounts,
                backgroundColor: '#ff9800',
                borderColor: '#f57c00',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function displayAcceptanceByQualityTypeChart(data) {
    if (!data || !Array.isArray(data)) {
        console.error('Invalid data format for acceptance by quality type chart:', data);
        return;
    }

    const labels = data.map(item => item.quality_type);
    const acceptanceRates = data.map(item => {
        const acceptedSamples = parseInt(item.accepted_samples || 0, 10);
        const totalSamples = parseInt(item.total_samples || 1, 10);
        return (acceptedSamples / totalSamples) * 100;
    });

    const ctx = document.getElementById('acceptanceByQualityType').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Acceptance Rate (%)',
                data: acceptanceRates,
                backgroundColor: '#4caf50',
                borderColor: '#388e3c',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}
