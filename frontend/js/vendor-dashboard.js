document.addEventListener('DOMContentLoaded', async () => {
  try {
      const response = await fetch('/vendors/stats', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          }
      });
      const stats = await response.json();
      displayCharts(stats);

      const defectStatsResponse = await fetch('/vendors/defect-stats', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const defectStatsData = await defectStatsResponse.json();
    displayDefectStatsChart(defectStatsData);

  } catch (error) {
      console.error('Error fetching vendor stats:', error);
  }
});

function displayCharts(stats) {
  const ctxBar = document.getElementById('barChart').getContext('2d');
  const barChart = new Chart(ctxBar, {
      type: 'bar',
      data: {
          labels: ['Accepted', 'Rejected'],
          datasets: [{
              label: 'Cloth Samples',
              data: [stats.acceptedSamples, stats.rejectedSamples],
              backgroundColor: ['#4caf50', '#f44336'],
              borderColor: ['#388e3c', '#d32f2f'],
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
//   const ctxPie = document.getElementById('pieChart').getContext('2d');
//   const pieChart = new Chart(ctxPie, {
//       type: 'pie',
//       data: {
//           labels: ['Accepted', 'Rejected'],
//           datasets: [{
//               data: [stats.acceptedSamples, stats.rejectedSamples],
//               backgroundColor: ['#4caf50', '#f44336'],
//               hoverOffset: 4
//           }]
//       },
//       options: {
//           responsive: true
//       }
//   });

function displayDefectStatsChart(data) {
    const ctx = document.getElementById('defectStatsChart').getContext('2d');

    const labels = data.map(d => d.defect_name);
    const counts = data.map(d => d.count);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Number of Defects',
                data: counts,
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                borderColor: 'rgba(255, 159, 64, 1)',
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