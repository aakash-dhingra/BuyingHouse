document.addEventListener('DOMContentLoaded', async () => {
    try {
        const sampleResponse = await fetch('/clothsamples/pending?status=pending', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const defectResponse = await fetch('/defects', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const samples = await sampleResponse.json();
        const defects = await defectResponse.json();

        // Debugging output to check samples and defects fetched from the backend
        console.log('Pending Samples:', samples);
        console.log('Defects:', defects);

        populateReferenceIdDropdown(samples);
        populateDefectDropdown(defects);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});

function populateReferenceIdDropdown(samples) {
    const referenceIdDropdown = document.getElementById('referenceId');
    const referenceIds = [...new Set(samples.map(sample => sample.sample_reference_id))];

    referenceIds.forEach(referenceId => {
        const option = document.createElement('option');
        option.value = referenceId;
        option.textContent = referenceId;
        referenceIdDropdown.appendChild(option);
    });

    referenceIdDropdown.addEventListener('change', async () => {
        const selectedReferenceId = referenceIdDropdown.value;
        if (selectedReferenceId) {
            // Fetch the latest version of the selected reference ID
            const response = await fetch(`/clothsamples?reference_id=${selectedReferenceId}&status=pending`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const sampleData = await response.json();
            if (sampleData.length > 0) {
                const latestSample = sampleData[0];
                populateForm(latestSample);
            }
        }
    });
}

// function populateDefectDropdown(defects) {
//     const defectDropdown = document.getElementById('defects');
//     defects.forEach(defect => {
//         const label = document.createElement('label');
//         const checkbox = document.createElement('input');
//         checkbox.type = 'checkbox';
//         checkbox.name = 'options';
//         checkbox.value = defect.id;
//         checkbox.textContent = defect.name;
//         // const option = document.createElement('option');
//         // option.value = defect.id;
//         // option.textContent = defect.name;
//         // defectDropdown.appendChild(option);
//         label.appendChild(checkbox);
//         label.appendChild(document.createTextNode(option.label));
//         dropdownContent.appendChild(label);
//     });
// }

function populateDefectDropdown(defects) {
    const defectDropdown = document.getElementById('defectsDropdown');
    defects.forEach(defect => {
        const label = document.createElement('label');
        label.innerHTML = `<input type="checkbox" value="${defect.defect_id}"> ${defect.name}`;
        defectDropdown.appendChild(label);
    });
}

function populateForm(sample) {
    document.getElementById('vendorName').value = sample.Vendor.name;
    document.getElementById('style').value = sample.style;
    document.getElementById('color').value = sample.color;
    document.getElementById('sampleQuantity').value = sample.sample_quantity;
    document.getElementById('season').value = sample.season;
}

document.getElementById('pendingSampleForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const form = e.target;
    const referenceId = form.referenceId.value;
    const qualityType = form.qualityType.value;
    const status = form.status.value;
    const rejectionReason = form.rejectionReason.value;
    const defects = Array.from(form.defects.selectedOptions).map(option => option.value);

    try {
        const response = await fetch('/qualityassurances/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                reference_id: referenceId,
                quality_type: qualityType,
                status: status,
                rejection_reason: rejectionReason,
                defects: defects
            })
        });

        if (response.ok) {
            alert('Sample updated successfully');
            form.reset();
        } else {
            alert('Error updating sample');
        }
    } catch (error) {
        console.error('Error updating sample:', error);
    }
});
