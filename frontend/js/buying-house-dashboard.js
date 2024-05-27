async function fetchClothSamples() {
  try {
      const response = await fetch('/clothsamples', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          }
      });
      const clothSamples = await response.json();
      displayClothSamples(clothSamples);
  } catch (error) {
      console.error('Error fetching cloth samples:', error);
  }
}

async function fetchDefects() {
  try {
      const response = await fetch('/defects', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          }
      });
      const defects = await response.json();
      return defects;
  } catch (error) {
      console.error('Error fetching defects:', error);
      return [];
  }
}

function createDefectDropdown(defects) {
  const select = document.createElement('select');
  select.className = 'defectSelect';
  defects.forEach(defect => {
      const option = document.createElement('option');
      option.value = defect.defect_id;
      option.textContent = defect.name;
      select.appendChild(option);
  });
  return select;
}

async function displayClothSamples(clothSamples) {
  const defects = await fetchDefects();
  const tableBody = document.querySelector('#clothSamplesTable tbody');
  tableBody.innerHTML = '';

  clothSamples.forEach(sample => {
      const row = document.createElement('tr');

      row.innerHTML = `
          <td>${sample.sample_id}</td>
          <td>${sample.sample_reference_id}</td>
          <td>${sample.version}</td>
          <td>${sample.Vendor.name}</td>
          <td>${sample.SubBrand.name}</td>
          <td>${sample.style}</td>
          <td>${sample.color}</td>
          <td>${sample.sample_quantity}</td>
          <td>${sample.season}</td>
          <td>${sample.quality_type}</td>
          <td>
              <select class="statusSelect">
                  <option value="pending" ${sample.status === 'pending' ? 'selected' : ''}>Pending</option>
                  <option value="approved" ${sample.status === 'approved' ? 'selected' : ''}>Approved</option>
                  <option value="rejected" ${sample.status === 'rejected' ? 'selected' : ''}>Rejected</option>
              </select>
          </td>
          <td>
              <input type="text" class="rejectionReason" ${sample.status === 'rejected' ? '' : 'disabled'} value="${sample.rejection_reason || ''}">
          </td>
          <td>
              ${createDefectDropdown(defects).outerHTML}
          </td>
          <td>
              <button class="submitBtn">Submit</button>
          </td>
      `;

      tableBody.appendChild(row);

      const statusSelect = row.querySelector('.statusSelect');
      const rejectionReasonInput = row.querySelector('.rejectionReason');
      const defectSelect = row.querySelector('.defectSelect');
      const submitBtn = row.querySelector('.submitBtn');

      statusSelect.addEventListener('change', (e) => {
          if (e.target.value === 'rejected') {
              rejectionReasonInput.disabled = false;
              defectSelect.disabled = false;
          } else {
              rejectionReasonInput.disabled = true;
              rejectionReasonInput.value = '';
              defectSelect.disabled = true;
          }
      });

      submitBtn.addEventListener('click', async () => {
          const status = statusSelect.value;
          const rejection_reason = rejectionReasonInput.value;
          const defect_id = defectSelect.value;

          const payload = {
              sample_id: sample.sample_id,
              status,
              rejection_reason: status === 'rejected' ? rejection_reason : null,

              quality_type: sample.quality_type, // Include quality_type from the sample data
              defects: status === 'rejected' ? [defect_id] : []
          };

          try {
              const response = await fetch('/qualityassurances/update', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(payload)
              });
              const result = await response.json();
              alert(result.message);
          } catch (error) {
              console.error('Error updating quality assurance:', error);
          }
      });
  });
}

// Fetch cloth samples when the page loads
document.addEventListener('DOMContentLoaded', fetchClothSamples);
