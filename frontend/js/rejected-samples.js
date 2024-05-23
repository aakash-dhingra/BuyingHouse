document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/clothsamples?status=rejected', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const samples = await response.json();

        // Debugging output to check samples fetched from the backend
        console.log('Rejected Samples:', samples);

        displaySamples(samples);
    } catch (error) {
        console.error('Error fetching rejected samples:', error);
    }
});

function displaySamples(samples) {
    const tableBody = document.querySelector('#samplesTable tbody');
    tableBody.innerHTML = '';

    samples.forEach(sample => {
        const qualityAssurance = sample.QualityAssurances && sample.QualityAssurances[0] ? sample.QualityAssurances[0] : null;
        const defects = qualityAssurance && qualityAssurance.QualityAssuranceDefects ? qualityAssurance.QualityAssuranceDefects.map(defect => defect.defect_id).join(', ') : 'N/A';
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
            <td>${defects}</td>
        `;
        tableBody.appendChild(row);
    });
}
