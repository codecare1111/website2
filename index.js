// Get the buttons
const patientButton = document.getElementById('patientButton');
const doctorButton = document.getElementById('doctorButton');

// Add event listeners for redirection
patientButton.addEventListener('click', () => {
    window.location.href = 'patient.html'; // Redirect to patient portal
});

doctorButton.addEventListener('click', () => {
    window.location.href = 'doctor.html'; // Redirect to doctor portal
});
