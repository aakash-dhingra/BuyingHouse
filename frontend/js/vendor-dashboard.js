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

  const ctxPie = document.getElementById('pieChart').getContext('2d');
  const pieChart = new Chart(ctxPie, {
      type: 'pie',
      data: {
          labels: ['Accepted', 'Rejected'],
          datasets: [{
              data: [stats.acceptedSamples, stats.rejectedSamples],
              backgroundColor: ['#4caf50', '#f44336'],
              hoverOffset: 4
          }]
      },
      options: {
          responsive: true
      }
  });
}
