// Fetch and display quality assurance data
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/qualityassurances', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const qualityAssurances = await response.json();
        displayQualityAssurances(qualityAssurances);
    } catch (error) {
        console.error('Error fetching quality assurances:', error);
    }
});

function displayQualityAssurances(qualityAssurances) {
    const tableBody = document.querySelector('#qualityAssuranceTable tbody');
    tableBody.innerHTML = '';

    qualityAssurances.forEach(qa => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${qa.sample_id}</td>
            <td>${qa.status}</td>
            <td>${qa.rejection_reason || ''}</td>
            <td>
                <button class="viewDefectsBtn" data-qa-id="${qa.qa_id}">View Defects</button>
            </td>
            <td>
                <button class="approveBtn" data-qa-id="${qa.qa_id}">Approve</button>
                <button class="rejectBtn" data-qa-id="${qa.qa_id}">Reject</button>
            </td>
        `;

        tableBody.appendChild(row);
    });

    document.querySelectorAll('.viewDefectsBtn').forEach(button => {
        button.addEventListener('click', async (e) => {
            const qaId = e.target.getAttribute('data-qa-id');
            try {
                const response = await fetch(`/qualityassurances/${qaId}/defects`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const defects = await response.json();
                alert(`Defects: ${defects.map(defect => defect.name).join(', ')}`);
            } catch (error) {
                console.error('Error fetching defects:', error);
            }
        });
    });

    document.querySelectorAll('.approveBtn').forEach(button => {
        button.addEventListener('click', async (e) => {
            const qaId = e.target.getAttribute('data-qa-id');
            try {
                const response = await fetch(`/qualityassurances/${qaId}/approve`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const result = await response.json();
                alert(result.message);
                window.location.reload();
            } catch (error) {
                console.error('Error approving quality assurance:', error);
            }
        });
    });

    document.querySelectorAll('.rejectBtn').forEach(button => {
        button.addEventListener('click', async (e) => {
            const qaId = e.target.getAttribute('data-qa-id');
            try {
                const response = await fetch(`/qualityassurances/${qaId}/reject`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const result = await response.json();
                alert(result.message);
                window.location.reload();
            } catch (error) {
                console.error('Error rejecting quality assurance:', error);
            }
        });
    });
}
