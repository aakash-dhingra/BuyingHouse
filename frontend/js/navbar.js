document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logoutButton');

    logoutButton.addEventListener('click', () => {
        // Clear user session or localStorage
        localStorage.removeItem('user');
        window.location.href = '/login.html'; // Redirect to login page
    });
});