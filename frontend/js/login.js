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
    if (result.message === 'Login successful') {
        localStorage.setItem('user', JSON.stringify(result.user));
        if(result.user.role === 'vendor'){
        window.location.href = 'vendor-dashboard.html';
        }else{
            window.location.href = 'buying-house-dashboard.html'; 
        }
    } else {
        alert(result.message);
    }
});
