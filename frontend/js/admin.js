document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/admin/pending-users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error fetching pending users');
        }

        const pendingUsers = await response.json();
        displayPendingUsers(pendingUsers);
    } catch (error) {
        console.error('Error fetching pending users:', error);
    }
});

function displayPendingUsers(users) {
    const tableBody = document.querySelector('#pending-users-table tbody');
    tableBody.innerHTML = '';

    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.username}</td>
            <td>${user.role}</td>
            <td><button onclick="approveUser(${user.user_id})">Approve</button></td>
        `;

        tableBody.appendChild(row);
    });
}

async function approveUser(user_id) {
    try {
        const response = await fetch(`/admin/approve-user/${user_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error approving user');
        }

        alert('User approved successfully');
        location.reload();
    } catch (error) {
        console.error('Error approving user:', error);
        alert('Error approving user');
    }
}
