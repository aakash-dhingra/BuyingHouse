document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root');
    root.innerHTML = `
      <h1>Welcome to Cloth Sample Management</h1>
      <div>
        <button id="loginBtn">Login</button>
        <button id="registerBtn">Register</button>
      </div>
    `;
  
    document.getElementById('loginBtn').addEventListener('click', showLoginForm);
    document.getElementById('registerBtn').addEventListener('click', showRegisterForm);
  });
  
  function showLoginForm() {
    const root = document.getElementById('root');
    root.innerHTML = `
      <h1>Login</h1>
      <form id="loginForm">
        <input type="text" id="username" placeholder="Username" required />
        <input type="password" id="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    `;
  
    // document.getElementById('loginForm').addEventListener('submit', async (e) => {
    //   e.preventDefault();
    //   const username = document.getElementById('username').value;
    //   const password = document.getElementById('password').value;
      
    //   const response = await fetch('/auth/login', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ username, password })
    //   });
  
    //   if (response.ok) {
    //     const data = await response.json();
    //     localStorage.setItem('token', data.token);
    //     // Navigate to appropriate dashboard based on user role
    //     if (data.user.role === 'vendor') {
    //       showVendorDashboard();
    //     } else {
    //       showBuyingHouseDashboard();
    //     }
    //   } else {
    //     alert('Login failed');
    //   }
    // });

    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
      
        const response = await fetch('/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        });
      
        const result = await response.json();
        alert(result.message);
        if (result.user) {
          // Redirect based on user role
          if (result.user.role === 'vendor') {
            window.location.href = '/vendor-dashboard.html';
          } else {
            window.location.href = '/buying-house-dashboard.html';
          }
        }
      });
  }
  
  function showRegisterForm() {
    const root = document.getElementById('root');
    root.innerHTML = `
      <h1>Register</h1>
      <form id="registerForm">
        <input type="text" id="username" placeholder="Username" required />
        <input type="password" id="password" placeholder="Password" required />
        <select id="role">
          <option value="vendor">Vendor</option>
          <option value="buying_house">Buying House</option>
        </select>
        <button type="submit">Register</button>
      </form>
    `;
  
    // document.getElementById('registerForm').addEventListener('submit', async (e) => {
    //   e.preventDefault();
    //   const username = document.getElementById('username').value;
    //   const password = document.getElementById('password').value;
    //   const role = document.getElementById('role').value;
  
    //   const response = await fetch('/auth/register', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ username, password, role })
    //   });
  
    //   if (response.ok) {
    //     alert('Registration successful');
    //     showLoginForm();
    //   } else {
    //     alert('Registration failed');
    //   }
    // });
    document.getElementById('registerForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('registerUsername').value;
        const password = document.getElementById('registerPassword').value;
        const role = document.getElementById('registerRole').value;
      
        const response = await fetch('/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password, role })
        });
      
        const result = await response.json();
        alert(result.message);
      });    
  }
//   document.getElementById('registerForm').addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const username = document.getElementById('registerUsername').value;
//     const password = document.getElementById('registerPassword').value;
//     const role = document.getElementById('registerRole').value;
  
//     const response = await fetch('/auth/register', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ username, password, role })
//     });
  
//     const result = await response.json();
//     alert(result.message);
//   });

//   document.getElementById('loginForm').addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const username = document.getElementById('loginUsername').value;
//     const password = document.getElementById('loginPassword').value;
  
//     const response = await fetch('/auth/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ username, password })
//     });
  
//     const result = await response.json();
//     alert(result.message);
//     if (result.token) {
//       // Store token in localStorage
//       localStorage.setItem('token', result.token);
//       localStorage.setItem('user', JSON.stringify(result.user));
  
//       // Redirect based on user role
//       if (result.user.role === 'vendor') {
//         window.location.href = '/vendor-dashboard.html';
//       } else {
//         window.location.href = '/buying-house-dashboard.html';
//       }
//     }
//   });

  function showVendorDashboard() {
    const root = document.getElementById('root');
    root.innerHTML = `
      <nav>
        <ul>
          <li><a href="#" id="dashboardLink">Dashboard</a></li>
          <li><a href="#" id="submitSampleLink">Submit Sample</a></li>
        </ul>
      </nav>
      <div id="content"></div>
    `;
  
    document.getElementById('dashboardLink').addEventListener('click', showVendorDashboardContent);
    document.getElementById('submitSampleLink').addEventListener('click', showSubmitSampleForm);
  
    showVendorDashboardContent();
  }
  
  function showVendorDashboardContent() {
    const content = document.getElementById('content');
    content.innerHTML = '<h1>Vendor Dashboard</h1>';
    // Fetch and display analytics data here
  }
  
  function showSubmitSampleForm() {
    const content = document.getElementById('content');
    content.innerHTML = `
      <h1>Submit Sample</h1>
      <form id="submitSampleForm">
        <input type="text" id="sampleReferenceId" placeholder="Sample Reference ID" required />
        <input type="text" id="style" placeholder="Style" required />
        <input type="text" id="color" placeholder="Color" required />
        <input type="number" id="sampleQuantity" placeholder="Sample Quantity" required />
        <input type="text" id="season" placeholder="Season" required />
        <button type="submit">Submit</button>
      </form>
    `;
  
    // document.getElementById('submitSampleForm').addEventListener('submit', async (e) => {
    //   e.preventDefault();
    //   const sampleReferenceId = document.getElementById('sampleReferenceId').value;
    //   const style = document.getElementById('style').value;
    //   const color = document.getElementById('color').value;
    //   const sampleQuantity = document.getElementById('sampleQuantity').value;
    //   const season = document.getElementById('season').value;
  
    //   const response = await fetch('/clothsamples', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ sampleReferenceId, style, color, sampleQuantity, season })
    //   });
  
    //   if (response.ok) {
    //     alert('Sample submitted successfully');
    //     showVendorDashboardContent();
    //   } else {
    //     alert('Failed to submit sample');
    //   }
    // });

    document.getElementById('submitSampleForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
          alert('You must be logged in to submit a cloth sample');
          window.location.href = '/login.html';
          return;
        }
      
        const sampleReferenceId = document.getElementById('sampleReferenceId').value;
        const style = document.getElementById('style').value;
        const color = document.getElementById('color').value;
        const sampleQuantity = document.getElementById('sampleQuantity').value;
        const season = document.getElementById('season').value;
        const image = document.getElementById('image').files[0]; // Assuming you are using file input for image
      
        const formData = new FormData();
        formData.append('sample_reference_id', sampleReferenceId);
        formData.append('vendor_id', user.user_id);
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
  }
  
  function showBuyingHouseDashboard() {
    const root = document.getElementById('root');
    root.innerHTML = `
      <nav>
        <ul>
          <li><a href="#" id="dashboardLink">Dashboard</a></li>
          <li><a href="#" id="approveSamplesLink">Approve Samples</a></li>
        </ul>
      </nav>
      <div id="content"></div>
    `;
  
    document.getElementById('dashboardLink').addEventListener('click', showBuyingHouseDashboardContent);
    document.getElementById('approveSamplesLink').addEventListener('click', showApproveSamplesForm);
  
    showBuyingHouseDashboardContent();
  }
  
  function showBuyingHouseDashboardContent() {
    const content = document.getElementById('content');
    content.innerHTML = '<h1>Buying House Dashboard</h1>';
    // Fetch and display analytics data here
  }
  
  function showApproveSamplesForm() {
    const content = document.getElementById('content');
    content.innerHTML = `
      <h1>Approve Samples</h1>
      <table id="samplesTable">
        <thead>
          <tr>
            <th>Sample Reference ID</th>
            <th>Style</th>
            <th>Color</th>
            <th>Sample Quantity</th>
            <th>Season</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <!-- Sample rows will be populated here -->
        </tbody>
      </table>
    `;
  
    // Fetch samples and populate the table
    const token = localStorage.getItem('token');
    fetch('/clothsamples', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(response => response.json())
      .then(samples => {
        const tbody = document.getElementById('samplesTable').querySelector('tbody');
        samples.forEach(sample => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${sample.sampleReferenceId}</td>
            <td>${sample.style}</td>
            <td>${sample.color}</td>
            <td>${sample.sampleQuantity}</td>
            <td>${sample.season}</td>
            <td>
              <button class="approveBtn">Approve</button>
              <button class="rejectBtn">Reject</button>
            </td>
          `;
          tbody.appendChild(row);
        });
  
        document.querySelectorAll('.approveBtn').forEach(button => {
          button.addEventListener('click', approveSample);
        });
  
        document.querySelectorAll('.rejectBtn').forEach(button => {
          button.addEventListener('click', rejectSample);
        });
      });
  }
  
  function approveSample(event) {
    const sampleId = event.target.closest('tr').querySelector('td').textContent;
    const token = localStorage.getItem('token');
    fetch(`/qualityassurance/${sampleId}/approve`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(response => {
        if (response.ok) {
          alert('Sample approved successfully');
          showApproveSamplesForm();
        } else {
          alert('Failed to approve sample');
        }
      });
  }
  
  function rejectSample(event) {
    const sampleId = event.target.closest('tr').querySelector('td').textContent;
    const token = localStorage.getItem('token');
    fetch(`/qualityassurance/${sampleId}/reject`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(response => {
        if (response.ok) {
          alert('Sample rejected successfully');
          showApproveSamplesForm();
        } else {
          alert('Failed to reject sample');
        }
      });
  }







// document.getElementById('registerForm').addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const username = document.getElementById('registerUsername').value;
//     const password = document.getElementById('registerPassword').value;
//     const role = document.getElementById('registerRole').value;
  
//     const response = await fetch('/users/register', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ username, password, role })
//     });
  
//     const result = await response.json();
//     alert(result.message);
//   });
  
//   document.getElementById('loginForm').addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const username = document.getElementById('loginUsername').value;
//     const password = document.getElementById('loginPassword').value;
  
//     const response = await fetch('/users/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ username, password })
//     });
  
//     const result = await response.json();
//     alert(result.message);
//     if (result.user) {
//       // Redirect based on user role
//       if (result.user.role === 'vendor') {
//         window.location.href = '/vendor-dashboard.html';
//       } else {
//         window.location.href = '/buying-house-dashboard.html';
//       }
//     }
//   });
  
  document.getElementById('logoutButton').addEventListener('click', async (e) => {
    e.preventDefault();
  
    const response = await fetch('/users/logout', {
      method: 'POST'
    });
  
    const result = await response.json();
    alert(result.message);
    window.location.href = '/login.html';
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
    const style = document.getElementById('style').value;
    const color = document.getElementById('color').value;
    const sampleQuantity = document.getElementById('sampleQuantity').value;
    const season = document.getElementById('season').value;
    const image = document.getElementById('image').files[0]; // Assuming you are using file input for image
  
    const formData = new FormData();
    formData.append('sample_reference_id', sampleReferenceId);
    formData.append('vendor_id', user.user_id);
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
  
  