document.addEventListener('DOMContentLoaded', () => {
    const coll = document.getElementsByClassName('collapsible');
    for (let i = 0; i < coll.length; i++) {
        coll[i].addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            if (content.style.display === 'block') {
                content.style.display = 'none';
            } else {
                content.style.display = 'block';
            }
        });
    }

    const logoutButton = document.getElementById('logoutButton');
    logoutButton.addEventListener('click', () => {
        // Clear user session or localStorage
        localStorage.removeItem('user');
        window.location.href = '/index.html'; // Redirect to login page
    });
});
