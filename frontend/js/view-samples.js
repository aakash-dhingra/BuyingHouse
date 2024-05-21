document.addEventListener('DOMContentLoaded', async () => {
    const user = JSON.parse(localStorage.getItem('user'));

    // Debugging output to check user information in localStorage
    console.log('User Info from localStorage:', user);

    if (!user || user.role !== 'vendor' || !user.user_id) {
        alert('You must be logged in as a vendor to view the samples.');
        window.location.href = '/login.html'; // Redirect to login page
        return;
    }

    try {
        // Ensure the vendor_id is part of the query string
        const response = await fetch(`/clothsamples/vendor?vendor_id=${user.user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const samples = await response.json();

        // Debugging output to check samples fetched from the backend
        console.log('Samples fetched:', samples);

        displaySamples(samples);
    } catch (error) {
        console.error('Error fetching samples:', error);
    }
});

function displaySamples(samples) {
    const tableBody = document.querySelector('#samplesTable tbody');
    tableBody.innerHTML = '';

    samples.forEach(sample => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${sample.sample_id}</td>
            <td>${sample.sample_reference_id}</td>
            <td>${sample.version}</td>
            <td>${sample.style}</td>
            <td>${sample.color}</td>
            <td>${sample.sample_quantity}</td>
            <td>${sample.season}</td>
            <td>${sample.quality_type}</td>
            <td>${sample.status}</td>
            <td>${new Date(sample.upload_date).toLocaleDateString()}</td>
        `;
        tableBody.appendChild(row);
    });
}
