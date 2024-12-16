document.getElementById('patientForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const condition = document.getElementById('condition').value;
    const reason = document.getElementById('reason').value;
    const medicines = document.getElementById('medicines').value;
    const hospital = document.getElementById('hospital').value;
    const incharge = document.getElementById('incharge').value;
    const doctor = document.getElementById('doctor').value;

    // Determine condition class for color-coding
    let conditionClass;
    if (condition === "critical") {
        conditionClass = "critical";
    } else if (condition === "moderate") {
        conditionClass = "moderate";
    } else {
        conditionClass = "stable";
    }

    // Display assigned doctor at the top of the patient profile
    const doctorAssignedDiv = document.getElementById('doctorAssigned');
    doctorAssignedDiv.textContent = `Assigned Doctor: Dr. ${doctor}`;

    // Display patient information
    const patientInfoDiv = document.getElementById('patientInfo');
    patientInfoDiv.className = `patient-info ${conditionClass}`;
    patientInfoDiv.innerHTML = `
        <h2>Patient Profile</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Age:</strong> ${age}</p>
        <p><strong>Gender:</strong> ${gender}</p>
        <p><strong>Condition:</strong> ${condition}</p>
        <p><strong>Reason for Accident:</strong> ${reason}</p>
        <p><strong>Medicines Given:</strong> ${medicines}</p>
        <p><strong>Hospital:</strong> ${hospital}</p>
        <p><strong>Ambulance In-charge:</strong> ${incharge}</p>
    `;

    // Clear form
    document.getElementById('patientForm').reset();
});
