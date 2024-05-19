document.getElementById('dashboardLink').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('dashboard').style.display = 'block';
    document.getElementById('submitQualityAssurance').style.display = 'none';
    document.getElementById('qualityAssuranceDashboard').style.display = 'none';
  });
  
  document.getElementById('submitQualityAssuranceLink').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('submitQualityAssurance').style.display = 'block';
    document.getElementById('qualityAssuranceDashboard').style.display = 'none';
  });
  
  document.getElementById('qualityAssuranceDashboardLink').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('submitQualityAssurance').style.display = 'none';
    document.getElementById('qualityAssuranceDashboard').style.display = 'block';
  });
  
  document.getElementById('submitQualityAssuranceForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      alert('You must be logged in to submit quality assurance');
      window.location.href = '/login.html';
      return;
    }
  
    const sampleReferenceId = document.getElementById('sampleReferenceId').value;
    const qualityType = document.getElementById('qualityType').value;
    const status = document.getElementById('status').value;
    const rejectionReason = document.getElementById('rejectionReason').value;
  
    const response = await fetch('/qualityassurances', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ sampleReferenceId, qualityType, status, rejectionReason, checked_by: user.user_id })
    });
  
    const result = await response.json();
    alert(result.message);
  });
  