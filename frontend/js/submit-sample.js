document.addEventListener('DOMContentLoaded', async () => {
    const subBrandSelect = document.getElementById('subBrandId');
    
    try {
        const response = await fetch('/subbrands', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const subBrands = await response.json();
        subBrands.forEach(subBrand => {
            const option = document.createElement('option');
            option.value = subBrand.sub_brand_id;
            option.textContent = subBrand.name;
            subBrandSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching sub-brands:', error);
    }

    document.getElementById('submitSampleForm').addEventListener('submit', async (e) => {
        e.preventDefault();

        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            alert('You must be logged in to submit a cloth sample');
            window.location.href = '/login.html';
            return;
        }

        const sampleReferenceId = document.getElementById('sampleReferenceId').value;
        const version = document.getElementById('version').value;
        const style = document.getElementById('style').value;
        const color = document.getElementById('color').value;
        const sampleQuantity = document.getElementById('sampleQuantity').value;
        const season = document.getElementById('season').value;
        const subBrandId = document.getElementById('subBrandId').value;
        const qualityType = document.getElementById('qualityType').value;
        const image = document.getElementById('image').files[0];

        const formData = new FormData();
        formData.append('sample_reference_id', sampleReferenceId);
        formData.append('version', version);
        formData.append('vendor_id', user.user_id);
        formData.append('sub_brand_id', subBrandId);
        formData.append('style', style);
        formData.append('color', color);
        formData.append('sample_quantity', sampleQuantity);
        formData.append('season', season);
        formData.append('quality_type', qualityType);
        formData.append('image', image);

        try {
            const response = await fetch('/clothsamples', {
                method: 'POST',
                body: formData
            });
            const result = await response.json();
            alert(result.message);
            if (result.message === 'Cloth sample created successfully') {
                document.getElementById('submitSampleForm').reset();
            }
        } catch (error) {
            console.error('Error creating cloth sample:', error);
        }
    });
});
