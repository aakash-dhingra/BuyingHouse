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
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('registerRole').value;
    const vendorName = document.getElementById('vendorName').value;
    
    const response = await fetch('/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, role,  vendorName })
    });
    
    const result = await response.json();
    if (result.message === 'User registered successfully') {
        window.location.href = 'login.html';
    } else {
        alert(result.message);
    }
});
