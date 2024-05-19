document.getElementById('registerRole').addEventListener('change', (e) => {
    const vendorNameField = document.getElementById('vendorName');
    if (e.target.value === 'vendor') {
      vendorNameField.style.display = 'block';
    } else {
      vendorNameField.style.display = 'none';
    }
  });
  
  document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    const role = document.getElementById('registerRole').value;
    const vendorName = role === 'vendor' ? document.getElementById('vendorName').value : null;
  
    const response = await fetch('/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password, role, vendorName })
    });
  
    const result = await response.json();
    alert(result.message);
  });  
  
  document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
  
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
  
    const result = await response.json();
    if (result.user) {
      // Store user details in local storage
      localStorage.setItem('user', JSON.stringify(result.user));
      
      alert(result.message);
      // Redirect based on user role
      if (result.user.role === 'vendor') {
        window.location.href = '/vendor-dashboard.html';
      } else {
        window.location.href = '/buying-house-dashboard.html';
      }
    } else {
      alert(result.message);
    }
  });
  
  document.getElementById('logoutButton').addEventListener('click', async (e) => {
    e.preventDefault();
  
    const response = await fetch('/users/logout', {
      method: 'POST'
    });
  
    const result = await response.json();
    alert(result.message);
    localStorage.removeItem('user');
    window.location.href = '/login.html';
  });
  