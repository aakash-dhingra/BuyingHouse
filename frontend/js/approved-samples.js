
document.addEventListener('DOMContentLoaded', async () => {
    let currentPage = 0;

    const fetchPaginatedData = async (page) => {
        try {
            const offset = page * 10;
            const response = await fetch(`/clothsamples?status=approved&limit=10&offset=${offset}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const samples = await response.json();
            console.log('Approved Samples (Paginated):', samples);

            if (Array.isArray(samples)) {
                displaySamples(samples);
                updatePageInfo(page, samples.length);
            } else {
                console.error('Expected an array but got:', samples);
            }
        } catch (error) {
            console.error('Error fetching paginated approved samples:', error);
        }
    };

    const updatePageInfo = (page, dataLength) => {
        document.getElementById('pageInfo').textContent = `Page ${page + 1}`;
        document.getElementById('prevPage').disabled = page === 0;
        document.getElementById('nextPage').disabled = dataLength < 10;
    };

    document.getElementById('prevPage').addEventListener('click', () => {
        if (currentPage > 0) {
            currentPage -= 1;
            fetchPaginatedData(currentPage);
        }
    });

    document.getElementById('nextPage').addEventListener('click', () => {
        currentPage += 1;
        fetchPaginatedData(currentPage);
    });

    fetchPaginatedData(currentPage);
});


function displaySamples(samples) {
    const tableBody = document.querySelector('#samplesTable tbody');
    tableBody.innerHTML = '';

    samples.forEach(sample => {
        const qualityAssurance = sample.QualityAssurances && sample.QualityAssurances[0] ? sample.QualityAssurances[0] : null;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${sample.sample_reference_id}</td>
            <td>${sample.style}</td>
            <td>${sample.color}</td>
            <td>${sample.season}</td>
            <td><img src="data:image/jpeg;base64,${sample.image}" alt="Sample Image" style="width: 100px; height: auto;"></td>
            <td>${sample.sample_quantity}</td>
            <td>${sample.quality_type}</td>
            <td>${sample.Vendor ? sample.Vendor.name : 'N/A'}</td>
            <td>${new Date(sample.upload_date).toLocaleDateString()}</td>
            <td>${qualityAssurance && qualityAssurance.checkedByUser ? qualityAssurance.checkedByUser.username : 'N/A'}</td>
        `;
        tableBody.appendChild(row);
    });
}