document.getElementById('dashboardLink').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('dashboard').style.display = 'block';
    document.getElementById('submitSample').style.display = 'none';
  });
  
  document.getElementById('submitSampleLink').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('submitSample').style.display = 'block';
  });
  
  document.getElementById('submitSampleForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      alert('You must be logged in to submit a cloth sample');
      window.location.href = '/login.html';
      return;
    }
  
    const sampleReferenceId = document.getElementById('sampleReferenceId').value;
    const version = document.getElementById('version').value;
    const style = document.getElementById('style').value;
    const color = document.getElementById('color').value;
    const sampleQuantity = document.getElementById('sampleQuantity').value;
    const season = document.getElementById('season').value;
    const image = document.getElementById('image').files[0]; // Assuming you are using file input for image
  
    const formData = new FormData();
    formData.append('sample_reference_id', sampleReferenceId);
    formData.append('vendor_id', user.user_id);
    formData.append('version', version);
    formData.append('style', style);
    formData.append('color', color);
    formData.append('sample_quantity', sampleQuantity);
    formData.append('season', season);
    formData.append('image', image);
  
    const response = await fetch('/clothsamples', {
      method: 'POST',
      body: formData
    });
  
    const result = await response.json();
    alert(result.message);
  });
  